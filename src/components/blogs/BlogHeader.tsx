"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { CalendarDays, User } from "lucide-react";
import { Theme } from "@/interface/interface";

interface BlogHeaderProps {
  title: string;
  publishedAt: string | Date;
  authorName?: string;
  currentTheme: Theme;
}

export const BlogHeader = memo(function BlogHeader({
  title,
  publishedAt,
  authorName,
  currentTheme
}: BlogHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-bold ${currentTheme.text} leading-tight`}
      >
        {title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-sky-500" />
          <span className={currentTheme.text}>
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-sky-500" />
          <span className={currentTheme.text}>{authorName}</span>
        </div>
      </motion.div>
    </div>
  );
});
