"use client";

import { Theme } from "@/interface/interface";
import { motion } from "framer-motion";

const CustomSerializer = ({
  blocks,
  fontSize,
  theme
}: {
  blocks: any[];
  fontSize: number;
  theme: Theme;
}) => {
  return (
    <div className="relative">
      {blocks.map((block, index) => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={index}
          className={`mb-6 ${theme.text} leading-relaxed`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {block.children.map((child: any, idx: number) => {
            const textColor =
              theme.name === "dark" ? "text-white/80" : theme.text;
            return (
              <span key={idx} className={textColor}>
                {child.text}
              </span>
            );
          })}
        </motion.p>
      ))}
    </div>
  );
};

export default CustomSerializer;
