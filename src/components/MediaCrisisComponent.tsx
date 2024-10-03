import React from "react";

const challenges = [
  { id: 1, text: "Problem-Centered Reporting" },
  { id: 2, text: "news deserts for young people" },
  { id: 3, text: "Revenue Models in Crisis" },
  { id: 4, text: "Disinformation & misinformation threat" },
  { id: 5, text: "Lack of in-depth coverage of development" },
  { id: 6, text: "Lack Market -Required Skills" }
];

const MediaCrisisComponent: React.FC = () => {
  return (
    <div className="w-full mx-auto bg-white text-white rounded-lg shadow-none p-0">
      {/* <div
        className="relative w-full bg-gradient-to-l from-sky-400 to-blue-500 text-white overflow-hidden"
        style={{
          height: "auto",
          clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 100%)"
        }}
      >
        <h2 className="text-5xl lg:text-6xl md:text-6xl leading-tight px-4 pt-4 pb-12 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white/80 to-white">
          The Challenge We Face
        </h2>
      </div> */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-700 text-white">
        <div className="container mx-auto px-2 py-2 md:py-3 lg:py-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl capitalize sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Challenge We Face
            </h1>
          </div>
        </div>
      </section>
      <div className="relative w-full aspect-square max-w-2xl mx-auto my-0">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <linearGradient
              id="tubeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#4A90E2" />
            </linearGradient>
            <linearGradient
              id="circleGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#5CA0EA" />
            </linearGradient>
            <filter
              id="innerShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset dx="4" dy="4" />
              <feComposite
                in2="SourceAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
                result="shadowDiff"
              />
              <feFlood flood-color="#2C5282" flood-opacity="0.75" />
              <feComposite in2="shadowDiff" operator="in" />
              <feComposite in2="SourceGraphic" operator="over" />
            </filter>
          </defs>

          {/* Outer circle (tube) */}
          <circle
            cx="300"
            cy="300"
            r="240"
            fill="none"
            stroke="url(#tubeGradient)"
            strokeWidth="30"
          />

          {/* Moving ball */}
          <circle className="animate-moveBall" r="12" fill="#FFF">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M300,60 A240,240 0 1,1 300,540 A240,240 0 1,1 300,60"
            />
          </circle>

          {/* Challenge circles */}
          {challenges.map((challenge, index) => {
            const angle =
              (index / challenges.length) * 2 * Math.PI - Math.PI / 2;
            const x = 300 + 240 * Math.cos(angle);
            const y = 300 + 240 * Math.sin(angle);
            return (
              <g key={challenge.id} transform={`translate(${x},${y})`}>
                <circle
                  r="55"
                  fill="url(#circleGradient)"
                  filter="url(#innerShadow)"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  className="font-semibold"
                >
                  {challenge.text.split(" ").map((word, i, arr) => (
                    <tspan
                      x="0"
                      dy={i ? "1.2em" : `${-(arr.length - 1) * 0.6}em`}
                      key={i}
                    >
                      {word}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          {/* Central text */}
          <text
            x="300"
            y="300"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#0097d1"
            fontSize="20"
            className="font-medium text-2xl"
          >
            <tspan x="300" dy="-1.2em">
              a multi-layered
            </tspan>
            <tspan x="300" dy="1.2em">
              and connected
            </tspan>
            <tspan x="300" dy="1.2em">
              media crisis
            </tspan>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default MediaCrisisComponent;
