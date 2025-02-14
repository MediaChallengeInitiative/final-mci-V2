import React from "react";
import { motion } from "framer-motion";
import { Solution } from "@/types/solution";

interface LeadingAssumptionProps {
  initialData: Solution;
}

const LeadingAssumptionSection: React.FC<LeadingAssumptionProps> = ({
  initialData
}) => {
  const { leading_assumption, bg_color_from, bg_color_to } = initialData;

  return (
    <section
      id="assumption"
      className="relative w-full h-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-20 flex items-center overflow-hidden bg-gray-900"
    >
      {/* Background Effects - Responsive blur and opacity adjustments */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(45deg, ${bg_color_from}20, ${bg_color_to}20)`,
              `linear-gradient(225deg, ${bg_color_from}20, ${bg_color_to}20)`
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div className="absolute inset-0 backdrop-blur-2xl md:backdrop-blur-3xl" />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-[280px] xs:max-w-[350px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          {/* Top Border - Responsive height */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="h-[10px] sm:h-[15px] md:h-[20px] bg-white mb-4 sm:mb-6 md:mb-8 lg:mb-10"
          />

          {/* Grid Layout - Responsive columns and spacing */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
          >
            {/* Title Section - Responsive text sizes */}
            <div className="md:col-span-4 mb-4 md:mb-0">
              <motion.h2
                className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white leading-tight"
                style={{
                  background: `linear-gradient(to right, ${bg_color_from}, ${bg_color_to})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Assumption
              </motion.h2>
            </div>

            {/* Content Section - Responsive padding and text sizes */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-8 flex flex-col space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div className="relative">
                {/* Glow Effect - Responsive blur */}
                <div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-20 blur-xl md:blur-2xl"
                  style={{
                    background: `linear-gradient(45deg, ${bg_color_from}, ${bg_color_to})`
                  }}
                />
                {/* Content Box - Responsive padding and border radius */}
                <div className="relative rounded-2xl md:rounded-3xl bg-black/40 backdrop-blur-xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 border border-white/10">
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl text-white/90 font-medium leading-relaxed">
                    {leading_assumption}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements - Responsive positioning and sizes */}
      <motion.div
        className="absolute -bottom-20 -left-20 sm:-bottom-30 sm:-left-30 md:-bottom-40 md:-left-40 
                   w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 blur-2xl md:blur-3xl rounded-full opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ backgroundColor: bg_color_from }}
      />
      <motion.div
        className="absolute -top-20 -right-20 sm:-top-30 sm:-right-30 md:-top-40 md:-right-40 
                   w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 blur-2xl md:blur-3xl rounded-full opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 4
        }}
        style={{ backgroundColor: bg_color_to }}
      />
    </section>
  );
};

export default LeadingAssumptionSection;
