"use client";

import React from "react";
import { motion } from "framer-motion";

export const InfiniteScrollText: React.FC = () => {
  return (
    <div className="relative py-16 bg-gradient-to-r from-sky-50 via-white to-orange-50 overflow-hidden">
      <motion.div
        animate={{
          x: [0, -1000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
        className="flex whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-12 mx-12">
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">
              INNOVATE
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 text-orange-500"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15 6H9L12 2Z" />
              </svg>
            </motion.div>
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              CREATE
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
