"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Quote, ArrowUpRight, Share2 } from "lucide-react";
import { SuccessStory } from "@/interface/impact";

interface SuccessStoriesProps {
  stories: SuccessStory[];
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ stories }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {stories.map((story, index) => (
        <motion.div
          key={index}
          variants={item}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-500/10 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16" />

          <div className="relative">
            {/* Image Section with Overlay */}
            <div className="relative h-64 md:h-72 overflow-hidden">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Role Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-lg">
                <span className="text-sm font-medium text-sky-500">
                  {story.role}
                </span>
              </div>

              {/* Achievement Badge */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">{story.achievement}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8">
              {/* Name and Quote */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                  {story.name}
                </h3>
                <Quote className="w-8 h-8 text-orange-500 opacity-50" />
              </div>

              {/* Story Text */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {story.story}
              </p>

              {/* Interactive Elements */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-sky-500 font-medium hover:text-sky-600 transition-colors"
                >
                  Read Full Story
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Hover Effect Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-orange-500"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Optional: Add a filter/category system
export const StoriesFilter: React.FC<{
  categories: string[];
  onFilter: (cat: string) => void;
}> = ({ categories, onFilter }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg text-sky-500 font-medium transition-all"
          onClick={() => onFilter(cat)}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
};
