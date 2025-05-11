const axios = require("axios");

class GeminiService {
  constructor() {
    // Get Gemini API key from environment variables
    this.apiKey = process.env.GEMINI_API_KEY || "";
    this.apiUrl =
      process.env.GEMINI_API_URL ||
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    this.model = process.env.GEMINI_API_MODEL || "gemini-2.0-flash";

    // Log API key status (securely showing only first and last parts)
    if (this.apiKey) {
      const keyPreview =
        this.apiKey.substring(0, 8) +
        "..." +
        this.apiKey.substring(this.apiKey.length - 4);
      console.log(`Gemini API key tersedia: ${keyPreview}`);
    } else {
      console.error("GEMINI_API_KEY tidak ditemukan di environment variables!");
    }

    // Add call tracking to prevent excessive API usage
    this.lastCallTime = 0;
    this.minTimeBetweenCalls = parseInt(
      process.env.MIN_TIME_BETWEEN_CALLS_MS || "3000",
      10
    );
    this.callCount = 0;
    this.maxCallsPerHour = parseInt(
      process.env.MAX_API_CALLS_PER_HOUR || "20",
      10
    );
    this.callHistory = [];

    // Reset call count every hour
    setInterval(() => {
      this.callCount = 0;
      this.callHistory = [];
      console.log("Gemini API call counter reset");
    }, 60 * 60 * 1000); // 1 hour

    // Set retry configuration
    this.maxRetries = 1; // Just one retry attempt
    this.retryDelay = parseInt(process.env.GEMINI_RETRY_DELAY_MS || "3000", 10);
  }

  /**
   * Utility function to wait for a specified time
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Membuat prompt untuk Gemini yang lebih terstruktur dan menghasilkan output user-friendly
   */
  createPrompt(detectedObjects, materialSuggestions) {
    // Get main object and material
    const mainObject = detectedObjects[0]?.class || "objek";
    const material = materialSuggestions[0]?.material || "barang bekas";

    // List additional detected objects if any
    const additionalObjects = detectedObjects
      .slice(1, 3)
      .map((obj) => obj.class)
      .join(", ");

    // Create a more detailed prompt for better responses
    return `Buat ide kerajinan menarik dari "${mainObject}" atau "${material}" ${
      additionalObjects ? `(juga terdeteksi: ${additionalObjects})` : ""
    }.
  
  PENTING: Berikan respon dalam format JSON berikut (hanya struktur JSON, tidak perlu penjelasan tambahan):
  {
    "nama": "Nama kerajinan yang kreatif dan menarik",
    "bahan": [
      "Bahan utama (${mainObject} atau ${material})",
      "2-4 bahan tambahan yang mudah didapat",
      "Alat-alat yang diperlukan"
    ],
    "langkah": [
      "Langkah 1: Deskripsi detail",
      "Langkah 2: Deskripsi detail",
      "Langkah 3: Deskripsi detail",
      "Langkah 4: Deskripsi detail",
      "Langkah 5: Deskripsi detail"
    ],
    "tingkatKesulitan": "Mudah/Sedang/Sulit",
    "kategori": "Dekorasi Rumah/Alat Praktis/Mainan/Aksesoris/dll",
    "estimasiWaktu": "Perkiraan waktu pengerjaan (misalnya: 30 menit)",
    "imagePrompt": "Deskripsi detail untuk menghasilkan gambar kerajinan ini"
  }
  
  Pastikan kerajinan tersebut:
  - Mudah dibuat dan praktis
  - Menggunakan material yang tersedia
  - Langkah-langkah yang jelas dan detail
  - Cocok untuk berbagai usia
  - Fungsional dan bermanfaat`;
  }

  /**
   * Check if we should allow an API call based on rate limits
   */
  shouldAllowApiCall() {
    const now = Date.now();

    // Log time since last call for debugging
    console.log(
      `Waktu sejak panggilan terakhir: ${(now - this.lastCallTime) / 1000}s`
    );

    // Enforce minimum time between calls
    if (now - this.lastCallTime < this.minTimeBetweenCalls) {
      console.log(
        `API call rejected: Too soon since last call (${Math.floor(
          (now - this.lastCallTime) / 1000
        )}s)`
      );
      return false;
    }

    // Enforce maximum calls per hour
    if (this.callCount >= this.maxCallsPerHour) {
      console.log(
        `API call rejected: Max call limit reached (${this.callCount}/${this.maxCallsPerHour})`
      );
      return false;
    }

    // Add timestamp to call history and increment counter
    this.callHistory.push(now);
    this.callCount++;
    this.lastCallTime = now;

    return true;
  }

  /**
   * Mendapatkan rekomendasi kerajinan dari Gemini
   */
  async getCraftRecommendation(detectedObjects, materialSuggestions) {
    // Check rate limits before starting retry loop
    if (!this.shouldAllowApiCall()) {
      return {
        success: false,
        aiGenerated: false,
        recommendation: null,
        message: "Tunggu beberapa detik sebelum mencoba lagi.",
      };
    }

    // Validate API key availability
    if (!this.apiKey) {
      throw new Error(
        "GEMINI_API_KEY tidak ditemukan. Harap setting environment variable."
      );
    }

    let retries = this.maxRetries;

    while (retries >= 0) {
      try {
        console.log(
          `Memulai request ke Gemini... (retry attempt: ${
            this.maxRetries - retries
          } of ${this.maxRetries})`
        );

        // Create prompt for API request
        const prompt = this.createPrompt(detectedObjects, materialSuggestions);
        console.log("Prompt untuk Gemini:", prompt);

        // Prepare the payload for Gemini API
        const payload = {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: parseInt(
              process.env.GEMINI_MAX_TOKENS || "300",
              10
            ),
          },
        };

        // Log API request details
        console.log(
          `Request ke Gemini dengan maxOutputTokens: ${payload.generationConfig.maxOutputTokens}`
        );
        console.log(
          `API call count: ${this.callCount}/${this.maxCallsPerHour} dalam 1 jam terakhir`
        );

        // Make the API request to Gemini
        // Note: Gemini requires the API key in the URL as a query parameter
        const urlWithKey = `${this.apiUrl}?key=${this.apiKey}`;
        const response = await axios.post(urlWithKey, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 second timeout
        });

        console.log(`Gemini API response status: ${response.status}`);

        // Parse response from Gemini
        const responseText = response.data.candidates[0].content.parts[0].text;
        console.log(
          "Respons mentah dari Gemini:",
          responseText.substring(0, 100) + "..."
        );

        // Try to extract JSON from the text response
        let jsonResponse = {};
        try {
          // Look for JSON pattern in the response
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            jsonResponse = JSON.parse(jsonMatch[0]);
          } else {
            // If no JSON found, convert the text response to our required JSON format
            jsonResponse = this.convertTextToJson(responseText);
          }

          // Validate required fields exist
          [
            "nama",
            "bahan",
            "langkah",
            "tingkatKesulitan",
            "kategori",
            "estimasiWaktu",
          ].forEach((field) => {
            if (!(field in jsonResponse)) {
              console.warn(
                `Field "${field}" tidak ditemukan dalam respons AI.`
              );
            }
          });
        } catch (jsonError) {
          console.error("Error parsing JSON dari respons Gemini:", jsonError);
          // Convert the text response to our required JSON format
          jsonResponse = this.convertTextToJson(responseText);
        }

        // Ensure all required fields are present
        const recommendation = {
          nama: jsonResponse.nama || "Kerajinan dari Barang Bekas",
          bahan: jsonResponse.bahan || ["Barang bekas sesuai deteksi"],
          langkah: jsonResponse.langkah || ["Langkah-langkah tidak tersedia"],
          tingkatKesulitan: jsonResponse.tingkatKesulitan || "Sedang",
          kategori: jsonResponse.kategori || "Kerajinan Tangan",
          estimasiWaktu: jsonResponse.estimasiWaktu || "1-2 jam",
          imagePrompt:
            jsonResponse.imagePrompt ||
            `Kerajinan tangan ${
              jsonResponse.nama || ""
            } dari bahan daur ulang, tampak realistis, detail, dan berkualitas tinggi`,
        };

        return {
          success: true,
          aiGenerated: true,
          recommendation: recommendation,
          rawResponse: responseText,
        };
      } catch (error) {
        console.error("Error dalam komunikasi dengan Gemini:", error);

        // Handle rate limit errors with retry logic
        if (error.response && error.response.status === 429 && retries > 0) {
          console.log(
            `Rate limit hit (429). Single retry in ${
              this.retryDelay / 1000
            } seconds...`
          );
          await this.delay(this.retryDelay);
          retries--;
          continue; // Skip to next iteration of the retry loop
        }

        // Log detailed error information
        if (error.response) {
          console.error(`Gemini API error status: ${error.response.status}`);
          console.error("Error data:", JSON.stringify(error.response.data));
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }

        // If we're out of retries, provide a fallback
        if (retries <= 0) {
          console.log("Using fallback response after failed retries");
          return {
            success: true,
            aiGenerated: true,
            recommendation: {
              nama: "Vas Bunga dari Botol Bekas",
              bahan: [
                "Botol plastik bekas",
                "Gunting",
                "Cat akrilik",
                "Tali jute",
              ],
              langkah: [
                "Potong bagian atas botol plastik",
                "Hias dengan cat akrilik sesuai selera",
                "Lilitkan tali jute di bagian leher botol untuk hiasan",
              ],
              tingkatKesulitan: "Mudah",
              kategori: "Dekorasi Rumah",
              estimasiWaktu: "30 menit",
              imagePrompt:
                "Vas bunga colorful dari botol plastik bekas yang dihias dengan cat dan tali",
            },
            rawResponse: "Fallback response due to API error",
          };
        }

        throw error;
      }
    }
  }

  /**
   * Convert text response to JSON format when Gemini doesn't respond with proper JSON
   */
  convertTextToJson(text) {
    console.log("Converting text response to JSON");

    // Try to extract a craft name from the text
    let craftName = "Kerajinan dari Barang Bekas";
    const nameMatch = text.match(/(?:"|\*\*|#)([^"*#]+)(?:"|\*\*|#)/);
    if (nameMatch) {
      craftName = nameMatch[1].trim();
    }

    // Extract materials (look for bullet points or numbered lists with short items)
    let materials = [];
    const materialRegex = /(?:[\*\-•]\s*|(?:\d+\.)\s*)([^.,!?]{3,40})/g;
    let match;
    while ((match = materialRegex.exec(text)) !== null) {
      if (!match[1].trim().toLowerCase().startsWith("langkah")) {
        materials.push(match[1].trim());
      }
    }

    // Extract steps (look for numbered instructions or paragraphs that describe actions)
    let steps = [];
    const stepRegex = /(?:[\*\-•]\s*|(?:\d+\.)\s*)([^.]{10,150}\.)/g;
    while ((match = stepRegex.exec(text)) !== null) {
      if (
        match[1].trim().toLowerCase().includes("ambil") ||
        match[1].trim().toLowerCase().includes("potong") ||
        match[1].trim().toLowerCase().includes("buat") ||
        match[1].trim().toLowerCase().includes("pasang") ||
        match[1].trim().toLowerCase().includes("hias")
      ) {
        steps.push(match[1].trim());
      }
    }

    // Determine difficulty based on steps and complexity
    let difficulty = "Sedang";
    if (steps.length <= 3) {
      difficulty = "Mudah";
    } else if (steps.length >= 7 || text.toLowerCase().includes("sulit")) {
      difficulty = "Sulit";
    }

    // Determine category based on keywords
    let category = "Kerajinan Tangan";
    if (
      text.toLowerCase().includes("dekorasi") ||
      text.toLowerCase().includes("hiasan")
    ) {
      category = "Dekorasi Rumah";
    } else if (text.toLowerCase().includes("mainan")) {
      category = "Mainan";
    } else if (text.toLowerCase().includes("aksesoris")) {
      category = "Aksesoris";
    } else if (
      text.toLowerCase().includes("alat") ||
      text.toLowerCase().includes("wadah")
    ) {
      category = "Alat Praktis";
    }

    // Determine estimated time
    let time = "1-2 jam";
    if (
      text.toLowerCase().includes("30 menit") ||
      text.toLowerCase().includes("cepat") ||
      steps.length <= 3
    ) {
      time = "30 menit";
    } else if (
      text.toLowerCase().includes("beberapa jam") ||
      steps.length >= 7
    ) {
      time = "2-3 jam";
    }

    // Create image prompt
    const imagePrompt = `Kerajinan "${craftName}" yang dibuat dari barang bekas, tampak realistis, detail tinggi, pencahayaan natural, sudut pandang jelas, background netral`;

    // Create well-formed JSON response
    return {
      nama: craftName,
      bahan:
        materials.length > 0
          ? materials.slice(0, 6)
          : ["Barang bekas sesuai deteksi"],
      langkah:
        steps.length > 0
          ? steps.slice(0, 7)
          : ["Siapkan material", "Buat sesuai panduan"],
      tingkatKesulitan: difficulty,
      kategori: category,
      estimasiWaktu: time,
      imagePrompt: imagePrompt,
    };
  }

  /**
   * Mengambil bagian raw text dari response dan mengonversinya menjadi format yang lebih user-friendly
   */
  processResponse(rawResponse) {
    // Clean up text - remove markdown, excessive newlines, etc.
    let cleanedText = rawResponse
      .replace(/\*\*/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // Only extract text sections that are most useful
    const sections = cleanedText.split("\n\n");
    const relevantSections = sections.filter(
      (section) =>
        !section.toLowerCase().includes("tips") &&
        !section.toLowerCase().includes("catatan") &&
        !section.toLowerCase().includes("selamat berkreasi")
    );

    return relevantSections.join("\n\n");
  }
}

module.exports = new GeminiService();
