"use client";

import React, { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { cn } from "@/lib/utils";

// Import styles
import "swiper/css";
import "swiper/css/effect-fade";

interface TextSlide {
  textAnimation: string;
  id: string;
}

// Move data outside component to prevent recreation on renders
const textSlides: TextSlide[] = [
  { textAnimation: "Taking Journalism to the People", id: "slide-1" },
  { textAnimation: "Localising SDG's One Story at a Time", id: "slide-2" },
  { textAnimation: "Engage in Constructive Conversations", id: "slide-3" },
  { textAnimation: "Strengthening Local Journalism", id: "slide-4" },
  { textAnimation: "Promoting Public Accountability", id: "slide-5" }
];

const Projects: React.FC = () => {
  // Memoize Swiper settings
  const swiperConfig: SwiperOptions = useMemo(
    () => ({
      slidesPerView: 1,
      effect: "fade",
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      loop: true,
      modules: [Autoplay, EffectFade]
    }),
    []
  );

  // Memoize video URL with proper parameters
  const videoUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      loop: "1",
      mute: "1",
      controls: "0",
      showinfo: "1",
      modestbranding: "1",
      playsinline: "1",
      rel: "0",
      fs: "0",
      playlist: "YKRoK42PNi8"
    });
    return `https://www.youtube.com/embed/YKRoK42PNi8?${params.toString()}`;
  }, []);

  // Handle video loading error
  const handleVideoError = useCallback(() => {
    console.error("Failed to load video background");
    // You could set a fallback background here
  }, []);

  return (
    <section
      className="w-full h-screen bg-black overflow-hidden flex items-center justify-center relative"
      aria-label="Project Highlights"
    >
      <div className="relative w-full h-full">
        {/* Video Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            src={videoUrl}
            title="Background video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full object-cover transform lg:scale-[1.25] scale-[4.25]"
            onError={handleVideoError}
            loading="lazy"
          />
        </div>

        {/* Overlay with gradient for better text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 flex items-center justify-center"
          aria-hidden="true"
        />

        {/* Text Slider */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Swiper {...swiperConfig} className="w-full h-full">
            {textSlides.map((slide) => (
              <SwiperSlide
                key={slide.id}
                className="flex items-center justify-center"
              >
                <div className="flex items-center justify-center text-center px-4 h-full">
                  <p
                    className={cn(
                      "text-white font-bold text-4xl md:text-6xl lg:text-6xl",
                      "opacity-0 translate-y-8",
                      "swiper-slide-active:opacity-100 swiper-slide-active:translate-y-0",
                      "transition-all duration-1000 ease-out"
                    )}
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                    }}
                  >
                    {slide.textAnimation}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .swiper-container {
            transition: none !important;
          }

          .swiper-slide {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(Projects);

// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import { cn } from "@/lib/utils";

// interface TextSlide {
//   textAnimation: string;
// }

// const textSlides: TextSlide[] = [
//   { textAnimation: "Taking Journalism to the People" },
//   { textAnimation: "Localising SDG's One Story at a Time" },
//   { textAnimation: "Engage in Constructive Conversations" },
//   { textAnimation: "Strengthening Local Journalism" },
//   { textAnimation: "Promoting Public Accountability" }
// ];

// export default function Projects() {
//   return (
//     <section className="w-full h-screen bg-black overflow-hidden flex items-center justify-center">
//       <div className="relative w-full h-full mx-auto">
//         {/* Video Background */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <iframe
//             src="https://www.youtube.com/embed/YKRoK42PNi8?autoplay=1&loop=1&mute=1&controls=0&showinfo=1&modestbranding=1&playsinline=1&rel=0&fs=0&playlist=YKRoK42PNi8"
//             title="YouTube video player"
//             allow="accelerometer; autoplay; loop; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//             className="absolute top-0 left-0 w-full h-full object-cover transform lg:scale-[1.25] scale-[4.25]"
//           />
//         </div>

//         {/* Text Overlay */}
//         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//           <Swiper
//             slidesPerView={1}
//             effect="fade"
//             speed={1000}
//             autoplay={{ delay: 3000 }}
//             loop
//             modules={[Autoplay, EffectFade]}
//             className="w-full h-full"
//           >
//             {textSlides.map((slide, index) => (
//               <SwiperSlide key={index} className="flex items-center justify-center">
//               <div className="flex items-center justify-center text-center px-4 bg-transparent h-full">
//                 <p
//                   className={cn(
//                     "text-white font-bold text-4xl md:text-6xl lg:text-6xl",
//                     "opacity-0 translate-y-8",
//                     "swiper-slide-active:opacity-100 swiper-slide-active:translate-y-0",
//                     "transition-all duration-1000 ease-out",
//                   )}
//                   style={{
//                     textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
//                   }}
//                 >
//                   {slide.textAnimation}
//                 </p>
//               </div>
//             </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import React from "react";

// export default function Projects() {
//   return (
//     <section className="w-full h-screen bg-black overflow-hidden flex items-center justify-center">
//       <div className="relative w-full h-full mx-auto">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-full relative overflow-hidden h-[100%]">
//             <iframe
//               src="https://www.youtube.com/embed/YKRoK42PNi8?autoplay=1&loop=1&mute=1&controls=0&showinfo=1&modestbranding=1&playsinline=1&rel=0&fs=0&playlist=YKRoK42PNi8"
//               title="YouTube video player"
//               allow="accelerometer; autoplay; loop; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//               // className="absolute top-0 left-0 w-full h-full"
//               className="absolute top-0 left-0 w-full h-full object-cover transform lg:scale-[1.25] scale-[4.25]"
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
