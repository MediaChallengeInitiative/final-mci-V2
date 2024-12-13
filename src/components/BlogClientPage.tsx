"use client";

import React, {
  useState,
  useCallback,
  useTransition,
  useMemo,
  useEffect
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Blog, Theme } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import { getAllBlogs } from "@/utils/get-all-blogs";
import Breadcrumb from "@/components/breadcrumb";
import ColorSwitcher from "@/components/staff/ColorSwitcher";
import { themes } from "@/config/themes";

interface BlogCardProps {
  blog: Blog;
  theme: Theme;
  index: number;
}

const LoadingSpinner = () => (
  <div className="flex items-center space-x-2">
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
  </div>
);

const BlogCard: React.FC<BlogCardProps> = ({ blog, theme, index }) => {
  const date = new Date(blog.publishedAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${theme.cardBg} rounded-xl p-6 group relative overflow-hidden transition-all duration-300 hover:shadow-xl`}
    >
      <div className={`text-4xl font-bold mb-2 ${theme.text}`}>{day}</div>
      <div className={`text-xl mb-4 ${theme.text}`}>{month}</div>
      <h3 className={`text-xl line-clamp-2 font-semibold mb-4 ${theme.text}`}>
        {blog.title}
      </h3>
      <div className="relative h-60 w-full overflow-hidden rounded-lg">
        <Image
          src={urlFor(blog.mainImage).url()}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={blog.link} passHref>
            <button
              className={`px-6 py-2 rounded-full bg-white ${theme.hover} transition-colors duration-300`}
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

interface BlogClientPageProps {
  initialBlogs: Blog[];
  totalBlogs: number;
  page: number;
  per_page: number;
}

export default function BlogClientPage({
  initialBlogs,
  totalBlogs,
  page,
  per_page
}: BlogClientPageProps) {
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
        <BlogCard key={blog._id} blog={blog} theme={currentTheme} index={i} />
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
          title="Blog"
          subtitle="Read our latest news and updates"
          currentTheme={currentTheme}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container grid gap-12 px-4 md:px-6"
          >
            <div className="text-center">
              <h2
                className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-${currentTheme.gradientFrom} to-${currentTheme.gradientTo} bg-clip-text text-transparent mb-4`}
              >
                Latest Blog Posts
              </h2>
              <div
                className={`h-1 w-24 mx-auto bg-gradient-to-r from-${currentTheme.gradientFrom} to-${currentTheme.gradientTo} rounded-full`}
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {memoizedBlogCards}
            </div>

            {blogs.length < totalBlogs && (
              <div className="flex justify-center">
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
                    loading ? "Loading more posts..." : "Show more posts"
                  }
                >
                  <span className="relative z-10 flex items-center space-x-3 text-white">
                    {loading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <span>Show More Posts</span>
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
}

// 'use client';

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Blog } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";
// import { getAllBlogs } from "@/utils/get-all-blogs";

// const BlogCard = ({ blog }: { blog: Blog }) => {
//   const date = new Date(blog.publishedAt);
//   const day = date.getDate();
//   const month = date.toLocaleString("default", { month: "short" });

//   return (
//     <div className="bg-white border-0 lg:border lg:border-stone-400 hover:border-transparent border-opacity-40 rounded-none lg:rounded-xl hover:bg-[#0097d1] p-6 group relative overflow-hidden transition-colors duration-300">
//       <div className="text-4xl font-bold mb-2 text-[#2B2B2B] group-hover:text-white transition-colors duration-300">
//         {day}
//       </div>
//       <div className="text-[#0097d1] text-xl group-hover:text-white mb-4 transition-colors duration-300">
//         {month}
//       </div>
//       <h3 className="text-xl line-clamp-2 font-semibold mb-2 text-[#2B2B2B] group-hover:text-white transition-colors duration-300">
//         {blog.title}
//       </h3>
//       <div className="relative h-60 w-full overflow-hidden">
//         <Image
//           src={urlFor(blog.mainImage).url()}
//           alt={blog.title}
//           layout="fill"
//           objectFit="cover"
//           className="transition-transform duration-300 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//           <Link href={blog.link} passHref>
//             <button className="bg-white text-[#0097d1] px-4 py-2 rounded-full hover:bg-[#0097d1] hover:text-white transition-colors duration-300">
//               Read More
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function BlogClientPage({
//   initialBlogs,
//   totalBlogs,
//   per_page
// }: {
//   initialBlogs: Blog[];
//   totalBlogs: number;
//   per_page: number;
// }) {
//   const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
//   const [page, setPage] = useState(2); // Start from page 2 as we already have the first page
//   const [loading, setLoading] = useState(false);

//   const loadMore = async () => {
//     setLoading(true);
//     const start = (page - 1) * per_page;
//     const end = start + per_page;
//     const newBlogs = await getAllBlogs(start, end);
//     setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
//     setPage((prevPage) => prevPage + 1);
//     setLoading(false);
//   };

//   return (
//     <div className="w-full lg:container flex flex-col mx-auto px-0 lg:px-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 lg:gap-8">
//         {blogs.map((blog) => (
//           <BlogCard key={blog._id} blog={blog} />
//         ))}
//       </div>

//       {blogs.length < totalBlogs && (
//         <div className="mt-12 flex justify-center">
//           <button
//             onClick={loadMore}
//             disabled={loading}
//             className="px-6 py-3 bg-[#0097d1] text-white rounded-full hover:bg-[#007bb3] transition-colors duration-300 disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
