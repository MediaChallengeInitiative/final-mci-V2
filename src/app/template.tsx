// app/template.tsx
"use client";

import { useEffect } from "react";
import { useLoading } from "@/components/loading";
import { usePathname, useSearchParams } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const { setLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true, "Loading Page...");

      // Hide loader after a short delay
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    };

    handleRouteChange();
  }, [pathname, searchParams]);

  return children;
}
