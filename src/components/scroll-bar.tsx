"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

interface NewsItem {
  text: string;
  category: string;
}

const newsItems: NewsItem[] = [
  {
    text: "BUILDING THE NEXT GENERATION OF JOURNALISTS,",
    category: "SPOTLIGHT"
  },
  {
    text: "CONTENT CREATORS,",
    category: "MISSION"
  },
  {
    text: "AND STORY LEADERS TO FIX THE MULTI-LAYERED MEDIA CRISIS IN AFRICA.",
    category: "VISION"
  }
];

const ScrollBanner = () => {
  const duplicatedItems = [...newsItems, ...newsItems, ...newsItems];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 border-y border-gray-800">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem"
        }}
      />

      <div className="relative flex flex-col lg:flex-row items-stretch">
        {/* Label Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative py-2 px-1 bg-gradient-to-r from-[#f6931d] to-orange-600 lg:w-[280px] xl:w-[320px] flex items-center justify-start lg:justify-start"
        >
          <h2 className="text-2md lg:text-lg font-bold text-white uppercase tracking-wider whitespace-nowrap">
            We Do This Through
          </h2>

          {/* Decorative gradient edge */}
          {/* <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-orange-600/20 to-transparent" /> */}
        </motion.div>

        {/* News Ticker Section */}
        <div className="flex-1 relative overflow-hidden bg-gray-900/90 backdrop-blur-sm">
          <div className="h-full flex items-center py-1 lg:py-2">
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              loop={true}
              speed={15000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: false
              }}
              className="news-ticker"
            >
              {duplicatedItems.map((item, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <div className="group relative flex items-center px-6 lg:px-8">
                    {/* Category Badge */}
                    {/* <div className="hidden md:flex h-7 items-center px-4 mr-4 rounded-full bg-sky-500/10 border border-sky-500/20 transition-colors duration-300 group-hover:border-sky-500/40 group-hover:bg-sky-500/15">
                      <span className="text-sm font-semibold text-sky-400 whitespace-nowrap">
                        {item.category}
                      </span>
                    </div> */}

                    {/* News Text */}
                    <span className="text-base md:text-lg lg:text-xl text-gray-300 whitespace-nowrap transition-colors duration-300 group-hover:text-white font-medium">
                      {item.text}
                    </span>

                    {/* Separator */}
                    <span className="mx-8 lg:mx-12 text-2xl text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                      •
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 via-gray-900/90 to-transparent pointer-events-none" />
        </div>
      </div>

      <style jsx global>{`
        .news-ticker {
          width: 100%;
          overflow: visible;
        }

        .news-ticker .swiper-wrapper {
          transition-timing-function: linear !important;
          align-items: center;
        }

        .news-ticker .swiper-slide {
          width: auto;
          height: 100%;
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .news-ticker .swiper-slide {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }

        @media (min-width: 1024px) {
          .news-ticker .swiper-slide {
            height: 4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollBanner;

// import React from "react";
// import Link from "next/link";

// export default function ScrollBar() {
//   return (
//     <>
//       <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
//         {/* Static text on the left */}
//         <div className="bg-orange-400 text-white font-bold text-4xl w-full p-4 whitespace-nowrap">
//           We Do This Through
//         </div>

//         {/* Scrolling text on the right */}
//         <div className="bg-white flex-grow overflow-hidden">
//           <div className="marquee inline-flex whitespace-nowrap animate-ticker p-4 border-2 border-[#f6931d]">
//             <ul className="marquee__content text-xl lg:text-4xl text-[#0097d1]">
//               <li className="pr-2 capitalize">
//                 At Media Challenge Initiative,
//               </li>
//               <li className="pr-2 capitalize">
//                 We Believe that Journalism Can Make The World A Better Place,
//               </li>
//               <li className="pr-2 capitalize">
//                 A humane media that shapes the future,
//               </li>
//               <li className="pr-2 capitalize">
//                 Transforming societies through advancing journalism and
//                 amplifying innovations,
//               </li>
//             </ul>
//             {/* Mirrors the content above */}
//             <ul
//               className="marquee__content lg:text-4xl text-base text-white"
//               aria-hidden="true"
//             >
//               <li className="pr-2 capitalize">
//                 At Media Challenge Initiative,
//               </li>
//               <li className="pr-2 capitalize">
//                 We Believe that Journalism Can Make The World A Better Place,
//               </li>
//               <li className="pr-2 capitalize">
//                 A humane media that shapes the future,
//               </li>
//               <li className="pr-2 capitalize">
//                 Transforming societies through advancing journalism and
//                 amplifying innovations,
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
