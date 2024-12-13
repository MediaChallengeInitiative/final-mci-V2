"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Theme } from "@/interface/interface";
import { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

// Updated interfaces to match Portable Text structure
interface TextChild {
  _key?: string;
  _type?: string;
  text: string;
  marks?: string[];
}

interface ContentBlock {
  _key?: string;
  _type?: string;
  children: TextChild[];
  markDefs?: unknown[];
  style?: string;
}

interface ArticleContentProps {
  blocks: PortableTextBlock[] | ContentBlock[];
  fontSize: number;
  currentTheme: Theme;
}

export const ArticleContent = memo(function ArticleContent({
  blocks,
  fontSize,
  currentTheme
}: ArticleContentProps) {
  // Transform blocks to ensure they match ContentBlock structure
  const transformedBlocks = blocks.map((block) => ({
    _key: block._key,
    _type: block._type,
    children: block.children.map((child) => {
      if ("text" in child) {
        return {
          _key: (child as PortableTextSpan)._key,
          _type: (child as PortableTextSpan)._type,
          text: (child as PortableTextSpan).text,
          marks: (child as PortableTextSpan).marks
        };
      }
      return {
        text: "",
        marks: []
      };
    }),
    markDefs: block.markDefs,
    style: block.style
  })) as ContentBlock[];

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="prose prose-lg mx-auto"
    >
      {transformedBlocks.map((block, index) => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={block._key || index}
          className={`mb-6 ${currentTheme.text} leading-relaxed`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {block.children.map((child, idx) => (
            <React.Fragment key={child._key || idx}>
              {child.text}
            </React.Fragment>
          ))}
        </motion.p>
      ))}
    </motion.article>
  );
});

// "use client";

// import React, { memo } from "react";
// import { motion } from "framer-motion";
// import { Theme } from "@/interface/interface";

// interface ArticleContentProps {
//   blocks: any[];
//   fontSize: number;
//   currentTheme: Theme;
// }

// export const ArticleContent = memo(function ArticleContent({
//   blocks,
//   fontSize,
//   currentTheme
// }: ArticleContentProps) {
//   return (
//     <motion.article
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8, delay: 0.8 }}
//       className="prose prose-lg mx-auto"
//     >
//       {blocks.map((block, index) => (
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           key={index}
//           className={`mb-6 ${currentTheme.text} leading-relaxed`}
//           style={{ fontSize: `${fontSize}px` }}
//         >
//           {block.children.map((child: any, idx: number) => (
//             <React.Fragment key={idx}>{child.text}</React.Fragment>
//           ))}
//         </motion.p>
//       ))}
//     </motion.article>
//   );
// });
