import React from 'react';
import { motion } from 'framer-motion';

const BlurBlob = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px]"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0) 60%)"
        }}
      />
      <motion.div
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, 100, 50, -50, 0],
          scale: [1, 0.8, 1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[30%] right-[5%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px]"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(79, 70, 229, 0) 60%)"
        }}
      />
      <motion.div
        animate={{
          x: [0, 50, 100, 50, 0],
          y: [0, -100, 0, 100, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[5%] left-[25%] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px]"
        style={{
          background: "radial-gradient(circle, rgba(130, 69, 236, 0.15) 0%, rgba(130, 69, 236, 0) 60%)"
        }}
      />
    </div>
  );
};

export default BlurBlob;
