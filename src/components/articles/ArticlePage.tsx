// components/articles/ArticlePage.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Theme } from "@/interface/interface";
import { themes } from "@/config/themes";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  ChevronLeft,
  Bookmark,
  ThumbsUp,
  Eye
} from "lucide-react";
import ColorSwitcher from "./ColorSwitcher";

interface ArticlePageProps {
  article: {
    title: string;
    content: string;
    image_url: string | null;
    category: {
      name: string;
      slug: string;
    };
    published_at: string;
  };
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [showProgress, setShowProgress] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100); // Simulated view count

  // Calculate estimated reading time
  const estimatedReadTime = Math.ceil(
    article.content.split(/\s+/).length / 200
  );

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      setShowProgress(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content.slice(0, 100) + "...",
          url: window.location.href
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  }, [article]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
    >
      {/* Progress Bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50"
          >
            <motion.div
              className="h-full bg-blue-500"
              style={{ width: `${readingProgress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded-full shadow-lg px-6 py-3 z-40">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center space-x-2 ${
              isLiked ? "text-red-500" : "text-gray-600"
            }`}
          >
            <ThumbsUp size={20} />
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center space-x-2 ${
              isBookmarked ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <Bookmark size={20} />
          </button>
          <button onClick={handleShare} className="text-gray-600">
            <Share2 size={20} />
          </button>
          <div className="text-gray-600 flex items-center space-x-2">
            <Eye size={20} />
            <span>{viewCount}</span>
          </div>
        </div>
      </div>

      <ColorSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        isColorMenuOpen={isColorMenuOpen}
        setIsColorMenuOpen={setIsColorMenuOpen}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/press/articles"
          className={`inline-flex items-center space-x-2 mb-8 text-sm ${currentTheme.text} hover:opacity-80 transition-opacity`}
        >
          <ChevronLeft size={20} />
          <span>Back to Articles</span>
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-6"
          >
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${currentTheme.text} leading-tight`}
            >
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={18} />
                <time dateTime={article.published_at}>
                  {new Date(article.published_at).toLocaleDateString()}
                </time>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Tag size={18} />
                <span>{article.category.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock size={18} />
                <span>{estimatedReadTime} min read</span>
              </div>
            </div>
          </motion.div>

          {/* Article Image */}
          {article.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>
          )}

          {/* Reading Controls */}
          <div className="sticky top-4 z-30 flex justify-end space-x-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-2">
            <button
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 14))}
              className={`p-2 rounded-lg ${currentTheme.text} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
              aria-label="Decrease font size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize((prev) => Math.min(prev + 2, 24))}
              className={`p-2 rounded-lg ${currentTheme.text} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="prose prose-lg mx-auto"
          >
            {article.content.split("\n\n").map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`mb-6 ${currentTheme.text} leading-relaxed`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.article>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlePage;
