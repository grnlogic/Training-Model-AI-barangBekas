import React from "react";

const PopularTutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "Membuat Pot Tanaman dari Botol Plastik",
      category: "Plastik",
      image: "/images/tutorials/plastic-planter.jpg",
      views: "28 menit",
    },
    {
      id: 2,
      title: "Jam Dinding dari Kayu Bekas",
      category: "Kayu",
      image: "/images/tutorials/wooden-clock.jpg",
      views: "35 menit",
    },
    {
      id: 3,
      title: "Bantal Hias dari Kain Bekas",
      category: "Kain",
      image: "/images/tutorials/fabric-pillow.jpg",
      views: "41 menit",
    },
    {
      id: 4,
      title: "Lampu Gantung dari Logam",
      category: "Logam",
      image: "/images/tutorials/metal-lamp.jpg",
      views: "55 menit",
    },
  ];

  return (
    <section className="tutorial-section mb-5">
      <h3 className="section-title mb-4">Tutorial Populer</h3>
      <div className="row g-4">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="col-6 col-md-3">
            <div className="tutorial-card">
              <div className="tutorial-image">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="img-fluid rounded"
                  onError={(e) => {
                    e.target.src = `https://dummyimage.com/300x200/${
                      tutorial.id % 2 ? "3498db" : "27ae60"
                    }/fff&text=Tutorial`;
                  }}
                />
                <div className="tutorial-time">{tutorial.views}</div>
              </div>
              <div className="tutorial-details mt-2">
                <span className="tutorial-category">{tutorial.category}</span>
                <h6 className="tutorial-title mt-1">{tutorial.title}</h6>
                <button className="btn btn-sm btn-primary mt-2 w-100">
                  Unduh PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTutorials;
