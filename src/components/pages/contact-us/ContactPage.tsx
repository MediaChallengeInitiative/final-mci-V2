"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  Check,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInquirySubmission } from "@/lib/api/inquiries";
import { toast } from "sonner";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  className
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <label
        className={cn(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isFocused
            ? "-top-2 text-xs text-sky-500 bg-white px-2"
            : "top-3 text-gray-500"
        )}
      >
        {label}
      </label>
      {React.cloneElement(children as React.ReactElement, {
        onFocus: () => setIsFocused(true),
        onBlur: (
          e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setIsFocused(e.target.value !== "");
        },
        className: cn(
          "pt-3 pb-2 transition-all duration-200 border-2 focus:border-sky-500 hover:border-gray-300",
          (children as React.ReactElement).props.className
        )
      })}
    </div>
  );
};

const TextReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0
}) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0, rotate: 10 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  </div>
);

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      <motion.div
        style={{ y: isMobile ? 0 : y }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: "url('/assets/images/innovators-bg.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-gray-900/30 to-sky-900/20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-8 group"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900/80 border border-sky-500/20 text-sky-500 backdrop-blur-sm transition-all duration-300 group-hover:border-sky-500/40 group-hover:bg-gray-900/90">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Get in Touch</span>
            </span>
          </motion.div>

          <div className="space-y-4">
            <TextReveal delay={0.2}>
              <span className="text-white block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Let's Start a
              </span>
            </TextReveal>
            <TextReveal delay={0.4}>
              <span className="text-sky-500 block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
                Conversation
              </span>
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: string;
}> = ({ icon, title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-sky-500/10 transition-all duration-300"
  >
    <div className="p-4 bg-sky-50 rounded-full mb-6 group-hover:bg-sky-100 transition-colors duration-300">
      <div className="text-sky-500 transition-transform duration-300 transform group-hover:scale-110">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 text-center">{content}</p>
  </motion.div>
);

const SuccessMessage: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center p-8 text-center"
  >
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
      <Check className="w-8 h-8 text-green-500" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
    <p className="text-gray-600 mb-8">
      We'll get back to you as soon as possible.
    </p>
    <Button
      onClick={onReset}
      variant="outline"
      className="hover:text-sky-500 hover:border-sky-500"
    >
      Send Another Message
    </Button>
  </motion.div>
);

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { submit, isLoading, error, success, resetState } =
    useInquirySubmission();
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit(formData);
      toast.success("Message sent successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      subject: "",
      message: ""
    });
    resetState();
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <div className="relative bg-white -mt-20 rounded-t-3xl z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ContactInfoCard
              icon={<MapPin className="w-6 h-6" />}
              title="Our Location"
              content="4th Floor Tirupati Mazima Mall, Kabalagala, Kampala-Uganda"
            />
            <ContactInfoCard
              icon={<Phone className="w-6 h-6" />}
              title="Phone Number"
              content="+256-785-195228"
            />
            <ContactInfoCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Address"
              content="info@mciug.org"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-12"
            >
              {success ? (
                <SuccessMessage onReset={resetForm} />
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="First Name">
                        <Input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder=" "
                          required
                          disabled={isLoading}
                        />
                      </FormField>
                      <FormField label="Last Name">
                        <Input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder=" "
                          required
                          disabled={isLoading}
                        />
                      </FormField>
                    </div>

                    <FormField label="Email Address">
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        disabled={isLoading}
                      />
                    </FormField>

                    <FormField label="Subject">
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        disabled={isLoading}
                      />
                    </FormField>

                    <FormField label="Message">
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        className="min-h-32 resize-none"
                        required
                        disabled={isLoading}
                      />
                    </FormField>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
