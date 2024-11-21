import React from "react";
import Image from "next/image";

interface BreadcrumbProps {
  title: string;
}

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <>
      <div className="w-full mx-auto relative lg:h-[280px] h-[140px] flex items-center justify-center">
        <Image
          className="w-full h-full object-cover"
          src="/assets/images/breadcrumb-bg.jpg"
          width="600"
          height={600}
          alt="breadcrumb image"
        />
        <div className="bg-transparent w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="flex items-center justify-center w-full h-full">
            <h1 className="font-bold mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
