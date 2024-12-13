"use client";

import { Theme } from "@/interface/interface";
import { motion } from "framer-motion";
import { PortableTextBlock } from "@portabletext/types";

interface TextChild {
  _type: "span";
  text: string;
  marks?: string[];
}

interface ContentBlock extends PortableTextBlock {
  _type: "block" | "image";
  children: TextChild[];
}

interface CustomSerializerProps {
  blocks: ContentBlock[];
  fontSize: number;
  theme: Theme;
}

const CustomSerializer = ({
  blocks,
  fontSize,
  theme
}: CustomSerializerProps) => {
  return (
    <div className="relative">
      {blocks.map((block, index) => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={index}
          className={`mb-6 ${theme.text} leading-relaxed`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {block.children.map((child, idx) => {
            const textColor =
              theme.name === "dark" ? "text-white/80" : theme.text;
            return (
              <span key={idx} className={textColor}>
                {child.text}
              </span>
            );
          })}
        </motion.p>
      ))}
    </div>
  );
};

export default CustomSerializer;

// "use client";

// import { Theme } from "@/interface/interface";
// import { motion } from "framer-motion";

// const CustomSerializer = ({
//   blocks,
//   fontSize,
//   theme
// }: {
//   blocks: any[];
//   fontSize: number;
//   theme: Theme;
// }) => {
//   return (
//     <div className="relative">
//       {blocks.map((block, index) => (
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           key={index}
//           className={`mb-6 ${theme.text} leading-relaxed`}
//           style={{ fontSize: `${fontSize}px` }}
//         >
//           {block.children.map((child: any, idx: number) => {
//             const textColor =
//               theme.name === "dark" ? "text-white/80" : theme.text;
//             return (
//               <span key={idx} className={textColor}>
//                 {child.text}
//               </span>
//             );
//           })}
//         </motion.p>
//       ))}
//     </div>
//   );
// };

// export default CustomSerializer;
