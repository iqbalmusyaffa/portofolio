import React from 'react';

const Marquee = () => {
  const techs = [
    "REACT", "LARAVEL", "TAILWIND CSS", "NODE.JS", "EXPRESS", 
    "PHP", "MYSQL", "GIT", "GITHUB", "VITE", "FRAMER MOTION"
  ];

  return (
    <div className="relative flex overflow-x-hidden bg-[#0d0a21]/50 backdrop-blur-sm border-y border-purple-500/10 py-6 mt-8 md:mt-16 w-full group z-10">
      <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
        {[...techs, ...techs, ...techs].map((tech, index) => (
          <span key={index} className="mx-6 text-2xl md:text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest flex items-center opacity-80 hover:opacity-100 transition-opacity cursor-default">
            {tech}
            <span className="mx-8 text-[#8245ec] text-lg opacity-50">✦</span>
          </span>
        ))}
      </div>
      <div className="absolute top-6 animate-marquee2 whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
        {[...techs, ...techs, ...techs].map((tech, index) => (
          <span key={index} className="mx-6 text-2xl md:text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest flex items-center opacity-80 hover:opacity-100 transition-opacity cursor-default">
            {tech}
            <span className="mx-8 text-[#8245ec] text-lg opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
