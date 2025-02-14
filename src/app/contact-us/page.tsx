// src/app/contact-us/page.tsx
import ContactPage from "@/components/pages/contact-us/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Media Challenge Initiative",
  description:
    "Get in touch with us. We'd love to hear from you and help with any questions you may have.",
  openGraph: {
    title: "Contact Us | Your Company Name",
    description:
      "Get in touch with us. We'd love to hear from you and help with any questions you may have.",
    images: ["/assets/images/innovators-bg.jpg"]
  }
};

export default function ContactUsPage() {
  return <ContactPage />;
}
