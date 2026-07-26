import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth Apple-like easing
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030014] overflow-hidden"
        >
          <div className="flex flex-col items-center gap-6 relative">
            {/* Spinning Rings */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/5 rounded-full absolute" />
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent border-l-transparent rounded-full animate-spin absolute" />
              <div className="w-12 h-12 border-4 border-cyan-400 border-b-transparent border-r-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse] absolute" />
            </div>

            {/* Glowing Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-12"
            >
              <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase flex items-center gap-2 text-white/90 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Loading
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1, duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  .
                </motion.span>
              </h1>
            </motion.div>
          </div>
          
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
