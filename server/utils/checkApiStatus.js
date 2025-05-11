// API Connectivity Checker Script
require("dotenv").config();
const axios = require("axios");

async function checkOpenAIStatus() {
  console.log("=======================================");
  console.log("   OPENAI API KEY STATUS CHECK");
  console.log("=======================================");

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error(
      "❌ OPENAI_API_KEY tidak ditemukan di environment variables!"
    );
    return false;
  }

  console.log(
    `✅ API Key ditemukan: ${apiKey.substring(0, 8)}...${apiKey.substring(
      apiKey.length - 4
    )}`
  );

  try {
    // Make a minimal API call to check connectivity and quota
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Test API connectivity" }],
        max_tokens: 5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("✅ API Connection successful!");
    console.log(`✅ Model access is working: ${response.data.model}`);
    console.log("✅ Response status:", response.status);
    console.log("=======================================");
    console.log("API Key telah terverifikasi dan berfungsi dengan baik!");
    console.log("=======================================");
    return true;
  } catch (error) {
    console.log("❌ API Connection failed!");

    if (error.response) {
      console.error("Status Code:", error.response.status);
      console.error("Error Data:", error.response.data);

      // Check for common errors
      if (error.response.status === 401) {
        console.error(
          "❌ API key tidak valid. Cek apakah API key sudah benar dan aktif."
        );
      } else if (error.response.status === 429) {
        console.error(
          "❌ Kuota habis atau rate limit tercapai. Harap periksa billing di dashboard OpenAI."
        );
      } else if (error.response.status === 404) {
        console.error("❌ Endpoint API tidak ditemukan. Periksa URL API.");
      } else if (error.response.status >= 500) {
        console.error("❌ Server error. Coba lagi nanti.");
      }
    } else if (error.request) {
      console.error("❌ Network error atau timeout. Periksa koneksi internet.");
    } else {
      console.error("❌ Error:", error.message);
    }

    console.log("=======================================");
    console.log("Tindakan yang disarankan:");
    console.log("1. Periksa apakah API key sudah benar");
    console.log("2. Pastikan billing di akun OpenAI sudah diatur");
    console.log("3. Cek kuota dan penggunaan di dashboard OpenAI");
    console.log("4. Jika menggunakan kartu kredit, pastikan kartu aktif");
    console.log("5. Cek apakah ada pembatasan regional untuk OpenAI");
    console.log("=======================================");
    return false;
  }
}

// Run the check when the script is executed directly
if (require.main === module) {
  checkOpenAIStatus().then((status) => {
    if (!status) {
      process.exit(1);
    }
  });
}

module.exports = { checkOpenAIStatus };
