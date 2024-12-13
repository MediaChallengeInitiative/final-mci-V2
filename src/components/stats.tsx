"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatsProps {
  servedCount: string; // Dynamically passed statistics
  causeDescription: string;
  causeTitle: string;
  imageSrc: string;
  imageAlt: string;
}

interface StatisticProps {
  value: string;
  description: string;
}

const Statistic: React.FC<StatisticProps> = ({ value, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="mr-8"
  >
    <p className="text-2xl text-green-500 font-bold">{value}</p>
    <p className="text-lg pt-2">{description}</p>
  </motion.div>
);

const Stats: React.FC<StatsProps> = ({
  servedCount,
  causeDescription,
  causeTitle,
  imageSrc,
  imageAlt
}) => {
  return (
    <section className="bg-black">
      <div className="md:flex">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="md:w-6/12 text-white bg-amber-500 p-8 sm:rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg rounded-tl-lg flex items-center"
        >
          <div>
            <h1 className="text-6xl mb-5 font-bold">
              {causeTitle} <span className="text-green-500">Cause</span>
            </h1>
            <h2 className="text-lg mb-12">{causeDescription}</h2>
            <div className="flex">
              <Statistic value={servedCount} description="Served Over" />
            </div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="md:w-6/12 relative"
        >
          <div className="bg-slate-700 w-full h-full opacity-60 absolute sm:rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg rounded-br-lg" />
          <Image
            className="h-full w-full object-cover sm:rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg rounded-br-lg"
            src={imageSrc}
            alt={imageAlt}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;

{
  /* <Stats
  servedCount="5,000+"
  causeTitle="Our"
  causeDescription="We provide crucial support in areas such as food security, nutrition, health, water, sanitation, and education. By partnering with us, you can help thousands of children access the essential services they need to thrive."
  imageSrc="/assets/images/hero/h1.jpg"
  imageAlt="Children receiving education and essential services"
/> */
}

// import React from "react";

// export default function Stats() {
//   return (
//     <>
//       {/* component */}
//       {/* This is an example component */}
//       <div className="bg-black">
//         <div className="md:flex">
//           <div className="md:w-6/12 text-white bg-amber-500 p-8 sm:rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg rounded-tl-lg flex items-center">
//             <div>
//               <h1 className="text-6xl mb-5 font-bold">
//                 Our <span className="text-green-500">Cause</span>
//               </h1>
//               <h2 className="text-lg mb-12">
//                 We provide crucial support in areas such as food security,
//                 nutrition, health, water, sanitation, and education. By
//                 partnering with us, you can help thousands of children access
//                 the essential services they need to thrive.
//               </h2>
//               <div className="flex">
//                 <div className="mr-8">
//                   <p className="text-2xl text-green-500 font-bold">5,000+</p>
//                   <p className="text-lg pt-2">
//                     Served Over
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="md:w-6/12 relative">
//             <div className="bg-slate-700 w-full h-full opacity-60 absolute sm:rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg rounded-br-lg" />
//             <Image
//               className="h-full w-full object-cover sm:rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg rounded-br-lg"
//               src="/assets/images/hero/h1.jpg"
//               alt="Global Stats Image"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
