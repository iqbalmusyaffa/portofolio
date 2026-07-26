import React, { useRef, useState } from "react";
import { certifications } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiCalendar } from "react-icons/fi";

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

const CertificationCard = ({ cert, onClick }) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => onClick(cert)}
      className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg ring-1 ring-white/10 hover:ring-purple-500/50 transition-all duration-500 aspect-[4/3] md:aspect-[16/9]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-white/5 transition-transform duration-700 ease-out group-hover:scale-105">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content Container */}
      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end sm:translate-y-6 sm:group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
          {cert.title}
        </h3>
        
        {/* Hover Details (Desktop: Animated reveal, Mobile: Always visible) */}
        <div className="sm:opacity-0 sm:h-0 sm:group-hover:opacity-100 sm:group-hover:h-[50px] transition-all duration-500 overflow-hidden flex flex-col gap-1.5 mt-1 sm:mt-0">
          <div className="flex items-center gap-2 text-gray-300 text-sm font-semibold">
            <FiAward className="text-purple-400 flex-shrink-0" />
            <span className="line-clamp-1 drop-shadow-md">{cert.issuer}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <FiCalendar className="text-purple-400 flex-shrink-0" />
            <span className="drop-shadow-md">{cert.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
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

      {/* Smart Grid (Hover Reveal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {certifications.slice(0, visibleCount).map((cert) => (
          <CertificationCard key={cert.id} cert={cert} onClick={handleOpenModal} />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < certifications.length && (
        <div className="flex justify-center mt-12 relative z-10">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-purple-600/80 hover:bg-purple-500 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(130,69,236,0.3)] hover:shadow-[0_0_30px_rgba(130,69,236,0.5)] transition-all duration-300 flex items-center gap-2"
          >
            Lebih Banyak
          </button>
        </div>
      )}

      {/* Modal Lightbox Container */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-gray-800 hover:bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-4xl font-bold transition-all z-[10001]"
              aria-label="Close modal"
            >
              &times;
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0b0a1a] rounded-2xl shadow-2xl lg:w-full w-[95%] max-w-4xl overflow-hidden relative max-h-[90vh] overflow-y-auto ring-1 ring-white/10"
            >
              <div className="flex flex-col">
                <div className="w-full flex justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0b0a1a] p-4 lg:p-8">
                  {selectedCert.link?.endsWith('.pdf') ? (
                    <iframe
                      src={`${selectedCert.link}#view=FitH&toolbar=0`}
                      title={selectedCert.title}
                      className="w-full h-[50vh] md:h-[65vh] rounded-xl shadow-2xl ring-1 ring-white/10 bg-white"
                    />
                  ) : (
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full max-h-[50vh] object-contain rounded-xl shadow-2xl bg-white/5 ring-1 ring-white/10"
                    />
                  )}
                </div>
                <div className="p-6 lg:p-8 border-t border-white/5">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 capitalize">
                    {selectedCert.title}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8 text-gray-300">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
                      <FiAward className="text-purple-400 text-xl" />
                      <span className="font-medium">{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
                      <FiCalendar className="text-purple-400 text-xl" />
                      <span className="font-medium">{selectedCert.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleCloseModal}
                      className="w-1/2 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-3 rounded-xl font-semibold text-center transition-colors"
                    >
                      Tutup
                    </button>
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-xl font-bold text-center transition-colors shadow-[0_0_15px_rgba(130,69,236,0.3)]"
                    >
                      Sertifikat Asli
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
