import React from "react";
import Image from "next/image";

// Define types for the component props
interface VisionProps {
  className?: string;
}

const Vision: React.FC<VisionProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-6 md:py-12 lg:py-16 bg-transparent dark:bg-gray-800 ${className}`}
      // Remove client-side only attributes that cause hydration mismatches
      suppressHydrationWarning
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
          {/* Add priority to LCP image */}
          <div className="relative mx-auto aspect-video w-full max-w-[600px]">
            <Image
              alt="Vision hero image"
              className="rounded-xl object-cover object-center"
              src="/assets/images/projects/p1.jpg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority
              quality={85}
            />
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <div className="space-y-1">
              <h1 className="text-center rounded-lg bg-transparent px-0 text-white capitalize py-1 text-4xl lg:text-7xl dark:bg-gray-800">
                Our Vision
              </h1>
              <h2 className="text-center capitalize text-4xl text-sky-500 font-bold tracking-tighter lg:text-7xl">
                A humane media that shapes the future.
              </h2>
              {/* Commented sections preserved for future use */}
              {/*
              <p className="max-w-[600px] pt-4 text-gray-300 md:text-xl/relaxed lg:text-md/relaxed xl:text-2xl/relaxed dark:text-gray-200">
                We believe that the next generation of journalists is very
                essential in defining the future world through the stories
                they tell and how they tell them.
              </p>
              */}
              {/*
              <div className="mt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded text-md"
                >
                  Learn More <TiArrowRight className="text-2xl" />
                </Link>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;

// import React from 'react'
// import Image from "next/image"
// import { TiArrowRight } from 'react-icons/ti'
// import Link from 'next/link'

// export default function Vision() {
//   return (
//     <>
//       <section className="w-full py-6 md:py-12 lg:py-16 bg-transparent dark:bg-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
//             <Image
//               alt="Hero"
//               className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
//               height="400"
//               src="/assets/images/projects/p1.jpg"
//               width="600"
//             />
//             <div className="flex flex-col justify-center space-y-2">
//               <div className="space-y-1">
//                 <div className="text-center rounded-lg bg-transparent px-0 text-white capitalize py-1 text-4xl lg:text-7xl dark:bg-gray-800">
//                   Our Vision
//                 </div>
//                 <h2 className="text-center capitalize text-4xl text-sky-500 font-bold tracking-tighter lg:text-7xl">
//                   A humane media that shapes the future.
//                 </h2>
//                 {/* <p className="max-w-[600px] pt-4 text-gray-300 md:text-xl/relaxed lg:text-md/relaxed xl:text-2xl/relaxed dark:text-gray-200">
//                   We believe that the next generation of journalists is very
//                   essential in defining the future world through the stories
//                   they tell and how they tell them.
//                 </p> */}
//               </div>
//               {/* <div className="mt-4">
//                 <Link
//                   href="/about"
//                   className="inline-flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded text-md"
//                 >
//                   Learn More <TiArrowRight className="text-2xl" />
//                 </Link>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }
