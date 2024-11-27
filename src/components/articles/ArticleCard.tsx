"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArticleData, Theme } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";

interface ArticleCardProps {
  article: ArticleData;
  index: number;
  theme: Theme;
}

const ArticleCard = React.memo(
  ({ article, theme, index }: ArticleCardProps) => {
    const router = useRouter();
    const date = new Date(article.publishedAt);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    const articleImageUrl = useMemo(
      () => urlFor(article.mainImage).url(),
      [article.mainImage]
    );

    const prefetchArticle = useCallback(() => {
      router.prefetch(`/articles/${article.slug}`);
    }, [router, article.slug]);

    return (
      <Link
        href={`/articles/${article.slug}`}
        prefetch={true}
        className={`group relative block p-1 rounded-2xl bg-gradient-to-tr ${theme.cardBg} hover:shadow-lg hover:-translate-y-1 transition-transform duration-300`}
        onMouseEnter={prefetchArticle}
        onFocus={prefetchArticle}
      >
        <div className="relative overflow-hidden rounded-xl bg-white">
          {/* Image Container */}
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              width={800}
              height={450}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={articleImageUrl}
              priority={index < 6}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          </div>

          {/* Content Section */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            {/* Date Display */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl font-bold text-white">{day}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-300">
                  {month}
                </span>
                <span className="text-xs text-gray-400">
                  {date.getFullYear()}
                </span>
              </div>
            </div>

            {/* Decorative Line */}
            <div
              className={`h-1 w-10 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-full mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            />

            {/* Title */}
            <h2 className="text-xl font-bold text-white tracking-wide mb-2 line-clamp-2">
              {article.title}
            </h2>

            {/* Read More Text - Only this appears on hover */}
            <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
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
            </p>
          </div>

          {/* Hover Overlay for additional depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    );
  }
);

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
