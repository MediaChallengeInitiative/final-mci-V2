import React from "react";
import { FaHeart, FaAward, FaUsers, FaChurch } from "react-icons/fa";

type TimelinePoint = {
  year: number;
  title: string;
  description: string;
  icon: string;
};

const timelinePoints: TimelinePoint[] = [
  {
    year: 2012,
    title: "The Beginning",
    description:
      "The first ever inter-university news anchoring and reporting competition in Uganda.",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2016,
    title: "Growth & Impact",
    description:
      "Launched Media Challenge Initiative + Academy to skill young journalists",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2018,
    title: "Community Expansion",
    description:
      "A Fellowship program skilling market ready graduates passionate about solutions and narrative change.",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2020,
    title: "International Partnership",
    description:
      "A media incubator hub amplifying media innovation and building media capacity for viability.",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2020,
    title: "International Partnership",
    description:
      "The MCI SDGs Media Van taking journalism to hard to reach communities to promote local journalism and fix news deserts",
    icon: "/assets/images/anchor.jpg"
  },
  {
    year: 2024,
    title: "Switch Africa",
    description:
      "An AI-driven New Aggregator Mobile App with Virtual Newsrooms.",
    icon: "/assets/images/africa.jpg"
  }
];

const HistoryPage: React.FC = () => {
  const renderIcon = (icon: string, index: number) => {
    const colorClasses = [
      "text-red-500",
      "text-blue-500",
      "text-green-500",
      "text-purple-500"
    ];
    const colorClass = colorClasses[index % colorClasses.length];

    switch (icon) {
      case "heart":
        return <FaHeart className={colorClass} />;
      case "award":
        return <FaAward className={colorClass} />;
      case "users":
        return <FaUsers className={colorClass} />;
      case "church":
        return <FaChurch className={colorClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline Points */}
          <div className="space-y-24">
            {timelinePoints.map((point, index) => (
              <div
                key={point.year}
                className={`flex items-center py-24 mt-36 relative ${index % 2 === 0 ? "timeline-point animate-slideUp" : ""}`}
              >
                {index % 2 === 0 ? (
                  <>
                    {/* Odd iteration: Content on the left, icon in the center */}
                    <div className="w-3/4 md:pr-64 text-right">
                      <div className="space-y-36">
                        <div>
                          <span className="text-4xl font-bold text-red-500">
                            {point.year}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {point.title}
                          </h3>
                          <p className="text-gray-600">{point.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                      <div className="w-72 h-72 rounded-full bg-white shadow-lg flex items-center justify-center">
                        {/* {renderIcon(point.icon, index)} */}
                        <img
                          src={point.icon}
                          alt={`${point.title} icon`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="w-1/2"></div>
                  </>
                ) : (
                  <>
                    {/* Even iteration: Content on the right, icon in the center */}
                    <div className="w-1/2"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-72 h-72 rounded-full bg-white shadow-lg flex items-center justify-center">
                        {/* {renderIcon(point.icon, index)} */}
                        <img
                          src={point.icon}
                          alt={`${point.title} icon`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="w-3/4 md:pl-64">
                      <div className="space-y-36">
                        <div>
                          <span className="text-4xl font-bold text-red-500">
                            {point.year}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {point.title}
                          </h3>
                          <p className="text-gray-600">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
