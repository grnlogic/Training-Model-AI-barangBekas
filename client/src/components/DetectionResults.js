import React from 'react';

// Mapping nama objek dari bahasa Inggris ke Indonesia yang lebih lengkap
const objectTranslations = {
  // Botol dan wadah
  'bottle': 'Botol',
  'wine glass': 'Gelas Wine',
  'cup': 'Gelas/Kaleng',
  'bowl': 'Mangkuk',
  'vase': 'Vas',
  
  // Kardus dan kotak
  'box': 'Kardus/Kotak',
  'suitcase': 'Koper',
  'handbag': 'Tas Tangan',
  'backpack': 'Ransel',
  
  // Kertas dan buku
  'book': 'Buku/Koran',
  'newspaper': 'Koran',
  'paper': 'Kertas',
  
  // Kain dan pakaian
  'tie': 'Dasi',
  'umbrella': 'Payung',
  'shirt': 'Kemeja',
  'dress': 'Gaun',
  'pants': 'Celana',
  'scarf': 'Syal',
  'glove': 'Sarung Tangan',
  'skirt': 'Rok',
  'hat': 'Topi',
  'sock': 'Kaus Kaki',
  
  // Elektronik
  'cell phone': 'Ponsel',
  'tv': 'Televisi',
  'laptop': 'Laptop',
  'remote': 'Remote',
  'keyboard': 'Keyboard',
  'mouse': 'Mouse',
  'microwave': 'Microwave',
  'oven': 'Oven',
  'toaster': 'Pemanggang Roti',
  'refrigerator': 'Kulkas',
  
  // Ban dan roda
  'tire': 'Ban',
  'wheel': 'Roda',
  'bicycle': 'Sepeda',
  'motorcycle': 'Motor',
  
  // Kayu
  'bench': 'Bangku',
  'chair': 'Kursi',
  'dining table': 'Meja Makan',
  'wooden spoon': 'Sendok Kayu',
  'stick': 'Tongkat/Ranting',
  
  // CD/DVD
  'cd': 'CD',
  'dvd': 'DVD',
  'frisbee': 'Frisbee',
  
  // Tutup botol
  'cap': 'Tutup Botol',
  'bottle cap': 'Tutup Botol',
  
  // Sendok/garpu
  'spoon': 'Sendok',
  'fork': 'Garpu',
  'knife': 'Pisau',
  'chopsticks': 'Sumpit',
  
  // Sedotan
  'straw': 'Sedotan',
  
  // Lainnya yang mungkin terdeteksi
  'potted plant': 'Tanaman Pot',
  'toilet': 'Toilet',
  'sink': 'Wastafel',
  'clock': 'Jam',
  'bed': 'Tempat Tidur',
  'couch': 'Sofa',
  'teddy bear': 'Boneka Beruang',
  'toothbrush': 'Sikat Gigi',
  'scissors': 'Gunting',
  'hair drier': 'Pengering Rambut',
  'hair brush': 'Sikat Rambut'
};

// Mapping kategori kerajinan yang bisa dibuat
const craftCategoryMapping = {
  'bottle': 'Botol Plastik',
  'wine glass': 'Botol/Gelas',
  'cup': 'Kaleng/Gelas',
  'bowl': 'Kaleng/Wadah',
  'vase': 'Botol/Wadah',
  
  'box': 'Kardus',
  'suitcase': 'Kardus/Kain',
  'handbag': 'Kain',
  'backpack': 'Kain',
  
  'book': 'Kertas/Koran',
  'newspaper': 'Koran',
  'paper': 'Kertas/Koran',
  
  'tie': 'Kain',
  'umbrella': 'Kain',
  'shirt': 'Kain',
  'dress': 'Kain',
  'pants': 'Kain',
  'scarf': 'Kain',
  'glove': 'Kain',
  'skirt': 'Kain',
  'hat': 'Kain',
  'sock': 'Kain',
  
  'cell phone': 'Elektronik',
  'tv': 'Elektronik',
  'laptop': 'Elektronik',
  'remote': 'Elektronik',
  'keyboard': 'Elektronik',
  'mouse': 'Elektronik',
  'microwave': 'Elektronik',
  'oven': 'Elektronik',
  'toaster': 'Elektronik',
  'refrigerator': 'Elektronik',
  
  'tire': 'Ban',
  'wheel': 'Ban',
  'bicycle': 'Ban & Logam',
  'motorcycle': 'Ban & Logam',
  
  'bench': 'Kayu',
  'chair': 'Kayu',
  'dining table': 'Kayu',
  'wooden spoon': 'Kayu',
  'stick': 'Kayu',
  
  'cd': 'CD/DVD',
  'dvd': 'CD/DVD',
  'frisbee': 'CD/DVD',
  
  'cap': 'Tutup Botol',
  'bottle cap': 'Tutup Botol',
  
  'spoon': 'Sendok/Garpu',
  'fork': 'Sendok/Garpu',
  'knife': 'Sendok/Garpu',
  'chopsticks': 'Kayu',
  
  'straw': 'Sedotan'
};

function DetectionResults({ objects, isLoading }) {
  if (isLoading) {
    return (
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">Hasil Deteksi</h5>
        </div>
        <div className="card-body text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Memproses hasil deteksi...</p>
        </div>
      </div>
    );
  }

  if (!objects || objects.length === 0) {
    return (
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">Hasil Deteksi</h5>
        </div>
        <div className="card-body">
          <p className="text-center">
            Unggah gambar untuk melihat hasil deteksi barang bekas.
          </p>
        </div>
      </div>
    );
  }

  // Hitung frekuensi objek yang terdeteksi untuk dikelompokkan
  const groupedObjects = {};
  objects.forEach(obj => {
    const objName = obj.class;
    if (groupedObjects[objName]) {
      groupedObjects[objName].count += 1;
      // Ambil score tertinggi
      if (obj.score > groupedObjects[objName].score) {
        groupedObjects[objName].score = obj.score;
      }
    } else {
      groupedObjects[objName] = {
        count: 1,
        score: obj.score,
        translation: objectTranslations[objName] || objName,
        craftCategory: craftCategoryMapping[objName] || 'Lainnya'
      };
    }
  });

  // Konversi hasil pengelompokan ke array dan urutkan berdasarkan score
  const sortedObjects = Object.entries(groupedObjects)
    .map(([key, value]) => ({
      name: key,
      ...value
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">Hasil Deteksi</h5>
      </div>
      <div className="card-body">
        <p>Kami telah mendeteksi objek berikut dalam gambar Anda:</p>
        <ul className="list-group">
          {sortedObjects.map((object, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                <span className="fw-bold">{object.translation}</span>
                {object.count > 1 && <span className="badge bg-secondary rounded-pill ms-2">x{object.count}</span>}
                <br />
                <small className="text-muted">
                  Kategori kerajinan: <span className="badge bg-light text-dark">{object.craftCategory}</span>
                </small>
              </div>
              <span className="badge bg-primary rounded-pill">
                {Math.round(object.score * 100)}% keyakinan
              </span>
            </li>
          ))}
        </ul>
        
        <div className="alert alert-success mt-3" role="alert">
          <i className="bi bi-lightbulb-fill me-2"></i>
          <small>
            Hasil deteksi di atas akan digunakan untuk menyarankan kerajinan yang bisa Anda buat. 
            Semakin tinggi persentase keyakinan, semakin akurat saran kerajinan kami.
          </small>
        </div>
      </div>
    </div>
  );
}

export default DetectionResults;