import React from "react";

const RecentProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Vas Bunga dari Botol Bekas",
      category: "Plastik",
      image: "/images/projects/bottle-vase.jpg",
      author: "Dini Sarah",
    },
    {
      id: 2,
      title: "Hiasan Dinding dari Kain",
      category: "Kain",
      image: "/images/projects/fabric-decoration.jpg",
      author: "Ahmad Rizal",
    },
    {
      id: 3,
      title: "Lampu dari Besi Bekas",
      category: "Logam",
      image: "/images/projects/metal-lamp.jpg",
      author: "Dini Sarah",
    },
  ];

  return (
    <section className="recent-projects mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="section-title">Proyek Terkini</h3>
        <div>
          <button className="btn btn-sm btn-light me-2">Semua Tujukan</button>
          <button className="btn btn-sm btn-light">Semua Material</button>
        </div>
      </div>

      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-12 col-md-4">
            <div className="card project-card h-100">
              <div className="project-image">
                <img
                  src={project.image}
                  className="card-img-top"
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = `https://dummyimage.com/400x300/${
                      project.id % 2 ? "27ae60" : "3498db"
                    }/fff&text=Proyek+Kerajinan`;
                  }}
                />
                <span className="category-badge">{project.category}</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text text-muted small">
                  oleh {project.author}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
