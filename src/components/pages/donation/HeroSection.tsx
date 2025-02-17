// components/pages/donation/HeroSection.tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { HandHeart, Newspaper, Users } from "lucide-react";

const WaveOverlay = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden">
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="relative block w-full h-24"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        className="fill-sky-900/10"
      />
    </svg>
  </div>
);

const StatsCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  hoverBorderColor: string;
}> = ({ icon, value, label, hoverBorderColor }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-${hoverBorderColor} transition-all duration-300`}
  >
    <div className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3">{icon}</div>
    <h3 className="text-lg sm:text-xl font-semibold text-white">{value}</h3>
    <p className="text-sm sm:text-base text-sky-200">{label}</p>
  </motion.div>
);

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/assets/images/hero/hero-1.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-sky-900/50 to-slate-950/90" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2 border border-sky-500/20 rounded-full bg-sky-500/10 backdrop-blur-sm"
          >
            <span className="text-sm sm:text-base text-sky-300 font-medium">
              A Humane Media That Shapes The Future
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight font-display"
          >
            Join the Movement,
            <span className="block text-[#f6931d]">Fund the Change</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white mx-auto font-light leading-relaxed italic px-4"
          >
            Support the next generation of journalists, content creators, and
            story leaders. Your investment will empower a new era of informed
            and engaged citizens.
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 px-4"
          >
            <StatsCard
              icon={<HandHeart className="text-sky-400" />}
              value="3000+"
              label="Journalists Trained"
              hoverBorderColor="sky-500/50"
            />
            <StatsCard
              icon={<Newspaper className="text-orange-400" />}
              value="30+"
              label="African Countries"
              hoverBorderColor="[#f6931d]/50"
            />
            <StatsCard
              icon={<Users className="text-sky-400" />}
              value="12+"
              label="Years Experience"
              hoverBorderColor="sky-500/50"
            />
          </motion.div>
        </motion.div>
      </div>

      <WaveOverlay />
    </section>
  );
};

export default HeroSection;
