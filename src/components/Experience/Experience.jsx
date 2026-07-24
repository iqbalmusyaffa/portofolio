import React from "react";
import { experiences } from "../../constants";
import { motion, useReducedMotion } from "framer-motion";

const ExperienceCard = ({ experience, side, isEven, shouldReduceMotion, cardVariants }) => {
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
      className={`relative flex flex-col sm:flex-row items-center mb-16 ${
        isEven ? "sm:justify-end" : "sm:justify-start"
      }`}
    >
      <motion.div
        variants={cardVariants(side)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-10 w-full sm:max-w-md p-6 sm:p-8 rounded-3xl border border-white/10
        bg-[#0a0a1a]/80 backdrop-blur-xl shadow-2xl overflow-hidden group cursor-default transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30
        ${isEven ? "sm:ml-0" : "sm:mr-0"} sm:ml-20 sm:mr-20 ml-8`}
      >
        {/* Spotlight Effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            opacity: isHovered && !shouldReduceMotion ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.15), transparent 40%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header (logo + text) */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <img
                src={experience.img}
                alt={`${experience.company} logo`}
                className="w-full h-full object-cover p-1"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {experience.role}
                </h3>
                <h4 className="text-sm font-medium text-gray-300 mt-1">
                  {experience.company}
                </h4>
              </div>
              <p className="text-xs font-semibold text-purple-400/80 mt-2 bg-purple-500/10 w-fit px-2 py-0.5 rounded-full ring-1 ring-purple-500/20">
                {experience.date}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-gray-400 text-sm sm:text-base leading-relaxed">
            {experience.desc}
          </p>

          {/* Skills */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, i) => (
                <span
                  key={`${experience.id}-skill-${i}`}
                  className="bg-purple-500/10 text-purple-300 font-medium px-3 py-1 text-xs sm:text-sm rounded-full ring-1 ring-purple-500/20 transition-colors group-hover:bg-purple-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">EXPERIENCE</h2>
        <div className="w-24 md:w-32 h-1 bg-[#8245ec] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(130,69,236,0.6)]"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-3xl mx-auto font-medium">
          Perjalanan karier dan pengalaman profesional saya dalam membangun solusi berbasis teknologi.
        </p>
      </motion.div>

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Garis vertikal tetap ada */}
        <motion.div
          className="pointer-events-none absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-[3px] bg-gradient-to-b from-purple-500/20 via-purple-500/80 to-purple-500/20 h-full rounded z-0"
          variants={lineVariants}
        />

        {/* Experience items */}
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0;
          const side = isEven ? "left" : "right";

          return (
            <ExperienceCard 
              key={experience.id} 
              experience={experience} 
              side={side} 
              isEven={isEven} 
              shouldReduceMotion={shouldReduceMotion} 
              cardVariants={cardVariants} 
            />
          );
        })}
      </div>
    </motion.section>
  );
};

export default Experience;
