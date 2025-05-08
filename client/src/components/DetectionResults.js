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

// Icon mapping for each category
const categoryIcons = {
  'Botol Plastik': 'bi-droplet',
  'Botol/Gelas': 'bi-cup',
  'Botol/Wadah': 'bi-droplet',
  'Kaleng/Gelas': 'bi-cup-straw',
  'Kaleng/Wadah': 'bi-archive',
  'Kardus': 'bi-box',
  'Kardus/Kain': 'bi-box-seam',
  'Kain': 'bi-scissors',
  'Kertas/Koran': 'bi-newspaper',
  'Koran': 'bi-newspaper',
  'Elektronik': 'bi-phone',
  'Ban': 'bi-circle',
  'Ban & Logam': 'bi-bicycle',
  'Kayu': 'bi-tree',
  'CD/DVD': 'bi-disc',
  'Tutup Botol': 'bi-record-circle',
  'Sendok/Garpu': 'bi-egg-fried',
  'Sedotan': 'bi-funnel',
  'default': 'bi-question-circle'
};

// Function to get icon for category
const getCategoryIcon = (category) => {
  return categoryIcons[category] || categoryIcons['default'];
};

// Function to get color for confidence level
const getConfidenceColor = (score) => {
  if (score >= 0.8) return 'success';
  if (score >= 0.6) return 'info';
  if (score >= 0.4) return 'warning';
  return 'danger';
};

function DetectionResults({ objects, isLoading }) {
  if (isLoading) {
    return (
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">
            <i className="bi bi-search me-2"></i>
            Hasil Deteksi
          </h5>
        </div>
        <div className="card-body text-center">
          <div className="spinner-border text-info pulse-animation" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Memproses hasil deteksi...</p>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!objects || objects.length === 0) {
    return (
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">
            <i className="bi bi-search me-2"></i>
            Hasil Deteksi
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center py-4">
            <i className="bi bi-camera text-info" style={{ fontSize: '3rem' }}></i>
            <p className="mt-3">
              Unggah gambar barang bekas untuk melihat hasil deteksi.
            </p>
            <p className="text-muted small">
              AI kami akan mendeteksi objek dan menyarankan kerajinan yang dapat dibuat.
            </p>
          </div>
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

  // Hitung total objek unik
  const uniqueObjectCount = sortedObjects.length;
  
  // Tentukan apakah kita menemukan multi-object (2 atau lebih)
  const isMultiObject = uniqueObjectCount >= 2;

  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0 d-flex align-items-center">
          <i className="bi bi-search me-2"></i>
          Hasil Deteksi
          {isMultiObject && (
            <span className="badge bg-warning ms-2">
              {uniqueObjectCount} objek
            </span>
          )}
        </h5>
      </div>
      <div className="card-body">
        <p>
          <i className="bi bi-info-circle-fill text-info me-2"></i>
          Kami telah mendeteksi objek berikut dalam gambar Anda:
        </p>
        
        <div className="detection-list mb-4">
          {sortedObjects.map((object, index) => (
            <div key={index} className="detection-item">
              <div className={`detection-item-icon bg-light-${getConfidenceColor(object.score)}`}>
                <i className={`bi ${getCategoryIcon(object.craftCategory)}`}></i>
              </div>
              <div className="detection-item-content">
                <div className="fw-bold">{object.translation}</div>
                <div className="small text-muted">
                  Kategori: {object.craftCategory}
                  {object.count > 1 && <span className="ms-2 badge bg-secondary">x{object.count}</span>}
                </div>
              </div>
              <div className={`detection-item-confidence badge bg-${getConfidenceColor(object.score)}`}>
                {Math.round(object.score * 100)}%
              </div>
            </div>
          ))}
        </div>
        
        <div className={`alert ${isMultiObject ? 'alert-warning' : 'alert-success'} mt-3 mb-0`}>
          <i className={`bi ${isMultiObject ? 'bi-lightbulb-fill' : 'bi-check-circle-fill'} me-2`}></i>
          <small>
            {isMultiObject ? (
              <>
                <strong>Kombinasi Objek Terdeteksi!</strong> Kami akan menyarankan kerajinan yang bisa dibuat dari kombinasi {uniqueObjectCount} objek yang terdeteksi.
              </>
            ) : (
              <>
                Hasil deteksi akan digunakan untuk menyarankan kerajinan yang bisa Anda buat. 
                Semakin tinggi persentase keyakinan, semakin akurat saran kerajinan kami.
              </>
            )}
          </small>
        </div>
      </div>
    </div>
  );
}

export default DetectionResults;