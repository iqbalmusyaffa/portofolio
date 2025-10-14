import React from "react";
import { experiences } from "../../constants";
import { motion, useReducedMotion } from "framer-motion";

const Experience = () => {
  const shouldReduceMotion = useReducedMotion();

  // Variants dasar
  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, opacity: 0, originY: 0 },
    show: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
    },
  };

  const cardVariants = (from = "left") => {
    const x = shouldReduceMotion ? 0 : from === "left" ? -40 : 40;
    return {
      hidden: { opacity: 0, x },
      show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
      hover: shouldReduceMotion
        ? {}
        : {
            y: -4,
            scale: 1.02,
            boxShadow:
              "0 0 24px 2px rgba(130,69,236,0.35), 0 10px 30px rgba(0,0,0,0.25)",
            transition: { type: "spring", stiffness: 260, damping: 16 },
          },
    };
  };

  return (
    <motion.section
      id="experience"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      aria-label="Experience timeline"
    >
      {/* Section Title */}
      <motion.div className="text-center mb-16" variants={sectionVariants}>
        <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A collection of my work experience and the roles I have taken in
          various organizations
        </p>
      </motion.div>

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Garis vertikal tetap ada */}
        <motion.div
          className="pointer-events-none absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-[3px] bg-white/60 h-full rounded z-0"
          variants={lineVariants}
        />

        {/* Experience items */}
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0;
          const side = isEven ? "left" : "right";

          return (
            <div
              key={experience.id}
              className={`relative flex flex-col sm:flex-row items-center mb-16 ${
                isEven ? "sm:justify-end" : "sm:justify-start"
              }`}
            >
              {/* Card */}
              <motion.div
                variants={cardVariants(side)}
                initial="hidden"
                whileInView="show"
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
                className={`relative z-10 w-full sm:max-w-md p-4 sm:p-8 rounded-2xl border border-white/10
                bg-gray-900/80 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.2)]
                ${isEven ? "sm:ml-0" : "sm:mr-0"} sm:ml-20 sm:mr-20 ml-8`}
              >
                {/* Header (logo + text) */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-md overflow-hidden shrink-0">
                    <img
                      src={experience.img}
                      alt={`${experience.company} logo`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        {experience.role}
                      </h3>
                      <h4 className="text-sm text-gray-300">
                        {experience.company}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {experience.date}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  className="mt-4 text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {experience.desc}
                </motion.p>

                {/* Skills */}
                <motion.div
                  className="mt-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <h5 className="font-medium text-white">Skills:</h5>
                  <ul className="flex flex-wrap mt-2">
                    {experience.skills.map((skill, i) => (
                      <motion.li
                        key={`${experience.id}-skill-${i}`}
                        className="bg-[#8245ec] text-gray-100 px-4 py-1 text-xs sm:text-sm rounded-lg mr-2 mb-2 border border-gray-400/40"
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Experience;
