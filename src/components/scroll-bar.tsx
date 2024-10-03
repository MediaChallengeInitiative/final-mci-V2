// import React from "react";
// import Link from "next/link";

// export default function ScrollBar() {
//   return (
//     <>
//       <div className="bg-[#0097d1] px-0 py-5 xl:mx-0 m-0">
//         <div className="marquee">
//           <ul className="marquee__content lg:text-lg text-base text-white">
//             <li className="pr-2 capitalize">At Media Challenge Initiative,</li>
//             <li className="pr-2 capitalize">
//               We Believe that Journalism Can Make The World A Better Place,
//             </li>
//             <li className="pr-2 capitalize">
//               A humane media that shapes the future,
//             </li>
//             <li className="pr-2 capitalize">
//               Transforming societies through advancing journalism and amplifying
//               innovations,
//             </li>
//           </ul>
//           {/* Mirrors the content above */}
//           <ul
//             className="marquee__content lg:text-lg text-base text-white"
//             aria-hidden="true"
//           >
//             <li className="pr-2 capitalize">At Media Challenge Initiative,</li>
//             <li className="pr-2 capitalize">
//               We Believe that Journalism Can Make The World A Better Place,
//             </li>
//             <li className="pr-2 capitalize">
//               A humane media that shapes the future,
//             </li>
//             <li className="pr-2 capitalize">
//               Transforming societies through advancing journalism and amplifying
//               innovations,
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import Link from "next/link";

export default function ScrollBar() {
  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
        {/* Static text on the left */}
        <div className="bg-orange-400 text-white font-bold text-4xl w-full p-4 whitespace-nowrap">
          We Do This Through
        </div>

        {/* Scrolling text on the right */}
        <div className="bg-white flex-grow overflow-hidden">
          <div className="marquee inline-flex whitespace-nowrap animate-ticker p-4 border-2 border-[#f6931d]">
            <ul className="marquee__content text-xl lg:text-4xl text-[#0097d1]">
              <li className="pr-2 capitalize">
                At Media Challenge Initiative,
              </li>
              <li className="pr-2 capitalize">
                We Believe that Journalism Can Make The World A Better Place,
              </li>
              <li className="pr-2 capitalize">
                A humane media that shapes the future,
              </li>
              <li className="pr-2 capitalize">
                Transforming societies through advancing journalism and
                amplifying innovations,
              </li>
            </ul>
            {/* Mirrors the content above */}
            <ul
              className="marquee__content lg:text-4xl text-base text-white"
              aria-hidden="true"
            >
              <li className="pr-2 capitalize">
                At Media Challenge Initiative,
              </li>
              <li className="pr-2 capitalize">
                We Believe that Journalism Can Make The World A Better Place,
              </li>
              <li className="pr-2 capitalize">
                A humane media that shapes the future,
              </li>
              <li className="pr-2 capitalize">
                Transforming societies through advancing journalism and
                amplifying innovations,
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
