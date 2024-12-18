"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  overlay?: boolean;
  customText?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = true,
  overlay = true,
  customText
}) => {
  const content = (
    /* From Uiverse.io by gsperandio */
    <div className="loop cubes">
      <div className="item cubes"></div>
      <div className="item cubes"></div>
      <div className="item cubes"></div>
      <div className="item cubes"></div>
      <div className="item cubes"></div>
      <div className="item cubes"></div>
    </div>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        overlay ? "bg-black/50 backdrop-blur-sm" : ""
      }`}
    >
      {content}
    </motion.div>
  );
};
