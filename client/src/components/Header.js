import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-recycle me-2 fs-3"></i>
          <span className="fw-bold">BarbekRaft</span>
        </a>
        <div className="navbar-text text-light">
          <em>Ubah Barang Bekas Menjadi Kerajinan Bernilai</em>
        </div>
      </div>
    </nav>
  );
}

export default Header;