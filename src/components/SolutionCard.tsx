"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { SolutionInterface } from "@/interface/interface";
import {
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaHandHoldingHeart,
  FaChartLine
} from "react-icons/fa";
import { IconType } from "react-icons";

const iconComponents: Record<string, IconType> = {
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaHandHoldingHeart,
  FaChartLine
};

interface SolutionCardProps {
  solution: SolutionInterface;
  index: number;
}

const getPlainText = (blocks: any[] = []) => {
  return blocks
    ?.map((block) => {
      if (block?._type !== "block" || !block?.children) return "";
      return block.children.map((child: any) => child?.text || "").join("");
    })
    .join(" ");
};

export const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  index
}) => {
  const IconComponent = solution.iconName
    ? iconComponents[solution.iconName]
    : null;
  const iconSize = solution.iconSize || 24;
  const plainSolution =
    typeof solution.solution === "string"
      ? solution.solution
      : getPlainText(solution.solution);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <Link href={`/solutions/${solution.slug.current}`}>
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[${solution.bgColorFrom}] to-[${solution.bgColorTo}]/90 opacity-90 group-hover:opacity-95 transition-opacity duration-500`}
        />
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={urlFor(solution.icon || solution.coverImage).url()}
            alt={solution.title}
            width={400}
            height={400}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            {IconComponent && (
              <IconComponent className="text-white" size={iconSize} />
            )}
          </div>
        </div>
        {/* Content overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/30 to-transparent">
          <div className="relative transform group-hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-xl font-bold text-white mb-2">
              {solution.title}
            </h3>
            <p className="text-white/80 text-sm transform opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
              {plainSolution}
            </p>
          </div>
        </div>
        {/* Animated border */}
        <div className="absolute inset-0 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />{" "}
      </Link>
    </motion.div>
  );
};
