// components/HomeWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/components/loading";
import { motion } from "framer-motion";

export default function HomeWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const { setLoading } = useLoading();
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Show initial loading state
    setLoading(true, "Loading Media Challenge Initiative...");

    // Function to check if images are loaded
    const checkIfImagesLoaded = () => {
      const images = document.querySelectorAll("img");
      let loadedImages = 0;

      const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          // All images are loaded
          setLoading(false);
          setIsContentReady(true);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener("load", imageLoaded);
          img.addEventListener("error", imageLoaded); // Count errors as loaded
        }
      });

      // If there are no images, finish loading
      if (images.length === 0) {
        setLoading(false);
        setIsContentReady(true);
      }
    };

    // Start checking after a minimum loading time
    const timer = setTimeout(() => {
      checkIfImagesLoaded();
    }, 1000); // Minimum loading time of 1 second

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, []);

  if (!isContentReady) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
