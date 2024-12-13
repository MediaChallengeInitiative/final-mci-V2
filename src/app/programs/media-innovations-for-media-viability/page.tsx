"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HeroSection } from "@/components/InnovatorsPageComponents";
import { InfiniteScrollText } from "@/components/InfiniteScrollText";
import InnovatorsSpotlightPageComponent from "@/components/InnovatorsSpotlightPageComponent";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CtaSection } from "@/components/CtaSection";

const Page: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sky-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      <HeroSection />
      <InfiniteScrollText />
      <InnovatorsSpotlightPageComponent />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
};

export default Page;

// "use client";

// import React from "react";
// import { motion, useScroll, useSpring } from "framer-motion";
// import { HeroSection } from "@/components/InnovatorsPageComponents";
// import { InfiniteScrollText } from "@/components/InfiniteScrollText";
// import InnovatorsSpotlightPageComponent from "@/components/InnovatorsSpotlightPageComponent";
// import { Innovation } from "@/interface/innovation";
// import { FeaturesSection } from "@/components/FeaturesSection";
// import { CtaSection } from "@/components/CtaSection";

// const Page: React.FC = () => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress);

//   const innovations: Innovation[] = [
//     {
//       id: 1,
//       title: "AI-Powered Content Creation",
//       description: "Create engaging content with advanced AI assistance",
//       category: "Artificial Intelligence",
//       image: "/assets/images/fellowship/poster-updated.webp",
//       stats: {
//         users: "50K+",
//         rating: 4.8,
//         impact: "High"
//       }
//     }
//     // ... other innovations
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-sky-500 transform origin-left z-50"
//         style={{ scaleX }}
//       />

//       <HeroSection />
//       <InfiniteScrollText />
//       <InnovatorsSpotlightPageComponent />
//       <FeaturesSection />
//       <CtaSection />
//     </div>
//   );
// };

// export default Page;
