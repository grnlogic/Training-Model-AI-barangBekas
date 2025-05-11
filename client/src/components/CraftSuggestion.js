import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

function CraftSuggestion({
  suggestion,
  isLoading,
  detectedObjects,
  onSelectAlternative,
}) {
  const [alternativeSuggestions, setAlternativeSuggestions] = useState([]);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [difficulty, setDifficulty] = useState("semua");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const [craftImage, setCraftImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSource, setImageSource] = useState("unsplash");
  const [additionalImages, setAdditionalImages] = useState([]);

  // Set the active suggestion initially
  useEffect(() => {
    if (suggestion && !isLoading) {
      setActiveSuggestion(suggestion);

      // Tunjukkan badge AI source jika tersedia
      if (suggestion.source === "ai" && suggestion.aiSource) {
        console.log(`Rekomendasi dari ${suggestion.aiSource.toUpperCase()} AI`);
      }
    }
  }, [suggestion, isLoading]);

  // Generate image when active suggestion changes
  useEffect(() => {
    if (activeSuggestion && !isLoading && activeSuggestion.imagePrompt) {
      console.log("Menghasilkan gambar untuk:", activeSuggestion.imagePrompt);

      // Jika server AI gagal, gunakan placeholder image dari Unsplash
      try {
        generateCraftImage(activeSuggestion.imagePrompt);
      } catch (error) {
        console.error("Gagal memuat gambar:", error);
        // Gunakan placeholder dari Unsplash dengan kata kunci dari imagePrompt
        const keywords = activeSuggestion.imagePrompt
          .split(" ")
          .slice(0, 3)
          .join(",");
        setCraftImage(
          `https://source.unsplash.com/random/400x300/?${encodeURIComponent(
            keywords
          )}`
        );
      }
    }
  }, [activeSuggestion, isLoading]);

  const generateImage = async (prompt) => {
    try {
      setIsGeneratingImage(true);

      // Tampilkan SweetAlert loading untuk generasi gambar
      Swal.fire({
        title: "Membuat Visualisasi",
        html: "Menghasilkan gambar kerajinan berdasarkan deskripsi AI",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      // Call API to generate image
      const response = await axios.post("/api/generate-image", { prompt });

      if (response.data && response.data.success) {
        setGeneratedImage(response.data.imageUrl);
        // Tutup SweetAlert
        Swal.close();
      } else {
        throw new Error("Gagal menghasilkan gambar");
      }

      setIsGeneratingImage(false);
    } catch (error) {
      console.error("Gagal menghasilkan gambar:", error);
      setIsGeneratingImage(false);

      // Tutup SweetAlert loading
      Swal.close();

      // Tampilkan SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Gagal Menghasilkan Gambar",
        text: "Tidak dapat membuat visualisasi untuk kerajinan ini",
        confirmButtonColor: "#d33",
      });
    }
  };

  const fetchAlternatives = async () => {
    try {
      setLoadingAlternatives(true);

      // Fetch different endpoint based on if it's a multi-object suggestion
      const endpoint = suggestion.isMulti ? "/api/crafts-multi" : "/api/crafts";
      const response = await axios.get(endpoint);

      if (response.data) {
        let filteredCrafts = [];

        if (suggestion.isMulti) {
          // For multi-object, filter by similar combinations
          const currentKombinasi = suggestion.kombinasi || [];
          filteredCrafts = response.data
            .filter((craft) => craft.id !== suggestion.id)
            .filter((craft) => {
              const similarKombinasi = craft.kombinasi.some((k) =>
                currentKombinasi.includes(k)
              );
              return similarKombinasi;
            });
        } else {
          // For single object, use category
          const category = getCraftCategory(suggestion.nama);
          filteredCrafts = Object.entries(response.data)
            .map(([key, value]) => ({ id: key, ...value })) // Convert to array with key as id
            .filter(
              (craft) =>
                getCraftCategory(craft.nama) === category &&
                craft.nama !== suggestion.nama
            );
        }

        // Shuffle array
        filteredCrafts = shuffleArray(filteredCrafts);

        // Limit to 3 alternatives
        filteredCrafts = filteredCrafts.slice(0, 3);

        setAlternativeSuggestions(filteredCrafts);
        setShowAlternatives(true);
      }

      setLoadingAlternatives(false);
    } catch (error) {
      console.error("Gagal mengambil alternatif:", error);
      setLoadingAlternatives(false);
    }
  };

  const getCraftCategory = (name) => {
    if (name.toLowerCase().includes("botol")) return "botol";
    if (name.toLowerCase().includes("kaleng")) return "kaleng";
    if (name.toLowerCase().includes("kardus")) return "kardus";
    if (name.toLowerCase().includes("kain")) return "kain";
    if (name.toLowerCase().includes("koran")) return "koran";
    if (name.toLowerCase().includes("elektronik")) return "elektronik";
    if (name.toLowerCase().includes("ban")) return "ban";
    if (name.toLowerCase().includes("kayu")) return "kayu";
    if (name.toLowerCase().includes("tutup botol")) return "tutup-botol";
    if (name.toLowerCase().includes("sedotan")) return "sedotan";
    if (name.toLowerCase().includes("cd") || name.toLowerCase().includes("dvd"))
      return "cd";
    if (
      name.toLowerCase().includes("sendok") ||
      name.toLowerCase().includes("garpu")
    )
      return "sendok-garpu";
    return "lainnya";
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getDifficultyLabel = (langkah, tingkatKesulitan) => {
    // If tingkatKesulitan is provided (for multi-object crafts)
    if (tingkatKesulitan) {
      return tingkatKesulitan;
    }

    // Fallback to length-based difficulty (for single object crafts)
    if (!langkah) return "Mudah";

    const steps = langkah.length;
    if (steps <= 3) return "Mudah";
    if (steps <= 5) return "Sedang";
    return "Sulit";
  };

  const getDifficultyColor = (level) => {
    if (level === "Mudah") return "success";
    if (level === "Sedang") return "warning";
    return "danger";
  };

  // Menampilkan instruksi yang tersaring berdasarkan tingkat kesulitan
  const getFilteredSuggestion = () => {
    if (difficulty === "semua" || !activeSuggestion) return activeSuggestion;

    const difficultyLevel = getDifficultyLabel(
      activeSuggestion.langkah,
      activeSuggestion.tingkatKesulitan
    );
    if (difficulty === "mudah" && difficultyLevel !== "Mudah") return null;
    if (difficulty === "sedang" && difficultyLevel !== "Sedang") return null;
    if (difficulty === "sulit" && difficultyLevel !== "Sulit") return null;

    return activeSuggestion;
  };

  const filteredSuggestion = getFilteredSuggestion();

  // Function to get estimated material cost category
  const getEstimatedCost = (bahan) => {
    if (!bahan) return { category: "Rendah", text: "Rp 0 - 20.000" };

    const count = bahan.length;

    if (count <= 3) return { category: "Rendah", text: "Rp 0 - 20.000" };
    if (count <= 6) return { category: "Sedang", text: "Rp 20.000 - 50.000" };
    return { category: "Tinggi", text: "Rp 50.000+" };
  };

  const getCostBadgeColor = (category) => {
    if (category === "Rendah") return "success";
    if (category === "Sedang") return "warning";
    return "danger";
  };

  // Handle clicking on an alternative suggestion
  const handleAlternativeClick = (altSuggestion) => {
    setGeneratedImage(null); // Reset the generated image
    setActiveSuggestion(altSuggestion);
    // Scroll to the top of the craft suggestion section
    window.scrollTo({
      top: document.getElementById("craft-suggestion-top").offsetTop - 100,
      behavior: "smooth",
    });
  };

  const generateCraftImage = async (prompt) => {
    try {
      setIsImageLoading(true);
      setImageError(false);

      console.log("Fetching Pinterest images for:", prompt);

      // Tampilkan SweetAlert loading khusus Pinterest
      Swal.fire({
        title: "Mencari Inspirasi...",
        html: "Mengambil gambar kerajinan dari Pinterest",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();

      // Tutup SweetAlert loading
      Swal.close();

      if (data.success && data.imageUrl) {
        setCraftImage(data.imageUrl);

        // Jika ada gambar tambahan dari Pinterest, simpan juga
        if (data.additionalImages && data.additionalImages.length > 0) {
          setAdditionalImages(data.additionalImages);
        }

        // Tampilkan badge sumber gambar
        setImageSource(data.source || "unsplash");
      } else {
        setImageError(true);
      }

      setIsImageLoading(false);
    } catch (error) {
      console.error("Error generating craft image:", error);
      setImageError(true);
      setIsImageLoading(false);

      // Tutup SweetAlert loading pada error
      Swal.close();
    }
  };

  if (isLoading) {
    return (
      <div className="card craft-suggestion-card mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">
            <i className="bi bi-lightbulb me-2"></i>
            Menyiapkan Rekomendasi Kerajinan
          </h5>
        </div>
        <div className="card-body text-center py-5">
          <div
            className="spinner-border text-success pulse-animation"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">
            Menganalisis objek dan menyiapkan rekomendasi kerajinan...
          </p>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (!suggestion) {
    return null;
  }

  if (!filteredSuggestion) {
    return (
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Saran Kerajinan</h5>
          <div>
            <select
              className="form-select form-select-sm"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="semua">Semua Level</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sulit">Sulit</option>
            </select>
          </div>
        </div>
        <div className="card-body text-center">
          <p>
            Tidak ada saran kerajinan untuk level kesulitan yang dipilih.
            Silakan pilih level kesulitan lain.
          </p>
        </div>
      </div>
    );
  }

  // Get material cost estimate
  const costEstimate = getEstimatedCost(activeSuggestion.bahan);
  const detectedItemsText =
    detectedObjects && detectedObjects.length > 0
      ? detectedObjects
          .map((obj) => obj.mappedClass)
          .filter((v, i, a) => a.indexOf(v) === i)
          .join(", ")
      : "";

  return (
    <div id="craft-suggestion-top" className="card craft-suggestion-card mb-4">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-lightbulb me-2"></i>
          Rekomendasi Kerajinan
          {suggestion.source === "ai" && (
            <span className="badge bg-info ms-2">
              <i className="bi bi-robot me-1"></i>
              {suggestion.aiSource
                ? `${suggestion.aiSource.toUpperCase()} AI`
                : "AI"}
            </span>
          )}
          {suggestion.isMulti && (
            <span className="badge bg-warning ms-2">
              <i className="bi bi-boxes me-1"></i>
              Multi-Objek
            </span>
          )}
        </h5>

        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => window.print()}
          title="Cetak panduan kerajinan ini"
        >
          <i className="bi bi-printer"></i>
        </button>
      </div>

      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-7">
            <h4 className="mb-3">{suggestion.nama}</h4>

            {suggestion.tingkatKesulitan && (
              <p className="mb-2">
                <span
                  className={`badge ${
                    suggestion.tingkatKesulitan.toLowerCase() === "mudah"
                      ? "bg-success"
                      : suggestion.tingkatKesulitan.toLowerCase() === "sulit"
                      ? "bg-danger"
                      : "bg-warning"
                  } me-2`}
                >
                  <i
                    className={`bi ${
                      suggestion.tingkatKesulitan.toLowerCase() === "mudah"
                        ? "bi-emoji-smile"
                        : suggestion.tingkatKesulitan.toLowerCase() === "sulit"
                        ? "bi-emoji-frown"
                        : "bi-emoji-neutral"
                    } me-1`}
                  ></i>
                  {suggestion.tingkatKesulitan}
                </span>

                {suggestion.estimasiWaktu && (
                  <span className="badge bg-secondary">
                    <i className="bi bi-clock me-1"></i>
                    {suggestion.estimasiWaktu}
                  </span>
                )}
              </p>
            )}

            <div className="alert alert-primary mb-3">
              <i className="bi bi-info-circle-fill me-2"></i>
              <strong>Kerajinan ini dibuat dari:</strong>
              <span className="ms-1">
                {suggestion.bahan && suggestion.bahan.length > 0
                  ? suggestion.bahan.slice(0, 3).join(", ")
                  : "Barang bekas yang terdeteksi"}
              </span>
            </div>
          </div>

          <div className="col-md-5">
            <div className="craft-image-container mb-3">
              {isImageLoading ? (
                <div className="text-center p-5">
                  <div
                    className="spinner-border text-primary pulse-animation"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 mb-0">Mencari inspirasi di Pinterest...</p>
                </div>
              ) : imageError ? (
                <div className="text-center py-5 bg-light rounded">
                  <i
                    className="bi bi-image-alt text-secondary"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <p className="mt-2 mb-0">Tidak dapat memuat gambar</p>
                </div>
              ) : (
                <img
                  src={
                    craftImage ||
                    suggestion.image ||
                    "https://dummyimage.com/400x300/cccccc/ffffff&text=Contoh+Kerajinan"
                  }
                  alt={suggestion.nama}
                  className="img-fluid rounded fade-in"
                  onError={(e) => {
                    // Fallback jika gambar gagal dimuat
                    e.target.onerror = null;
                    e.target.src =
                      "https://dummyimage.com/400x300/cccccc/ffffff&text=Gambar+Tidak+Tersedia";
                  }}
                />
              )}

              {!isImageLoading && (
                <div className="mt-2 text-center">
                  <span className="badge bg-light text-dark">
                    {imageSource === "pinterest" ? (
                      <>
                        <i className="bi bi-pinterest me-1"></i>
                        Inspirasi dari Pinterest
                      </>
                    ) : imageSource === "unsplash" ? (
                      <>
                        <i className="bi bi-image me-1"></i>
                        Visualisasi dari Unsplash
                      </>
                    ) : (
                      <>
                        <i className="bi bi-image me-1"></i>
                        Visualisasi indikatif
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Display additional images if available */}
            {additionalImages.length > 0 && (
              <div className="additional-images mt-2">
                <p className="small text-muted mb-2">Inspirasi tambahan:</p>
                <div className="d-flex flex-wrap gap-1 justify-content-center">
                  {additionalImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Inspirasi ${idx + 1}`}
                      className="img-thumbnail"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => setCraftImage(img)}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {suggestion.tingkatKesulitanInfo && (
          <div className="alert alert-info mb-3">
            <div className="d-flex align-items-center mb-2">
              <i
                className={`bi ${
                  suggestion.tingkatKesulitan?.toLowerCase() === "mudah"
                    ? "bi-emoji-smile text-success"
                    : suggestion.tingkatKesulitan?.toLowerCase() === "sulit"
                    ? "bi-emoji-frown text-danger"
                    : "bi-emoji-neutral text-warning"
                } me-2 fs-4`}
              ></i>
              <div>
                <strong>
                  Tingkat Kesulitan: {suggestion.tingkatKesulitan}
                </strong>
                <p className="mb-0 small">{suggestion.tingkatKesulitanInfo}</p>
              </div>
            </div>
            {suggestion.estimasiWaktuInfo && (
              <div className="d-flex align-items-center">
                <i className="bi bi-clock me-2 fs-4"></i>
                <div>
                  <strong>Waktu Pengerjaan: {suggestion.estimasiWaktu}</strong>
                  <p className="mb-0 small">{suggestion.estimasiWaktuInfo}</p>
                </div>
              </div>
            )}
            {suggestion.bahanInfo && (
              <div className="mt-2 small fst-italic">
                <i className="bi bi-info-circle me-1"></i>
                {suggestion.bahanInfo}
              </div>
            )}
          </div>
        )}

        <div className="mb-4">
          <h5 className="card-title">
            <i className="bi bi-tools me-2"></i>
            Alat dan Bahan
          </h5>

          <ul className="list-group">
            {suggestion.bahan &&
              suggestion.bahan.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex align-items-center"
                >
                  <i
                    className={`bi ${
                      item.toLowerCase().includes("gunting") ||
                      item.toLowerCase().includes("lem") ||
                      item.toLowerCase().includes("cat")
                        ? "bi-tools text-secondary"
                        : "bi-check-circle-fill text-success"
                    } me-2`}
                  ></i>
                  <div>
                    <span>{item}</span>
                    {item.toLowerCase().includes("bekas") && (
                      <span className="badge bg-success ms-2 small">
                        Daur Ulang
                      </span>
                    )}
                    {item.toLowerCase().includes("opsional") && (
                      <span className="badge bg-secondary ms-2 small">
                        Opsional
                      </span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h5 className="card-title">
            <i className="bi bi-list-ol me-2"></i>
            Langkah-langkah Pembuatan
          </h5>

          <ol className="list-group list-group-numbered mb-0">
            {suggestion.langkah &&
              suggestion.langkah.map((step, index) => (
                <li key={index} className="list-group-item">
                  <div className="fw-medium mb-1">
                    {step.split(":")[0] || step}
                  </div>
                  {step.includes(":") && (
                    <div className="text-secondary small">
                      {step.split(":").slice(1).join(":")}
                    </div>
                  )}
                </li>
              ))}
          </ol>
        </div>

        {suggestion.source === "ai" && (
          <div className="alert alert-info mt-4">
            <i className="bi bi-robot me-2"></i>
            <small>
              Rekomendasi ini dihasilkan oleh{" "}
              <strong>
                {suggestion.aiSource
                  ? `${suggestion.aiSource.toUpperCase()} AI`
                  : "kecerdasan buatan"}
              </strong>{" "}
              berdasarkan objek yang terdeteksi dalam gambar Anda. Hasilnya
              mungkin perlu disesuaikan berdasarkan material yang Anda miliki.
            </small>
          </div>
        )}

        {suggestion.source !== "ai" && (
          <div className="alert alert-success mt-4">
            <i className="bi bi-lightbulb me-2"></i>
            <small>
              Rekomendasi ini dihasilkan berdasarkan objek yang terdeteksi dalam
              gambar. Anda dapat mengikuti langkah-langkah ini dan mengubahnya
              sesuai kebutuhan untuk menciptakan kerajinan yang unik!
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default CraftSuggestion;
