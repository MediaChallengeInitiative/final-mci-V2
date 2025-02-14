// src/components/layouts/ClientLayout.tsx
"use client";

import { LoadingProvider } from "@/components/loading";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <LoadingProvider>{children}</LoadingProvider>;
}
