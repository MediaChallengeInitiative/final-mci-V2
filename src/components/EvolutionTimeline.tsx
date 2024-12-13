"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface TimelineItem {
  year: string;
  title: string;
  image: string;
  clipPath: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2012",
    title:
      "The first ever inter-university news anchoring and reporting competition in Uganda",
    image: "/assets/images/evolution/2012.jpg",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  },
  {
    year: "2016",
    title:
      "Launched Media Challenge Initiative + Academy to skill young journalists",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% 38%)"
  },
  {
    year: "2018",
    title:
      "A fellowship program skilling market ready graduates passionate about solutions and narrative change",
    image: "/assets/images/evolution/2018.jpg",
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
  },
  {
    year: "2020",
    title:
      "A media incubator hub amplifying media innovation and building media capacity for viability",
    image: "/assets/images/evolution/2020.jpg",
    clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)"
  },
  {
    year: "2023",
    title:
      "The MCI SDGs Media Van taking journalism to hard to reach communities to promote local journalism and fix news deserts",
    image: "/assets/images/evolution/sdg-van.jpg",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
  },
  {
    year: "2024",
    title: "Africa...",
    image: "/assets/images/evolution/africa.jpg",
    clipPath: "circle(50% at 50% 50%)"
  }
];

const TimelineSection = () => {
  return (
    <section className="py-10 bg-gray-900 relative overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-sky-900/50 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-sky-400 mr-2" />
            <span className="text-sky-400 font-medium">Our Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Evolution Through Time
          </h2>
        </div>

        <div className="relative">
          {/* Mobile Scroll View */}
          <div className="md:hidden overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 min-w-max py-20 px-4">
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={index}
                  isMobile={true}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 py-20">
            {timelineItems.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItem {
  year: string;
  title: string;
  image: string;
  clipPath: string;
}

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
  isMobile?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  isMobile = false
}) => {
  return (
    <div className="relative">
      <div
        className={`bg-transparent rounded-2xl ${index % 2 === 0 ? "pt-4 pb-12" : "pt-12 pb-4"}`}
      >
        <div
          className={`bg-transparent absolute left-1/2 transform -translate-x-1/2 
                       text-sky-400 text-2xl px-8 py-2 rounded-full font-bold z-10
                       ${index % 2 === 0 ? "bottom-0 -mb-6" : "top-0 -mt-6"}`}
        >
          {item.year}
        </div>

        <p
          className={`absolute left-1/2 w-full transform -translate-x-1/2 text-orange-400 
                     text-center text-sm leading-tight
                     ${index % 2 === 0 ? "bottom-0 mb-6" : "top-0 mt-6"}`}
        >
          {item.title}
        </p>

        <div
          className={`flex flex-col gap-2 py-16 ${index % 2 === 0 ? "" : "flex-col-reverse"}`}
        >
          <div
            className="relative w-[150px] h-[150px] rounded-xl overflow-hidden"
            style={{ clipPath: item.clipPath }}
          >
            <Image
              width={200}
              height={200}
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
          </div>
        </div>
      </div>

      {!isMobile && index < timelineItems.length - 1 && (
        <div className="hidden xl:block absolute top-1/2 -right-4 transform translate-x-full w-[calc(100%+2rem)] h-0.5 bg-orange-500 z-0">
          <div className="absolute right-0 w-3 h-3 bg-orange-500 transform rotate-45 -translate-y-1/2" />
        </div>
      )}
    </div>
  );
};

export default TimelineSection;
