"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

export const ImpactHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/50 via-gray-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05)_0%,transparent_100%)]" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000000_70%,transparent_100%)]" />
      </div>

      {/* Dynamic Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-1/4 top-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-1/4 bottom-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-16">
          {/* Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <motion.span
              className="inline-flex items-center px-3 py-1 rounded-full 
                         backdrop-blur-sm border border-sky-500/10 bg-sky-500/5"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-3 py-1 text-sm text-sky-400 tracking-wider uppercase">
                Media Challenge Initiative
              </span>
            </motion.span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <div className="text-white mb-4">Empowering Voices</div>
              <div className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-200 text-transparent bg-clip-text">
                  Shaping Stories
                </span>
                <motion.div
                  className="absolute -inset-x-2 bottom-2 h-3 bg-sky-500/10 skew-x-12"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-sky-200/70 max-w-2xl mx-auto"
            >
              Building Africa&apos;s next generation of storytellers
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-sky-500 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <span className="text-white font-medium">Join Our Mission</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full overflow-hidden
                         border border-sky-500/20 hover:border-sky-500/40
                         bg-sky-500/5 hover:bg-sky-500/10 transition-colors duration-300"
            >
              <div className="relative flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-5 h-5 text-sky-400" />
                </motion.div>
                <span className="text-white font-medium">Watch Our Story</span>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sky-400/60 text-sm">Scroll to explore</span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-sky-500/0 via-sky-500/50 to-sky-500/0"
              animate={{ scaleY: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
