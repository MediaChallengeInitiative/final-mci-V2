"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Partner {
  logo: string;
  name: string;
  id: number;
}

// Move partners data outside component to prevent recreating on each render
const partners: Partner[] = [
  {
    id: 1,
    name: "Partner 1",
    logo: "/assets/images/partners/partner-1.png"
  },
  {
    id: 2,
    name: "Partner 2",
    logo: "/assets/images/partners/partner-2.png"
  },
  {
    id: 3,
    name: "Partner 3",
    logo: "/assets/images/partners/partner-3.png"
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "/assets/images/partners/partner-4.png"
  },
  {
    id: 5,
    name: "Partner 5",
    logo: "/assets/images/partners/partner-5.png"
  },
  {
    id: 6,
    name: "Partner 6",
    logo: "/assets/images/partners/partner-6.png"
  },
  {
    id: 7,
    name: "Partner 7",
    logo: "/assets/images/partners/partner-7.png"
  },
  {
    id: 8,
    name: "Partner 8",
    logo: "/assets/images/partners/partner-8.png"
  }
];

// Animation variants
const animations = {
  header: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  underline: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  },
  logo: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
};

// Memoized PartnerLogo component
const PartnerLogo = React.memo<{ partner: Partner }>(({ partner }) => (
  <motion.div
    variants={animations.logo}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="partner-logo-item px-4 py-6 
      flex items-center justify-center
      group transition-all duration-300 
      hover:scale-110 hover:-translate-y-1"
  >
    <div className="relative w-full aspect-[3/2] max-w-[160px]">
      <Image
        src={partner.logo}
        alt={`${partner.name} logo`}
        fill
        className="object-contain transition-transform duration-300"
        sizes="(max-width: 768px) 100px, 160px"
        loading="lazy"
        quality={85}
      />
    </div>
  </motion.div>
));

PartnerLogo.displayName = "PartnerLogo";

const Partners: React.FC = () => {
  // Memoize Swiper configuration
  const swiperConfig: SwiperOptions = useMemo(
    () => ({
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 7000,
      grabCursor: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 20 },
        480: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 4, spaceBetween: 25 },
        1200: { slidesPerView: 6, spaceBetween: 30 },
        2000: { slidesPerView: 8, spaceBetween: 30 }
      }
    }),
    []
  );

  return (
    <section
      className="relative w-full bg-gradient-to-b from-white to-white overflow-hidden py-16 sm:py-24"
      aria-label="Our Partners"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={animations.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-4">
            Our Partners
            <motion.div
              variants={animations.underline}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-6 rounded-full"
            />
          </h2>
          <p className="mx-auto text-center max-w-3xl text-gray-900 md:text-lg lg:text-xl">
            Collaborating with industry leaders to deliver excellence
          </p>
        </motion.div>

        {/* Partners Slider */}
        <div className="relative">
          <Swiper
            {...swiperConfig}
            modules={[Autoplay]}
            className="partner-swiper !overflow-visible"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id} className="swiper-slide">
                <PartnerLogo partner={partner} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .partner-swiper {
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
        .partner-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-swiper .swiper-wrapper {
            transition: none !important;
          }
          .partner-logo-item {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(Partners);

// "use client";

// import React from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import type { SwiperOptions } from "swiper/types";
// import { motion } from "framer-motion";

// // Styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// interface Partner {
//   logo: string;
//   name: string;
//   id: number;
// }

// const partners: Partner[] = [
//   {
//     id: 1,
//     name: "Partner 1",
//     logo: "/assets/images/partners/partner-1.png"
//   },
//   {
//     id: 2,
//     name: "Partner 2",
//     logo: "/assets/images/partners/partner-2.png"
//   },
//   {
//     id: 3,
//     name: "Partner 3",
//     logo: "/assets/images/partners/partner-3.png"
//   },
//   {
//     id: 4,
//     name: "Partner 4",
//     logo: "/assets/images/partners/partner-4.png"
//   },
//   {
//     id: 5,
//     name: "Partner 5",
//     logo: "/assets/images/partners/partner-5.png"
//   },
//   {
//     id: 6,
//     name: "Partner 6",
//     logo: "/assets/images/partners/partner-6.png"
//   },
//   {
//     id: 7,
//     name: "Partner 7",
//     logo: "/assets/images/partners/partner-7.png"
//   },
//   {
//     id: 8,
//     name: "Partner 8",
//     logo: "/assets/images/partners/partner-8.png"
//   }
// ];

// const swiperConfig: SwiperOptions = {
//   slidesPerView: "auto",
//   spaceBetween: 30, // Added space between slides
//   loop: true,
//   speed: 7000,
//   grabCursor: true,
//   autoplay: {
//     delay: 1,
//     disableOnInteraction: false
//   },
//   breakpoints: {
//     320: { slidesPerView: 2, spaceBetween: 20 },
//     480: { slidesPerView: 3, spaceBetween: 20 },
//     768: { slidesPerView: 4, spaceBetween: 25 },
//     1200: { slidesPerView: 6, spaceBetween: 30 },
//     2000: { slidesPerView: 8, spaceBetween: 30 }
//   }
// };

// export default function Partners() {
//   return (
//     <section className="relative w-full bg-gradient-to-b from-white to-white overflow-hidden py-16 sm:py-24">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-4">
//             Our Partners
//             <motion.div
//               className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-6 rounded-full"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//           </h2>
//           <p className="mx-auto text-center max-w-3xl text-gray-900 md:text-lg lg:text-xl">
//             Collaborating with industry leaders to deliver excellence
//           </p>
//         </motion.div>

//         {/* Partners Slider */}
//         <div className="relative">
//           <Swiper
//             {...swiperConfig}
//             modules={[Autoplay]}
//             className="partner-swiper !overflow-visible"
//             style={{
//               transitionTimingFunction: "linear"
//             }}
//           >
//             {partners.map((partner) => (
//               <SwiperSlide key={partner.id} className="swiper-slide">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.3 }}
//                   className="partner-logo-item px-4 py-6
//                     flex items-center justify-center
//                     group transition-all duration-300
//                     hover:scale-110 hover:-translate-y-1"
//                 >
//                   <div className="relative w-full aspect-[3/2] max-w-[160px]">
//                     <Image
//                       src={partner.logo}
//                       alt={`${partner.name} logo`}
//                       fill
//                       className="object-contain transition-transform duration-300"
//                       sizes="(max-width: 768px) 100px, 160px"
//                     />
//                   </div>
//                 </motion.div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";
// import React from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

// interface PartnerProps {
//   logo: string;
// }

// const partnerLogo: PartnerProps[] = [
//   {
//     logo: "/assets/images/partners/partner-1.png",
//   },
//   {
//     logo: "/assets/images/partners/partner-2.png",
//   },
//   {
//     logo: "/assets/images/partners/partner-3.png",
//   },
//   {
//     logo: "/assets/images/partners/partner-4.png",
//   },
//   {
//     logo: "/assets/images/partners/partner-5.png",
//   },
//   {
//     logo: "/assets/images/partners/partner-6.png",
//   },
//   {
//     logo: "/assets/images/partners/partner-7.png",
//   },
//   {
//     logo: "/assets/images/partners/partner-8.png",
//   },
// ];

// export default function Partners() {
//   return (
//     <>
//       <div className="bg-white ">
//         <div className="text-center lg:pb-[30px] pb-[20px]">
//           <h1 className="text-4xl font-bold tracking-tight text-[#0097d1] sm:text-6xl py-10">
//             Our Partners
//           </h1>
//         </div>
//         <div className="swiper partner-swiper">
//           <Swiper
//             slidesPerView={"auto"}
//             spaceBetween={0}
//             loop={true}
//             speed={7000}
//             grabCursor={true}
//             autoplay={{
//               delay: 1,
//               disableOnInteraction: false,
//             }}
//             modules={[Autoplay]}
//             breakpoints={{
//               320: {
//                 slidesPerView: 2,
//               },
//               480: {
//                 slidesPerView: 3,
//               },
//               768: {
//                 slidesPerView: 4,
//               },
//               1200: {
//                 slidesPerView: 6,
//               },
//               2000: {
//                 slidesPerView: 8,
//               },
//             }}
//             className="swiper-wrapper"
//             style={{ transitionTimingFunction: "linear" }}
//           >
//             {partnerLogo.map((logo: any, i: number) => (
//               <SwiperSlide key={i} className="swiper-slide">
//                 <div className="partner-logo-item">
//                   <Image
//                     width={100}
//                     height={100}
//                     src={`${logo.logo}`}
//                     alt="pratners"
//                     className="lg:max-w-[138px] max-w-[100px] mx-auto"
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//       {/*========== PARTNER STYLE ONE END ==========*/}
//     </>
//   );
// }
