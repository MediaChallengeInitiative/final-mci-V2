"use client";

import React from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import { Solution } from "@/types/solution";
import SolutionCard from "./SolutionCard";

interface SolutionsClientPageProps {
  initialSolutions: Solution[];
}

export default function SolutionsClientPage({
  initialSolutions
}: SolutionsClientPageProps) {
  const BackgroundElements = () => (
    <>
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900" />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-10"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </>
  );

  if (!initialSolutions) {
    return (
      <section className="relative h-auto lg:min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <BackgroundElements />
        <div className="relative text-center text-white text-lg sm:text-xl md:text-2xl">
          Loading solutions...
        </div>
      </section>
    );
  }

  if (initialSolutions.length === 0) {
    return (
      <section className="relative h-auto lg:min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <BackgroundElements />
        <div className="relative text-center text-white text-lg sm:text-xl md:text-2xl">
          No solutions available
        </div>
      </section>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative h-auto lg:min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 pt-6 sm:pt-8 md:pt-16 lg:pt-16 xl:pt-20 overflow-hidden">
        <BackgroundElements />

        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Our 6.S Model
              <motion.div
                className="h-1 w-24 sm:w-32 bg-gradient-to-r from-sky-500 to-blue-500 mx-auto mt-4 sm:mt-6 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h2>
            <p
              className="mx-auto text-center max-w-6xl text-gray-300 
                        text-base xs:text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl
                        leading-relaxed sm:leading-relaxed"
            >
              A holistic approach addressing systemic media crises
            </p>
          </motion.div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {initialSolutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
