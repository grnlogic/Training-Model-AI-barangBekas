import React, { useEffect } from "react";
import Swal from "sweetalert2";
import "./DetectionResults.css";

const DetectionResults = ({ detectedObjects, materials, instructions }) => {
  // Get the primary detected object (first one with highest confidence)
  const primaryObject =
    detectedObjects && detectedObjects.length > 0 ? detectedObjects[0] : null;

  // Show detection results in a popup when objects are detected
  useEffect(() => {
    if (primaryObject) {
      Swal.fire({
        title: "Objek Terdeteksi",
        html: `
          <div class="text-start">
            <h5>${primaryObject.mappedClass || primaryObject.class}</h5>
            ${
              primaryObject.category
                ? `<p>Kategori: ${primaryObject.category}</p>`
                : ""
            }
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: ${Math.round(
                primaryObject.score * 100
              )}%" 
                aria-valuenow="${Math.round(
                  primaryObject.score * 100
                )}" aria-valuemin="0" aria-valuemax="100">
                ${Math.round(primaryObject.score * 100)}%
              </div>
            </div>
            <p class="mt-3">
              <i class="bi bi-check-circle text-success me-2"></i>
              Hasil deteksi akan digunakan untuk menyarankan kerajinan yang bisa Anda buat.
            </p>
          </div>
        `,
        icon: "success",
        confirmButtonText: "Lanjutkan",
        confirmButtonColor: "#27ae60",
      });
    }
  }, [primaryObject]);

  return (
    <div className="detection-results">
      {/* Detection Header */}
      <div className="results-header">
        <h2>
          <i className="bi bi-search"></i> Hasil Deteksi
        </h2>
      </div>

      {/* Info Message */}
      <div className="info-box">
        <i className="bi bi-info-circle"></i> Kami telah mendeteksi objek
        berikut dalam gambar Anda:
      </div>

      {/* Detected Object with Confidence */}
      {primaryObject && (
        <div className="detected-object-card">
          <div className="object-icon">
            <i className="bi bi-cup"></i>
          </div>
          <div className="object-details">
            <h4>{primaryObject.mappedClass || primaryObject.class}</h4>
            <p>Kategori: {primaryObject.category || "Umum"}</p>
          </div>
          <div className="confidence-level">
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${Math.round(primaryObject.score * 100)}%` }}
                aria-valuenow={Math.round(primaryObject.score * 100)}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(primaryObject.score * 100)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message about detection accuracy */}
      <div className="detection-info">
        <i className="bi bi-check-circle"></i>
        <p>
          Hasil deteksi akan digunakan untuk menyarankan kerajinan yang bisa
          Anda buat. Semakin tinggi persentase keyakinan, semakin akurat saran
          kerajinan kami.
        </p>
      </div>

      {/* Materials List */}
      {materials && materials.length > 0 && (
        <div className="materials-section">
          <h3>Bahan Yang Diperlukan:</h3>
          <ul className="materials-list">
            {materials.map((material, index) => (
              <li key={index} className="material-item">
                <i className="bi bi-check-circle-fill"></i> {material}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps for creating the craft */}
      {instructions && instructions.length > 0 && (
        <div className="instructions-section">
          <h3>
            <i className="bi bi-list-ol"></i> Langkah-langkah Pembuatan:
          </h3>
          <ol className="instructions-list">
            {instructions.map((step, index) => (
              <li key={index} className="instruction-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{step}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default DetectionResults;
