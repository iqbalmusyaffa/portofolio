// src/components/Skills/Skills.jsx
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { SkillsInfo } from "../../constants";

const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const gridStagger = {
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20, mass: 0.6 },
  },
};

const card = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-24 px-[10vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom"
      aria-labelledby="skills-title"
    >
      {/* Section Title */}
      <motion.div
        className="text-center mb-10 md:mb-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
      >
        <h2
          id="skills-title"
          className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
        >
          SKILLS
        </h2>
        <div
          className="w-24 h-1 bg-[#8245ec] mx-auto mt-3 rounded-full"
          aria-hidden="true"
        />
        <p className="text-gray-400 mt-4 text-base sm:text-lg font-medium max-w-3xl mx-auto">
          A collection of my technical skills and expertise honed through
          various projects and experiences
        </p>
      </motion.div>

      {/* Skill Categories (Bento Grid) */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridStagger}
      >
        {SkillsInfo.map((category, index) => {
          // Menentukan posisi Bento Grid berdasarkan index
          let gridClass = "";
          if (index === 0) gridClass = "md:col-span-2 md:row-span-2"; // Frontend
          else if (index === 1) gridClass = "md:col-span-1 md:row-span-1"; // Backend
          else if (index === 2) gridClass = "md:col-span-1 md:row-span-1"; // Languages
          else if (index === 3) gridClass = "md:col-span-3 md:row-span-1"; // Tools

          return (
            <motion.article
              key={category.title}
              variants={card}
              className={`
                bg-gray-900/40 backdrop-blur-xl px-5 sm:px-8 py-6 sm:py-7
                w-full rounded-3xl border border-white/10
                shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                transition-all duration-500
                hover:bg-gray-900/60 hover:border-purple-500/30
                focus-within:ring-2 focus-within:ring-[#8245ec]/60
                flex flex-col justify-start
                ${gridClass}
              `}
            >
              <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white mb-6 text-center md:text-left">
                {category.title}
              </h3>

              {/* Grid for individual skills */}
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                scale={1}
                transitionSpeed={1000}
                gyroscope
                className="will-change-transform flex-grow"
              >
                <motion.div
                  className="flex flex-wrap gap-3 justify-center md:justify-start"
                  variants={gridStagger}
                >
                  {category.skills.map((skill) => (
                    <motion.button
                      key={skill.name}
                      type="button"
                      variants={item}
                      whileHover={{
                        y: -3,
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400, damping: 10 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        group flex items-center justify-center gap-2
                        bg-white/5 border border-white/10
                        rounded-full py-2 px-4
                        text-center outline-none
                        hover:bg-white/10 hover:border-purple-500/50
                        hover:shadow-[0_0_15px_rgba(130,69,236,0.3)]
                        focus-visible:ring-2 focus-visible:ring-[#8245ec]/60
                        transition-all duration-300
                      "
                      aria-label={skill.name}
                    >
                      <img
                        src={skill.logo}
                        alt=""
                        aria-hidden="true"
                        className="w-5 h-5 sm:w-6 sm:h-6 opacity-80 group-hover:opacity-100 drop-shadow-md"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                        {skill.name}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              </Tilt>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
