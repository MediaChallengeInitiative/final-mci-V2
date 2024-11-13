"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGlobeAfrica,
  FaNewspaper,
  FaAward,
  FaUserGraduate,
  FaUsers,
  FaBuilding,
  FaChartLine
} from "react-icons/fa";
import { BsFillChatDotsFill, BsRocketTakeoff } from "react-icons/bs";

const stats = [
  {
    icon: FaGlobeAfrica,
    number: "7M+",
    text: "TV Story Reach",
  },
  {
    icon: BsFillChatDotsFill,
    number: "300K+",
    text: "Social Media Impact",
  },
  {
    icon: FaNewspaper,
    number: "220K",
    text: "Weekly Readers",
  },
  {
    icon: FaUsers,
    number: "3000",
    text: "Trained Journalists",
  },
  {
    icon: FaAward,
    number: "180",
    text: "Active Fellows",
  },
  {
    icon: FaChartLine,
    number: "15",
    text: "Excellence Awards",
  },
  {
    icon: FaBuilding,
    number: "135",
    text: "Media Placements",
  },
  {
    icon: FaUserGraduate,
    number: "56",
    text: "Masters Students",
  },
  {
    icon: BsRocketTakeoff,
    number: "10",
    text: "Media Startups",
  }
];

export const ImpactStats: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-10 pb-24 bg-white overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[linear-gradient(rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 right-0 w-1/2 h-1/2 bg-sky-500/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.07, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-sky-600/5 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.07, 0.05, 0.07],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sky-500 text-sm uppercase tracking-wider mb-4 inline-block">
            Impact Metrics
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our Impact in{" "}
            <span className="relative inline-block">
              Numbers
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-sky-500/20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-white border border-sky-100 hover:border-sky-200 
                            shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden text-center">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent opacity-0 
                              group-hover:opacity-100 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="mb-6 inline-block"
                  >
                    <div className="w-16 h-16 rounded-xl bg-sky-50 mx-auto flex items-center justify-center
                                  group-hover:bg-sky-100 transition-colors duration-300">
                      <stat.icon className="w-8 h-8 text-sky-500" />
                    </div>
                  </motion.div>

                  {/* Number & Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-600 text-base font-medium">
                    {stat.text}
                  </p>

                  {/* Bottom Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500/50"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full 
                              transform translate-x-1/2 -translate-y-1/2 blur-2xl 
                              group-hover:bg-sky-500/10 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Minimal Animated Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-sky-400/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </section>
  );
};
