"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaUsers
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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

// Memoized event data
const baseEvents: readonly Event[] = [
  {
    id: 1,
    title: "Digital Journalism Summit 2024",
    date: "June 15",
    time: "09:00 AM",
    location: "Media Center, NY",
    image: "/assets/images/blog/blog-1.jpg",
    category: "Conference",
    attendees: 250,
    ticketsLeft: 50,
    description:
      "Join industry leaders to discuss the future of digital journalism"
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
] as const;

const EventMetaInfo = React.memo(
  ({ icon: Icon, text }: { icon: typeof FaCalendarAlt; text: string }) => (
    <div className="flex items-center">
      <Icon className="text-sky-500 mr-1.5" size={10} aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
);

EventMetaInfo.displayName = "EventMetaInfo";

const EventCard = React.memo(({ event }: { event: Event }) => {
  const metaInfo = useMemo(
    () => [
      { icon: FaCalendarAlt, text: event.date },
      { icon: FaClock, text: event.time },
      { icon: FaMapMarkerAlt, text: event.location }
    ],
    [event.date, event.time, event.location]
  );

  return (
    <div
      className="group h-[240px] bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      role="article"
    >
      <div className="flex h-full">
        {/* Image Section */}
        <div className="relative w-2/5">
          <Image
            src={event.image}
            alt={event.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            priority={event.id <= 2}
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="px-2 py-0.5 bg-sky-500 text-white text-xs font-medium rounded-full">
              {event.category}
            </span>
            <span className="px-2 py-0.5 bg-white/90 text-sky-500 text-xs font-medium rounded-full flex items-center gap-1">
              <FaUsers size={10} aria-hidden="true" />
              <span>{event.attendees} attendees</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-3/5 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-1.5 line-clamp-1">
              {event.title}
            </h3>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {event.description}
            </p>
            <div className="text-xs text-gray-600 space-y-1.5">
              {metaInfo.map((info, index, array) => (
                <React.Fragment key={index}>
                  <EventMetaInfo {...info} />
                  {index < array.length - 1 && (
                    <span
                      className="mx-1.5 w-1 h-1 bg-gray-300 rounded-full inline-block"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <button
              className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-full 
                         flex items-center gap-1.5 hover:bg-sky-600 transition-colors duration-300
                         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              onClick={() => {
                /* Add registration handler */
              }}
            >
              Register <FaArrowRight size={10} aria-hidden="true" />
            </button>
            <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
              {event.ticketsLeft} tickets left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

EventCard.displayName = "EventCard";

const UpcomingEventsSection: React.FC = () => {
  const events = useMemo(() => baseEvents, []);

  const swiperConfig = useMemo(
    () => ({
      slidesPerView: 3,
      spaceBetween: 16,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: true,
      modules: [Autoplay, Navigation],
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    }),
    []
  );

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="events-heading"
    >
      <div className="text-center mb-12">
        <h2
          id="events-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          Upcoming <span className="text-sky-500">Events</span>
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto mt-2">
          Join our upcoming events and be part of the media revolution
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Swiper {...swiperConfig} className="events-swiper">
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;

// "use client";

// import React, { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import {
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaClock,
//   FaArrowRight,
//   FaUsers
// } from "react-icons/fa";
// import "swiper/css";
// import "swiper/css/navigation";

// interface Event {
//   id: number;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   image: string;
//   category: string;
//   attendees: number;
//   ticketsLeft: number;
//   description: string;
// }

// const baseEvents: Event[] = [
//   {
//     id: 1,
//     title: "Digital Journalism Summit 2024",
//     date: "June 15",
//     time: "09:00 AM",
//     location: "Media Center, NY",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Conference",
//     attendees: 250,
//     ticketsLeft: 50,
//     description:
//       "Join industry leaders to discuss the future of digital journalism"
//   },
//   {
//     id: 2,
//     title: "Investigative Reporting Workshop",
//     date: "July 2",
//     time: "10:00 AM",
//     location: "Press Club, London",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Workshop",
//     attendees: 100,
//     ticketsLeft: 20,
//     description: "Learn advanced techniques in investigative journalism"
//   },
//   {
//     id: 3,
//     title: "Media Innovation Forum",
//     date: "July 20",
//     time: "11:00 AM",
//     location: "Tech Hub, SF",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Forum",
//     attendees: 300,
//     ticketsLeft: 75,
//     description: "Explore cutting-edge innovations in media technology"
//   },
//   {
//     id: 4,
//     title: "Data Journalism Masterclass",
//     date: "August 5",
//     time: "09:30 AM",
//     location: "Digital Campus, Berlin",
//     image: "/assets/images/blog/blog-1.jpg?height=400&width=600",
//     category: "Masterclass",
//     attendees: 150,
//     ticketsLeft: 30,
//     description: "Master the art of data-driven storytelling"
//   }
// ];

// const EventCard = React.memo(({ event }: { event: Event }) => (
//   <div className="group h-[240px] bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
//     <div className="flex h-full">
//       {/* Image Section */}
//       <div className="relative w-2/5">
//         <img
//           src={event.image}
//           alt={event.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
//           <span className="px-2 py-0.5 bg-sky-500 text-white text-xs font-medium rounded-full">
//             {event.category}
//           </span>
//           <span className="px-2 py-0.5 bg-white/90 text-sky-500 text-xs font-medium rounded-full flex items-center gap-1">
//             <FaUsers size={10} />
//             {event.attendees}
//           </span>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="w-3/5 p-4 flex flex-col justify-between">
//         <div>
//           <h3 className="text-base font-bold text-gray-800 mb-1.5">
//             {event.title}
//           </h3>
//           <p className="text-xs text-gray-600 mb-3">{event.description}</p>
//           <div className="text-xs text-gray-600 space-y-1.5">
//             <div className="flex items-center">
//               <FaCalendarAlt className="text-sky-500 mr-1.5" size={10} />
//               {event.date}
//               <span className="mx-1.5 w-1 h-1 bg-gray-300 rounded-full" />
//               <FaClock className="text-sky-500 mr-1.5" size={10} />
//               {event.time}
//             </div>
//             <div className="flex items-center">
//               <FaMapMarkerAlt className="text-sky-500 mr-1.5" size={10} />
//               {event.location}
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-between items-center mt-3">
//           <button className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-full flex items-center gap-1.5 hover:bg-sky-600 transition-colors duration-300">
//             Register <FaArrowRight size={10} />
//           </button>
//           <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
//             {event.ticketsLeft} left
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// ));

// const UpcomingEventsSection: React.FC = () => {
//   const events = useMemo(() => baseEvents, []);

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//           Upcoming <span className="text-sky-500">Events</span>
//         </h2>
//         <p className="text-base text-gray-600 max-w-2xl mx-auto">
//           Join our upcoming events and be part of the media revolution
//         </p>
//       </div>

//       <Swiper
//         slidesPerView={3}
//         spaceBetween={16}
//         loop={true}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false
//         }}
//         navigation={true}
//         modules={[Autoplay, Navigation]}
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 }
//         }}
//         className="events-swiper"
//       >
//         {events.map((event) => (
//           <SwiperSlide key={event.id}>
//             <EventCard event={event} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default UpcomingEventsSection;
