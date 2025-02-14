import { ArticleDetail } from "@/components/articles/ArticleDetail";
import { getArticle } from "@/lib/api/articles";
import { Metadata } from "next";

export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  try {
    const { data: article } = await getArticle(params.slug);

    return {
      title: article.title,
      description: article.content.substring(0, 160),
      openGraph: {
        title: article.title,
        description: article.content.substring(0, 160),
        images: article.image_url ? [{ url: article.image_url }] : []
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.content.substring(0, 160),
        images: article.image_url ? [article.image_url] : []
      }
    };
  } catch (error) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found."
    };
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { data: article } = await getArticle(params.slug);

    return (
      <main className="min-h-screen bg-gray-50">
        <ArticleDetail article={article} />
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Article Not Found
          </h1>
          <p className="text-gray-600">
            The article you are looking for could not be found.
          </p>
        </div>
      </div>
    );
  }
}

// // app/press/articles/[slug]/page.tsx
// import { getArticle } from "@/lib/api/articles";
// import ArticlePage from "@/components/articles/ArticlePage";
// import { Metadata } from "next";

// export const runtime = "edge";
// export const preferredRegion = "auto";
// export const dynamic = "force-dynamic";
// export const revalidate = 3600;

// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

// // Generate metadata for SEO
// export async function generateMetadata({
//   params
// }: PageProps): Promise<Metadata> {
//   try {
//     const { data: article } = await getArticle(params.slug);

//     return {
//       title: article.title,
//       description: article.content.substring(0, 160),
//       openGraph: {
//         title: article.title,
//         description: article.content.substring(0, 160),
//         images: article.image_url ? [{ url: article.image_url }] : []
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: article.title,
//         description: article.content.substring(0, 160),
//         images: article.image_url ? [article.image_url] : []
//       }
//     };
//   } catch (error) {
//     return {
//       title: "Article Not Found",
//       description: "The requested article could not be found."
//     };
//   }
// }

// export default async function Page({ params }: PageProps) {
//   try {
//     const { data: article } = await getArticle(params.slug);

//     return (
//       <main>
//         <ArticlePage article={article} />
//       </main>
//     );
//   } catch (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4 px-4">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Article Not Found
//           </h1>
//           <p className="text-gray-600">
//             The article you are looking for could not be found.
//           </p>
//         </div>
//       </div>
//     );
//   }
// }

// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import { useParams } from "next/navigation";
// import dynamic from "next/dynamic";
// import { themes } from "@/config/themes";
// import { ArticleContent } from "@/components/articles/ArticleContent";
// import { ArticleHeader } from "@/components/articles/ArticleHeader";
// import { ArticleImage } from "@/components/articles/ArticleImage";
// import { SocialButtons } from "@/components/articles/SocialButtons";
// import { ArticleData, Theme } from "@/interface/interface";
// import { getSingleArticle } from "@/utils/get-single-article";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";

// const ColorSwitcher = dynamic(
//   () =>
//     import("@/components/articles/ColorSwitcher").then(
//       (mod) => mod.ColorSwitcher
//     ),
//   { ssr: false }
// );

// const FontSizeControls = dynamic(
//   () =>
//     import("@/components/articles/FontSizeControls").then(
//       (mod) => mod.FontSizeControls
//     ),
//   { ssr: false }
// );

// export default function ArticlePage() {
//   const params = useParams();
//   const slug = params?.slug as string;

//   const [articleData, setArticleData] = useState<ArticleData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
//   const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
//   const [fontSize, setFontSize] = useState(18);
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedTheme = localStorage.getItem("preferred-theme");
//       if (savedTheme) {
//         setCurrentTheme(JSON.parse(savedTheme));
//       }

//       const savedFontSize = localStorage.getItem("preferred-font-size");
//       if (savedFontSize) {
//         setFontSize(parseInt(savedFontSize, 10));
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("preferred-theme", JSON.stringify(currentTheme));
//     }
//   }, [currentTheme]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("preferred-font-size", fontSize.toString());
//     }
//   }, [fontSize]);

//   useEffect(() => {
//     if (!slug) return;

//     let isMounted = true;

//     const fetchArticle = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getSingleArticle(slug);
//         if (isMounted) {
//           setArticleData(data);
//           setError(null);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(
//             err instanceof Error ? err.message : "Failed to load article"
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchArticle();

//     return () => {
//       isMounted = false;
//     };
//   }, [slug]);

//   const handleIncreaseFontSize = useCallback(() => {
//     setFontSize((prev) => Math.min(prev + 2, 24));
//   }, []);

//   const handleDecreaseFontSize = useCallback(() => {
//     setFontSize((prev) => Math.max(prev - 2, 14));
//   }, []);

//   const handleLike = useCallback(() => {
//     setLiked((prev) => !prev);
//   }, []);

//   const handleBookmark = useCallback(() => {
//     setBookmarked((prev) => !prev);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex flex-col items-center space-y-4"
//         >
//           <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
//           <p className="text-gray-600">Loading article...</p>
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center space-y-4 px-4"
//         >
//           <h2 className="text-2xl font-bold text-gray-900">
//             Something went wrong
//           </h2>
//           <p className="text-gray-600">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
//           >
//             Try again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!articleData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4 px-4">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Article not found
//           </h2>
//           <p className="text-gray-600">
//             The article you&apos;re looking for doesn&apos;t exist or has been
//             removed.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
//     >
//       <ColorSwitcher
//         currentTheme={currentTheme}
//         setCurrentTheme={setCurrentTheme}
//         isOpen={isColorMenuOpen}
//         setIsOpen={setIsColorMenuOpen}
//         themes={themes}
//       />

//       <div className="relative">
//         <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="space-y-8 pt-12">
//             <ArticleHeader
//               title={articleData.title}
//               publishedAt={articleData.publishedAt}
//               authorName={articleData.author?.name}
//               currentTheme={currentTheme}
//             />

//             <ArticleImage
//               image={articleData.mainImage}
//               currentTheme={currentTheme}
//             />

//             <SocialButtons
//               liked={liked}
//               bookmarked={bookmarked}
//               onLike={handleLike}
//               onBookmark={handleBookmark}
//             />
//             <ArticleContent
//               blocks={articleData.description ?? []}
//               fontSize={fontSize}
//               currentTheme={currentTheme}
//             />
//             {/* <ArticleContent
//               blocks={articleData.description}
//               fontSize={fontSize}
//               currentTheme={currentTheme}
//             /> */}
//           </div>
//         </div>
//       </div>

//       <FontSizeControls
//         onIncrease={handleIncreaseFontSize}
//         onDecrease={handleDecreaseFontSize}
//         currentTheme={currentTheme}
//       />
//     </div>
//   );
// }
