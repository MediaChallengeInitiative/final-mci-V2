import React from "react";
import Image from "next/image";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  imageSrc: string;
}

const timelineData: TimelineEvent[] = [
  {
    year: "2012",
    title:
      "The first ever inter-university news anchoring and reporting competition in Uganda",
    description:
      "Launched Media Challenge Initiative + Academy to skill young journalists",
    imageSrc: "/assets/images/alumni-impact.png"
  },
  {
    year: "2016",
    title: "",
    description:
      "Launched Media Challenge Initiative + Academy to skill young journalists",
    imageSrc: "/assets/images/alumni-impact.png"
  },
  {
    year: "2018",
    title:
      "A fellowship program skilling market graduates passionate about solutions and narrative change",
    description: "",
    imageSrc: "/assets/images/alumni-impact.png"
  },
  {
    year: "2020",
    title:
      "A media incubator hub amplifying media innovation and building media capacity for viability",
    description: "",
    imageSrc: "/assets/images/alumni-impact.png"
  },
  {
    year: "2023",
    title:
      "The MCI SDGs Media Van taking journalism to hard to reach communities to promote local journalism and fix news deserts",
    description: "",
    imageSrc: "/assets/images/alumni-impact.png"
  },
  {
    year: "2024",
    title: "Africa...",
    description: "",
    imageSrc: "/assets/images/alumni-impact.png"
  }
];

const EvolutionTimeline: React.FC = () => {
  const getClipPath = (index: number) => {
    switch (index) {
      case 0:
        return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      case 1:
        return "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)";
      case 2:
        return "circle(50% at 50% 50%)";
      case 3:
        return "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)";
      case 4:
        return "circle(50% at 50% 50%)";
      case 5:
        return "circle(91.0% at 91% 91%)";
      default:
        return "none";
    }
  };

  return (
    <section className="w-full bg-white">
      <h2 className="text-4xl tracking-tight lg:text-6xl sm:text-3xl md:text-4xl font-bold text-white bg-orange-400 py-2 lg:py-4 md:py-2 px-4 sm:px-6 md:px-8 mb-4 lg:mb-6 md:mb-8 text-center">
        The Evolution
      </h2>
      <div className="w-full">
        <Image
          width={800}
          height={500}
          className="w-full h-auto block"
          src="/assets/images/evolution/e1.png"
          alt="Evolution Time"
        />
      </div>
    </section>
  );
};

export default EvolutionTimeline;
