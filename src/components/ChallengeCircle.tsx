"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChallengeCircleProps {
  id: number;
  text: string;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  position: { x: number; y: number };
}

export const ChallengeCircle = ({
  id,
  text,
  isHovered,
  onHoverStart,
  onHoverEnd,
  position
}: ChallengeCircleProps) => {
  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <motion.g
        whileHover={{ scale: 1.1 }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        className="cursor-pointer"
      >
        <motion.circle
          r="55"
          className={cn(
            "transition-all duration-300",
            isHovered ? "fill-orange-500" : "fill-sky-500"
          )}
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: id * 0.1
          }}
        />
        <motion.circle
          r="55"
          fill="none"
          stroke="white"
          strokeWidth="2"
          className="opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: id * 0.1
          }}
        />
        {isHovered && (
          <motion.circle
            r="58"
            fill="none"
            stroke="#F97316"
            strokeWidth="6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="opacity-70"
          />
        )}
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="12"
          className="font-medium pointer-events-none"
        >
          {text.split(" ").map((word, i, arr) => (
            <tspan
              x="0"
              dy={i ? "1.2em" : `${-(arr.length - 1) * 0.6}em`}
              key={i}
            >
              {word}
            </tspan>
          ))}
        </text>
      </motion.g>
    </g>
  );
};