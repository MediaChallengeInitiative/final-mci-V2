'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Assuming you have this utility from shadcn/ui

type TimelinePoint = {
  year: number;
  title: string;
  description: string;
  icon: string;
};

const timelinePoints: TimelinePoint[] = [
  {
    year: 2012,
    title: "The Beginning",
    description: "The first ever inter-university news anchoring and reporting competition in Uganda.",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2016,
    title: "Growth & Impact",
    description: "Launched Media Challenge Initiative + Academy to skill young journalists",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2018,
    title: "Community Expansion",
    description: "A Fellowship program skilling market ready graduates passionate about solutions and narrative change.",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2020,
    title: "International Partnership",
    description: "A media incubator hub amplifying media innovation and building media capacity for viability.",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2023,
    title: "Media Van Initiative",
    description: "The MCI SDGs Media Van taking journalism to hard to reach communities to promote local journalism and fix news deserts",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2024,
    title: "Switch Africa",
    description: "An AI-driven New Aggregator Mobile App with Virtual Newsrooms.",
    icon: "/assets/images/africa.jpg"
  }
];

const HistoryPageTabs = () => {
  const [activeYear, setActiveYear] = useState(timelinePoints[0].year);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 grid grid-cols-1">        
        {/* Tabs Navigation */}
        <div className="flex flex-wrap flex-row justify-center gap-2 mb-12">
          {timelinePoints.map((point) => (
            <button
              key={point.year}
              onClick={() => setActiveYear(point.year)}
              className={cn(
                "px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300",
                activeYear === point.year
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {point.year}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {timelinePoints.map((point) => (
            <div
              key={point.year}
              className={cn(
                "transition-all duration-500 transform",
                activeYear === point.year
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 hidden"
              )}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={point.icon}
                    alt={point.title}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-red-500">
                      {point.year}
                    </h3>
                    <h4 className="text-2xl font-semibold text-gray-800">
                      {point.title}
                    </h4>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                  <div className="pt-4">
                    <button className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                      Learn More
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPageTabs;