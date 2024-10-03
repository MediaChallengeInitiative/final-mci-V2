// "use client";

// import React, { useEffect, useRef } from "react";
// import { PlayCircle } from "lucide-react";

// const testimonials = [
//   {
//     name: "ephraim bukenya",
//     image: "/assets/images/testimonials/testimonials-5.jpg",
//     videoUrl: "#"
//   },
//   {
//     name: "jane doe",
//     image: "/assets/images/testimonials/testimonials-5.jpg",
//     videoUrl: "#"
//   },
//   {
//     name: "john smith",
//     image: "/assets/images/testimonials/testimonials-5.jpg",
//     videoUrl: "#"
//   }
// ];

// export default function VideoTestimonials() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollElement = scrollRef.current;
//     if (scrollElement) {
//       const scrollWidth = scrollElement.scrollWidth;
//       const clientWidth = scrollElement.clientWidth;

//       let scrollPosition = 0;
//       const scroll = () => {
//         scrollPosition += 1;
//         if (scrollPosition > scrollWidth - clientWidth) {
//           scrollPosition = 0;
//         }
//         scrollElement.scrollTo(scrollPosition, 0);
//       };

//       const intervalId = setInterval(scroll, 50);

//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-16">
//       <h2 className="text-4xl md:text-5xl font-bold text-center text-sky-500 mb-12">
//         what fellows say
//       </h2>
//       <div
//         ref={scrollRef}
//         className="flex overflow-x-hidden"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         {[...testimonials, ...testimonials].map((testimonial, index) => (
//           <div key={index} className="flex-shrink-0 w-full px-4">
//             <div className="relative rounded-3xl overflow-hidden shadow-lg">
//               <img
//                 src={testimonial.image}
//                 alt={testimonial.name}
//                 className="w-full h-auto"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
//                 <PlayCircle className="w-16 h-16 text-sky-500" />
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//                 <h3 className="text-xl font-semibold text-white">
//                   {testimonial.name}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

declare const GLightbox: any;

interface TestimonialData {
  id: number;
  name: string;
  image: string;
  videoUrl: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Kababiito Tracy",
    image: "/assets/images/testimonials/t1.jpg",
    videoUrl: "https://youtu.be/oXPMzymNia0?si=T1ipM1N9x_bbTcET"
  },
  {
    id: 2,
    name: "Ruth Omar Esther | 2019",
    image: "/assets/images/testimonials/testimonials-5.jpg",
    videoUrl: "https://www.youtube.com/watch?v=YmIsrwW2yCk"
  },
  {
    id: 3,
    name: "Nwali Rahim | 2020",
    image: "/assets/images/testimonials/t3.jpg",
    videoUrl: "https://youtu.be/Mf2TZRHQ180?si=QJ2rJaCTQhCDO0Te"
  },
  {
    id: 2,
    name: "Kahumuza Sandra | 2018",
    image: "/assets/images/testimonials/t4.jpg",
    videoUrl: "https://youtu.be/XtuYIh0YtMk?si=HGYsgSUfRoWvk-1W"
  }
];

const TestimonialSection: React.FC = () => {
  useEffect(() => {
    const glightbox = GLightbox({
      selector: ".glightbox"
    });
  }, []);
  return (
    <section className="pb-4 bg-white overflow-hidden">
      <div className="text-center lg:pb-[20px] pb-[10px] pt-2">
        <h1 className="text-4xl font-bold tracking-tight text-[#0097d1] lg:text-6xl">
          What Fellows Say?
        </h1>
      </div>
      <div className="w-[100%] lg:w-[100%] transform translate-x-0 lg:translate-x-12 mx-0 lg:mx-auto px-0 lg:px-4">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1
            },
            1024: {
              slidesPerView: 3
            }
          }}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            scale: 1.02,
            stretch: 20,
            depth: 150,
            modifier: 0.2,
            slideShadows: false
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="swiper-slide p-4 mx-0 lg:mx-6">
              {({ isActive }) => (
                <div
                  className={`bg-[#0097d1] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform ${
                    isActive
                      ? "scale-105 border-4 border-[#0097d1]"
                      : "scale-95 opacity-70"
                  }`}
                >
                  <div className="group relative overflow-hidden rounded-xl">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                      height="200"
                      style={{
                        aspectRatio: "300/200",
                        objectFit: "cover"
                      }}
                      width="300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                      <Link
                        href={`${testimonial.videoUrl}`}
                        className="relative glightbox group"
                      >
                        <PlayCircle className="w-16 h-16 text-[#0097d1] cursor-pointer transition-transform group-hover:scale-110" />
                      </Link>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 md:p-6">
                      <div className="flex h-full flex-col justify-end">
                        <div className="space-y-2">
                          <h3 className="text-md font-bold tracking-tight text-gray-50 md:text-lg">
                            {testimonial.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
