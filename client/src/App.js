import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import DetectionResults from "./components/DetectionResults";
import CraftSuggestion from "./components/CraftSuggestion";
import Footer from "./components/Footer";
import Swal from "sweetalert2";
import ApiTester from "./components/ApiTester";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import AboutPage from "./pages/AboutPage";
import CategorySection from "./components/CategorySection";
import RecentProjects from "./components/RecentProjects";
import PopularTutorials from "./components/PopularTutorials";
import MarketplaceSection from "./components/MarketplaceSection";
import CommunitySection from "./components/CommunitySection";

// Add a debounce function to prevent excessive API calls
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function App() {
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [craftSuggestion, setCraftSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [error, setError] = useState(null);
  const [showApiTester, setShowApiTester] = useState(false);
  const [lastApiCallTime, setLastApiCallTime] = useState(0);
  const minTimeBetweenCalls = 5000; // 5 seconds

  // Debounced version of API call function
  const debouncedGenerateCraftSuggestion = debounce((objects) => {
    const now = Date.now();
    if (now - lastApiCallTime < minTimeBetweenCalls) {
      console.log("API call prevented - too soon since last call");
      return;
    }

    setLastApiCallTime(now);
    generateCraftSuggestion(objects);
  }, 1000); // 1 second debounce

  // Check for dark mode preference
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const handleObjectsDetected = (objects) => {
    setDetectedObjects(objects);

    // Hide intro when detection happens
    setShowIntro(false);

    // Clear any previous errors
    setError(null);

    // Use debounced version to prevent excessive API calls
    debouncedGenerateCraftSuggestion(objects);
  };

  const generateCraftSuggestion = async (objects) => {
    try {
      setIsLoading(true);

      // Tampilkan SweetAlert loading
      Swal.fire({
        title: "Memproses...",
        html: "Mengirim data ke AI untuk rekomendasi kerajinan",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      // Log untuk debugging
      console.log("Mengirim objek terdeteksi ke server:", objects);

      // Make API request with full URL for clarity
      const apiUrl = "/api/suggest";
      console.log("Making request to endpoint:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ objects }),
      });

      // Parsing response terlebih dahulu untuk log error
      const responseText = await response.text();
      console.log("Raw server response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse server response:", parseError);
        throw new Error(`Server returned invalid JSON: ${responseText}`);
      }

      // Tutup SweetAlert loading
      Swal.close();

      // Jika server mengembalikan error, tampilkan error tersebut
      if (!response.ok || !data.success) {
        const errorMessage = data.message || `Error: ${response.status}`;
        console.error("Server response error:", errorMessage, data);

        // Tampilkan SweetAlert error dengan detail dari server
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: `AI tidak bisa memberikan rekomendasi: ${errorMessage}`,
          footer: '<a href="#">Hubungi administrator untuk bantuan</a>',
          confirmButtonColor: "#d33",
        });

        throw new Error(errorMessage);
      }

      // Jika berhasil dan ada suggestion, tampilkan dalam popup
      if (data.suggestion) {
        setCraftSuggestion({
          ...data.suggestion,
          source: data.suggestion.isAI ? "ai" : "database",
          rawAIResponse: data.fullAIResponse || null,
          detectedMaterials: data.materials || [],
          aiSource: data.suggestion.aiSource || "openai",
        });

        // Display the craft suggestion in a popup
        Swal.fire({
          title: "Rekomendasi Kerajinan",
          html: `
            <div class="text-start">
              <h4>${data.suggestion.nama}</h4>
              <div class="alert alert-primary mb-3">
                <i class="bi bi-info-circle-fill me-2"></i>
                <strong>Kerajinan ini dibuat dari:</strong>
                <span class="ms-1">${
                  data.suggestion.bahan && data.suggestion.bahan.length > 0
                    ? data.suggestion.bahan.slice(0, 3).join(", ")
                    : "Barang bekas yang terdeteksi"
                }</span>
              </div>
              <h5><i class="bi bi-list-ol me-2"></i>Langkah Pembuatan:</h5>
              <ol class="text-start">
                ${
                  data.suggestion.langkah
                    ? data.suggestion.langkah
                        .map((step) => `<li>${step}</li>`)
                        .join("")
                    : "<li>Panduan langkah tidak tersedia</li>"
                }
              </ol>
            </div>
          `,
          imageUrl:
            data.suggestion.image ||
            "https://dummyimage.com/400x300/cccccc/ffffff&text=Contoh+Kerajinan",
          imageAlt: data.suggestion.nama,
          imageWidth: 400,
          imageHeight: 300,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: "Lihat Detail",
          cancelButtonText: "Tutup",
          confirmButtonColor: "#27ae60",
          width: "800px",
        }).then((result) => {
          if (result.isConfirmed) {
            // Scroll to craft suggestion component for details
            const element = document.getElementById("craft-suggestion-top");
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        });
      } else {
        throw new Error("Tidak ada rekomendasi kerajinan dari AI");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error generating craft suggestion:", error);

      // Tutup SweetAlert loading
      Swal.close();

      // Check for common quota error messages
      const isQuotaError =
        error.message.includes("quota") ||
        error.message.includes("Kuota API") ||
        error.message.includes("insufficient_quota");

      // Customize error message for quota issues
      const errorMessage = isQuotaError
        ? "Kuota API OpenAI telah habis. Silakan coba lagi nanti."
        : `${error.message}. Silakan coba lagi atau hubungi administrator.`;

      // Tampilkan SweetAlert error yang lebih informatif
      Swal.fire({
        icon: isQuotaError ? "warning" : "error",
        title: isQuotaError
          ? "Kuota API Habis"
          : "Gagal Mendapatkan Rekomendasi AI",
        text: errorMessage,
        confirmButtonColor: "#d33",
        showCancelButton: true,
        cancelButtonText: "Tutup",
        confirmButtonText: "Coba Lagi",
      }).then((result) => {
        if (result.isConfirmed) {
          // Coba ulang jika user menekan tombol coba lagi
          if (detectedObjects.length > 0) {
            generateCraftSuggestion(detectedObjects);
          }
        }
      });

      setError(
        `Terjadi kesalahan saat mengambil rekomendasi AI: ${error.message}`
      );
      setIsLoading(false);
    }
  };

  // Handle alternative selection
  const handleSelectAlternative = (alternativeCraft) => {
    setCraftSuggestion(alternativeCraft);

    // Scroll to top of craft suggestion
    const element = document.getElementById("craft-suggestion-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <div className="container py-4">
            {/* API Tester toggler (only if needed) */}
            {showApiTester && <ApiTester />}

            {/* Hero Section with improved layout */}
            <div className="hero-wrapper">
              <div className="row align-items-center hero-section">
                <div className="col-lg-6">
                  <div className="hero-content">
                    <h1 className="hero-title">
                      Ubah Barang Bekas Menjadi Karya Kreatif dengan AI
                    </h1>
                    <p className="hero-subtitle">
                      Upload foto barang bekas Anda dan dapatkan rekomendasi ide
                      kerajinan secara instan dari AI kami.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src="/images/recycle-illustration.png"
                    alt="Recycle Illustration"
                    className="img-fluid hero-image"
                    onError={(e) => {
                      e.target.src =
                        "https://dummyimage.com/600x400/eee/27ae60&text=Daur+Ulang+Kreatif";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Upload and Results Section - Better organized */}
            <div className="upload-results-section">
              <div className="row g-4">
                {/* Upload Section */}
                <div className="col-lg-6">
                  <div className="card upload-card">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">
                        <i className="bi bi-cloud-upload me-2"></i>
                        Upload Foto Barang Bekas
                      </h5>
                    </div>
                    <div className="card-body">
                      <ImageUpload
                        onObjectsDetected={handleObjectsDetected}
                        setUploadedImage={setUploadedImage}
                      />
                    </div>
                  </div>
                </div>

                {/* Processed Image & Detection Results */}
                <div className="col-lg-6">
                  {uploadedImage ? (
                    <div className="results-wrapper">
                      <div className="card mb-4">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">
                            <i className="bi bi-image me-2"></i>
                            Gambar yang Diproses
                          </h5>
                        </div>
                        <div className="card-body text-center">
                          <div className="uploaded-image-container">
                            <img
                              src={uploadedImage}
                              alt="Gambar yang diunggah"
                              className="img-fluid rounded"
                            />
                          </div>
                        </div>
                      </div>

                      {detectedObjects.length > 0 && (
                        <DetectionResults
                          detectedObjects={detectedObjects}
                          isLoading={isLoading}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="card upload-instruction-card h-100">
                      <div className="card-body text-center d-flex flex-column justify-content-center">
                        <i className="bi bi-arrow-left-circle display-1 text-muted mb-3"></i>
                        <h5>Unggah Foto di Sebelah Kiri</h5>
                        <p className="text-muted">
                          Hasil deteksi dan rekomendasi akan muncul di sini
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Craft Suggestion - if available */}
            {craftSuggestion && (
              <div className="row mt-4">
                <div className="col-12">
                  <CraftSuggestion
                    suggestion={craftSuggestion}
                    isLoading={isLoading}
                    detectedObjects={detectedObjects}
                    onSelectAlternative={handleSelectAlternative}
                  />
                </div>
              </div>
            )}

            {/* Section Divider */}
            <div className="section-divider my-5"></div>

            {/* Category Section */}
            <CategorySection />

            {/* Section Divider */}
            <div className="section-divider my-5"></div>

            {/* Recent Projects Section */}
            <RecentProjects />

            {/* Section Divider */}
            <div className="section-divider my-5"></div>

            {/* Popular Tutorials */}
            <PopularTutorials />

            {/* Section Divider */}
            <div className="section-divider my-5"></div>

            {/* Marketplace Section */}
            <MarketplaceSection />

            {/* Community Section */}
            <CommunitySection />
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
