"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaHandHoldingHeart,
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaChartLine
} from "react-icons/fa";
import { IconType } from "react-icons";

// Shared Animation Configuration
const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true }
});

// Interface for the solution step
interface SolutionStep {
  icon: IconType;
  title: string;
  description: string;
}

// BlueprintNode Component
const BlueprintNode: React.FC<SolutionStep & { index: number }> = ({
  icon: Icon,
  title,
  description,
  index
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      {...fadeInUp(index * 0.1)}
      className={`relative group flex ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 w-full`}
    >
      {/* Connecting Line */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full">
          <motion.path
            d={`M ${isEven ? "0" : "100%"}, 50% H ${isEven ? "100%" : "0"}`}
            stroke="url(#blueprint-gradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        </svg>
      </div>

      {/* Icon Container */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10 w-24 h-24 shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-orange-600 rounded-xl rotate-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center">
          <Icon
            size={32}
            className="text-sky-500 group-hover:text-orange-600 transition-colors duration-300"
          />
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="flex-1 z-10 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// SolutionSection Component
const SolutionSection: React.FC = () => {
  const steps: SolutionStep[] = [
    {
      icon: FaLightbulb,
      title: "Innovative Approach",
      description:
        "Developing cutting-edge solutions for modern media challenges through creative thinking and technological integration."
    },
    {
      icon: FaHandHoldingHeart,
      title: "Human-Centered",
      description:
        "Prioritizing empathy and ethical considerations in every aspect of our media ecosystem development."
    },
    {
      icon: FaBrain,
      title: "Knowledge Building",
      description:
        "Creating comprehensive learning pathways for journalists to develop expertise and critical thinking."
    },
    {
      icon: FaUsers,
      title: "Community Engagement",
      description:
        "Fostering strong networks and collaboration between media professionals and communities."
    },
    {
      icon: FaNewspaper,
      title: "Quality Content",
      description:
        "Ensuring high standards of journalism through rigorous training and support systems."
    },
    {
      icon: FaChartLine,
      title: "Sustainable Growth",
      description:
        "Building long-term success through strategic planning and continuous improvement."
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full opacity-5">
          <defs>
            <linearGradient
              id="blueprint-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto z-10">
        <motion.div {...fadeInUp(0)} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent">
              How We Solve the Challenge
            </span>
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            Our blueprint of creating a humane and healthy media ecosystem
          </p>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-sky-500 to-orange-600 mx-auto mt-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <BlueprintNode key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaLightbulb,
//   FaHandHoldingHeart,
//   FaBrain,
//   FaUsers,
//   FaNewspaper,
//   FaChartLine
// } from "react-icons/fa";
// import { IconType } from "react-icons";

// interface SolutionStep {
//   icon: IconType;
//   title: string;
//   description: string;
// }

// const BlueprintNode: React.FC<SolutionStep & { index: number }> = ({
//   icon: Icon,
//   title,
//   description,
//   index
// }) => {
//   const isEven = index % 2 === 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       viewport={{ once: true }}
//       className={`relative group flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 w-full`}
//     >
//       {/* Connecting Lines */}
//       <div className="absolute inset-0 z-0">
//         <svg className="w-full h-full">
//           <motion.path
//             d={`M ${isEven ? "0" : "100%"}, 50% H ${isEven ? "100%" : "0"}`}
//             stroke="url(#blueprint-gradient)"
//             strokeWidth="2"
//             strokeDasharray="4 4"
//             fill="none"
//             initial={{ pathLength: 0 }}
//             whileInView={{ pathLength: 1 }}
//             transition={{ duration: 1, delay: index * 0.2 }}
//           />
//         </svg>
//       </div>

//       {/* Icon Container */}
//       <motion.div
//         className="relative z-10 w-24 h-24 shrink-0"
//         whileHover={{ scale: 1.05 }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-orange-600 rounded-xl rotate-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
//         <div className="absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center">
//           <Icon
//             size={32}
//             className="text-sky-500 group-hover:text-orange-600 transition-colors duration-300"
//           />
//         </div>
//       </motion.div>

//       {/* Content Container */}
//       <div className="flex-1 z-10 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent">
//           {title}
//         </h3>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </motion.div>
//   );
// };

// const SolutionSection: React.FC = () => {
//   const steps: SolutionStep[] = [
//     {
//       icon: FaLightbulb,
//       title: "Innovative Approach",
//       description:
//         "Developing cutting-edge solutions for modern media challenges through creative thinking and technological integration."
//     },
//     {
//       icon: FaHandHoldingHeart,
//       title: "Human-Centered",
//       description:
//         "Prioritizing empathy and ethical considerations in every aspect of our media ecosystem development."
//     },
//     {
//       icon: FaBrain,
//       title: "Knowledge Building",
//       description:
//         "Creating comprehensive learning pathways for journalists to develop expertise and critical thinking."
//     },
//     {
//       icon: FaUsers,
//       title: "Community Engagement",
//       description:
//         "Fostering strong networks and collaboration between media professionals and communities."
//     },
//     {
//       icon: FaNewspaper,
//       title: "Quality Content",
//       description:
//         "Ensuring high standards of journalism through rigorous training and support systems."
//     },
//     {
//       icon: FaChartLine,
//       title: "Sustainable Growth",
//       description:
//         "Building long-term success through strategic planning and continuous improvement."
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 overflow-hidden">
//         <svg className="absolute w-full h-full opacity-5">
//           <defs>
//             <pattern
//               id="blueprint-grid"
//               x="0"
//               y="0"
//               width="40"
//               height="40"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M0 20h40M20 0v40"
//                 stroke="currentColor"
//                 strokeWidth="1"
//                 className="text-sky-500"
//               />
//             </pattern>
//             <linearGradient
//               id="blueprint-gradient"
//               x1="0%"
//               y1="0%"
//               x2="100%"
//               y2="0%"
//             >
//               <stop offset="0%" stopColor="#0EA5E9" />
//               <stop offset="100%" stopColor="#EA580C" />
//             </linearGradient>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
//         </svg>
//       </div>

//       <div className="relative max-w-6xl mx-auto z-10">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent">
//               How We Solve the Challenge
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
//             Our blueprint of creating a humane and healthy media ecosystem
//           </p>
//           <motion.div
//             className="h-1 w-32 bg-gradient-to-r from-sky-500 to-orange-600 mx-auto mt-6 rounded-full"
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           />
//         </motion.div>

//         <div className="space-y-12">
//           {steps.map((step, index) => (
//             <BlueprintNode key={index} {...step} index={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SolutionSection;
