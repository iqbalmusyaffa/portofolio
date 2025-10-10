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

      {/* Skill Categories */}
      <motion.div
        className="flex flex-wrap gap-4 lg:gap-6 justify-between"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridStagger}
      >
        {SkillsInfo.map((category) => (
          <motion.article
            key={category.title}
            variants={card}
            className="
              bg-gray-900/80 backdrop-blur-md px-5 sm:px-8 py-6 sm:py-7
              w-full sm:w-[48%] rounded-2xl border border-white/10
              shadow-[0_0_18px_1px_rgba(130,69,236,0.25)]
              transition-transform
              focus-within:ring-2 focus-within:ring-[#8245ec]/60
            "
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-5 text-center">
              {category.title}
            </h3>

            {/* Tilt + Grid */}
            <Tilt
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              perspective={900}
              scale={1.02}
              transitionSpeed={900}
              gyroscope
              glareEnable
              glareMaxOpacity={0.12}
              glareBorderRadius="1rem"
              className="will-change-transform"
            >
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3"
                variants={gridStagger}
              >
                {category.skills.map((skill) => (
                  <motion.button
                    key={skill.name}
                    type="button"
                    variants={item}
                    whileHover={{
                      y: -2,
                      scale: 1.03,
                      transition: { type: "spring", stiffness: 350, damping: 18 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      group flex items-center justify-center gap-2
                      bg-transparent border border-gray-700/80
                      rounded-3xl py-2.5 px-2.5 sm:py-2 sm:px-3
                      text-center outline-none
                      hover:border-[#8245ec]/70
                      hover:shadow-[0_0_0_3px_rgba(130,69,236,0.15)]
                      focus-visible:ring-2 focus-visible:ring-[#8245ec]/60
                      transition-all
                    "
                    aria-label={skill.name}
                  >
                    <img
                      src={skill.logo}
                      alt=""
                      aria-hidden="true"
                      className="w-6 h-6 sm:w-7 sm:h-7 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white">
                      {skill.name}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </Tilt>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
