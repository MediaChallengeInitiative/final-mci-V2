import React from "react";
import Image from "next/image";
// import { ThematicData } from "@/interface/interface";
// import { getAllThematicAreas } from "@/utils/get-all-thematic-areas";

interface ProgramsProps {
  className?: string;
}

export default async function Programs({ className = "" }: ProgramsProps) {
  // const thematicData: ThematicData[] = await getAllThematicAreas();

  return (
    <section
      className={`relative w-full ${className}`}
      aria-label="Programs Section"
    >
      <div className="parallax-container mx-auto rounded-lg lg:py-40 lg:my-12 py-60 relative overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" aria-hidden="true" />

        {/* Parallax Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/images/parallax-bg.jpg"
            alt="Programs background"
            fill
            sizes="100vw"
            priority
            quality={85}
            className="object-cover object-center"
            style={{
              transform: "scale(1.1)", // Slight scale for parallax effect
              willChange: "transform"
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add your content here */}
        </div>
      </div>

      <style jsx>{`
        /* Custom parallax effect using CSS */
        .parallax-container {
          perspective: 1px;
          transform-style: preserve-3d;
        }

        @media (prefers-reduced-motion: no-preference) {
          .parallax-container {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        }

        /* Disable parallax effect for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .parallax-container {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ThematicData } from "@/interface/interface";
// import { getAllThematicAreas } from "@/utils/get-all-thematic-areas";
// import { urlFor } from "@/lib/sanity";

// export default async function Programs() {
//   const thematicData: ThematicData[] = await getAllThematicAreas();
//   return (
//     <>
//       <div className="paralax-container mx-auto rounded-lg lg:py-40 lg:my-12 py-60 relative overflow-hidden before:absolute before:content-[''] before:inset-0 before:bg-dark-base before:bg-opacity-30 before:z-1">
//         <div className="jarallax absolute inset-0" data-jarallax="">
//           <Image
//             width={300}
//             height={300}
//             className="jarallax-img w-full h-full object-cover"
//             src="/assets/images/parallax-bg.jpg"
//             alt="placeholder"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
