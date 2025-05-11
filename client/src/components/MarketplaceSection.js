import React from "react";

const MarketplaceSection = () => {
  const products = [
    {
      id: 1,
      name: "Vas Bunga Artistik",
      price: "Rp 150.000",
      image: "/images/marketplace/vase.jpg",
      location: "Jakarta Selatan",
    },
    {
      id: 2,
      name: "Hiasan Dinding Ekologis",
      price: "Rp 275.000",
      image: "/images/marketplace/wall-decor.jpg",
      location: "Bandung",
    },
    {
      id: 3,
      name: "Lampu Meja Unik",
      price: "Rp 225.000",
      image: "/images/marketplace/table-lamp.jpg",
      location: "Surabaya",
    },
  ];

  return (
    <section className="marketplace-section mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="section-title">Marketplace</h3>
        <a href="#" className="text-decoration-none link-dark">
          Lihat Semua
        </a>
      </div>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-4">
            <div className="card product-card h-100">
              <img
                src={product.image}
                className="card-img-top product-image"
                alt={product.name}
                onError={(e) => {
                  e.target.src = `https://dummyimage.com/400x300/${
                    product.id % 2 ? "9b59b6" : "e67e22"
                  }/fff&text=Produk+Kerajinan`;
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="price">{product.price}</p>
                <div className="d-flex align-items-center text-muted">
                  <i className="bi bi-geo-alt me-1"></i>
                  <small>{product.location}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketplaceSection;
