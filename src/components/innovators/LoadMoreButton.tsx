// components/innovators/LoadMoreButton.tsx
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Theme } from "@/interface/interface";

interface LoadMoreButtonProps {
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  theme: Theme;
  remainingCount: number;
}

export const LoadMoreButton = ({
  loading,
  onLoadMore,
  hasMore,
  theme,
  remainingCount
}: LoadMoreButtonProps) => {
  if (!hasMore) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full flex flex-col items-center gap-4"
    >
      <span className="text-gray-500 text-sm">
        {remainingCount} more innovators to load
      </span>
      <button
        onClick={onLoadMore}
        disabled={loading}
        className={`
          group relative px-8 py-4 rounded-xl
          bg-gradient-to-r ${theme.cardBg}
          hover:shadow-xl transform hover:-translate-y-1
          transition-all duration-300 disabled:opacity-70
          disabled:hover:transform-none
          min-w-[200px] w-full sm:w-auto
        `}
      >
        <div className="relative flex items-center justify-center gap-3">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span className="text-white font-medium">
                Loading Innovators...
              </span>
            </>
          ) : (
            <>
              <span className="text-white font-medium">
                Load More Innovators
              </span>
              <motion.svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{
                  y: [0, 4, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              </motion.svg>
            </>
          )}
        </div>
        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </motion.div>
  );
};
