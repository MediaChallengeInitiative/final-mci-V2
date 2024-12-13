"use client";

import React from "react";
import { SolutionCard } from "./SolutionCard";
import { SolutionInterface } from "@/interface/interface";

interface SolutionsClientPageProps {
  solutions: SolutionInterface[];
}

export default function SolutionsClientPage({
  solutions
}: SolutionsClientPageProps) {
  if (!solutions || solutions.length === 0) {
    return <p className="text-white">No solutions available</p>;
  }

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      <div className="w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution._id}
              solution={solution}
              index={index} // Pass index explicitly
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import React from "react";
// import { SolutionCard } from "./SolutionCard";
// import { SolutionInterface } from "@/interface/interface";

// interface SolutionsClientPageProps {
//   solutions: SolutionInterface[];
// }

// export default function SolutionsClientPage({
//   solutions
// }: SolutionsClientPageProps) {
//   return (
//     <section className="relative bg-gray-900 overflow-hidden">
//       <div className="w-full z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {solutions.map((solution, index: number) => (
//             <SolutionCard key={index} solution={solution} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
