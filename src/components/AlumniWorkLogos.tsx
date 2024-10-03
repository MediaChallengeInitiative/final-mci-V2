import React from "react";
import Image from "next/image";

export default function AlumniWorkLogos() {
  return (
    <>
      <div className="w-full bg-white">
        <Image
          width={800}
          height={500}
          className="w-full h-auto block"
          src="/assets/images/where-alumni-work.png"
          alt="Media Challenge Fellowship 2024"
        />
      </div>
    </>
  );
}
