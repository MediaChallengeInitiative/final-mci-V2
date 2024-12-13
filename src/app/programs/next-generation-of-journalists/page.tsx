"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import NextGenScrollSection from "@/components/next-gen-scroll-section";

gsap.registerPlugin(useGSAP);

export default function Page() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000px top",
            scrub: 0.6,
            pin: true
          }
        }
      );
      return () => {
        pin.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-24 lg:mt-0 mt-4">
        <div
          className="mx-auto w-full h-[68vh] relative flex items-center justify-center px-10 bg-center"
          style={{ backgroundImage: "url(/assets/images/hero/hero-3.jpg)" }}
        >
          <h1 className="text-white text-4xl font-extrabold ml-6 text-center z-20 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Next Generation Of Journalists
          </h1>

          <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
        </div>

        <NextGenScrollSection />

        <div className="w-full">
          <Image
            className="w-full"
            src="/assets/images/nextgen/next-gen-cycle.jpg"
            width={500}
            height={500}
            alt="stats image"
          />
        </div>
      </section>
    </>
  );
}

// "use client";
// import React, { useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import NextGenScrollSection from "@/components/next-gen-scroll-section";
// import Dashboard from "@/components/AnimatedCounter";
// import Subscribe from "@/components/subscribe";

// gsap.registerPlugin(useGSAP);

// export default function Page() {
//   const sectionRef = useRef(null);
//   const triggerRef = useRef(null);
//   gsap.registerPlugin(ScrollTrigger);

//   useGSAP(
//     () => {
//       const pin = gsap.fromTo(
//         sectionRef.current,
//         { translateX: 0 },
//         {
//           translateX: "-300vw",
//           ease: "none",
//           duration: 1,
//           scrollTrigger: {
//             trigger: triggerRef.current,
//             start: "top top",
//             end: "2000px top",
//             scrub: 0.6,
//             pin: true
//           }
//         }
//       );
//       return () => {
//         pin.kill();
//       };
//     },
//     { scope: sectionRef }
//   );

//   return (
//     <>
//       <section className="w-full py-12 md:py-24 lg:py-24 lg:mt-0 mt-4">
//         <div
//           className="mx-auto w-full h-[68vh] relative flex items-center justify-center px-10 bg-center"
//           style={{ backgroundImage: "url(/assets/images/hero/hero-3.jpg)" }}
//         >
//           {/* <Image
//             src="/assets/images/hero/hero-3.jpg"
//             className="w-[480px] h-[480px] -mt-10 z-40 rounded-full border-8 border-white object-cover object-top"
//             width={500}
//             height={500}
//             alt="Next Gen"
//           /> */}
//           <h1 className="text-white text-4xl font-extrabold ml-6 text-center z-20 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
//             Next Generation Of Journalists
//           </h1>

//           <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
//         </div>

//         {/* <div className="bg-transparent h-52 mb-0">
//           <div className="container mx-auto bg-transparent h-full">
//             <div className="grid gap-4 lg:grid-cols-4">
//               <div className="w-full bg-pink-500 rounded-tr-2xl z-40 rounded-bl-2xl transform -translate-y-10 shadow-md shadow-gray-300">
//                 <div className="grid grid-cols-1 p-3">
//                   <h1 className="text-white text-6xl">01</h1>
//                   <h2 className="text-white text-xl py-6">
//                     The Inter University Media Challenge
//                   </h2>
//                 </div>
//               </div>
//               <div className="w-full bg-orange-500 rounded-tr-2xl z-40 rounded-bl-2xl transform -translate-y-10 shadow-md shadow-gray-300">
//                 <div className="grid grid-cols-1 p-3">
//                   <h1 className="text-white text-6xl">02</h1>
//                   <h2 className="text-white text-xl py-6">
//                     The Media Challenge Expo
//                   </h2>
//                 </div>
//               </div>
//               <div className="w-full bg-sky-500 rounded-tr-2xl z-40 rounded-bl-2xl transform -translate-y-10 shadow-md shadow-gray-300">
//                 <div className="grid grid-cols-1 p-3">
//                   <h1 className="text-white text-6xl">03</h1>
//                   <h2 className="text-white text-xl py-6">
//                     The Media Challenge Fellowship Program
//                   </h2>
//                 </div>
//               </div>
//               <div className="w-full bg-sky-800 rounded-tr-2xl z-40 rounded-bl-2xl transform -translate-y-10 shadow-md shadow-gray-300">
//                 <div className="grid grid-cols-1 p-3">
//                   <h1 className="text-white text-6xl">04</h1>
//                   <h2 className="text-white text-xl py-6">
//                     The MCI Alumni Program
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         <NextGenScrollSection />

//         <div className="w-full">
//           <Image
//             className="w-full"
//             src="/assets/images/nextgen/next-gen-cycle.jpg"
//             width={500}
//             height={500}
//             alt="stats image"
//           />
//         </div>
//       </section>
//     </>
//   );
// }
