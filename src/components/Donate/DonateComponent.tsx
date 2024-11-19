"use client";

import React from "react";
import { motion } from "framer-motion";
import { BiDonateHeart } from "react-icons/bi";
import { ArrowRight } from "lucide-react";

export default function DonateComponent() {
  return (
    <section className="h-auto bg-[#f6931d] flex flex-col items-center justify-center px-2 md:px-4 py-12">
      <div className="max-w-9xl mx-auto w-full">
        <div className="space-y-4 w-full px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full"
          >
            <h1 className="text-8xl md:text-9xl font-extrabold text-white whitespace-nowrap">
              DONATE
            </h1>
            <div className="w-full max-w-[300px] flex justify-center">
              <BiDonateHeart className="text-8xl md:text-9xl text-white" />
            </div>
            <h1 className="text-8xl md:text-9xl font-extrabold text-white whitespace-nowrap">
              TODAY
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-white text-center mx-auto max-w-4xl"
          >
            Support the next generation of journalists, content creators, and
            story leaders. Your investment will not only safeguard media,
            democracy, and development in Africa but will also empower a new era
            of informed and engaged citizens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden bg-white text-[#f6931d] px-12 py-4 text-4xl uppercase 
                       rounded-xl font-extrabold shadow-lg shadow-orange-700/20
                       hover:shadow-xl hover:shadow-orange-700/30 transition-all duration-300
                       border-2 border-white/50 hover:border-white
                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/50 before:to-white/0
                       before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f6931d]"
            >
              <span className="relative flex items-center gap-3">
                Donate
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 border-4 border-white/0 rounded-xl group-hover:border-white/20 transition-all duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}