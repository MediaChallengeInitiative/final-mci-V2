"use client";

import React from "react";
import { motion } from "framer-motion";
import { BiDonateHeart } from "react-icons/bi";
import { ArrowRight } from "lucide-react";

export default function DonateComponent() {
  return (
    <section className="relative h-auto bg-[#f6931d] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 overflow-hidden">
      <div className="relative max-w-[95rem] mx-auto w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full"
          >
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white whitespace-nowrap">
              DONATE
            </h1>
            <div className="w-full max-w-[200px] xs:max-w-[250px] sm:max-w-[300px] flex justify-center">
              <BiDonateHeart className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white" />
            </div>
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white whitespace-nowrap">
              TODAY
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center mx-auto max-w-4xl leading-relaxed"
          >
            Support the next generation of journalists, content creators, and
            story leaders. Your investment will not only safeguard media,
            democracy, and development in Africa but will also empower a new era
            of informed and engaged citizens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center pt-4 sm:pt-6 md:pt-8 lg:pt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden bg-white text-[#f6931d] 
                       px-6 xs:px-8 sm:px-10 md:px-12 
                       py-3 xs:py-3.5 sm:py-4 md:py-5
                       text-2xl xs:text-3xl sm:text-4xl md:text-5xl uppercase 
                       rounded-lg xs:rounded-xl
                       font-extrabold shadow-lg shadow-orange-700/20
                       hover:shadow-xl hover:shadow-orange-700/30 transition-all duration-300
                       border-2 border-white/50 hover:border-white
                       before:absolute before:inset-0 before:bg-gradient-to-r 
                       before:from-white/0 before:via-white/50 before:to-white/0
                       before:translate-x-[-200%] hover:before:translate-x-[200%] 
                       before:transition-transform before:duration-1000
                       focus:outline-none focus:ring-2 focus:ring-white 
                       focus:ring-offset-2 focus:ring-offset-[#f6931d]"
            >
              <span className="relative flex items-center gap-2 xs:gap-3">
                Donate
                <ArrowRight
                  className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 
                                    group-hover:translate-x-2 transition-transform duration-300"
                />
              </span>
              <div
                className="absolute inset-0 border-4 border-white/0 rounded-xl 
                            group-hover:border-white/20 transition-all duration-300"
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
