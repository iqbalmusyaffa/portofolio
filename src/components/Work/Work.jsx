import React, { useState, useEffect } from "react";

const ProjectCard = ({ project, onClick }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative border border-white/10 bg-[#0a0a1a]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col group hover:-translate-y-2 hover:border-purple-500/30"
    >
      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.15), transparent 40%)`,
        }}
      />
      
      <div className="p-4 z-10">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-xl bg-white/5"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/1a1a2e/8245ec?text=${encodeURIComponent(project.title)}&font=montserrat`;
          }}
        />
      </div>
      <div className="p-6 flex-grow flex flex-col z-10">
        <h3 className="text-2xl font-bold text-white mb-2 capitalize group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 pt-2 line-clamp-3 flex-grow text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-purple-500/10 text-xs font-semibold text-purple-400 rounded-full px-3 py-1 ring-1 ring-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Mengambil data dari repository GitHub user "iqbalmusyaffa"
        const response = await fetch("https://api.github.com/users/iqbalmusyaffa/repos?sort=updated&per_page=6");
        const data = await response.json();
        
        const formattedProjects = data.map((repo) => ({
          id: repo.id,
          title: repo.name.replace(/-/g, " "),
          description: repo.description || "No description provided.",
          image: `https://opengraph.githubassets.com/1/iqbalmusyaffa/${repo.name}`, // Gambar open graph dari github
          tags: repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
          github: repo.html_url,
          webapp: repo.homepage || repo.html_url,
        }));
        setProjectsData(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="work"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">PROJECTS</h2>
        <div className="w-24 md:w-32 h-1 bg-[#8245ec] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(130,69,236,0.6)]"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-3xl mx-auto font-medium">
          Beberapa proyek nyata (real-world projects) yang pernah saya bangun. Data di bawah ditarik langsung secara otomatis dari repositori GitHub saya.
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center text-white text-xl relative z-10 animate-pulse">Loading projects from GitHub...</div>
      ) : (
        <div className="grid gap-8 sm:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={handleOpenModal} />
          ))}
        </div>
      )}

      {/* Modal Container */}
      {selectedProject && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-90 p-4">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-gray-800 hover:bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-4xl font-bold transition-all z-[10001]"
            aria-label="Close modal"
          >
            &times;
          </button>

          <div className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col">
              <div className="w-full flex justify-center bg-gray-900 px-4 pt-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="lg:w-full w-[95%] object-contain rounded-xl shadow-2xl bg-white"
                />
              </div>
              <div className="lg:p-8 p-6">
                <h3 className="lg:text-3xl font-bold text-white mb-4 text-md capitalize">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-400 mb-6 lg:text-base text-xs">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-gray-800 hover:bg-purple-800 text-gray-400 lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;

