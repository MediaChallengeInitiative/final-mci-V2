"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardProps {
  tag: string;
  title: string;
  logo: string;
  link: string;
  buttonText: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  tag,
  title,
  logo,
  link,
  buttonText,
  className = ""
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`group relative bg-gray-800/50 rounded-2xl p-8 flex flex-col h-full 
                backdrop-blur-sm hover:shadow-xl transition-all duration-500 ease-out ${className}`}
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
        {tag}
      </motion.span>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-sky-500"
      >
        <Image
          width={50}
          height={50}
          src={`${logo}`}
          className="h-16 w-auto transform transition-all duration-300"
          alt="innovator"
        />
      </motion.div>
    </div>

    <motion.h2
      className="text-lg font-light pt-6 text-gray-200 mb-auto group-hover:text-sky-400
                 transition-colors duration-300"
    >
      {title}
    </motion.h2>

    <div className="mt-8 flex items-center justify-between">
      <span className="text-gray-300 font-medium group-hover:text-sky-400 transition-colors duration-300">
        {buttonText}
      </span>
      <Link
        href={`${link}`}
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

interface CardData {
  tag: string;
  title: string;
  logo: string;
  buttonText: string;
  link: string;
}

const InnovatorsSpotlight: React.FC = () => {
  const cards: CardData[] = [
    {
      tag: "Nalaw Foundation Limited",
      title:
        "NALAW Foundation Limited is a non-profit that uses media to empower Ugandan youth with legal knowledge and advocacy.",
      logo: "/assets/images/innovators/nalaw-logo.png",
      buttonText: "Visit their website",
      link: "https://nalaw.org/"
    },
    {
      tag: "Debunk Media Initiative",
      title:
        "Debunk Media promotes media literacy, fact-checking, and informed decision-making for Ugandan youth.",
      logo: "/assets/images/innovators/debunk-logo.png",
      buttonText: "Visit their website",
      link: "https://debunkinitiative.org/about-us/"
    }
  ];

  return (
    <section className="relative h-auto lg:min-h-screen bg-gray-900 py-20 overflow-hidden">
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
          {cards.map((card, index) => (
            <Card
              key={index}
              tag={card.tag}
              title={card.title}
              logo={card.logo}
              link={card.link}
              buttonText={card.buttonText}
            />
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="#"
            className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-full
                       bg-sky-500/20 hover:bg-sky-500/30 transform transition-all duration-300 hover:scale-105"
          >
            <motion.span
              className="relative z-10 text-orange-400 font-medium flex items-center gap-2"
              whileHover={{ x: -4 }}
            >
              <span>SEE ALL</span>
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

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// interface CardProps {
//   tag: string;
//   title: string;
//   logo: string;
//   link: string;
//   buttonText: string;
//   className?: string;
// }

// const BubbleLogo: React.FC = () => (
//   <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-8a4 4 0 118 0 4 4 0 01-8 0z" />
//   </svg>
// );

// const Card: React.FC<CardProps> = ({
//   tag,
//   title,
//   logo,
//   link,
//   buttonText,
//   className = ""
// }) => (
//   <div className={`bg-white border border-gray-200 rounded-2xl p-8 flex flex-col h-full ${className}`}>
//     <div className="flex justify-between items-start mb-0">
//       <span className="bg-blue-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
//         {tag}
//       </span>
//       <div className="text-blue-500">
//         <Image
//           width={50}
//           height={50}
//           src={`${logo}`}
//           className="h-16 w-auto"
//           alt="innovator"
//         />
//       </div>
//     </div>

//     <h2 className="text-lg font-light pt-6 text-gray-900 mb-auto">{title}</h2>

//     <div className="mt-8 flex items-center justify-between">
//       <span className="text-gray-900 font-medium">{buttonText}</span>
//       <Link
//         href={`${link}`}
//         className="rounded-full border border-gray-400 p-2"
//       >
//         <svg
//           className="w-4 h-4"
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
//   </div>
// );

// interface CardData {
//   tag: string;
//   title: string;
//   logo: string;
//   buttonText: string;
//   link: string;
// }

// const InnovatorsSpotlight: React.FC = () => {
//   const cards: CardData[] = [
//     {
//       tag: "Nalaw Foundation Limited",
//       title:
//         "NALAW Foundation Limited is a non-profit that uses media to empower Ugandan youth with legal knowledge and advocacy.",
//       logo: "/assets/images/innovators/nalaw-logo.png",
//       buttonText: "Visit their website",
//       link: "https://nalaw.org/"
//     },
//     {
//       tag: "Debunk Media Initiative",
//       title:
//         "Debunk Media promotes media literacy, fact-checking, and informed decision-making for Ugandan youth.",
//       logo: "/assets/images/innovators/debunk-logo.png",
//       buttonText: "Visit their website",
//       link: "https://debunkinitiative.org/about-us/"
//     }
//   ];

//   return (
//     <div className="h-auto bg-white p-4 md:p-8">
//       <div className="space-y-4 text-center lg:text-left mb-12">
//         <div className="space-y-2">
//           <h2 className="text-4xl text-center text-[#0097d1] font-bold tracking-tighter lg:text-6xl">
//             Innovators Spotlight
//           </h2>
//         </div>
//         <p className="mx-auto text-center max-w-6xl text-[#0097d1] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#0097d1]">
//           Meet the visionaries shaping the future. Their stories inspire
//           creativity and push the boundaries of what&apos;s possible.
//         </p>
//       </div>
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//         {cards.map((card, index) => (
//           <Card
//             key={index}
//             tag={card.tag}
//             title={card.title}
//             logo={card.logo}
//             link={card.link}
//             buttonText={card.buttonText}
//           />
//         ))}
//       </div>
//       <div className="flex justify-center my-1">
//         <Link
//           href="#"
//           className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
//         >
//           <span className="mr-2 group-hover:text-white rounded-md">
//             SEE ALL
//           </span>
//           <svg
//             className="w-5 h-5 transform group-hover:text-white group-hover:translate-x-1  transition-transform duration-200 ease-in-out"
//             fill="#fff"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M14 5l7 7m0 0l-7 7m7-7H3"
//             />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default InnovatorsSpotlight;

// import Image from "next/image";
// import Link from "next/link";
// import { IoPlayCircleOutline } from "react-icons/io5";
// import { HiOutlineExternalLink } from "react-icons/hi";

// export default function InnovatorsSpotlight() {
//   return (
//     <>
//       <section className="w-full py-2 md:py-6 lg:py-8 bg-white">
//         <div className="w-full lg:px-0 px-4 md:px-6">
//           <div className="space-y-6">
//             <div className="space-y-4 text-center lg:text-left">
//               <div className="space-y-2">
//                 <h2 className="text-4xl text-center text-[#0097d1] font-bold tracking-tighter lg:text-6xl">
//                   Innovators Spotlight
//                 </h2>
//               </div>
//               <p className="mx-auto text-center max-w-6xl text-[#0097d1] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#0097d1]">
//                 Meet the visionaries shaping the future. Their stories inspire
//                 creativity and push the boundaries of what&apos;s possible.
//               </p>
//             </div>
//             <div className="grid gap-2">
//               <div className="grid gap-2 rounded-md border border-[#0097d1] bg-[#0097d1] p-4 shadow-sm dark:border-sky-600 dark:bg-[#0097d1]">
//                 <div className="flex justify-between items-center gap-1">
//                   <div className="flex lg:flex-row flex-col items-center">
//                     <Image
//                       width={100}
//                       height={100}
//                       src="/assets/images/innovators/nalaw-logo.png"
//                       className="h-32 w-32"
//                       alt="innovator"
//                     />
//                     <div className="grid gap-0.5">
//                       <div className="font-medium lg:text-2xl lg:text-gray-200 text-sky-100 text-lg">
//                         Nalaw Foundation Limited
//                       </div>
//                     </div>
//                   </div>
//                   <div className="lg:flex hidden items-center justify-center">
//                     <Link
//                       href="#"
//                       className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-[#f6931d] dark:text-[#f6931d] dark:hover:text-white dark:hover:bg-[#f6931d] dark:focus:ring-white"
//                     >
//                       Watch Video
//                       <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
//                     </Link>
//                     <Link
//                       href="https://nalaw.org/"
//                       target="_blank"
//                       className="inline-flex items-center text-white hover:text-white border border-black hover:border-black bg-black focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-[#0097d1] dark:hover:text-white dark:hover:bg-black dark:focus:ring-black"
//                     >
//                       Visit Website
//                       <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="flex lg:hidden items-center justify-center">
//                   <Link
//                     href="#"
//                     className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-[#f6931d] dark:text-[#f6931d] dark:hover:text-white dark:hover:bg-[#f6931d] dark:focus:ring-orange-800"
//                   >
//                     Watch Video
//                     <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
//                   </Link>
//                   <Link
//                     href="https://nalaw.org/"
//                     target="_blank"
//                     className="inline-flex items-center text-white hover:text-gray-300 border border-black bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-black"
//                   >
//                     Visit Website
//                     <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
//                   </Link>
//                 </div>
//                 <p className="text-md text-justify text-gray-300 dark:text-gray-200">
//                   NALAW Foundation is a Ugandan non-profit that uses media to
//                   address legal issues faced by youth. They fight a lack of
//                   legal awareness and misconceptions about the justice system.
//                   NALAW empowers youth by teaching them their rights and
//                   navigating the legal system. Through media, they explain legal
//                   concepts and encourage youth to advocate for themselves. They
//                   partner with legal professionals to spread accurate and
//                   relevant information. NALAW Foundation is an innovator in
//                   using media to empower youth and promote justice.
//                 </p>
//               </div>
//             </div>
//             <div className="grid gap-4">
//               <div className="grid gap-4 rounded-md border border-[#0097d1] bg-[#0097d1] p-4 shadow-sm dark:border-sky-600 dark:bg-[#0097d1]">
//                 <div className="flex lg:justify-between justify-center items-center gap-3">
//                   <div className="flex lg:flex-row flex-col items-center">
//                     <Image
//                       width={100}
//                       height={100}
//                       src="/assets/images/innovators/debunk-logo.png"
//                       className="h-auto w-32"
//                       alt="innovator"
//                     />
//                     <div className="grid gap-0.5">
//                       <div className="font-medium lg:text-2xl lg:text-gray-200 text-sky-100 text-lg">
//                         Debunk Media Initiative
//                       </div>
//                     </div>
//                   </div>
//                   <div className="lg:flex hidden items-center justify-center">
//                     <Link
//                       href="#"
//                       className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-[#f6931d] dark:text-[#f6931d] dark:hover:text-white dark:hover:bg-[#f6931d] dark:focus:ring-white"
//                     >
//                       Watch Video
//                       <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
//                     </Link>
//                     <Link
//                       href="https://debunkinitiative.org/about-us/"
//                       target="_blank"
//                       className="inline-flex items-center text-white hover:text-white border border-black hover:border-black bg-black focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-[#0097d1] dark:hover:text-white dark:hover:bg-black dark:focus:ring-black"
//                     >
//                       Visit Website
//                       <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="flex lg:hidden items-center justify-center">
//                   <Link
//                     href="#"
//                     className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-[#f6931d] dark:text-[#f6931d] dark:hover:text-white dark:hover:bg-[#f6931d] dark:focus:ring-orange-800"
//                   >
//                     Watch Video
//                     <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
//                   </Link>
//                   <Link
//                     href="https://debunkinitiative.org/about-us/"
//                     target="_blank"
//                     className="inline-flex items-center text-white hover:text-gray-300 border border-black bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-black"
//                   >
//                     Visit Website
//                     <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
//                   </Link>
//                 </div>
//                 <p className="text-md text-justify text-gray-300 dark:text-gray-200">
//                   Debunk Media Initiative is a non-profit media start-up in
//                   Kampala Uganda that focuses on media literacy and
//                   fact-checking to enable young people to make informed
//                   decisions. Our areas of focus range from Democracy, Climate
//                   Change, and Health. We believe factual information is a
//                   fundamental human right that when done correctly, impacts the
//                   lives and decisions of many individuals. We are creating tools
//                   like the Debunk Information Verifier to ease the process in
//                   news and information verification processes.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-center my-1">
//           <Link
//             href="#"
//             className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
//           >
//             <span className="mr-2 group-hover:text-white rounded-md">SEE ALL</span>
//             <svg
//               className="w-5 h-5 transform group-hover:text-white group-hover:translate-x-1  transition-transform duration-200 ease-in-out"
//               fill="#fff"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               />
//             </svg>
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }
