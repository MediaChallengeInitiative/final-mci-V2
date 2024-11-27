"use client";

import { Theme } from "@/interface/interface";
import { motion } from "framer-motion";
import React from "react";

const ReadingProgress = ({ theme }: { theme: Theme }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <div
        className={`h-full bg-gradient-to-r ${theme.cardBg} transition-all duration-200`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
