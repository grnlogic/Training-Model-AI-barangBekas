import React from 'react';

function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="mb-3">
              <i className="bi bi-recycle me-2"></i>
              BarbekRaft
            </h5>
            <p className="small">
              Aplikasi yang membantu Anda mengubah barang bekas menjadi kerajinan bernilai
              menggunakan teknologi kecerdasan buatan.
            </p>
          </div>
          <div className="col-md-3">
            <h6 className="mb-3">Tautan</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light opacity-75">Beranda</a></li>
              <li><a href="#kerajinan" className="text-decoration-none text-light opacity-75">Inspirasi</a></li>
              <li><a href="#tentang" className="text-decoration-none text-light opacity-75">Tentang</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="mb-3">Hubungi Kami</h6>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope me-2"></i> info@barbekraft.com</li>
              <li><i className="bi bi-telephone me-2"></i> +62 812-3456-7890</li>
              <li><i className="bi bi-geo-alt me-2"></i> Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <hr className="mt-4 mb-3" />
        <div className="row">
          <div className="col-md-6">
            <p className="small mb-0">&copy; {new Date().getFullYear()} BarbekRaft. Hak Cipta Dilindungi.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="social-links">
              <a href="#" className="me-3 text-light opacity-75"><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-3 text-light opacity-75"><i className="bi bi-twitter"></i></a>
              <a href="#" className="me-3 text-light opacity-75"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light opacity-75"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;