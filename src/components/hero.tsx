"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSlide {
  image: string;
  preText: string;
  lines: string[];
}

interface TextMetrics {
  fontSize: string;
  letterSpacing: string;
  wordSpacing: string;
  scale: number;
}

interface TextStyles {
  [key: string]: TextMetrics;
}

const SLIDE_DURATION = 7000;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textStyles, setTextStyles] = useState<TextStyles>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const slides: HeroSlide[] = [
    {
      image: "/assets/images/hero/hero-2.jpg",
      preText: "we believe",
      lines: ["JOURNALISM", "CAN MAKE THE WORLD", "A BETTER PLACE"]
    },
    {
      image: "/assets/images/hero/hero-3.jpg",
      preText: "so we envision",
      lines: ["A HUMANE", "AND HEALTHY MEDIA", "ECOSYSTEM"]
    },
    {
      image: "/assets/images/hero/hero-4.jpg",
      preText: "that",
      lines: ["PUTS PEOPLE", "AND PLANET FIRST. PROFITS", "MAKE IT POSSIBLE"]
    }
  ];

  const calculateTextMetrics = (
    text: string,
    containerWidth: number,
    baseSize: number,
    targetWidth: number = containerWidth
  ): TextMetrics => {
    const measurer = document.createElement("div");
    measurer.style.position = "absolute";
    measurer.style.visibility = "hidden";
    measurer.style.whiteSpace = "nowrap";
    measurer.style.fontWeight = "bold";
    measurer.style.fontFamily = "inherit";
    document.body.appendChild(measurer);

    const words = text.split(" ");
    const letterCount = text.replace(/\s/g, "").length;
    const wordCount = words.length;

    let fontSize = baseSize;
    let letterSpacing = 0;
    let wordSpacing = 0;
    let scale = 1;

    const measureText = () => {
      measurer.style.fontSize = `${fontSize}px`;
      measurer.style.letterSpacing = `${letterSpacing}px`;
      measurer.style.wordSpacing = `${wordSpacing}px`;
      measurer.textContent = text;
      return measurer.offsetWidth;
    };

    const fitText = () => {
      const currentWidth = measureText();
      const ratio = targetWidth / currentWidth;

      if (Math.abs(ratio - 1) > 0.01) {
        if (wordCount > 1) {
          const spaceNeeded = targetWidth - currentWidth;
          wordSpacing = spaceNeeded / (wordCount - 1);
          if (Math.abs(wordSpacing) < fontSize * 0.5) {
            measureText();
            return;
          }
          wordSpacing = 0;
        }

        letterSpacing = (targetWidth - currentWidth) / letterCount;
        if (Math.abs(letterSpacing) < fontSize * 0.15) {
          measureText();
          return;
        }
        letterSpacing = 0;

        scale = ratio;
      }
    };

    fitText();
    document.body.removeChild(measurer);

    return {
      fontSize: `${fontSize}px`,
      letterSpacing: `${letterSpacing}px`,
      wordSpacing: `${wordSpacing}px`,
      scale
    };
  };

  const updateTextStyles = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const newStyles: TextStyles = {};

    slides.forEach((slide, slideIndex) => {
      slide.lines.forEach((line, lineIndex) => {
        const baseSize = lineIndex === 0 ? 120 : lineIndex === 1 ? 80 : 100;

        const targetWidth = containerWidth * 0.98; // 98% of container width
        newStyles[`${slideIndex}-${lineIndex}`] = calculateTextMetrics(
          line,
          containerWidth,
          baseSize,
          targetWidth
        );
      });
    });

    setTextStyles(newStyles);
  };

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(updateTextStyles);
    };

    handleResize();
    setIsInitialLoad(false);

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            className={cn(
              "absolute inset-0",
              currentSlide === index ? "z-10" : "z-0"
            )}
          >
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority
              className="transition-transform duration-[1.6s]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <div ref={containerRef} className="w-full max-w-[1200px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={isInitialLoad ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Pre-text */}
                <motion.p
                  initial={isInitialLoad ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#f6931d] text-3xl md:text-4xl font-light italic capitalize"
                >
                  {slides[currentSlide].preText}
                </motion.p>

                {/* Text blocks */}
                <div className="relative space-y-4">
                  {slides[currentSlide].lines.map((line, lineIndex) => {
                    const style = textStyles[
                      `${currentSlide}-${lineIndex}`
                    ] || {
                      fontSize:
                        lineIndex === 0
                          ? "120px"
                          : lineIndex === 1
                            ? "80px"
                            : "100px",
                      letterSpacing: "0",
                      wordSpacing: "0",
                      scale: 1
                    };

                    return (
                      <motion.div
                        key={lineIndex}
                        initial={isInitialLoad ? false : { opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + lineIndex * 0.1 }}
                        className="relative"
                      >
                        <div
                          className="text-white font-bold origin-left whitespace-nowrap"
                          style={{
                            fontSize: style.fontSize,
                            letterSpacing: style.letterSpacing,
                            wordSpacing: style.wordSpacing,
                            transform: `scale(${style.scale})`,
                            transformOrigin: "left",
                            lineHeight: "1.1"
                          }}
                        >
                          {line}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="flex items-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative"
            >
              <div
                className={cn(
                  "w-16 h-1 rounded-full transition-all duration-300",
                  currentSlide === index ? "bg-[#f6931d]" : "bg-white/30"
                )}
              >
                {currentSlide === index && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_DURATION / 1000 }}
                    className="absolute top-0 left-0 h-full bg-sky-500/50 rounded-full"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute left-8 bottom-8 z-30">
        <div className="text-white font-mono flex items-center space-x-4">
          <div className="relative">
            <span className="text-4xl font-bold">
              {(currentSlide + 1).toString().padStart(2, "0")}
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 bg-[#f6931d]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="text-white/50 text-2xl">/</span>
          <span className="text-white/50 text-2xl">
            {slides.length.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;