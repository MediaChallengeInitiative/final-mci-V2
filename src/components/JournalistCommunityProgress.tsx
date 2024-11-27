"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

// Wrap the motion.div components that don't change frequently in React.memo to prevent unnecessary re-renders.
const SectionTitle = React.memo(({ title }: { title: string }) => (
  <h2 className="text-3xl lg:text-4xl font-bold text-sky-500 mb-6">
    {title}
    <motion.div
      className="h-1 w-24 bg-gradient-to-r from-sky-500 to-sky-400 mt-2 rounded-full"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </h2>
));

const JournalistCommunityProgress = () => {
  return (
    <section className="relative min-h-screen bg-white py-6 overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {/* How it started */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <SectionTitle title="How it started" />
            <motion.div
              className="relative h-64 md:h-80 mb-6 rounded-xl overflow-hidden group shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image
                src="/assets/images/history/history.png"
                alt="How it started"
                fill
                style={{ objectPosition: "50% 15%" }}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy" // Lazy load image
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-2xl font-semibold text-orange-500 mb-4"
            >
              Our story
            </motion.h3>

            <div className="space-y-4 text-gray-600">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="leading-relaxed"
              >
                <span className="font-semibold text-sky-500">Issue:</span> In
                2012, our co-founder was denied an internship at a television
                station because he "didn't know anyone" there.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="leading-relaxed"
              >
                <span className="font-semibold text-sky-500">Response:</span>{" "}
                Tired by the present quo, he organized a group of journalism
                students to change it. The motivating idea holds that every
                young journalist, regardless of background, deserves an
                internship and an employment opportunity.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="leading-relaxed"
              >
                <span className="font-semibold text-sky-500">
                  The Creative Fix:
                </span>{" "}
                an annual inter-university media challenge, similar to America
                Got Talent, except for journalism students as contestants and
                editors/managers as judges.
              </motion.p>
            </div>
          </motion.div>

          {/* How it is going */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SectionTitle title="How it is going" />
            <motion.div
              className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden group shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
              <Image
                src="/assets/images/community/community.png"
                alt="How it is going"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy" // Lazy load image
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-white text-xl lg:text-4xl font-bold text-center leading-relaxed">
                  A Community of young journalists using journalism to make the
                  world a better place.
                </p>
              </motion.div>

              {/* Decorative corner elements */}
              <motion.div
                className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-white/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-white/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JournalistCommunityProgress;
