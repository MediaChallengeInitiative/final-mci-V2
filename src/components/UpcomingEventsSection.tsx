"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid, EffectFade } from "swiper/modules";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaUsers,
  FaTicketAlt
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  attendees: number;
  ticketsLeft: number;
  description: string;
}

const baseEvents: Event[] = [
  {
    id: 1,
    title: "Digital Journalism Summit 2024",
    date: "June 15",
    time: "09:00 AM",
    location: "Media Center, NY",
    image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
    category: "Conference",
    attendees: 250,
    ticketsLeft: 50,
    description: "Join industry leaders to discuss the future of digital journalism"
  },
  {
    id: 2,
    title: "Investigative Reporting Workshop",
    date: "July 2",
    time: "10:00 AM",
    location: "Press Club, London",
    image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
    category: "Workshop",
    attendees: 100,
    ticketsLeft: 20,
    description: "Learn advanced techniques in investigative journalism"
  },
  {
    id: 3,
    title: "Media Innovation Forum",
    date: "July 20",
    time: "11:00 AM",
    location: "Tech Hub, SF",
    image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
    category: "Forum",
    attendees: 300,
    ticketsLeft: 75,
    description: "Explore cutting-edge innovations in media technology"
  },
  {
    id: 4,
    title: "Data Journalism Masterclass",
    date: "August 5",
    time: "09:30 AM",
    location: "Digital Campus, Berlin",
    image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
    category: "Masterclass",
    attendees: 150,
    ticketsLeft: 30,
    description: "Master the art of data-driven storytelling"
  }
];

const EventCard: React.FC<{ event: Event; isActive: boolean }> = ({
  event,
  isActive
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group h-[280px] bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300
                 ${isActive ? "ring-2 ring-sky-500 ring-offset-2" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex h-full">
        {/* Image Section */}
        <div className="relative w-2/5 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="px-3 py-1 bg-sky-500 text-white text-xs font-medium rounded-full">
              {event.category}
            </span>
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sky-500 text-xs font-medium rounded-full flex items-center gap-1">
              <FaUsers size={10} />
              {event.attendees} attending
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-3/5 p-6 flex flex-col justify-between relative">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300">
              {event.title}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <FaCalendarAlt className="text-sky-500 mr-2" size={14} />
                <span>{event.date}</span>
                <div className="mx-2 w-1 h-1 bg-gray-300 rounded-full" />
                <FaClock className="text-sky-500 mr-2" size={14} />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <FaMapMarkerAlt className="text-sky-500 mr-2" size={14} />
                <span className="truncate">{event.location}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <FaTicketAlt className="text-sky-500 mr-2" size={14} />
                <span>
                  {event.ticketsLeft} tickets left
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <motion.button
              className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-full flex items-center gap-2 hover:bg-sky-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
              <FaArrowRight size={12} />
            </motion.button>

            <div className="px-3 py-1 bg-gray-100 rounded-full">
              <span className="text-xs font-medium text-gray-600">
                {new Date(event.date).toLocaleString("default", {
                  month: "short"
                })}
              </span>
            </div>
          </div>

          {/* Progress bar for tickets */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
            <motion.div
              className="h-full bg-sky-500"
              initial={{ width: 0 }}
              animate={{ width: `${(event.ticketsLeft / (event.attendees + event.ticketsLeft)) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UpcomingEventsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_70%)]" />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(14,165,233,0.05) 2px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upcoming <span className="text-sky-500">Events</span>
            <motion.div
              className="h-1 w-32 bg-sky-500 mx-auto mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our upcoming events and be part of the media revolution
          </p>
        </motion.div>

        {/* Swiper Container */}
        <Swiper
          slidesPerView={1}
          grid={{
            rows: 1,
            fill: "row"
          }}
          spaceBetween={24}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              grid: {
                rows: 1
              }
            },
            1024: {
              slidesPerView: 2,
              grid: {
                rows: 1
              }
            }
          }}
          navigation={true}
          modules={[Grid, Autoplay, Navigation, EffectFade]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="events-swiper !overflow-visible"
        >
          {baseEvents.map((event, index) => (
            <SwiperSlide key={event.id} className="!h-auto pb-8">
              <EventCard event={event} isActive={index === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Navigation Buttons */}
      <style jsx global>{`
        .events-swiper .swiper-button-next,
        .events-swiper .swiper-button-prev {
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 50%;
          color: #0ea5e9;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
                      0 2px 4px -2px rgb(0 0 0 / 0.1);
          transition: all 0.2s ease;
        }

        .events-swiper .swiper-button-next:hover,
        .events-swiper .swiper-button-prev:hover {
          background: #0ea5e9;
          color: white;
          transform: scale(1.1);
        }

        .events-swiper .swiper-button-next:after,
        .events-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .events-swiper .swiper-button-disabled {
          opacity: 0.5 !important;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .events-swiper .swiper-button-next,
          .events-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default UpcomingEventsSection;


// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Grid } from "swiper/modules";
// import {
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaClock,
//   FaArrowRight
// } from "react-icons/fa";
// import "swiper/css";
// import "swiper/css/grid";
// import "swiper/css/navigation";

// interface Event {
//   id: number;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   image: string;
//   category: string;
// }

// // Base events array
// const baseEvents: Event[] = [
//   {
//     id: 1,
//     title: "Digital Journalism Summit 2024",
//     date: "June 15",
//     time: "09:00 AM",
//     location: "Media Center, NY",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Conference"
//   },
//   {
//     id: 2,
//     title: "Investigative Reporting Workshop",
//     date: "July 2",
//     time: "10:00 AM",
//     location: "Press Club, London",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Workshop"
//   },
//   {
//     id: 3,
//     title: "Media Innovation Forum",
//     date: "July 20",
//     time: "11:00 AM",
//     location: "Tech Hub, SF",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Forum"
//   },
//   {
//     id: 4,
//     title: "Data Journalism Masterclass",
//     date: "August 5",
//     time: "09:30 AM",
//     location: "Digital Campus, Berlin",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Masterclass"
//   }
// ];

// const EventCard: React.FC<{ event: Event; isActive: boolean }> = ({
//   event,
//   isActive
// }) => {
//   return (
//     <motion.div
//       className={`group h-[200px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
//                  ${isActive ? "ring-2 ring-sky-500 ring-offset-2" : ""}`}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex h-full">
//         {/* Image Section */}
//         <div className="relative w-1/3 overflow-hidden">
//           <motion.div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
//           <motion.img
//             src={event.image}
//             alt={event.title}
//             className="w-full h-full object-cover"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           />
//           <div className="absolute top-3 left-3 px-3 py-1 bg-sky-500 text-white text-xs font-medium rounded-full">
//             {event.category}
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="w-2/3 p-4 flex flex-col justify-between">
//           <div>
//             <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300">
//               {event.title}
//             </h3>

//             <div className="space-y-1">
//               <div className="flex items-center text-sm text-gray-600">
//                 <FaCalendarAlt className="text-sky-500 mr-2" size={12} />
//                 <span>{event.date}</span>
//                 <div className="mx-2 w-1 h-1 bg-gray-300 rounded-full" />
//                 <FaClock className="text-sky-500 mr-2" size={12} />
//                 <span>{event.time}</span>
//               </div>

//               <div className="flex items-center text-sm text-gray-600">
//                 <FaMapMarkerAlt className="text-sky-500 mr-2" size={12} />
//                 <span className="truncate">{event.location}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center mt-3">
//             <motion.button
//               className="text-sm text-sky-500 font-medium flex items-center gap-1 hover:text-sky-600 transition-colors duration-300"
//               whileHover={{ x: 5 }}
//             >
//               Learn More
//               <FaArrowRight size={12} />
//             </motion.button>

//             <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
//               {new Date(event.date).toLocaleString("default", {
//                 month: "short"
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hover Effects */}
//       <motion.div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-transparent transition-all duration-300" />
//     </motion.div>
//   );
// };

// const UpcomingEventsSection: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">
//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.05),transparent_70%)]" />
//         <motion.div
//           className="absolute inset-y-0 left-0 w-1/2"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0.5, 0.8, 0.5] }}
//           transition={{ duration: 4, repeat: Infinity }}
//         >
//           <svg
//             className="h-full w-full"
//             viewBox="0 0 100 100"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M0,0 L100,0 L50,100 L0,100 Z"
//               fill="url(#grid-gradient)"
//               fillOpacity="0.05"
//             />
//           </svg>
//         </motion.div>
//       </div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-4">
//             Upcoming Events
//             <motion.div
//               className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-6 rounded-full"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Join our upcoming events and be part of the media revolution
//           </p>
//         </motion.div>

//         {/* Swiper Container */}
//         <Swiper
//           slidesPerView={1}
//           grid={{
//             rows: 1,
//             fill: "row"
//           }}
//           spaceBetween={20}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false
//           }}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//               grid: {
//                 rows: 2
//               }
//             },
//             1024: {
//               slidesPerView: 2,
//               grid: {
//                 rows: 1
//               }
//             }
//           }}
//           loop={true}
//           navigation={true}
//           modules={[Grid, Autoplay, Navigation]}
//           onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//           className="events-swiper"
//         >
//           {baseEvents.map((event, index) => (
//             <SwiperSlide className="py-20 px-20" key={event.id}>
//               <EventCard event={event} isActive={index === activeIndex} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Custom Navigation Buttons */}
//       <style jsx global>{`
//         .events-swiper .swiper-button-next,
//         .events-swiper .swiper-button-prev {
//           position: absolute !important;
//           top:10;
//           left:10;
//           z-index: 1000;
//           padding: 20px 4px;
//           display:inline-flex;
//           color: #0ea5e9;
//           background: white;
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
//         }

//         .events-swiper .swiper-button-next:after,
//         .events-swiper .swiper-button-prev:after {
//           font-size: 16px;
//         }

//         @media (max-width: 640px) {
//           .events-swiper .swiper-button-next,
//           .events-swiper .swiper-button-prev {
//             display: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default UpcomingEventsSection;
