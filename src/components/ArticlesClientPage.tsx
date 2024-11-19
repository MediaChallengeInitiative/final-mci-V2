"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleData } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import { getAllArticles } from "@/utils/get-all-articles";
import { motion } from "framer-motion";

const ArticleCard = ({
  article,
  index
}: {
  article: ArticleData;
  index: number;
}) => {
  const date = new Date(article.publishedAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={urlFor(article.mainImage).url()}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold text-sky-600 group-hover:text-sky-700 transition-colors duration-300">
              {day}
            </span>
            <span className="text-lg text-sky-500 group-hover:text-sky-600 transition-colors duration-300">
              {month}
            </span>
          </div>
          <Link
            href={`/articles/${article.slug}`}
            className="h-8 w-8 rounded-full bg-sky-100 group-hover:bg-sky-600 transition-colors duration-300 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 text-sky-600 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <Link
          href={`/articles/${article.slug}`}
          className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-sky-600 transition-colors duration-300 line-clamp-2"
        >
          {article.title}
        </Link>

        <Link href={`/articles/${article.slug}`}>
          <span className="inline-flex items-center text-sm font-medium text-sky-600 group-hover:text-sky-700 transition-colors duration-300">
            Read Article
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

const ArticlesClientPage = ({
  initialArticles,
  totalArticles,
  per_page
}: {
  initialArticles: ArticleData[];
  totalArticles: number;
  per_page: number;
}) => {
  const [articles, setArticles] = useState<ArticleData[]>(initialArticles);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const start = (page - 1) * per_page;
    const end = start + per_page;
    const newArticles = await getAllArticles(start, end);
    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white mt-0 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article._id} article={article} index={index} />
          ))}
        </div>

        {articles.length < totalArticles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={loadMore}
              disabled={loading}
              className="group relative px-8 py-3 bg-sky-600 text-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                ) : (
                  "Load More Articles"
                )}
              </span>
              <div className="absolute inset-0 bg-sky-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArticlesClientPage;

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArticleData } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";
// import { getAllArticles } from "@/utils/get-all-articles";

// const ArticleCard = ({ article }: { article: ArticleData }) => {
//   const date = new Date(article.publishedAt);
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
//         {article.title}
//       </h3>
//       <div className="relative h-60 w-full overflow-hidden">
//         <Image
//           src={urlFor(article.mainImage).url()}
//           alt={article.title}
//           layout="fill"
//           objectFit="cover"
//           className="transition-transform duration-300 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//           <Link href={`/articles/${article.slug}`} passHref>
//             <button className="bg-white text-[#0097d1] px-4 py-2 rounded-full hover:bg-[#0097d1] hover:text-white transition-colors duration-300">
//               Read More
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function ArticlesClientPage({
//   initialArticles,
//   totalArticles,
//   per_page
// }: {
//   initialArticles: ArticleData[];
//   totalArticles: number;
//   per_page: number;
// }) {
//   const [articles, setArticles] = useState<ArticleData[]>(initialArticles);
//   const [page, setPage] = useState(2); // Start from page 2 as we already have the first page
//   const [loading, setLoading] = useState(false);

//   const loadMore = async () => {
//     setLoading(true);
//     const start = (page - 1) * per_page;
//     const end = start + per_page;
//     const newArticles = await getAllArticles(start, end);
//     setArticles((prevArticles) => [...prevArticles, ...newArticles]);
//     setPage((prevPage) => prevPage + 1);
//     setLoading(false);
//   };

//   return (
//     <div className="w-full lg:container flex flex-col mx-auto px-0 lg:px-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 lg:gap-8">
//         {articles.map((article) => (
//           <ArticleCard key={article._id} article={article} />
//         ))}
//       </div>

//       <div>
//         {articles.length < totalArticles && (
//           <div className="mt-12 flex justify-center">
//             <button
//               onClick={loadMore}
//               disabled={loading}
//               className="px-6 py-3 bg-[#0097d1] text-white rounded-full hover:bg-[#007bb3] transition-colors duration-300 disabled:opacity-50"
//             >
//               {loading ? "Loading..." : "Load More"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
