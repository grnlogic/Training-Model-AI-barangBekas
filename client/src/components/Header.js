import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo.png"
            alt="BarbekRaft Logo"
            className="me-2"
            onError={(e) => {
              e.target.outerHTML =
                '<i class="bi bi-recycle text-success" style="font-size: 1.5rem"></i>';
            }}
          />
          <span>BarbekRaft</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Beranda
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kategori">
                Kategori
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/proyek">
                Proyek
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tutorial">
                Tutorial
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marketplace">
                Marketplace
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forum">
                Forum
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
