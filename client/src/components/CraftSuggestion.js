import React from 'react';

function CraftSuggestion({ suggestion, isLoading }) {
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

  return (
    <div className="card">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">Saran Kerajinan</h5>
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
          </div>
          <div className="col-md-8">
            <h5 className="card-title">{suggestion.nama}</h5>
            
            <h6 className="mt-3">Bahan yang Dibutuhkan:</h6>
            <ul className="list-group list-group-flush mb-3">
              {suggestion.bahan.map((item, index) => (
                <li key={index} className="list-group-item py-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <h6>Langkah-langkah Pembuatan:</h6>
        <ol className="list-group list-group-numbered">
          {suggestion.langkah.map((step, index) => (
            <li key={index} className="list-group-item">{step}</li>
          ))}
        </ol>
        
        <div className="mt-3 text-center">
          <button className="btn btn-outline-success" onClick={() => window.print()}>
            <i className="bi bi-printer me-1"></i> Cetak Petunjuk
          </button>
        </div>
      </div>
    </div>
  );
}

export default CraftSuggestion;