import React, { memo } from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark } from "lucide-react";

interface SocialButtonsProps {
  liked: boolean;
  bookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
}

export const SocialButtons = memo(function SocialButtons({
  liked,
  bookmarked,
  onLike,
  onBookmark
}: SocialButtonsProps) {
  return (
    <div className="fixed left-4 lg:flex hidden flex-col gap-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full py-4 px-2 shadow-xl">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLike}
        className={`p-3 rounded-full transition-colors duration-300 ${
          liked
            ? "text-red-500 bg-red-50"
            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
        }`}
      >
        <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBookmark}
        className={`p-3 rounded-full transition-colors duration-300 ${
          bookmarked
            ? "text-sky-500 bg-sky-50"
            : "text-gray-400 hover:text-sky-500 hover:bg-sky-50"
        }`}
      >
        <Bookmark
          className="w-5 h-5"
          fill={bookmarked ? "currentColor" : "none"}
        />
      </motion.button>
    </div>
  );
});
