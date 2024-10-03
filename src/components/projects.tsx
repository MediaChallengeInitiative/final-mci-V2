"use client";

import React from "react";

export default function Projects() {
  return (
    <section className="w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full relative overflow-hidden h-[100%]">
            <iframe
              src="https://www.youtube.com/embed/YKRoK42PNi8?autoplay=1&loop=1&mute=1&controls=0&showinfo=1&modestbranding=1&playsinline=1&rel=0&fs=0&playlist=YKRoK42PNi8"
              title="YouTube video player"
              allow="accelerometer; autoplay; loop; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // className="absolute top-0 left-0 w-full h-full"
              className="absolute top-0 left-0 w-full h-full object-cover transform lg:scale-[1.25] scale-[4.25]"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
