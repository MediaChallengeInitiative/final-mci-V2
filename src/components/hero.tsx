"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/assets/images/hero/hero-2.jpg",
      belief: "We believe",
      mainText: "JOURNALISM",
      subText: ["CAN MAKE THE ", "WORLD"],
      lastLine: "A BETTER PLACE"
    },
    {
      image: "/assets/images/hero/hero-3.jpg",
      belief: "We strive for",
      mainText: "TRUTH",
      subText: ["THAT EMPOWERS ", "SOCIETY"],
      lastLine: "TO PROGRESS"
    },
    {
      image: "/assets/images/hero/hero-4.jpg",
      belief: "We champion",
      mainText: "INTEGRITY",
      subText: ["IN EVERY ", "STORY"],
      lastLine: "WE TELL"
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false
    });

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [currentSlide]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      // style={{
      //   clipPath: "polygon(0 0, 100% 0%, 100% 94%, 0% 100%)"
      // }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-500 via-sky-500/50 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <p
          data-aos="fade-up"
          data-aos-delay="0"
          className="font-playwrite text-orange-500 text-left w-full lg:w-[68%] text-2xl md:text-4xl lg:text-5xl font-light mb-2 md:mb-4 sm:text-2xl"
        >
          {slides[currentSlide].belief}
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-4xl md:text-6xl lg:text-[9.4rem] font-bold mb-2 md:mb-4"
        >
          {slides[currentSlide].mainText}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-4xl text-center lg:text-left md:text-6xl lg:text-[5rem] pt-2 font-bold mb-4 md:mb-4"
        >
          {slides[currentSlide].subText[0]}
          <span className="text-orange-500">
            {slides[currentSlide].subText[1]}
          </span>
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="600"
          className="text-4xl md:text-6xl lg:text-[7.2rem] font-bold"
        >
          {slides[currentSlide].lastLine}
        </p>
      </div>
    </div>
  );
};

export default Hero;

// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     "/assets/images/hero/hero-2.jpg",
//     "/assets/images/hero/hero-3.jpg",
//     "/assets/images/hero/hero-4.jpg"
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="relative w-full h-screen overflow-hidden"
//       style={{
//         clipPath: "polygon(0 0, 100% 0%, 100% 94%, 0% 100%)"
//       }}
//     >
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <Image
//             src={slide}
//             alt={`Slide ${index + 1}`}
//             layout="fill"
//             objectFit="cover"
//             priority
//           />
//         </div>
//       ))}
//       <div className="absolute inset-0 bg-gradient-to-t from-sky-500 via-sky-500/50 to-transparent" />
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
//         <p
//           style={{ fontFamily: "Playwrite CU" }}
//           className="text-orange-500 text-left w-[68%] text-2xl md:text-4xl lg:text-5xl font-light mb-2 md:mb-4"
//         >
//           We believe
//         </p>
//         <h1 className="text-4xl md:text-6xl lg:text-[9.4rem] font-bold mb-2 md:mb-4">
//           JOURNALISM
//         </h1>
//         <p className="text-4xl md:text-6xl lg:text-[5rem] pt-2 font-bold">
//           CAN MAKE THE <span className="text-orange-500">WORLD</span>
//         </p>
//         <p className="text-4xl md:text-6xl lg:text-[7.2rem] font-bold">
//           A BETTER PLACE
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Hero;
