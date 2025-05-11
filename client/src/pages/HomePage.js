import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="container">
        <div className="hero-section text-center py-5">
          <h1 className="display-4">
            Ubah Barang Bekas Menjadi Kerajinan Bernilai
          </h1>
          <p className="lead">
            BarbekRaft membantu Anda menemukan inspirasi untuk mendaur ulang
            barang bekas menjadi kerajinan yang bermanfaat
          </p>
          <Link to="/scan" className="btn btn-primary btn-lg mt-3">
            <i className="bi bi-camera"></i> Mulai Scan Sekarang
          </Link>
        </div>

        <div className="row features-section my-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i
                  className="bi bi-camera-fill text-primary"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h3 className="card-title mt-3">Ambil Foto</h3>
                <p className="card-text">
                  Cukup ambil foto barang bekas yang ingin Anda daur ulang
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i
                  className="bi bi-magic text-primary"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h3 className="card-title mt-3">Dapatkan Ide</h3>
                <p className="card-text">
                  AI akan memberikan ide kerajinan berdasarkan barang yang
                  terdeteksi
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i
                  className="bi bi-tools text-primary"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h3 className="card-title mt-3">Buat Kerajinan</h3>
                <p className="card-text">
                  Ikuti langkah-langkah sederhana untuk membuat kerajinan unik
                  Anda
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="why-section bg-light p-4 rounded my-5">
          <h2 className="text-center mb-4">Mengapa Mendaur Ulang?</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-globe-americas text-success me-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h4>Mengurangi Limbah</h4>
                  <p>
                    Membantu mengurangi limbah yang berakhir di tempat
                    pembuangan sampah dan lautan
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-lightbulb text-success me-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h4>Kreatifitas Tanpa Batas</h4>
                  <p>
                    Mengembangkan kreativitas dan keterampilan dengan proyek DIY
                    yang menyenangkan
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-piggy-bank text-success me-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h4>Hemat Biaya</h4>
                  <p>Membuat barang berguna tanpa harus membeli produk baru</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-heart text-success me-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h4>Gaya Hidup Berkelanjutan</h4>
                  <p>
                    Berkontribusi pada lingkungan dan masa depan yang lebih
                    berkelanjutan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section text-center my-5">
          <h2>Siap untuk memulai?</h2>
          <p className="lead">
            Ambil foto barang bekas Anda dan temukan inspirasi sekarang!
          </p>
          <Link to="/scan" className="btn btn-success btn-lg mt-3">
            <i className="bi bi-camera"></i> Mulai Scan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
