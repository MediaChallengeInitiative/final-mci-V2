"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaAward, FaUsers, FaBuilding } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";

interface Statistic {
  icon: IconType;
  number: string;
  text: string;
  category: "education" | "career";
  description?: string;
}

export const impactStats: Statistic[] = [
  {
    icon: FaAward,
    number: "180",
    text: "fellows since 2018",
    category: "education",
    description:
      "Our fellowship program has nurtured 180 talented journalists who are now making significant impacts in newsrooms worldwide."
  },
  {
    icon: IoRocketSharp,
    number: "10",
    text: "youth media start-ups",
    category: "career",
    description:
      "Empowering the next generation of media entrepreneurs through mentorship and resources."
  },
  {
    icon: FaBuilding,
    number: "135",
    text: "alumni employed in media",
    category: "career",
    description:
      "Our graduates are working in leading media organizations, shaping the future of journalism."
  },
  {
    icon: FaUsers,
    number: "3000",
    text: "young journalists trained since 2017",
    category: "education",
    description:
      "Providing comprehensive training and skill development to aspiring journalists across the globe."
  }
];

interface ImpactCardProps extends Statistic {
  delay: number;
  expanded?: boolean;
}

const ImpactCard: React.FC<ImpactCardProps> = ({
  icon: Icon,
  number,
  text,
  delay,
  description,
  expanded = false
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`relative group p-6 bg-transparent rounded-xl hover:border-2 shadow-lg hover:border-sky-500 transition-all duration-3000 overflow-hidden ${
      expanded ? "md:col-span-2" : ""
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

    <div className="flex items-center gap-6">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-100 to-orange-50 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
        <Icon
          size={32}
          className="text-sky-500 group-hover:text-orange-600 transition-colors duration-300"
        />
      </div>

      <div className="flex-1">
        <motion.h3
          className="text-3xl font-bold text-sky-500 font-display tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {number}
        </motion.h3>
        <p className="text-gray-600 text-sm font-medium mt-1">{text}</p>
        {expanded && description && (
          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

export const ImpactSection: React.FC = () => {
  return (
    <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-sky-500">Our Impact</span>
            <motion.div
              className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transforming journalism through education, innovation, and
            excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.slice(0, 4).map((stat, index) => (
            <ImpactCard key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/who-we-are/impact">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Explore Our Full Impact
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaTv,
//   FaNewspaper,
//   FaAward,
//   FaUserGraduate,
//   FaUsers,
//   FaBuilding
// } from "react-icons/fa";
// import { BsFillChatDotsFill, BsBriefcaseFill } from "react-icons/bs";
// import { IoRocketSharp } from "react-icons/io5";
// import { IconType } from "react-icons";

// interface Statistic {
//   icon: IconType;
//   number: string;
//   text: string;
//   category: "broadcast" | "social" | "print" | "education" | "career";
// }

// interface ImpactCardProps extends Statistic {
//   delay: number;
// }

// const ImpactCard: React.FC<ImpactCardProps> = ({
//   icon: Icon,
//   number,
//   text,
//   delay
// }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay }}
//     viewport={{ once: true }}
//     className="relative group p-6 bg-white rounded-xl border-2 border-transparent hover:border-sky-500 transition-all duration-500 overflow-hidden"
//   >
//     {/* Border Animation Effect */}
//     <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

//     {/* Icon Container */}
//     <div className="flex justify-center mb-4">
//       <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sky-100 to-orange-50 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
//         <Icon
//           size={40}
//           className="text-sky-500 group-hover:text-orange-600 transition-colors duration-300"
//         />
//       </div>
//     </div>

//     {/* Number Container */}
//     <div className="text-center space-y-2">
//       <div className="relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-orange-600/10 blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//         <motion.h3
//           className="relative text-4xl font-bold text-sky-500 font-display tracking-tight"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: delay + 0.2 }}
//         >
//           {number}
//         </motion.h3>
//       </div>

//       {/* Text Container */}
//       <p className="text-gray-600 text-sm font-medium mt-2 px-2">{text}</p>
//     </div>

//     {/* Decorative Elements */}
//     <div className="absolute -right-4 -bottom-4 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
//       <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-orange-600 transform rotate-45" />
//     </div>
//   </motion.div>
// );

// const AnimatedMediaBackground: React.FC = () => (
//   <div className="absolute inset-0 overflow-hidden pointer-events-none">
//     <svg className="absolute w-full h-full" viewBox="0 0 1000 1000">
//       <defs>
//         <linearGradient id="media-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.1" />
//           <stop offset="100%" stopColor="#EA580C" stopOpacity="0.1" />
//         </linearGradient>

//         <pattern
//           id="media-pattern"
//           x="0"
//           y="0"
//           width="40"
//           height="40"
//           patternUnits="userSpaceOnUse"
//         >
//           <path
//             d="M0 20h40M20 0v40"
//             stroke="currentColor"
//             strokeWidth="0.5"
//             className="text-sky-200 opacity-20"
//           />
//         </pattern>
//       </defs>

//       {/* Animated Background Elements */}
//       <motion.g
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
//       >
//         {[1, 2, 3].map((i) => (
//           <circle
//             key={i}
//             cx="500"
//             cy="500"
//             r={100 + i * 50}
//             fill="none"
//             stroke="url(#media-gradient)"
//             strokeWidth="2"
//             className="opacity-30"
//           />
//         ))}
//       </motion.g>
//     </svg>
//   </div>
// );

// const ImpactSection: React.FC = () => {
//   const stats: Statistic[] = [
//     {
//       icon: FaTv,
//       number: "7 MILLION",
//       text: "Average Reach for Stories Reported on TV",
//       category: "broadcast"
//     },
//     {
//       icon: BsFillChatDotsFill,
//       number: "300K+",
//       text: "Social Media Followers for top 20 alumni",
//       category: "social"
//     },
//     {
//       icon: FaNewspaper,
//       number: "220K",
//       text: "Average Weekly Reach in Newspapers",
//       category: "print"
//     },
//     {
//       icon: FaUsers,
//       number: "3000",
//       text: "young journalists trained since 2017",
//       category: "education"
//     },
//     {
//       icon: FaAward,
//       number: "180",
//       text: "fellows since 2018",
//       category: "education"
//     },
//     {
//       icon: FaAward,
//       number: "15",
//       text: "Awards Received by Our Alumni",
//       category: "career"
//     },
//     {
//       icon: BsBriefcaseFill,
//       number: "56",
//       text: "Alumni Working in Communications",
//       category: "career"
//     },
//     {
//       icon: FaUserGraduate,
//       number: "56",
//       text: "Alumni Doing Master's Degree",
//       category: "education"
//     },
//     {
//       icon: FaBuilding,
//       number: "135",
//       text: "alumni employed in media",
//       category: "career"
//     },
//     {
//       icon: IoRocketSharp,
//       number: "10",
//       text: "youth media start-ups",
//       category: "career"
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-sky-50 to-orange-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <AnimatedMediaBackground />

//       <div className="relative max-w-[1920px] mx-auto z-10">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             <span className="text-sky-500">
//               Our Impact
//             </span>
//             <motion.div
//               className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//           </h2>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Transforming journalism through education, innovation, and
//             excellence
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {stats.map((stat, index) => (
//             <ImpactCard key={index} {...stat} delay={index * 0.1} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImpactSection;

// import React from "react";

// interface ImpactItem {
//   value: string;
//   description: string;
// }

// const impactData: ImpactItem[] = [
//   {
//     value: "7 MILLION",
//     description:
//       "Average Reach for Stories Reported and Content Produced by Our Alumni Working on TV"
//   },
//   {
//     value: "300K+",
//     description: "Social Media Followers for our top 20 alumni"
//   },
//   {
//     value: "220K",
//     description: "Average Weekly Reach for Stories by Our Alumni in Newspapers"
//   },
//   {
//     value: "3000",
//     description: "young journalists trained since 2017"
//   },
//   {
//     value: "180",
//     description: "fellows since 2018"
//   },
//   {
//     value: "15",
//     description: "Awards Received by Our Alumni"
//   },
//   {
//     value: "56",
//     description: "Alumni Working in Communications"
//   },
//   {
//     value: "56",
//     description:
//       "Alumni Doing Master's Degree in Journalism and related courses"
//   },
//   {
//     value: "135",
//     description: "alumni employed in media"
//   },
//   {
//     value: "10",
//     description: "youth media start-ups"
//   }
// ];

// const ImpactSection: React.FC = () => {
//   return (
//     <section className="w-full bg-white p-0 lg:p-0">
//       <h2 className="text-4xl capitalize tracking-tight lg:text-6xl sm:text-3xl md:text-4xl font-bold text-white bg-orange-400 py-2 lg:py-4 md:py-2 px-4 sm:px-3 md:px-3 text-center">
//         Our Impact
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0.5 bg-gray-200">
//         {impactData.map((item, index) => (
//           <div
//             key={index}
//             className={`p-3 sm:p-4 flex flex-col justify-center items-center text-center
//                         transition-colors duration-300
//                         ${
//                           index % 2 === 0
//                             ? "bg-sky-500 text-white hover:bg-white hover:text-sky-500"
//                             : "bg-white text-sky-500 hover:bg-sky-500 hover:text-white"
//                         }`}
//           >
//             <span className="text-5xl lg:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">
//               {item.value}
//             </span>
//             <p className="text-2xl capitalize text-center lg:text-2md">{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ImpactSection;
