"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { WhereAlumniWorkData } from "@/interface/interface";
import "swiper/css";
import { urlFor } from "@/lib/sanity";

interface LogoSlideProps {
  logo: WhereAlumniWorkData;
}

const LogoSlide: React.FC<LogoSlideProps> = ({ logo }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative h-24 bg-white rounded-lg shadow-md p-4 mx-2 
               transform transition-all duration-300 hover:shadow-lg"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-lg" />
    <div className="relative h-full flex items-center justify-center">
      <Image
        src={urlFor(logo.image).url()}
        alt={logo.employerName}
        width={120}
        height={80}
        className="object-contain max-h-full transition-all duration-300"
      />
    </div>
  </motion.div>
);

interface PartnerLogosProps {
  logos?: WhereAlumniWorkData[] | null;
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({ logos = [] }) => {
  // Check if logos is valid and has items
  if (!Array.isArray(logos) || logos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-50">
        <p className="text-gray-500">No partner logos available</p>
      </div>
    );
  }

  // Ensure we have enough items for smooth scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos]; // Triple the array for smoother infinite scroll

  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Where Our Alumni Work
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-4 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading organizations to drive innovation in
            journalism
          </p>
        </motion.div>

        {/* Logo Sliders */}
        <div className="space-y-8">
          {/* First Row - Left to Right */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              loop={true}
              speed={3000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: false
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 }
              }}
              className="partners-slider"
            >
              {duplicatedLogos.map((logo, index) => (
                <SwiperSlide key={`${logo.currentSlug}-${index}`}>
                  <LogoSlide logo={logo} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Second Row - Right to Left */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              loop={true}
              speed={3000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 }
              }}
              className="partners-slider"
            >
              {[...duplicatedLogos].reverse().map((logo, index) => (
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
        }
        .partners-slider .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default PartnerLogos;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import Image from "next/image";
// import "swiper/css";
// import { WhereAlumniWorkData } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";

// interface LogoSlideProps {
//   logo: WhereAlumniWorkData;
// }

// const LogoSlide: React.FC<LogoSlideProps> = ({ logo }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="relative h-24 bg-white rounded-lg shadow-md p-4 mx-2
//                transform transition-all duration-300 hover:shadow-lg"
//   >
//     <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-lg" />
//     <div className="relative h-full flex items-center justify-center">
//       <Image
//         src={urlFor(logo.image).url()}
//         alt={logo.employerName}
//         width={120}
//         height={80}
//         className="object-contain max-h-full transition-all duration-300"
//       />
//     </div>
//   </motion.div>
// );

// interface PartnerLogosProps {
//   logos: WhereAlumniWorkData[];
// }

// const PartnerLogos: React.FC = () => {
//   return (
//     <section className="relative bg-gray-50 py-20 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent" />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Where Our Alumni Work
//             <motion.div
//               className="h-1 w-24 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-4 rounded-full"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Collaborating with leading organizations to drive innovation in
//             journalism
//           </p>
//         </motion.div>

//         {/* Logo Sliders */}
//         <div className="space-y-8">
//           {/* First Row - Left to Right */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Swiper
//               modules={[Autoplay]}
//               slidesPerView="auto"
//               loop={true}
//               speed={3000}
//               autoplay={{
//                 delay: 0,
//                 disableOnInteraction: false,
//                 reverseDirection: false
//               }}
//               breakpoints={{
//                 320: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 768: { slidesPerView: 4 },
//                 1024: { slidesPerView: 6 }
//               }}
//               className="partners-slider"
//             >
//               {partnerLogos.map((logo) => (
//                 <SwiperSlide key={logo.id}>
//                   <LogoSlide logo={logo} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </motion.div>

//           {/* Second Row - Right to Left */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Swiper
//               modules={[Autoplay]}
//               slidesPerView="auto"
//               loop={true}
//               speed={3000}
//               autoplay={{
//                 delay: 0,
//                 disableOnInteraction: false,
//                 reverseDirection: true
//               }}
//               breakpoints={{
//                 320: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 768: { slidesPerView: 4 },
//                 1024: { slidesPerView: 6 }
//               }}
//               className="partners-slider"
//             >
//               {[...partnerLogos].reverse().map((logo) => (
//                 <SwiperSlide key={logo.id}>
//                   <LogoSlide logo={logo} />
//                 </SwiperSlide>
//               ))}
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
//         }
//         .partners-slider .swiper-wrapper {
//           transition-timing-function: linear !important;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PartnerLogos;
