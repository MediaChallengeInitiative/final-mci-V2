"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Theme } from "@/interface/interface";

interface BreadcrumbProps {
  title: string;
  subtitle?: string;
  currentTheme: Theme;
}

export default function Breadcrumb({
  title,
  subtitle,
  currentTheme
}: BreadcrumbProps) {
  // Helper function to extract color from theme gradient strings
  const extractColor = (gradientClass: string): string => {
    return gradientClass.split("-")[1] || "";
  };

  const getThemeGradient = (): string => {
    const from = extractColor(currentTheme.gradientFrom);
    const via = extractColor(currentTheme.gradientVia);
    const to = extractColor(currentTheme.gradientTo);
    return `from-${from} via-${via} to-${to}`;
  };

  const getOverlayStyle = (): string => {
    const overlayStyles: Record<string, string> = {
      green: "from-green-900/80 via-emerald-900/80 to-green-900/80",
      sky: "from-sky-900/80 via-blue-900/80 to-indigo-900/80",
      pink: "from-pink-900/80 via-rose-900/80 to-red-900/80",
      orange: "from-orange-900/80 via-amber-900/80 to-yellow-900/80",
      purple: "from-purple-900/80 via-violet-900/80 to-indigo-900/80",
      dark: "from-gray-900/90 via-gray-800/90 to-gray-900/90"
    };

    return (
      overlayStyles[currentTheme.name] ||
      "from-blue-900/80 via-purple-900/80 to-blue-900/80"
    );
  };

  return (
    <div className="relative lg:h-[320px] h-[200px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          className="w-full h-full object-cover"
          src="/assets/images/breadcrumb-bg.jpg"
          width={1920}
          height={1080}
          priority
          alt="breadcrumb background"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${getOverlayStyle()} transition-colors duration-500`}
        />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-full h-full bg-pattern animate-float" />
        </div>
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-between py-8 lg:py-12">
        <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative text-center"
          >
            <div className="absolute -left-4 -top-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
            <div className="absolute -right-4 -bottom-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />

            <h1
              className={`relative font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-${extractColor(currentTheme.gradientFrom)}-200
              pb-2 mb-4`}
            >
              {title}
            </h1>

            {subtitle && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white/90 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`h-1 w-24 mx-auto mt-6 bg-gradient-to-r ${getThemeGradient()} rounded-full`}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
