import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true agar tidak flash di awal

  useEffect(() => {
    // Check if it's a touch device
    const checkIsMobile = () => window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(checkIsMobile());

    if (checkIsMobile()) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over a clickable element
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isMobile) return null; // Don't render on mobile

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(130, 69, 236, 1)",
      boxShadow: "0 0 15px rgba(130, 69, 236, 0.6)",
      transition: {
        type: "tween",
        duration: 0.05,
        ease: "linear"
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(130, 69, 236, 0.2)",
      border: "1px solid rgba(130, 69, 236, 0.8)",
      boxShadow: "0 0 20px rgba(130, 69, 236, 0.5)",
      transition: {
        type: "tween",
        duration: 0.15,
        ease: "easeOut"
      }
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
      variants={variants}
      animate={isHovering ? "hover" : "default"}
    />
  );
}
