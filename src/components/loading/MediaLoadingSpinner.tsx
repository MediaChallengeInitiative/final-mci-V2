// src/components/loading/MediaLoadingSpinner.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Radio, Newspaper, Mic2, Play, Tv } from "lucide-react";
import { BackgroundEffects } from "./BackgroundEffects";
import { IconRotator } from "./IconRotator";
import { LoadingProgress } from "./LoadingProgress";

interface MediaLoadingSpinnerProps {
  customText?: string;
}

export const MediaLoadingSpinner: React.FC<MediaLoadingSpinnerProps> = ({
  customText
}) => {
  const [progress, setProgress] = useState(0);
  const icons = [Camera, Radio, Newspaper, Mic2, Tv, Play];
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = icons[currentIconIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative flex flex-col items-center gap-8 p-8"
      >
        <IconRotator
          icons={icons}
          currentIconIndex={currentIconIndex}
          CurrentIcon={CurrentIcon}
        />

        <LoadingProgress progress={progress} />

        <div className="relative text-center">
          <motion.p
            className="text-sky-500 text-sm sm:text-base font-medium mb-2"
            animate={{
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {customText || "Loading Media Content"}
          </motion.p>
          <p className="text-gray-400 text-xs sm:text-sm">
            {progress}% Complete
          </p>
        </div>

        <BackgroundEffects />
      </motion.div>
    </div>
  );
};
