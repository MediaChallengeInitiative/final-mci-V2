// src/app/contact-us/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the ContactPage component
const ContactPage = dynamic(
  () => import("@/components/pages/contact-us/ContactPage"),
  {
    loading: () => <div>Loading...</div>
  }
);

export const metadata: Metadata = {
  metadataBase: new URL("https://mediachallengeinitiative.org"),
  title: "Contact Us | Media Challenge Initiative",
  description:
    "Get in touch with us. We'd love to hear from you and help with any questions you may have.",
  openGraph: {
    title: "Contact Us | Media Challenge Initiative",
    description:
      "Get in touch with us. We'd love to hear from you and help with any questions you may have.",
    images: ["/assets/images/innovators-bg.jpg"]
  }
};

export default function ContactUsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPage />
    </Suspense>
  );
}

// // src/app/contact-us/page.tsx
// import { Metadata } from "next";
// import dynamic from "next/dynamic";

// // Dynamically import the ContactPage component with ssr disabled
// const ContactPage = dynamic(
//   () => import("@/components/pages/contact-us/ContactPage"),
//   { ssr: false }
// );

// export const metadata: Metadata = {
//   title: "Contact Us | Media Challenge Initiative",
//   description:
//     "Get in touch with us. We'd love to hear from you and help with any questions you may have.",
//   openGraph: {
//     title: "Contact Us | Your Company Name",
//     description:
//       "Get in touch with us. We'd love to hear from you and help with any questions you may have.",
//     images: ["/assets/images/innovators-bg.jpg"]
//   }
// };

// export default function ContactUsPage() {
//   return <ContactPage />;
// }
