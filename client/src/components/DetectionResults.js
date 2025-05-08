import React from 'react';

// Mapping nama objek dari bahasa Inggris ke Indonesia
const objectTranslations = {
  'bottle': 'Botol',
  'cup': 'Gelas/Kaleng',
  'box': 'Kardus/Kotak',
  'book': 'Buku/Koran',
  'handbag': 'Tas/Kain',
  'backpack': 'Ransel/Kain',
  'suitcase': 'Koper/Kain',
  'cell phone': 'Ponsel',
  'tv': 'Televisi',
  'laptop': 'Laptop',
  'keyboard': 'Keyboard',
  'mouse': 'Mouse',
  'remote': 'Remote',
  'chair': 'Kursi',
  'couch': 'Sofa',
  'potted plant': 'Tanaman Pot',
  'dining table': 'Meja Makan',
  'toilet': 'Toilet',
  'sink': 'Wastafel',
  'clock': 'Jam',
  'vase': 'Vas'
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

  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">Hasil Deteksi</h5>
      </div>
      <div className="card-body">
        <p>Kami telah mendeteksi objek berikut dalam gambar Anda:</p>
        <ul className="list-group">
          {objects.map((object, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                {objectTranslations[object.class] || object.class}
              </span>
              <span className="badge bg-primary rounded-pill">
                {Math.round(object.score * 100)}% keyakinan
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetectionResults;