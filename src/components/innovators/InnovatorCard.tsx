// components/InnovatorCard.tsx
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight, Globe } from "lucide-react";
import { BaseInnovator } from "@/types/innovator";
import { getStorageUrl } from "@/lib/api/innovators";
import { Theme } from "@/interface/interface";

interface InnovatorCardProps {
  innovator: BaseInnovator;
  index: number;
  theme: Theme;
}

const InnovatorCard = React.memo(({ innovator, theme, index }: InnovatorCardProps) => {
  const formattedDate = useMemo(() => {
    return new Date(innovator.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }, [innovator.created_at]);

  const logoUrl = getStorageUrl(innovator.logo);
  const imageUrl = getStorageUrl(innovator.image);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2">
      {/* Card Header with Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl || "/images/placeholder.jpg"}
          alt={innovator.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 6}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Logo Overlay */}
        {logoUrl && (
          <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-lg p-2">
              <div className="relative w-full h-full">
                <Image
                  src={logoUrl}
                  alt={`${innovator.name} logo`}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <time dateTime={innovator.created_at}>{formattedDate}</time>
          </div>
          {innovator.website_link && (
            <a
              href={innovator.website_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-sky-500 hover:text-sky-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-4 h-4 mr-1" />
              <span>Website</span>
            </a>
          )}
        </div>

        <Link href={`/innovators/${innovator.slug}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-sky-500 transition-colors duration-300">
            {innovator.name}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {innovator.short_description}
          </p>

          <div className="flex items-center text-sky-500 font-medium mt-auto group-hover:gap-2 transition-all duration-300">
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
});

InnovatorCard.displayName = "InnovatorCard";

export default InnovatorCard;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { BaseInnovator } from "@/types/innovator";
// import { getStorageUrl } from "@/lib/api/innovators";

// interface InnovatorCardProps {
//   innovator: BaseInnovator;
// }

// export const InnovatorCard: React.FC<InnovatorCardProps> = ({ innovator }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   // Get full URLs for images using the storage URL utility
//   const logoUrl = getStorageUrl(innovator.logo);
//   const imageUrl = getStorageUrl(innovator.image);

//   return (
//     <Link href={`/innovators/${innovator.slug}`}>
//       <motion.div
//         className="relative rounded-2xl overflow-hidden bg-gray-900 h-full cursor-pointer"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         whileHover={{ scale: 1.02 }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Gradient border */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-[1px] rounded-2xl">
//           <div className="h-full w-full bg-gray-900 rounded-2xl">
//             {/* Main image/placeholder */}
//             <div className="relative w-full h-48 bg-gray-800">
//               {imageUrl ? (
//                 <Image
//                   src={imageUrl}
//                   alt={`${innovator.name} cover`}
//                   fill
//                   className="object-cover transition-transform duration-300"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image Available
//                 </div>
//               )}
//             </div>

//             {/* Content */}
//             <div className="p-6">
//               <h3 className="text-xl font-bold text-white mb-2">
//                 {innovator.name}
//               </h3>
//               <p className="text-gray-300 mb-6 line-clamp-3">
//                 {innovator.short_description}
//               </p>

//               {/* Website link */}
//               {innovator.website_link && (
//                 <a
//                   href={innovator.website_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     window.open(innovator.website_link, "_blank");
//                   }}
//                   className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
//                 >
//                   Visit Website
//                   <svg
//                     className="w-4 h-4 ml-1"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//                     />
//                   </svg>
//                 </a>
//               )}

//               <div className="mt-4">
//                 <span className="inline-flex items-center text-sm text-blue-400">
//                   Learn More
//                   <svg
//                     className="w-4 h-4 ml-1"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Logo overlay */}
//         {logoUrl && (
//           <div className="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
//             <Image
//               src={logoUrl}
//               alt={`${innovator.name} logo`}
//               fill
//               className="object-contain p-1"
//               sizes="64px"
//               priority
//             />
//           </div>
//         )}

//         {/* Hover overlay */}
//         <motion.div
//           className="absolute inset-0 bg-black pointer-events-none"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isHovered ? 0.1 : 0 }}
//           transition={{ duration: 0.2 }}
//         />
//       </motion.div>
//     </Link>
//   );
// };

// export default InnovatorCard;
