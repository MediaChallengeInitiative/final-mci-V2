// src/components/layouts/LayoutWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/components/loading";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";

export default function LayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const { setLoading } = useLoading();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true, "Loading Content...");

      // Function to check if all content is loaded
      const checkContentLoaded = () => {
        const images = document.querySelectorAll("img");
        let loadedImages = 0;

        const imageLoaded = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            setLoading(false);
            setIsReady(true);
          }
        };

        images.forEach((img) => {
          if (img.complete) {
            imageLoaded();
          } else {
            img.addEventListener("load", imageLoaded);
            img.addEventListener("error", imageLoaded);
          }
        });

        // If no images, finish loading
        if (images.length === 0) {
          setLoading(false);
          setIsReady(true);
        }
      };

      // Set minimum loading time
      const minLoadingTime = setTimeout(() => {
        checkContentLoaded();
      }, 800);

      return () => {
        clearTimeout(minLoadingTime);
      };
    };

    handleRouteChange();
  }, [pathname, searchParams]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
