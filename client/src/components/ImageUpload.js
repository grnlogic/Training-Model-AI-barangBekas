import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

function ImageUpload({ onObjectsDetected, setUploadedImage }) {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [model, setModel] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const loadModel = async () => {
    try {
      setIsModelLoading(true);
      setErrorMessage('');
      
      // Memuat model COCO-SSD
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      console.log('Model deteksi objek telah dimuat!');
      
      setIsModelLoading(false);
    } catch (error) {
      console.error('Gagal memuat model:', error);
      setErrorMessage('Gagal memuat model deteksi. Silakan coba lagi.');
      setIsModelLoading(false);
    }
  };

  // Muat model saat komponen pertama kali dimuat
  React.useEffect(() => {
    loadModel();
  }, []);

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
            // Deteksi objek dalam gambar
            const predictions = await model.detect(img);
            console.log('Objek terdeteksi:', predictions);
            
            // Filter prediksi dengan confidence > 50%
            const filteredPredictions = predictions.filter(
              pred => pred.score > 0.5
            );
            
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

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Unggah Gambar Barang Bekas</h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          Ambil foto barang-barang bekas yang Anda miliki dan kami akan menyarankan kerajinan yang bisa Anda buat.
        </p>
        
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
          <strong>Tip:</strong> Pastikan objek terlihat jelas dalam gambar untuk hasil deteksi yang lebih akurat.
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;