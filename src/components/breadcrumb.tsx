"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect for background image
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const backgroundScale = useTransform(scrollY, [0, 500], [1.1, 1.3]);
  const opacityRange = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    return "from-sky-500/30 via-sky-700/50 to-sky-900/80";
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-[200px] h-[40vh] max-h-[480px] w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          y: backgroundY,
          scale: backgroundScale,
          opacity: opacityRange
        }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          className="w-full h-full object-cover scale-110"
          src="/assets/images/breadcrumb-bg.jpg"
          width={1920}
          height={1080}
          priority
          alt="breadcrumb background"
        />

        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${getOverlayStyle()} transition-colors duration-500`}
        />

        {/* Animated Patterns */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-400 via-transparent to-transparent"
          />
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ opacity: opacityRange }}
          className="w-full max-w-7xl mx-auto text-center"
        >
          {/* Decorative Frame */}
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-6 -top-6 w-12 h-12"
            >
              <div className="w-full h-full border-l-2 border-t-2 border-sky-300/30 rounded-tl-xl" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -right-6 -bottom-6 w-12 h-12"
            >
              <div className="w-full h-full border-r-2 border-b-2 border-sky-300/30 rounded-br-xl" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
            >
              <span className="bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6 text-sky-100/90 text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="relative mt-8"
          >
            <div className="absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 rounded-full blur-sm" />
            <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
