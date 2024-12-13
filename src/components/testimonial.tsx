"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Dialog } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

interface TestimonialData {
  id: number;
  name: string;
  image: string;
  videoUrl: string;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl
}) => {
  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match?.[2];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog onOpenChange={onClose} open={isOpen}>
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <HiX className="w-6 h-6 text-white" />
              </button>
            </div>

            <motion.div
              className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const testimonials = [
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
    id: 4,
    name: "Kahumuza Sandra | 2018",
    image: "/assets/images/testimonials/t4.jpg",
    videoUrl: "https://youtu.be/XtuYIh0YtMk?si=HGYsgSUfRoWvk-1W"
  }
] as const;

interface TestimonialSlideProps {
  testimonial: TestimonialData;
  isActive: boolean;
  onVideoClick: (url: string) => void;
}

const TestimonialSlide = React.memo(
  ({ testimonial, isActive, onVideoClick }: TestimonialSlideProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`bg-[#0097d1] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform ${
          isActive
            ? "scale-105 border-4 border-[#0097d1]"
            : "scale-95 opacity-70"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="group relative overflow-hidden rounded-xl">
          <motion.div
            className="relative h-full"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
              height={200}
              width={300}
              priority={testimonial.id <= 2}
              sizes="(max-inline-size: 640px) 100vw, (max-inline-size: 1024px) 50vw, 33vw"
              quality={85}
            />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center z-50">
            <motion.button
              onClick={() => onVideoClick(testimonial.videoUrl)}
              className="relative group focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute -inset-4 rounded-full">
                <div className="absolute inset-0 rounded-full bg-[#0097d1]/20 animate-[ping_2s_ease-out_infinite]" />
                <div className="absolute inset-0 rounded-full bg-[#0097d1]/10 animate-[ping_2s_ease-out_infinite_0.5s]" />
              </div>
              <PlayCircle className="w-16 h-16 text-[#0097d1] transition-transform group-hover:scale-110" />
            </motion.button>
          </div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 md:p-6"
            animate={{
              opacity: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col justify-end">
              <h3 className="text-md font-bold tracking-tight text-gray-50 md:text-lg">
                {testimonial.name}
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

TestimonialSlide.displayName = "TestimonialSlide";

const swiperConfig = {
  effect: "coverflow" as const,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  coverflowEffect: {
    rotate: 0,
    scale: 1.02,
    stretch: 20,
    depth: 150,
    modifier: 0.2,
    slideShadows: false
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  breakpoints: {
    640: {
      slidesPerView: 1
    },
    1024: {
      slidesPerView: 3
    }
  }
} as const;

const TestimonialSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const handleVideoClick = useCallback((url: string) => {
    setCurrentVideoUrl(url);
    setIsModalOpen(true);
  }, []);

  return (
    <section className="p-4 md:p-8 bg-white overflow-hidden">
      <div className="text-center lg:pb-[20px] pb-[10px] pt-2">
        <h1 className="text-4xl font-bold tracking-tight text-[#0097d1] lg:text-6xl">
          What Fellows Say?
        </h1>
      </div>
      <div className="w-full lg:w-full transform translate-x-0 lg:translate-x-12 mx-0 lg:mx-auto px-0 lg:px-4">
        <Swiper
          {...swiperConfig}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              className="swiper-slide p-4 mx-0 lg:mx-6"
            >
              {({ isActive }) => (
                <TestimonialSlide
                  testimonial={testimonial}
                  isActive={isActive}
                  onVideoClick={handleVideoClick}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={currentVideoUrl}
      />
    </section>
  );
};

export default TestimonialSection;
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { PlayCircle } from "lucide-react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectCoverflow } from "swiper/modules";
// import dynamic from "next/dynamic";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-coverflow";

// interface TestimonialData {
//   id: number;
//   name: string;
//   image: string;
//   videoUrl: string;
// }

// const testimonials: readonly TestimonialData[] = [
//   {
//     id: 1,
//     name: "Kababiito Tracy",
//     image: "/assets/images/testimonials/t1.jpg",
//     videoUrl: "https://youtu.be/oXPMzymNia0?si=T1ipM1N9x_bbTcET"
//   },
//   {
//     id: 2,
//     name: "Ruth Omar Esther | 2019",
//     image: "/assets/images/testimonials/testimonials-5.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=YmIsrwW2yCk"
//   },
//   {
//     id: 3,
//     name: "Nwali Rahim | 2020",
//     image: "/assets/images/testimonials/t3.jpg",
//     videoUrl: "https://youtu.be/Mf2TZRHQ180?si=QJ2rJaCTQhCDO0Te"
//   },
//   {
//     id: 4,
//     name: "Kahumuza Sandra | 2018",
//     image: "/assets/images/testimonials/t4.jpg",
//     videoUrl: "https://youtu.be/XtuYIh0YtMk?si=HGYsgSUfRoWvk-1W"
//   }
// ] as const;

// // Separate the TestimonialSlide into its own component
// const TestimonialSlide = React.memo<{
//   testimonial: TestimonialData;
//   isActive: boolean;
//   onVideoClick: (e: React.MouseEvent, url: string) => void;
// }>(({ testimonial, isActive, onVideoClick }) => (
//   <div
//     className={`bg-[#0097d1] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform ${
//       isActive ? "scale-105 border-4 border-[#0097d1]" : "scale-95 opacity-70"
//     }`}
//   >
//     <div className="group relative overflow-hidden rounded-xl">
//       <Image
//         src={testimonial.image}
//         alt={testimonial.name}
//         className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
//         height={200}
//         width={300}
//         priority={testimonial.id <= 2}
//         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//         quality={85}
//       />
//       <div className="absolute inset-0 flex items-center justify-center z-50">
//         <button
//           onClick={(e) => onVideoClick(e, testimonial.videoUrl)}
//           className="relative group focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
//           aria-label={`Watch ${testimonial.name}'s testimonial video`}
//         >
//           <PlayCircle className="w-16 h-16 text-[#0097d1] transition-transform group-hover:scale-110" />
//         </button>
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 md:p-6">
//         <div className="flex h-full flex-col justify-end">
//           <h3 className="text-md font-bold tracking-tight text-gray-50 md:text-lg">
//             {testimonial.name}
//           </h3>
//         </div>
//       </div>
//     </div>
//   </div>
// ));

// TestimonialSlide.displayName = "TestimonialSlide";

// const swiperConfig = {
//   effect: "coverflow" as const,
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: 1,
//   loop: true,
//   coverflowEffect: {
//     rotate: 0,
//     scale: 1.02,
//     stretch: 20,
//     depth: 150,
//     modifier: 0.2,
//     slideShadows: false
//   },
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false
//   },
//   breakpoints: {
//     640: {
//       slidesPerView: 1
//     },
//     1024: {
//       slidesPerView: 3
//     }
//   }
// };

// const TestimonialSection: React.FC = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [glightbox, setGlightbox] = useState<any>(null);

//   useEffect(() => {
//     setIsMounted(true);

//     // Initialize GLightbox only after component mount
//     const loadGLightbox = async () => {
//       try {
//         const GLightbox = (await import("glightbox")).default;
//         const instance = GLightbox({
//           touchNavigation: true,
//           loop: true,
//           autoplayVideos: true
//         });
//         setGlightbox(instance);
//       } catch (error) {
//         console.error("Error loading GLightbox:", error);
//       }
//     };

//     loadGLightbox();

//     return () => {
//       if (glightbox) {
//         glightbox.destroy();
//       }
//     };
//   }, []);

//   const handleVideoClick = (e: React.MouseEvent, url: string) => {
//     e.preventDefault();
//     if (glightbox) {
//       glightbox.setElements([
//         {
//           href: url,
//           type: "video",
//           source: "youtube"
//         }
//       ]);
//       glightbox.open();
//     }
//   };

//   if (!isMounted) {
//     return null; // or a loading skeleton
//   }

//   return (
//     <section className="p-4 md:p-8 bg-white overflow-hidden">
//       <div className="text-center lg:pb-[20px] pb-[10px] pt-2">
//         <h1 className="text-4xl font-bold tracking-tight text-[#0097d1] lg:text-6xl">
//           What Fellows Say?
//         </h1>
//       </div>
//       <div className="w-full lg:w-full transform translate-x-0 lg:translate-x-12 mx-0 lg:mx-auto px-0 lg:px-4">
//         <Swiper
//           {...swiperConfig}
//           modules={[EffectCoverflow, Autoplay]}
//           className="mySwiper"
//         >
//           {testimonials.map((testimonial) => (
//             <SwiperSlide
//               key={testimonial.id}
//               className="swiper-slide p-4 mx-0 lg:mx-6"
//             >
//               {({ isActive }) => (
//                 <TestimonialSlide
//                   testimonial={testimonial}
//                   isActive={isActive}
//                   onVideoClick={handleVideoClick}
//                 />
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;
