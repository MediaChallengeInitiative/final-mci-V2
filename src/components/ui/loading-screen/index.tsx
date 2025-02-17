// components/ui/loading-screen/index.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center"
    >
      <div className="relative">
        {/* Main loader animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="flex flex-col items-center"
        >
          {/* Logo or brand element */}
          <div className="mb-8 relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 rounded-full border-2 border-sky-500 flex items-center justify-center"
            >
              <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
            </motion.div>

            {/* Pulsing background effect */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-sky-500/20 rounded-full -z-10 blur-xl"
            />
          </div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              Loading Experience
            </h2>
            <p className="text-sky-200 text-sm">
              Please wait while we prepare the content
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-0.5 bg-sky-500/50 rounded-full mt-8 max-w-[200px] w-full"
          >
            <motion.div
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-full w-1/2 bg-sky-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-purple-500/10" />
    </motion.div>
  );
};

// Optional: Create a smaller version for inline loading
export const InlineLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
      <span className="ml-2 text-sm text-sky-200">Loading...</span>
    </div>
  );
};
