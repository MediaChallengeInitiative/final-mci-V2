"use client";

import React, { useState, useCallback, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = React.memo(
  ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = useCallback(() => {
      setIsLoading(true);
      onClose();
    }, [onClose]);

    // Handle ESC key press
    useEffect(() => {
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleEscKey);
      }

      return () => {
        window.removeEventListener("keydown", handleEscKey);
      };
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-6xl aspect-video rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-900 shadow-2xl"
              >
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-900">
                    <Skeleton className="w-full h-full animate-pulse" />
                  </div>
                )}
                <iframe
                  src="https://www.youtube.com/embed/R8vH6qfSQjI?autoplay=1"
                  className={cn(
                    "w-full h-full transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={() => setIsLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60] group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <HiX className="w-5 h-5 sm:w-6 sm:h-6 text-white transform transition-transform group-hover:rotate-90 duration-300" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

VideoModal.displayName = "VideoModal";

const FeaturedInVideo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-width)";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isModalOpen]);

  // Calculate scrollbar width on mount
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 w-full">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-full max-w-[30rem] aspect-square -top-1/4 -left-1/4 bg-sky-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-full max-w-[30rem] aspect-square -bottom-1/4 -right-1/4 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] sm:bg-[length:32px_32px]" />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto max-w-[2000px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight">
            Featured In
            <motion.div
              className="h-1 sm:h-1.5 w-24 sm:w-32 lg:w-48 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500 mx-auto mt-4 sm:mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
        </motion.div>

        {/* Video Section */}
        <motion.div style={{ y }} className="relative w-full">
          <div className="space-y-4 sm:space-y-0">
            {/* Video Container */}
            <motion.div
              className="relative w-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-video">
                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-6 lg:left-6 z-20"
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-full w-full bg-white" />
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white">
                      REPLAY
                    </span>
                  </div>
                </motion.div>

                {/* Video Thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-gray-900/60 to-gray-900/90 z-10" />
                <motion.img
                  src="/assets/images/others/leaders-africa.png"
                  alt="Featured Video"
                  className="w-full h-full object-cover"
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.7 }}
                />

                {/* Play Button */}
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                    <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-ping" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5 shadow-lg">
                      <div className="h-full w-full rounded-full bg-sky-500 flex items-center justify-center group-hover:bg-sky-600 transition-all duration-300">
                        <motion.div
                          animate={{ x: isHovered ? 2 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaPlay className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white ml-1" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Video Info */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent z-20"
                  animate={{
                    y: isHovered ? 0 : 10,
                    opacity: isHovered ? 1 : 0.9
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                    <div className="flex items-center gap-2 text-sky-400 text-sm">
                      <HiOutlineStatusOnline className="w-4 h-4" />
                      <span>Streamed in South Africa</span>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                      A Closer Look at the Young Leaders Highlighted in
                      President Obama's Mandela Lecture
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm">
                      <div className="flex items-center gap-2">
                        <HiOutlineClock className="text-sky-500 w-4 h-4" />
                        <span>Aug 15, 2018</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RiAwardFill className="text-sky-500 w-4 h-4" />
                        <span>Featured Story</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default FeaturedInVideo;

// "use client";

// import React, { useState, useCallback } from "react";
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
// import { Skeleton } from "@/components/ui/skeleton";

// interface VideoModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <Dialog onOpenChange={onClose} open={isOpen}>
//           <motion.div
//             className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
//             >
//               <HiX className="w-5 h-5 md:w-6 md:h-6 text-white" />
//             </button>

//             <motion.div
//               className="relative w-full max-w-[90vw] md:max-w-6xl xl:max-w-7xl mx-auto h-full flex items-center justify-center p-4 md:p-6"
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//             >
//               <div className="w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
//                 {isLoading && (
//                   <div className="absolute inset-0 bg-gray-900">
//                     <Skeleton className="w-full h-full" />
//                   </div>
//                 )}
//                 <iframe
//                   src="https://www.youtube.com/embed/R8vH6qfSQjI?autoplay=1"
//                   className="w-full h-full"
//                   onLoad={() => setIsLoading(false)}
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
//   const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

//   const handleMouseEnter = useCallback(() => setIsHovered(true), []);
//   const handleMouseLeave = useCallback(() => setIsHovered(false), []);

//   return (
//     <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
//       {/* Enhanced Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute w-[40rem] h-[40rem] -top-40 -left-40 bg-sky-500/10 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.5, 0.8, 0.5]
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute w-[40rem] h-[40rem] -bottom-40 -right-40 bg-orange-500/10 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.8, 0.5, 0.8]
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]" />
//       </div>

//       {/* Main Content */}
//       <div className="relative max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12 sm:mb-16 lg:mb-20"
//         >
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
//             Featured In
//             <motion.div
//               className="h-1.5 w-32 sm:w-40 lg:w-48 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500 mx-auto mt-6 rounded-full"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             />
//           </h2>
//         </motion.div>

//         {/* Video Container */}
//         <motion.div
//           style={{ y }}
//           className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8"
//         >
//           <div
//             className="relative aspect-video min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] rounded-2xl lg:rounded-3xl overflow-hidden group"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {/* Status Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg backdrop-blur-sm"
//             >
//               <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
//                 <span className="relative inline-flex rounded-full h-full w-full bg-white" />
//               </span>
//               <span className="text-sm lg:text-base font-medium text-white">
//                 REPLAY
//               </span>
//             </motion.div>

//             {/* Video Thumbnail */}
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-gray-900/60 to-gray-900/90 z-10" />
//             <motion.img
//               src="/assets/images/others/leaders-africa.png"
//               alt="Featured Video"
//               className="w-full h-full object-cover transition-transform duration-700"
//               animate={{
//                 scale: isHovered ? 1.05 : 1
//               }}
//               loading="eager"
//             />

//             {/* Play Button */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center z-20"
//               animate={{
//                 scale: isHovered ? 1.05 : 1
//               }}
//               transition={{ duration: 0.4 }}
//             >
//               <motion.button
//                 onClick={() => setIsModalOpen(true)}
//                 className="group relative"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <div className="absolute -inset-8 lg:-inset-10 rounded-full">
//                   {[0, 0.5, 1].map((delay) => (
//                     <div
//                       key={delay}
//                       className="absolute inset-0 rounded-full bg-sky-500/20"
//                       style={{
//                         animation: `ping 2.5s ease-out infinite ${delay}s`
//                       }}
//                     />
//                   ))}
//                 </div>

//                 <div className="relative w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5 shadow-xl">
//                   <div className="absolute inset-0 rounded-full bg-sky-500 transform group-hover:scale-95 transition-all duration-300" />
//                   <div className="relative h-full w-full flex items-center justify-center">
//                     <motion.div
//                       animate={{
//                         x: isHovered ? 2 : 0,
//                         scale: isHovered ? 1.2 : 1
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <FaPlay className="w-6 h-6 lg:w-10 lg:h-10 text-white ml-1" />
//                     </motion.div>
//                   </div>
//                 </div>
//               </motion.button>
//             </motion.div>

//             {/* Info Overlay */}
//             <motion.div
//               className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 xl:p-10 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent z-20"
//               animate={{
//                 y: isHovered ? 0 : 10,
//                 opacity: isHovered ? 1 : 0.9
//               }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="flex flex-col gap-4 lg:gap-6">
//                 <div className="flex items-center gap-3 text-sky-400 text-sm lg:text-base">
//                   <HiOutlineStatusOnline className="w-4 h-4 lg:w-5 lg:h-5" />
//                   <span>Streamed in South Africa</span>
//                 </div>

//                 <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white leading-tight max-w-4xl">
//                   A Closer Look at the Young Leaders Highlighted in President
//                   Obama's Mandela Lecture
//                 </h3>

//                 <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm lg:text-base">
//                   <div className="flex items-center gap-2">
//                     <HiOutlineClock className="text-sky-500 w-4 h-4 lg:w-5 lg:h-5" />
//                     <span>Aug 15, 2018</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <RiAwardFill className="text-sky-500 w-4 h-4 lg:w-5 lg:h-5" />
//                     <span>Featured Story</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Border Effect */}
//             <motion.div
//               className="absolute inset-0 rounded-2xl lg:rounded-3xl z-10 ring-1 ring-white/10"
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

//       <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </section>
//   );
// };

// export default FeaturedInVideo;

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
