"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { ParallaxHero } from "./sections/ParallaxHero";
import HorizontalScrollSection from "./sections/HorizontalScrollSection";
import { VerticalCardsSection } from "./sections/VerticalCardsSection";
import { ContactSection } from "./sections/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const NextGenPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const sections = [
    { id: "hero", component: <ParallaxHero /> },
    { id: "horizontal", component: <HorizontalScrollSection /> },
    { id: "cards", component: <VerticalCardsSection /> },
    { id: "contact", component: <ContactSection /> }
  ];

  return (
    <div ref={containerRef} className="relative bg-slate-900">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main content */}
      <main className="relative">
        {sections.map(({ id, component }, index) => (
          <div key={id} id={`section-${index}`}>
            {component}
          </div>
        ))}
      </main>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-50">
        {sections.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSection === index ? "bg-sky-500" : "bg-white/20"
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              const section = document.querySelector(`#section-${index}`);
              section?.scrollIntoView({ behavior: "smooth" });
              setCurrentSection(index);
            }}
            aria-label={`Navigate to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NextGenPage;

// // components/pages/next-gen/NextGenPage.tsx
// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence
// } from "framer-motion";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import { ParallaxHero } from "./sections/ParallaxHero";
// import HorizontalScrollSection from "./sections/HorizontalScrollSection";
// import { VerticalCardsSection } from "./sections/VerticalCardsSection";
// // import { InteractiveTimeline } from "./sections/InteractiveTimeline";
// import { ContactSection } from "./sections/ContactSection";

// gsap.registerPlugin(ScrollTrigger);

// const NextGenPage: React.FC = () => {
//   const [currentSection, setCurrentSection] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll();

//   useEffect(() => {
//     // Smooth scroll setup with proper typing
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: "vertical",
//       smoothWheel: true
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative bg-slate-900">
//       {/* Progress bar */}
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-50"
//         style={{ scaleX: scrollYProgress }}
//       />

//       {/* Main content */}
//       <main className="relative">
//         {/* Parallax Hero Section */}
//         <ParallaxHero />

//         {/* Horizontal Scroll Section */}
//         <HorizontalScrollSection />

//         {/* Vertical Cards Section */}
//         <VerticalCardsSection />

//         {/* Interactive Timeline */}
//         {/* <InteractiveTimeline /> */}

//         {/* Contact Section */}
//         <ContactSection />
//       </main>

//       {/* Navigation dots */}
//       <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-50">
//         {[0, 1, 2, 3, 4].map((index) => (
//           <motion.button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               currentSection === index ? "bg-sky-500" : "bg-white/20"
//             }`}
//             whileHover={{ scale: 1.2 }}
//             onClick={() => {
//               const section = document.querySelector(`#section-${index}`);
//               section?.scrollIntoView({ behavior: "smooth" });
//               setCurrentSection(index);
//             }}
//             aria-label={`Navigate to section ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NextGenPage;
