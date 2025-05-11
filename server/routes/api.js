const express = require("express");
const router = express.Router();
const axios = require("axios");
const objectMapping = require("../utils/objectMapping");
const mlService = require("../services/mlService");
const deepseekService = require("../services/deepseekService");
const geminiService = require("../services/geminiService");

// Add route logging middleware
router.use((req, res, next) => {
  console.log(`API Route accessed: ${req.method} ${req.originalUrl}`);
  next();
});

// Create a local fallback generator for when API is unavailable
const getLocalFallback = (objects) => {
  // Simple fallback based on detected objects
  const primaryObject = objects[0]?.class || "unknown";

  // Basic template for bottle fallback
  if (primaryObject === "bottle") {
    return {
      nama: "Vas Bunga dari Botol Plastik",
      bahan: ["Botol plastik bekas", "Cat akrilik", "Gunting", "Tali rami"],
      langkah: [
        "Potong botol plastik menjadi dua bagian, gunakan bagian bawah sebagai vas",
        "Bersihkan botol dari label dan kotoran",
        "Cat bagian luar botol sesuai selera",
        "Tambahkan hiasan dengan tali rami di bagian leher botol",
        "Isi dengan air dan tambahkan bunga",
      ],
      tingkatKesulitan: "Mudah",
      kategori: "Dekorasi Rumah",
      estimasiWaktu: "30 menit",
      imagePrompt:
        "Vas bunga cantik terbuat dari botol plastik bekas yang dicat warna-warni dengan hiasan tali rami",
    };
  }

  // Generic fallback for other objects
  return {
    nama: `Kerajinan dari ${primaryObject}`,
    bahan: [`${primaryObject} bekas`, "Gunting", "Lem", "Hiasan"],
    langkah: [
      "Siapkan material utama",
      "Bersihkan dari kotoran",
      "Potong sesuai pola yang diinginkan",
      "Rangkai bagian-bagian dengan lem",
      "Tambahkan hiasan sesuai selera",
    ],
    tingkatKesulitan: "Sedang",
    kategori: "Kerajinan Tangan",
    estimasiWaktu: "1 jam",
    imagePrompt: `Kerajinan tangan kreatif dari ${primaryObject} bekas yang dihias dengan indah`,
  };
};

// Route untuk mendapatkan saran kerajinan berdasarkan objek yang terdeteksi
router.post("/suggest", async (req, res) => {
  try {
    console.log("API suggest dipanggil");
    const { objects } = req.body;

    if (!objects || !Array.isArray(objects)) {
      console.error("Format permintaan tidak valid:", req.body);
      return res.status(400).json({
        success: false,
        message:
          'Format permintaan tidak valid. Harap sertakan array "objects".',
      });
    }

    console.log("Objek yang terdeteksi:", objects);

    try {
      // 1. Gunakan ML Service untuk meningkatkan deteksi objek dan mendapatkan saran material
      console.log("Memproses objek dengan ML...");
      const { enhancedObjects, materialSuggestions } =
        await mlService.suggestCrafts(objects);

      console.log("Objek dengan peningkatan ML:", enhancedObjects);
      console.log("Saran material:", materialSuggestions);

      // 2. Gunakan Gemini untuk mendapatkan rekomendasi kerajinan
      console.log("Meminta rekomendasi dari Gemini...");
      try {
        // Cek apakah API key tersedia
        if (!process.env.GEMINI_API_KEY) {
          throw new Error("Gemini API key tidak ditemukan di konfigurasi");
        }

        // Log API key yang digunakan (secara aman)
        const keyPreview =
          process.env.GEMINI_API_KEY.substring(0, 10) +
          "..." +
          process.env.GEMINI_API_KEY.substring(
            process.env.GEMINI_API_KEY.length - 4
          );
        console.log(`Menggunakan Gemini API key: ${keyPreview}`);

        // Panggil Gemini service
        const aiRecommendation = await geminiService.getCraftRecommendation(
          enhancedObjects,
          materialSuggestions
        );

        console.log("Rekomendasi dari Gemini berhasil diterima");

        // 3. Kembalikan hasil rekomendasi lengkap ke client
        return res.json({
          success: true,
          suggestion: {
            ...aiRecommendation.recommendation,
            isAI: true,
            aiSource: "gemini",
            // Add friendly descriptions for material difficulty level
            tingkatKesulitanInfo: getTingkatKesulitanInfo(
              aiRecommendation.recommendation.tingkatKesulitan
            ),
            // Add estimated time description
            estimasiWaktuInfo: getEstimasiWaktuInfo(
              aiRecommendation.recommendation.estimasiWaktu
            ),
            // Add material availability hints
            bahanInfo: getMaterialInfo(aiRecommendation.recommendation.bahan),
            // Process the raw response for better readability
            cleanResponse: geminiService.processResponse(
              aiRecommendation.rawResponse
            ),
          },
          materials: materialSuggestions,
          detectedObjects: objects.map((obj) => ({
            class: obj.class,
            mappedClass: objectMapping[obj.class] || obj.class,
            score: obj.score,
            enhanced: enhancedObjects.find((e) => e.class === obj.class).score,
          })),
          fullAIResponse: aiRecommendation.rawResponse,
        });
      } catch (apiError) {
        console.error(
          "Error saat mendapatkan rekomendasi dari Gemini:",
          apiError
        );

        // Kirim error detail ke client
        return res.status(500).json({
          success: false,
          message:
            "Gagal mendapatkan rekomendasi dari Gemini. Silakan coba lagi.",
          error: {
            message: apiError.message,
            details: apiError.response?.data || "No detailed error available",
          },
        });
      }
    } catch (processingError) {
      console.error("Error saat memproses data objek:", processingError);

      // Lempar error ke client tanpa fallback ke data lokal
      return res.status(500).json({
        success: false,
        message: "Error pada pemrosesan objek terdeteksi. Silakan coba lagi.",
        error: processingError.message,
      });
    }
  } catch (error) {
    console.error("Error dalam API suggest:", error);
    console.error("Stack trace:", error.stack);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses permintaan.",
      error: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
});

// API untuk menghasilkan gambar dari prompt kerajinan
router.post("/generate-image", (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt tidak boleh kosong",
      });
    }

    // Untuk implementasi produksi, Anda bisa menggunakan layanan AI seperti:
    // 1. OpenAI DALL-E API,
    // 2. Stable Diffusion API
    // 3. Midjourney API,
    // 4. dll

    // Enhanced prompt untuk hasil yang lebih baik
    const enhancedPrompt = `${prompt}, high quality, detailed, vibrant colors, natural lighting, sustainable, upcycled, eco-friendly`;

    // Enkode prompt untuk URL
    const encodedPrompt = encodeURIComponent(enhancedPrompt);

    // Untuk demo, kita gunakan Unsplash API dengan keyword dari prompt umum
    const keywords = extractKeywords(prompt);
    const imageUrl = `https://source.unsplash.com/featured/?${encodedPrompt}`;

    // Return URL gambar
    return res.json({
      success: true,
      imageUrl: imageUrl,
      prompt: enhancedPrompt,
    });
  } catch (error) {
    console.error("Error dalam API generate-image:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghasilkan gambar",
    });
  }
});

// Fungsi untuk mengekstrak keyword dari prompt
function extractKeywords(prompt) {
  // Hapus kata-kata umum
  const commonWords = [
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "with",
    "from",
    "made",
    "using",
    "of",
    "in",
    "on",
    "by",
    "to",
  ];

  // Pisahkan prompt menjadi kata-kata
  const words = prompt.toLowerCase().split(/\s+/);

  // Filter kata-kata umum
  const keywords = words.filter((word) => {
    // Hapus karakter non-alfanumerik
    const cleanWord = word.replace(/[^\w\s]/gi, "");
    // Filter kata-kata pendek dan kata-kata umum
    return cleanWord.length > 3 && !commonWords.includes(cleanWord);
  });

  // Ambil maksimal 3 keyword
  return [...new Set(keywords)].slice(0, 3).join(",");
}

// Route untuk mendapatkan kerajinan spesifik berdasarkan ID
router.get("/craft/:id", (req, res) => {
  const { id } = req.params;
  try {
    // Cari di database single-object
    const craftKeys = Object.keys(craftDatabase);
    if (craftKeys.includes(id)) {
      return res.json({
        success: true,
        craft: {
          ...craftDatabase[id],
          isMulti: false,
        },
      });
    }

    // Cari di database multi-object
    const multiCraft = craftDatabaseMulti.find((craft) => craft.id === id);
    if (multiCraft) {
      return res.json({
        success: true,
        craft: {
          ...multiCraft,
          isMulti: true,
        },
      });
    }

    // Jika tidak ditemukan,
    return res.status(404).json({
      success: false,
      message: "Kerajinan tidak ditemukan",
    });
  } catch (error) {
    console.error("Error dalam API get craft:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data kerajinan",
    });
  }
});

// API untuk test koneksi ke Deepseek
router.get("/test-deepseek", async (req, res) => {
  try {
    console.log("Testing koneksi ke Deepseek API...");
    // Test koneksi sederhana ke Deepseek
    const testPrompt =
      "Berikan ide kerajinan sederhana menggunakan botol plastik.";
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: testPrompt,
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-78afb20a89524468845b3e159c78a78c`,
        },
      }
    );

    console.log("Test koneksi berhasil:", response.status);
    console.log("Response data:", response.data);

    return res.json({
      success: true,
      message: "Koneksi ke Deepseek API berhasil",
      responseData: response.data,
    });
  } catch (error) {
    console.error("Test koneksi gagal:", error);
    let errorDetails = {
      message: error.message,
    };
    if (error.response) {
      errorDetails.status = error.response.status;
      errorDetails.data = error.response.data;
    }
    return res.status(500).json({
      success: false,
      message: "Koneksi ke Deepseek API gagal",
      error: errorDetails,
    });
  }
});

// API untuk tes koneksi ke Gemini
router.post("/test-gemini", async (req, res) => {
  try {
    console.log("Testing koneksi ke Gemini API...");
    const { prompt } = req.body;

    // Use default prompt if none provided
    const testPrompt =
      prompt || "Berikan ide kerajinan sederhana menggunakan botol plastik.";

    // Use API key from environment variable
    const keyToUse = process.env.GEMINI_API_KEY;

    if (!keyToUse) {
      return res.status(400).json({
        success: false,
        message: "API key tidak ditemukan",
      });
    }

    // Log API key being used (securely)
    const keyPreview =
      keyToUse.substring(0, 10) +
      "..." +
      keyToUse.substring(keyToUse.length - 4);
    console.log(`Menggunakan API key: ${keyPreview}`);

    // Gemini API URL (key as query param)
    const apiUrl = `${process.env.GEMINI_API_URL}?key=${keyToUse}`;

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: testPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Test koneksi Gemini berhasil:", response.status);

    return res.json({
      success: true,
      message: "Koneksi ke Gemini API berhasil",
      responseData: response.data,
      usedKey: keyPreview,
      tokenUsage: response.data.usageMetadata,
    });
  } catch (error) {
    console.error("Test koneksi Gemini gagal:", error);
    let errorDetails = {
      message: error.message,
    };
    if (error.response) {
      errorDetails.status = error.response.status;
      errorDetails.data = error.response.data;
    }
    return res.status(500).json({
      success: false,
      message: "Koneksi ke Gemini API gagal",
      error: errorDetails,
    });
  }
});

// Helper functions for user-friendly output
function getTingkatKesulitanInfo(level) {
  switch (level.toLowerCase()) {
    case "mudah":
      return "Cocok untuk pemula, anak-anak dengan bantuan orang tua, atau pengerjaan cepat.";
    case "sulit":
      return "Membutuhkan ketelitian tinggi, alat khusus, atau pengalaman sebelumnya.";
    default: // sedang
      return "Dapat dikerjakan oleh kebanyakan orang dengan keterampilan dasar.";
  }
}

function getEstimasiWaktuInfo(waktu) {
  if (waktu.includes("30 menit")) {
    return "Proyek cepat, bisa diselesaikan dalam waktu singkat.";
  } else if (waktu.includes("2-3 jam") || waktu.includes("beberapa jam")) {
    return "Proyek yang membutuhkan waktu, sebaiknya disiapkan dengan baik.";
  } else {
    return "Proyek dengan durasi menengah, bisa diselesaikan dalam satu sesi.";
  }
}

function getMaterialInfo(materials) {
  const commonMaterials = materials.filter(
    (m) =>
      m.toLowerCase().includes("botol") ||
      m.toLowerCase().includes("kardus") ||
      m.toLowerCase().includes("gunting") ||
      m.toLowerCase().includes("lem") ||
      m.toLowerCase().includes("cat")
  );

  const rareMaterials = materials.filter(
    (m) =>
      m.toLowerCase().includes("khusus") ||
      m.toLowerCase().includes("led") ||
      m.toLowerCase().includes("elektronik")
  );

  if (rareMaterials.length > 0) {
    return "Beberapa bahan mungkin perlu dibeli khusus.";
  } else if (commonMaterials.length === materials.length) {
    return "Semua bahan mudah ditemukan di rumah atau toko terdekat.";
  } else {
    return "Sebagian besar bahan mudah didapatkan.";
  }
}

module.exports = router;
