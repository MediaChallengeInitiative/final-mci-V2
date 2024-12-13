"use client";

import React from "react";
import { motion } from "framer-motion";

export const DecorativeShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="shape-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.1" />
          </linearGradient>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M0 20h40M20 0v40"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-sky-200 opacity-10"
            />
          </pattern>
        </defs>
  
        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />
  
        {/* Animated Circles */}
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {[1, 2, 3].map((i) => (
            <circle
              key={i}
              cx="500"
              cy="500"
              r={100 + i * 50}
              fill="none"
              stroke="url(#shape-gradient)"
              strokeWidth="2"
              className="opacity-30"
            />
          ))}
        </motion.g>
  
        {/* Floating Shapes */}
        <motion.path
          d="M100,100 L150,50 L200,100 Z"
          fill="url(#shape-gradient)"
          initial={{ y: 0 }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.rect
          x="800"
          y="200"
          width="40"
          height="40"
          fill="url(#shape-gradient)"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </svg>
    </div>
  );