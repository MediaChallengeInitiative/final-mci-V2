import React from "react";

interface ImpactItem {
  value: string;
  description: string;
}

const impactData: ImpactItem[] = [
  {
    value: "7 MILLION",
    description:
      "Average Reach for Stories Reported and Content Produced by Our Alumni Working on TV"
  },
  {
    value: "300K+",
    description: "Social Media Followers for our top 20 alumni"
  },
  {
    value: "220K",
    description: "Average Weekly Reach for Stories by Our Alumni in Newspapers"
  },
  {
    value: "3000",
    description: "young journalists trained since 2017"
  },
  {
    value: "180",
    description: "fellows since 2018"
  },
  {
    value: "15",
    description: "Awards Received by Our Alumni"
  },
  {
    value: "56",
    description: "Alumni Working in Communications"
  },
  {
    value: "56",
    description:
      "Alumni Doing Master's Degree in Journalism and related courses"
  },
  {
    value: "135",
    description: "alumni employed in media"
  },
  {
    value: "10",
    description: "youth media start-ups"
  }
];

const ImpactSection: React.FC = () => {
  return (
    <section className="w-full bg-white p-0 lg:p-0">
      <h2 className="text-4xl capitalize tracking-tight lg:text-6xl sm:text-3xl md:text-4xl font-bold text-white bg-orange-400 py-2 lg:py-4 md:py-2 px-4 sm:px-3 md:px-3 text-center">
        Our Impact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0.5 bg-gray-200">
        {impactData.map((item, index) => (
          <div
            key={index}
            className={`p-3 sm:p-4 flex flex-col justify-center items-center text-center
                        transition-colors duration-300
                        ${
                          index % 2 === 0
                            ? "bg-sky-500 text-white hover:bg-white hover:text-sky-500"
                            : "bg-white text-sky-500 hover:bg-sky-500 hover:text-white"
                        }`}
          >
            <span className="text-5xl lg:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">
              {item.value}
            </span>
            <p className="text-2xl capitalize text-center lg:text-2md">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
