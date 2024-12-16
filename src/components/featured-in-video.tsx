"use client";

import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { HiOutlineClock, HiOutlineStatusOnline, HiX } from "react-icons/hi";
import { RiAwardFill } from "react-icons/ri";
import { Dialog } from "@/components/ui/dialog";

const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog onOpenChange={onClose} open={isOpen}>
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50">
              <button
                onClick={onClose}
                className="p-1.5 md:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <HiX className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>

            <motion.div
              className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center p-2 md:p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full aspect-video rounded-lg md:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/R8vH6qfSQjI?autoplay=1"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const FeaturedInVideo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="relative bg-gray-900 pb-12 sm:pb-20 md:pb-40 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 md:w-[500px] md:h-[500px] -top-32 -left-32 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute w-64 h-64 md:w-[500px] md:h-[500px] -bottom-32 -right-32 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-8 md:pt-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Featured In
            <motion.div
              className="h-1 w-24 md:w-32 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-4 md:mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
        </motion.div>

        {/* Featured Video Container */}
        <motion.div
          style={{ y }}
          className="relative mb-12 md:mb-16 max-w-6xl mx-auto pb-10"
        >
          <div
            className="relative aspect-video h-[250px] rounded-xl md:rounded-2xl overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-2 left-2 md:top-4 md:left-4 z-20 flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-red-500/90 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
              </span>
              <span className="text-[10px] md:text-xs font-medium text-white">
                REPLAY
              </span>
            </motion.div>

            {/* Video Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-900/50 to-gray-900/90 z-10" />
            <motion.img
              src="/assets/images/others/leaders-africa.png"
              alt="Featured Video"
              className="w-full h-full object-cover transform transition-all duration-700 scale-105"
              animate={{
                scale: isHovered ? 1.1 : 1.05
              }}
            />

            {/* Play Button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="group relative touch-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Outer Ring Animation */}
                <div className="absolute -inset-6 md:-inset-8 rounded-full">
                  <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-[ping_2s_ease-out_infinite]" />
                  <div className="absolute inset-0 rounded-full bg-sky-500/10 animate-[ping_2s_ease-out_infinite_0.5s]" />
                  <div className="absolute inset-0 rounded-full bg-sky-500/5 animate-[ping_2s_ease-out_infinite_1s]" />
                </div>

                {/* Button Background with Gradient */}
                <div className="relative w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5">
                  <div className="absolute inset-0 rounded-full bg-sky-500 transform group-hover:scale-95 transition-transform duration-300" />

                  {/* Play Icon Container */}
                  <div className="relative h-full w-full flex items-center justify-center">
                    <motion.div
                      animate={{
                        x: isHovered ? 2 : 0,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaPlay className="w-4 h-4 md:w-8 md:h-8 text-white ml-0.5 md:ml-1 z-30" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </motion.div>

            {/* Video Info Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-3 md:p-6 lg:p-8 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-20"
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.9
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 text-sky-400 text-xs md:text-sm">
                  <HiOutlineStatusOnline className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Streamed in South Africa</span>
                </div>

                <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-white line-clamp-2 md:line-clamp-none">
                  A Closer Look at the Young Leaders Highlighted in President
                  Obama's Mandela Lecture
                </h3>

                <div className="flex flex-wrap items-center gap-3 md:gap-6 text-gray-300 text-xs md:text-sm">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <HiOutlineClock className="text-sky-500 w-3 h-3 md:w-4 md:h-4" />
                    <span>Aug 15, 2018</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <RiAwardFill className="text-sky-500 w-3 h-3 md:w-4 md:h-4" />
                    <span>Featured Story</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Border Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl md:rounded-2xl z-10"
              animate={{
                boxShadow: isHovered
                  ? "inset 0 0 0 2px rgba(14, 165, 233, 0.5)"
                  : "inset 0 0 0 0px rgba(14, 165, 233, 0)"
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default FeaturedInVideo;

// "use client";

// import React, { useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence
// } from "framer-motion";
// import { FaPlay } from "react-icons/fa";
// import { HiOutlineClock, HiOutlineStatusOnline, HiX } from "react-icons/hi";
// import { RiAwardFill } from "react-icons/ri";
// import { Dialog } from "@/components/ui/dialog";

// const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
//   isOpen,
//   onClose
// }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <Dialog onOpenChange={onClose} open={isOpen}>
//           <motion.div
//             className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <div className="absolute top-4 right-4 z-50">
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
//               >
//                 <HiX className="w-6 h-6 text-white" />
//               </button>
//             </div>

//             <motion.div
//               className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center p-4"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
//                 <iframe
//                   src="https://www.youtube.com/embed/R8vH6qfSQjI?autoplay=1"
//                   className="w-full h-full"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// const FeaturedInVideo: React.FC = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

//   return (
//     <section className="relative bg-gray-900 pb-20 sm:pb-40 overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-[500px] h-[500px] -top-32 -left-32 bg-sky-500/10 rounded-full blur-3xl" />
//         <div className="absolute w-[500px] h-[500px] -bottom-32 -right-32 bg-orange-500/10 rounded-full blur-3xl" />
//         <div className="absolute inset-0 bg-grid-white/[0.02]" />
//       </div>

//       {/* Content Container */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center pt-4 sm:pt-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-white">
//             Featured In
//             <motion.div
//               className="h-1 w-32 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-6 rounded-full"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//           </h2>
//         </motion.div>

//         {/* Featured Video Container */}
//         <motion.div style={{ y }} className="relative max-w-5xl mx-auto">
//           <div
//             className="relative aspect-video rounded-2xl overflow-hidden group"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             {/* Status Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/90 backdrop-blur-sm"
//             >
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//               </span>
//               <span className="text-xs font-medium text-white">REPLAY</span>
//             </motion.div>

//             {/* Video Thumbnail */}
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-900/50 to-gray-900/90 z-10" />
//             <motion.img
//               src="/assets/images/others/leaders-africa.png"
//               alt="Featured Video"
//               className="w-full h-full object-cover transform transition-all duration-700 scale-105"
//               animate={{
//                 scale: isHovered ? 1.1 : 1.05
//               }}
//             />

//             {/* Play Button */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center z-20"
//               animate={{
//                 scale: isHovered ? 1.1 : 1
//               }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.button
//                 onClick={() => setIsModalOpen(true)}
//                 className="group relative"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {/* Outer Ring Animation */}
//                 <div className="absolute -inset-8 rounded-full">
//                   <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-[ping_2s_ease-out_infinite]" />
//                   <div className="absolute inset-0 rounded-full bg-sky-500/10 animate-[ping_2s_ease-out_infinite_0.5s]" />
//                   <div className="absolute inset-0 rounded-full bg-sky-500/5 animate-[ping_2s_ease-out_infinite_1s]" />
//                 </div>

//                 {/* Button Background with Gradient */}
//                 <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5">
//                   <div className="absolute inset-0 rounded-full bg-sky-500 transform group-hover:scale-95 transition-transform duration-300" />

//                   {/* Play Icon Container */}
//                   <div className="relative h-full w-full flex items-center justify-center">
//                     <motion.div
//                       animate={{
//                         x: isHovered ? 2 : 0,
//                         scale: isHovered ? 1.2 : 1
//                       }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <FaPlay className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
//                     </motion.div>
//                   </div>
//                 </div>
//               </motion.button>
//             </motion.div>

//             {/* Video Info Overlay */}
//             <motion.div
//               className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-20"
//               animate={{
//                 y: isHovered ? 0 : 10,
//                 opacity: isHovered ? 1 : 0.9
//               }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center gap-3 text-sky-400 text-sm">
//                   <HiOutlineStatusOnline className="w-4 h-4" />
//                   <span>Streamed in South Africa</span>
//                 </div>

//                 <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
//                   A Closer Look at the Young Leaders Highlighted in President
//                   Obama’s Mandela Lecture
//                 </h3>

//                 <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-300 text-sm">
//                   <div className="flex items-center gap-2">
//                     <HiOutlineClock className="text-sky-500 w-4 h-4" />
//                     <span>Aug 15, 2018</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <RiAwardFill className="text-sky-500 w-4 h-4" />
//                     <span>Featured Story</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Border Effect */}
//             <motion.div
//               className="absolute inset-0 rounded-2xl z-10"
//               animate={{
//                 boxShadow: isHovered
//                   ? "inset 0 0 0 2px rgba(14, 165, 233, 0.5)"
//                   : "inset 0 0 0 0px rgba(14, 165, 233, 0)"
//               }}
//               transition={{ duration: 0.3 }}
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* Video Modal */}
//       <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </section>
//   );
// };

// export default FeaturedInVideo;
