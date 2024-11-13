"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArticleData } from "@/interface/interface";
import { getSingleArticle } from "@/utils/get-single-article";
import { urlFor } from "@/lib/sanity";
import {
  CalendarDays,
  User,
  Clock,
  Share2,
  Bookmark,
  Heart,
  MessageCircle
} from "lucide-react";

const CustomSerializer = ({ blocks }: { blocks: any[] }) => {
  const [fontSize, setFontSize] = React.useState(18); // Default font size

  return (
    <div className="relative">
      {/* Font size controls */}
      <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-2 space-x-2 z-50">
        <button
          onClick={() => setFontSize((prev) => Math.min(prev + 2, 24))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          A+
        </button>
        <button
          onClick={() => setFontSize((prev) => Math.max(prev - 2, 14))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          A-
        </button>
      </div>

      {blocks.map((block, index) => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={index}
          className="mb-6 text-gray-700 leading-relaxed"
          style={{ fontSize: `${fontSize}px` }}
        >
          {block.children.map((child: any, idx: number) => {
            if (typeof child.text === "string" && /".*?"/.test(child.text)) {
              const parts = child.text
                .split(/(".*?")/)
                .reduce((acc: any, part: string, i: number) => {
                  if (/".*?"/.test(part)) {
                    acc.push(
                      <span
                        key={i}
                        className="italic text-sky-600 font-medium"
                      >
                        {part}
                      </span>
                    );
                  } else if (part.trim() === "said Abaas.") {
                    acc[acc.length - 1] = (
                      <span key={i - 1} className="italic text-gray-600">
                        {acc[acc.length - 1]} said Abaas.
                      </span>
                    );
                  } else {
                    acc.push(part);
                  }
                  return acc;
                }, []);
              return <React.Fragment key={idx}>{parts}</React.Fragment>;
            }
            return child.text;
          })}
        </motion.p>
      ))}
    </div>
  );
};

const ReadingProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <div
        className="h-full bg-sky-500 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const SocialInteractions = () => {
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <div className="fixed left-4 lg:flex hidden flex-col gap-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full py-4 px-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLiked(!liked)}
        className={`p-3 rounded-full transition-colors duration-300 ${
          liked
            ? "text-red-500 bg-red-50"
            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
        }`}
      >
        <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setBookmarked(!bookmarked)}
        className={`p-3 rounded-full transition-colors duration-300 ${
          bookmarked
            ? "text-sky-500 bg-sky-50"
            : "text-gray-400 hover:text-sky-500 hover:bg-sky-50"
        }`}
      >
        <Bookmark
          className="w-5 h-5"
          fill={bookmarked ? "currentColor" : "none"}
        />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 rounded-full text-gray-400 hover:text-sky-500 hover:bg-sky-50 transition-colors duration-300"
      >
        <Share2 className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 rounded-full text-gray-400 hover:text-sky-500 hover:bg-sky-50 transition-colors duration-300"
      >
        <MessageCircle className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default async function Page({ params }: { params: { slug: string } }) {
  const articleData: ArticleData = await getSingleArticle(params.slug);

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pt-12"
          >
            {/* Category Tag */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <span className="px-4 py-1 bg-sky-50 text-sky-600 rounded-full text-sm font-medium">
                Technology
              </span>
            </motion.div> */}

            {/* Title Section */}
            <div className="text-left lg:text-center space-y-2 w-full mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-none"
              >
                {articleData.title}
              </motion.h1>

              {/* Article Meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-6 text-gray-600"
              >
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-5 h-5 text-sky-500" />
                  <span>
                    {new Date(articleData.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-sky-500" />
                  <span>{articleData.author?.name}</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-sky-500" />
                  <span>5 min read</span>
                </div> */}
              </motion.div>
            </div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-xl w-full mx-auto"
            >
              <Image
                alt="Cover image"
                src={urlFor(articleData?.mainImage).url()}
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Social Interactions */}
            <SocialInteractions />

            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="prose prose-lg mx-auto w-full px-4 sm:px-6 lg:px-8"
            >
              <div className="rounded-2xl">
                <CustomSerializer blocks={articleData.description} />
              </div>
            </motion.article>

            {/* Mobile Social Bar */}
            {/* <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around items-center lg:hidden"
            >
              <button className="p-2 text-gray-400 hover:text-red-500">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-sky-500">
                <Bookmark className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-sky-500">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-sky-500">
                <MessageCircle className="w-6 h-6" />
              </button>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </>
  );
}

// import React from "react";
// import Image from "next/image";
// import { ArticleData } from "@/interface/interface";
// import { getSingleArticle } from "@/utils/get-single-article";
// import { urlFor } from "@/lib/sanity";

// const CustomSerializer = ({ blocks }: { blocks: any[] }) => {
//   return (
//     <>
//       {blocks.map((block, index) => (
//         <p
//           key={index}
//           className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300"
//         >
//           {block.children.map((child: any, idx: number) => {
//             if (typeof child.text === "string" && /".*?"/.test(child.text)) {
//               const parts = child.text
//                 .split(/(".*?")/)
//                 .reduce((acc: any, part: string, i: number) => {
//                   if (/".*?"/.test(part)) {
//                     acc.push(
//                       <span key={i} className="italic text-sky-500">
//                         {part}
//                       </span>
//                     );
//                   } else if (part.trim() === "said Abaas.") {
//                     acc[acc.length - 1] = (
//                       <span key={i - 1} className="italic text-white">
//                         {acc[acc.length - 1]} said Abaas.
//                       </span>
//                     );
//                   } else {
//                     acc.push(part);
//                   }
//                   return acc;
//                 }, []);
//               return <React.Fragment key={idx}>{parts}</React.Fragment>;
//             }
//             return child.text;
//           })}
//         </p>
//       ))}
//     </>
//   );
// };

// export default async function Page({ params }: { params: { slug: string } }) {
//   const articleData: ArticleData = await getSingleArticle(params.slug);
// //   console.log(articleData);
//   return (
//     <>
//       <div className="px-4 py-6 sm:py-12 lg:py-16">
//         <div className="space-y-2 md:space-y-5 pt-12 lg:pt-24 lg:w-[80%] w-[100%] mx-auto pb-4">
//           <h1 className="text-white leading-snug font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-xl md:leading-[3.5rem] sm:pb-6 pt-3">
//             {articleData.title}
//           </h1>
//           <figure>
//             <Image
//               alt="Cover image"
//               className="aspect-video overflow-hidden rounded-lg object-cover lg:h-auto h-96"
//               height={340}
//               src={urlFor(articleData?.mainImage).url()}
//               width={1250}
//             />
//             <figcaption>
//               <div className="flex lg:flex-row flex-col items-center text-left justify-between space-x-2">
//                 <div className="space-y-1 inline-flex items-center justify-between">
//                   <p className="text-md text-gray-200 dark:text-gray-100">
//                     Posted on :
//                   </p>
//                   <i className="text-md ml-2 text-sky-500 dark:text-sky-500">
//                     {new Date(articleData.publishedAt).toLocaleDateString(
//                       "en-US",
//                       { month: "long", day: "numeric", year: "numeric" }
//                     )}
//                   </i>
//                 </div>
//                 <div className="space-y-1 inline-flex items-center justify-between">
//                   <p className="text-md text-gray-200 dark:text-gray-100">
//                     Published by :
//                   </p>
//                   <i className="text-md ml-2 text-sky-500 dark:text-sky-500">
//                     {/* {articleData.author.} */}
//                     {articleData.author?.name}
//                   </i>
//                 </div>
//               </div>
//             </figcaption>
//           </figure>
//         </div>
//         <article className="prose prose-gray mx-auto max-w-6xl dark:prose-invert lg:prose-lg text-white">
//           <CustomSerializer blocks={articleData.description} />
//         </article>
//       </div>
//     </>
//   );
// }
