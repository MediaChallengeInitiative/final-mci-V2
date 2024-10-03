import About from "@/components/about";
import AlumniWorkLogos from "@/components/AlumniWorkLogos";
import Blog from "@/components/blog";
import CircleImpact from "@/components/CircleImpact";
import EvolutionTimeline from "@/components/EvolutionTimeline";
import FeaturedInVideo from "@/components/featured-in-video";
import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import HowItStarted from "@/components/HowItStarted";
import ImpactSection from "@/components/ImpactSection";
import InnovatorsSpotlight from "@/components/innovators-spotlight";
import JournalistCommunityProgress from "@/components/JournalistCommunityProgress";
import MediaCrisisComponent from "@/components/MediaCrisisComponent";
import OurModel from "@/components/OurModel";
import Partners from "@/components/partners";
import Programs from "@/components/programs";
import Projects from "@/components/projects";
import ScrollBar from "@/components/scroll-bar";
import SolutionSection from "@/components/SolutionSection";
import Subscribe from "@/components/subscribe";
import TestimonialSection from "@/components/testimonial";
import Vision from "@/components/vision";
import WhatWeDo from "@/components/what-we-do";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <main className="bg-white">
        <Hero />
        <ScrollBar />
        {/* <Vision /> */}
        {/* <HowItStarted /> */}
        <JournalistCommunityProgress />
        {/* <WhatWeDo /> */}
        <EvolutionTimeline />
        <ImpactSection />
        <div className="w-full">
          <Image
            width={800}
            height={500}
            className="w-full h-auto block"
            src="/assets/images/alumni-impact.png"
            alt="Media Challenge Fellowship 2024"
          />
        </div>
        <AlumniWorkLogos />
        <MediaCrisisComponent />
        <SolutionSection />
        <OurModel />
        <FeaturedInVideo />
        {/* <CircleImpact /> */}
        {/* <Programs /> */}
        <div className="w-full">
          <Image
            width={800}
            height={500}
            className="w-full h-auto block"
            src="/assets/images/fellowship/poster-updated.webp"
            alt="Media Challenge Fellowship 2024"
          />
        </div>
        <Projects />
        <Blog />
        <InnovatorsSpotlight />
        <TestimonialSection />
        <Subscribe />
        <Partners />
      </main>
    </React.Fragment>
  );
}
