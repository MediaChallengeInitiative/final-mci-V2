"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { Theme } from "@/interface/interface";

interface BreadcrumbProps {
  title: string;
  subtitle?: string;
  currentTheme: Theme;
}

export default function Breadcrumb({
  title,
  subtitle,
  currentTheme
}: BreadcrumbProps) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  const getThemeGradient = () => {
    return `from-${currentTheme.gradientFrom.split("-")[1]} via-${currentTheme.gradientVia.split("-")[1]} to-${currentTheme.gradientTo.split("-")[1]}`;
  };

  const getOverlayStyle = () => {
    switch (currentTheme.name) {
      case "green":
        return "from-green-900/80 via-emerald-900/80 to-green-900/80";
      case "sky":
        return "from-sky-900/80 via-blue-900/80 to-indigo-900/80";
      case "pink":
        return "from-pink-900/80 via-rose-900/80 to-red-900/80";
      case "orange":
        return "from-orange-900/80 via-amber-900/80 to-yellow-900/80";
      case "purple":
        return "from-purple-900/80 via-violet-900/80 to-indigo-900/80";
      case "dark":
        return "from-gray-900/90 via-gray-800/90 to-gray-900/90";
      default:
        return "from-blue-900/80 via-purple-900/80 to-blue-900/80";
    }
  };

  return (
    <div className="relative lg:h-[320px] h-[200px] w-full overflow-hidden">
      {/* Background Container */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          className="w-full h-full object-cover"
          src="/assets/images/breadcrumb-bg.jpg"
          width={1920}
          height={1080}
          priority
          alt="breadcrumb background"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${getOverlayStyle()} transition-colors duration-500`}
        />

        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-full h-full bg-pattern animate-float" />
        </div>
      </motion.div>

      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-8 lg:py-12">
        {/* Navigation Section */}
        {/* <div className="w-full max-w-7xl px-4 mx-auto">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full w-fit mx-auto"
          >
            <Link
              href="/"
              className="flex items-center text-white/80 hover:text-white transition-colors duration-300 text-sm"
            >
              <Home className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            {paths.map((path, index) => (
              <React.Fragment key={path}>
                <ChevronRight className="w-3 h-3 text-white/60" />
                <Link
                  href={`/${paths.slice(0, index + 1).join("/")}`}
                  className={`text-sm transition-colors duration-300 capitalize ${
                    index === paths.length - 1
                      ? "text-white font-medium bg-white/20 px-3 py-1 rounded-full"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {path.replace(/-/g, " ")}
                </Link>
              </React.Fragment>
            ))}
          </motion.nav>
        </div> */}

        {/* Title Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative text-center"
          >
            {/* Decorative Elements */}
            <div className="absolute -left-4 -top-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
            <div className="absolute -right-4 -bottom-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />

            {/* Title */}
            <h1
              className={`relative font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-${currentTheme.gradientFrom.split("-")[1]}-200
              pb-2 mb-4`}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white/90 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`h-1 w-24 mx-auto mt-6 bg-gradient-to-r ${getThemeGradient()} rounded-full`}
            />
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className={`w-full h-16 text-${currentTheme.bg.split("-")[1]} transition-colors duration-500`}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { ChevronRight, Home } from "lucide-react";
// import { usePathname } from "next/navigation";

// interface BreadcrumbProps {
//   title: string;
//   subtitle?: string;
// }

// export default function Breadcrumb({ title, subtitle }: BreadcrumbProps) {
//   const pathname = usePathname();
//   const paths = pathname.split("/").filter((path) => path);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <div className="relative lg:h-[280px] h-[140px] w-full overflow-hidden">
//       {/* Background Image with Parallax Effect */}
//       <motion.div
//         initial={{ scale: 1.2 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 1.5 }}
//         className="absolute inset-0"
//       >
//         <Image
//           className="w-full h-full object-cover"
//           src="/assets/images/breadcrumb-bg.jpg"
//           width={1920}
//           height={1080}
//           priority
//           alt="breadcrumb image"
//         />
//         {/* Overlay with gradient */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-blue-900/80" />

//         {/* Animated patterns */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute w-full h-full bg-[url('/assets/patterns/dot-pattern.png')] animate-float" />
//         </div>
//       </motion.div>

//       {/* Content */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="relative z-10 w-full h-full"
//       >
//         {/* Navigation breadcrumbs */}
//         <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4">
//           <motion.div
//             variants={itemVariants}
//             className="flex items-center justify-center text-white/80 text-sm"
//           >
//             <Link
//               href="/"
//               className="hover:text-white transition-colors duration-300 flex items-center"
//             >
//               <Home className="w-4 h-4 mr-2" />
//               Home
//             </Link>
//             {paths.map((path, index) => (
//               <React.Fragment key={path}>
//                 <ChevronRight className="w-4 h-4 mx-2 text-white/60" />
//                 <Link
//                   href={`/${paths.slice(0, index + 1).join("/")}`}
//                   className={`hover:text-white transition-colors duration-300 capitalize ${
//                     index === paths.length - 1 ? "text-white font-medium" : ""
//                   }`}
//                 >
//                   {path.replace(/-/g, " ")}
//                 </Link>
//               </React.Fragment>
//             ))}
//           </motion.div>
//         </div>

//         {/* Main title and subtitle */}
//         <div className="flex flex-col items-center justify-center w-full h-full px-4">
//           <motion.h1
//             variants={itemVariants}
//             className="font-bold mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center relative"
//           >
//             {/* Decorative elements */}
//             <span className="absolute -left-8 -top-8 w-16 h-16 border-t-2 border-l-2 border-white/20" />
//             <span className="absolute -right-8 -bottom-8 w-16 h-16 border-b-2 border-r-2 border-white/20" />

//             {/* Title with gradient text */}
//             <span className="bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
//               {title}
//             </span>
//           </motion.h1>

//           {subtitle && (
//             <motion.p
//               variants={itemVariants}
//               className="text-white/80 text-lg md:text-xl max-w-2xl text-center"
//             >
//               {subtitle}
//             </motion.p>
//           )}
//         </div>

//         {/* Decorative bottom wave */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             className="w-full h-8 text-white"
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
//               className="fill-current"
//             />
//           </svg>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
