// src/components/loading/IconRotator.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IconRotatorProps {
  icons: LucideIcon[];
  currentIconIndex: number;
  CurrentIcon: LucideIcon;
}

export const IconRotator: React.FC<IconRotatorProps> = ({
  icons,
  currentIconIndex,
  CurrentIcon
}) => {
  return (
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentIconIndex === index ? 1 : 0,
            scale: currentIconIndex === index ? 1 : 0.8
          }}
          style={{
            transform: `rotate(${
              index * (360 / icons.length)
            }deg) translateY(-40px)`
          }}
        >
          <Icon className="w-6 h-6 text-sky-500" strokeWidth={1.5} />
        </motion.div>
      ))}

      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <CurrentIcon className="w-12 h-12 text-sky-500" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
};
