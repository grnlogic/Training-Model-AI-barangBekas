import React, { useState, useRef } from "react";
import "./ImageUploader.css";

const ImageUploader = ({ onImageUpload, isUploading }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Pass the image to parent component
    onImageUpload(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isUploading) return;

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    onImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`image-uploader ${isUploading ? "disabled" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
        disabled={isUploading}
      />

      {previewImage ? (
        <div className="image-preview-container">
          <img src={previewImage} alt="Preview" className="image-preview" />
          {!isUploading && (
            <button className="choose-another-btn" onClick={triggerFileInput}>
              <i className="bi bi-arrow-repeat"></i> Pilih Gambar Lain
            </button>
          )}
        </div>
      ) : (
        <div className="upload-placeholder" onClick={triggerFileInput}>
          <div className="upload-icon">
            <i className="bi bi-cloud-upload"></i>
          </div>
          <h3>Unggah Gambar</h3>
          <p>Klik atau seret gambar ke area ini</p>
          <button className="upload-btn" disabled={isUploading}>
            <i className="bi bi-camera"></i> Pilih Gambar
          </button>
        </div>
      )}

      {isUploading && (
        <div className="uploading-overlay">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Sedang memproses...</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
