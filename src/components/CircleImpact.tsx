"use client";

import { useState, useEffect } from "react";

export default function CircleImpact() {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const minSize = Math.min(window.innerWidth, window.innerHeight);
      setSize(minSize * 0.8); // 80% of the smaller dimension
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const circleStyle = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size / 30}px` // Adjust font size based on circle size
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
      <div
        className="rounded-full border-8 border-orange-400 border-l-blue-500 border-t-blue-500 flex flex-col items-center justify-between p-16 text-center bg-transparent shadow-xl overflow-hidden transition-all duration-300 ease-in-out"
        style={circleStyle}
      >
        <div className="flex-1 flex flex-col justify-center">
          <h2
            className="font-playwrite font-bold text-orange-500 mb-2"
            style={{ fontSize: `${size / 15}px` }}
          >
            WHAT
          </h2>
          <p className="text-white text-xl mb-4 leading-tight">
            Media graduates leave universities unprepared for the future of work
            and demands of modern day newsrooms. This is exacerbated by lack of
            jobs.
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h2
            className="font-playwrite font-bold text-orange-500 mb-2"
            style={{ fontSize: `${size / 15}px` }}
          >
            IMPACT
          </h2>
          <p className="text-white text-xl p-4 leading-tight">
            A generation of disillusioned graduates with untapped potential,
            contributing to a stagnant media landscape and an unemployment
            crisis.
          </p>
        </div>
      </div>
    </div>
  );
}
