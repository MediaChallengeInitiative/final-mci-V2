"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Blog, Theme } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";

interface BlogCardProps {
  blog: Blog;
  index: number;
  theme: Theme;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const BlogCard = React.memo(({ blog, theme, index }: BlogCardProps) => {
  const router = useRouter();

  // Memoize date calculations
  const { day, month, year } = useMemo(() => {
    const date = new Date(blog.publishedAt);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear()
    };
  }, [blog.publishedAt]);

  // Memoize image URL
  const articleImageUrl = useMemo(
    () => urlFor(blog.mainImage).quality(85).url(),
    [blog.mainImage]
  );

  // Generate blur placeholder
  const blurDataURL = useMemo(
    () => `data:image/svg+xml;base64,${toBase64(shimmer(800, 450))}`,
    []
  );

  // Prefetch optimization
  const prefetchArticle = useCallback(() => {
    const timer = setTimeout(() => {
      router.prefetch(`/articles/${blog.slug}`);
    }, 100); // Small delay to prevent unnecessary prefetches
    return () => clearTimeout(timer);
  }, [router, blog.slug]);

  return (
    <Link
      href={`/articles/${blog.slug}`}
      prefetch={false} // We'll handle prefetching manually with the hover/focus handlers
      className={`group relative block p-1 rounded-2xl bg-gradient-to-tr ${
        theme.cardBg
      } hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform-gpu will-change-transform`}
      onMouseEnter={prefetchArticle}
      onFocus={prefetchArticle}
      aria-label={`Read article: ${blog.title}`}
    >
      <div className="relative overflow-hidden rounded-xl bg-white">
        {/* Image Container with aspect ratio */}
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            width={800}
            height={450}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform"
            src={articleImageUrl}
            priority={index < 3} // Only prioritize first 3 images
            loading={index < 3 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"
            aria-hidden="true"
          />
        </div>

        {/* Content Section */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          {/* Date Display */}
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl font-bold text-white">{day}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-300">{month}</span>
              <span className="text-xs text-gray-400">{year}</span>
            </div>
          </div>

          {/* Decorative Line with hardware acceleration */}
          <div
            className={`h-1 w-10 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-full mb-3 transform-gpu scale-x-0 group-hover:scale-x-100 transition-transform duration-300 will-change-transform`}
            aria-hidden="true"
          />

          {/* Title with gradient mask for long text */}
          <h2 className="text-xl font-bold text-white tracking-wide mb-2 line-clamp-2 break-words hyphens-auto">
            {blog.title}
          </h2>

          {/* Read More Text with hardware-accelerated animations */}
          <p
            className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center"
            aria-hidden="true"
          >
            Read Article
            <svg
              className="ml-2 w-4 h-4 transform-gpu group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </p>
        </div>
      </div>
    </Link>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;

// "use client";

// import React, { useCallback, useMemo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ArticleData, Theme } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";

// interface BlogCardProps {
//   article: ArticleData;
//   index: number;
//   theme: Theme;
// }

// const ArticleCard = React.memo(
//   ({ article, theme, index }: BlogCardProps) => {
//     const router = useRouter();
//     const date = new Date(article.publishedAt);
//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "short" });

//     const articleImageUrl = useMemo(
//       () => urlFor(article.mainImage).url(),
//       [article.mainImage]
//     );

//     const prefetchArticle = useCallback(() => {
//       router.prefetch(`/articles/${article.slug}`);
//     }, [router, article.slug]);

//     return (
//       <Link
//         href={`/articles/${article.slug}`}
//         prefetch={true}
//         className={`group relative block p-1 rounded-2xl bg-gradient-to-tr ${theme.cardBg} hover:shadow-lg hover:-translate-y-1 transition-transform duration-300`}
//         onMouseEnter={prefetchArticle}
//         onFocus={prefetchArticle}
//       >
//         <div className="relative overflow-hidden rounded-xl bg-white">
//           {/* Image Container */}
//           <div className="aspect-[16/9] overflow-hidden">
//             <Image
//               width={800}
//               height={450}
//               alt={article.title}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//               src={articleImageUrl}
//               priority={index < 6}
//               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               quality={85}
//               placeholder="blur"
//               blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
//           </div>

//           {/* Content Section */}
//           <div className="absolute inset-x-0 bottom-0 p-6">
//             {/* Date Display */}
//             <div className="flex items-center space-x-3 mb-3">
//               <span className="text-3xl font-bold text-white">{day}</span>
//               <div className="flex flex-col">
//                 <span className="text-sm font-medium text-gray-300">
//                   {month}
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   {date.getFullYear()}
//                 </span>
//               </div>
//             </div>

//             {/* Decorative Line */}
//             <div
//               className={`h-1 w-10 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-full mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
//             />

//             {/* Title */}
//             <h2 className="text-xl font-bold text-white tracking-wide mb-2 line-clamp-2">
//               {article.title}
//             </h2>

//             {/* Read More Text - Only this appears on hover */}
//             <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
//               Read Article
//               <svg
//                 className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </p>
//           </div>

//           {/* Hover Overlay for additional depth */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>
//       </Link>
//     );
//   }
// );

// ArticleCard.displayName = "ArticleCard";

// export default ArticleCard;
