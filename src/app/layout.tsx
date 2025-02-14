// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense, lazy } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Navigation/Header";
import { LoadingProvider } from "@/components/loading";
import LayoutWrapper from "@/components/layouts/LayoutWrapper";

const Footer = lazy(() => import("@/components/footer"));

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Media Challenge Initiative",
  description: "A humane media that shapes the future"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <LoadingProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <LayoutWrapper>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Suspense fallback={<div className="h-[100px]" />}>
                  <Footer />
                </Suspense>
              </div>
            </LayoutWrapper>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Suspense, lazy } from "react";
// import "./globals.css";
// import { ThemeProvider } from "next-themes";
// import Header from "@/components/Navigation/Header";
// import { LoadingProvider } from "@/components/loading";

// // Use React.lazy instead of dynamic with suspense
// const Footer = lazy(() => import("@/components/footer"));

// const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] }); // Load required weights only

// export const metadata: Metadata = {
//   title: "Media Challenge Initiative",
//   description: "A humane media that shapes the future"
// };

// export default function RootLayout({
//   children
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link
//           rel="icon"
//           type="image/x-icon"
//           href="/assets/images/favicon.ico"
//         />
//       </head>
//       <body className={inter.className} suppressHydrationWarning>
//         <LoadingProvider>
//           <ThemeProvider attribute="class">
//           <Header />
//             <main>{children}</main>
//             <Footer />
//           </ThemeProvider>
//         </LoadingProvider>
//       </body>
//     </html>
//   );
// }
