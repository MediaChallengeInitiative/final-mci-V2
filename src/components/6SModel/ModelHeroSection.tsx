"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModelHeroSectionProps {
  title: string;
  image: string;
}

const ModelHeroSection: React.FC<ModelHeroSectionProps> = ({
  title,
  image
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gradient, setGradient] = useState<"sky" | "orange">("sky");
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side states
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const requestId = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
    return () => cancelAnimationFrame(requestId);
  }, []);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    const requestId = requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < 768);
    });
    return () => cancelAnimationFrame(requestId);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Gradient interval
    const gradientInterval = setInterval(() => {
      setGradient((prev) => (prev === "sky" ? "orange" : "sky"));
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearInterval(gradientInterval);
    };
  }, [isClient, handleScroll, handleResize]);

  // Early return during SSR or before hydration
  if (!isClient) {
    return (
      <div className="w-full min-h-screen bg-gray-900">
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-9xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        initial={false}
        style={!isMobile ? { y: scrollY * 0.3 } : undefined}
        className="absolute inset-0 w-full h-full"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/90 to-sky-900/70" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Animated Gradient */}
      <motion.div
        initial={false}
        animate={{
          background:
            gradient === "sky"
              ? "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.15) 0%, transparent 50%)"
              : "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)"
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white"
            >
              {title}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ModelHeroSection;

// "use client";

// import { useEffect, useState } from "react";

// interface ModelHeroSectionProps {
//   title: string;
//   image: any;
// }

// const ModelHeroSection: React.FC<ModelHeroSectionProps> = ({
//   title,
//   image
// }) => {
//   const [scrollY, setScrollY] = useState(0);
//   const [isMobile, setIsMobile] = useState(
//     typeof window !== "undefined" && window.innerWidth < 768
//   );
//   const [gradient, setGradient] = useState<"sky" | "orange">("sky");
//   const [showBadge, setShowBadge] = useState(false);
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     const handleResize = () => setIsMobile(window.innerWidth < 768);

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleResize);

//     const badgeTimeout = setTimeout(() => setShowBadge(true), 100);
//     const textTimeout = setTimeout(() => setShowText(true), 300);
//     const gradientInterval = setInterval(() => {
//       setGradient((prev) => (prev === "sky" ? "orange" : "sky"));
//     }, 5000);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(badgeTimeout);
//       clearTimeout(textTimeout);
//       clearInterval(gradientInterval);
//     };
//   }, []);

//   return (
//     <section className="relative w-full min-h-screen overflow-hidden">
//       {/* Parallax Background */}
//       <div
//         style={
//           !isMobile
//             ? { transform: `translateY(${scrollY * 0.3}px)` }
//             : undefined
//         }
//         className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
//       >
//         <div
//           className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: `url(${image})` }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/90 to-sky-900/70" />
//       </div>

//       {/* Grid Pattern Overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

//       {/* Animated Gradient Accent */}
//       <div
//         className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
//           gradient === "sky"
//             ? "bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15)_0%,transparent_50%)]"
//             : "bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.15)_0%,transparent_50%)]"
//         }`}
//       />

//       {/* Content Container */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
//         <div className="max-w-9xl mx-auto text-center">
//           {/* Main Heading with Text Reveal Animation */}
//           <div className="mb-8 space-y-4">
//             <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
//               {showText && (
//                 <div className="text-white block mb-4 transition-transform duration-800 ease-out transform translate-y-0">
//                   {title}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ModelHeroSection;
