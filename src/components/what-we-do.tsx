"use client";

import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface WhoWeAreProps {
  subTitle: string;
}

// Memoized static data
const whoWeAreData: readonly WhoWeAreProps[] = [
  { subTitle: "Changing & Shaping Narratives" },
  { subTitle: "Disarming Misinformation and Disinformation" },
  { subTitle: "Building the Next Generation of Journalists" },
  { subTitle: "Amplifying Media Innovations" },
  { subTitle: "Protecting Information Ecosystem" },
  { subTitle: "Creating Multi-Earning - Thought Media Leaders" }
] as const;

export default function WhatWeDo() {
  // Memoize animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          duration: 0.5
        }
      }
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    }),
    []
  );

  // Memoize Swiper settings
  const swiperConfig = useMemo(
    () => ({
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 6000,
      grabCursor: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false
      },
      modules: [Autoplay],
      style: { transitionTimingFunction: "linear" }
    }),
    []
  );

  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-900"
      aria-labelledby="who-we-are-title"
    >
      <motion.div
        className="container grid gap-12 px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h1
            id="who-we-are-title"
            className="text-4xl font-bold tracking-tight text-white capitalize sm:text-6xl pb-0 sm:pb-6
                     bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
          >
            Who We Are
          </h1>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-[1fr_4fr]">
          <motion.div
            className="group relative overflow-hidden rounded-xl"
            variants={itemVariants}
          >
            <div className="flex items-center h-full justify-center">
              <div className="space-y-0 sm:space-y-2">
                <h3
                  className="text-4xl uppercase font-bold tracking-tight leading-relaxed 
                             text-transparent bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text 
                             md:text-7xl transform transition-transform duration-300 
                             group-hover:scale-105"
                >
                  We Are
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-10 pointer-events-none" />
            <Swiper {...swiperConfig} className="swiper-wrapper">
              {whoWeAreData.map((data, i) => (
                <SwiperSlide
                  key={i}
                  className="swiper-slide flex justify-center text-center items-center"
                >
                  <p
                    className="leading-relaxed text-center text-xl sm:text-5xl text-white
                              font-medium transition-all duration-300 hover:text-sky-400
                              [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
                  >
                    {data.subTitle}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";

// interface WhoWeAreProps {
//   subTitle: string;
// }

// const whoWeAreData: WhoWeAreProps[] = [
//   {
//     subTitle: `Changing & Shaping Narratives`
//   },
//   {
//     subTitle: `Disarming Misinformation and Disinformation`
//   },
//   {
//     subTitle: `Building the Next Generation of Journalists`
//   },
//   {
//     subTitle: `Amplifying Media Innovations`
//   },
//   {
//     subTitle: `Protecting Information Ecosystem`
//   },
//   {
//     subTitle: `Creating Multi-Earning - Thought Media Leaders`
//   }
// ];

// export default function WhatWeDo() {
//   return (
//     <>
//       <section className="w-full py-12 md:py-24 lg:py-32">
//         <div className="container grid gap-12 px-4 md:px-6">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold tracking-tight text-white capitalize sm:text-6xl pb-0 sm:pb-6">
//               Who We Are
//             </h1>
//           </div>
//           <div className="grid gap-6 sm:grid-cols-[1fr_4fr]">
//             <div className="group relative overflow-hidden rounded-xl">
//               <div className="flex items-center h-full justify-center">
//                 <div className="space-y-0 sm:space-y-2">
//                   <h3 className="text-4xl uppercase font-bold tracking-tight leading-relaxed text-sky-500 md:text-7xl">
//                     We Are
//                   </h3>
//                 </div>
//               </div>
//             </div>

//             <Swiper
//               slidesPerView={1}
//               spaceBetween={0}
//               loop={true}
//               speed={6000}
//               grabCursor={true}
//               autoplay={{
//                 delay: 1,
//                 disableOnInteraction: false
//               }}
//               modules={[Autoplay]}
//               className="swiper-wrapper"
//               style={{ transitionTimingFunction: "linear" }}
//             >
//               {whoWeAreData.map((data: WhoWeAreProps, i: number) => (
//                 <SwiperSlide
//                   key={i}
//                   className="swiper-slide flex justify-center text-center items-center"
//                 >
//                   <p className="leading-relaxed text-center text-xl sm:text-5xl text-white">
//                     {data.subTitle}
//                   </p>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* <Swiper
//               loop={true}
//               speed={1000}
//               autoplay={{ delay: 6000, disableOnInteraction: false }}
//               navigation={{
//                 nextEl: ".next-btn",
//                 prevEl: ".hero-prev"
//               }}
//               modules={[Navigation, Autoplay]}
//               className="group relative overflow-hidden rounded-xl"
//             >
//               <div className="p-4 w-full">
//                 {whoWeAreData.map((data: WhoWeAreProps, i: number) => (
//                   <SwiperSlide
//                     key={i}
//                     className="h-full bg-gray-100 p-8 rounded"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       className="block w-5 h-5 text-sky-500 mb-4"
//                       viewBox="0 0 975.036 975.036"
//                     >
//                       <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
//                     </svg>
//                     <p className="leading-relaxed mb-6">{data.subTitle}</p>

//                   </SwiperSlide>
//                 ))}
//               </div>
//             </Swiper> */}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
