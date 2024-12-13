"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Challenge {
  id: number;
  text: string;
  description: string;
  icon: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    text: "Problem-Centered Reporting",
    description:
      "Modern journalism often focuses on sensational stories rather than addressing core societal issues that matter most to communities.",
    icon: "📰"
  },
  {
    id: 2,
    text: "News Deserts for Young People",
    description:
      "Young audiences face a significant gap in accessing reliable, engaging news content tailored to their interests.",
    icon: "👥"
  },
  {
    id: 3,
    text: "Revenue Models in Crisis",
    description:
      "Traditional media organizations struggle to maintain sustainable revenue streams in the digital age.",
    icon: "💰"
  },
  {
    id: 4,
    text: "Disinformation & Misinformation",
    description:
      "The rapid spread of false information undermines public trust and poses significant challenges.",
    icon: "🚫"
  },
  {
    id: 5,
    text: "Lack of Development Coverage",
    description:
      "Important development stories often get overshadowed by breaking news and immediate events.",
    icon: "📈"
  },
  {
    id: 6,
    text: "Lack Market-Required Skills",
    description:
      "Many journalists need additional training in digital tools and modern storytelling techniques.",
    icon: "🎯"
  }
];

const ChallengeSection: React.FC = () => {
  const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 lg:py-16 md:py-12 py-8 overflow-hidden relative">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0EA5E9 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 70%)"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Enhanced Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sky-500 mb-6 tracking-tight">
            The Challenge We Face
            <motion.div
              className="h-1.5 w-32 bg-orange-500 mx-auto mt-6 rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-900 max-w-2xl mx-auto text-lg"
          >
            Exploring the key challenges facing modern media landscape and their
            impact on society
          </motion.p>
        </motion.div>

        <div className="relative flex justify-between items-start gap-8">
          {/* Enhanced Info Panel */}
          <AnimatePresence>
            {hoveredChallenge && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-80 fixed left-4 top-1/2 transform -translate-y-1/2 p-6 rounded-xl
                  bg-white backdrop-blur-lg bg-opacity-90 shadow-lg
                  border-8 border-orange-500 hover:border-orange-600 transition-all duration-300"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  {/* <div className="text-4xl mb-4 transform hover:scale-110 transition-transform duration-300">
                    {challenges[hoveredChallenge - 1].icon}
                  </div> */}
                  <h3 className="text-xl text-center font-semibold text-orange-500">
                    {challenges[hoveredChallenge - 1].text}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {challenges[hoveredChallenge - 1].description}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Main Visualization */}
          <div className="flex-1 max-w-3xl mx-auto">
            <svg viewBox="0 0 600 600" className="w-full h-full">
              {/* Enhanced outer circle */}
              <circle
                cx="300"
                cy="300"
                r="240"
                fill="none"
                stroke="#F97316"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                className="opacity-30"
              >
                <animate
                  attributeName="strokeDashoffset"
                  from="0"
                  to="28"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Enhanced orbiting particles */}
              {[0, 120, 240].map((offset) => (
                <circle
                  key={offset}
                  className="animate-[spin_20s_linear_infinite]"
                  r="3"
                  fill="#F97316"
                  opacity="0.6"
                >
                  <animateMotion
                    dur="20s"
                    repeatCount="indefinite"
                    path="M300,60 A240,240 0 1,1 300,540 A240,240 0 1,1 300,60"
                    begin={`${offset / 360}s`}
                  />
                </circle>
              ))}

              {/* Enhanced Challenge circles */}
              {challenges.map((challenge, index) => {
                const angle =
                  (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
                const x = 300 + 240 * Math.cos(angle);
                const y = 300 + 240 * Math.sin(angle);

                return (
                  <g key={challenge.id} transform={`translate(${x},${y})`}>
                    <motion.g
                      whileHover={{ scale: 1.1 }}
                      onHoverStart={() => setHoveredChallenge(challenge.id)}
                      onHoverEnd={() => setHoveredChallenge(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        r="55"
                        className={cn(
                          "transition-all duration-500",
                          hoveredChallenge === challenge.id
                            ? "fill-orange-500"
                            : "fill-sky-500"
                        )}
                        filter="url(#glow)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.9;1;0.9"
                          dur="3s"
                          repeatCount="indefinite"
                          begin={`${index * 0.5}s`}
                        />
                      </circle>

                      {/* Enhanced border effect */}
                      <circle
                        r="55"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        className={cn(
                          "opacity-20 transition-all duration-300",
                          hoveredChallenge === challenge.id && "opacity-40"
                        )}
                      >
                        <animate
                          attributeName="strokeDashoffset"
                          from="0"
                          to="360"
                          dur="20s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="12"
                        className="font-medium pointer-events-none"
                      >
                        {challenge.text.split(" ").map((word, i, arr) => (
                          <tspan
                            x="0"
                            dy={i ? "1.2em" : `${-(arr.length - 1) * 0.6}em`}
                            key={i}
                          >
                            {word}
                          </tspan>
                        ))}
                      </text>
                    </motion.g>
                  </g>
                );
              })}

              {/* Enhanced Center circle */}
              <g transform="translate(300,300)">
                <circle
                  r="80"
                  fill="#0EA5E9"
                  className="opacity-90"
                  filter="url(#glow)"
                >
                  <animate
                    attributeName="r"
                    values="80;82;80"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Enhanced center circle border */}
                <circle
                  r="80"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  className="opacity-30"
                >
                  <animate
                    attributeName="strokeDashoffset"
                    from="0"
                    to="24"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>

                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="20"
                  className="font-medium"
                >
                  <tspan x="0" dy="-1.2em">
                    a multi-layered
                  </tspan>
                  <tspan x="0" dy="1.2em">
                    and connected
                  </tspan>
                  <tspan x="0" dy="1.2em">
                    media crisis
                  </tspan>
                </text>
              </g>

              {/* Enhanced SVG Filters */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodColor="#0EA5E9" floodOpacity="0.4" />
                  <feComposite in2="blur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSection;
