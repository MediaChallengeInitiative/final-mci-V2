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
import { RiAwardFill, RiPlayCircleLine } from "react-icons/ri";
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

    useEffect(() => {
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };

      if (isOpen) {
        window.addEventListener("keydown", handleEscKey);
      }
      return () => window.removeEventListener("keydown", handleEscKey);
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-md"
            onClick={handleClose}
          />
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-[95vw] xs:max-w-[90vw] sm:max-w-[85vw] lg:max-w-6xl 2xl:max-w-7xl aspect-video rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-900 shadow-2xl"
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

              <motion.button
                onClick={handleClose}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-[60] group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-1.5 xs:p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <HiX className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white transform transition-transform group-hover:rotate-90 duration-300" />
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

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/others/pattern-bg.jpg')] bg-cover bg-center bg-fixed opacity-10"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="absolute inset-0 bg-black/20" />

      {/* Content Container */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Floating Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured In
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-sky-500 to-sky-400 mx-auto mt-4 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our impact through media coverage
          </p>
        </motion.div>

        {/* Video Container - Centered with reduced width */}
        <motion.div style={{ y }} className="relative w-full max-w-4xl mx-auto">
          <motion.div
            className="relative rounded-xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative aspect-video">
              {/* Video Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-gray-900/60 to-gray-900/90 z-10"
                animate={{
                  opacity: isHovered ? 0.4 : 0.6
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Video Thumbnail */}
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
                {/* Desktop Play Button */}
                <div className="hidden sm:block relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                  <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-ping" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5 shadow-lg">
                    <div className="h-full w-full rounded-full bg-sky-500 flex items-center justify-center group-hover:bg-sky-600 transition-all duration-300">
                      <motion.div
                        animate={{ x: isHovered ? 2 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaPlay className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white ml-1" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Mobile Play Button */}
                <div className="sm:hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <RiPlayCircleLine className="w-16 h-16 text-white/90 drop-shadow-lg" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Video Info */}
              <div className="absolute z-20 inset-x-0 bottom-0">
                {/* Mobile Info (Always Visible) */}
                <div className="sm:hidden px-3 py-4 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HiOutlineStatusOnline className="w-4 h-4 text-sky-400" />
                      <span className="text-sm text-white/90">
                        Live from SA
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs">
                      HD
                    </span>
                  </div>
                </div>

                {/* Desktop Info */}
                <motion.div
                  className="hidden sm:block absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent"
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
                      <div className="ml-auto flex gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs">
                          HD
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs">
                          CC
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-2 left-2 xs:top-3 xs:left-3 sm:top-4 sm:left-4 z-20"
              >
                <div className="flex items-center gap-1 xs:gap-1.5">
                  {/* Live Badge */}
                  <div className="flex items-center gap-1 px-2 py-1 xs:px-2.5 xs:py-1.5 rounded-full bg-red-500 shadow-lg backdrop-blur-sm">
                    <span className="relative flex h-1 w-1 xs:h-1.5 xs:w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-full w-full bg-white" />
                    </span>
                    <span className="text-[10px] xs:text-xs font-medium text-white">
                      REPLAY
                    </span>
                  </div>
                  {/* Featured Badge - Hidden on Mobile */}
                  <div className="hidden xs:flex items-center px-2 py-1 xs:px-2.5 xs:py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                    <span className="text-[10px] xs:text-xs font-medium text-white">
                      Featured
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default FeaturedInVideo;