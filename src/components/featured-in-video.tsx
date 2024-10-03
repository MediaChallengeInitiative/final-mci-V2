"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

declare const GLightbox: any;

export default function FeaturedInVideo() {
  useEffect(() => {
    const glightbox = GLightbox({
      selector: ".glightbox"
    });
  }, []);
  return (
    <>
      <section id="featuredin-section-bg" className="bg-white pb-0 lg:pb-10">
        <div className="max-w-[1570px] pt-4 pb-2 mx-auto px-3 bg-transparent">
          <div className="text-center lg:pb-[16px] pb-[40px]">
            <h2 className="text-4xl font-bold tracking-tight text-[#0097d1] lg:text-6xl">
              Featured In
            </h2>
          </div>
        </div>

        <div
          // style={{ width: "80%" }}
          className="paralax-container w-[100%] lg:w-[80%] lg:rounded-2xl mx-auto lg:py-60 py-60 relative overflow-hidden before:absolute before:content-[''] before:inset-0 before:bg-dark-base before:bg-opacity-30 before:z-1"
        >
          <div className="jarallax absolute inset-0 h-[400px] lg:h-[600px]" data-jarallax="">
            <Image
              width={300}
              height={300}
              className="jarallax-img w-full h-full object-cover "
              src="/assets/images/others/leaders-africa.png"
              alt="Featured speaker"
              objectFit="cover"
            />
          </div>
          <div className="container relative z-2">
            <div className="max-w-[560px] mx-auto text-center text-white">
              <Link
                href="https://youtu.be/R8vH6qfSQjI?si=zpnsyZdCkKNu8xuY"
                className="mt-8 glightbox inline-flex relative lg:h-20 lg:w-20 h-16 w-16 justify-center items-center rounded-full bg-primary-1 before:content-[''] before:absolute before:-inset-3 before:border-primary-1 before:border-2 before:rounded-full before:animate-pulse"
              >
                <FaPlay className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
