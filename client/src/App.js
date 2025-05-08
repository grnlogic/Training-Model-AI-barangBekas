import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import DetectionResults from './components/DetectionResults';
import CraftSuggestion from './components/CraftSuggestion';
import Footer from './components/Footer';

function App() {
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [craftSuggestion, setCraftSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const handleObjectsDetected = (objects) => {
    setDetectedObjects(objects);
    
    // Sembunyikan intro saat ada deteksi
    setShowIntro(false);
    
    // Setelah objek terdeteksi, kita akan mendapatkan saran kerajinan melalui API
    generateCraftSuggestion(objects);
  };

  const generateCraftSuggestion = async (objects) => {
    try {
      setIsLoading(true);
      
      // Call backend API untuk mendapatkan saran kerajinan
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objects }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.suggestion) {
        setCraftSuggestion(data.suggestion);
      } else {
        // Fallback ke saran default jika API gagal
        setCraftSuggestion({
          nama: 'Tidak ada saran spesifik',
          bahan: ['Barang yang terdeteksi tidak ada dalam database kami'],
          langkah: ['Silakan coba unggah gambar dengan barang bekas yang lain seperti botol, kaleng, kardus, kain, atau koran'],
          image: 'https://via.placeholder.com/150?text=Tidak+Ditemukan',
          isMulti: false
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating craft suggestion:', error);
      
      // Fallback jika terjadi error
      setCraftSuggestion({
        nama: 'Terjadi kesalahan',
        bahan: ['Mohon maaf, terjadi kesalahan saat memproses permintaan'],
        langkah: ['Silakan coba lagi nanti atau hubungi administrator'],
        image: 'https://via.placeholder.com/150?text=Error',
        isMulti: false
      });
      
      setIsLoading(false);
    }
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1">
        <div className="container py-4">
          {showIntro && (
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="mb-3">Selamat Datang di BarbekRaft</h2>
                <p className="lead">
                  Aplikasi cerdas untuk mengubah barang bekas menjadi kerajinan bermanfaat menggunakan kekuatan AI.
                </p>
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-camera-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
                        <h5 className="mt-3">Ambil Foto</h5>
                        <p className="text-muted">Ambil foto barang bekas yang Anda miliki</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-search text-info" style={{ fontSize: '2.5rem' }}></i>
                        <h5 className="mt-3">AI Mendeteksi</h5>
                        <p className="text-muted">AI kami mendeteksi objek dalam gambar</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-lightbulb-fill text-warning" style={{ fontSize: '2.5rem' }}></i>
                        <h5 className="mt-3">Dapatkan Ide</h5>
                        <p className="text-muted">Dapatkan saran kerajinan yang bisa dibuat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  <div className="card-header bg-light">
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