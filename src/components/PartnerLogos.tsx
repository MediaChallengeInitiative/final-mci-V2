"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { WhereAlumniWorkData } from "@/interface/interface";
import "swiper/css";
import { urlFor } from "@/lib/sanity";

// Separate LogoSlide component with memoization
const LogoSlide = React.memo<{ logo: WhereAlumniWorkData }>(({ logo }) => {
  const imageUrl = useMemo(() => urlFor(logo.image).url(), [logo.image]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative h-24 bg-white rounded-lg shadow-md p-4 mx-2 
                 transform transition-all duration-300 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-lg" />
      <div className="relative h-full flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={logo.employerName}
          width={120}
          height={80}
          className="object-contain max-h-full transition-all duration-300"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
});

LogoSlide.displayName = "LogoSlide";

// Animation variants
const sectionAnimations = {
  header: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  slider: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  underline: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  }
};

// Memoized Swiper settings
const swiperConfig = {
  modules: [Autoplay],
  slidesPerView: "auto" as const,
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  breakpoints: {
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 6 }
  }
};

interface PartnerLogosProps {
  logos?: WhereAlumniWorkData[] | null;
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({ logos = [] }) => {
  // Always call useMemo, even if logos array is empty
  const duplicatedLogos = useMemo(() => {
    return Array.isArray(logos) ? [...logos, ...logos, ...logos] : [];
  }, [logos]);

  // Early return after hooks
  if (!Array.isArray(logos) || logos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-50">
        <p className="text-gray-500">No partner logos available</p>
      </div>
    );
  }

  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionAnimations.header}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Where Our Alumni Work
            <motion.div
              variants={sectionAnimations.underline}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-4 rounded-full"
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading organizations to drive innovation in
            journalism
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Left to Right Slider */}
          <motion.div
            variants={sectionAnimations.slider}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Swiper {...swiperConfig} className="partners-slider">
              {duplicatedLogos.map((logo, index) => (
                <SwiperSlide key={`${logo.currentSlug}-${index}`}>
                  <LogoSlide logo={logo} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Right to Left Slider */}
          <motion.div
            variants={sectionAnimations.slider}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Swiper
              {...swiperConfig}
              autoplay={{
                ...swiperConfig.autoplay,
                reverseDirection: true
              }}
              className="partners-slider"
            >
              {duplicatedLogos
                .slice()
                .reverse()
                .map((logo, index) => (
                  <SwiperSlide key={`${logo.currentSlug}-reverse-${index}`}>
                    <LogoSlide logo={logo} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl" />
      </div>

      <style jsx global>{`
        .partners-slider {
          width: 100%;
          overflow: visible;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
        .partners-slider .swiper-wrapper {
          transition-timing-function: linear !important;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-slider .swiper-wrapper {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(PartnerLogos);

// "use client";

// import React, { useMemo } from "react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import Image from "next/image";
// import { WhereAlumniWorkData } from "@/interface/interface";
// import "swiper/css";
// import { urlFor } from "@/lib/sanity";

// // Separate LogoSlide component with memoization
// const LogoSlide = React.memo<{ logo: WhereAlumniWorkData }>(({ logo }) => {
//   const imageUrl = useMemo(() => urlFor(logo.image).url(), [logo.image]);

//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="relative h-24 bg-white rounded-lg shadow-md p-4 mx-2
//                  transform transition-all duration-300 hover:shadow-lg"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-lg" />
//       <div className="relative h-full flex items-center justify-center">
//         <Image
//           src={imageUrl}
//           alt={logo.employerName}
//           width={120}
//           height={80}
//           className="object-contain max-h-full transition-all duration-300"
//           loading="lazy"
//         />
//       </div>
//     </motion.div>
//   );
// });

// LogoSlide.displayName = "LogoSlide";

// // Animation variants
// const sectionAnimations = {
//   header: {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0 }
//   },
//   slider: {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 }
//   },
//   underline: {
//     hidden: { scaleX: 0 },
//     visible: { scaleX: 1 }
//   }
// };

// interface PartnerLogosProps {
//   logos?: WhereAlumniWorkData[] | null;
// }

// const PartnerLogos: React.FC<PartnerLogosProps> = ({ logos = [] }) => {
//   // Memoize duplicated logos
//   const duplicatedLogos = useMemo(() => {
//     if (!Array.isArray(logos) || logos.length === 0) return [];
//     return [...logos, ...logos, ...logos];
//   }, [logos]);

//   if (!Array.isArray(logos) || logos.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] bg-gray-50">
//         <p className="text-gray-500">No partner logos available</p>
//       </div>
//     );
//   }

//   // Memoize Swiper settings
//   const swiperConfig = useMemo(
//     () => ({
//       modules: [Autoplay],
//       slidesPerView: "auto" as const,
//       loop: true,
//       speed: 3000,
//       autoplay: {
//         delay: 0,
//         disableOnInteraction: false
//       },
//       breakpoints: {
//         320: { slidesPerView: 2 },
//         640: { slidesPerView: 3 },
//         768: { slidesPerView: 4 },
//         1024: { slidesPerView: 6 }
//       }
//     }),
//     []
//   );

//   return (
//     <section className="relative bg-gray-50 py-20 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent" />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           variants={sectionAnimations.header}
//           initial="hidden"
//           whileInView="visible"
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Where Our Alumni Work
//             <motion.div
//               variants={sectionAnimations.underline}
//               initial="hidden"
//               whileInView="visible"
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="h-1 w-24 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-4 rounded-full"
//             />
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Collaborating with leading organizations to drive innovation in
//             journalism
//           </p>
//         </motion.div>

//         <div className="space-y-8">
//           {/* Left to Right Slider */}
//           <motion.div
//             variants={sectionAnimations.slider}
//             initial="hidden"
//             whileInView="visible"
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Swiper {...swiperConfig} className="partners-slider">
//               {duplicatedLogos.map((logo, index) => (
//                 <SwiperSlide key={`${logo.currentSlug}-${index}`}>
//                   <LogoSlide logo={logo} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </motion.div>

//           {/* Right to Left Slider */}
//           <motion.div
//             variants={sectionAnimations.slider}
//             initial="hidden"
//             whileInView="visible"
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Swiper
//               {...swiperConfig}
//               autoplay={{
//                 ...swiperConfig.autoplay,
//                 reverseDirection: true
//               }}
//               className="partners-slider"
//             >
//               {duplicatedLogos
//                 .slice()
//                 .reverse()
//                 .map((logo, index) => (
//                   <SwiperSlide key={`${logo.currentSlug}-reverse-${index}`}>
//                     <LogoSlide logo={logo} />
//                   </SwiperSlide>
//                 ))}
//             </Swiper>
//           </motion.div>
//         </div>

//         {/* Decorative Elements */}
//         <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl" />
//       </div>

//       <style jsx global>{`
//         .partners-slider {
//           width: 100%;
//           overflow: visible;
//           -webkit-mask-image: linear-gradient(
//             to right,
//             transparent,
//             black 10%,
//             black 90%,
//             transparent
//           );
//           mask-image: linear-gradient(
//             to right,
//             transparent,
//             black 10%,
//             black 90%,
//             transparent
//           );
//         }
//         .partners-slider .swiper-wrapper {
//           transition-timing-function: linear !important;
//           will-change: transform;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .partners-slider .swiper-wrapper {
//             transition: none !important;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default React.memo(PartnerLogos);
