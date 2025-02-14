"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { Solution } from "@/types/solution";
import { getStorageUrl } from "@/lib/api/solutions";
import { IconType } from "react-icons";
import {
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaHandHoldingHeart,
  FaChartLine,
  FaLightbulb
} from "react-icons/fa";
import LeadingAssumptionSection from "./LeadingAssumptionSection";

// Icon mapping
const iconComponents: Record<string, IconType> = {
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaHandHoldingHeart,
  FaChartLine,
  FaLightbulb
};

interface SolutionContentProps {
  initialData: Solution;
}

const SolutionContent: React.FC<SolutionContentProps> = ({ initialData }) => {
  // Interactive cursor effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Scroll progress hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect for hero section
  const heroScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Mouse movement handler
  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  // Resources
  const coverImageUrl = getStorageUrl(initialData.cover_image);
  const iconUrl = getStorageUrl(initialData.icon);
  const IconComponent = initialData.icon_name
    ? iconComponents[initialData.icon_name]
    : null;
  const iconSize = initialData.icon_size || 24;

  // Custom cursor variants
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          background: `radial-gradient(circle, ${initialData.bg_color_from}40 0%, transparent 70%)`
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="progress-bar fixed top-0 left-0 right-0 h-1 z-50"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${initialData.bg_color_from}, ${initialData.bg_color_to})`,
          transformOrigin: "0%"
        }}
      />

      {/* Hero Section */}
      <div className="relative flex flex-row h-screen items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroScrollY }}>
          <Image
            src={coverImageUrl}
            alt={initialData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            {IconComponent && (
              <div
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${initialData.bg_color_from}20` }}
              >
                <IconComponent
                  size={iconSize * 1.5}
                  style={{ color: initialData.bg_color_from }}
                />
              </div>
            )}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              {initialData.title}
            </h1>
          </motion.div>
        </motion.div>
      </div>

      <LeadingAssumptionSection initialData={initialData} />

      {/* Challenge Section */}
      <section className="relative min-h-screen bg-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${initialData.bg_color_from}20 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col container mx-auto px-4 py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-px max-w-[120px] mx-auto mb-8"
              style={{
                background: `linear-gradient(to right, transparent, ${initialData.bg_color_from}, transparent)`
              }}
            />
          </motion.div>

          {/* Main Challenge Content */}
          {initialData.challenge && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Challenge Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -left-4 top-0 w-1 h-full rounded"
                    style={{ background: initialData.bg_color_from }}
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />

                  <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    style={{
                      background: `linear-gradient(to right, ${initialData.bg_color_from}, ${initialData.bg_color_to})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "white"
                    }}
                  >
                    The Challenge
                  </motion.h2>
                  <h3
                    className="text-3xl font-bold mb-6"
                    style={{ color: initialData.bg_color_from }}
                  >
                    {initialData.challenge.title}
                  </h3>
                  <div className="prose prose-lg prose-invert">
                    <p className="text-xl leading-relaxed text-gray-300">
                      {initialData.challenge.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Interactive Visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Main Image Container */}
                <div className="relative h-[600px] rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                  <Image
                    src={
                      initialData.challenge.image
                        ? getStorageUrl(initialData.challenge.image)
                        : coverImageUrl
                    }
                    alt="Challenge Visual"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay Pattern */}
                  <div className="absolute inset-0 bg-black/20 z-10" />

                  {/* Interactive Elements */}
                  <div className="absolute inset-0 z-20">
                    <motion.div
                      className="absolute bottom-8 left-8 right-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {initialData.challenge.youtube_url && (
                        <Link
                          href={initialData.challenge.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-3 group/link"
                          onMouseEnter={() => setCursorVariant("hover")}
                          onMouseLeave={() => setCursorVariant("default")}
                        >
                          <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white/50 group-hover/link:border-white transition-colors">
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <svg
                                className="w-5 h-5 text-white fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </motion.div>
                          </div>
                          <span className="text-white/90 text-lg font-medium group-hover/link:text-white transition-colors">
                            Watch the Story
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full blur-3xl opacity-20 z-0"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ backgroundColor: initialData.bg_color_from }}
                />
              </motion.div>
            </div>
          )}
        </div>

        {/* Bottom Gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: `linear-gradient(to top, rgb(17, 24, 39), transparent)`
          }}
        />
      </section>

      {/* Solution Section */}
      <section className="relative min-h-screen bg-white overflow-hidden py-24">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              backgroundImage: `linear-gradient(45deg, ${initialData.bg_color_from}20 25%, transparent 25%, transparent 75%, ${initialData.bg_color_to}20 75%, ${initialData.bg_color_to}20), linear-gradient(45deg, ${initialData.bg_color_from}20 25%, transparent 25%, transparent 75%, ${initialData.bg_color_to}20 75%, ${initialData.bg_color_to}20)`,
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 30px 30px"
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col container mx-auto px-4">
          {/* Solution Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left Column - Icon/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`aspect-square rounded-2xl overflow-hidden`}
                style={{ backgroundColor: initialData.bg_color_from }}
              >
                {iconUrl && (
                  <div className="relative w-full h-full group">
                    <Image
                      src={iconUrl}
                      alt="Solution Icon"
                      fill
                      className="object-contain p-12 transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${initialData.bg_color_from}, ${initialData.bg_color_to})`
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column - Solution Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Solution Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <span
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-6"
                  style={{ backgroundColor: initialData.bg_color_from }}
                >
                  Our Solution
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  How We Fixed It
                </h2>
                <motion.div
                  className="h-1 w-20 mx-auto rounded-full"
                  style={{ backgroundColor: initialData.bg_color_from }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-gray-700">
                  {initialData.solution}
                </p>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 pt-8"
              >
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium transition-all transform hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(45deg, ${initialData.bg_color_from}, ${initialData.bg_color_to})`,
                    boxShadow: `0 10px 20px ${initialData.bg_color_from}20`
                  }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Support Our Mission
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Subtle Footer Gradient */}
      <div
        className="h-2 w-full"
        style={{
          background: `linear-gradient(to right, ${initialData.bg_color_from}, ${initialData.bg_color_to})`
        }}
      />
    </div>
  );
};

export default SolutionContent;
