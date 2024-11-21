"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaLightbulb,
  FaHandHoldingHeart,
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaChartLine
} from "react-icons/fa";
import { getAllSolutions } from "@/utils/get-all-solutions";
import { SolutionInterface } from "@/interface/interface";
import SectionTitle from "./SectionTitle";

interface ModelProps {
  title: string;
  image: string;
  bgColor: string;
  description: string;
  icon: React.ReactNode;
}

const modelsData: ModelProps[] = [
  {
    title: "Shifting narratives, shaping culture",
    image: "/assets/images/models/narratives.png",
    bgColor: "from-[#f28c28] to-[#f28c28]/90",
    description:
      "Transforming media narratives to create positive cultural impact",
    icon: <FaLightbulb className="text-white" size={24} />
  },
  {
    title: "Space for incubating media innovations",
    image: "/assets/images/models/innovations.png",
    bgColor: "from-[#3cb371] to-[#3cb371]/90",
    description: "Fostering innovative solutions in modern media landscape",
    icon: <FaBrain className="text-white" size={24} />
  },
  {
    title: "Skilling the next-generation of journalists",
    image: "/assets/images/models/skilling.png",
    bgColor: "from-[#e63946] to-[#e63946]/90",
    description: "Developing future-ready journalism talents",
    icon: <FaUsers className="text-white" size={24} />
  },
  {
    title: "Strengthening media coverage of development",
    image: "/assets/images/models/media.png",
    bgColor: "from-[#ff69b4] to-[#ff69b4]/90",
    description: "Enhancing depth and quality in development reporting",
    icon: <FaNewspaper className="text-white" size={24} />
  },
  {
    title: "Safeguarding the information ecosystem",
    image: "/assets/images/models/information.png",
    bgColor: "from-[#4682b4] to-[#4682b4]/90",
    description: "Protecting and nurturing healthy information flow",
    icon: <FaHandHoldingHeart className="text-white" size={24} />
  },
  {
    title: "Stabilising local + rural journalism",
    image: "/assets/images/models/journalism.png",
    bgColor: "from-[#6a0dad] to-[#6a0dad]/90",
    description: "Strengthening grassroots media infrastructure",
    icon: <FaChartLine className="text-white" size={24} />
  }
];

const ModelCard: React.FC<ModelProps & { index: number }> = ({
  title,
  image,
  bgColor,
  description,
  icon,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-90 group-hover:opacity-95 transition-opacity duration-500`}
      />

      {/* Image with overlay */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/30 to-transparent">
        <div className="relative transform group-hover:-translate-y-2 transition-transform duration-500">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm transform opacity-0 group-hover:opacity-100 transition-all duration-500">
            {description}
          </p>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    </motion.div>
  );
};

export default function Solution() {
  const [solutions, setSolutions] = useState<SolutionInterface[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Directly handle promise resolution
    getAllSolutions()
      .then((solutionsData) => {
        setSolutions(solutionsData);
      })
      .catch((err) => {
        setError("Failed to load solutions");
      });
  }, []); // Empty dependency array ensures it runs only once after the component mounts

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className="relative bg-gray-900 pt-20 overflow-hidden">
      <div className="w-full z-10">
        <SectionTitle
          title="Our 6.S Model"
          subtitle="A holistic approach addressing systemic media crises"
        />
        {solutions ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {modelsData.map((model, index) => (
              <ModelCard key={index} {...model} index={index} />
            ))}
          </div>
        ) : (
          <p>No solutions found.</p>
        )}
      </div>
    </section>
  );
}
