"use client";

import { Theme } from "@/interface/interface";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const ReadingProgress = ({ theme }: { theme: Theme }) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateProgress = () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(Math.min(Math.max(progress, 0), 100)); // Clamp between 0-100
      });
    };

    // Initial progress calculation
    updateProgress();

    // Add scroll listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Don't render anything during SSR or before hydration
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${theme.cardBg} transition-all`}
        style={{
          width: `${progress}%`,
          willChange: "width",
          transform: "translateZ(0)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

export default React.memo(ReadingProgress);

// "use client";

// import { Theme } from "@/interface/interface";
// import { motion } from "framer-motion";
// import React from "react";

// const ReadingProgress = ({ theme }: { theme: Theme }) => {
//   const [progress, setProgress] = React.useState(0);

//   React.useEffect(() => {
//     const updateProgress = () => {
//       const scrollTop = window.scrollY;
//       const docHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (scrollTop / docHeight) * 100;
//       setProgress(progress);
//     };

//     window.addEventListener("scroll", updateProgress);
//     return () => window.removeEventListener("scroll", updateProgress);
//   }, []);

//   return (
//     <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
//       <div
//         className={`h-full bg-gradient-to-r ${theme.cardBg} transition-all duration-200`}
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );
// };

// export default ReadingProgress;
