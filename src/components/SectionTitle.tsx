"use client";

import React from "react";
import { motion } from "framer-motion";

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="text-sky-500">{title}</span>
    </h2>
    <p className="text-lg text-gray-400 mt-4">{subtitle}</p>
    <motion.div
      className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </motion.div>
);

export default SectionTitle;
