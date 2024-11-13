"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Innovation = {
  title: string;
  description: string;
  category: string;
  imageIndex: number;
  logo: string;
  link: string;
  buttonText: string;
  longDescription: string;
};

interface CardSpotlight {
  x: number;
  y: number;
  opacity: number;
}

const InnovationCard: React.FC<{ innovation: Innovation; index: number }> = ({
  innovation,
  index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [spotlight, setSpotlight] = useState<CardSpotlight>({
    x: 0,
    y: 0,
    opacity: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlight({ x, y, opacity: 1 });
    }
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-gray-900 backdrop-blur-sm rounded-2xl p-8 flex flex-col h-full hover:shadow-xl transition-all duration-500 ease-out"
    >
      {/* Animated border gradient effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm" />

      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, 
            rgba(255,255,255,0.1), 
            transparent 40%)`,
          opacity: spotlight.opacity
        }}
      />

      <div className="flex justify-between items-start mb-0">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="bg-sky-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-medium transform transition-all duration-300 hover:bg-sky-500/20"
        >
          {innovation.category}
        </motion.span>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-sky-500"
        >
          <Image
            width={50}
            height={50}
            src={innovation.logo}
            className="h-16 w-auto transform transition-all duration-300"
            alt="innovator logo"
          />
        </motion.div>
      </div>

      <motion.h3 className="text-lg font-light pt-6 text-gray-200 mb-auto group-hover:text-sky-400 transition-colors duration-300">
        {innovation.title}
      </motion.h3>

      <p className="text-white mt-4 text-sm leading-relaxed">
        {innovation.longDescription}
      </p>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-gray-300 font-medium group-hover:text-sky-400 transition-colors duration-300">
          {innovation.buttonText}
        </span>
        <Link
          href={innovation.link}
          target="_blank"
          className="relative rounded-full border border-gray-900 p-2 overflow-hidden group-hover:border-sky-500 text-white group-hover:text-sky-400 transition-all duration-300"
        >
          <motion.div className="absolute inset-0 bg-sky-500/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <ArrowRight className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

const InnovatorsSpotlight: React.FC = () => {
  const innovations: Innovation[] = [
    {
      title: "Nalaw Foundation Limited",
      description:
        "NALAW Foundation Limited is a non-profit that uses media to empower Ugandan youth with legal knowledge and advocacy.",
      category: "Legal Empowerment",
      imageIndex: 1,
      logo: "/assets/images/innovators/nalaw-logo.png",
      buttonText: "Visit their website",
      link: "https://nalaw.org/",
      longDescription:
        "NALAW Foundation is a Ugandan non-profit that uses media to address legal issues faced by youth. They fight a lack of legal awareness and misconceptions about the justice system. NALAW empowers youth by teaching them their rights and navigating the legal system. Through media, they explain legal concepts and encourage youth to advocate for themselves. They partner with legal professionals to spread accurate and relevant information."
    },
    {
      title: "Debunk Media Initiative",
      description:
        "Debunk Media promotes media literacy, fact-checking, and informed decision-making for Ugandan youth.",
      category: "Media Literacy",
      imageIndex: 2,
      logo: "/assets/images/innovators/debunk-logo.png",
      buttonText: "Visit their website",
      link: "https://debunkinitiative.org/about-us/",
      longDescription:
        "Debunk Media Initiative is a non-profit media start-up in Kampala Uganda that focuses on media literacy and fact-checking to enable young people to make informed decisions. Our areas of focus range from Democracy, Climate Change, and Health. We believe factual information is a fundamental human right that when done correctly, impacts the lives and decisions of many individuals."
    },
  ];

  return (
    <section className="relative h-auto py-20 bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Innovators Spotlight
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="mx-auto text-center max-w-6xl text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Meet the visionaries shaping the future. Their stories inspire
            creativity and push the boundaries of what&apos;s possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {innovations.map((innovation, index) => (
            <InnovationCard
              key={innovation.title}
              innovation={innovation}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovatorsSpotlight;
