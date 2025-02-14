"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedInnovators } from "@/lib/api/innovators";
import { BaseInnovator } from "@/types/innovator";

interface CardProps {
  innovator: BaseInnovator;
}

const Card: React.FC<CardProps> = ({ innovator }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group relative bg-gray-800/50 rounded-2xl p-8 flex flex-col h-full 
                backdrop-blur-sm hover:shadow-xl transition-all duration-500 ease-out"
  >
    {/* Animated border gradient effect */}
    <div
      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 opacity-0 
                    group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"
    />

    <div className="flex justify-between items-start mb-0">
      <motion.span
        whileHover={{ scale: 1.05 }}
        className="bg-sky-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-medium
                   transform transition-all duration-300 hover:bg-sky-500/20"
      >
        {innovator.name}
      </motion.span>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-sky-500"
      >
        {innovator.logo && (
          <Image
            width={50}
            height={50}
            src={innovator.logo}
            className="h-16 w-auto transform transition-all duration-300"
            alt={`${innovator.name} logo`}
          />
        )}
      </motion.div>
    </div>

    <motion.h2
      className="text-lg font-light pt-6 text-gray-200 mb-auto group-hover:text-sky-400
                 transition-colors duration-300"
    >
      {innovator.short_description}
    </motion.h2>

    <div className="mt-8 flex items-center justify-between">
      <span className="text-gray-300 font-medium group-hover:text-sky-400 transition-colors duration-300">
        Learn More
      </span>
      <Link
        href={`/innovators/${innovator.slug}`}
        className="relative rounded-full border border-gray-600 p-2 overflow-hidden
                   group-hover:border-sky-500 text-gray-400 group-hover:text-sky-400 transition-all duration-300"
      >
        <motion.div
          className="absolute inset-0 bg-sky-500/10 transform origin-left scale-x-0 
                     group-hover:scale-x-100 transition-transform duration-300"
        />
        <svg
          className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 
                     transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  </motion.div>
);

const InnovatorsSpotlight: React.FC = () => {
  const [innovators, setInnovators] = useState<BaseInnovator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedInnovators = async () => {
      try {
        const response = await getFeaturedInnovators(2);
        setInnovators(response);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch innovators");
        setIsLoading(false);
      }
    };

    fetchFeaturedInnovators();
  }, []);

  if (isLoading) {
    return (
      <section className="relative h-auto lg:min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="text-center text-white">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative h-auto lg:min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="relative h-auto lg:min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-10"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Innovators Spotlight
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-[#f6931d] to-orange-400 mx-auto mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="mx-auto text-center max-w-6xl text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Meet the visionaries shaping the future. Their stories inspire
            creativity and push the boundaries of what&apos;s possible.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {innovators.map((innovator) => (
            <Card key={innovator.id} innovator={innovator} />
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/innovators"
            className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-full
                       bg-sky-500/20 hover:bg-sky-500/30 transform transition-all duration-300 hover:scale-105"
          >
            <motion.span
              className="relative z-10 text-orange-400 font-medium flex items-center gap-2"
              whileHover={{ x: -4 }}
            >
              <span>SEE ALL INNOVATORS</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovatorsSpotlight;

// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { getFeaturedInnovators } from "@/lib/api/innovators";
// import { BaseInnovator } from "@/types/innovator";

// interface CardProps {
//   innovator: BaseInnovator;
// }

// const Card: React.FC<CardProps> = ({ innovator }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5 }}
//     className="group relative bg-gray-800/50 rounded-2xl p-8 flex flex-col h-full
//                 backdrop-blur-sm hover:shadow-xl transition-all duration-500 ease-out"
//   >
//     {/* Animated border gradient effect */}
//     <div
//       className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 opacity-0
//                     group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"
//     />

//     <div className="flex justify-between items-start mb-0">
//       <motion.span
//         whileHover={{ scale: 1.05 }}
//         className="bg-sky-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-medium
//                    transform transition-all duration-300 hover:bg-sky-500/20"
//       >
//         {innovator.name}
//       </motion.span>
//       <motion.div
//         whileHover={{ scale: 1.1, rotate: 5 }}
//         transition={{ type: "spring", stiffness: 300 }}
//         className="text-sky-500"
//       >
//         {innovator.logo && (
//           <Image
//             width={50}
//             height={50}
//             src={innovator.logo}
//             className="h-16 w-auto transform transition-all duration-300"
//             alt={`${innovator.name} logo`}
//           />
//         )}
//       </motion.div>
//     </div>

//     <motion.h2
//       className="text-lg font-light pt-6 text-gray-200 mb-auto group-hover:text-sky-400
//                  transition-colors duration-300"
//     >
//       {innovator.short_description}
//     </motion.h2>

//     <div className="mt-8 flex items-center justify-between">
//       <span className="text-gray-300 font-medium group-hover:text-sky-400 transition-colors duration-300">
//         Learn More
//       </span>
//       <Link
//         href={`/innovators/${innovator.slug}`}
//         className="relative rounded-full border border-gray-600 p-2 overflow-hidden
//                    group-hover:border-sky-500 text-gray-400 group-hover:text-sky-400 transition-all duration-300"
//       >
//         <motion.div
//           className="absolute inset-0 bg-sky-500/10 transform origin-left scale-x-0
//                      group-hover:scale-x-100 transition-transform duration-300"
//         />
//         <svg
//           className="w-4 h-4 relative z-10 transform group-hover:translate-x-1
//                      transition-transform duration-300"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path
//             d="M5 12h14M12 5l7 7-7 7"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </Link>
//     </div>
//   </motion.div>
// );

// const InnovatorsSpotlight: React.FC = () => {
//   const [innovators, setInnovators] = useState<BaseInnovator[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchFeaturedInnovators = async () => {
//       try {
//         const response = await getFeaturedInnovators(2);
//         setInnovators(response);
//         setIsLoading(false);
//       } catch (err) {
//         setError("Failed to fetch innovators");
//         setIsLoading(false);
//       }
//     };

//     fetchFeaturedInnovators();
//   }, []);

//   if (isLoading) {
//     return (
//       <section className="relative h-auto lg:min-h-screen bg-gray-900 py-20 overflow-hidden">
//         <div className="text-center text-white">Loading...</div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="relative h-auto lg:min-h-screen bg-gray-900 py-20 overflow-hidden">
//         <div className="text-center text-red-500">{error}</div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative h-auto lg:min-h-screen bg-gray-900 py-20 overflow-hidden">
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Innovators Spotlight
//             <motion.div
//               className="h-1 w-32 bg-gradient-to-r from-[#f6931d] to-orange-400 mx-auto mt-6 rounded-full"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//           </h2>
//           <p className="mx-auto text-center max-w-6xl text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//             Meet the visionaries shaping the future. Their stories inspire
//             creativity and push the boundaries of what&apos;s possible.
//           </p>
//         </motion.div>

//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//           {innovators.map((innovator) => (
//             <Card key={innovator.id} innovator={innovator} />
//           ))}
//         </div>

//         <motion.div
//           className="flex justify-center mt-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           <Link
//             href="/innovators"
//             className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-full
//                        bg-sky-500/20 hover:bg-sky-500/30 transform transition-all duration-300 hover:scale-105"
//           >
//             <motion.span
//               className="relative z-10 text-orange-400 font-medium flex items-center gap-2"
//               whileHover={{ x: -4 }}
//             >
//               <span>SEE ALL INNOVATORS</span>
//               <svg
//                 className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </motion.span>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default InnovatorsSpotlight;
