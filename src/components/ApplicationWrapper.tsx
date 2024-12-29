"use client";

import { useEffect, useState } from "react";
import { ApplicationModal } from "./ApplicationModal";

export const ApplicationWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Delay modal opening slightly for better UX
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ApplicationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  );
};
