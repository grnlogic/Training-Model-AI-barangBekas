import React, { useState } from "react";
import axios from "axios";
import "./ScanPage.css";
import DetectionResults from "../components/DetectionResults";
import ImageUploader from "../components/ImageUploader";
import CraftInstructions from "../components/CraftInstructions";

const ScanPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (imageFile) => {
    try {
      setIsScanning(true);
      setError(null);

      // Create form data for image upload
      const formData = new FormData();
      formData.append("image", imageFile);

      // First detect objects in the image
      const detectResponse = await axios.post("/api/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!detectResponse.data.success) {
        throw new Error(
          detectResponse.data.message || "Failed to detect objects"
        );
      }

      const detectedObjects = detectResponse.data.objects;

      // Now get craft suggestions based on the detected objects
      const suggestResponse = await axios.post("/api/suggest", {
        objects: detectedObjects,
      });

      if (!suggestResponse.data.success) {
        throw new Error(
          suggestResponse.data.message || "Failed to get suggestions"
        );
      }

      // Prepare the results
      setScanResults({
        detectedObjects: suggestResponse.data.detectedObjects,
        materials: suggestResponse.data.suggestion.bahan,
        instructions: suggestResponse.data.suggestion.langkah,
        craftName: suggestResponse.data.suggestion.nama,
        difficulty: suggestResponse.data.suggestion.tingkatKesulitan,
        time: suggestResponse.data.suggestion.estimasiWaktu,
        suggestion: suggestResponse.data.suggestion,
      });
    } catch (err) {
      console.error("Error during scanning:", err);
      setError(err.message || "An error occurred during scanning");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="scan-page">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">
              <i className="bi bi-camera"></i> Scan Barang Bekas
            </h1>
            <p className="subtitle">
              Ambil foto barang bekas Anda dan dapatkan ide kerajinan kreatif
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <ImageUploader
              onImageUpload={handleImageUpload}
              isUploading={isScanning}
            />
          </div>

          <div className="col-md-6">
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {isScanning && (
              <div className="scanning-indicator">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Menganalisis gambar dan menghasilkan rekomendasi...</p>
              </div>
            )}

            {scanResults && !isScanning && (
              <CraftInstructions craftData={scanResults.suggestion} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
