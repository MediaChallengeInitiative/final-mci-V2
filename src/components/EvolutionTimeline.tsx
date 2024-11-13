// "use client";

// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// interface TimelineEvent {
//   year: string;
//   title: string;
//   description: string;
//   imageSrc: string;
// }

// const timelineData: TimelineEvent[] = [
//   {
//     year: "2012",
//     title:
//       "The first ever inter-university news anchoring and reporting competition in Uganda",
//     description:
//       "Launched Media Challenge Initiative + Academy to skill young journalists",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2016",
//     title: "",
//     description:
//       "Launched Media Challenge Initiative + Academy to skill young journalists",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2018",
//     title:
//       "A fellowship program skilling market graduates passionate about solutions and narrative change",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2020",
//     title:
//       "A media incubator hub amplifying media innovation and building media capacity for viability",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2023",
//     title:
//       "The MCI SDGs Media Van taking journalism to hard to reach communities to promote local journalism and fix news deserts",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2024",
//     title: "Africa...",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   }
// ];

// const EvolutionTimeline: React.FC = () => {
//   const getClipPath = (index: number) => {
//     switch (index) {
//       case 0:
//         return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
//       case 1:
//         return "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)";
//       case 2:
//         return "circle(50% at 50% 50%)";
//       case 3:
//         return "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)";
//       case 4:
//         return "circle(50% at 50% 50%)";
//       case 5:
//         return "circle(91.0% at 91% 91%)";
//       default:
//         return "none";
//     }
//   };

//   return (
//     <section className="relative h-auto lg:min-h-screen bg-gray-900 py-20 overflow-hidden">

//       <div className="relative">
//         {/* Enhanced Title Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <div className="relative">
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
//               The Evolution
//               <motion.div
//                 className="h-1 w-32 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-6 rounded-full"
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               />
//             </h2>
//             <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
//               Our journey of transformation and growth through the years
//             </p>
//           </div>
//         </motion.div>

//         {/* Timeline Image */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true }}
//           className="w-full max-w-[90%] mx-auto relative"
//         >
//           <div className="relative rounded-lg overflow-hidden shadow-2xl">
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-transparent to-sky-500/20"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 1 }}
//             />
//             <Image
//               width={800}
//               height={500}
//               className="w-full h-auto block"
//               src="/assets/images/evolution/e1.png"
//               alt="Evolution Timeline"
//               priority
//             />
//           </div>

//           {/* Decorative elements */}
//           <motion.div
//             className="absolute -left-4 -top-4 w-24 h-24 border-l-2 border-t-2 border-sky-500/30"
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           />
//           <motion.div
//             className="absolute -right-4 -bottom-4 w-24 h-24 border-r-2 border-b-2 border-sky-500/30"
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default EvolutionTimeline;

"use client";
import React from "react";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description?: string;
  image: string;
  clipPath: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2012",
    title:
      "The first ever inter-university news anchoring and reporting competition in Uganda",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  },
  {
    year: "2016",
    title:
      "Launched Media Challenge Initiative + Academy to skill young journalists",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% 38%)"
  },
  {
    year: "2018",
    title:
      "A fellowship program skilling market ready graduates passionate about solutions and narrative change",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
  },
  {
    year: "2020",
    title:
      "A media incubator hub amplifying media innovation and building media capacity for viability",
    image:
      "https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&q=80&w=800",
    clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)"
  },
  {
    year: "2023",
    title:
      "The MCI SDGs Media Van taking journalism to hard to reach communities to promote local journalism and fix news deserts",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
  },
  {
    year: "2024",
    title: "Africa...",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800",
    clipPath: "circle(50% at 50% 50%)"
  }
];

const TimelineSection: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-sky-100 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-sky-600 mr-2" />
            <span className="text-sky-700 font-medium">Our Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Evolution Through Time
          </h2>
        </div>

        {/* Timeline Navigation */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ArrowRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Timeline Items */}
          <div
            ref={scrollContainerRef}
            className="relative overflow-x-auto hide-scrollbar py-20 px-8"
          >
            <div className="flex items-center min-w-max">
              {timelineItems.map((item, index) => (
                <React.Fragment key={item.year}>
                  <div className="relative w-[180px]">
                    <div
                      className={`bg-transparent rounded-2xl
                      ${index % 2 === 0 ? "pt-4 pb-12" : "pt-12 pb-4"}`}
                    >
                      {/* Year Badge */}
                      <div
                        className={`bg-transparent absolute left-1/2 transform -translate-x-1/2 
                        text-sky-500 text-2xl px-8 py-2 rounded-full font-bold z-10
                        ${index % 2 === 0 ? "bottom-0 -mb-6" : "top-0 -mt-6"}`}
                      >
                        {item.year}
                      </div>

                      {/* Text */}
                      <p
                        className={`absolute left-1/2 w-full transform -translate-x-1/2 text-orange-500 text-center text-sm leading-tight 
                        ${index % 2 === 0 ? "bottom-0 mb-6" : "top-0 mt-6"}`}
                      >
                        {item.title}
                      </p>
                      {/* <div
                        className={`absolute left-1/2 transform -translate-x-1/2 
                        bg-gradient-to-r from-sky-500 to-blue-600 text-white 
                        px-8 py-2 rounded-full font-bold z-10
                        ${index % 2 === 0 ? "bottom-0 -mb-6" : "top-0 -mt-6"}`}
                      >
                        {item.title}
                      </div> */}

                      {/* Content */}
                      <div
                        className={`flex flex-col gap-2 py-16
                        ${index % 2 === 0 ? "" : "flex-col-reverse"}`}
                      >
                        {/* Image with Clip Path */}
                        <div
                          className="relative w-[150px] h-[150px] rounded-xl overflow-hidden"
                          style={{
                            clipPath: item.clipPath,
                            WebkitClipPath: item.clipPath
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between cards */}
                  {index < timelineItems.length - 1 && (
                    <div className="relative z-10 mx-1 flex items-center">
                      <div className="timeline-arrow w-8 h-8 bg-orange-500" />
                      <div className="timeline-arrow w-8 h-8 bg-orange-500 -ml-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-sky-50 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-sky-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

// Start Correct
// "use client"
// import React from 'react';
// import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

// interface TimelineItem {
//   year: string;
//   title: string;
//   description: string;
//   image: string;
//   clipPath: string;
// }

// const timelineItems: TimelineItem[] = [
//   {
//     year: "2012",
//     title: "The Media Challenge Begins",
//     description: "Pioneering the first-ever inter-university news anchoring and reporting competition, setting new standards in journalism education.",
//     image: "https://images.unsplash.com/photo-1557758478-51f7e76eaed9?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
//   },
//   {
//     year: "2016",
//     title: "Academy Launch",
//     description: "Establishing a comprehensive training academy to nurture the next generation of skilled journalists and media professionals.",
//     image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% 38%)"
//   },
//   {
//     year: "2018",
//     title: "Fellowship Program",
//     description: "Creating an intensive fellowship program focused on developing market-ready graduates with a passion for solution-driven journalism.",
//     image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
//     clipPath: "circle(50.0% at 100% 50%)"
//   },
//   {
//     year: "2020",
//     title: "Innovation Hub",
//     description: "Launching a state-of-the-art media incubator hub to foster innovation and technological advancement in journalism.",
//     image: "https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)"
//   },
//   {
//     year: "2023",
//     title: "Mobile Journalism",
//     description: "Introducing a revolutionary mobile journalism initiative to reach and serve remote communities.",
//     image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
//   }
// ];

// const TimelineSection: React.FC = () => {
//   const scrollContainerRef = React.useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 400;
//       const newScrollLeft = scrollContainerRef.current.scrollLeft +
//         (direction === 'left' ? -scrollAmount : scrollAmount);

//       scrollContainerRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   return (
//     <section className="py-20 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center px-4 py-2 bg-sky-100 rounded-full mb-4">
//             <Sparkles className="w-5 h-5 text-sky-600 mr-2" />
//             <span className="text-sky-700 font-medium">Our Journey</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
//             Evolution Through Time
//           </h2>
//         </div>

//         {/* Timeline Navigation */}
//         <div className="relative">
//           {/* Timeline Line */}
//           <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600" />

//           {/* Scroll Buttons */}
//           <button
//             onClick={() => scroll('left')}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full hover:shadow-xl transition-all duration-300 border border-gray-200"
//           >
//             <ArrowLeft className="w-6 h-6 text-gray-600" />
//           </button>
//           <button
//             onClick={() => scroll('right')}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full hover:shadow-xl transition-all duration-300 border border-gray-200"
//           >
//             <ArrowRight className="w-6 h-6 text-gray-600" />
//           </button>

//           {/* Timeline Items */}
//           <div
//             ref={scrollContainerRef}
//             className="relative overflow-x-auto hide-scrollbar py-20 px-8"
//           >
//             <div className="flex space-x-8 min-w-max">
//               {timelineItems.map((item, index) => (
//                 <div key={item.year} className="relative w-[350px]">
//                   <div className={`bg-white rounded-2xl transition-all duration-500
//                     hover:shadow-2xl hover:-translate-y-1 group overflow-hidden
//                     ${index % 2 === 0 ? 'pt-4 pb-12' : 'pt-12 pb-4'}`}
//                   >
//                     {/* Year Badge */}
//                     <div className={`absolute left-1/2 transform -translate-x-1/2
//                       bg-gradient-to-r from-sky-500 to-blue-600 text-white
//                       px-8 py-2 rounded-full font-bold z-10
//                       ${index % 2 === 0 ? 'bottom-0 -mb-6' : 'top-0 -mt-6'}`}
//                     >
//                       {item.year}
//                     </div>

//                     {/* Content */}
//                     <div className={`flex flex-col gap-6 p-6
//                       ${index % 2 === 0 ? '' : 'flex-col-reverse'}`}
//                     >
//                       {/* Image with Clip Path */}
//                       <div
//                         className="relative h-48 rounded-xl overflow-hidden"
//                         style={{
//                           clipPath: item.clipPath,
//                           WebkitClipPath: item.clipPath
//                         }}
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.title}
//                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
//                       </div>

//                       {/* Text */}
//                       <div className="space-y-3">
//                         <h3 className="text-xl font-bold text-gray-900">
//                           {item.title}
//                         </h3>
//                         <p className="text-gray-600 leading-relaxed">
//                           {item.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Timeline Node */}
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <div className="w-6 h-6 rounded-full bg-sky-500 border-4 border-white shadow-xl" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Gradient Overlays */}
//           <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-sky-50 to-transparent pointer-events-none" />
//           <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-sky-50 to-transparent pointer-events-none" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TimelineSection;

// End Correct

// import React from "react";
// import Image from "next/image";

// interface TimelineEvent {
//   year: string;
//   title: string;
//   description: string;
//   imageSrc: string;
// }

// const timelineData: TimelineEvent[] = [
//   {
//     year: "2012",
//     title:
//       "The first ever inter-university news anchoring and reporting competition in Uganda",
//     description:
//       "Launched Media Challenge Initiative + Academy to skill young journalists",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2016",
//     title: "",
//     description:
//       "Launched Media Challenge Initiative + Academy to skill young journalists",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2018",
//     title:
//       "A fellowship program skilling market graduates passionate about solutions and narrative change",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2020",
//     title:
//       "A media incubator hub amplifying media innovation and building media capacity for viability",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2023",
//     title:
//       "The MCI SDGs Media Van taking journalism to hard to reach communities to promote local journalism and fix news deserts",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   },
//   {
//     year: "2024",
//     title: "Africa...",
//     description: "",
//     imageSrc: "/assets/images/alumni-impact.png"
//   }
// ];

// const EvolutionTimeline: React.FC = () => {
//   const getClipPath = (index: number) => {
//     switch (index) {
//       case 0:
//         return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
//       case 1:
//         return "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)";
//       case 2:
//         return "circle(50% at 50% 50%)";
//       case 3:
//         return "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)";
//       case 4:
//         return "circle(50% at 50% 50%)";
//       case 5:
//         return "circle(91.0% at 91% 91%)";
//       default:
//         return "none";
//     }
//   };

//   return (
//     <section className="w-full bg-gray-900">
//       <h2 className="text-4xl tracking-tight lg:text-6xl sm:text-3xl md:text-4xl font-bold text-white bg-orange-400 py-2 lg:py-4 md:py-2 px-4 sm:px-6 md:px-8 mb-4 lg:mb-6 md:mb-8 text-center">
//         The Evolution
//       </h2>
//       <div className="w-full">
//         <Image
//           width={800}
//           height={500}
//           className="w-full h-auto block"
//           src="/assets/images/evolution/e1.png"
//           alt="Evolution Time"
//         />
//       </div>
//     </section>
//   );
// };

// export default EvolutionTimeline;
