// Load environment variables from .env file
require("dotenv").config();

// Import API status checker
const { checkOpenAIStatus } = require("./utils/checkApiStatus");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mlService = require("./services/mlService");

// Initialize server with API validation
async function initializeServer() {
  console.log("Initializing server...");

  // Validate OpenAI API key
  console.log("Validating OpenAI API key...");
  const apiStatus = await checkOpenAIStatus();

  if (!apiStatus) {
    console.warn("⚠️ WARNING: OpenAI API key validation failed!");
    console.warn(
      "Server will still start, but AI functionality may not work correctly."
    );
  } else {
    console.log("✅ OpenAI API key is valid and working!");
  }

  // Initialize ML models
  try {
    console.log("Initializing ML models...");
    await mlService.initializeModels();
    console.log("ML models initialized successfully");
  } catch (error) {
    console.error("Failed to initialize ML models:", error);
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
}

// Configure Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
console.log("Mounting API routes at /api prefix");
app.use("/api", require("./routes/api"));

// Add a generic route handler for debugging missing routes
app.use((req, res, next) => {
  console.log(`Received request for: ${req.method} ${req.url}`);
  next();
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Start server with initialization
initializeServer().catch((err) => {
  console.error("Server initialization error:", err);
});
