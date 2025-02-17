"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { getNextGenStages } from "@/utils/get-next-gen-stages";
import { NextGenCycle } from "@/interface/interface";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamic import of NextGenData component
const NextGenData = dynamic(() => import("./NextGenData"), {
  loading: () => <LoadingCard />
});

// Register GSAP plugins once outside component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Loading component for individual cards
const LoadingCard = () => (
  <div className="w-[300px] h-[400px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
  </div>
);

// Loading component for the entire section
const SectionLoading = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
  </div>
);

export default function NextGenScrollSection() {
  const [nextData, setNextData] = useState<NextGenCycle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getNextGenStages();
        setNextData(res);
      } catch (err) {
        setError("Failed to fetch NextGen stages");
        console.error("Error fetching NextGen stages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Setup GSAP animation
  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current || nextData.length === 0)
      return;

    const scrollWidth = sectionRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const translateDistance = -(scrollWidth - viewportWidth);

    const animation = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0
      },
      {
        translateX: `${translateDistance}px`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top center",
          end: "+=2000",
          pin: triggerRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [nextData]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <SectionLoading />;
  }

  return (
    <Suspense fallback={<SectionLoading />}>
      <section
        ref={triggerRef}
        id="horizontal-scroll"
        className="relative h-screen overflow-hidden bg-white"
      >
        <div className="horizontal-scroll-wrapper h-full flex items-center">
          <div
            ref={sectionRef}
            className="horizontal flex gap-8 px-8 will-change-transform"
          >
            {nextData.map((data, index) => (
              <Suspense
                key={`${data.stage}-${index}`}
                fallback={<LoadingCard />}
              >
                <NextGenData
                  stage={data.stage}
                  image={data.image}
                  description={data.description}
                />
              </Suspense>
            ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
}

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { getNextGenStages } from "@/utils/get-next-gen-stages";
// import { NextGenCycle } from "@/interface/interface";
// import NextGenData from "./NextGenData";

// // Register GSAP plugins once outside component to prevent multiple registrations
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function NextGenScrollSection() {
//   const [nextData, setNextData] = useState<NextGenCycle[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLElement>(null);

//   // Fetch data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getNextGenStages();
//         setNextData(res);
//       } catch (err) {
//         setError("Failed to fetch NextGen stages");
//         console.error("Error fetching NextGen stages:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Setup GSAP animation
//   useEffect(() => {
//     if (!sectionRef.current || !triggerRef.current || nextData.length === 0)
//       return;

//     // Calculate the scroll width based on content
//     const scrollWidth = sectionRef.current.scrollWidth;
//     const viewportWidth = window.innerWidth;
//     const translateDistance = -(scrollWidth - viewportWidth);

//     const animation = gsap.fromTo(
//       sectionRef.current,
//       {
//         translateX: 0
//       },
//       {
//         translateX: `${translateDistance}px`,
//         ease: "none",
//         duration: 1,
//         scrollTrigger: {
//           trigger: triggerRef.current,
//           start: "top center",
//           end: "+=2000",
//           pin: triggerRef.current,
//           scrub: 1,
//           invalidateOnRefresh: true,
//           anticipatePin: 1
//         }
//       }
//     );

//     return () => {
//       animation.scrollTrigger?.kill();
//       animation.kill();
//     };
//   }, [nextData]);

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh] text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section
//       ref={triggerRef}
//       id="horizontal-scroll"
//       className="relative h-screen overflow-hidden bg-white"
//     >
//       <div className="horizontal-scroll-wrapper h-full flex items-center">
//         <div
//           ref={sectionRef}
//           className="horizontal flex gap-8 px-8 will-change-transform"
//         >
//           {nextData.map((data, index) => (
//             <NextGenData
//               key={`${data.stage}-${index}`}
//               stage={data.stage}
//               image={data.image}
//               description={data.description}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
