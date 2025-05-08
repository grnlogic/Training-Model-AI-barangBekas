import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

function ImageUpload({ onObjectsDetected, setUploadedImage }) {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [model, setModel] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [modelOptions, setModelOptions] = useState({
    modelType: 'lite_mobilenet_v2', // Opsi model: 'lite_mobilenet_v2' atau 'mobilenet_v2'
    confidence: 0.4 // Ambang batas kepercayaan (0.0 - 1.0)
  });
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Muat model saat komponen pertama kali dimuat
  useEffect(() => {
    loadModel();
  }, [modelOptions.modelType]);

  const loadModel = async () => {
    try {
      setIsModelLoading(true);
      setErrorMessage('');
      
      // Pastikan TensorFlow.js sudah siap
      await tf.ready();
      
      // Memuat model COCO-SSD dengan opsi yang dipilih
      const loadedModel = await cocoSsd.load({
        base: modelOptions.modelType,
      });
      
      setModel(loadedModel);
      console.log(`Model deteksi objek (${modelOptions.modelType}) telah dimuat!`);
      
      setIsModelLoading(false);
    } catch (error) {
      console.error('Gagal memuat model:', error);
      setErrorMessage('Gagal memuat model deteksi. Silakan coba lagi.');
      setIsModelLoading(false);
    }
  };

  const handleModelTypeChange = (e) => {
    setModelOptions({
      ...modelOptions,
      modelType: e.target.value
    });
  };

  const handleConfidenceChange = (e) => {
    setModelOptions({
      ...modelOptions,
      confidence: parseFloat(e.target.value)
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Hanya menerima gambar
    if (!file.type.match('image.*')) {
      setErrorMessage('Mohon unggah file gambar (JPG, PNG, dll)');
      return;
    }

    try {
      setIsDetecting(true);
      setErrorMessage('');

      // Jika model belum dimuat, muat terlebih dahulu
      if (!model) {
        await loadModel();
      }

      // Baca gambar dan ubah ke format data URL
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        setUploadedImage(e.target.result);

        img.onload = async () => {
          try {
            // Reset canvas jika sudah ada
            if (canvasRef.current) {
              const context = canvasRef.current.getContext('2d');
              context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            
            // Deteksi objek dalam gambar
            const predictions = await model.detect(img);
            console.log('Objek terdeteksi:', predictions);
            
            // Filter prediksi dengan confidence > threshold
            const filteredPredictions = predictions.filter(
              pred => pred.score > modelOptions.confidence
            );
            
            // Gambar kotak deteksi pada canvas jika ada
            if (canvasRef.current) {
              // Set ukuran canvas sama dengan gambar
              canvasRef.current.width = img.width;
              canvasRef.current.height = img.height;
              
              const ctx = canvasRef.current.getContext('2d');
              ctx.drawImage(img, 0, 0, img.width, img.height);
              
              // Gambar kotak deteksi
              ctx.lineWidth = 2;
              ctx.font = '16px Arial';
              
              filteredPredictions.forEach(prediction => {
                const [x, y, width, height] = prediction.bbox;
                
                // Set warna kotak
                ctx.strokeStyle = getRandomColor();
                ctx.fillStyle = ctx.strokeStyle;
                
                // Gambar kotak
                ctx.beginPath();
                ctx.rect(x, y, width, height);
                ctx.stroke();
                
                // Tambahkan label
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText(
                  `${prediction.class} ${Math.round(prediction.score * 100)}%`,
                  x,
                  y > 10 ? y - 5 : y + 20
                );
              });
              
              // Update gambar yang diunggah dengan gambar yang sudah diberi anotasi
              setUploadedImage(canvasRef.current.toDataURL());
            }
            
            // Kirim hasil deteksi ke parent component
            onObjectsDetected(filteredPredictions);
            
            setIsDetecting(false);
          } catch (error) {
            console.error('Gagal mendeteksi objek:', error);
            setErrorMessage('Gagal mendeteksi objek dalam gambar.');
            setIsDetecting(false);
          }
        };
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Terjadi kesalahan saat memproses gambar.');
      setIsDetecting(false);
    }
  };

  // Fungsi untuk mendapatkan warna acak
  const getRandomColor = () => {
    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#33A6FF',
      '#A633FF', '#FF9033', '#33FFD4', '#FFD433', '#D433FF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Unggah Gambar Barang Bekas</h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          Ambil foto barang-barang bekas yang Anda miliki dan kami akan menyarankan kerajinan yang bisa Anda buat.
        </p>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Jenis Model AI:</label>
            <select 
              className="form-select" 
              value={modelOptions.modelType} 
              onChange={handleModelTypeChange}
              disabled={isModelLoading || isDetecting}
            >
              <option value="lite_mobilenet_v2">Model Ringan (Lebih Cepat)</option>
              <option value="mobilenet_v2">Model Standar (Lebih Akurat)</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Tingkat Keyakinan: {modelOptions.confidence * 100}%</label>
            <input 
              type="range" 
              className="form-range" 
              min="0.1" 
              max="0.9" 
              step="0.1"
              value={modelOptions.confidence}
              onChange={handleConfidenceChange}
              disabled={isDetecting}
            />
          </div>
        </div>
        
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            disabled={isModelLoading || isDetecting}
          />
        </div>
        
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        
        {(isModelLoading || isDetecting) && (
          <div className="d-flex justify-content-center my-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-2">
              {isModelLoading ? 'Memuat model...' : 'Mendeteksi objek...'}
            </span>
          </div>
        )}
        
        <div className="alert alert-info" role="alert">
          <strong>Tips untuk deteksi yang lebih akurat:</strong>
          <ul className="mb-0 mt-1">
            <li>Pastikan objek terlihat jelas dan tidak tertutup</li>
            <li>Atur pencahayaan yang baik agar objek terlihat jelas</li>
            <li>Fokuskan pada 1-3 objek utama untuk hasil yang lebih baik</li>
            <li>Coba ambil gambar dari berbagai sudut jika deteksi tidak akurat</li>
          </ul>
        </div>
        
        {/* Canvas tersembunyi untuk anotasi gambar */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default ImageUpload;