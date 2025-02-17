// components/pages/next-gen/sections/HorizontalScrollSection.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Star, Users, Calendar, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Define card content with images
const cardContent = [
  {
    stage: "Foundation",
    title: "Core Journalism Skills",
    description:
      "Master the fundamentals of journalism, including news writing, research methods, and media ethics.",
    image: "/assets/images/hero/hero-1.jpg",
    stats: {
      duration: "2 Months",
      students: "50+",
      rating: "4.9"
    },
    color: "from-blue-500/20 to-blue-900/90"
  },
  {
    stage: "Digital",
    title: "Digital Media Training",
    description:
      "Learn modern digital storytelling techniques, social media management, and content creation.",
    image: "/assets/images/hero/hero-2.jpg",
    stats: {
      duration: "2 Months",
      students: "45+",
      rating: "4.8"
    },
    color: "from-purple-500/20 to-purple-900/90"
  },
  {
    stage: "Specialization",
    title: "Choose Your Path",
    description:
      "Specialize in investigative journalism, broadcast, or multimedia storytelling.",
    image: "/assets/images/hero/hero-3.jpg",
    stats: {
      duration: "3 Months",
      students: "40+",
      rating: "4.9"
    },
    color: "from-orange-500/20 to-orange-900/90"
  },
  {
    stage: "Practical",
    title: "Hands-on Experience",
    description:
      "Work on real stories and projects with experienced mentors and media organizations.",
    image: "/assets/images/hero/hero-4.jpg",
    stats: {
      duration: "3 Months",
      students: "35+",
      rating: "4.7"
    },
    color: "from-green-500/20 to-green-900/90"
  },
  {
    stage: "Innovation",
    title: "Media Innovation",
    description:
      "Explore emerging technologies and innovative storytelling formats in journalism.",
    image: "/assets/images/hero/hero-1.jpg",
    stats: {
      duration: "2 Months",
      students: "30+",
      rating: "4.8"
    },
    color: "from-pink-500/20 to-pink-900/90"
  },
  {
    stage: "Leadership",
    title: "Media Leadership",
    description:
      "Develop leadership skills and learn about media management and entrepreneurship.",
    image: "/assets/images/hero/hero-2.jpg",
    stats: {
      duration: "2 Months",
      students: "25+",
      rating: "4.9"
    },
    color: "from-sky-500/20 to-sky-900/90"
  }
];

const HorizontalScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        snap: {
          snapTo: 1 / (cardContent.length - 1),
          duration: { min: 0.2, max: 0.3 },
          delay: 0
        }
      }
    });

    tl.to(container, {
      x: -(container.scrollWidth - window.innerWidth),
      ease: "none"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-slate-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div
        ref={containerRef}
        className="absolute h-full flex items-center gap-8 px-8 will-change-transform"
      >
        {cardContent.map((card, index) => (
          <motion.div
            key={index}
            className="relative min-w-[500px] h-[600px] rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {/* Background Image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${card.color} backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-none`}
            />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                    Stage {index + 1}
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                    {card.stage}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-sky-400 transition-colors">
                  {card.title}
                </h3>

                <p className="text-lg text-white/80 mb-6 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Stats */}
              <div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sky-400" />
                    <span className="text-white/80">{card.stats.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-sky-400" />
                    <span className="text-white/80">{card.stats.students}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-sky-400" />
                    <span className="text-white/80">{card.stats.rating}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-sky-400 group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;

// // components/pages/next-gen/sections/HorizontalScrollSection.tsx
// "use client";

// import React, { useRef, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const HorizontalScrollSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const container = containerRef.current;

//     if (!section || !container) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         pin: true,
//         start: "top top",
//         end: "+=3000",
//         scrub: 1,
//         snap: {
//           snapTo: 1 / 3,
//           duration: { min: 0.2, max: 0.3 },
//           delay: 0
//         }
//       }
//     });

//     tl.to(container, {
//       x: -(container.scrollWidth - window.innerWidth),
//       ease: "none"
//     });

//     return () => {
//       tl.kill();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-screen overflow-hidden bg-slate-900"
//     >
//       <div
//         ref={containerRef}
//         className="absolute h-full flex items-center gap-8 px-8 will-change-transform"
//       >
//         {/* Content cards */}
//         {Array.from({ length: 6 }).map((_, index) => (
//           <motion.div
//             key={index}
//             className="relative min-w-[500px] h-[600px] rounded-2xl overflow-hidden"
//             initial={{ opacity: 0, y: 100 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.8,
//               delay: index * 0.2,
//               ease: [0.16, 1, 0.3, 1]
//             }}
//           >
//             {/* Card content */}
//             <div className="absolute inset-0 bg-gradient-to-b from-sky-500/20 to-slate-900/90 backdrop-blur-sm p-8">
//               <h3 className="text-2xl font-bold text-white mb-4">
//                 Stage {index + 1}
//               </h3>
//               <p className="text-sky-200">
//                 Description for stage {index + 1}...
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HorizontalScrollSection;
