import Blog from "@/components/blog";
import Hero from "@/components/hero";
import InnovatorsSpotlight from "@/components/innovators-spotlight";
import StorySection from "@/components/JournalistCommunityProgress";
import MediaCrisisComponent from "@/components/challenge/ChallengeSection";
import Partners from "@/components/partners";
import Projects from "@/components/projects";
import ScrollBar from "@/components/scroll-bar";
import Subscribe from "@/components/subscribe";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import Image from "next/image";
import PartnerLogos from "@/components/PartnerLogos";
import { getAllAlumniWorkLogos } from "@/utils/whereAlumniWork";
import MCIAlumniSpotlight from "@/components/MCIAlumniSpotlight";
import { getAlumniData } from "@/utils/get-all-alumni";
import { ImpactSection } from "@/components/ImpactSection";
import TimelineSection from "@/components/EvolutionTimeline";
import DonateComponent from "@/components/Donate/DonateComponent";
import SolutionsClientPage from "@/components/solutions/SolutionsClientPage";
import TestimonialSection from "@/components/testimonial";
import { getSolutions } from "@/lib/api/solutions";
import FeaturedInVideo from "@/components/featured-in-video";
import HomeWrapper from "@/components/HomeWrapper";
import React, { Suspense } from "react";

// import { ApplicationWrapper } from "@/components/ApplicationWrapper";
// import { ApplicationSection } from "@/components/ApplicationSection";

export default async function Home() {
  const alumniLogos = await getAllAlumniWorkLogos();
  const alumni = await getAlumniData();
  // const solutions = await getAllSolutions();
  const solutionsResponse = await getSolutions({
    per_page: 6,
    page: 1,
    with_media: true
  });

  // Extract the solutions array from the response
  const solutions = solutionsResponse.data;

  return (
    <Suspense>
    <HomeWrapper>
      <React.Fragment>
        <main className="bg-white">
          {/* <ApplicationWrapper /> */}
          <Hero />
          <ScrollBar />
          <StorySection />
          <TimelineSection />
          {/* <ApplicationSection /> */}
          <ImpactSection />
          <MCIAlumniSpotlight alumni={alumni} />
          <PartnerLogos logos={alumniLogos} />
          <MediaCrisisComponent />
          <SolutionsClientPage initialSolutions={solutionsResponse.data} />
          <DonateComponent />
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
          <TestimonialSection />
          <UpcomingEventsSection />
          <Subscribe />
          <Partners />
        </main>
      </React.Fragment>
    </HomeWrapper>
    </Suspense>
  );
}
