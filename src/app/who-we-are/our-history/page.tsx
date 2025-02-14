// app/who-we-are/our-history/page.tsx
import dynamic from "next/dynamic";
import Loading from "./loading";

// Dynamically import the History page component with loading state
const HistoryPage = dynamic(
  () => import("@/components/pages/history/HistoryPage"),
  {
    loading: () => <Loading />,
    ssr: false // Disable SSR for components using window
  }
);

export default function Page() {
  return <HistoryPage />;
}
