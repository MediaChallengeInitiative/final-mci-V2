// "use client";

// import React, { useRef, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const ParallaxHero = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const headlineRef = useRef<HTMLDivElement>(null);
//   const subHeadlineRef = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll();

//   // Parallax effects
//   const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
//   const textY = useTransform(scrollY, [0, 500], [0, -50]);
//   const overlayTextY = useTransform(scrollY, [0, 500], [0, 100]);

//   useEffect(() => {
//     // Initial animations timeline
//     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//     // Split text animation for headline
//     const splitHeadline = (element: HTMLElement | null) => {
//       if (!element) return;
//       const text = element.textContent || "";
//       element.innerHTML = text
//         .split(" ")
//         .map(
//           (word) => `
//           <span class="inline-block overflow-hidden">
//             <span class="inline-block translate-y-full opacity-0">
//               ${word}
//             </span>
//           </span>
//         `
//         )
//         .join(" ");
//     };

//     splitHeadline(headlineRef.current);

//     // Add this to the existing useEffect, after the headline animation

//     // Animate other elements
//     tl.to(
//       ".gsap-badge-reveal",
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         ease: "back.out(1.7)"
//       },
//       "-=0.4"
//     )
//       .to(
//         ".gsap-text-reveal",
//         {
//           opacity: 1,
//           duration: 0.8,
//           ease: "power2.out"
//         },
//         "-=0.2"
//       )
//       .to(
//         ".gsap-button-reveal",
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.6,
//           ease: "back.out(1.7)"
//         },
//         "-=0.4"
//       )
//       .to(
//         ".gsap-scroll-reveal",
//         {
//           opacity: 1,
//           duration: 0.6,
//           ease: "power2.out"
//         },
//         "-=0.2"
//       );

//     // Add scroll-triggered animations for content sections
//     gsap.from(".overlay-text-left, .overlay-text-right", {
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom center",
//         scrub: true
//       },
//       opacity: 0,
//       scale: 0.8,
//       stagger: 0.2
//     });

//     // Parallax effect for background image
//     gsap.to(".parallax-bg", {
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom top",
//         scrub: true
//       },
//       y: "20%",
//       ease: "none"
//     });

//     // Add hover animation for the CTA button
//     const button = document.querySelector(".gsap-button-reveal button");
//     if (button) {
//       button.addEventListener("mouseenter", () => {
//         gsap.to(button, {
//           scale: 1.05,
//           duration: 0.3,
//           ease: "power2.out"
//         });
//       });

//       button.addEventListener("mouseleave", () => {
//         gsap.to(button, {
//           scale: 1,
//           duration: 0.3,
//           ease: "power2.out"
//         });
//       });
//     }

//     // Animate the split text
//     tl.to(headlineRef.current?.querySelectorAll("span span") || [], {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       stagger: 0.1,
//       ease: "power4.out"
//     });

//     // Create scroll-triggered animations
//     gsap.to(".overlay-text-left", {
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom top",
//         scrub: 1.5
//       },
//       x: -100,
//       ease: "none"
//     });

//     gsap.to(".overlay-text-right", {
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom top",
//         scrub: 1.5
//       },
//       x: 100,
//       ease: "none"
//     });

//     // Cleanup
//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-screen w-full overflow-hidden"
//     >
//       {/* Background Image with Parallax */}
//       <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10">
//         <Image
//           src="/assets/images/hero/hero-3.jpg"
//           alt="Hero background"
//           fill
//           className="object-cover brightness-50"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
//       </motion.div>

//       {/* Large Overlay Text */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="overlay-text-left absolute -left-10 top-20 -rotate-12">
//           <span className="text-[20vw] font-black text-white/[0.03] whitespace-nowrap">
//             INNOVATE
//           </span>
//         </div>

//         <div className="overlay-text-right absolute -right-10 bottom-20 rotate-12">
//           <span className="text-[20vw] font-black text-white/[0.03] whitespace-nowrap">
//             CREATE
//           </span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <motion.div
//         style={{ y: textY }}
//         className="relative z-10 h-full container mx-auto px-4"
//       >
//         <div className="h-full flex flex-col items-center justify-center text-center">
//           {/* Badge */}
//           <div className="gsap-badge-reveal opacity-0 -translate-y-4 mb-6">
//             <span className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur">
//               <span className="w-2 h-2 rounded-full bg-sky-500 mr-2 animate-pulse" />
//               <span className="text-white/90 text-sm font-medium">
//                 Transform Your Vision
//               </span>
//             </span>
//           </div>

//           {/* Main Text */}
//           <div
//             ref={headlineRef}
//             className="max-w-4xl mx-auto text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
//           >
//             Next Generation Development
//           </div>

//           <div
//             ref={subHeadlineRef}
//             className="gsap-text-reveal max-w-2xl mx-auto text-xl text-white/80 opacity-0"
//           >
//             Empowering creators through innovative solutions and cutting-edge
//             technology. Build something extraordinary with our powerful tools.
//           </div>

//           {/* CTA Button */}
//           <div className="gsap-button-reveal opacity-0 translate-y-4 mt-8">
//             <button
//               className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full
//                            font-medium transition-colors duration-300"
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Scroll Indicator */}
//       <div className="gsap-scroll-reveal opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40">
//         <div className="text-sm font-light">Scroll to explore</div>
//       </div>
//     </section>
//   );
// };

// export default ParallaxHero;

"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface AnimationRefs {
  headline: HTMLDivElement | null;
  subheadline: HTMLDivElement | null;
  section: HTMLElement | null;
}

export const ParallaxHero: React.FC = () => {
  const refs = useRef<AnimationRefs>({
    headline: null,
    subheadline: null,
    section: null
  });

  const { scrollY } = useScroll();

  // Enhanced parallax effects
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 600], [0, -80]);
  const fadeOut = useTransform(scrollY, [0, 400], [1, 0]);

  // Initialize animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
          duration: 1.2
        }
      });

      // Fade in background with blur effect
      tl.fromTo(
        ".hero-bg",
        {
          opacity: 0,
          filter: "blur(10px)",
          scale: 1.1
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 2
        }
      );

      // Animate badge
      tl.fromTo(
        ".gsap-badge",
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8
        },
        "-=1.5"
      );

      // Animate headline words
      const headlineWords =
        refs.current.headline?.querySelectorAll(".word-wrapper");
      if (headlineWords) {
        tl.fromTo(
          headlineWords,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1
          },
          "-=0.8"
        );
      }

      // Enhanced scroll animations for overlay text
      // Left text animation
      gsap.to(".overlay-text-left", {
        scrollTrigger: {
          trigger: refs.current.section,
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        x: -500,
        opacity: 0.05,
        scale: 0.8,
        rotateZ: -20,
        ease: "none"
      });

      // Right text animation
      gsap.to(".overlay-text-right", {
        scrollTrigger: {
          trigger: refs.current.section,
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        x: 500,
        opacity: 0.05,
        scale: 0.8,
        rotateZ: 20,
        ease: "none"
      });

      // Parallax text layers
      const textLayers = gsap.utils.toArray<HTMLElement>(".text-layer");
      textLayers.forEach((layer, i) => {
        const speed = 1 + i * 0.5;
        gsap.to(layer, {
          scrollTrigger: {
            trigger: refs.current.section,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          x: `${speed * 100}%`,
          ease: "none"
        });
      });

      // Animate subheadline with gradient effect
      tl.fromTo(
        ".gsap-subheadline",
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1
        },
        "-=0.5"
      );

      // Button reveal with bounce
      tl.fromTo(
        ".gsap-button",
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        },
        "-=0.5"
      );

      // Scroll indicator fade in
      tl.to(".scroll-indicator", {
        opacity: 1,
        duration: 1,
        y: 0
      });

      // Hover animations for interactive elements
      gsap.utils.toArray<HTMLElement>(".interactive").forEach((element) => {
        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  // Ref callback functions
  const setSectionRef = (el: HTMLElement | null): void => {
    refs.current.section = el;
  };

  const setHeadlineRef = (el: HTMLDivElement | null): void => {
    refs.current.headline = el;
  };

  const setSubheadlineRef = (el: HTMLDivElement | null): void => {
    refs.current.subheadline = el;
  };

  // Split headline text into words for animation
  const headlineText = "Next Generation Development";
  const headlineWords = headlineText.split(" ").map((word, index) => (
    <span
      key={index}
      className="word-wrapper inline-block overflow-hidden mx-1"
    >
      <span className="inline-block">{word}</span>
    </span>
  ));

  return (
    <section
      ref={setSectionRef}
      className="relative h-screen w-full overflow-hidden bg-gray-900"
    >
      {/* Enhanced Background with Parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="hero-bg absolute inset-0 -z-10"
      >
        <Image
          src="/assets/images/hero/hero-3.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 mix-blend-multiply" />
      </motion.div>

      {/* Enhanced Overlay Text Elements with Multiple Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side text layers */}
        <div className="overlay-text-left absolute -left-20 top-20 -rotate-12">
          <span className="text-[25vw] font-black text-white/[0.03] whitespace-nowrap tracking-tighter">
            INNOVATE
          </span>
          <div className="text-layer absolute top-0 left-0 -translate-x-full">
            <span className="text-[20vw] font-black text-white/[0.02] whitespace-nowrap tracking-tighter">
              CREATE
            </span>
          </div>
          <div className="text-layer absolute top-40 left-20 -translate-x-1/2">
            <span className="text-[15vw] font-black text-white/[0.01] whitespace-nowrap tracking-tighter">
              DEVELOP
            </span>
          </div>
        </div>

        {/* Right side text layers */}
        <div className="overlay-text-right absolute -right-20 bottom-20 rotate-12">
          <span className="text-[25vw] font-black text-white/[0.03] whitespace-nowrap tracking-tighter">
            CREATE
          </span>
          <div className="text-layer absolute bottom-0 right-0 translate-x-full">
            <span className="text-[20vw] font-black text-white/[0.02] whitespace-nowrap tracking-tighter">
              INNOVATE
            </span>
          </div>
          <div className="text-layer absolute bottom-40 right-20 translate-x-1/2">
            <span className="text-[15vw] font-black text-white/[0.01] whitespace-nowrap tracking-tighter">
              BUILD
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: textY, opacity: fadeOut }}
        className="relative z-10 h-full container mx-auto px-4"
      >
        <div className="h-full flex flex-col items-center justify-center text-center">
          {/* Enhanced Badge */}
          <div className="gsap-badge mb-8">
            <span className="inline-flex items-center px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-sky-400 mr-3 animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Transform Your Vision
              </span>
            </span>
          </div>

          {/* Enhanced Headline */}
          <div
            ref={setHeadlineRef}
            className="max-w-5xl mx-auto text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
          >
            {headlineWords}
          </div>

          {/* Enhanced Subheadline */}
          <div
            ref={setSubheadlineRef}
            className="gsap-subheadline max-w-2xl mx-auto text-xl text-white/80 leading-relaxed"
          >
            Empowering creators through innovative solutions and cutting-edge
            technology. Build something extraordinary with our powerful tools.
          </div>

          {/* Enhanced CTA Button */}
          <div className="mt-10">
            <button className="gsap-button interactive px-10 py-5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-full font-medium tracking-wide shadow-lg shadow-sky-500/25 transition-colors duration-300">
              Get Started
            </button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <div className="scroll-indicator opacity-0 translate-y-4 absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60">
        <div className="text-sm font-light tracking-wider">
          Scroll to explore
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;

// "use client";

// import React from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";

// export const ParallaxHero = () => {
//   const { scrollY } = useScroll();

//   // Parallax effects
//   const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
//   const textY = useTransform(scrollY, [0, 500], [0, -50]);
//   const overlayTextY = useTransform(scrollY, [0, 500], [0, 100]);

//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       {/* Background Image with Parallax */}
//       <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10">
//         <Image
//           src="/assets/images/hero/hero-3.jpg"
//           alt="Hero background"
//           fill
//           className="object-cover brightness-50"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
//       </motion.div>

//       {/* Large Overlay Text */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           style={{ y: overlayTextY }}
//           className="absolute -left-10 top-20 -rotate-12"
//         >
//           <span className="text-[20vw] font-black text-white/[0.03] whitespace-nowrap">
//             INNOVATE
//           </span>
//         </motion.div>

//         <motion.div
//           style={{ y: overlayTextY }}
//           className="absolute -right-10 bottom-20 rotate-12"
//         >
//           <span className="text-[20vw] font-black text-white/[0.03] whitespace-nowrap">
//             CREATE
//           </span>
//         </motion.div>
//       </div>

//       {/* Main Content */}
//       <motion.div
//         style={{ y: textY }}
//         className="relative z-10 h-full container mx-auto px-4"
//       >
//         <div className="h-full flex flex-col items-center justify-center text-center">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-6"
//           >
//             <span className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur">
//               <span className="w-2 h-2 rounded-full bg-sky-500 mr-2 animate-pulse" />
//               <span className="text-white/90 text-sm font-medium">
//                 Transform Your Vision
//               </span>
//             </span>
//           </motion.div>

//           {/* Main Text */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="max-w-4xl mx-auto text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
//           >
//             Next Generation
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
//               Development
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="max-w-2xl mx-auto text-xl text-white/80"
//           >
//             Empowering creators through innovative solutions and cutting-edge
//             technology. Build something extraordinary with our powerful tools.
//           </motion.p>

//           {/* CTA Button */}
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="mt-8 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full
//                      font-medium transition-colors duration-300"
//           >
//             Get Started
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="text-sm font-light"
//         >
//           Scroll to explore
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default ParallaxHero;
