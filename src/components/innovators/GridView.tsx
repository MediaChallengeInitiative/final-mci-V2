// components/GridView.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import InnovatorCard from "./InnovatorCard";
import { BaseInnovator } from "@/types/innovator";
import { Theme } from "@/interface/interface";
import { themes } from "@/config/themes";

interface GridViewProps {
  innovators: BaseInnovator[];
  isLoading?: boolean;
  selectedTheme?: string;
}

const GridView: React.FC<GridViewProps> = ({
  innovators,
  isLoading,
  selectedTheme = "default"
}) => {
  // Find the selected theme object or use default theme
  const theme = themes.find((t) => t.name === selectedTheme) || themes[0];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`${theme.bg} rounded-2xl overflow-hidden shadow-lg animate-pulse`}
          >
            <div className="aspect-video bg-gray-200" />
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
      <AnimatePresence mode="wait">
        {innovators.map((innovator, i) => (
          <motion.div
            key={innovator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            layout
          >
            <InnovatorCard innovator={innovator} index={i} theme={theme} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GridView;
