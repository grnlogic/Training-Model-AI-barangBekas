import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>BarbekRaft</h5>
            <p className="small">
              Mengubah barang bekas menjadi kerajinan bernilai dengan bantuan
              teknologi AI.
            </p>
          </div>

          <div className="col-md-3">
            <h6>Navigasi</h6>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white-50" to="/">
                  Beranda
                </Link>
              </li>
              <li>
                <Link className="text-white-50" to="/scan">
                  Scan
                </Link>
              </li>
              <li>
                <Link className="text-white-50" to="/about">
                  Tentang
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>Media Sosial</h6>
            <div className="d-flex">
              <a
                href="https://github.com/username"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-github"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="text-center">
          <p className="small text-white-50">
            &copy; {new Date().getFullYear()} BarbekRaft. Dikembangkan dari{" "}
            <a
              href="https://github.com/tryaannn"
              className="text-white-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              tryaannn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
