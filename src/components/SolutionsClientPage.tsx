"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import { Solution } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import { getAllSolutions } from "@/utils/get-all-solutions";
import { ArrowRight, ChevronDown, Eye } from "lucide-react";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-orange-900">
      <div className="absolute inset-0 bg-[url('/assets/images/breadcrumb-bg.jpg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-sky-500/30 mix-blend-multiply" />
        <div className="absolute left-0 right-0 top-0 h-[500px] bg-gradient-to-b from-sky-950" />
        <div className="absolute left-0 right-0 bottom-0 h-[500px] bg-gradient-to-t from-sky-950" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative container mx-auto px-4 h-screen flex flex-col justify-center items-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-300 backdrop-blur-sm border border-sky-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span>Transforming African Media</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-orange-200">
              Our Solutions
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-sky-200/80 max-w-2xl mx-auto">
            Empowering the next generation of journalists and storytellers
            across Africa
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Link href="#solutions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-sky-500 text-white rounded-full font-medium transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/25"
              >
                Explore Solutions
                <ArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12"
        >
          <ChevronDown size={40} className="text-sky-200/50" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const SolutionCard = ({
  solution,
  index
}: {
  solution: Solution;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to safely get plain text from Sanity rich text
  const getPlainText = (blocks: any[] = []) => {
    return blocks
      ?.map((block) => {
        if (block?._type !== "block" || !block?.children) {
          return "";
        }
        return block?.children.map((child: any) => child?.text || "").join("");
      })
      .join(" ");
  };

  // Get plain text description
  const plainDescription = getPlainText(solution.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-sky-50/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-sky-500/10">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={urlFor(solution.icon).url()}
            alt={solution.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950/80 via-sky-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white to-transparent" />
        </div>

        <div className="relative px-8 py-8">
          <motion.h3 className="text-2xl font-bold mb-4 text-sky-950 group-hover:text-sky-600 transition-colors duration-300">
            {solution.title}
          </motion.h3>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <p className="text-sky-700/80 line-clamp-3">
                  {plainDescription}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Link href={`solutions/${solution.slug.current}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-full hover:bg-sky-600 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25"
            >
              <Eye size={18} />
              View Solution
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function SolutionsClientPage({
  initialSolutions,
  totalSolutions,
  per_page
}: {
  initialSolutions: Solution[];
  totalSolutions: number;
  per_page: number;
}) {
  const [solutions, setSolutions] = useState<Solution[]>(initialSolutions);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const start = (page - 1) * per_page;
    const end = start + per_page;
    const newSolutions = await getAllSolutions(start, end);
    setSolutions((prevSolutions) => [...prevSolutions, ...newSolutions]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div
        id="solutions"
        className="relative container grid grid-cols-1 mx-auto px-4 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution._id}
              solution={solution}
              index={index}
            />
          ))}
        </div>

        {solutions.length < totalSolutions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 flex justify-center"
          >
            <motion.button
              onClick={loadMore}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all disabled:opacity-50 flex items-center gap-3 hover:shadow-lg hover:shadow-sky-500/25"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Discover More Solutions
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Solution } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";
// import { getAllSolutions } from "@/utils/get-all-solutions";

// const SolutionCard = ({ solution }: { solution: Solution }) => {
//   return (
//     <div className="bg-white border-0 lg:border lg:border-stone-400 hover:border-transparent border-opacity-40 rounded-none lg:rounded-xl hover:bg-[#0097d1] p-6 group relative overflow-hidden transition-colors duration-300">
//       <h3 className="text-xl line-clamp-2 font-semibold mb-2 text-[#2B2B2B] group-hover:text-white transition-colors duration-300">
//         {solution.title}
//       </h3>
//       <div className="relative h-60 w-full overflow-hidden">
//         <Image
//           src={urlFor(solution.icon).url()}
//           alt={solution.title}
//           layout="fill"
//           objectFit="cover"
//           className="transition-transform duration-300 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//           <Link href={`solutions/${solution.slug.current}`} passHref>
//             <button className="bg-white text-[#0097d1] px-4 py-2 rounded-full hover:bg-[#0097d1] hover:text-white transition-colors duration-300">
//               Read More
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function SolutionsClientPage({
//   initialSolutions,
//   totalSolutions,
//   per_page
// }: {
//   initialSolutions: Solution[];
//   totalSolutions: number;
//   per_page: number;
// }) {
//   const [solutions, setSolutions] = useState<Solution[]>(initialSolutions);
//   const [page, setPage] = useState(2); // Start from page 2 as we already have the first page
//   const [loading, setLoading] = useState(false);

//   const loadMore = async () => {
//     setLoading(true);
//     const start = (page - 1) * per_page;
//     const end = start + per_page;
//     const newSolutions = await getAllSolutions(start, end);
//     setSolutions((prevSolutions) => [...prevSolutions, ...newSolutions]);
//     setPage((prevPage) => prevPage + 1);
//     setLoading(false);
//   };

//   return (
//     <div className="w-full lg:container flex flex-col mx-auto px-0 lg:px-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 lg:gap-8">
//         {solutions.map((solution) => (
//           <SolutionCard key={solution._id} solution={solution} />
//         ))}
//       </div>

//       {solutions.length < totalSolutions && (
//         <div className="mt-12 flex justify-center">
//           <button
//             onClick={loadMore}
//             disabled={loading}
//             className="px-6 py-3 bg-[#0097d1] text-white rounded-full hover:bg-[#007bb3] transition-colors duration-300 disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
