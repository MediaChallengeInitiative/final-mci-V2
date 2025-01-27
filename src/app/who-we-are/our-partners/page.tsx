"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PartnerData } from "@/interface/interface";
import { getAllPartners } from "@/utils/get-all-partners";
import { urlFor } from "@/lib/sanity";

// Hero Section Components
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: isMobile ? 0 : y }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/innovators-bg.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-gray-900/30 to-sky-900/20" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-sky-500/20 text-orange-500 bg-opacity-70 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Our Partners Network</span>
            </span>
          </motion.div>

          <div className="space-y-4">
            <TextReveal delay={0.2}>
              <span className="text-white block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Collaborating with
              </span>
            </TextReveal>
            <TextReveal delay={0.4}>
              <span className="text-sky-500 block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Global Innovators
              </span>
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  useEffect(() => {
    getAllPartners().then((res) => {
      setPartners(res);
    });
  }, []);

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector =
      selectedSector === "All" || partner.sectors.includes(selectedSector);
    return matchesSearch && matchesSector;
  });

  const uniqueSectors = [
    "All",
    ...Array.from(new Set(partners.flatMap((p) => p.sectors.split(", "))))
  ];

  const getFormattedDate = (publishedAt: string | Date): string => {
    const date = new Date(publishedAt as string);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Partners Content */}
      <div className="flex flex-col relative bg-white p-6 z-20">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search partners"
                className="pl-10 w-full h-10 text-sm border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="h-10 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              {uniqueSectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-sky-50 hover:bg-sky-50">
                <TableHead className="text-xs text-gray-600 font-medium w-[200px]">
                  Partner Logo
                </TableHead>
                <TableHead className="text-xs text-gray-600 font-medium w-[200px]">
                  Partner Name
                </TableHead>
                <TableHead className="text-xs text-gray-600 font-medium w-[200px]">
                  Partner Since
                </TableHead>
                <TableHead className="text-xs text-gray-600 font-medium w-[200px]">
                  Country
                </TableHead>
                <TableHead className="text-xs text-gray-600 font-medium w-[200px]">
                  Sectors
                </TableHead>
                <TableHead className="text-xs text-gray-600 font-medium w-[200px]">
                  Recognition
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="py-4">
                    <div className="w-32 h-16 relative">
                      <Image
                        src={urlFor(partner.image).url()}
                        alt={`${partner.partnerName} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">
                    {partner.partnerName}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {getFormattedDate(partner.partnerSince)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {partner.country}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-sky-50 text-sky-700 rounded">
                      {partner.sectors}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-50 text-orange-700 rounded">
                      {partner.recognition}
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
