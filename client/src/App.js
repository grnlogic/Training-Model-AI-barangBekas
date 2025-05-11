import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap"; // Add Button import
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import DetectionResults from "./components/DetectionResults";
import CraftSuggestion from "./components/CraftSuggestion";
import Footer from "./components/Footer";
import Swal from "sweetalert2"; // Import SweetAlert
import ApiTester from "./components/ApiTester";

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

      // Jika berhasil dan ada suggestion
      if (data.suggestion) {
        // Set craft suggestion dengan data dari AI
        setCraftSuggestion({
          ...data.suggestion,
          // Tambahkan informasi sumber data
          source: data.suggestion.isAI ? "ai" : "database",
          // Simpan jawaban mentah dari AI jika ada
          rawAIResponse: data.fullAIResponse || null,
          // Simpan informasi material terdeteksi
          detectedMaterials: data.materials || [],
          // Simpan sumber AI (jika ada)
          aiSource: data.suggestion.aiSource || "openai",
        });

        // Tampilkan SweetAlert sukses (tanpa kondisi untuk fallback)
        Swal.fire({
          icon: "success",
          title: "Rekomendasi AI Berhasil!",
          html: `Rekomendasi kerajinan berhasil dibuat menggunakan <b>${
            data.suggestion.aiSource
              ? `${data.suggestion.aiSource.toUpperCase()}`
              : "AI"
          }</b>`,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
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
    <div className="App d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <div className="container py-4">
          {/* Add button to toggle API tester */}
          <div className="text-end mb-3">
            <Button
              variant={showApiTester ? "secondary" : "info"}
              size="sm"
              onClick={() => setShowApiTester(!showApiTester)}
            >
              {showApiTester ? "Sembunyikan Penguji API" : "Penguji API"}
            </Button>
          </div>

          {/* Show API tester when button is clicked */}
          {showApiTester && <ApiTester />}

          {showIntro && (
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="mb-4">Selamat Datang di BarbekRaft</h2>
                <p className="lead mb-4">
                  Aplikasi cerdas untuk mengubah barang bekas menjadi kerajinan
                  bermanfaat menggunakan kekuatan AI.
                </p>
                <div className="row mt-5">
                  <div className="col-md-4 mb-4">
                    <div className="intro-card">
                      <div className="card-body">
                        <i
                          className="bi bi-camera-fill text-primary"
                          style={{ fontSize: "2.5rem" }}
                        ></i>
                        <h5 className="mt-3">Ambil Foto</h5>
                        <p className="text-muted">
                          Ambil foto barang bekas yang Anda miliki
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="intro-card">
                      <div className="card-body">
                        <i
                          className="bi bi-search text-info"
                          style={{ fontSize: "2.5rem" }}
                        ></i>
                        <h5 className="mt-3">AI Mendeteksi</h5>
                        <p className="text-muted">
                          AI kami mendeteksi objek dalam gambar
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="intro-card">
                      <div className="card-body">
                        <i
                          className="bi bi-lightbulb-fill text-warning"
                          style={{ fontSize: "2.5rem" }}
                        ></i>
                        <h5 className="mt-3">Dapatkan Ide</h5>
                        <p className="text-muted">
                          Dapatkan saran kerajinan yang bisa dibuat
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary mt-3">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Mulai dengan mengunggah foto barang bekas seperti botol
                  plastik, kardus, kaleng, atau kain bekas.
                </div>
              </div>
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="row g-4">
            <div className={uploadedImage ? "col-lg-5" : "col-lg-6 mx-auto"}>
              <ImageUpload
                onObjectsDetected={handleObjectsDetected}
                setUploadedImage={setUploadedImage}
              />

              {detectedObjects.length > 0 && (
                <DetectionResults
                  objects={detectedObjects}
                  isLoading={isLoading}
                />
              )}
            </div>

            {uploadedImage && (
              <div className="col-lg-7">
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

                {craftSuggestion && (
                  <CraftSuggestion
                    suggestion={craftSuggestion}
                    isLoading={isLoading}
                    detectedObjects={detectedObjects}
                    onSelectAlternative={handleSelectAlternative}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
