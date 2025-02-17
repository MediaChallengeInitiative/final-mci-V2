"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  BookOpen,
  Database,
  Search,
  LucideIcon
} from "lucide-react";

// Define types
interface CardData {
  title: "Digital Journalism" | "Data Journalism" | "Investigative Reporting";
  description: string;
  color: string;
}

interface CardProps {
  data: CardData;
  index: number;
  isVisible: boolean;
}

// Separate component for individual cards to improve performance
const Card: React.FC<CardProps> = React.memo(({ data, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  const icons: Record<CardData["title"], LucideIcon> = {
    "Digital Journalism": BookOpen,
    "Data Journalism": Database,
    "Investigative Reporting": Search
  };

  const Icon = icons[data.title];

  return (
    <motion.div
      className="card group relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col relative p-8 md:p-12 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center">
              {data.title}
              <ChevronRight
                className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </h3>
            <p className="text-lg text-white/80">{data.description}</p>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-white/30 mr-2" />
                      Advanced tools and techniques
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-white/30 mr-2" />
                      Hands-on projects
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-white/30 mr-2" />
                      Expert mentorship
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

Card.displayName = "Card";

export const VerticalCardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -20% 0px"
  });

  const cards: CardData[] = [
    {
      title: "Digital Journalism",
      description: "Master modern digital storytelling techniques and tools",
      color: "from-sky-400 to-blue-600"
    },
    {
      title: "Data Journalism",
      description: "Learn to analyze and visualize complex data sets",
      color: "from-purple-400 to-indigo-600"
    },
    {
      title: "Investigative Reporting",
      description: "Develop skills in deep investigation and fact-finding",
      color: "from-orange-400 to-pink-600"
    }
  ] as const;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.5))]" />

      <div className="flex flex-col container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Our Curriculum
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Comprehensive training modules designed to create well-rounded
            journalists for the modern era.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {cards.map((card, index) => (
            <Card
              key={card.title}
              data={card}
              index={index}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalCardsSection;

// // components/pages/next-gen/sections/VerticalCardsSection.tsx
// "use client";

// import React, { useRef, useEffect } from "react";
// import { motion, useInView } from "framer-motion";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// export const VerticalCardsSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(sectionRef, { once: true });

//   const cards = [
//     {
//       title: "Digital Journalism",
//       description: "Master modern digital storytelling techniques and tools",
//       color: "from-sky-400 to-blue-600"
//     },
//     {
//       title: "Data Journalism",
//       description: "Learn to analyze and visualize complex data sets",
//       color: "from-purple-400 to-indigo-600"
//     },
//     {
//       title: "Investigative Reporting",
//       description: "Develop skills in deep investigation and fact-finding",
//       color: "from-orange-400 to-pink-600"
//     }
//   ];

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const cards = sectionRef.current?.querySelectorAll(".card");
//       cards?.forEach((card, index) => {
//         gsap.from(card, {
//           scrollTrigger: {
//             trigger: card,
//             start: "top center+=100",
//             end: "bottom center",
//             scrub: 1
//           },
//           y: 100,
//           opacity: 0,
//           duration: 1,
//           delay: index * 0.2
//         });
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-20 md:py-32 bg-slate-900">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Our Curriculum
//           </h2>
//           <p className="text-xl text-white/80 max-w-2xl mx-auto">
//             Comprehensive training modules designed to create well-rounded
//             journalists.
//           </p>
//         </motion.div>

//         <div className="max-w-5xl mx-auto space-y-8">
//           {cards.map((card, index) => (
//             <motion.div
//               key={card.title}
//               className="card group relative"
//               initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//               animate={isInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//             >
//               <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
//                 />
//                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
//                   {card.title}
//                 </h3>
//                 <p className="text-lg text-white/80">{card.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
