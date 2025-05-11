import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Swal from "sweetalert2"; // Import SweetAlert

function ImageUpload({ onObjectsDetected, setUploadedImage }) {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [model, setModel] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [modelOptions, setModelOptions] = useState({
    modelType: "lite_mobilenet_v2", // Opsi model: 'lite_mobilenet_v2' atau 'mobilenet_v2'
    confidence: 0.4, // Ambang batas kepercayaan (0.0 - 1.0)
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);

  // Muat model saat komponen pertama kali dimuat
  useEffect(() => {
    loadModel();

    // Clean up camera stream on unmount
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [modelOptions.modelType]);

  // Load model function (unchanged)
  const loadModel = async () => {
    try {
      setIsModelLoading(true);
      setErrorMessage("");
      setLoadProgress(10);

      // Pastikan TensorFlow.js sudah siap
      await tf.ready();
      setLoadProgress(30);

      // Simulasi update progress
      const progressInterval = setInterval(() => {
        setLoadProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 100);

      // Memuat model COCO-SSD dengan opsi yang dipilih
      const loadedModel = await cocoSsd.load({
        base: modelOptions.modelType,
      });
      setModel(loadedModel);
      console.log(
        `Model deteksi objek (${modelOptions.modelType}) telah dimuat!`
      );

      setLoadProgress(100);
      setTimeout(() => {
        setIsModelLoading(false);
        setLoadProgress(0);

        // Tampilkan notifikasi model berhasil dimuat
        Swal.fire({
          icon: "success",
          title: "Model AI Siap",
          text: "Model deteksi objek berhasil dimuat. Anda dapat mulai mengunggah gambar.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }, 500);

      clearInterval(progressInterval);
    } catch (error) {
      console.error("Gagal memuat model:", error);
      setErrorMessage("Gagal memuat model deteksi. Silakan coba lagi.");
      setIsModelLoading(false);
      setLoadProgress(0);

      // Tampilkan notifikasi error
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Model",
        text: "Tidak dapat memuat model deteksi objek. Pastikan koneksi internet Anda stabil.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleModelTypeChange = (e) => {
    setModelOptions({
      ...modelOptions,
      modelType: e.target.value,
    });
  };

  const handleConfidenceChange = (e) => {
    setModelOptions({
      ...modelOptions,
      confidence: parseFloat(e.target.value),
    });
  };

  // Process image function (unchanged)
  const processImage = async (file) => {
    if (!file) return;

    // Hanya menerima gambar
    if (!file.type.match("image.*")) {
      setErrorMessage("Mohon unggah file gambar (JPG, PNG, dll)");

      // Tampilkan notifikasi format tidak valid
      Swal.fire({
        icon: "warning",
        title: "Format File Tidak Valid",
        text: "Harap unggah file gambar (JPG, PNG, WEBP)",
        confirmButtonColor: "#f39c12",
      });
      return;
    }

    try {
      setIsDetecting(true);
      setErrorMessage("");
      setUploadProgress(0);

      // Jika model belum dimuat, muat terlebih dahulu
      if (!model) {
        await loadModel();
      }

      // Baca gambar dan ubah ke format data URL dengan progress
      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        setImagePreview(e.target.result);

        img.onload = async () => {
          try {
            // Reset canvas jika sudah ada
            if (canvasRef.current) {
              const context = canvasRef.current.getContext("2d");
              context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
            }

            // Deteksi objek dalam gambar
            const predictions = await model.detect(img);
            console.log("Objek terdeteksi:", predictions);

            // Filter prediksi dengan confidence > threshold
            const filteredPredictions = predictions.filter(
              (pred) => pred.score > modelOptions.confidence
            );

            // Gambar kotak deteksi pada canvas jika ada
            if (canvasRef.current) {
              // Set ukuran canvas sama dengan gambar
              canvasRef.current.width = img.width;
              canvasRef.current.height = img.height;

              const ctx = canvasRef.current.getContext("2d");
              ctx.drawImage(img, 0, 0, img.width, img.height);

              // Gambar kotak deteksi
              ctx.lineWidth = 3;
              ctx.font = "bold 16px Arial";

              filteredPredictions.forEach((prediction) => {
                const [x, y, width, height] = prediction.bbox;

                // Set warna kotak
                const color = getRandomColor();
                ctx.strokeStyle = color;
                ctx.fillStyle = color;

                // Gambar kotak
                ctx.beginPath();
                ctx.rect(x, y, width, height);
                ctx.stroke();

                // Background untuk label
                const textWidth = ctx.measureText(
                  `${prediction.class} ${Math.round(prediction.score * 100)}%`
                ).width;
                ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                ctx.fillRect(
                  x,
                  y > 20 ? y - 20 : y + height,
                  textWidth + 10,
                  20
                );

                // Tambahkan label
                ctx.fillStyle = "white";
                ctx.fillText(
                  `${prediction.class} ${Math.round(prediction.score * 100)}%`,
                  x + 5,
                  y > 20 ? y - 5 : y + height + 15
                );
              });

              // Update gambar yang diunggah dengan gambar yang sudah diberi anotasi
              setUploadedImage(canvasRef.current.toDataURL());
            } else {
              setUploadedImage(e.target.result);
            }

            // Kirim hasil deteksi ke parent component
            onObjectsDetected(filteredPredictions);

            setIsDetecting(false);
            setUploadProgress(0);
          } catch (error) {
            console.error("Gagal mendeteksi objek:", error);
            setErrorMessage("Gagal mendeteksi objek dalam gambar.");
            setIsDetecting(false);
            setUploadProgress(0);
          }
        };
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Terjadi kesalahan saat memproses gambar.");
      setIsDetecting(false);
      setUploadProgress(0);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0]);
    }
  };

  // Handle file browse button click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Toggle camera
  const toggleCamera = async () => {
    if (cameraActive) {
      // Stop camera
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
        cameraStreamRef.current = null;
      }
      setCameraActive(false);
    } else {
      try {
        // Start camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        cameraStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        setCameraActive(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setErrorMessage(
          "Tidak dapat mengakses kamera. Pastikan browser memiliki izin kamera."
        );
      }
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (!videoRef.current || !cameraActive) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert to file
    canvas.toBlob((blob) => {
      const file = new File([blob], "camera-capture.jpg", {
        type: "image/jpeg",
      });
      processImage(file);

      // Turn off camera after capturing
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
        cameraStreamRef.current = null;
      }
      setCameraActive(false);
    }, "image/jpeg");
  };

  // Get random color function (unchanged)
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A6",
      "#33A6FF",
      "#A633FF",
      "#FF9033",
      "#33FFD4",
      "#FFD433",
      "#D433FF",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="upload-container">
      {!cameraActive ? (
        <>
          {/* Upload Area with improved sizing */}
          <div
            className={`upload-area text-center p-4 rounded ${
              dragActive ? "upload-area-active" : ""
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="d-flex flex-column align-items-center">
              <div className="upload-icon mb-3">
                <i className="bi bi-cloud-upload text-primary"></i>
              </div>
              <p className="mb-1 upload-title">
                <strong>Tarik & letakkan foto di sini</strong>
              </p>
              <p className="text-muted small mb-3">atau klik untuk unggah</p>

              <button
                className="btn btn-primary"
                onClick={handleBrowseClick}
                disabled={isModelLoading || isDetecting}
              >
                <i className="bi bi-file-earmark me-1"></i> Pilih File
              </button>

              <input
                type="file"
                className="d-none"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                disabled={isModelLoading || isDetecting}
              />
            </div>
          </div>

          {/* Camera button in better position */}
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={toggleCamera}
              disabled={isModelLoading || isDetecting}
            >
              <i className="bi bi-camera me-1"></i> Gunakan Kamera
            </button>
          </div>
        </>
      ) : (
        <div className="camera-container text-center">
          <div className="position-relative d-inline-block">
            <video
              ref={videoRef}
              style={{
                maxWidth: "100%",
                maxHeight: "350px",
                borderRadius: "8px",
              }}
              autoPlay
              playsInline
            ></video>
            <div className="camera-controls mt-3 d-flex justify-content-center">
              <button className="btn btn-danger me-2" onClick={toggleCamera}>
                <i className="bi bi-x-circle me-1"></i> Batalkan
              </button>
              <button className="btn btn-success" onClick={captureImage}>
                <i className="bi bi-camera me-1"></i> Ambil Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {errorMessage}
        </div>
      )}

      {/* Upload & detection progress */}
      {(uploadProgress > 0 || isDetecting) && (
        <div className="mt-3">
          <div className="d-flex justify-content-between">
            <small>
              {isDetecting ? "Mendeteksi objek..." : "Mengunggah gambar..."}
            </small>
            <small>{uploadProgress > 0 ? `${uploadProgress}%` : ""}</small>
          </div>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{
                width: `${uploadProgress > 0 ? uploadProgress : 80}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Model loading progress */}
      {isModelLoading && (
        <div className="mt-3">
          <div className="d-flex justify-content-between">
            <small>Memuat model AI...</small>
            <small>{loadProgress}%</small>
          </div>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-info"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Canvas tersembunyi untuk anotasi gambar */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default ImageUpload;
