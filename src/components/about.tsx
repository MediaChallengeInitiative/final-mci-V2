"use client";

import Link from "next/link";

// Move static data to a separate constants file
const links = [
  { name: "Inter-University Media Challenge(IMC)", href: "#" },
  { name: "Media Challenge Fellowship", href: "https://fellowship.mciug.org/" },
  { name: "Media Challenge Academy", href: "#" }
] as const;

const stats = [
  { name: "IMC", value: "2,000+" },
  { name: "Graduated Fellows", value: "150+" },
  { name: "Through MCI Academy", value: "200+" }
] as const;

function GradientBackground() {
  return (
    <div
      className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#f97316] to-[#000] opacity-20"
      style={{
        clipPath:
          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      }}
    />
  );
}

export default function AboutContent() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      {/* Uncomment and update the image path when ready */}
      {/* <Image
        src="/assets/images/backgrounds/video-banner.webp"
        alt="about image"
        priority
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-right md:object-center"
        quality={90}
      /> */}

      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <GradientBackground />
      </div>

      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <GradientBackground />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-300 sm:text-6xl">
            About Us
          </h1>
          <p className="mt-6 text-base text-gray-400 text-justify lg:text-lg lg:leading-8">
            The Media Challenge Initiative (MCI) is a not-for-profit
            organization building the next generation of journalists,
            storytellers, and leaders in Uganda and Africa who are equipped to
            create change in their communities using media; and runs the MCI
            Media Hub, a media entrepreneurship incubation center in Kampala.
          </p>
          <p className="mt-6 text-base text-gray-400 text-justify lg:text-lg lg:leading-8">
            Since 2012, MCI has worked with journalism students and early-career
            journalists in Uganda, providing practical journalism skills
            training and recruitment opportunities in the media industry. This
            has been made possible through MCI&apos;s flagship Next Gen Journalist
            program that nurtures young journalists as leaders and promotes
            solutions-based journalism for social change. MCI has trained 3,000+
            students from over 15 universities through various training
            programs, including 103 young journalists from the Media Challenge
            Fellowship Program for the past six years. Many of these fellows
            have been employed in media houses across Africa, while others have
            created media organizations covering under-reported stories about
            Africa.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-sm font-semibold sm:text-base sm:leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <Link
                className="text-white hover:text-sky-500 transition-colors"
                key={link.name}
                href={link.href}
              >
                {link.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const links = [
//   { name: "Inter-University Media Challenge(IMC)", href: "#" },
//   { name: "Media Challenge Fellowship", href: "https://fellowship.mciug.org/" },
//   { name: "Media Challenge Academy", href: "#" },
// ];
// const stats = [
//   { name: "IMC", value: "2,000+" },
//   { name: "Graduated Fellows", value: "150+" },
//   { name: "Through MCI Academy", value: "200+" },
// ];

// export default function About() {
//   return (
//     <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
//       {/* <Image
//         width="500"
//         height="500"
//         layout="responsive"
//         src="/assets/images/backgrounds/video-banner.webp"
//         alt="about image"
//         className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
//       /> */}
//       <div
//         className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
//         aria-hidden="true"
//       >
//         <div
//           className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#f97316] to-[#000] opacity-20"
//           style={{
//             clipPath:
//               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//           }}
//         />
//       </div>
//       <div
//         className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
//         aria-hidden="true"
//       >
//         <div
//           className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#f97316] to-[#000] opacity-20"
//           style={{
//             clipPath:
//               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//           }}
//         />
//       </div>
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl lg:mx-0">
//           <h2 className="text-4xl font-bold tracking-tight text-gray-300 sm:text-6xl">
//             About Us
//           </h2>
//           <p className="mt-6 lg:text-lg lg:leading-8 text-gray-400 text-justify text-base">
//             The Media Challenge Initiative (MCI) is a not-for-profit
//             organization building the next generation of journalists,
//             storytellers, and leaders in Uganda and Africa who are equipped to
//             create change in their communities using media; and runs the MCI
//             Media Hub, a media entrepreneurship incubation center in Kampala.
//           </p>
//           <p className="mt-6 lg:text-lg text-base lg:leading-8 text-gray-400 text-justify">
//             Since 2012, MCI has worked with journalism students and early-career
//             journalists in Uganda, providing practical journalism skills
//             training and recruitment opportunities in the media industry. This
//             has been made possible through MCI’s flagship Next Gen Journalist
//             program that nurtures young journalists as leaders and promotes
//             solutions-based journalism for social change. MCI has trained 3,000+
//             students from over 15 universities through various training
//             programs, including 103 young journalists from the Media Challenge
//             Fellowship Program for the past six years. Many of these fellows
//             have been employed in media houses across Africa, while others have
//             created media organizations covering under-reported stories about
//             Africa.
//           </p>
//         </div>
//         <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
//           <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:text-base text-sm font-semibold sm:leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
//             {links.map((link) => (
//               <Link
//                 className="text-white hover:text-sky-500"
//                 key={link.name}
//                 href={link.href}
//               >
//                 {link.name} <span aria-hidden="true">&rarr;</span>
//               </Link>
//             ))}
//           </div>
//           <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
//             {stats.map((stat) => (
//               <div key={stat.name} className="flex flex-col-reverse">
//                 <dt className="text-base leading-7 text-gray-300">
//                   {stat.name}
//                 </dt>
//                 <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
//                   {stat.value}
//                 </dd>
//               </div>
//             ))}
//           </dl>
//         </div>
//       </div>
//     </div>
//   );
// }
