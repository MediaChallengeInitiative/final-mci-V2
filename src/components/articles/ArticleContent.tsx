"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Theme } from "@/interface/interface";

interface ArticleContentProps {
  blocks: any[];
  fontSize: number;
  currentTheme: Theme;
}

export const ArticleContent = memo(function ArticleContent({
  blocks,
  fontSize,
  currentTheme
}: ArticleContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="prose prose-lg mx-auto"
    >
      {blocks.map((block, index) => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={index}
          className={`mb-6 ${currentTheme.text} leading-relaxed`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {block.children.map((child: any, idx: number) => (
            <React.Fragment key={idx}>{child.text}</React.Fragment>
          ))}
        </motion.p>
      ))}
    </motion.article>
  );
});
