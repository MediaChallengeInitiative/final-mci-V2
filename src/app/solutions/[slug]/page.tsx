"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { Solution } from "@/interface/interface";
import { getSingleSolution } from "@/utils/get-single-solution";
import ModelHeroSection from "@/components/6SModel/ModelHeroSection";
import Link from "next/link";
import { useTypewriter, Cursor } from "react-simple-typewriter";

interface TextChild {
  text: string;
}

interface TextBlock {
  children: TextChild[];
}

interface TypeWriterProps {
  leadingAssumption: string;
}

const TypeWriterText: React.FC<TypeWriterProps> = ({ leadingAssumption }) => {
  const [text] = useTypewriter({
    words: [leadingAssumption],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 50 // Changed from false to number
  });

  return (
    <div className="relative z-10 p-6 bg-[#f6931d]/10 backdrop-blur-sm border-4 border-[#f6931d]/20 rounded-tl-[40px] rounded-br-[40px] transition-all duration-500 group-hover:border-orange-400/40 group-hover:bg-[#f6931d]/15">
      {text}
      <Cursor cursorColor="#f6931d" />
    </div>
  );
};

const CustomSerializer = ({ blocks }: { blocks: any[] }) => {
  return (
    <div className="relative">
      {blocks.map((block, index) => (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={index}
          className="mb-6 text-gray-700 leading-relaxed"
          style={{ fontSize: "18px" }}
        >
          {block.children.map((child: any, idx: number) => {
            if (typeof child.text === "string" && /".*?"/.test(child.text)) {
              const parts = child.text
                .split(/(".*?")/)
                .reduce((acc: any, part: string, i: number) => {
                  if (/".*?"/.test(part)) {
                    acc.push(
                      <span key={i} className="italic text-sky-600 font-medium">
                        {part}
                      </span>
                    );
                  } else if (part.trim() === "said Abaas.") {
                    acc[acc.length - 1] = (
                      <span key={i - 1} className="italic text-gray-600">
                        {acc[acc.length - 1]} said Abaas.
                      </span>
                    );
                  } else {
                    acc.push(part);
                  }
                  return acc;
                }, []);
              return <React.Fragment key={idx}>{parts}</React.Fragment>;
            }
            return child.text;
          })}
        </motion.p>
      ))}
    </div>
  );
};

const ReadingProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <div
        className="h-full bg-sky-500 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default async function Page({ params }: { params: { slug: string } }) {
  const solutionData = await getSingleSolution(params.slug);

  if (!solutionData) {
    // Handle the case where the solution is not found
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-500">Solution not found.</p>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <ModelHeroSection
        image={urlFor(solutionData.icon).url()}
        title={solutionData.title}
      />
      <div className="min-h-screen bg-white">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* {/* Leading Assumption Statement Section */}
            <section className="relative overflow-hidden mt-0 pb-12 md:pb-16 lg:pb-20 bg-gray-900">
              <div className="absolute inset-0 z-0">
                <svg
                  className="w-full h-full opacity-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative rounded-2xl z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center my-8"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-sky-500">Our Leading Assumption</span>
                    <motion.div
                      className="h-1 w-20 bg-[#f6931d] mx-auto mt-4 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative text-[clamp(1rem,4vw,4rem)] font-bold text-[#f6931d] leading-tight tracking-tight text-center max-w-6xl mx-auto p-8 group"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-tl-[50px] rounded-br-[50px] transform transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-[3px] bg-gray-900 rounded-tl-[48px] rounded-br-[48px]" />
                  {/* <div className="relative z-10 p-6 bg-[#f6931d]/10 backdrop-blur-sm border-4 border-[#f6931d]/20 rounded-tl-[40px] rounded-br-[40px] transition-all duration-500 group-hover:border-orange-400/40 group-hover:bg-[#f6931d]/15">
                    {solutionData?.leadingAssumption}
                  </div> */}
                  <TypeWriterText
                    leadingAssumption={solutionData?.leadingAssumption || ""}
                  />
                </motion.div>
              </div>

              <div className="absolute -z-10 w-96 h-96 blur-3xl rounded-full bg-blue-500/10 -top-48 -left-48" />
              <div className="absolute -z-10 w-96 h-96 blur-3xl rounded-full bg-purple-500/10 -bottom-48 -right-48" />
            </section>

            <div className="flex flex-col w-full">
              {/* Challenge Section */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[400px] lg:min-h-[600px] bg-white">
                <div className="relative h-72 md:h-96 lg:h-full w-full">
                  <Image
                    src={urlFor(solutionData.icon).url()}
                    alt="Investment calculator and pen"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="p-4 md:p-8 lg:p-12 space-y-4 md:space-y-6">
                  <h3 className="text-2xl sm:text-7xl  font-bold text-sky-500 tracking-wide">
                    Challenge We Face
                  </h3>

                  {solutionData.challengeStatement.map(
                    (block: TextBlock, i) => {
                      const text = block.children
                        .map((child: TextChild) => child.text)
                        .join("");
                      const [firstSentence, ...rest] = text.split(/\.(.+)/);
                      const remainingText = rest.join(".");

                      return (
                        <p
                          key={i}
                          className="text-[#4a5568] font-thin leading-relaxed"
                        >
                          {firstSentence && (
                            <span className="text-4xl font-extrabold block mb-4">
                              {firstSentence}
                            </span>
                          )}
                          {remainingText && (
                            <span className="text-base font-semibold md:text-xl lg:text-2xl">
                              {remainingText}
                            </span>
                          )}
                        </p>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Solution Section */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[400px] lg:min-h-[600px] bg-white">
                <div className="order-2 lg:order-1 p-4 md:p-8 lg:p-12 space-y-4 md:space-y-6">
                  <h3 className="text-2xl sm:text-7xl  font-bold text-sky-500 tracking-wide">
                    How We Have Fixed Challenge
                  </h3>

                  {solutionData.solution.map((block: TextBlock, i) => {
                    const text = block.children
                      .map((child: TextChild) => child.text)
                      .join("");
                    const [firstSentence, ...rest] = text.split(/\.(.+)/);
                    const remainingText = rest.join(".");

                    return (
                      <p
                        key={i}
                        className="text-[#4a5568] font-thin leading-relaxed"
                      >
                        {firstSentence && (
                          <span className="text-4xl font-extrabold block mb-4">
                            {firstSentence}
                          </span>
                        )}
                        {remainingText && (
                          <span className="text-base font-semibold md:text-xl lg:text-2xl">
                            {remainingText}
                          </span>
                        )}
                      </p>
                    );
                  })}
                </div>

                <div className="order-1 lg:order-2 relative h-72 md:h-96 lg:h-full w-full">
                  <Image
                    src={urlFor(solutionData.coverImage).url()}
                    alt="Investment calculator and pen"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* Call to action */}
            <div className="relative overflow-hidden bg-gray-900">
              <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-sky-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#f6931d]/20 rounded-full blur-3xl" />

              <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
                <div className="space-y-12 text-center">
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    Empower African Media
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                      Invest in Africa's
                      <span className="bg-gradient-to-r from-sky-500 to-[#f6931d] bg-clip-text text-transparent">
                        {" "}
                        Digital Storytellers
                      </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 font-light">
                      Tomorrow's Media Leaders Need Your Support Today
                    </p>
                  </div>

                  {solutionData.callToAction.map((block, i) => (
                    <p
                      key={i}
                      className="max-w-3xl mx-auto text-base md:text-lg text-gray-300"
                    >
                      {block.children.map((child: any, j: number) => (
                        <span key={j}>{child.text}</span>
                      ))}
                    </p>
                  ))}

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link
                      href="/donate"
                      className="block group w-full hover:text-white sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-sky-500/25"
                    >
                      Support Now
                      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                    <Link
                      href="#"
                      className="group w-full hover:text-white sm:w-auto px-8 py-4 bg-[#f6931d] hover:bg-orange-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-[#f6931d]/25"
                    >
                      Partner With Us
                      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>

                  <div className="pt-8 border-t border-gray-800">
                    <p className="text-gray-400">
                      Together, we're building Africa's media future
                    </p>
                    <div className="flex justify-center items-center gap-8 mt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-sky-500">3000+</p>
                        <p className="text-sm text-gray-400">
                          Journalists Trained
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#f6931d]">30+</p>
                        <p className="text-sm text-gray-400">
                          African Countries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
