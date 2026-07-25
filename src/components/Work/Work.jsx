import React, { useState, useEffect } from "react";
import { customDescriptions, customLiveUrls } from "../../constants";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

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
    <motion.div
      variants={itemVariants}
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
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-purple-500/10 text-xs font-semibold text-purple-400 rounded-full px-3 py-1 ring-1 ring-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* GitHub Stats */}
        <div className="flex items-center gap-4 text-gray-400 text-sm mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors" title="Stars">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>{project.stars || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors" title="Forks">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>
            <span>{project.forks || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors" title="Commits">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><line x1="3" y1="12" x2="9" y2="12"></line><line x1="15" y1="12" x2="21" y2="12"></line></svg>
            <span>{project.commits || 0}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadProjects = async (pageNumber) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const CACHE_KEY = `github_projects_v2_page_${pageNumber}`;
      const CACHE_EXPIRY = 60 * 60 * 1000; // 1 jam

      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          if (data.length < 6) setHasMore(false);
          setProjectsData(prev => pageNumber === 1 ? data : [...prev, ...data]);
          setLoading(false);
          setLoadingMore(false);
          return;
        }
      }

      // Mengambil data dari repository GitHub user "iqbalmusyaffa"
      const response = await fetch(`https://api.github.com/users/iqbalmusyaffa/repos?sort=updated&per_page=6&page=${pageNumber}`);
      const data = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        if (pageNumber === 1 && !Array.isArray(data)) {
          // Rate limit hit on page 1, use backup data
          const backupProjects = [
            { id: 1, name: "portofolio", description: "", topics: ["react", "tailwind"], language: "JavaScript", html_url: "https://github.com/iqbalmusyaffa/portofolio", stargazers_count: 0, forks_count: 0 },
            { id: 2, name: "company-profile-aneka", description: "", topics: ["laravel", "blade"], language: "PHP", html_url: "https://github.com/iqbalmusyaffa/company-profile-aneka", stargazers_count: 0, forks_count: 0 },
            { id: 3, name: "opensky-radar", description: "", topics: ["react", "api"], language: "JavaScript", html_url: "https://github.com/iqbalmusyaffa/opensky-radar", stargazers_count: 0, forks_count: 0 },
            { id: 4, name: "websewamobil", description: "", topics: ["php", "mysql"], language: "PHP", html_url: "https://github.com/iqbalmusyaffa/websewamobil", stargazers_count: 0, forks_count: 0 },
            { id: 5, name: "e-commerce-frontend", description: "", topics: ["react", "redux"], language: "JavaScript", html_url: "https://github.com/iqbalmusyaffa/e-commerce-frontend", stargazers_count: 0, forks_count: 0 },
            { id: 6, name: "e-commerce-backend", description: "", topics: ["express", "mongodb"], language: "JavaScript", html_url: "https://github.com/iqbalmusyaffa/e-commerce-backend", stargazers_count: 0, forks_count: 0 }
          ];
          
          const formattedBackup = backupProjects.map(repo => {
            const customDesc = customDescriptions[repo.name];
            return {
              id: repo.id,
              title: repo.name.replace(/-/g, " "),
              description: customDesc || "Proyek pribadi yang menarik. Klik untuk melihat detail.",
              image: `https://opengraph.githubassets.com/1/iqbalmusyaffa/${repo.name}`,
              tags: repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
              github: repo.html_url,
              webapp: customLiveUrls[repo.name] || repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              commits: 0
            };
          });
          setProjectsData(formattedBackup);
        }
        setHasMore(false);
        return;
      }

      if (data.length < 6) {
        setHasMore(false);
      }
      
      // Fungsi untuk mengambil jumlah commit dari repo
      const fetchCommitCount = async (repoName) => {
        try {
          const response = await fetch(`https://api.github.com/repos/iqbalmusyaffa/${repoName}/commits?per_page=1`);
          const linkHeader = response.headers.get("Link");
          if (linkHeader) {
            const match = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (match && match[1]) {
              return parseInt(match[1], 10);
            }
          }
          const commitData = await response.json();
          if (Array.isArray(commitData) && commitData.length > 0) return commitData.length;
          return 0;
        } catch (e) {
          return 0;
        }
      };
      
      const formattedProjects = await Promise.all(data.map(async (repo) => {
        const commits = await fetchCommitCount(repo.name);
        const customDesc = customDescriptions[repo.name];
        
        return {
          id: repo.id,
          title: repo.name.replace(/-/g, " "),
          description: customDesc || repo.description || "Proyek pribadi yang menarik. Klik untuk melihat kode sumber dan detail lebih lanjut di GitHub.",
          image: `https://opengraph.githubassets.com/1/iqbalmusyaffa/${repo.name}`, // Gambar open graph dari github
          tags: repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
          github: repo.html_url,
          webapp: customLiveUrls[repo.name] || repo.homepage || repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          commits: commits,
        };
      }));
      
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: formattedProjects, timestamp: Date.now() }));
      setProjectsData(prev => pageNumber === 1 ? formattedProjects : [...prev, ...formattedProjects]);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadProjects(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadProjects(nextPage);
  };

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
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#e879f9] to-[#a78bfa] animate-gradient-x">PROJECTS</h2>
        <div className="w-24 md:w-32 h-1 bg-[#8245ec] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(130,69,236,0.6)]"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-3xl mx-auto font-medium">
          Beberapa proyek nyata (real-world projects) yang pernah saya bangun. Data di bawah ditarik langsung secara otomatis dari repositori GitHub saya.
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center text-white text-xl relative z-10 animate-pulse">Loading projects from GitHub...</div>
      ) : (
        <>
          <motion.div 
            className="grid gap-8 sm:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={handleOpenModal} />
            ))}
          </motion.div>
          
          {hasMore && projectsData.length > 0 && (
            <div className="flex justify-center mt-12 relative z-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3 bg-purple-600/80 hover:bg-purple-500 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(130,69,236,0.3)] hover:shadow-[0_0_30px_rgba(130,69,236,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Memuat...
                  </>
                ) : (
                  "Selanjutnya"
                )}
              </button>
            </div>
          )}
        </>
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

