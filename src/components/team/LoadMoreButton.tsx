"use client";

import React from "react";
import { motion } from "framer-motion";
import { Theme } from "@/interface/interface";

interface LoadMoreButtonProps {
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  theme: Theme;
  remainingCount: number;
}

const LoadMoreButton = ({
  loading,
  onLoadMore,
  hasMore,
  theme,
  remainingCount
}: LoadMoreButtonProps) => {
  if (!hasMore || remainingCount <= 0) return null;

  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold tracking-wide text-white transition-all duration-500 ease-in-out transform bg-gradient-to-r from-sky-500 to-sky-600 rounded-full hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105"
      >
        <span className="relative flex items-center space-x-3">
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>Load {Math.min(4, remainingCount)} More</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </span>
      </button>
      <p className="mt-3 text-sm text-gray-500">
        {remainingCount} more {remainingCount === 1 ? "member" : "members"} to
        show
      </p>
    </motion.div>
  );
};

export default LoadMoreButton;
