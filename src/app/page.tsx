import Blog from "@/components/blog";
import EvolutionTimeline from "@/components/EvolutionTimeline";
import FeaturedInVideo from "@/components/featured-in-video";
import Hero from "@/components/hero";
import InnovatorsSpotlight from "@/components/innovators-spotlight";
import StorySection from "@/components/JournalistCommunityProgress";
import MediaCrisisComponent from "@/components/ChallengeSection";
import OurModel from "@/components/OurModel";
import Partners from "@/components/partners";
import Projects from "@/components/projects";
import ScrollBar from "@/components/scroll-bar";
import Subscribe from "@/components/subscribe";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import Image from "next/image";
import React from "react";
import PartnerLogos from "@/components/PartnerLogos";
import { getAllAlumniWorkLogos } from "@/utils/whereAlumniWork";
import MCIAlumniSpotlight from "@/components/MCIAlumniSpotlight";
import { getAlumniData } from "@/utils/get-all-alumni";
import { ImpactSection } from "@/components/ImpactSection";
import TimelineSection from "@/components/EvolutionTimeline";

export default async function Home() {
  const alumniLogos = await getAllAlumniWorkLogos();
  const alumni = await getAlumniData();
  return (
    <React.Fragment>
      <main className="bg-white">
        <Hero />
        <ScrollBar />
        <StorySection />
        {/* <EvolutionTimeline /> */}
        <TimelineSection />
        <ImpactSection />
        <MCIAlumniSpotlight alumni={alumni} />
        <PartnerLogos logos={alumniLogos} />
        <MediaCrisisComponent />
        <OurModel />
        <FeaturedInVideo />
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
        <UpcomingEventsSection />
        <Subscribe />
        <Partners />
      </main>
    </React.Fragment>
  );
}
