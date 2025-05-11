import React from "react";
import "./CraftDisplay.css";

const CraftDisplay = ({ craftData }) => {
  // If no data is provided, use default example
  const defaultCraft = {
    nama: "Vas Bunga dari Botol Plastik Bekas",
    bahan: [
      "Botol plastik bekas",
      "Gunting atau cutter",
      "Cat akrilik berbagai warna",
      "Kuas",
      "Tali rami atau tali jute",
      "Lem tembak (hot glue)",
      "Pita dekoratif (opsional)",
    ],
    langkah: [
      "Bersihkan botol plastik bekas dari label dan kotoran",
      "Potong bagian atas botol sekitar 1/3 dari atas sesuai desain yang diinginkan",
      "Amplas permukaan botol agar cat bisa menempel dengan baik",
      "Cat seluruh permukaan botol dengan warna dasar dan biarkan kering",
      "Tambahkan pola atau desain dengan warna lain sesuai kreativitas Anda",
      "Lilitkan tali rami di bagian leher botol dan rekatkan dengan lem tembak",
      "Tambahkan pita dekoratif atau hiasan lain jika diinginkan",
      "Biarkan semua lapisan cat dan lem kering sempurna selama beberapa jam",
    ],
    tingkatKesulitan: "Mudah",
    kategori: "Dekorasi Rumah",
    estimasiWaktu: "1-2 jam",
    imagePrompt:
      "Vas bunga buatan tangan dari botol plastik bekas yang dihias dengan cat warna-warni dan tali rami",
  };

  const craft = craftData || defaultCraft;

  return (
    <div className="craft-display">
      <h2 className="craft-title">{craft.nama}</h2>

      <div className="craft-meta">
        <span className={`difficulty ${craft.tingkatKesulitan.toLowerCase()}`}>
          {craft.tingkatKesulitan}
        </span>
        <span className="category">{craft.kategori}</span>
        <span className="time">{craft.estimasiWaktu}</span>
      </div>

      <div className="materials-section">
        <h3>Bahan-bahan yang Diperlukan:</h3>
        <ul className="materials-list">
          {craft.bahan.map((item, index) => (
            <li key={index} className="material-item">
              {item}
              {item.toLowerCase().includes("opsional") && (
                <span className="optional-badge">Opsional</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="steps-section">
        <h3>Langkah-langkah:</h3>
        <ol className="steps-list">
          {craft.langkah.map((step, index) => (
            <li key={index} className="step-item">
              <div className="step-number">{index + 1}</div>
              <div className="step-text">{step}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default CraftDisplay;
