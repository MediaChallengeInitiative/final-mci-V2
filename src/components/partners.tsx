"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

interface PartnerProps {
  logo: string;
}

const partnerLogo: PartnerProps[] = [
  {
    logo: "/assets/images/partners/partner-1.png",
  },
  {
    logo: "/assets/images/partners/partner-2.png",
  },
  {
    logo: "/assets/images/partners/partner-3.png",
  },
  {
    logo: "/assets/images/partners/partner-4.png",
  },
  {
    logo: "/assets/images/partners/partner-5.png",
  },
  {
    logo: "/assets/images/partners/partner-6.png",
  },
  {
    logo: "/assets/images/partners/partner-7.png",
  },
  {
    logo: "/assets/images/partners/partner-8.png",
  },
];

export default function Partners() {
  return (
    <>
      <div className="bg-white ">
        <div className="text-center lg:pb-[30px] pb-[20px]">
          <h1 className="text-4xl font-bold tracking-tight text-[#0097d1] sm:text-6xl py-10">
            Our Partners
          </h1>
        </div>
        <div className="swiper partner-swiper">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={0}
            loop={true}
            speed={7000}
            grabCursor={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 6,
              },
              2000: {
                slidesPerView: 8,
              },
            }}
            className="swiper-wrapper"
            style={{ transitionTimingFunction: "linear" }}
          >
            {partnerLogo.map((logo: any, i: number) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="partner-logo-item">
                  <Image
                    width={100}
                    height={100}
                    src={`${logo.logo}`}
                    alt="pratners"
                    className="lg:max-w-[138px] max-w-[100px] mx-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/*========== PARTNER STYLE ONE END ==========*/}
    </>
  );
}
