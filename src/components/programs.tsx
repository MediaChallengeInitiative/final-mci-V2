import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThematicData } from "@/interface/interface";
import { getAllThematicAreas } from "@/utils/get-all-thematic-areas";
import { urlFor } from "@/lib/sanity";

export default async function Programs() {
  const thematicData: ThematicData[] = await getAllThematicAreas();
  return (
    <>
      <div className="paralax-container mx-auto rounded-lg lg:py-40 lg:my-12 py-60 relative overflow-hidden before:absolute before:content-[''] before:inset-0 before:bg-dark-base before:bg-opacity-30 before:z-1">
        <div className="jarallax absolute inset-0" data-jarallax="">
          <Image
            width={300}
            height={300}
            className="jarallax-img w-full h-full object-cover"
            src="/assets/images/parallax-bg.jpg"
            alt="placeholder"
          />
        </div>
      </div>
    </>
  );
}
