"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Theme } from "@/interface/interface";

interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
  currentTheme: Theme;
}

export const FontSizeControls = memo(function FontSizeControls({
  onIncrease,
  onDecrease,
  currentTheme
}: FontSizeControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-sm rounded-full p-2 space-x-2 shadow-xl"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onIncrease}
        className={`p-2 hover:bg-white/10 rounded-full transition-colors duration-200 ${currentTheme.text}`}
      >
        A+
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDecrease}
        className={`p-2 hover:bg-white/10 rounded-full transition-colors duration-200 ${currentTheme.text}`}
      >
        A-
      </motion.button>
    </motion.div>
  );
});
