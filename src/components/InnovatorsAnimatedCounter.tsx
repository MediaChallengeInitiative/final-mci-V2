"use client";

import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { AnimatedCounterProps } from "@/interface/innovation";

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={counterRef}>{count.toLocaleString()}</span>;
};