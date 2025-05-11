const axios = require("axios");

class DeepseekService {
  constructor() {
    // Gunakan environment variable dengan fallback ke hardcoded key untuk development
    this.apiKey =
      process.env.DEEPSEEK_API_KEY || "sk-78afb20a89524468845b3e159c78a78c";
    this.apiUrl =
      process.env.DEEPSEEK_API_URL ||
      "https://api.deepseek.com/v1/chat/completions";

    // Log warning jika using fallback API key
    if (!this.apiKey) {
      console.error(
        "DEEPSEEK_API_KEY tidak ditemukan di environment variables!"
      );
      throw new Error("DEEPSEEK_API_KEY tidak dikonfigurasi");
    }
  }

  /**
   * Membuat prompt untuk Deepseek AI berdasarkan objek yang terdeteksi
   * @param {Array} detectedObjects - Objek yang terdeteksi dari proses scanning
   * @param {Array} materialSuggestions - Saran material dari hasil ML
   * @returns {String} - Prompt yang diformat
   */
  createPrompt(detectedObjects, materialSuggestions) {
    // Ambil 3 material teratas yang direkomendasikan
    const topMaterials = materialSuggestions
      .filter((material) => material.suggested)
      .map((material) => material.material)
      .slice(0, 3);

    // Jika tidak ada material yang disarankan, gunakan semua material
    const materials =
      topMaterials.length > 0
        ? topMaterials
        : materialSuggestions.map((material) => material.material).slice(0, 3);

    // Buat daftar objek terdeteksi
    const objectList = detectedObjects
      .map(
        (obj) =>
          `${obj.class} (tingkat keyakinan: ${Math.round(obj.score * 100)}%)`
      )
      .join(", ");

    // Buat prompt dengan format JSON untuk respons yang terstruktur
    const prompt = `
Sebagai ahli kerajinan tangan yang menggunakan barang bekas, berikan rekomendasi kerajinan kreatif berdasarkan objek-objek berikut:

Objek terdeteksi: ${objectList}
Material yang direkomendasikan: ${materials.join(", ")}

Berikan respon dalam format JSON persis seperti berikut (dalam Bahasa Indonesia):
{
  "nama": "Nama kerajinan yang direkomendasikan",
  "bahan": ["Bahan 1", "Bahan 2", "Bahan 3", ...],
  "langkah": ["Langkah 1", "Langkah 2", "Langkah 3", ...],
  "tingkatKesulitan": "Mudah/Sedang/Sulit",
  "kategori": "Kategori kerajinan (misalnya: Dekorasi Rumah, Alat Tulis, dll)",
  "estimasiWaktu": "Estimasi waktu pengerjaan (misalnya: 1-2 jam)",
  "imagePrompt": "Deskripsi detail untuk menghasilkan gambar kerajinan ini"
}

Pastikan kerajinan yang direkomendasikan memanfaatkan material yang terdeteksi, mudah dibuat, dan ramah lingkungan. Berikan langkah-langkah yang cukup detail agar mudah diikuti.
`;

    console.log("Prompt untuk Deepseek AI:", prompt);
    return prompt;
  }

  /**
   * Mengirim prompt ke Deepseek AI API dan mendapatkan respon
   * @param {String} prompt - Prompt yang akan dikirim ke Deepseek AI
   * @returns {Object} - Respon dari Deepseek AI
   */
  async getCraftRecommendation(detectedObjects, materialSuggestions) {
    try {
      console.log("Memulai request ke Deepseek AI...");
      const prompt = this.createPrompt(detectedObjects, materialSuggestions);

      console.log("Request ke API Deepseek dengan URL:", this.apiUrl);

      // Payload untuk request ke Deepseek AI
      const payload = {
        model: "deepseek-chat", // Sesuaikan dengan model Deepseek yang tersedia
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah asisten kerajinan tangan yang ahli dalam mendaur ulang barang bekas menjadi kerajinan kreatif. Berikan rekomendasi kerajinan yang sesuai dengan material yang tersedia dalam format JSON yang diminta.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      };

      console.log("Payload request:", JSON.stringify(payload, null, 2));

      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        timeout: 30000, // 30 detik timeout
      });

      console.log("Respons dari Deepseek AI diterima:", response.status);
      console.log("Response data:", JSON.stringify(response.data, null, 2));

      // Parse respons dari Deepseek AI
      const craftRecommendation = response.data.choices[0].message.content;
      console.log("Rekomendasi mentah dari Deepseek AI:", craftRecommendation);

      // Ekstrak JSON dari respons
      let jsonResponse = {};
      try {
        // Coba parse response sebagai JSON
        jsonResponse = JSON.parse(craftRecommendation.trim());
        console.log("JSON berhasil di-parse:", jsonResponse);
      } catch (jsonError) {
        console.error("Error parsing JSON dari respons Deepseek:", jsonError);
        throw new Error("Gagal memproses respons AI: Format tidak valid");
      }

      // Pastikan semua field yang diperlukan ada
      const recommendation = {
        nama: jsonResponse.nama,
        bahan: jsonResponse.bahan,
        langkah: jsonResponse.langkah,
        tingkatKesulitan: jsonResponse.tingkatKesulitan,
        kategori: jsonResponse.kategori,
        estimasiWaktu: jsonResponse.estimasiWaktu,
        imagePrompt:
          jsonResponse.imagePrompt ||
          `Kerajinan tangan ${jsonResponse.nama || ""} dari bahan daur ulang`,
      };

      // Validasi bahwa field yang diharapkan ada di respons
      if (
        !recommendation.nama ||
        !recommendation.bahan ||
        !recommendation.langkah
      ) {
        throw new Error(
          "Respons AI tidak lengkap: Field wajib tidak ditemukan"
        );
      }

      return {
        success: true,
        aiGenerated: true,
        recommendation: recommendation,
        rawResponse: craftRecommendation,
      };
    } catch (error) {
      console.error("Error dalam komunikasi dengan Deepseek AI:", error);

      // Log detail error untuk debugging
      if (error.response) {
        // Server merespons dengan status error
        console.error("Status error:", error.response.status);
        console.error("Data error:", error.response.data);
        console.error("Headers error:", error.response.headers);
      } else if (error.request) {
        // Request dibuat tapi tidak ada respons
        console.error("Request dibuat tapi tidak ada respons:", error.request);
      } else {
        // Error lainnya
        console.error("Error message:", error.message);
      }

      // Coba koneksi manual ke Deepseek untuk debugging
      this.testDeepseekConnection();

      throw new Error(
        `Gagal mendapatkan rekomendasi dari Deepseek AI: ${error.message}`
      );
    }
  }

  /**
   * Test koneksi ke Deepseek API
   */
  async testDeepseekConnection() {
    try {
      console.log("Mencoba test koneksi ke Deepseek API...");

      // Gunakan simple request untuk test koneksi
      const testResponse = await axios.get("https://api.deepseek.com", {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        timeout: 5000,
      });

      console.log("Test koneksi berhasil:", testResponse.status);
    } catch (testError) {
      console.error("Test koneksi gagal:", testError.message);
    }
  }
}

module.exports = new DeepseekService();
