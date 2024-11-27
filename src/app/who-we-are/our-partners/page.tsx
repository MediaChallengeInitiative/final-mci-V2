"use client";

import { getAllPartners } from "@/utils/get-all-partners";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import PartnersLoading from "@/components/partners/PartnersLoading";

const DynamicPartnersClient = dynamic(
  () => import("@/components/partners/PartnersClient"),
  {
    loading: () => <PartnersLoading />
  }
);

export default function Page() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const data = await getAllPartners();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPartners();
  }, []);

  if (isLoading) {
    return <PartnersLoading />;
  }

  return <DynamicPartnersClient initialPartners={partners} />;
}
