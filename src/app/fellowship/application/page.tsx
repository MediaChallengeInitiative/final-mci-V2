"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  Radio,
  BookOpen,
  Calendar,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Define theme type
type ThemeType = "light" | "dark";

// Define theme configuration type
interface ThemeConfig {
  bg: string;
  text: string;
  textSecondary: string;
  card: string;
  cardHover: string;
  border: string;
}

// Define themes object with proper typing
const themes: Record<ThemeType, ThemeConfig> = {
  light: {
    bg: "bg-white",
    text: "text-sky-600",
    textSecondary: "text-gray-700",
    card: "bg-white",
    cardHover: "hover:bg-gray-50",
    border: "border-gray-100"
  },
  dark: {
    bg: "bg-gray-900",
    text: "text-[#f6931d]",
    textSecondary: "text-gray-300",
    card: "bg-gray-800",
    cardHover: "hover:bg-gray-700",
    border: "border-gray-700"
  }
};

// Define pillar type
interface ProgramPillar {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
}

const Page = () => {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  // Memoized theme values
  const currentTheme = useMemo(() => themes[theme], [theme]);

  // Parallax effect values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);

  // Theme toggle handler
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Scroll handler with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollY(window.scrollY);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoized program pillars data
  const programPillars = useMemo<ProgramPillar[]>(
    () => [
      {
        icon: Users,
        title: "One Woman/Man Army Journalist",
        description:
          "Developing journalists with comprehensive multimedia skills.",
        image: "/assets/images/fellowship/fellowship-hero.jpg"
      },
      {
        icon: Radio,
        title: "Solutions Journalism",
        description: "Reporting on effective solutions to societal problems.",
        image: "/assets/images/fellowship/solutions.jpg"
      },
      {
        icon: BookOpen,
        title: "Development Journalism",
        description: "Promoting equitable development through reporting.",
        image: "/assets/images/fellowship/development.jpg"
      },
      {
        icon: Users,
        title: "Leadership in Journalism",
        description: "Nurturing skilled journalists as community leaders.",
        image: "/assets/images/fellowship/leadership.jpg"
      }
    ],
    []
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-1/2 left-16 transform -translate-x-10 -translate-y-1/2 z-50 p-2 rounded-full bg-[#f6931d] text-white"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>

      {/* Hero Section */}
      <motion.div
        className="relative h-screen overflow-hidden"
        style={{ y: heroY }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity }}
        >
          <Image
            src="/assets/images/fellowship/fellowship-hero.jpg"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </motion.div>

        <div className="relative text-center container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Media Challenge Fellowship
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8">
              Building the next generation of multifaceted journalists in Uganda
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#apply"
                className="inline-flex items-center bg-[#f6931d] text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-orange-600 hover:text-white"
              >
                Apply Now
                <ChevronRight className="ml-2 w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mx-auto" />
          </div>
        </motion.div>
      </motion.div>

      {/* Program Pillars Grid */}
      <section className="py-20">
        <div className="flex flex-col container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-5xl md:text-6xl font-bold text-center mb-16 ${currentTheme.text}`}
          >
            Program Pillars
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-4">
            {programPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
                className={`rounded-xl overflow-hidden shadow-lg ${currentTheme.card} ${currentTheme.cardHover} transition-all duration-300`}
              >
                <div className="h-48 relative">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <pillar.icon className="absolute bottom-4 left-4 text-white w-8 h-8" />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${currentTheme.text}`}>
                    {pillar.title}
                  </h3>
                  <p className={currentTheme.textSecondary}>
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fellowship Structure */}
      <section className="relative py-20 bg-sky-500 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
        <div className="flex flex-col container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Fellowship Structure
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Training Section */}
            <motion.div
              data-aos="fade-right"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                25-Day Intensive Training
              </h3>
              <ul className="space-y-4">
                {[
                  "Foundations and Multimedia Skills",
                  "Participatory Youth Radio Training",
                  "Beats Reporting",
                  "Career Guidance",
                  "Media Entrepreneurship"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-white"
                  >
                    <ChevronRight className="w-5 h-5 mr-2" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Mentorship Section */}
            <motion.div
              data-aos="fade-left"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Media Mentorship Program
              </h3>
              <ul className="space-y-4">
                {[
                  "One-to-one pairing with industry mentors",
                  "Access to expert community",
                  "Mentorship workshops",
                  "Networking events"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-white"
                  >
                    <ChevronRight className="w-5 h-5 mr-2" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className={`py-20 ${currentTheme.bg}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2
              className={`text-5xl md:text-6xl font-bold text-center mb-12 ${currentTheme.text}`}
            >
              How to Apply
            </h2>
            <div
              className={`rounded-2xl p-8 md:p-12 ${currentTheme.card} ${currentTheme.border} border`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    className={`text-2xl font-bold mb-6 ${currentTheme.text}`}
                  >
                    Eligibility
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Must be journalism and media students",
                      "IMC and expo participants have added advantage"
                    ].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center ${currentTheme.textSecondary}`}
                      >
                        <ChevronRight className="w-5 h-5 mr-2 text-[#f6931d]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div
                    className={`flex items-center mb-8 ${currentTheme.textSecondary}`}
                  >
                    <Calendar className="w-6 h-6 text-[#f6931d] mr-3" />
                    <span className="text-xl">
                      Deadline: January 20th, 2025
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="https://forms.gle/zGDABKvP4FdqgTCj6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full bg-[#f6931d] text-white text-center px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      Submit Application
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Page;
