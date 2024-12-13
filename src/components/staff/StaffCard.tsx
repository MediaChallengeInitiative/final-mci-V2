"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaffCardProps } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";

const StaffCard = React.memo(({ staff, theme, index }: StaffCardProps) => {
  const router = useRouter();

  // Memoize image URL and other computed values
  const staffImageUrl = useMemo(() => urlFor(staff.image).url(), [staff.image]);

  const prefetchStaff = useCallback(() => {
    router.prefetch(`/who-we-are/staff/${staff.currentSlug}`);
  }, [router, staff.currentSlug]);

  return (
    <Link
      href={`/who-we-are/staff/${staff.currentSlug}`}
      prefetch={true} // Explicit prefetching for faster page loads
      key={index}
      className={`group relative block p-1 rounded-2xl bg-gradient-to-tr ${theme.cardBg} hover:shadow-lg hover:-translate-y-1 transition-transform duration-300`}
      onMouseEnter={prefetchStaff} // Prefetch page data on hover
      onFocus={prefetchStaff} // Prefetch when focused (accessibility)
    >
      <div className="relative overflow-hidden rounded-xl bg-white">
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            width={400}
            height={600}
            alt={staff.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={staffImageUrl}
            priority={index < 4} // High priority for first few images
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
          <div className="relative">
            <div
              className={`h-1 w-10 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-full mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            />
            <h2 className="text-xl font-bold text-white tracking-wide mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {staff.name}
            </h2>
            <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Profile
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
});

StaffCard.displayName = "StaffCard";

export default StaffCard;

// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { StaffData } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";

// interface StaffCardProps {
//   staff: StaffData;
//   index: number;
// }

// const item = {
//   hidden: { y: 20, opacity: 0 },
//   show: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: [0.43, 0.13, 0.23, 0.96]
//     }
//   }
// };

// export default function StaffCard({ staff, index }: StaffCardProps) {
//   return (
//     <motion.div
//       variants={item}
//       whileHover={{ y: -5 }}
//       className="group relative"
//     >
//       <Link href={`/who-we-are/staff/${staff.currentSlug}`}>
//         <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl">
//           <div className="aspect-w-3 aspect-h-4 relative">
//             <Image
//               src={urlFor(staff.image).url()}
//               alt={staff.name}
//               fill
//               className="object-cover transition-transform duration-500 group-hover:scale-110"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//               priority={index < 4}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//           </div>

//           <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//             <h3 className="text-xl font-bold text-white mb-1">{staff.name}</h3>
//             {staff.title && (
//               <p className="text-gray-200 text-sm">{staff.title}</p>
//             )}
//             <div className="mt-3 h-1 w-12 bg-orange-500 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }
