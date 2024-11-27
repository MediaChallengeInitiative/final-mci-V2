"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { Theme } from "@/interface/interface";

interface ArticleImageProps {
  image: any;
  currentTheme: Theme;
}

export const ArticleImage = memo(function ArticleImage({
  image,
  currentTheme
}: ArticleImageProps) {
  const imageUrl = urlFor(image).url();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${currentTheme.text} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
      />
      <Image
        alt="Article cover image"
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        className="transform group-hover:scale-105 transition-transform duration-700"
        priority
      />
    </motion.div>
  );
});

// "use client";

// import React, { memo } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Theme } from "@/interface/interface";

// interface ArticleImageProps {
//   imageUrl: string;
//   currentTheme: Theme;
// }

// export const ArticleImage = memo(function ArticleImage({
//   imageUrl,
//   currentTheme
// }: ArticleImageProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.8, delay: 0.6 }}
//       className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group"
//     >
//       <div
//         className={`absolute inset-0 bg-gradient-to-r ${currentTheme.cardBg} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
//       />
//       <Image
//         alt="Cover image"
//         src={imageUrl}
//         layout="fill"
//         objectFit="cover"
//         className="transform group-hover:scale-105 transition-transform duration-700"
//         priority
//       />
//     </motion.div>
//   );
// });
