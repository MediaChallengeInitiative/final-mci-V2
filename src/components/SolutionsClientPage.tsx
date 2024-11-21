"use client";

import React from "react";
import { SolutionCard } from "./SolutionCard";
import { SolutionInterface } from "@/interface/interface";

interface SolutionsClientPageProps {
  solutions: SolutionInterface[];
}

export default function SolutionsClientPage({
  solutions
}: SolutionsClientPageProps) {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      <div className="w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index: number) => (
            <SolutionCard key={index} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
