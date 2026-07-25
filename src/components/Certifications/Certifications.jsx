import React, { useState } from "react";
import { certifications } from "../../constants";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const CertificationCard = ({ cert }) => {
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative border border-white/10 bg-[#0a0a1a]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-2 hover:border-purple-500/30"
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
          src={cert.image}
          alt={cert.title}
          className="w-full h-48 object-cover rounded-xl bg-white/5 shadow-inner"
        />
      </div>
      <div className="p-6 pt-2 flex-grow flex flex-col z-10">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {cert.title}
          </h3>
        </div>
        <p className="text-gray-400 text-sm font-semibold mb-1">
          {cert.issuer}
        </p>
        <p className="text-gray-500 text-xs mb-6">
          {cert.date}
        </p>
        
        <div className="mt-auto pt-4 border-t border-white/5">
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-center py-2.5 rounded-xl text-sm font-bold transition-all"
          >
            Lihat Kredensial
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section
      id="certifications"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#e879f9] to-[#a78bfa] animate-gradient-x uppercase">
          Certifications
        </h2>
        <div className="w-24 md:w-32 h-1 bg-[#8245ec] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(130,69,236,0.6)]"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-3xl mx-auto font-medium">
          Daftar sertifikat dan pelatihan yang telah saya selesaikan untuk terus meningkatkan keahlian dan pengetahuan saya.
        </p>
      </div>

      {/* Certifications Grid */}
      <motion.div 
        className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {certifications.slice(0, visibleCount).map((cert) => (
          <CertificationCard key={cert.id} cert={cert} />
        ))}
      </motion.div>

      {/* Load More Button */}
      {visibleCount < certifications.length && (
        <div className="flex justify-center mt-12 relative z-10">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-purple-600/80 hover:bg-purple-500 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(130,69,236,0.3)] hover:shadow-[0_0_30px_rgba(130,69,236,0.5)] transition-all duration-300 flex items-center gap-2"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </section>
  );
};

export default Certifications;
