"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Statistic {
  number: string;
  text: string;
}

export const impactStats: Statistic[] = [
  {
    number: "180",
    text: "fellows since 2018"
  },
  {
    number: "10",
    text: "youth media start-ups"
  },
  {
    number: "135",
    text: "alumni employed in media"
  },
  {
    number: "3000",
    text: "young journalists trained since 2017"
  }
];

interface ImpactCardProps extends Statistic {
  delay: number;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ number, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="relative p-8 bg-transparent"
  >
    <div className="flex flex-col items-center text-center">
      <motion.h3
        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-sky-500 font-display tracking-tight mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {number}
      </motion.h3>
      <p className="text-xl md:text-2xl lg:text-3xl font-medium text-sky-500">
        {text}
      </p>
    </div>
  </motion.div>
);

export const ImpactSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-white to-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-sky-500">Our Impact</span>
            <motion.div
              className="h-1.5 w-24 bg-white mx-auto mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="text-sky-500 text-xl md:text-2xl max-w-3xl mx-auto">
            Transforming journalism through education, innovation, and
            excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {impactStats.map((stat, index) => (
            <ImpactCard key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/who-we-are/impact">
            <Button className="bg-white text-sky-500 px-10 py-6 text-xl rounded-full font-bold">
              Explore Our Full Impact
            </Button>
          </Link>
        </div>
      </div>

      {/* Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </section>
  );
};

export default ImpactSection;
