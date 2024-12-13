"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  underlineClassName?: string;
}

// Animation variants
const titleAnimations = {
  container: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  underline: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  }
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  underlineClassName = ""
}) => (
  <motion.div
    variants={titleAnimations.container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className={`text-center mb-16 ${className}`}
  >
    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${titleClassName}`}>
      <span className="text-sky-500 inline-block">{title}</span>
    </h2>

    <p className={`text-lg text-gray-400 mt-4 ${subtitleClassName}`}>
      {subtitle}
    </p>

    <motion.div
      variants={titleAnimations.underline}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 rounded-full ${underlineClassName}`}
    />
  </motion.div>
);

// Memoize the component to prevent unnecessary re-renders
export default React.memo(SectionTitle);

// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
//   title,
//   subtitle
// }) => (
//   <motion.div
//     initial={{ opacity: 0, y: -20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     viewport={{ once: true }}
//     className="text-center mb-16"
//   >
//     <h2 className="text-4xl md:text-5xl font-bold mb-4">
//       <span className="text-sky-500">{title}</span>
//     </h2>
//     <p className="text-lg text-gray-400 mt-4">{subtitle}</p>
//     <motion.div
//       className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6"
//       initial={{ scaleX: 0 }}
//       whileInView={{ scaleX: 1 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     />
//   </motion.div>
// );

// export default SectionTitle;
