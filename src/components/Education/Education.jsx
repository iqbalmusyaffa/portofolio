import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { education } from "../../constants";

const Education = () => {
  const prefersReduced = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, opacity: 0, originY: 0 },
    show: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="education"
      className="py-24 px-[8vw] md:px-[6vw] lg:px-[12vw] font-sans bg-[#090815] clip-path-custom-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      {/* Section Title */}
      <motion.div className="text-center mb-16" variants={cardVariants}>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">EDUCATION</h2>
        <div className="w-24 md:w-32 h-1 bg-[#8245ec] mx-auto mt-4 rounded-full"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-3xl mx-auto font-medium">
          Selain eksplorasi mandiri, logika pemrograman dan pola pikir analitis saya ditempa melalui pendidikan formal di institusi berikut.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Clean professional line */}
        <motion.div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px h-full"
          variants={lineVariants}
        >
          <div className="h-full bg-gradient-to-b from-transparent via-[#8245ec]/40 to-transparent" />
        </motion.div>

        {/* Education Entries */}
        <ul className="space-y-12 md:space-y-20">
          {education.map((edu, index) => (
            <motion.li
              key={edu.id}
              variants={cardVariants}
              whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
              className={`relative w-full md:w-[48%] p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0b0a1a]/80 shadow-[0_8px_24px_rgba(2,6,23,0.45)] backdrop-blur-md transition-transform duration-300 hover:shadow-[0_0_40px_rgba(130,69,236,0.3)] ${
                index % 2 === 0 ? "md:ml-auto md:mr-[52%]" : "md:mr-auto md:ml-[52%]"
              }`}
            >
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-20 h-16 sm:w-24 sm:h-20 bg-white rounded-md overflow-hidden shrink-0">
                  <img src={edu.img} alt={edu.school} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{edu.degree}</h3>
                  <p className="text-sm sm:text-base text-gray-300">{edu.school}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{edu.date}</p>
                </div>
              </div>

              {edu.grade && (
                <p className="mt-4 text-gray-400 font-semibold">
                  <span className="text-white/90">Grade:</span> {edu.grade}
                </p>
              )}
              {edu.desc && (
                <p className="mt-3 text-gray-300 leading-relaxed">{edu.desc}</p>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default Education;
