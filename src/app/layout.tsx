import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense, lazy } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Navigation/Header";
import { LoadingProvider } from "@/components/loading";

// Use React.lazy instead of dynamic with suspense
const Footer = lazy(() => import("@/components/footer"));

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] }); // Load required weights only

export const metadata: Metadata = {
  title: "Media Challenge Initiative",
  description: "A humane media that shapes the future"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/images/favicon.ico"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <ThemeProvider attribute="class">
          <LoadingProvider>
            <main>{children}</main>
          </LoadingProvider>
        </ThemeProvider>
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Footer from "@/components/footer";
// import { ThemeProvider } from "next-themes";
// import Header from "@/components/Navigation/Header";

// const inter = Inter({ subsets: ["latin"] });

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
//     <html lang="en">
//       <head>
//         <link
//           rel="icon"
//           type="image/x-icon"
//           href="/assets/images/favicon.ico"
//         />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin=""
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&display=swap"
//           rel="stylesheet"
//         />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin=""
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className={inter.className}>
//         <Header />
//         <ThemeProvider attribute="class">{children}</ThemeProvider>
//         <Footer />
//       </body>
//     </html>
//   );
// }
