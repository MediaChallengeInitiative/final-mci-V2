import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Navigation/Header";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/images/favicon.ico"
        />
        {/* additional css files */}
        <link rel="stylesheet" href="/assets/css/jarallax.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap-icons.min.css" />
        <link rel="stylesheet" href="/assets/css/daterangepicker.css" />
        <link rel="stylesheet" href="/assets/css/fancybox.min.css" />
        <link rel="stylesheet" href="/assets/css/leaflet.css" />
        <link rel="stylesheet" href="/assets/css/select2.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        {/* custom css files */}
        <link rel="stylesheet" href="/assets/css/styles.css" />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <Footer />
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/jquery-3.6.3.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/swiper-bundle.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/select2.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/moment.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/daterangepicker.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/fancybox.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/leaflet.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/jarallax.min.js"
        ></Script>
        <Script
          strategy="lazyOnload"
          async
          src="/assets/js/wow.min.js"
        ></Script>
        <Script strategy="lazyOnload" async src="/assets/js/main.js"></Script>
        <script
          async
          src="/assets/vendor/glightbox/js/glightbox.min.js"
        ></script>
      </body>
    </html>
  );
}
