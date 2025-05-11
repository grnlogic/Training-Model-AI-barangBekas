import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container py-4">
        <h1 className="mb-4">Tentang BarbekRaft</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h2>Misi Kami</h2>
            <p>
              BarbekRaft didirikan dengan misi untuk mengurangi limbah rumah
              tangga dengan mendorong kreativitas daur ulang. Kami percaya bahwa
              setiap barang bekas memiliki potensi untuk ditransformasikan
              menjadi sesuatu yang berharga dan bermanfaat.
            </p>
            <p>
              Dengan memanfaatkan teknologi kecerdasan buatan, kami membantu
              Anda menemukan inspirasi untuk mendaur ulang barang-barang
              sehari-hari menjadi kerajinan tangan yang unik, dengan panduan
              langkah demi langkah yang mudah diikuti.
            </p>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2>Cara Kerja BarbekRaft</h2>
            <div className="row mt-4">
              <div className="col-md-4 text-center mb-3">
                <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                  <i
                    className="bi bi-camera-fill text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                </div>
                <h4>Ambil Foto</h4>
                <p>Ambil foto barang bekas yang ingin Anda daur ulang</p>
              </div>

              <div className="col-md-4 text-center mb-3">
                <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                  <i
                    className="bi bi-cpu text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                </div>
                <h4>AI Analisis</h4>
                <p>Sistem kami menganalisis barang dan membuat rekomendasi</p>
              </div>

              <div className="col-md-4 text-center mb-3">
                <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                  <i
                    className="bi bi-tools text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                </div>
                <h4>Buat Kerajinan</h4>
                <p>
                  Ikuti instruksi langkah demi langkah untuk membuat kerajinan
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2>Teknologi Yang Kami Gunakan</h2>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <h4>
                  <i className="bi bi-camera text-success me-2"></i> Deteksi
                  Objek
                </h4>
                <p>
                  Kami menggunakan model deteksi objek canggih untuk
                  mengidentifikasi barang-barang dalam gambar Anda dengan
                  akurasi tinggi.
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <h4>
                  <i className="bi bi-robot text-success me-2"></i> AI Generatif
                </h4>
                <p>
                  Kecerdasan buatan seperti Google Gemini dan OpenAI membantu
                  menghasilkan ide dan instruksi kerajinan yang kreatif dan
                  praktis.
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <h4>
                  <i className="bi bi-braces text-success me-2"></i> Stack
                  Modern
                </h4>
                <p>
                  Aplikasi dikembangkan dengan React untuk frontend dan Node.js
                  untuk backend, memastikan pengalaman pengguna yang cepat dan
                  responsif.
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <h4>
                  <i className="bi bi-palette text-success me-2"></i>{" "}
                  Visualisasi Kreatif
                </h4>
                <p>
                  Kami menghasilkan gambar visualisasi dari kerajinan yang
                  direkomendasikan untuk menginspirasi kreativitas Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2>Tim BarbekRaft</h2>
            <p>
              BarbekRaft adalah proyek yang dikembangkan oleh tim kreatif yang
              peduli terhadap lingkungan. Kami terus bekerja untuk meningkatkan
              aplikasi ini dan menambahkan fitur-fitur baru yang berguna.
            </p>
            <p>
              Proyek ini juga merupakan pengembangan lanjutan dari karya asli
              yang dipublikasikan di
              <a
                href="https://github.com/tryaannn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                https://github.com/tryaannn
              </a>
              .
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2>Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan, saran, atau ingin berkolaborasi,
              jangan ragu untuk menghubungi kami di:
            </p>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-envelope me-2"></i> email@example.com
              </li>
              <li>
                <i className="bi bi-github me-2"></i> github.com/username
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
