"use client";

import React, { useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

interface AnimatedCounterProps {
  target: number;
  time: number;
  start?: number;
  formatter?: (value: number) => string;
  className?: string;
}

const useAnimatedCounter = (
  target: number,
  time: number,
  start: number = 0
): number => {
  const [current, setCurrent] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setHasStarted(true);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let rafId: number;
    const startTime = performance.now();

    const easeOutQuad = (t: number): number => t * (2 - t);

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / time, 1);
      const easedProgress = easeOutQuad(progress);
      const newValue = start + (target - start) * easedProgress;

      setCurrent(Math.round(newValue));

      if (progress < 1) {
        rafId = requestAnimationFrame(updateCounter);
      }
    };

    rafId = requestAnimationFrame(updateCounter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, time, start, hasStarted]);

  return current;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  time,
  start = 0,
  formatter = (value) => value.toLocaleString(),
  className = ""
}) => {
  const current = useAnimatedCounter(target, time, start);

  return <span className={className}>{formatter(current)}</span>;
};

const StatCard: React.FC<{
  icon: JSX.Element;
  title: string;
  value: number;
  change: number;
  subtitle: string;
}> = ({ icon, title, value, change, subtitle }) => {
  const isPositive = change >= 0;

  return (
    <div className="rounded-lg shadow-xl hover:shadow-lg transition-shadow duration-300 w-64 p-4 bg-white">
      <div className="flex items-center">
        <div className="flex">
          <span className="bg-gray-100 rounded-md p-3">{icon}</span>
        </div>
        <div className="flex-1 ml-4 text-sm">
          <p className="font-bold text-gray-600 mb-3">{title}</p>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-3xl flex-grow mb-0">
              <AnimatedCounter
                target={value}
                time={2000}
                formatter={(val) => val.toLocaleString()}
              />
            </h4>
            <span
              className={`rounded flex items-center px-3 py-1 text-xs font-bold ${
                isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 mr-1 ${isPositive ? "rotate-0" : "rotate-180"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414l-3.293 3.293a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {Math.abs(change).toFixed(2)}%
            </span>
          </div>
          <p className="text-gray-500 text-truncate mb-0">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            }
            title="TOTAL PROJECTS"
            value={673}
            change={-5.02}
            subtitle="Projects this month"
          />

          <div className="text-4xl text-black text-center font-bold p-8 rounded-lg bg-white shadow-lg">
            <AnimatedCounter
              target={300}
              time={2000}
              className="text-blue-600"
            />
          </div>

          <div className="text-2xl text-center font-semibold p-6 rounded-lg bg-white shadow-lg">
            <AnimatedCounter
              target={780}
              time={2000}
              className="text-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
