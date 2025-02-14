"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamically import the globe component
const GlobeComponent = dynamic(() => import("./GlobeComponent"), {
  ssr: false
});

interface Challenge {
  id: number;
  text: string;
  description: string;
  centerImage: string;
  centerText: string[];
}

const challenges: Challenge[] = [
  {
    id: 1,
    text: "Problem-Centered\nReporting",
    description:
      "Modern journalism often focuses on sensational stories rather than addressing core societal issues.",
    centerImage: "/assets/images/hero/hero-1.jpg",
    centerText: ["Shifting Focus", "to Core", "Issues"]
  },
  {
    id: 2,
    text: "News Desert\nYoung People",
    description:
      "Young audiences face a significant gap in accessing reliable, engaging news content.",
    centerImage: "/assets/images/hero/hero-2.jpg",
    centerText: ["Bridging", "the Youth", "Gap"]
  },
  {
    id: 3,
    text: "Revenue Models\nin Crisis",
    description:
      "Traditional media organizations struggle to maintain sustainable revenue streams.",
    centerImage: "/assets/images/hero/hero-3.jpg",
    centerText: ["Sustainable", "Revenue", "Models"]
  },
  {
    id: 4,
    text: "Disinformation &\nMisinformation",
    description:
      "The rapid spread of false information undermines public trust.",
    centerImage: "/assets/images/hero/hero-4.jpg",
    centerText: ["Fighting", "False", "Information"]
  },
  {
    id: 5,
    text: "Development\nCoverage",
    description:
      "Important development stories often get overshadowed by breaking news.",
    centerImage: "/assets/images/hero/hero-5.jpg",
    centerText: ["Prioritizing", "Development", "Stories"]
  },
  {
    id: 6,
    text: "Market-Required\nSkills",
    description:
      "Many journalists need additional training in digital tools and storytelling.",
    centerImage: "/assets/images/hero/hero-6.jpg",
    centerText: ["Building", "Modern", "Skills"]
  }
];

const BackgroundElements = () => (
  <>
    {/* Base Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

    {/* Background Image */}
    <div
      className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-10"
      style={{ mixBlendMode: "overlay" }}
    />

    {/* Grain Overlay */}
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/20" />
  </>
);

const ChallengeSection: React.FC = () => {
  const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHoverStart = useCallback((id: number) => {
    setHoveredChallenge(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredChallenge(null);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <BackgroundElements />

      <div className="relative max-w-[90vw] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            The Media Crisis
            <motion.div
              className="h-1 w-24 sm:w-32 bg-gradient-to-r from-sky-500 to-blue-500 mx-auto mt-4 sm:mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p
            className="mx-auto text-center max-w-6xl text-gray-300 
                     text-base xs:text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl
                     leading-relaxed sm:leading-relaxed"
          >
            Exploring the key challenges facing modern media landscape
          </p>
        </motion.div>

        {/* Main Visualization Container */}
        <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
          <div className="w-full aspect-square max-w-[min(90vh,90vw)] lg:max-w-[80vh]">
            {/* SVG Content */}
            <svg viewBox="0 0 600 600" className="w-full h-full">
              {/* Outer circle */}
              <circle
                cx="300"
                cy="300"
                r="240"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
                className="opacity-50"
              />

              {/* Challenge nodes */}
              {challenges.map((challenge, index) => {
                const angle =
                  (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
                const x = 300 + 240 * Math.cos(angle);
                const y = 300 + 240 * Math.sin(angle);
                const isRight = x > 300;

                return (
                  <g key={challenge.id} transform={`translate(${x},${y})`}>
                    <motion.g
                      whileHover={{ scale: 1.05 }}
                      onHoverStart={() => handleHoverStart(challenge.id)}
                      onHoverEnd={handleHoverEnd}
                      className="cursor-pointer"
                      style={{ originX: isRight ? 0 : 1, originY: 0.5 }}
                    >
                      {/* Node dot */}
                      <circle
                        r="3"
                        className={cn(
                          "fill-white transition-all duration-300",
                          hoveredChallenge === challenge.id
                            ? "opacity-100"
                            : "opacity-60"
                        )}
                      />

                      {/* Node text */}
                      <text
                        textAnchor={isRight ? "start" : "end"}
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="13"
                        x={isRight ? 15 : -15}
                        className={cn(
                          "font-light transition-all duration-300 select-none",
                          hoveredChallenge === challenge.id
                            ? "opacity-100"
                            : "opacity-60"
                        )}
                      >
                        {challenge.text.split("\n").map((line, i) => (
                          <tspan
                            key={i}
                            x={isRight ? 15 : -15}
                            dy={i === 0 ? "-0.6em" : "1.2em"}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </motion.g>
                  </g>
                );
              })}

              {/* Center circle */}
              <g transform="translate(300,300)">
                {/* Background circle */}
                <circle
                  r="220"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                  className="opacity-50"
                />

                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.g
                    key={hoveredChallenge || "default"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {hoveredChallenge ? (
                      <>
                        <defs>
                          <clipPath id="circleClip">
                            <circle r="220" cx="0" cy="0" />
                          </clipPath>
                        </defs>

                        <image
                          href={challenges[hoveredChallenge - 1].centerImage}
                          x="-220"
                          y="-220"
                          width="440"
                          height="440"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath="url(#circleClip)"
                          className="opacity-40"
                        />

                        <circle r="220" fill="rgba(0,0,0,0.6)" />

                        <text
                          textAnchor="middle"
                          fill="white"
                          fontSize="24"
                          className="font-light select-none"
                        >
                          {challenges[hoveredChallenge - 1].centerText.map(
                            (line, i) => (
                              <tspan
                                key={i}
                                x="0"
                                dy={i === 0 ? "-1em" : "1.5em"}
                              >
                                {line}
                              </tspan>
                            )
                          )}
                        </text>
                      </>
                    ) : (
                      <g>
                        <foreignObject
                          x="-220"
                          y="-220"
                          width="440"
                          height="440"
                        >
                          <div className="w-full h-full relative overflow-hidden rounded-full">
                            {mounted && <GlobeComponent />}
                          </div>
                        </foreignObject>

                        <text
                          textAnchor="middle"
                          fill="white"
                          fontSize="24"
                          className="font-light select-none pointer-events-none"
                        >
                          <tspan x="0" dy="0">
                            Choose a challenge...
                          </tspan>
                        </text>
                      </g>
                    )}
                  </motion.g>
                </AnimatePresence>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;

// "use client";

// import React, { useState, useCallback, useLayoutEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// interface Challenge {
//   id: number;
//   text: string;
//   description: string;
//   centerImage: string;
//   centerText: string[];
// }

// const challenges: Challenge[] = [
//   {
//     id: 1,
//     text: "Problem-Centered\nReporting",
//     description:
//       "Modern journalism often focuses on sensational stories rather than addressing core societal issues.",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Shifting Focus", "to Core", "Issues"]
//   },
//   {
//     id: 2,
//     text: "News Deserts for\nYoung People",
//     description:
//       "Young audiences face a significant gap in accessing reliable, engaging news content.",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Bridging", "the Youth", "Gap"]
//   },
//   {
//     id: 3,
//     text: "Revenue Models\nin Crisis",
//     description:
//       "Traditional media organizations struggle to maintain sustainable revenue streams.",
//     centerImage: "/assets/images/hero/hero-3.jpg",
//     centerText: ["Sustainable", "Revenue", "Models"]
//   },
//   {
//     id: 4,
//     text: "Disinformation &\nMisinformation",
//     description:
//       "The rapid spread of false information undermines public trust.",
//     centerImage: "/assets/images/hero/hero-4.jpg",
//     centerText: ["Fighting", "False", "Information"]
//   },
//   {
//     id: 5,
//     text: "Lack of Development\nCoverage",
//     description:
//       "Important development stories often get overshadowed by breaking news.",
//     centerImage: "/assets/images/hero/hero-5.jpg",
//     centerText: ["Prioritizing", "Development", "Stories"]
//   },
//   {
//     id: 6,
//     text: "Market-Required\nSkills",
//     description:
//       "Many journalists need additional training in digital tools and storytelling.",
//     centerImage: "/assets/images/hero/hero-6.jpg",
//     centerText: ["Building", "Modern", "Skills"]
//   }
// ];

// const RotatingGlobe = () => {
//   const chartRef = useRef<am4maps.MapChart | null>(null);
//   const animationTimeoutRef = useRef<NodeJS.Timeout>();

//   useLayoutEffect(() => {
//     // Themes
//     am4core.useTheme(am4themes_animated);

//     // Create chart
//     const chart = am4core.create("chartdiv", am4maps.MapChart);
//     chart.geodata = am4geodata_worldLow;
//     chart.projection = new am4maps.projections.Orthographic();
//     chart.panBehavior = "rotateLongLat";
//     chart.deltaLatitude = -20;
//     chart.padding(20, 20, 20, 20);

//     // Configure series
//     const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
//     polygonSeries.useGeodata = true;
//     polygonSeries.mapPolygons.template.fill = am4core.color("#FF6633");
//     polygonSeries.mapPolygons.template.stroke = am4core.color("#000033");
//     polygonSeries.mapPolygons.template.strokeWidth = 0.5;

//     // Add graticules
//     const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
//     graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
//     graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
//     graticuleSeries.fitExtent = false;

//     // Configure background
//     chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
//     chart.backgroundSeries.mapPolygons.template.polygon.fill =
//       am4core.color("#ffffff");

//     chartRef.current = chart;

//     // Start rotation animation with a delay
//     animationTimeoutRef.current = setTimeout(() => {
//       if (chart && !chart.isDisposed()) {
//         chart.animate(
//           {
//             property: "deltaLongitude",
//             to: 100000
//           },
//           20000000
//         );
//       }
//     }, 2000);

//     return () => {
//       if (animationTimeoutRef.current) {
//         clearTimeout(animationTimeoutRef.current);
//       }
//       chart.dispose();
//     };
//   }, []);

//   return (
//     <div
//       id="chartdiv"
//       className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
//       style={{
//         backgroundColor: "transparent",
//         mixBlendMode: "overlay"
//       }}
//     />
//   );
// };

// const ChallengeSection: React.FC = () => {
//   const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);

//   const handleHoverStart = useCallback((id: number) => {
//     setHoveredChallenge(id);
//   }, []);

//   const handleHoverEnd = useCallback(() => {
//     setHoveredChallenge(null);
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-[#1C1E26] py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden relative">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-5" />

//       {/* Grain Effect */}
//       <div
//         className="absolute inset-0 opacity-20"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
//           backgroundRepeat: "repeat",
//           mixBlendMode: "overlay"
//         }}
//       />

//       <div className="relative max-w-[90vw] lg:max-w-7xl mx-auto z-10">
//         <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
//           {/* Main Visualization */}
//           <div className="w-full aspect-square max-w-[90vh]">
//             <svg viewBox="0 0 600 600" className="w-full h-full">
//               {/* Outer circle */}
//               <circle
//                 cx="300"
//                 cy="300"
//                 r="240"
//                 fill="none"
//                 stroke="rgba(255,255,255,0.2)"
//                 strokeWidth="1"
//                 className="opacity-30"
//               />

//               {/* Challenge circles */}
//               {challenges.map((challenge, index) => {
//                 const angle =
//                   (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
//                 const x = 300 + 240 * Math.cos(angle);
//                 const y = 300 + 240 * Math.sin(angle);
//                 const isRight = x > 300;

//                 return (
//                   <g key={challenge.id} transform={`translate(${x},${y})`}>
//                     <motion.g
//                       whileHover={{ scale: 1.05 }}
//                       onHoverStart={() => handleHoverStart(challenge.id)}
//                       onHoverEnd={handleHoverEnd}
//                       className="cursor-pointer"
//                       style={{ originX: isRight ? 0 : 1, originY: 0.5 }}
//                     >
//                       {/* Challenge dot */}
//                       <circle
//                         r="4"
//                         className={cn(
//                           "fill-white transition-all duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       />

//                       {/* Challenge text */}
//                       <text
//                         textAnchor={isRight ? "start" : "end"}
//                         dominantBaseline="middle"
//                         fill="white"
//                         fontSize="14"
//                         x={isRight ? 12 : -12}
//                         className={cn(
//                           "font-light transition-all duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       >
//                         {challenge.text.split("\n").map((line, i) => (
//                           <tspan
//                             key={i}
//                             x={isRight ? 12 : -12}
//                             dy={i === 0 ? 0 : "1.2em"}
//                           >
//                             {line}
//                           </tspan>
//                         ))}
//                       </text>
//                     </motion.g>
//                   </g>
//                 );
//               })}

//               {/* Center circle */}
//               <g transform="translate(300,300)">
//                 <circle
//                   r="220"
//                   fill="none"
//                   className="opacity-100"
//                   stroke="rgba(255,255,255,0.1)"
//                   strokeWidth="1"
//                 />

//                 <AnimatePresence mode="wait">
//                   <motion.g
//                     key={hoveredChallenge || "default"}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {hoveredChallenge ? (
//                       <>
//                         <defs>
//                           <clipPath id="circleClip">
//                             <circle r="220" cx="0" cy="0" />
//                           </clipPath>
//                         </defs>

//                         <image
//                           href={challenges[hoveredChallenge - 1].centerImage}
//                           x="-220"
//                           y="-220"
//                           width="440"
//                           height="440"
//                           preserveAspectRatio="xMidYMid slice"
//                           clipPath="url(#circleClip)"
//                           className="opacity-40"
//                         />

//                         <circle r="220" fill="rgba(0,0,0,0.5)" />

//                         <text
//                           textAnchor="middle"
//                           fill="white"
//                           fontSize="24"
//                           className="font-light"
//                         >
//                           {challenges[hoveredChallenge - 1].centerText.map(
//                             (line, i) => (
//                               <tspan
//                                 key={i}
//                                 x="0"
//                                 dy={i === 0 ? "-1em" : "1.5em"}
//                               >
//                                 {line}
//                               </tspan>
//                             )
//                           )}
//                         </text>
//                       </>
//                     ) : (
//                       <g>
//                         <foreignObject
//                           x="-220"
//                           y="-220"
//                           width="440"
//                           height="440"
//                         >
//                           <div className="w-full h-full relative overflow-hidden rounded-full">
//                             <RotatingGlobe />
//                             <div className="absolute inset-0 bg-black/30" />
//                           </div>
//                         </foreignObject>

//                         <text
//                           textAnchor="middle"
//                           fill="white"
//                           fontSize="24"
//                           className="font-light pointer-events-none"
//                         >
//                           <tspan x="0" dy="0">
//                             Choose a challenge...
//                           </tspan>
//                         </text>
//                       </g>
//                     )}
//                   </motion.g>
//                 </AnimatePresence>
//               </g>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChallengeSection;

// "use client";

// import React, {
//   useState,
//   useCallback,
//   useLayoutEffect,
//   useRef,
//   useEffect
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";
// import dynamic from "next/dynamic";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// interface Challenge {
//   id: number;
//   text: string;
//   description: string;
//   icon: string;
//   centerImage: string;
//   centerText: string[];
// }

// const challenges: Challenge[] = [
//   {
//     id: 1,
//     text: "Problem-Centered Reporting",
//     description:
//       "Modern journalism often focuses on sensational stories rather than addressing core societal issues that matter most to communities.",
//     icon: "📰",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Shifting Focus", "to Core", "Issues"]
//   },
//   {
//     id: 2,
//     text: "News Deserts for Young People",
//     description:
//       "Young audiences face a significant gap in accessing reliable, engaging news content tailored to their interests.",
//     icon: "👥",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Bridging", "the Youth", "Gap"]
//   },
//   {
//     id: 3,
//     text: "Revenue Models in Crisis",
//     description:
//       "Traditional media organizations struggle to maintain sustainable revenue streams in the digital age.",
//     icon: "💰",
//     centerImage: "/assets/images/hero/hero-3.jpg",
//     centerText: ["Sustainable", "Revenue", "Models"]
//   },
//   {
//     id: 4,
//     text: "Disinformation & Misinformation",
//     description:
//       "The rapid spread of false information undermines public trust and poses significant challenges.",
//     icon: "🚫",
//     centerImage: "/assets/images/hero/hero-4.jpg",
//     centerText: ["Fighting", "False", "Information"]
//   },
//   {
//     id: 5,
//     text: "Lack of Development Coverage",
//     description:
//       "Important development stories often get overshadowed by breaking news and immediate events.",
//     icon: "📈",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Prioritizing", "Development", "Stories"]
//   },
//   {
//     id: 6,
//     text: "Lack Market-Required Skills",
//     description:
//       "Many journalists need additional training in digital tools and modern storytelling techniques.",
//     icon: "🎯",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Building", "Modern", "Skills"]
//   }
// ];

// const BackgroundElements = () => (
//   <>
//     <div
//       className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-10"
//       style={{ mixBlendMode: "overlay" }}
//     />
//     <div
//       className="pointer-events-none absolute inset-0 opacity-30"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
//       }}
//     />
//     <div className="absolute inset-0 bg-black/20" />
//   </>
// );

// const RotatingGlobe = () => {
//   const chartDiv = useRef<HTMLDivElement>(null);
//   const chart = useRef<am4maps.MapChart | null>(null);

//   useEffect(() => {
//     if (!chartDiv.current) return;

//     // Initialize chart
//     am4core.useTheme(am4themes_animated);
//     const x = am4core.create(chartDiv.current, am4maps.MapChart);
//     chart.current = x;

//     // Configure chart
//     x.geodata = am4geodata_worldLow;
//     x.projection = new am4maps.projections.Orthographic();
//     x.panBehavior = "rotateLongLat";
//     x.deltaLatitude = -20;
//     x.padding(20, 20, 20, 20);

//     // Create and configure series
//     const polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
//     polygonSeries.useGeodata = true;

//     const polygonTemplate = polygonSeries.mapPolygons.template;
//     polygonTemplate.fill = am4core.color("#FF6633");
//     polygonTemplate.stroke = am4core.color("#000033");
//     polygonTemplate.strokeWidth = 0.5;

//     const graticuleSeries = x.series.push(new am4maps.GraticuleSeries());
//     graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
//     graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
//     graticuleSeries.fitExtent = false;

//     x.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
//     x.backgroundSeries.mapPolygons.template.polygon.fill =
//       am4core.color("#ffffff");

//     // Start animation after chart is ready
//     let timeout: NodeJS.Timeout;
//     x.events.on("ready", () => {
//       timeout = setTimeout(() => {
//         if (x) {
//           x.animate(
//             {
//               property: "deltaLongitude",
//               to: 100000
//             },
//             20000000
//           );
//         }
//       }, 3000);
//     });

//     return () => {
//       clearTimeout(timeout);
//       x.dispose();
//     };
//   }, []);

//   return (
//     <div
//       ref={chartDiv}
//       className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
//       style={{
//         backgroundColor: "transparent",
//         mixBlendMode: "overlay"
//       }}
//     />
//   );
// };

// const DynamicRotatingGlobe = dynamic(() => Promise.resolve(RotatingGlobe), {
//   ssr: false
// });

// const ChallengeSection: React.FC = () => {
//   const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);
//   const [screenSize, setScreenSize] = useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 0,
//     height: typeof window !== "undefined" ? window.innerHeight : 0
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const calculateDimensions = () => {
//     const baseRadius = Math.min(screenSize.width, screenSize.height) * 0.35;
//     const textDistance = baseRadius * 1.2; // Increased for better text spacing
//     return { baseRadius, textDistance };
//   };

//   const { baseRadius, textDistance } = calculateDimensions();

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden relative">
//       <BackgroundElements />

//       <div className="relative max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-8 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 sm:mb-6 tracking-tight">
//             The Challenge We Face
//             <motion.div
//               className="h-1.5 w-24 sm:w-32 bg-white/20 mx-auto mt-4 sm:mt-6 rounded-full"
//               initial={{ scaleX: 0, opacity: 0 }}
//               whileInView={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             />
//           </h2>
//         </motion.div>

//         <div className="relative flex justify-center items-center">
//           <div className="w-full aspect-square max-w-[90vh]">
//             <svg viewBox="0 0 600 600" className="w-full h-full">
//               {/* Challenge circles with improved hover areas */}
//               {challenges.map((challenge, index) => {
//                 const angle =
//                   (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
//                 const x = 300 + textDistance * Math.cos(angle);
//                 const y = 300 + textDistance * Math.sin(angle);
//                 const isRight = x > 300;

//                 return (
//                   <g key={challenge.id} transform={`translate(${x},${y})`}>
//                     <motion.g
//                       whileHover={{ scale: 1.05 }}
//                       onHoverStart={() => setHoveredChallenge(challenge.id)}
//                       onHoverEnd={() => setHoveredChallenge(null)}
//                       className="cursor-pointer"
//                     >
//                       {/* Invisible larger hit area */}
//                       <circle
//                         r="30"
//                         fill="transparent"
//                         className="cursor-pointer"
//                       />

//                       {/* Visible dot */}
//                       <circle
//                         r="6"
//                         className={cn(
//                           "fill-white transition-opacity duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       />

//                       {/* Text with improved positioning */}
//                       <text
//                         textAnchor={isRight ? "start" : "end"}
//                         dominantBaseline="middle"
//                         fill="white"
//                         fontSize="16"
//                         x={isRight ? 20 : -20}
//                         className={cn(
//                           "font-light transition-opacity duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       >
//                         <tspan dy="0">{challenge.text}</tspan>
//                       </text>
//                     </motion.g>
//                   </g>
//                 );
//               })}

//               {/* Center content */}
//               <g transform="translate(300,300)">
//                 <circle
//                   r={baseRadius}
//                   fill="none"
//                   className="opacity-100"
//                   stroke="rgba(255,255,255,0.1)"
//                   strokeWidth="1"
//                 />

//                 <AnimatePresence mode="wait">
//                   <motion.g
//                     key={hoveredChallenge || "default"}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {hoveredChallenge ? (
//                       <>
//                         {/* Circular image clipping */}
//                         <defs>
//                           <clipPath id="circleClip">
//                             <circle r="220" cx="0" cy="0" />
//                           </clipPath>
//                         </defs>

//                         {/* Background image */}
//                         <image
//                           href={challenges[hoveredChallenge - 1].centerImage}
//                           x="-220"
//                           y="-220"
//                           width="440"
//                           height="440"
//                           preserveAspectRatio="xMidYMid slice"
//                           clipPath="url(#circleClip)"
//                           className="opacity-40"
//                         />

//                         {/* Dark overlay */}
//                         <circle r="220" fill="rgba(0,0,0,0.5)" />

//                         {/* Centered text */}
//                         <text
//                           textAnchor="middle"
//                           fill="white"
//                           fontSize="24"
//                           className="font-light"
//                           y="0"
//                         >
//                           {challenges[hoveredChallenge - 1].centerText.map(
//                             (line, i) => (
//                               <tspan
//                                 key={i}
//                                 x="0"
//                                 dy={i === 0 ? "-1em" : "1.5em"}
//                               >
//                                 {line}
//                               </tspan>
//                             )
//                           )}
//                         </text>
//                       </>
//                     ) : (
//                       // Default state with globe
//                       <g>
//                         <foreignObject
//                           x={-baseRadius}
//                           y={-baseRadius}
//                           width={baseRadius * 2}
//                           height={baseRadius * 2}
//                         >
//                           <div className="w-full h-full relative overflow-hidden rounded-full">
//                             <DynamicRotatingGlobe />
//                             <div className="absolute inset-0 bg-black/30" />
//                           </div>
//                         </foreignObject>

//                         <text
//                           textAnchor="middle"
//                           fill="white"
//                           fontSize="24"
//                           className="font-light pointer-events-none"
//                         >
//                           <tspan x="0" dy="0">
//                             Choose a path...
//                           </tspan>
//                         </text>
//                       </g>
//                     )}
//                   </motion.g>
//                 </AnimatePresence>
//               </g>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChallengeSection;

// "use client";

// import React, { useState, useCallback, useLayoutEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";
// import dynamic from "next/dynamic";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// interface Challenge {
//   id: number;
//   text: string;
//   description: string;
//   icon: string;
//   centerImage: string;
//   centerText: string[];
// }

// const challenges: Challenge[] = [
//   {
//     id: 1,
//     text: "Problem-Centered Reporting",
//     description:
//       "Modern journalism often focuses on sensational stories rather than addressing core societal issues that matter most to communities.",
//     icon: "📰",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Shifting Focus", "to Core", "Issues"]
//   },
//   {
//     id: 2,
//     text: "News Deserts for Young People",
//     description:
//       "Young audiences face a significant gap in accessing reliable, engaging news content tailored to their interests.",
//     icon: "👥",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Bridging", "the Youth", "Gap"]
//   },
//   {
//     id: 3,
//     text: "Revenue Models in Crisis",
//     description:
//       "Traditional media organizations struggle to maintain sustainable revenue streams in the digital age.",
//     icon: "💰",
//     centerImage: "/assets/images/hero/hero-3.jpg",
//     centerText: ["Sustainable", "Revenue", "Models"]
//   },
//   {
//     id: 4,
//     text: "Disinformation & Misinformation",
//     description:
//       "The rapid spread of false information undermines public trust and poses significant challenges.",
//     icon: "🚫",
//     centerImage: "/assets/images/hero/hero-4.jpg",
//     centerText: ["Fighting", "False", "Information"]
//   },
//   {
//     id: 5,
//     text: "Lack of Development Coverage",
//     description:
//       "Important development stories often get overshadowed by breaking news and immediate events.",
//     icon: "📈",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Prioritizing", "Development", "Stories"]
//   },
//   {
//     id: 6,
//     text: "Lack Market-Required Skills",
//     description:
//       "Many journalists need additional training in digital tools and modern storytelling techniques.",
//     icon: "🎯",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Building", "Modern", "Skills"]
//   }
// ];

// const BackgroundElements = () => (
//   <>
//     {/* Background Image */}
//     <div
//       className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-10"
//       style={{ mixBlendMode: "overlay" }}
//     />

//     {/* Grain Overlay */}
//     <div
//       className="pointer-events-none absolute inset-0 opacity-30"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
//       }}
//     />

//     {/* Dark Overlay */}
//     <div className="absolute inset-0 bg-black/20" />
//   </>
// );

// const RotatingGlobe = () => {
//   const chartRef = useRef<am4maps.MapChart | null>(null);

//   useLayoutEffect(() => {
//     // Themes
//     am4core.useTheme(am4themes_animated);

//     // Create chart
//     const chart = am4core.create("chartdiv", am4maps.MapChart);

//     // Set map definition
//     chart.geodata = am4geodata_worldLow;

//     // Set projection
//     chart.projection = new am4maps.projections.Orthographic();
//     chart.panBehavior = "rotateLongLat";
//     chart.deltaLatitude = -20;
//     chart.padding(20, 20, 20, 20);

//     // Create map polygon series
//     const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
//     polygonSeries.useGeodata = true;

//     // Configure series
//     const polygonTemplate = polygonSeries.mapPolygons.template;
//     polygonTemplate.fill = am4core.color("#FF6633");
//     polygonTemplate.stroke = am4core.color("#000033");
//     polygonTemplate.strokeWidth = 0.5;

//     // Add graticules
//     const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
//     graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
//     graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
//     graticuleSeries.fitExtent = false;

//     // Configure background
//     chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
//     chart.backgroundSeries.mapPolygons.template.polygon.fill =
//       am4core.color("#ffffff");

//     // Start rotation animation
//     setTimeout(() => {
//       chart.animate(
//         {
//           property: "deltaLongitude",
//           to: 100000
//         },
//         20000000
//       );
//     }, 3000);

//     chartRef.current = chart;

//     return () => {
//       chart.dispose();
//     };
//   }, []);

//   return (
//     <div
//       id="chartdiv"
//       className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
//       style={{
//         backgroundColor: "transparent",
//         mixBlendMode: "overlay"
//       }}
//     />
//   );
// };

// // Dynamically import the RotatingGlobe component with no SSR
// const DynamicRotatingGlobe = dynamic(() => Promise.resolve(RotatingGlobe), {
//   ssr: false
// });

// const ChallengeSection: React.FC = () => {
//   const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);

//   const handleHoverStart = useCallback((id: number) => {
//     setHoveredChallenge(id);
//   }, []);

//   const handleHoverEnd = useCallback(() => {
//     setHoveredChallenge(null);
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden relative">
//       <BackgroundElements />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-8 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">
//             The Challenge We Face
//             <motion.div
//               className="h-1.5 w-24 sm:w-32 bg-white/20 mx-auto mt-4 sm:mt-6 rounded-full"
//               initial={{ scaleX: 0, opacity: 0 }}
//               whileInView={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             />
//           </h2>
//         </motion.div>

//         <div className="relative flex justify-center items-center">
//           {/* Main Visualization */}
//           <div className="w-full max-w-4xl mx-auto">
//             <svg viewBox="0 0 600 600" className="w-full h-full">
//               {/* Outer circle */}
//               <circle
//                 cx="300"
//                 cy="300"
//                 r="240"
//                 fill="none"
//                 stroke="rgba(255,255,255,0.2)"
//                 strokeWidth="1"
//                 className="opacity-30"
//               />

//               {/* Challenge circles */}
//               {challenges.map((challenge, index) => {
//                 const angle =
//                   (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
//                 const x = 300 + 240 * Math.cos(angle);
//                 const y = 300 + 240 * Math.sin(angle);
//                 const isRight = x > 300;

//                 return (
//                   <g key={challenge.id} transform={`translate(${x},${y})`}>
//                     <motion.g
//                       whileHover={{ scale: 1.05 }}
//                       onHoverStart={() => handleHoverStart(challenge.id)}
//                       onHoverEnd={handleHoverEnd}
//                       className="cursor-pointer"
//                       style={{ originX: isRight ? 0 : 1, originY: 0.5 }}
//                     >
//                       <circle
//                         r="6"
//                         className={cn(
//                           "fill-white transition-opacity duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       />
//                       <text
//                         textAnchor={isRight ? "start" : "end"}
//                         dominantBaseline="middle"
//                         fill="white"
//                         fontSize="16"
//                         x={isRight ? 15 : -15}
//                         className={cn(
//                           "font-light pointer-events-none transition-opacity duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       >
//                         {challenge.text}
//                       </text>
//                     </motion.g>
//                   </g>
//                 );
//               })}

//               {/* Center circle with dynamic content */}
//               <g transform="translate(300,300)">
//                 {/* Large background circle */}
//                 <circle
//                   r="220"
//                   fill="none"
//                   className="opacity-100"
//                   stroke="rgba(255,255,255,0.1)"
//                   strokeWidth="1"
//                 />

//                 {/* Content container */}
//                 <AnimatePresence mode="wait">
//                   <motion.g
//                     key={hoveredChallenge || "default"}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {hoveredChallenge ? (
//                       <>
//                         {/* Circular image clipping */}
//                         <defs>
//                           <clipPath id="circleClip">
//                             <circle r="220" cx="0" cy="0" />
//                           </clipPath>
//                         </defs>

//                         {/* Background image */}
//                         <image
//                           href={challenges[hoveredChallenge - 1].centerImage}
//                           x="-220"
//                           y="-220"
//                           width="440"
//                           height="440"
//                           preserveAspectRatio="xMidYMid slice"
//                           clipPath="url(#circleClip)"
//                           className="opacity-40"
//                         />

//                         {/* Dark overlay */}
//                         <circle r="220" fill="rgba(0,0,0,0.5)" />

//                         {/* Centered text */}
//                         <text
//                           textAnchor="middle"
//                           fill="white"
//                           fontSize="24"
//                           className="font-light"
//                           y="0"
//                         >
//                           {challenges[hoveredChallenge - 1].centerText.map(
//                             (line, i) => (
//                               <tspan
//                                 key={i}
//                                 x="0"
//                                 dy={i === 0 ? "-1em" : "1.5em"}
//                               >
//                                 {line}
//                               </tspan>
//                             )
//                           )}
//                         </text>
//                       </>
//                     ) : (
//                       <g>
//                         {/* Globe container */}
//                         <foreignObject
//                           x="-220"
//                           y="-220"
//                           width="440"
//                           height="440"
//                         >
//                           <div className="w-full h-full relative overflow-hidden rounded-full">
//                             <DynamicRotatingGlobe />
//                             {/* Dark overlay for better text visibility */}
//                             <div className="absolute inset-0 bg-black/30" />
//                           </div>
//                         </foreignObject>

//                         {/* "Choose a path" text */}
//                         <text
//                           textAnchor="middle"
//                           fill="white"
//                           fontSize="24"
//                           className="font-light pointer-events-none"
//                         >
//                           <tspan x="0" dy="0">
//                             Choose a path...
//                           </tspan>
//                         </text>
//                       </g>
//                     )}
//                   </motion.g>
//                 </AnimatePresence>
//               </g>

//               {/* SVG Filters */}
//               <defs>
//                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                   <feGaussianBlur stdDeviation="3" result="blur" />
//                   <feFlood floodColor="#0EA5E9" floodOpacity="0.4" />
//                   <feComposite in2="blur" operator="in" />
//                   <feMerge>
//                     <feMergeNode />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               </defs>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChallengeSection;

// "use client";

// import React, { useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";

// interface Challenge {
//   id: number;
//   text: string;
//   description: string;
//   icon: string;
//   centerImage: string;
//   centerText: string[];
// }

// const challenges: Challenge[] = [
//   {
//     id: 1,
//     text: "Problem-Centered Reporting",
//     description:
//       "Modern journalism often focuses on sensational stories rather than addressing core societal issues that matter most to communities.",
//     icon: "📰",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Shifting Focus", "to Core", "Issues"]
//   },
//   {
//     id: 2,
//     text: "News Deserts for Young People",
//     description:
//       "Young audiences face a significant gap in accessing reliable, engaging news content tailored to their interests.",
//     icon: "👥",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Bridging", "the Youth", "Gap"]
//   },
//   {
//     id: 3,
//     text: "Revenue Models in Crisis",
//     description:
//       "Traditional media organizations struggle to maintain sustainable revenue streams in the digital age.",
//     icon: "💰",
//     centerImage: "/assets/images/hero/hero-3.jpg",
//     centerText: ["Sustainable", "Revenue", "Models"]
//   },
//   {
//     id: 4,
//     text: "Disinformation & Misinformation",
//     description:
//       "The rapid spread of false information undermines public trust and poses significant challenges.",
//     icon: "🚫",
//     centerImage: "/assets/images/hero/hero-4.jpg",
//     centerText: ["Fighting", "False", "Information"]
//   },
//   {
//     id: 5,
//     text: "Lack of Development Coverage",
//     description:
//       "Important development stories often get overshadowed by breaking news and immediate events.",
//     icon: "📈",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Prioritizing", "Development", "Stories"]
//   },
//   {
//     id: 6,
//     text: "Lack Market-Required Skills",
//     description:
//       "Many journalists need additional training in digital tools and modern storytelling techniques.",
//     icon: "🎯",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Building", "Modern", "Skills"]
//   }
// ];

// const BackgroundElements = () => (
//   <>
//     {/* Background Image */}
//     <div
//       className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-10"
//       style={{ mixBlendMode: "overlay" }}
//     />

//     {/* Grain Overlay */}
//     <div
//       className="pointer-events-none absolute inset-0 opacity-30"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
//       }}
//     />

//     {/* Dark Overlay */}
//     <div className="absolute inset-0 bg-black/20" />
//   </>
// );

// const ChallengeSection: React.FC = () => {
//   const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);

//   const handleHoverStart = useCallback((id: number) => {
//     setHoveredChallenge(id);
//   }, []);

//   const handleHoverEnd = useCallback(() => {
//     setHoveredChallenge(null);
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden relative">
//       <BackgroundElements />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-8 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">
//             The Challenge We Face
//             <motion.div
//               className="h-1.5 w-24 sm:w-32 bg-white/20 mx-auto mt-4 sm:mt-6 rounded-full"
//               initial={{ scaleX: 0, opacity: 0 }}
//               whileInView={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             />
//           </h2>
//         </motion.div>

//         <div className="relative flex justify-center items-center">
//           {/* Main Visualization */}
//           <div className="w-full max-w-4xl mx-auto">
//             <svg viewBox="0 0 600 600" className="w-full h-full">
//               {/* Outer circle */}
//               <circle
//                 cx="300"
//                 cy="300"
//                 r="240"
//                 fill="none"
//                 stroke="rgba(255,255,255,0.2)"
//                 strokeWidth="1"
//                 className="opacity-30"
//               />

//               {/* Challenge circles */}
//               {challenges.map((challenge, index) => {
//                 const angle =
//                   (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
//                 const x = 300 + 240 * Math.cos(angle);
//                 const y = 300 + 240 * Math.sin(angle);
//                 const isRight = x > 300;

//                 return (
//                   <g key={challenge.id} transform={`translate(${x},${y})`}>
//                     <motion.g
//                       whileHover={{ scale: 1.05 }}
//                       onHoverStart={() => handleHoverStart(challenge.id)}
//                       onHoverEnd={handleHoverEnd}
//                       className="cursor-pointer"
//                       style={{ originX: isRight ? 0 : 1, originY: 0.5 }}
//                     >
//                       <circle
//                         r="6"
//                         className={cn(
//                           "fill-white transition-opacity duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       />
//                       <text
//                         textAnchor={isRight ? "start" : "end"}
//                         dominantBaseline="middle"
//                         fill="white"
//                         fontSize="16"
//                         x={isRight ? 15 : -15}
//                         className={cn(
//                           "font-light pointer-events-none transition-opacity duration-300",
//                           hoveredChallenge === challenge.id
//                             ? "opacity-100"
//                             : "opacity-60"
//                         )}
//                       >
//                         {challenge.text}
//                       </text>
//                     </motion.g>
//                   </g>
//                 );
//               })}

//               {/* Center circle with dynamic content */}
//               <g transform="translate(300,300)">
//                 {/* Large background circle */}
//                 <circle
//                   r="220"
//                   fill="none"
//                   className="opacity-100"
//                   stroke="rgba(255,255,255,0.1)"
//                   strokeWidth="1"
//                 />

//                 {/* Content container */}
//                 <AnimatePresence mode="wait">
//                   <motion.g
//                     key={hoveredChallenge || "default"}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {hoveredChallenge ? (
//                       <>
//                         {/* Circular image clipping */}
//                         <defs>
//                           <clipPath id="circleClip">
//                             <circle r="220" cx="0" cy="0" />
//                           </clipPath>
//                         </defs>

//                         {/* Background image */}
//                         <image
//                           href={challenges[hoveredChallenge - 1].centerImage}
//                           x="-220"
//                           y="-220"
//                           width="440"
//                           height="440"
//                           preserveAspectRatio="xMidYMid slice"
//                           clipPath="url(#circleClip)"
//                           className="opacity-40"
//                         />

//                         {/* Dark overlay */}
//                         <circle r="220" fill="rgba(0,0,0,0.5)" />

//                         {/* Centered text */}
//                         <text
//                           textAnchor="middle"
//                           fill="white"
//                           fontSize="24"
//                           className="font-light"
//                           y="0"
//                         >
//                           {challenges[hoveredChallenge - 1].centerText.map(
//                             (line, i) => (
//                               <tspan
//                                 key={i}
//                                 x="0"
//                                 dy={i === 0 ? "-1em" : "1.5em"}
//                               >
//                                 {line}
//                               </tspan>
//                             )
//                           )}
//                         </text>
//                       </>
//                     ) : (
//                       <text
//                         textAnchor="middle"
//                         fill="white"
//                         fontSize="24"
//                         className="font-light"
//                       >
//                         <tspan x="0" dy="0">
//                           Choose a path...
//                         </tspan>
//                       </text>
//                     )}
//                   </motion.g>
//                 </AnimatePresence>
//               </g>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChallengeSection;

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";

// interface Challenge {
//   id: number;
//   text: string;
//   description: string;
//   icon: string;
//   centerImage: string;
//   centerText: string[];
// }

// const challenges: Challenge[] = [
//   {
//     id: 1,
//     text: "Problem-Centered Reporting",
//     description:
//       "Modern journalism often focuses on sensational stories rather than addressing core societal issues that matter most to communities.",
//     icon: "📰",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Shifting Focus", "to Core", "Issues"]
//   },
//   {
//     id: 2,
//     text: "News Deserts for Young People",
//     description:
//       "Young audiences face a significant gap in accessing reliable, engaging news content tailored to their interests.",
//     icon: "👥",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Bridging", "the Youth", "Gap"]
//   },
//   {
//     id: 3,
//     text: "Revenue Models in Crisis",
//     description:
//       "Traditional media organizations struggle to maintain sustainable revenue streams in the digital age.",
//     icon: "💰",
//     centerImage: "/assets/images/hero/hero-3.jpg",
//     centerText: ["Sustainable", "Revenue", "Models"]
//   },
//   {
//     id: 4,
//     text: "Disinformation & Misinformation",
//     description:
//       "The rapid spread of false information undermines public trust and poses significant challenges.",
//     icon: "🚫",
//     centerImage: "/assets/images/hero/hero-4.jpg",
//     centerText: ["Fighting", "False", "Information"]
//   },
//   {
//     id: 5,
//     text: "Lack of Development Coverage",
//     description:
//       "Important development stories often get overshadowed by breaking news and immediate events.",
//     icon: "📈",
//     centerImage: "/assets/images/hero/hero-1.jpg",
//     centerText: ["Prioritizing", "Development", "Stories"]
//   },
//   {
//     id: 6,
//     text: "Lack Market-Required Skills",
//     description:
//       "Many journalists need additional training in digital tools and modern storytelling techniques.",
//     icon: "🎯",
//     centerImage: "/assets/images/hero/hero-2.jpg",
//     centerText: ["Building", "Modern", "Skills"]
//   }
// ];

// const ChallengeSection: React.FC = () => {
//   const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden relative">
//       {/* Background Pattern */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, #0EA5E9 1px, transparent 0)`,
//             backgroundSize: "40px 40px"
//           }}
//         />
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             background:
//               "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 70%)"
//           }}
//         />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-8 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sky-500 mb-4 sm:mb-6 tracking-tight">
//             The Challenge We Face
//             <motion.div
//               className="h-1.5 w-24 sm:w-32 bg-orange-500 mx-auto mt-4 sm:mt-6 rounded-full"
//               initial={{ scaleX: 0, opacity: 0 }}
//               whileInView={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             />
//           </h2>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             className="text-gray-900 max-w-2xl mx-auto text-base sm:text-lg"
//           >
//             Exploring the key challenges facing modern media landscape and their
//             impact on society
//           </motion.p>
//         </motion.div>

//         <div className="relative flex justify-between items-start gap-4 sm:gap-8">

//           {/* Main Visualization */}
//           <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto">
//             <svg viewBox="0 0 600 600" className="w-full h-full">
//               {/* Outer circle */}
//               <circle
//                 cx="300"
//                 cy="300"
//                 r="240"
//                 fill="none"
//                 stroke="#F97316"
//                 strokeWidth="1.5"
//                 strokeDasharray="8 6"
//                 className="opacity-30"
//               >
//                 <animate
//                   attributeName="strokeDashoffset"
//                   from="0"
//                   to="28"
//                   dur="20s"
//                   repeatCount="indefinite"
//                 />
//               </circle>

//               {/* Orbiting particles */}
//               {[0, 120, 240].map((offset) => (
//                 <circle
//                   key={offset}
//                   className="animate-[spin_20s_linear_infinite]"
//                   r="3"
//                   fill="#F97316"
//                   opacity="0.6"
//                 >
//                   <animateMotion
//                     dur="20s"
//                     repeatCount="indefinite"
//                     path="M300,60 A240,240 0 1,1 300,540 A240,240 0 1,1 300,60"
//                     begin={`${offset / 360}s`}
//                   />
//                 </circle>
//               ))}

//               {/* Challenge circles */}
//               {challenges.map((challenge, index) => {
//                 const angle =
//                   (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
//                 const x = 300 + 240 * Math.cos(angle);
//                 const y = 300 + 240 * Math.sin(angle);

//                 return (
//                   <g key={challenge.id} transform={`translate(${x},${y})`}>
//                     <motion.g
//                       whileHover={{ scale: 1.1 }}
//                       onHoverStart={() => setHoveredChallenge(challenge.id)}
//                       onHoverEnd={() => setHoveredChallenge(null)}
//                       className="cursor-pointer"
//                     >
//                       <circle
//                         r="55"
//                         className={cn(
//                           "transition-all duration-500",
//                           hoveredChallenge === challenge.id
//                             ? "fill-orange-500"
//                             : "fill-sky-500"
//                         )}
//                         filter="url(#glow)"
//                       >
//                         <animate
//                           attributeName="opacity"
//                           values="0.9;1;0.9"
//                           dur="3s"
//                           repeatCount="indefinite"
//                           begin={`${index * 0.5}s`}
//                         />
//                       </circle>

//                       <circle
//                         r="55"
//                         fill="none"
//                         stroke="white"
//                         strokeWidth="2"
//                         className={cn(
//                           "opacity-20 transition-all duration-300",
//                           hoveredChallenge === challenge.id && "opacity-40"
//                         )}
//                       >
//                         <animate
//                           attributeName="strokeDashoffset"
//                           from="0"
//                           to="360"
//                           dur="20s"
//                           repeatCount="indefinite"
//                         />
//                       </circle>

//                       <text
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                         fill="white"
//                         fontSize="12"
//                         className="font-medium pointer-events-none"
//                       >
//                         {challenge.text.split(" ").map((word, i, arr) => (
//                           <tspan
//                             x="0"
//                             dy={i ? "1.2em" : `${-(arr.length - 1) * 0.6}em`}
//                             key={i}
//                           >
//                             {word}
//                           </tspan>
//                         ))}
//                       </text>
//                     </motion.g>
//                   </g>
//                 );
//               })}

//               {/* Center circle with dynamic content */}
//               <g transform="translate(300,300)">
//                 <motion.circle
//                   r="80"
//                   fill="#0EA5E9"
//                   className="opacity-90"
//                   filter="url(#glow)"
//                   animate={{
//                     scale: hoveredChallenge ? [1, 1.05, 1] : 1
//                   }}
//                   transition={{
//                     duration: 1,
//                     repeat: Infinity,
//                     repeatType: "reverse"
//                   }}
//                 />

//                 <circle
//                   r="80"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeDasharray="8 4"
//                   className="opacity-30"
//                 >
//                   <animate
//                     attributeName="strokeDashoffset"
//                     from="0"
//                     to="24"
//                     dur="10s"
//                     repeatCount="indefinite"
//                   />
//                 </circle>

//                 <AnimatePresence mode="wait">
//                   <motion.g
//                     key={hoveredChallenge || "default"}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     transition={{ duration: 0.3 }}
//                     className={`relative`}
//                   >
//                     {hoveredChallenge ? (
//                       <>
//                         <image
//                           href={challenges[hoveredChallenge - 1].centerImage}
//                           x="-30"
//                           y="-50"
//                           width="60"
//                           height="60"
//                           className="opacity-80"
//                         />
//                         {challenges[hoveredChallenge - 1].centerText.map(
//                           (line, i) => (
//                             <text
//                               key={i}
//                               textAnchor="middle"
//                               fill="white"
//                               fontSize="16"
//                               className="font-medium"
//                               y={i * 25 + 20}
//                             >
//                               {line}
//                             </text>
//                           )
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         <text
//                           textAnchor="middle"
//                           dominantBaseline="middle"
//                           fill="white"
//                           fontSize="20"
//                           className="font-medium"
//                         >
//                           <tspan x="0" dy="-1.2em">
//                             a multi-layered
//                           </tspan>
//                           <tspan x="0" dy="1.2em">
//                             and connected
//                           </tspan>
//                           <tspan x="0" dy="1.2em">
//                             media crisis
//                           </tspan>
//                         </text>
//                       </>
//                     )}
//                   </motion.g>
//                 </AnimatePresence>
//               </g>

//               {/* SVG Filters */}
//               <defs>
//                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                   <feGaussianBlur stdDeviation="3" result="blur" />
//                   <feFlood floodColor="#0EA5E9" floodOpacity="0.4" />
//                   <feComposite in2="blur" operator="in" />
//                   <feMerge>
//                     <feMergeNode />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               </defs>
//             </svg>
//           </div>
//         </div>

//         {/* Mobile Info Panel - Only shown on mobile devices */}
//         <AnimatePresence>
//           {hoveredChallenge && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden mt-8 mx-auto max-w-sm p-6 rounded-xl
//                 bg-white backdrop-blur-lg bg-opacity-90 shadow-lg
//                 border-4 border-orange-500"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-xl text-center font-semibold text-orange-500">
//                   {challenges[hoveredChallenge - 1].text}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {challenges[hoveredChallenge - 1].description}
//                 </p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ChallengeSection;

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";

// interface Challenge {
//   id: number;
//   text: string;
//   description: string;
//   icon: string;
// }

// const challenges: Challenge[] = [
//   {
//     id: 1,
//     text: "Problem-Centered Reporting",
//     description:
//       "Modern journalism often focuses on sensational stories rather than addressing core societal issues that matter most to communities.",
//     icon: "📰"
//   },
//   {
//     id: 2,
//     text: "News Deserts for Young People",
//     description:
//       "Young audiences face a significant gap in accessing reliable, engaging news content tailored to their interests.",
//     icon: "👥"
//   },
//   {
//     id: 3,
//     text: "Revenue Models in Crisis",
//     description:
//       "Traditional media organizations struggle to maintain sustainable revenue streams in the digital age.",
//     icon: "💰"
//   },
//   {
//     id: 4,
//     text: "Disinformation & Misinformation",
//     description:
//       "The rapid spread of false information undermines public trust and poses significant challenges.",
//     icon: "🚫"
//   },
//   {
//     id: 5,
//     text: "Lack of Development Coverage",
//     description:
//       "Important development stories often get overshadowed by breaking news and immediate events.",
//     icon: "📈"
//   },
//   {
//     id: 6,
//     text: "Lack Market-Required Skills",
//     description:
//       "Many journalists need additional training in digital tools and modern storytelling techniques.",
//     icon: "🎯"
//   }
// ];

// const ChallengeSection: React.FC = () => {
//   const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 lg:py-16 md:py-12 py-8 overflow-hidden relative">
//       {/* Enhanced Background Pattern */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, #0EA5E9 1px, transparent 0)`,
//             backgroundSize: "40px 40px"
//           }}
//         />
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             background:
//               "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 70%)"
//           }}
//         />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4">
//         {/* Enhanced Title Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sky-500 mb-6 tracking-tight">
//             The Challenge We Face
//             <motion.div
//               className="h-1.5 w-32 bg-orange-500 mx-auto mt-6 rounded-full"
//               initial={{ scaleX: 0, opacity: 0 }}
//               whileInView={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             />
//           </h2>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             className="text-gray-900 max-w-2xl mx-auto text-lg"
//           >
//             Exploring the key challenges facing modern media landscape and their
//             impact on society
//           </motion.p>
//         </motion.div>

//         <div className="relative flex justify-between items-start gap-8">
//           {/* Enhanced Info Panel */}
//           <AnimatePresence>
//             {hoveredChallenge && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3, ease: "easeOut" }}
//                 className="w-80 fixed left-4 top-1/2 transform -translate-y-1/2 p-6 rounded-xl
//                   bg-white backdrop-blur-lg bg-opacity-90 shadow-lg
//                   border-8 border-orange-500 hover:border-orange-600 transition-all duration-300"
//               >
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="space-y-4"
//                 >
//                   {/* <div className="text-4xl mb-4 transform hover:scale-110 transition-transform duration-300">
//                     {challenges[hoveredChallenge - 1].icon}
//                   </div> */}
//                   <h3 className="text-xl text-center font-semibold text-orange-500">
//                     {challenges[hoveredChallenge - 1].text}
//                   </h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {challenges[hoveredChallenge - 1].description}
//                   </p>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Enhanced Main Visualization */}
//           <div className="flex-1 max-w-3xl mx-auto">
//             <svg viewBox="0 0 600 600" className="w-full h-full">
//               {/* Enhanced outer circle */}
//               <circle
//                 cx="300"
//                 cy="300"
//                 r="240"
//                 fill="none"
//                 stroke="#F97316"
//                 strokeWidth="1.5"
//                 strokeDasharray="8 6"
//                 className="opacity-30"
//               >
//                 <animate
//                   attributeName="strokeDashoffset"
//                   from="0"
//                   to="28"
//                   dur="20s"
//                   repeatCount="indefinite"
//                 />
//               </circle>

//               {/* Enhanced orbiting particles */}
//               {[0, 120, 240].map((offset) => (
//                 <circle
//                   key={offset}
//                   className="animate-[spin_20s_linear_infinite]"
//                   r="3"
//                   fill="#F97316"
//                   opacity="0.6"
//                 >
//                   <animateMotion
//                     dur="20s"
//                     repeatCount="indefinite"
//                     path="M300,60 A240,240 0 1,1 300,540 A240,240 0 1,1 300,60"
//                     begin={`${offset / 360}s`}
//                   />
//                 </circle>
//               ))}

//               {/* Enhanced Challenge circles */}
//               {challenges.map((challenge, index) => {
//                 const angle =
//                   (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
//                 const x = 300 + 240 * Math.cos(angle);
//                 const y = 300 + 240 * Math.sin(angle);

//                 return (
//                   <g key={challenge.id} transform={`translate(${x},${y})`}>
//                     <motion.g
//                       whileHover={{ scale: 1.1 }}
//                       onHoverStart={() => setHoveredChallenge(challenge.id)}
//                       onHoverEnd={() => setHoveredChallenge(null)}
//                       className="cursor-pointer"
//                     >
//                       <circle
//                         r="55"
//                         className={cn(
//                           "transition-all duration-500",
//                           hoveredChallenge === challenge.id
//                             ? "fill-orange-500"
//                             : "fill-sky-500"
//                         )}
//                         filter="url(#glow)"
//                       >
//                         <animate
//                           attributeName="opacity"
//                           values="0.9;1;0.9"
//                           dur="3s"
//                           repeatCount="indefinite"
//                           begin={`${index * 0.5}s`}
//                         />
//                       </circle>

//                       {/* Enhanced border effect */}
//                       <circle
//                         r="55"
//                         fill="none"
//                         stroke="white"
//                         strokeWidth="2"
//                         className={cn(
//                           "opacity-20 transition-all duration-300",
//                           hoveredChallenge === challenge.id && "opacity-40"
//                         )}
//                       >
//                         <animate
//                           attributeName="strokeDashoffset"
//                           from="0"
//                           to="360"
//                           dur="20s"
//                           repeatCount="indefinite"
//                         />
//                       </circle>

//                       <text
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                         fill="white"
//                         fontSize="12"
//                         className="font-medium pointer-events-none"
//                       >
//                         {challenge.text.split(" ").map((word, i, arr) => (
//                           <tspan
//                             x="0"
//                             dy={i ? "1.2em" : `${-(arr.length - 1) * 0.6}em`}
//                             key={i}
//                           >
//                             {word}
//                           </tspan>
//                         ))}
//                       </text>
//                     </motion.g>
//                   </g>
//                 );
//               })}

//               {/* Enhanced Center circle */}
//               <g transform="translate(300,300)">
//                 <circle
//                   r="80"
//                   fill="#0EA5E9"
//                   className="opacity-90"
//                   filter="url(#glow)"
//                 >
//                   <animate
//                     attributeName="r"
//                     values="80;82;80"
//                     dur="4s"
//                     repeatCount="indefinite"
//                   />
//                 </circle>

//                 {/* Enhanced center circle border */}
//                 <circle
//                   r="80"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeDasharray="8 4"
//                   className="opacity-30"
//                 >
//                   <animate
//                     attributeName="strokeDashoffset"
//                     from="0"
//                     to="24"
//                     dur="10s"
//                     repeatCount="indefinite"
//                   />
//                 </circle>

//                 <text
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fill="white"
//                   fontSize="20"
//                   className="font-medium"
//                 >
//                   <tspan x="0" dy="-1.2em">
//                     a multi-layered
//                   </tspan>
//                   <tspan x="0" dy="1.2em">
//                     and connected
//                   </tspan>
//                   <tspan x="0" dy="1.2em">
//                     media crisis
//                   </tspan>
//                 </text>
//               </g>

//               {/* Enhanced SVG Filters */}
//               <defs>
//                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                   <feGaussianBlur stdDeviation="3" result="blur" />
//                   <feFlood floodColor="#0EA5E9" floodOpacity="0.4" />
//                   <feComposite in2="blur" operator="in" />
//                   <feMerge>
//                     <feMergeNode />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               </defs>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChallengeSection;
