// components/innovators/HeroSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

// Text Reveal Component
const TextReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0
}) => (
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

export const InnovatorsHeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: isMobile ? 0 : y }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/innovators-bg.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-gray-900/30 to-sky-900/20" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-sky-500/20 text-orange-500 bg-opacity-70 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                Our Innovators Network
              </span>
            </span>
          </motion.div>

          <div className="space-y-4">
            <TextReveal delay={0.2}>
              <span className="text-white block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Driving Change
              </span>
            </TextReveal>
            <TextReveal delay={0.4}>
              <span className="text-sky-500 block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Through Innovation
              </span>
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
