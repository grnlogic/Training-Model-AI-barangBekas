import React from "react";
import "./CraftInstructions.css";

const CraftInstructions = ({ craftData }) => {
  if (!craftData) {
    return null;
  }

  const { nama, bahan, langkah, tingkatKesulitan, kategori, estimasiWaktu } =
    craftData;

  return (
    <div className="craft-instructions">
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">
            <i className="bi bi-lightbulb me-2"></i>
            {nama}
          </h3>
        </div>

        <div className="card-body">
          <div className="craft-metadata mb-4">
            <span
              className={`badge bg-${
                tingkatKesulitan === "Mudah"
                  ? "success"
                  : tingkatKesulitan === "Sulit"
                  ? "danger"
                  : "warning"
              } me-2`}
            >
              <i
                className={`bi bi-${
                  tingkatKesulitan === "Mudah"
                    ? "emoji-smile"
                    : tingkatKesulitan === "Sulit"
                    ? "emoji-frown"
                    : "emoji-neutral"
                } me-1`}
              ></i>
              {tingkatKesulitan}
            </span>

            <span className="badge bg-info me-2">
              <i className="bi bi-tag me-1"></i>
              {kategori}
            </span>

            <span className="badge bg-secondary">
              <i className="bi bi-clock me-1"></i>
              {estimasiWaktu}
            </span>
          </div>

          <div className="materials-section mb-4">
            <h4 className="section-title">
              <i className="bi bi-tools me-2"></i>
              Bahan dan Alat
            </h4>

            <ul className="materials-list">
              {bahan &&
                bahan.map((item, index) => (
                  <li key={index} className="material-item">
                    <i className="bi bi-check-circle-fill me-2 text-success"></i>
                    {item}
                    {item.toLowerCase().includes("opsional") && (
                      <span className="badge bg-light text-dark ms-2">
                        Opsional
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div className="steps-section">
            <h4 className="section-title">
              <i className="bi bi-list-ol me-2"></i>
              Langkah-langkah Pembuatan
            </h4>

            <ol className="steps-list">
              {langkah &&
                langkah.map((step, index) => (
                  <li key={index} className="step-item">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <p>{step}</p>
                    </div>
                  </li>
                ))}
            </ol>
          </div>

          <div className="mt-4 text-center">
            <button className="btn btn-outline-success me-2">
              <i className="bi bi-printer me-1"></i>
              Cetak Panduan
            </button>

            <button className="btn btn-outline-primary">
              <i className="bi bi-share me-1"></i>
              Bagikan
            </button>
          </div>
        </div>
      </div>

      <div className="json-data">
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">
              <i className="bi bi-code-slash me-2"></i>
              JSON Response Data
            </h5>
          </div>
          <div className="card-body">
            <pre className="json-code">
              {JSON.stringify(craftData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftInstructions;
