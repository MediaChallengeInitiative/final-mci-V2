// "use client";
// import React from "react";
// import { Sparkles } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const timelineItems = [
//   {
//     year: "2012",
//     title:
//       "The first ever inter-university news anchoring and reporting competition in Uganda",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
//   },
//   {
//     year: "2016",
//     title:
//       "Launched Media Challenge Initiative + Academy to skill young journalists",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% 38%)"
//   },
//   {
//     year: "2018",
//     title:
//       "A fellowship program skilling market ready graduates passionate about solutions and narrative change",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
//     clipPath:
//       "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
//   },
//   {
//     year: "2020",
//     title:
//       "A media incubator hub amplifying media innovation and building media capacity for viability",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)"
//   },
//   {
//     year: "2023",
//     title:
//       "The MCI SDGs Media Van taking journalism to hard to reach communities",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
//     clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
//   },
//   {
//     year: "2024",
//     title: "Africa...",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
//     clipPath: "circle(50% at 50% 50%)"
//   }
// ];

// const TimelineSection = () => {
//   return (
//     <section className="py-10 bg-gray-900 relative overflow-hidden">
//       <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center px-4 py-2 bg-sky-100 rounded-full mb-4">
//             <Sparkles className="w-5 h-5 text-sky-600 mr-2" />
//             <span className="text-sky-700 font-medium">Our Journey</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
//             Evolution Through Time
//           </h2>
//         </div>

//         {/* Timeline Swiper */}
//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={20}
//           navigation={{
//             prevEl: ".swiper-button-prev",
//             nextEl: ".swiper-button-next"
//           }}
//           pagination={{ clickable: true }}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 },
//             1280: { slidesPerView: 6 }
//           }}
//           className="!pb-12 timeline-swiper"
//         >
//           {timelineItems.map((item, index) => (
//             <SwiperSlide key={item.year}>
//               <div className="relative w-[180px]">
//                 <div
//                   className={`bg-transparent rounded-2xl ${index % 2 === 0 ? "pt-4 pb-12" : "pt-12 pb-4"}`}
//                 >
//                   {/* Year Badge */}
//                   <div
//                     className={`bg-transparent absolute left-1/2 transform -translate-x-1/2
//                     text-sky-500 text-2xl px-8 py-2 rounded-full font-bold z-10
//                     ${index % 2 === 0 ? "bottom-0 -mb-6" : "top-0 -mt-6"}`}
//                   >
//                     {item.year}
//                   </div>

//                   {/* Text */}
//                   <p
//                     className={`absolute left-1/2 w-full transform -translate-x-1/2 text-orange-500 text-center text-sm leading-tight
//                     ${index % 2 === 0 ? "bottom-0 mb-6" : "top-0 mt-6"}`}
//                   >
//                     {item.title}
//                   </p>

//                   {/* Content */}
//                   <div
//                     className={`flex flex-col gap-2 py-16 ${index % 2 === 0 ? "" : "flex-col-reverse"}`}
//                   >
//                     <div
//                       className="relative w-[150px] h-[150px] rounded-xl overflow-hidden"
//                       style={{ clipPath: item.clipPath }}
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Swiper Navigation Buttons */}
//         <div className="swiper-button-prev !text-orange-500" />
//         <div className="swiper-button-next !text-orange-500" />
//       </div>

//       <style jsx global>{`
//         .timeline-swiper .swiper-button-next,
//         .timeline-swiper .swiper-button-prev {
//           color: #f97316;
//           font-weight: bold;
//         }
//         .timeline-swiper .swiper-pagination-bullet {
//           background: #f97316;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TimelineSection;

"use client";
import React from "react";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
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

const TimelineSection = () => {
  return (
    <section className="py-10 bg-gray-900 relative overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-sky-900/50 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-sky-400 mr-2" />
            <span className="text-sky-400 font-medium">Our Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Evolution Through Time
          </h2>
        </div>

        <div className="relative">
          {/* Mobile Scroll View */}
          <div className="md:hidden overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 min-w-max py-20 px-4">
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={index}
                  isMobile={true}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 py-20">
            {timelineItems.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItem {
  year: string;
  title: string;
  image: string;
  clipPath: string;
}

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
  isMobile?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isMobile = false }) => {
  return (
    <div className="relative">
      <div className={`bg-transparent rounded-2xl ${index % 2 === 0 ? "pt-4 pb-12" : "pt-12 pb-4"}`}>
        <div className={`bg-transparent absolute left-1/2 transform -translate-x-1/2 
                       text-sky-400 text-2xl px-8 py-2 rounded-full font-bold z-10
                       ${index % 2 === 0 ? "bottom-0 -mb-6" : "top-0 -mt-6"}`}>
          {item.year}
        </div>

        <p className={`absolute left-1/2 w-full transform -translate-x-1/2 text-orange-400 
                     text-center text-sm leading-tight
                     ${index % 2 === 0 ? "bottom-0 mb-6" : "top-0 mt-6"}`}>
          {item.title}
        </p>

        <div className={`flex flex-col gap-2 py-16 ${index % 2 === 0 ? "" : "flex-col-reverse"}`}>
          <div className="relative w-[150px] h-[150px] rounded-xl overflow-hidden"
               style={{ clipPath: item.clipPath }}>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
          </div>
        </div>
      </div>

      {!isMobile && index < timelineItems.length - 1 && (
        <div className="hidden xl:block absolute top-1/2 -right-4 transform translate-x-full w-[calc(100%+2rem)] h-0.5 bg-orange-500 z-0">
          <div className="absolute right-0 w-3 h-3 bg-orange-500 transform rotate-45 -translate-y-1/2" />
        </div>
      )}
    </div>
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
