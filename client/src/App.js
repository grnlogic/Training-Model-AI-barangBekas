import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import DetectionResults from './components/DetectionResults';
import CraftSuggestion from './components/CraftSuggestion';

function App() {
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [craftSuggestion, setCraftSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleObjectsDetected = (objects) => {
    setDetectedObjects(objects);
    
    // Setelah objek terdeteksi, kita akan mendapatkan saran kerajinan
    // Ini bisa dilakukan melalui API atau logika sederhana di frontend
    generateCraftSuggestion(objects);
  };

  const generateCraftSuggestion = (objects) => {
    setIsLoading(true);
    
    // Database kerajinan sederhana
    const craftDatabase = {
      'botol': {
        nama: 'Vas Bunga dari Botol Plastik',
        bahan: ['botol plastik', 'cat', 'gunting', 'tali'],
        langkah: [
          'Potong bagian atas botol plastik',
          'Cat botol sesuai selera',
          'Hiasi dengan tali di leher botol',
          'Isi dengan air dan letakkan bunga'
        ],
        image: 'https://via.placeholder.com/150?text=Vas+Bunga'
      },
      'kaleng': {
        nama: 'Tempat Pensil dari Kaleng',
        bahan: ['kaleng bekas', 'kertas berwarna', 'lem', 'gunting'],
        langkah: [
          'Bersihkan kaleng dan pastikan tidak ada bagian tajam',
          'Potong kertas berwarna sesuai ukuran kaleng',
          'Tempelkan kertas ke kaleng dengan lem',
          'Tunggu hingga kering dan tempat pensil siap digunakan'
        ],
        image: 'https://via.placeholder.com/150?text=Tempat+Pensil'
      },
      'kardus': {
        nama: 'Rak Mini dari Kardus',
        bahan: ['kardus bekas', 'gunting', 'lem', 'cat'],
        langkah: [
          'Potong kardus menjadi bentuk dasar rak (sisi, atas, dan bawah)',
          'Tempelkan bagian-bagian dengan lem',
          'Cat rak sesuai selera',
          'Tunggu hingga kering dan rak siap digunakan'
        ],
        image: 'https://via.placeholder.com/150?text=Rak+Mini'
      },
      'kain': {
        nama: 'Tas Sederhana dari Kain Bekas',
        bahan: ['kain bekas', 'jarum', 'benang', 'gunting'],
        langkah: [
          'Potong kain sesuai pola tas yang diinginkan',
          'Jahit bagian pinggir kain',
          'Tambahkan tali sebagai pegangan',
          'Tas sederhana siap digunakan'
        ],
        image: 'https://via.placeholder.com/150?text=Tas+Kain'
      },
      'koran': {
        nama: 'Keranjang dari Koran Bekas',
        bahan: ['koran bekas', 'lem', 'gunting', 'cat (opsional)'],
        langkah: [
          'Gulung koran memanjang untuk membuat batang',
          'Susun dan tempelkan batang koran membentuk dasar keranjang',
          'Anyam batang koran untuk membentuk dinding keranjang',
          'Semprotkan cat jika ingin memberikan warna'
        ],
        image: 'https://via.placeholder.com/150?text=Keranjang+Koran'
      }
    };

    // Objek deteksi yang mungkin dari COCO-SSD ke objek dalam database kita
    const objectMapping = {
      'bottle': 'botol',
      'cup': 'kaleng',
      'box': 'kardus',
      'book': 'koran',
      'handbag': 'kain',
      'backpack': 'kain',
      'suitcase': 'kain',
      'cell phone': 'elektronik',
      'tv': 'elektronik'
    };

    // Konversi objek terdeteksi ke objek dalam database kita
    const mappedObjects = objects.map(obj => {
      return objectMapping[obj.class] || obj.class;
    });

    // Cari kerajinan yang cocok
    for (const mappedObj of mappedObjects) {
      if (craftDatabase[mappedObj]) {
        setTimeout(() => {
          setCraftSuggestion(craftDatabase[mappedObj]);
          setIsLoading(false);
        }, 1500); // Simulasi delay API
        return;
      }
    }

    // Jika tidak ada yang cocok
    setTimeout(() => {
      setCraftSuggestion({
        nama: 'Tidak ada saran spesifik',
        bahan: ['Barang yang terdeteksi tidak ada dalam database kami'],
        langkah: ['Silakan coba unggah gambar dengan barang bekas yang lain seperti botol, kaleng, kardus, kain, atau koran'],
        image: 'https://via.placeholder.com/150?text=Tidak+Ditemukan'
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="App">
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <ImageUpload 
              onObjectsDetected={handleObjectsDetected} 
              setUploadedImage={setUploadedImage}
            />
            {uploadedImage && (
              <div className="mt-3 text-center">
                <h5>Gambar yang Diunggah:</h5>
                <img 
                  src={uploadedImage} 
                  alt="Gambar yang diunggah" 
                  className="img-fluid rounded"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
          </div>
          <div className="col-md-6">
            <DetectionResults 
              objects={detectedObjects} 
              isLoading={isLoading} 
            />
            {craftSuggestion && (
              <CraftSuggestion 
                suggestion={craftSuggestion} 
                isLoading={isLoading} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;