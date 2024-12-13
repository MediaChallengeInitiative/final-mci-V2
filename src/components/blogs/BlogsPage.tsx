"use client";

import React, {
  useState,
  useCallback,
  useTransition,
  useMemo,
  useEffect
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Blog, Theme } from "@/interface/interface";
import Breadcrumb from "@/components/breadcrumb";
import ColorSwitcher from "@/components/staff/ColorSwitcher";
import { themes } from "@/config/themes";
import { getAllBlogs } from "@/utils/get-all-blogs";
import BlogCard from "./BlogCard";

interface BlogsPageProps {
  initialBlogs: Blog[];
  totalBlogs: number;
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

const BlogsPage: React.FC<BlogsPageProps> = ({
  initialBlogs,
  totalBlogs,
  page,
  per_page
}) => {
  const [mounted, setMounted] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
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
      const newBlogs = await getAllBlogs(start, start + per_page);
      setBlogs((prev) => [...prev, ...newBlogs]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Failed to load more blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const memoizedBlogCards = useMemo(
    () =>
      blogs.map((blog, i) => (
        <BlogCard
          key={`${blog._id}-${i}`}
          blog={blog}
          theme={currentTheme}
          index={i}
        />
      )),
    [blogs, currentTheme]
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
          title="Our Blogs"
          subtitle="Explore where others have written about us and shared our story."
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
            {/* Blog Grid */}
            <div
              key="blog-grid"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max"
            >
              {memoizedBlogCards}
            </div>

            {/* Load More Button */}
            {blogs.length < totalBlogs && (
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
                    loading ? "Loading more blogs..." : "Show more blogs"
                  }
                >
                  <span className="relative z-10 flex items-center space-x-3 text-white">
                    {loading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <span>Show More Blogs</span>
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

export default React.memo(BlogsPage);
