"use client";

import React from "react";
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
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
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

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="text-sky-500">
        {title}
      </span>
    </h2>
    <p className="text-lg text-gray-600 mt-4">{subtitle}</p>
    <motion.div
      className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 rounded-full"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </motion.div>
);

const OurModel: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-5">
          <pattern
            id="grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto z-10 space-y-24">
        {/* Model Section */}
        <div>
          <SectionTitle
            title="Our 6.S Model"
            subtitle="A holistic approach addressing systemic media crises"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelsData.map((model, index) => (
              <ModelCard key={index} {...model} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/5 to-orange-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-600/5 to-sky-500/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default OurModel;

// import React from "react";
// import Image from "next/image";

// interface ModelProps {
//   title: string;
//   image: string;
//   bgColor: string;
// }

// const modelsData: ModelProps[] = [
//   {
//     title: "Shifting narratives, shaping culture",
//     image: "/assets/images/models/narratives.png",
//     bgColor: "bg-[#f28c28]"
//   },
//   {
//     title: "Space for incubating media innovations",
//     image: "/assets/images/models/innovations.png",
//     bgColor: "bg-[#3cb371]"
//   },
//   {
//     title: "Skilling the next-generation of journalists",
//     image: "/assets/images/models/skilling.png",
//     bgColor: "bg-[#e63946]"
//   },
//   {
//     title: "Strengthening media coverage of development",
//     image: "/assets/images/models/media.png",
//     bgColor: "bg-[#ff69b4]"
//   },
//   {
//     title: "Safeguarding the information ecosystem",
//     image: "/assets/images/models/information.png",
//     bgColor: "bg-[#4682b4]"
//   },
//   {
//     title: "Stabilising local + rural journalism",
//     image: "/assets/images/models/journalism.png",
//     bgColor: "bg-[#6a0dad]"
//   }
// ];

// export default function OurModel() {
//   return (
//     <>
//       <section className="bg-white">
//         <div className="space-y-4 text-center pt-8">
//           <h2 className="text-4xl font-bold tracking-tight text-[#0097d1] lg:text-6xl">
//             Our 6.S Model
//           </h2>
//           <span className="mt-10 pt-6 text-lg leading-8 text-[#0097d1] text-justify italic">
//             A holistic approach addressing systemic media crises.
//           </span>
//         </div>
//         <div className="w-full">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {modelsData.map((data: any, i: number) => (
//               <div
//                 className={`flex flex-col items-center justify-center p-4 text-center ${data.bgColor} text-white border-gray-300 group-hover:border-orange-500 transition-colors duration-300`}
//               >
//                 <Image width={300} height={300} src={data.image} alt="image" />
//                 <p className="text-lg font-semibold">{data.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
