"use client";

import React from "react";
import { ImpactHero } from "@/components/ImpactHero";
import { ImpactGallery } from "@/components/ImpactGallery";
import { SuccessStories } from "@/components/SuccessStories";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { ImpactStats } from "@/components/ImpactStats";

const galleryItems = [
  {
    title: "Global Journalism Summit",
    description: "Annual gathering of media professionals and thought leaders",
    image: "/assets/images/others/leaders-africa.png",
    category: "Events"
  },
  {
    title: "Digital Innovation Lab",
    description: "Exploring cutting-edge storytelling technologies",
    image: "/assets/images/others/leaders-africa.png",
    category: "Innovation"
  },
  {
    title: "Community Outreach",
    description: "Making impact in local communities through journalism",
    image: "/assets/images/others/leaders-africa.png",
    category: "Community"
  }
];

const successStories = [
  {
    name: "Sarah Johnson",
    role: "Investigative Journalist",
    story: "Led an award-winning investigation into environmental issues",
    achievement: "Winner of Environmental Reporting Award 2023",
    image: "/assets/images/others/leaders-africa.png"
  },
  {
    name: "Michael Chen",
    role: "Digital Media Entrepreneur",
    story: "Founded a successful digital news platform focused on youth issues",
    achievement: "Featured in Forbes 30 Under 30",
    image: "/assets/images/others/leaders-africa.png"
  }
];

const Page: React.FC = () => {
  return (
    <div className="relative">
      <ImpactHero />

      <div className="relative bg-gradient-to-br from-sky-50 to-orange-50">
        <DecorativeShapes />

        <div className="relative z-10">
          <ImpactStats />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Impact Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-20 "
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Impact in Action
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Witness the tangible results of our programs and initiatives
              </p>
              <ImpactGallery items={galleryItems} />
            </motion.div>

            {/* Success Stories */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Meet the journalists who are making a difference
              </p>
              <SuccessStories stories={successStories} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
