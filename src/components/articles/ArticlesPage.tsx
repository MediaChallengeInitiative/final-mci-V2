"use client";

import React, {
  useState,
  useCallback,
  useTransition,
  useMemo,
  useEffect
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleData, Theme } from "@/interface/interface";
import Breadcrumb from "@/components/breadcrumb";
import ArticleCard from "./ArticleCard";
import ColorSwitcher from "@/components/staff/ColorSwitcher";
import { themes } from "@/config/themes";
import { getAllArticles } from "@/utils/get-all-articles";

interface ArticlesPageClientProps {
  initialArticles: ArticleData[];
  totalArticles: number;
  page: number;
  per_page: number;
}

const LoadingSpinner = () => (
  <>
    <svg
      className="animate-spin h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
);

export const ArticlesPage: React.FC<ArticlesPageClientProps> = ({
  initialArticles,
  totalArticles,
  page,
  per_page
}) => {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<ArticleData[]>(initialArticles);
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = useCallback((theme: Theme) => {
    startTransition(() => {
      setCurrentTheme(theme);
    });
  }, []);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const start = (nextPage - 1) * per_page;
      const newArticles = await getAllArticles(start, start + per_page);
      setArticles((prev) => [...prev, ...newArticles]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Failed to load more articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const memoizedArticleCards = useMemo(
    () =>
      articles.map((article, i) => (
        <ArticleCard
          key={`${article._id}-${i}`}
          article={article}
          theme={currentTheme}
          index={i}
        />
      )),
    [articles, currentTheme]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <div className="w-full py-8 md:py-12 lg:py-16">
          <div className="container grid gap-12 px-4 md:px-6">
            <div className="animate-pulse bg-gray-200 h-8 w-48 mx-auto rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
    >
      <ColorSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={handleThemeChange}
        isColorMenuOpen={isColorMenuOpen}
        setIsColorMenuOpen={setIsColorMenuOpen}
      />

      <section className="w-full py-8 md:py-12 lg:py-16">
        <Breadcrumb
          title="Articles"
          subtitle="Discover our latest insights and stories"
          currentTheme={currentTheme}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`theme-${currentTheme.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container grid gap-12 px-4 md:px-6"
          >
            {/* Header Section */}
            <div className="text-center">
              <h2
                className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-${currentTheme.gradientFrom} to-${currentTheme.gradientTo} bg-clip-text text-transparent mb-4`}
              >
                Latest Articles
              </h2>
              <div
                className={`h-1 w-24 mx-auto bg-gradient-to-r from-${currentTheme.gradientFrom} to-${currentTheme.gradientTo} rounded-full`}
              />
            </div>

            {/* Articles Grid */}
            <div
              key="articles-grid"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max"
            >
              {memoizedArticleCards}
            </div>

            {/* Load More Button */}
            {articles.length < totalArticles && (
              <div key="load-more" className="flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className={`
                    group relative px-8 py-4 rounded-xl
                    bg-gradient-to-r ${currentTheme.cardBg}
                    hover:shadow-lg transform hover:-translate-y-1
                    transition-all duration-300 disabled:opacity-70
                  `}
                  aria-label={
                    loading ? "Loading more articles..." : "Show more articles"
                  }
                >
                  <span className="relative z-10 flex items-center space-x-3 text-white">
                    {loading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <span>Show More Articles</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default React.memo(ArticlesPage);