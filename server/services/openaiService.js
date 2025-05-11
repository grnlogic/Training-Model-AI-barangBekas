const axios = require("axios");

class OpenAIService {
  constructor() {
    // Get OpenAI API key from environment variables
    this.apiKey = process.env.OPENAI_API_KEY || "";
    this.apiUrl =
      process.env.OPENAI_API_URL ||
      "https://api.openai.com/v1/chat/completions";

    // Log API key status (securely showing only first and last parts)
    if (this.apiKey) {
      const keyPreview =
        this.apiKey.substring(0, 8) +
        "..." +
        this.apiKey.substring(this.apiKey.length - 4);
      console.log(`OpenAI API key tersedia: ${keyPreview}`);
    } else {
      console.error("OPENAI_API_KEY tidak ditemukan di environment variables!");
    }

    // Add call tracking to prevent excessive API usage
    this.lastCallTime = 0;
    this.minTimeBetweenCalls = 3000; // 3 seconds between calls
    this.callCount = 0;
    this.maxCallsPerHour = 20; // Limit calls per hour
    this.callHistory = [];

    // Reset call count every hour
    setInterval(() => {
      this.callCount = 0;
      this.callHistory = [];
      console.log("OpenAI API call counter reset");
    }, 60 * 60 * 1000); // 1 hour

    // Set retry configuration - reduce to just 1 retry
    this.maxRetries = 1; // Override environment variable setting
    this.retryDelay = 3000; // 3 seconds delay between retries
  }

  /**
   * Utility function to wait for a specified time
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Membuat prompt untuk OpenAI yang sangat singkat
   */
  createPrompt(detectedObjects, materialSuggestions) {
    // Ultra-concise prompt to minimize tokens
    const mainObject = detectedObjects[0]?.class || "objek";
    const material = materialSuggestions[0]?.material || "barang bekas";

    // Super minimal prompt version
    return `Buat kerajinan dari ${mainObject}/${material}.
Format: {"nama":"nama_kerajinan","bahan":["bahan1","bahan2"],"langkah":["langkah1","langkah2"],"tingkatKesulitan":"Mudah/Sedang/Sulit","kategori":"kategori","estimasiWaktu":"waktu","imagePrompt":"deskripsi"}`;
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
   * Mendapatkan rekomendasi kerajinan dari OpenAI
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
        "OPENAI_API_KEY tidak ditemukan. Harap setting environment variable."
      );
    }

    let retries = this.maxRetries; // Now equals 1

    while (retries >= 0) {
      try {
        console.log(
          `Memulai request ke OpenAI... (retry attempt: ${
            this.maxRetries - retries
          } of ${this.maxRetries})`
        );

        // Create prompt for API request - use ultra concise version
        const prompt = this.createPrompt(detectedObjects, materialSuggestions);
        console.log("Prompt untuk OpenAI (ultra pendek):", prompt);

        // Get max tokens - use much smaller value
        const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || "300", 10);

        // Prepare the payload with minimum token settings
        const payload = {
          model: "gpt-3.5-turbo", // Always use this model for consistency
          messages: [
            {
              role: "system",
              content:
                "Buat ide kerajinan dari barang bekas dalam format JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
        };

        // Log API request details
        console.log(`Request ke OpenAI dengan max_tokens: ${maxTokens}`);
        console.log(
          `API call count: ${this.callCount}/${this.maxCallsPerHour} dalam 1 jam terakhir`
        );

        // Make the API request with proper headers
        const response = await axios.post(this.apiUrl, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          timeout: 15000, // 15 second timeout - reduced from 60s
        });

        console.log(`OpenAI API response status: ${response.status}`);

        // Parse response from OpenAI
        const craftRecommendation = response.data.choices[0].message.content;
        console.log(
          "Rekomendasi mentah dari OpenAI:",
          craftRecommendation.substring(0, 100) + "..."
        );

        // Extract JSON from response
        let jsonResponse = {};
        try {
          // Try to parse response as JSON
          jsonResponse = JSON.parse(craftRecommendation.trim());

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
          console.error("Error parsing JSON dari respons OpenAI:", jsonError);
          // Extract JSON from string using regex if parsing fails
          const jsonMatch = craftRecommendation.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              jsonResponse = JSON.parse(jsonMatch[0]);
            } catch (regexError) {
              console.error("Error parsing JSON dengan regex:", regexError);
              throw new Error("Format respons AI tidak valid");
            }
          } else {
            throw new Error("Format respons AI tidak valid");
          }
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
          rawResponse: craftRecommendation,
        };
      } catch (error) {
        console.error("Error dalam komunikasi dengan OpenAI:", error);

        // Handle rate limit errors with retry logic - now only 1 retry
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

        // Handle quota exceeded specifically
        if (
          error.response &&
          error.response.status === 429 &&
          error.response.data?.error?.code === "insufficient_quota"
        ) {
          console.error("API quota exceeded:", error.response.data);
          throw new Error(
            "Kuota API OpenAI telah habis. Silakan coba lagi nanti atau hubungi administrator."
          );
        }

        // Log detailed error information
        if (error.response) {
          console.error(`OpenAI API error status: ${error.response.status}`);
          console.error("Error data:", JSON.stringify(error.response.data));
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }

        // Additional rate limiting error handling
        if (error.message.includes("Terlalu banyak permintaan")) {
          console.error("Rate limit error:", error.message);
          // Create a pre-defined fallback for when rate limited
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
            rawResponse: JSON.stringify({
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
            }),
          };
        }

        throw error;
      }
    }
  }

  // Add method to check API quota status
  async checkQuota() {
    try {
      // Simple and lightweight request to check if API is responding
      const response = await axios.post(
        this.apiUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          timeout: 5000, // Short timeout for quick check
        }
      );

      return { available: true };
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Quota exceeded
        return {
          available: false,
          reason: "quota_exceeded",
          message: "API quota has been exceeded",
        };
      }

      return {
        available: false,
        reason: "other_error",
        message: error.message,
      };
    }
  }
}

module.exports = new OpenAIService();
