import React from "react";
import Image from "next/image";

interface ModelProps {
  title: string;
  image: string;
  bgColor: string;
}

const modelsData: ModelProps[] = [
  {
    title: "Shifting narratives, shaping culture",
    image: "/assets/images/models/narratives.png",
    bgColor: "bg-[#f28c28]"
  },
  {
    title: "Space for incubating media innovations",
    image: "/assets/images/models/innovations.png",
    bgColor: "bg-[#3cb371]"
  },
  {
    title: "Skilling the next-generation of journalists",
    image: "/assets/images/models/skilling.png",
    bgColor: "bg-[#e63946]"
  },
  {
    title: "Strengthening media coverage of development",
    image: "/assets/images/models/media.png",
    bgColor: "bg-[#ff69b4]"
  },
  {
    title: "Safeguarding the information ecosystem",
    image: "/assets/images/models/information.png",
    bgColor: "bg-[#4682b4]"
  },
  {
    title: "Stabilising local + rural journalism",
    image: "/assets/images/models/journalism.png",
    bgColor: "bg-[#6a0dad]"
  }
];

export default function OurModel() {
  return (
    <>
      <section className="bg-white">
        <div className="space-y-4 text-center pt-8">
          <h2 className="text-4xl font-bold tracking-tight text-[#0097d1] lg:text-6xl">
            Our 6.S Model
          </h2>
          <span className="mt-10 pt-6 text-lg leading-8 text-[#0097d1] text-justify italic">
            A holistic approach addressing systemic media crises.
          </span>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {modelsData.map((data: any, i: number) => (
              <div
                className={`flex flex-col items-center justify-center p-4 text-center ${data.bgColor} text-white border-gray-300 group-hover:border-orange-500 transition-colors duration-300`}
              >
                <Image width={300} height={300} src={data.image} alt="image" />
                <p className="text-lg font-semibold">{data.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
