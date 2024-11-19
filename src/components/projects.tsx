"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { cn } from "@/lib/utils";

interface TextSlide {
  textAnimation: string;
}

const textSlides: TextSlide[] = [
  { textAnimation: "Taking Journalism to the People" },
  { textAnimation: "Localising SDG's One Story at a Time" },
  { textAnimation: "Engage in Constructive Conversations" },
  { textAnimation: "Strengthening Local Journalism" },
  { textAnimation: "Promoting Public Accountability" }
];

export default function Projects() {
  return (
    <section className="w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full mx-auto">
        {/* Video Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            src="https://www.youtube.com/embed/YKRoK42PNi8?autoplay=1&loop=1&mute=1&controls=0&showinfo=1&modestbranding=1&playsinline=1&rel=0&fs=0&playlist=YKRoK42PNi8"
            title="YouTube video player"
            allow="accelerometer; autoplay; loop; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full object-cover transform lg:scale-[1.25] scale-[4.25]"
          />
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <Swiper
            slidesPerView={1}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 3000 }}
            loop
            modules={[Autoplay, EffectFade]}
            className="w-full h-full"
          >
            {textSlides.map((slide, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="flex items-center justify-center text-center px-4 bg-transparent h-full">
                <p
                  className={cn(
                    "text-white font-bold text-4xl md:text-6xl lg:text-6xl",
                    "opacity-0 translate-y-8",
                    "swiper-slide-active:opacity-100 swiper-slide-active:translate-y-0",
                    "transition-all duration-1000 ease-out",
                  )}
                  style={{
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
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
    </section>
  );
}

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
