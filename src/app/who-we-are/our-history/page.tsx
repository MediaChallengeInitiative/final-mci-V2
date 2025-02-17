// app/who-we-are/our-history/page.tsx
import dynamic from "next/dynamic";
import Loading from "./loading";
import { Metadata } from "next";
import { Suspense } from "react";

// Define metadata with metadataBase
export const metadata: Metadata = {
  title: "Our History | Media Challenge Initiative",
  description:
    "Learn about the history and journey of Media Challenge Initiative.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mciug.org"
  ),
  openGraph: {
    title: "Our History | Media Challenge Initiative",
    description:
      "Learn about the history and journey of Media Challenge Initiative.",
    images: ["/assets/images/history-banner.jpg"]
  }
};

// Dynamically import the History page component with loading state
const HistoryPage = dynamic(
  () => import("@/components/pages/history/HistoryPage"),
  {
    loading: () => <Loading />,
    ssr: false // Disable SSR for components using window
  }
);

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HistoryPage />
    </Suspense>
  );
}
