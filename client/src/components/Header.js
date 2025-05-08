import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-recycle me-2"></i>
          <span className="fw-bold">BarbekRaft</span>
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <i className="bi bi-house-door"></i> Beranda
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#kerajinan">
                <i className="bi bi-grid-3x3-gap"></i> Inspirasi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#tentang">
                <i className="bi bi-info-circle"></i> Tentang
              </a>
            </li>
          </ul>
          <div className="navbar-text text-light">
            <em>Ubah Barang Bekas Menjadi Kerajinan Bernilai</em>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;