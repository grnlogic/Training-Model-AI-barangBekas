import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CraftSuggestion({ suggestion, isLoading, detectedObjects }) {
  const [alternativeSuggestions, setAlternativeSuggestions] = useState([]);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [difficulty, setDifficulty] = useState('semua');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  // Generate image when suggestion changes
  useEffect(() => {
    if (suggestion && !isLoading && suggestion.imagePrompt) {
      generateImage(suggestion.imagePrompt);
    }
  }, [suggestion, isLoading]);
  
  const generateImage = async (prompt) => {
    try {
      setIsGeneratingImage(true);
      
      // Call API to generate image
      const response = await axios.post('/api/generate-image', { prompt });
      
      if (response.data && response.data.success) {
        setGeneratedImage(response.data.imageUrl);
      }
      
      setIsGeneratingImage(false);
    } catch (error) {
      console.error('Gagal menghasilkan gambar:', error);
      setIsGeneratingImage(false);
    }
  };
  
  const fetchAlternatives = async () => {
    try {
      setLoadingAlternatives(true);
      
      // Fetch different endpoint based on if it's a multi-object suggestion
      const endpoint = suggestion.isMulti ? '/api/crafts-multi' : '/api/crafts';
      const response = await axios.get(endpoint);
      
      if (response.data) {
        let filteredCrafts = [];
        
        if (suggestion.isMulti) {
          // For multi-object, filter by similar combinations
          const currentKombinasi = suggestion.kombinasi || [];
          filteredCrafts = response.data
            .filter(craft => craft.id !== suggestion.id)
            .filter(craft => {
              const similarKombinasi = craft.kombinasi.some(k => currentKombinasi.includes(k));
              return similarKombinasi;
            });
        } else {
          // For single object, use category
          const category = getCraftCategory(suggestion.nama);
          filteredCrafts = Object.values(response.data)
            .filter(craft => getCraftCategory(craft.nama) === category && craft.nama !== suggestion.nama);
        }
        
        // Shuffle array
        filteredCrafts = shuffleArray(filteredCrafts);
        
        // Limit to 3 alternatives
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
  
  const getDifficultyLabel = (langkah, tingkatKesulitan) => {
    // If tingkatKesulitan is provided (for multi-object crafts)
    if (tingkatKesulitan) {
      return tingkatKesulitan;
    }
    
    // Fallback to length-based difficulty (for single object crafts)
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
    
    const difficultyLevel = getDifficultyLabel(suggestion.langkah, suggestion.tingkatKesulitan);
    if (difficulty === 'mudah' && difficultyLevel !== 'Mudah') return null;
    if (difficulty === 'sedang' && difficultyLevel !== 'Sedang') return null;
    if (difficulty === 'sulit' && difficultyLevel !== 'Sulit') return null;
    
    return suggestion;
  };
  
  const filteredSuggestion = getFilteredSuggestion();
  
  // Function to get estimated material cost category
  const getEstimatedCost = (bahan) => {
    if (!bahan) return { category: 'Rendah', text: 'Rp 0 - 20.000' };
    
    const count = bahan.length;
    
    if (count <= 3) return { category: 'Rendah', text: 'Rp 0 - 20.000' };
    if (count <= 6) return { category: 'Sedang', text: 'Rp 20.000 - 50.000' };
    return { category: 'Tinggi', text: 'Rp 50.000+' };
  };
  
  const getCostBadgeColor = (category) => {
    if (category === 'Rendah') return 'success';
    if (category === 'Sedang') return 'warning';
    return 'danger';
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="card-header bg-warning text-white">
          <h5 className="mb-0">Saran Kerajinan</h5>
        </div>
        <div className="card-body text-center">
          <div className="spinner-border text-warning pulse-animation" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Menghasilkan saran kerajinan...</p>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '80%' }}></div>
          </div>
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
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
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

  // Get material cost estimate
  const costEstimate = getEstimatedCost(suggestion.bahan);
  const detectedItemsText = detectedObjects && detectedObjects.length > 0 
    ? detectedObjects.map(obj => obj.mappedClass).filter((v, i, a) => a.indexOf(v) === i).join(', ') 
    : '';

  return (
    <div className="card">
      <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          {suggestion.isMulti && <span className="badge bg-info me-2">Kombinasi</span>}
          Saran Kerajinan
        </h5>
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
          <div className="col-lg-5 mb-4">
            <div className="position-relative">
              {isGeneratingImage ? (
                <div className="text-center p-4 bg-light rounded">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Generating image...</span>
                  </div>
                  <p className="mt-3">Menghasilkan visualisasi kerajinan...</p>
                </div>
              ) : generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt={suggestion.nama} 
                  className="img-fluid rounded fade-in shadow-sm"
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
              ) : (
                <img 
                  src={suggestion.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(suggestion.nama)}`}
                  alt={suggestion.nama} 
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
              )}
              
              <div className="mt-2 d-flex justify-content-between">
                <span className={`badge bg-${getDifficultyColor(getDifficultyLabel(suggestion.langkah, suggestion.tingkatKesulitan))}`}>
                  <i className="bi bi-tools me-1"></i>
                  {getDifficultyLabel(suggestion.langkah, suggestion.tingkatKesulitan)}
                </span>
                
                <span className={`badge bg-${getCostBadgeColor(costEstimate.category)}`}>
                  <i className="bi bi-currency-exchange me-1"></i>
                  {costEstimate.text}
                </span>
                
                {suggestion.estimasiWaktu && (
                  <span className="badge bg-info">
                    <i className="bi bi-clock-history me-1"></i>
                    {suggestion.estimasiWaktu}
                  </span>
                )}
              </div>
              
              {suggestion.kategori && (
                <div className="mt-2">
                  <span className="badge bg-secondary">
                    <i className="bi bi-tag me-1"></i>
                    {suggestion.kategori}
                  </span>
                </div>
              )}
            </div>
            
            {detectedItemsText && (
              <div className="alert alert-info mt-3 mb-0">
                <small>
                  <i className="bi bi-info-circle-fill me-1"></i>
                  Kerajinan ini dibuat dari: <strong>{detectedItemsText}</strong>
                </small>
              </div>
            )}
          </div>
          
          <div className="col-lg-7">
            <h4 className="card-title mb-3">{suggestion.nama}</h4>
            
            <h6 className="mt-4 mb-3">
              <i className="bi bi-basket me-2 text-success"></i>
              Bahan yang Dibutuhkan:
            </h6>
            <ul className="list-group list-group-flush mb-4">
              {suggestion.bahan && suggestion.bahan.map((item, index) => (
                <li key={index} className="list-group-item d-flex align-items-center py-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <h6 className="mb-3">
              <i className="bi bi-list-ol me-2 text-primary"></i>
              Langkah-langkah Pembuatan:
            </h6>
            <ol className="list-group list-group-numbered mb-4">
              {suggestion.langkah && suggestion.langkah.map((step, index) => (
                <li key={index} className="list-group-item d-flex py-2">
                  <div className="ms-2 me-auto">
                    <div>{step}</div>
                  </div>
                </li>
              ))}
            </ol>
            
            <div className="d-flex flex-wrap justify-content-between mt-4">
              <button className="btn btn-success mb-2" onClick={() => window.print()}>
                <i className="bi bi-printer me-1"></i> Cetak Petunjuk
              </button>
              
              <button 
                className="btn btn-primary mb-2" 
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
              
              {!generatedImage && suggestion.imagePrompt && (
                <button 
                  className="btn btn-info mb-2" 
                  onClick={() => generateImage(suggestion.imagePrompt)}
                  disabled={isGeneratingImage}
                >
                  {isGeneratingImage ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-image me-1"></i> Hasilkan Gambar
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {showAlternatives && alternativeSuggestions.length > 0 && (
          <div className="mt-5">
            <h5 className="border-bottom pb-2">
              <i className="bi bi-lightbulb me-2 text-warning"></i>
              Alternatif Kerajinan Lainnya:
            </h5>
            <div className="row mt-3">
              {alternativeSuggestions.map((alt, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card h-100 suggestion-card">
                    <div className="card-header py-2 bg-light">
                      <h6 className="mb-0 text-center">{alt.nama}</h6>
                    </div>
                    <div className="card-body text-center p-3">
                      <img 
                        src={alt.image || `https://via.placeholder.com/150?text=${encodeURIComponent(alt.nama)}`} 
                        alt={alt.nama} 
                        className="img-fluid rounded mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                      />
                      <div className="mt-2">
                        <span className={`badge bg-${getDifficultyColor(getDifficultyLabel(alt.langkah, alt.tingkatKesulitan))}`}>
                          {getDifficultyLabel(alt.langkah, alt.tingkatKesulitan)}
                        </span>
                        {alt.kategori && (
                          <span className="badge bg-secondary ms-1">
                            {alt.kategori}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="alert alert-light mt-4" role="alert">
          <i className="bi bi-info-circle-fill text-info me-2"></i>
          <small>
            <strong>Tips:</strong> Jika Anda tidak memiliki semua bahan, cobalah untuk menggunakan alternatif yang tersedia.
            Misalnya, jika tidak memiliki cat, gunakan spidol atau krayon sebagai pengganti.
          </small>
        </div>
      </div>
    </div>
  );
}

export default CraftSuggestion;