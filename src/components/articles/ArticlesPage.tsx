"use client";

import React, {
  useState,
  useCallback,
  useTransition,
  useMemo,
  useEffect
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Theme } from "@/interface/interface";
import { themes } from "@/config/themes";
import { BaseArticle, PaginationMeta } from "@/types/article";
import Breadcrumb from "@/components/breadcrumb";
import ArticleCard from "./ArticleCard";
import { LoadMoreButton } from "./LoadMoreButton";
import ColorSwitcher  from "./ColorSwitcher";

interface ArticlesPageProps {
  initialArticles: BaseArticle[];
  meta: PaginationMeta;
}

export const ArticlesPage = ({ initialArticles, meta }: ArticlesPageProps) => {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = useCallback((theme: Theme) => {
    startTransition(() => {
      setCurrentTheme(theme);
    });
  }, []);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, initialArticles.length));
      setIsLoading(false);
    }, 800);
  }, [initialArticles.length]);

  const visibleArticles = initialArticles.slice(0, visibleCount);
  const hasMore = visibleCount < initialArticles.length;
  const remainingCount = initialArticles.length - visibleCount;

  const articleCards = useMemo(
    () =>
      visibleArticles.map((article, i) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          layout
        >
          <ArticleCard article={article} theme={currentTheme} index={i} />
        </motion.div>
      )),
    [visibleArticles, currentTheme]
  );

  if (!mounted) return null;

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
      <div className="pt-16">
        <Breadcrumb
          title="Articles"
          subtitle="Discover our latest insights and stories"
          currentTheme={currentTheme}
        />
      </div>
      <div className="w-[90%] max-w-[1400px] mx-auto pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`theme-${currentTheme.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-16"
          >

            <motion.div
              className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              layout
            >
              {articleCards}
            </motion.div>

            <LoadMoreButton
              loading={isLoading}
              onLoadMore={loadMore}
              hasMore={hasMore}
              theme={currentTheme}
              remainingCount={remainingCount}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArticlesPage;
