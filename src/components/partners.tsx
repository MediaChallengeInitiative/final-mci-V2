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

const PartnerLogo = React.memo<{ partner: Partner }>(({ partner }) => (
  <motion.div
    variants={animations.logo}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="px-4 py-6 flex items-center justify-center transition-transform duration-300 hover:scale-105"
  >
    <div className="relative w-full aspect-[3/2] max-w-[180px]">
      <Image
        src={partner.logo}
        alt={`${partner.name} logo`}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 120px, 180px"
        loading="lazy"
        quality={90}
      />
    </div>
  </motion.div>
));

PartnerLogo.displayName = "PartnerLogo";

const Partners: React.FC = () => {
  const swiperConfig: SwiperOptions = useMemo(
    () => ({
      slidesPerView: "auto",
      spaceBetween: 32,
      loop: true,
      speed: 8000,
      grabCursor: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 24 },
        480: { slidesPerView: 3, spaceBetween: 24 },
        768: { slidesPerView: 4, spaceBetween: 28 },
        1200: { slidesPerView: 6, spaceBetween: 32 },
        1600: { slidesPerView: 7, spaceBetween: 32 }
      }
    }),
    []
  );

  return (
    <section className="relative w-full bg-gradient-to-br from-white via-gray-50 to-white py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/5" />

      {/* Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="h-1 w-32 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-6 rounded-full"
            />
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver excellence
          </p>
        </motion.div>

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <Swiper
            {...swiperConfig}
            modules={[Autoplay]}
            className="!overflow-visible"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <PartnerLogo partner={partner} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper {
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
        .swiper .swiper-wrapper {
          transition-timing-function: linear !important;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .swiper .swiper-wrapper {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(Partners);
