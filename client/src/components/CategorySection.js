import React from "react";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "Plastik",
      icon: "bi-recycle",
      count: "234 ide",
      color: "#3498db",
    },
    {
      id: 2,
      name: "Kain",
      icon: "bi-palette",
      count: "158 ide",
      color: "#e74c3c",
    },
    {
      id: 3,
      name: "Logam",
      icon: "bi-gear",
      count: "189 ide",
      color: "#f39c12",
    },
    {
      id: 4,
      name: "Kayu",
      icon: "bi-tree",
      count: "213 ide",
      color: "#27ae60",
    },
    {
      id: 5,
      name: "Elektronik",
      icon: "bi-cpu",
      count: "145 ide",
      color: "#9b59b6",
    },
  ];

  return (
    <div className="category-section mb-5">
      <h3 className="section-title">Kategori Barang Bekas</h3>
      <div className="row g-4">
        {categories.map((category) => (
          <div key={category.id} className="col" style={{ minWidth: "150px" }}>
            <div className="category-card text-center p-3">
              <div
                className="icon-circle mb-3"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <i
                  className={`bi ${category.icon}`}
                  style={{ color: category.color }}
                ></i>
              </div>
              <h5>{category.name}</h5>
              <p className="text-muted small">{category.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
