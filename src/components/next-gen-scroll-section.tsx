"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getNextGenStages } from "@/utils/get-next-gen-stages";
import { NextGenCycle } from "@/interface/interface";
import NextGenData from "./NextGenData";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

gsap.registerPlugin(useGSAP);

export default function NextGenScrollSection() {
  const [nextData, setNextData] = useState<NextGenCycle[]>([]);

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  // const horizontalSectionRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const fetchedData = async () => {
      const res = await getNextGenStages();
      setNextData(res);
    };
    fetchedData();
  }, []);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-55vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "2000px top",
          // scrub: 0.6,
          // pin: true
          pin: triggerRef.current,
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <>
      {/* <section className="scroll-section-outter">
        <div ref={triggerRef}>
          <div ref={sectionRef} className="scroll-section-inner">
            {nextData.map((data, i: number) => (
              <NextGenData
                stage={data.stage}
                image={data.image}
                description={data.description}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* horizontal scroll */}
      <section ref={triggerRef} id="horizontal-scoll">
        <div className="horizontal-scoll-wrapper">
          <div ref={sectionRef} className="horizontal">
            {nextData.map((data, i: number) => (
              <NextGenData
                stage={data.stage}
                image={data.image}
                description={data.description}
              />
            ))}
          </div>
        </div>
      </section>
      {/* horizontal scroll end */}
    </>
  );
}
