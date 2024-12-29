"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, CheckCircle } from "lucide-react";
import Image from "next/image";

export const ApplicationSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const benefits = [
    "Intensive multimedia training",
    "One-on-one mentorship",
    "Industry networking",
    "Practical field experience"
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-sky-50/50 to-white">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/grid-pattern.png')] opacity-5"
        style={{ backgroundSize: "30px 30px" }}
      />

      <div className="relative container mx-auto px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Main Title */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-sky-500 mb-4">
              Call for Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the prestigious Media Challenge Fellowship and become part of
              Uganda's next generation of transformative journalists.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            {/* Left Column - Image and Quick Info */}
            <motion.div variants={fadeInUp} className="flex flex-col h-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl flex-grow">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images/fellowship/fellowship-hero.jpg"
                    alt="Media Fellowship Programme"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Image Overlay Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                      <p className="text-3xl font-bold text-white">
                        Class of 2024
                      </p>
                      <div className="flex items-center space-x-3 text-white/90">
                        <Users className="w-6 h-6" />
                        <p className="text-xl">
                          25 Fellows from 12 Universities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Application Content */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-between space-y-8 h-full"
            >
              {/* Program Overview */}
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-sky-500">
                  Transform Your Career
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  The Media Challenge Fellowship Program is now accepting
                  applications for its 2025 cohort. Get ready for an intensive
                  journey that will shape your future in journalism.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="space-y-6">
                <h4 className="text-2xl font-semibold text-sky-500">
                  Program Benefits
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <CheckCircle className="w-6 h-6 text-sky-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Dates */}
              <div className="space-y-6">
                <h4 className="text-2xl font-semibold text-sky-500">
                  Key Dates
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <Calendar className="w-6 h-6 text-sky-500 mr-4" />
                    <span className="text-lg font-medium">
                      Application Deadline: January 20th, 2025
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <Users className="w-6 h-6 text-sky-500 mr-4" />
                    <span className="text-lg font-medium">
                      Program Start: March 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href="https://forms.gle/zGDABKvP4FdqgTCj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-sky-500 text-white px-10 py-5 rounded-xl font-semibold hover:bg-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl text-xl w-full justify-center"
                  >
                    Submit Your Application
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </a>
                </motion.div>
                <p className="text-center text-gray-500">
                  *Open to journalism and media students only. Limited spots
                  available.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationSection;
