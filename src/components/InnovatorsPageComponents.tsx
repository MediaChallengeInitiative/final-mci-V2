"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence
} from "framer-motion";
import {
  ArrowRight,
  MousePointer2,
  Sparkles,
  ChevronDown,
  Camera,
  ChevronRight
} from "lucide-react";

// New Creative SVG Components
export const HeroBackgroundSVG = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path
          d="M 30 0 L 0 0 0 30"
          fill="none"
          stroke="rgba(14, 165, 233, 0.1)"
          strokeWidth="1"
        />
      </pattern>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <rect width="100%" height="100%" fill="url(#fade)" />
  </svg>
);

// Enhanced Scrolling Text
export const InfiniteScrollText: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-16 bg-gradient-to-r from-sky-50 via-white to-orange-50">
      <div className="flex animate-infinite-scroll">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-12 whitespace-nowrap"
          >
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">
              INNOVATE
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12"
            >
              <svg viewBox="0 0 24 24" fill="none" className="text-orange-500">
                <path d="M12 2L15 6H9L12 2Z" fill="currentColor" />
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              CREATE
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 text-sky-500"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.85 8.15L21 9.31L16.5 14.14L17.85 21L12 17.77L6.15 21L7.5 14.14L3 9.31L9.15 8.15L12 2Z" />
              </svg>
            </motion.div>
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">
              TRANSFORM
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ParallaxSection: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0
      }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

//Hero Section

const TextReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0, rotate: 10 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  </div>
);

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: isMobile ? 0 : y }}
        className="absolute inset-0 w-full h-full"
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/innovators-bg.jpg')",
          }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-gray-900/30 to-sky-900/20" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Animated Gradient Accent */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
        />
      </div>
      

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-sky-500/20 text-orange-500 bg-opacity-70 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Innovators Spotlight</span>
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="mb-8 space-y-4">
            <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
              <TextReveal delay={0.2}>
                <span className="text-white block mb-4">
                  Shaping the Future of
                </span>
              </TextReveal>
              <TextReveal delay={0.4}>
                <span className="text-sky-500 block">
                  African Media
                </span>
              </TextReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
