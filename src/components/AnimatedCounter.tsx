// components/AnimatedCounter.tsx
import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  time: number;
  start?: number;
}

const useAnimatedCounter = (target: number, time: number, start: number = 0) => {
  const [current, setCurrent] = useState(start);

  useEffect(() => {
    const increment = (target - start) / time;
    const handle = setInterval(() => {
      setCurrent(prev => {
        if (prev < target) return prev + increment;
        clearInterval(handle);
        return target;
      });
    }, 1);

    return () => clearInterval(handle);
  }, [target, time, start]);

  return Math.round(current);
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, time, start = 0 }) => {
  const current = useAnimatedCounter(target, time, start);
  return <>{current}</>;
};

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col mx-auto items-center min-h-screen justify-center bg-gray-200 content-center">
      <div className="rounded shadow-xl hover:shadow-md mb-12 w-64 p-4 bg-white">
        <div className="flex items-center">
          <div className="flex">
            <span className="bg-gray-200 rounded-md p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase text-primary">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </span>
          </div>
          <div className="flex-1 ml-4 text-sm">
            <p className="font-bold mb-3">TOTAL PROJECTS</p>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-3xl flex-grow mb-0">
                <AnimatedCounter target={673} time={200} />
              </h4>
              <span className="bg-red-100 rounded flex pt-1 px-3 text-xs py-0.5 text-red-700 font-bold">
                <i className="ri-arrow-down-s-line fs-13 align-middle me-1"></i>5.02 %
              </span>
            </div>
            <p className="text-muted text-truncate mb-0">Projects this month</p>
          </div>
        </div>
      </div>

      <div className="text-4xl text-black text-center font-bold p-12 rounded-md bg-white w-42 mb-6">
        <AnimatedCounter target={300} time={200} />
      </div>

      <div>
        <AnimatedCounter target={780} time={200} />
      </div>
    </div>
  );
};

export default Dashboard;
