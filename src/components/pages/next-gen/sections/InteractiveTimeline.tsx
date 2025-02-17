"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import { Clock, BookOpen, Laptop, Award, ChevronRight } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  skills: string[];
  milestones: string[];
}

const TimelineCard: React.FC<{
  item: TimelineItem;
  index: number;
  isLeft: boolean;
  progress: number;
}> = React.memo(({ item, index, isLeft, progress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardProgress = Math.max(0, Math.min(1, (progress - index * 0.25) * 4));

  const Icon = item.icon;

  return (
    <motion.div
      className={`relative flex items-center mb-16 
                  ${
                    isLeft
                      ? "justify-start md:justify-start"
                      : "justify-start md:justify-end"
                  }
                  ${isExpanded ? "z-10" : "z-0"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className={`relative w-full md:w-1/2 px-4 md:px-8 ${
          isLeft ? "md:pr-8" : "md:pl-8"
        }`}
      >
        <motion.div
          style={{
            opacity: cardProgress,
            x: isLeft ? -20 + cardProgress * 20 : 20 - cardProgress * 20
          }}
          className="group"
        >
          <div
            className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 
                     hover:border-white/20 transition-all duration-300 cursor-pointer
                     hover:bg-white/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-white/10 shrink-0">
                <Icon className="w-6 h-6 text-sky-400" />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-sky-400 font-bold mb-2 block text-sm md:text-base">
                  {item.year}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center">
                  {item.title}
                  <ChevronRight
                    className={`ml-2 w-5 h-5 transition-transform duration-300 
                              ${
                                isExpanded
                                  ? "rotate-90"
                                  : "group-hover:translate-x-1"
                              }`}
                  />
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  {item.description}
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md rounded-xl -z-10" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold text-sm md:text-base">
                            Key Skills
                          </h4>
                          <ul className="space-y-2">
                            {item.skills.map((skill, idx) => (
                              <li
                                key={idx}
                                className="text-white/70 flex items-center text-sm md:text-base"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50 mr-2 shrink-0" />
                                <span className="line-clamp-2">{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold text-sm md:text-base">
                            Milestones
                          </h4>
                          <ul className="space-y-2">
                            {item.milestones.map((milestone, idx) => (
                              <li
                                key={idx}
                                className="text-white/70 flex items-center text-sm md:text-base"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50 mr-2 shrink-0" />
                                <span className="line-clamp-2">
                                  {milestone}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

TimelineCard.displayName = "TimelineCard";

export const InteractiveTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timeline: TimelineItem[] = [
    {
      year: "Month 1-2",
      title: "Foundation Training",
      description: "Basic journalism principles and digital tools",
      icon: Clock,
      skills: [
        "News Writing",
        "Media Ethics",
        "Digital Literacy",
        "Research Methods"
      ],
      milestones: [
        "First Article Published",
        "Ethics Certification",
        "Tool Proficiency",
        "Research Project"
      ]
    },
    {
      year: "Month 3-4",
      title: "Specialization",
      description: "Focus on chosen journalism track",
      icon: BookOpen,
      skills: [
        "Beat Reporting",
        "Data Analysis",
        "Multimedia Production",
        "Investigative Methods"
      ],
      milestones: [
        "Beat Assignment",
        "Data Story",
        "Multimedia Package",
        "Investigation Plan"
      ]
    },
    {
      year: "Month 5-6",
      title: "Practical Experience",
      description: "Hands-on reporting and story production",
      icon: Laptop,
      skills: [
        "Field Reporting",
        "Story Development",
        "Source Building",
        "Content Production"
      ],
      milestones: [
        "Major Story Published",
        "Source Network",
        "Portfolio Development",
        "Team Project"
      ]
    },
    {
      year: "Month 7-8",
      title: "Advanced Skills",
      description: "Advanced techniques and professional development",
      icon: Award,
      skills: [
        "Advanced Analytics",
        "Project Management",
        "Leadership",
        "Innovation"
      ],
      milestones: [
        "Capstone Project",
        "Professional Network",
        "Career Planning",
        "Final Portfolio"
      ]
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-slate-900/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.5))]" />

      <div className="flex flex-col container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Program Timeline
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            A structured journey to journalism excellence, designed to transform
            aspiring writers into accomplished professionals.
          </p>
        </motion.div>

        <div className="relative max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          {/* Progress line - Making it responsive */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-sky-400 to-sky-500"
              style={{ blockSize: `${scrollYProgress.get() * 100}%` }}
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-sky-400" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-sky-500" />
          </div>

          {/* Timeline items */}
          {timeline.map((item, index) => (
            <TimelineCard
              key={item.year}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
              progress={scrollYProgress.get()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;

// import React, { useRef, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence
// } from "framer-motion";
// import { Clock, BookOpen, Laptop, Award, ChevronRight } from "lucide-react";

// interface TimelineItem {
//   year: string;
//   title: string;
//   description: string;
//   icon: React.FC<{ className?: string }>;
//   skills: string[];
//   milestones: string[];
// }

// const TimelineCard: React.FC<{
//   item: TimelineItem;
//   index: number;
//   isLeft: boolean;
//   progress: number;
// }> = React.memo(({ item, index, isLeft, progress }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const cardProgress = Math.max(0, Math.min(1, (progress - index * 0.25) * 4));

//   const Icon = item.icon;

//   return (
//     <motion.div
//       className={`relative flex items-center mb-16 ${
//         isLeft ? "justify-start" : "justify-end"
//       }`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//     >
//       <div className={`relative ${isLeft ? "pr-8" : "pl-8"} w-1/2`}>
//         <motion.div
//           style={{
//             opacity: cardProgress,
//             x: isLeft ? -20 + cardProgress * 20 : 20 - cardProgress * 20
//           }}
//           className="group"
//         >
//           <div
//             className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10
//                      hover:border-white/20 transition-all duration-300 cursor-pointer"
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             <div className="flex items-start space-x-4">
//               <div className="p-3 rounded-lg bg-white/10">
//                 <Icon className="w-6 h-6 text-sky-400" />
//               </div>

//               <div className="flex-1">
//                 <span className="text-sky-400 font-bold mb-2 block">
//                   {item.year}
//                 </span>
//                 <h3 className="text-xl font-bold text-white mb-2 flex items-center">
//                   {item.title}
//                   <ChevronRight
//                     className={`ml-2 w-5 h-5 transition-transform duration-300
//                               ${
//                                 isExpanded
//                                   ? "rotate-90"
//                                   : "group-hover:translate-x-1"
//                               }`}
//                   />
//                 </h3>
//                 <p className="text-white/80">{item.description}</p>

//                 <AnimatePresence>
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="mt-4 pt-4 border-t border-white/10"
//                     >
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-white font-semibold mb-2">
//                             Key Skills
//                           </h4>
//                           <ul className="space-y-2">
//                             {item.skills.map((skill, idx) => (
//                               <li
//                                 key={idx}
//                                 className="text-white/70 flex items-center"
//                               >
//                                 <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50 mr-2" />
//                                 {skill}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="text-white font-semibold mb-2">
//                             Milestones
//                           </h4>
//                           <ul className="space-y-2">
//                             {item.milestones.map((milestone, idx) => (
//                               <li
//                                 key={idx}
//                                 className="text-white/70 flex items-center"
//                               >
//                                 <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50 mr-2" />
//                                 {milestone}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// });

// TimelineCard.displayName = "TimelineCard";

// export const InteractiveTimeline: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const timeline: TimelineItem[] = [
//     {
//       year: "Month 1-2",
//       title: "Foundation Training",
//       description: "Basic journalism principles and digital tools",
//       icon: Clock,
//       skills: [
//         "News Writing",
//         "Media Ethics",
//         "Digital Literacy",
//         "Research Methods"
//       ],
//       milestones: [
//         "First Article Published",
//         "Ethics Certification",
//         "Tool Proficiency",
//         "Research Project"
//       ]
//     },
//     {
//       year: "Month 3-4",
//       title: "Specialization",
//       description: "Focus on chosen journalism track",
//       icon: BookOpen,
//       skills: [
//         "Beat Reporting",
//         "Data Analysis",
//         "Multimedia Production",
//         "Investigative Methods"
//       ],
//       milestones: [
//         "Beat Assignment",
//         "Data Story",
//         "Multimedia Package",
//         "Investigation Plan"
//       ]
//     },
//     {
//       year: "Month 5-6",
//       title: "Practical Experience",
//       description: "Hands-on reporting and story production",
//       icon: Laptop,
//       skills: [
//         "Field Reporting",
//         "Story Development",
//         "Source Building",
//         "Content Production"
//       ],
//       milestones: [
//         "Major Story Published",
//         "Source Network",
//         "Portfolio Development",
//         "Team Project"
//       ]
//     },
//     {
//       year: "Month 7-8",
//       title: "Advanced Skills",
//       description: "Advanced techniques and professional development",
//       icon: Award,
//       skills: [
//         "Advanced Analytics",
//         "Project Management",
//         "Leadership",
//         "Innovation"
//       ],
//       milestones: [
//         "Capstone Project",
//         "Professional Network",
//         "Career Planning",
//         "Final Portfolio"
//       ]
//     }
//   ];

//   const progressLine = useTransform(scrollYProgress, [0, 1], [0, 100]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-20 md:py-32 bg-slate-900/50 overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.5))]" />

//       <div className="flex flex-col container mx-auto px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
//             Program Timeline
//           </h2>
//           <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
//             A structured journey to journalism excellence, designed to transform
//             aspiring writers into accomplished professionals.
//           </p>
//         </motion.div>

//         <div className="relative max-w-5xl mx-auto">
//           {/* Progress line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/10">
//             <motion.div
//               className="absolute top-0 left-0 w-full bg-gradient-to-b from-sky-400 to-sky-500"
//               style={{ height: `${progressLine}%` }}
//             />
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-sky-400" />
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-sky-500" />
//           </div>

//           {/* Timeline items */}
//           {timeline.map((item, index) => (
//             <TimelineCard
//               key={item.year}
//               item={item}
//               index={index}
//               isLeft={index % 2 === 0}
//               progress={scrollYProgress.get()}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InteractiveTimeline;
