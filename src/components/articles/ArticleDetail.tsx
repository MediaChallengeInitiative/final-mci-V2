"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ThumbsUp,
  Bookmark,
  Eye,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react";
import { Article } from "@/types/article";
import { formatContent } from "@/utils/contentFormatter";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100);
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

  const handleShare = async (platform?: string) => {
    if (platform) {
      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          article.title
        )}&url=${encodeURIComponent(window.location.href)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          window.location.href
        )}&title=${encodeURIComponent(article.title)}`
      };
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
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
              className="h-full bg-blue-600"
              style={{ width: `${readingProgress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-[90%] max-w-[1400px] mx-auto pt-10">
        {/* Back Navigation */}
        <div className="py-6">
          <Link
            href="/press/articles"
            className="group inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium 
    bg-gray-900 hover:bg-gray-900 text-orange-500 hover:text-white
    shadow-sm hover:shadow-md backdrop-blur-sm
    transition-all duration-300 transform hover:-translate-x-1"
          >
            <ChevronLeft
              size={18}
              className="mr-2 transition-transform duration-300 transform group-hover:-translate-x-1"
            />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-base font-medium px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full">
              {article.category.name}
            </span>
            <div className="flex items-center text-gray-500 text-base">
              <Calendar className="w-5 h-5 mr-1" />
              <time dateTime={article.published_at}>
                {new Date(article.published_at).toLocaleDateString()}
              </time>
            </div>
            <div className="flex items-center text-gray-500 text-base">
              <Clock className="w-5 h-5 mr-1" />
              <span>{estimatedReadTime} min read</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>
        </header>

        {/* Featured Image */}
        {article.image_url && (
          <div className="mb-12">
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative">
          {/* Side Social Share */}
          <div className="fixed left-4 top-1/3 hidden xl:flex flex-col space-y-4">
            <button
              onClick={() => handleShare("twitter")}
              className="p-2 bg-white hover:bg-gray-50 rounded-full shadow-sm"
            >
              <Twitter className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="p-2 bg-white hover:bg-gray-50 rounded-full shadow-sm"
            >
              <Facebook className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-2 bg-white hover:bg-gray-50 rounded-full shadow-sm"
            >
              <Linkedin className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-xl lg:prose-2xl max-w-none pb-10 mx-auto"
            style={{
              maxWidth: "100%",
              fontSize: "1.25rem",
              lineHeight: "1.2"
            }}
            dangerouslySetInnerHTML={{
              __html: formatContent(article.content)
            }}
          />

          {/* Footer Actions */}
          {/* <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 z-40">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`transform transition-all ${
                  isLiked
                    ? "text-red-500 scale-110"
                    : "text-gray-600 hover:scale-105"
                }`}
              >
                <ThumbsUp className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`transform transition-all ${
                  isBookmarked
                    ? "text-blue-500 scale-110"
                    : "text-gray-600 hover:scale-105"
                }`}
              >
                <Bookmark className="w-6 h-6" />
              </button>
              <div className="flex items-center text-gray-600">
                <Eye className="w-6 h-6 mr-2" />
                <span className="text-lg">{viewCount}</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
