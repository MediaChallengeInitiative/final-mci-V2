"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye, Share2, Calendar, MapPin } from "lucide-react";
import { ImpactGalleryItem } from "@/interface/impact";

interface ImpactGalleryProps {
  items: ImpactGalleryItem[];
}

export const ImpactGallery: React.FC<ImpactGalleryProps> = ({ items }) => {
  const [, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category.toLowerCase()))
    );
    return ["all", ...uniqueCategories];
  }, [items]);

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          selectedCategory === "all" ||
          item.category.toLowerCase() === selectedCategory
      ),
    [items, selectedCategory]
  );

  return (
    <div className="bg-gray-900 rounded-3xl px-8 py-12 space-y-8">
      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                selectedCategory === category
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-gray-800 text-gray-300 hover:bg-sky-900 hover:text-sky-400"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="wait">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative rounded-2xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-800/20 backdrop-blur-sm hover:bg-gray-800/30 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-800/20 backdrop-blur-sm hover:bg-gray-800/30 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-1 rounded-full bg-sky-500/90 backdrop-blur-sm"
                  >
                    <span className="text-xs font-medium text-white">
                      {item.category}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-3 text-gray-300">
                    {item.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">{item.date}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs">{item.location}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>

                  {/* Read More Link */}
                  <motion.button
                    className="mt-4 flex items-center gap-2 text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-300 text-lg">
            No items found for this category.
          </p>
        </motion.div>
      )}
    </div>
  );
};
