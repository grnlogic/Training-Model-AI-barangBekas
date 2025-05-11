// AI API Connectivity Diagnostic Tool
require("dotenv").config();
const axios = require("axios");

// Configuration
const TIMEOUT = 10000; // 10 seconds timeout
const TEST_PROMPT = "Berikan ide kerajinan sederhana dari botol plastik bekas.";

/**
 * Test connectivity to all configured AI APIs
 */
async function runDiagnostics() {
  console.log("==== AI API CONNECTIVITY DIAGNOSTIC ====");
  console.log("Testing network...");

  // Test general internet connectivity
  try {
    console.log("Testing connection to google.com...");
    await axios.get("https://www.google.com", { timeout: 5000 });
    console.log("✅ Internet connectivity: OK");
  } catch (error) {
    console.error(
      "❌ Internet connectivity issue. Check your network connection."
    );
    console.error(error.message);
    process.exit(1);
  }

  // Log environment info
  console.log("\nEnvironment:");
  console.log(`Node.js: ${process.version}`);
  console.log(`Operating System: ${process.platform}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  // Log proxy settings if set
  if (process.env.HTTP_PROXY || process.env.HTTPS_PROXY) {
    console.log("\nProxy settings:");
    console.log(`HTTP_PROXY: ${process.env.HTTP_PROXY || "Not set"}`);
    console.log(`HTTPS_PROXY: ${process.env.HTTPS_PROXY || "Not set"}`);
  }

  console.log("\n==== TESTING AI SERVICES ====");

  // Test OpenAI (both key formats)
  await testOpenAI();

  // Test Gemini
  await testGemini();

  // Test Deepseek
  await testDeepseek();

  console.log("\n==== DIAGNOSTIC COMPLETE ====");
}

/**
 * Test OpenAI API connectivity
 */
async function testOpenAI() {
  console.log("\n🔍 Testing OpenAI API...");

  // Check if any OpenAI key is configured
  if (!process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY_ALT) {
    console.error("❌ OpenAI API key not found in environment variables.");
    return;
  }

  const apiUrl =
    process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions";
  console.log(`API URL: ${apiUrl}`);

  // Try the standard key format
  if (process.env.OPENAI_API_KEY) {
    console.log(
      `Testing with standard API key (${process.env.OPENAI_API_KEY.substring(
        0,
        10
      )}...)`
    );
    await testAPICall(
      "OpenAI (standard format)",
      apiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: TEST_PROMPT }],
        max_tokens: 50,
      },
      `Bearer ${process.env.OPENAI_API_KEY}`
    );
  }

  // Try the alternative key format
  if (process.env.OPENAI_API_KEY_ALT) {
    console.log(
      `Testing with alternative API key (${process.env.OPENAI_API_KEY_ALT.substring(
        0,
        15
      )}...)`
    );
    await testAPICall(
      "OpenAI (alternative format)",
      apiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: TEST_PROMPT }],
        max_tokens: 50,
      },
      `Bearer ${process.env.OPENAI_API_KEY_ALT}`
    );
  }
}

/**
 * Test Gemini API connectivity
 */
async function testGemini() {
  console.log("\n🔍 Testing Gemini API...");

  // Check if Gemini key is configured
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Gemini API key not found in environment variables.");
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl =
    process.env.GEMINI_API_URL ||
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const fullUrl = `${apiUrl}?key=${apiKey}`;
  console.log(`API URL: ${apiUrl}`);

  await testAPICall("Gemini", fullUrl, {
    contents: [{ parts: [{ text: TEST_PROMPT }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 100,
    },
  });
}

/**
 * Test Deepseek API connectivity
 */
async function testDeepseek() {
  console.log("\n🔍 Testing Deepseek API...");

  // Check if Deepseek key is configured
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error("❌ Deepseek API key not found in environment variables.");
    return;
  }

  const apiUrl =
    process.env.DEEPSEEK_API_URL ||
    "https://api.deepseek.com/v1/chat/completions";
  console.log(`API URL: ${apiUrl}`);

  await testAPICall(
    "Deepseek",
    apiUrl,
    {
      model: "deepseek-chat",
      messages: [{ role: "user", content: TEST_PROMPT }],
      max_tokens: 50,
    },
    `Bearer ${process.env.DEEPSEEK_API_KEY}`
  );
}

/**
 * Generic API call test
 */
async function testAPICall(serviceName, url, payload, authHeader = null) {
  try {
    console.log(`Making test request to ${serviceName}...`);

    const headers = {
      "Content-Type": "application/json",
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await axios.post(url, payload, {
      headers,
      timeout: TIMEOUT,
    });

    console.log(
      `✅ ${serviceName} connection successful (Status: ${response.status})`
    );
    console.log(
      `Response preview: ${JSON.stringify(response.data).substring(0, 100)}...`
    );
    return true;
  } catch (error) {
    console.error(`❌ ${serviceName} connection failed: ${error.message}`);

    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error("No response received from server");
    }

    return false;
  }
}

// Run the diagnostics
runDiagnostics().catch((error) => {
  console.error("Diagnostic tool encountered an error:", error);
});
