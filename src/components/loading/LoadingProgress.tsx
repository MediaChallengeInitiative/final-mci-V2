// src/components/loading/LoadingProgress.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingProgressProps {
  progress: number;
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({
  progress
}) => {
  return (
    <div className="relative w-64 sm:w-80 h-1 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-400"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-sky-400/30 blur-sm"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
