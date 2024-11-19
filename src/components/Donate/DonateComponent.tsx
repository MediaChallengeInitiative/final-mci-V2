"use client";

import React from "react";
import { Heart, ArrowRight, Users, Globe, HandHeart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function DonateComponent() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="/assets/images/auditorium.jpg"
          alt="Background"
          fill
          className="object-cover object-center opacity-5"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </motion.div>

      {/* Grid Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] 
                   bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] 
                   [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"
      />

      <div className="container relative z-20 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center px-6 py-2 mb-6 
                        border border-[#f6931d] rounded-full bg-[#f6931d]/10"
            >
              <Heart className="w-4 h-4 text-[#f6931d] mr-2" />
              <span className="text-[#f6931d] text-sm font-medium">
                Make a Difference Today
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Ready to Make an <span className="text-[#f6931d]">Impact?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Join us in making a lasting impact. Every contribution helps us
              create positive change and build a better future for communities
              worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center items-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-8 py-4 
                         bg-gradient-to-r from-[#f6931d] to-orange-500
                         rounded-xl text-white font-medium 
                         hover:shadow-lg hover:shadow-orange-500/25 
                         transition-all duration-300"
              >
                Donate Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: Users,
                  value: "3000+",
                  label: "Donors",
                  color: "text-blue-600"
                },
                {
                  icon: Globe,
                  value: "30+",
                  label: "Countries",
                  color: "text-orange-500"
                },
                {
                  icon: HandHeart,
                  value: "$2M+",
                  label: "Raised",
                  color: "text-green-600"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100
                           hover:border-[#f6931d]/50 transition-all duration-300"
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-4 mx-auto`} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
