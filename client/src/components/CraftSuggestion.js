import React, { useState } from 'react';
import axios from 'axios';

function CraftSuggestion({ suggestion, isLoading }) {
  const [alternativeSuggestions, setAlternativeSuggestions] = useState([]);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [difficulty, setDifficulty] = useState('semua');
  
  const fetchAlternatives = async () => {
    try {
      setLoadingAlternatives(true);
      const response = await axios.get('/api/crafts');
      
      if (response.data) {
        // Filter kerajinan berdasarkan kategori yang sama
        const category = getCraftCategory(suggestion.nama);
        
        let filteredCrafts = Object.values(response.data)
          .filter(craft => getCraftCategory(craft.nama) === category && craft.nama !== suggestion.nama);
        
        // Acak urutan
        filteredCrafts = shuffleArray(filteredCrafts);
        
        // Batasi jumlah
        filteredCrafts = filteredCrafts.slice(0, 3);
        
        setAlternativeSuggestions(filteredCrafts);
        setShowAlternatives(true);
      }
      
      setLoadingAlternatives(false);
    } catch (error) {
      console.error('Gagal mengambil alternatif:', error);
      setLoadingAlternatives(false);
    }
  };
  
  const getCraftCategory = (name) => {
    if (name.toLowerCase().includes('botol')) return 'botol';
    if (name.toLowerCase().includes('kaleng')) return 'kaleng';
    if (name.toLowerCase().includes('kardus')) return 'kardus';
    if (name.toLowerCase().includes('kain')) return 'kain';
    if (name.toLowerCase().includes('koran')) return 'koran';
    if (name.toLowerCase().includes('elektronik')) return 'elektronik';
    if (name.toLowerCase().includes('ban')) return 'ban';
    if (name.toLowerCase().includes('kayu')) return 'kayu';
    if (name.toLowerCase().includes('tutup botol')) return 'tutup-botol';
    if (name.toLowerCase().includes('sedotan')) return 'sedotan';
    if (name.toLowerCase().includes('cd') || name.toLowerCase().includes('dvd')) return 'cd';
    if (name.toLowerCase().includes('sendok') || name.toLowerCase().includes('garpu')) return 'sendok-garpu';
    return 'lainnya';
  };
  
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const getDifficultyLabel = (langkah) => {
    if (!langkah) return 'Mudah';
    
    const steps = langkah.length;
    if (steps <= 3) return 'Mudah';
    if (steps <= 5) return 'Sedang';
    return 'Sulit';
  };
  
  const getDifficultyColor = (level) => {
    if (level === 'Mudah') return 'success';
    if (level === 'Sedang') return 'warning';
    return 'danger';
  };
  
  // Menampilkan instruksi yang tersaring berdasarkan tingkat kesulitan
  const getFilteredSuggestion = () => {
    if (difficulty === 'semua' || !suggestion) return suggestion;
    
    const difficultyLevel = getDifficultyLabel(suggestion.langkah);
    if (difficulty === 'mudah' && difficultyLevel !== 'Mudah') return null;
    if (difficulty === 'sedang' && difficultyLevel !== 'Sedang') return null;
    if (difficulty === 'sulit' && difficultyLevel !== 'Sulit') return null;
    
    return suggestion;
  };
  
  const filteredSuggestion = getFilteredSuggestion();

  if (isLoading) {
    return (
      <div className="card">
        <div className="card-header bg-warning text-dark">
          <h5 className="mb-0">Saran Kerajinan</h5>
        </div>
        <div className="card-body text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Menghasilkan saran kerajinan...</p>
        </div>
      </div>
    );
  }

  if (!suggestion) {
    return null;
  }
  
  if (!filteredSuggestion) {
    return (
      <div className="card">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Saran Kerajinan</h5>
          <div>
            <select 
              className="form-select form-select-sm" 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="semua">Semua Level</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sulit">Sulit</option>
            </select>
          </div>
        </div>
        <div className="card-body text-center">
          <p>Tidak ada saran kerajinan untuk level kesulitan yang dipilih. Silakan pilih level kesulitan lain.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Saran Kerajinan</h5>
        <div>
          <select 
            className="form-select form-select-sm" 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="semua">Semua Level</option>
            <option value="mudah">Mudah</option>
            <option value="sedang">Sedang</option>
            <option value="sulit">Sulit</option>
          </select>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4 text-center mb-3">
            <img 
              src={suggestion.image} 
              alt={suggestion.nama} 
              className="img-fluid rounded" 
              style={{ maxHeight: '150px' }}
            />
            <div className="mt-2">
              <span className={`badge bg-${getDifficultyColor(getDifficultyLabel(suggestion.langkah))}`}>
                {getDifficultyLabel(suggestion.langkah)}
              </span>
            </div>
          </div>
          <div className="col-md-8">
            <h5 className="card-title">{suggestion.nama}</h5>
            
            <h6 className="mt-3">Bahan yang Dibutuhkan:</h6>
            <ul className="list-group list-group-flush mb-3">
              {suggestion.bahan.map((item, index) => (
                <li key={index} className="list-group-item py-1">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <h6>Langkah-langkah Pembuatan:</h6>
        <ol className="list-group list-group-numbered">
          {suggestion.langkah.map((step, index) => (
            <li key={index} className="list-group-item">
              {step}
            </li>
          ))}
        </ol>
        
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-success" onClick={() => window.print()}>
            <i className="bi bi-printer me-1"></i> Cetak Petunjuk
          </button>
          
          <button 
            className="btn btn-outline-primary" 
            onClick={fetchAlternatives}
            disabled={loadingAlternatives}
          >
            {loadingAlternatives ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Memuat...
              </>
            ) : (
              <>
                <i className="bi bi-shuffle me-1"></i> Lihat Alternatif Lain
              </>
            )}
          </button>
        </div>
        
        {showAlternatives && alternativeSuggestions.length > 0 && (
          <div className="mt-4">
            <h6 className="border-bottom pb-2">Alternatif Kerajinan Lainnya:</h6>
            <div className="row">
              {alternativeSuggestions.map((alt, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header py-2 text-center">
                      <small>{alt.nama}</small>
                    </div>
                    <div className="card-body text-center p-2">
                      <img 
                        src={alt.image} 
                        alt={alt.nama} 
                        className="img-fluid rounded mb-2" 
                        style={{ maxHeight: '100px' }}
                      />
                      <div>
                        <span className={`badge bg-${getDifficultyColor(getDifficultyLabel(alt.langkah))}`}>
                          {getDifficultyLabel(alt.langkah)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="alert alert-light mt-3" role="alert">
          <i className="bi bi-info-circle-fill text-info me-2"></i>
          <small>
            Tips: Jika Anda tidak memiliki semua bahan, cobalah untuk menggunakan alternatif yang tersedia.
            Misalnya, jika tidak memiliki cat, gunakan spidol atau krayon sebagai pengganti.
          </small>
        </div>
      </div>
    </div>
  );
}

export default CraftSuggestion;