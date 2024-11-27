"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartnerData, Theme } from "@/interface/interface";
import { themes } from "@/config/themes";
import Breadcrumb from "@/components/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { ArrowUpDown } from "lucide-react";
import ColorSwitcher from "../staff/ColorSwitcher";
import FilterBar from "./FilterBar";
import getFormattedDate from "@/utils/get-formatted-date";

interface SortConfig {
  key: keyof PartnerData;
  direction: "asc" | "desc";
}

interface PartnersClientProps {
  initialPartners: PartnerData[];
}

export default function PartnersClient({
  initialPartners
}: PartnersClientProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const countries = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(initialPartners.map((partner) => partner.country).filter(Boolean))
    ).sort();
    return uniqueCountries;
  }, [initialPartners]);

  const sectors = useMemo(() => {
    const allSectors = initialPartners.reduce((acc: string[], partner) => {
      if (Array.isArray(partner.sectors)) {
        return [...acc, ...partner.sectors];
      }
      return [...acc, partner.sectors];
    }, []);

    return Array.from(new Set(allSectors.filter(Boolean))).sort();
  }, [initialPartners]);

  const handleSort = (key: keyof PartnerData) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc"
    }));
  };

  const filteredPartners = useMemo(() => {
    let result = [...initialPartners];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (partner) =>
          partner.partnerName.toLowerCase().includes(query) ||
          partner.country.toLowerCase().includes(query) ||
          (Array.isArray(partner.sectors)
            ? partner.sectors.some((sector) =>
                sector.toLowerCase().includes(query)
              )
            : partner.sectors.toLowerCase().includes(query))
      );
    }

    if (selectedCountry) {
      result = result.filter((partner) => partner.country === selectedCountry);
    }

    if (selectedSector) {
      result = result.filter((partner) =>
        Array.isArray(partner.sectors)
          ? partner.sectors.includes(selectedSector)
          : partner.sectors === selectedSector
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [
    initialPartners,
    searchQuery,
    selectedCountry,
    selectedSector,
    sortConfig
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCountry("");
    setSelectedSector("");
    setSortConfig(null);
  };

  return (
    <div className="min-h-screen">
      <ColorSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        isColorMenuOpen={isColorMenuOpen}
        setIsColorMenuOpen={setIsColorMenuOpen}
      />

      <Breadcrumb
        title="Our Partners"
        subtitle="Meet our trusted global partners and collaborators"
        currentTheme={currentTheme}
      />

      <div className={`w-full px-4 py-12 ${currentTheme.bg}`}>
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          countries={countries}
          sectors={sectors}
          currentTheme={currentTheme}
          resetFilters={resetFilters}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-xl shadow-2xl"
        >
          <Table
            className={`w-full border-separate border-spacing-y-2 ${currentTheme.text}`}
          >
            <TableHeader>
              <TableRow
                className={`bg-gradient-to-r ${currentTheme.gradientFrom} ${currentTheme.gradientVia} ${currentTheme.gradientTo}`}
              >
                <TableHead className="w-[200px] text-white font-semibold">
                  Partner Logo
                </TableHead>
                <TableHead
                  className="w-[200px] text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("partnerName")}
                >
                  <div className="flex items-center">
                    Partner Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="w-[200px] text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("partnerSince")}
                >
                  <div className="flex items-center">
                    Partner Since
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="w-[200px] text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("country")}
                >
                  <div className="flex items-center">
                    Country
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="w-[200px] text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("sectors")}
                >
                  <div className="flex items-center">
                    Sectors
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="w-[200px] text-white font-semibold">
                  Recognition
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="wait">
                {filteredPartners.map((data, i) => (
                  <motion.tr
                    key={data.partnerName || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`${currentTheme.hover} backdrop-blur-sm bg-white/50 transition-all duration-300 rounded-lg overflow-hidden`}
                  >
                    <TableCell className="p-4">
                      {data.image && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative w-full h-[120px]"
                        >
                          <Image
                            src={urlFor(data.image).url()}
                            alt={data.partnerName || "Partner logo"}
                            fill
                            className="object-contain transition-transform duration-300"
                          />
                        </motion.div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {data.partnerName}
                    </TableCell>
                    <TableCell>
                      {data.partnerSince && getFormattedDate(data.partnerSince)}
                    </TableCell>
                    <TableCell>{data.country}</TableCell>
                    <TableCell>
                      {Array.isArray(data.sectors)
                        ? data.sectors.join(", ")
                        : data.sectors}
                    </TableCell>
                    <TableCell>{data.recognition}</TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>

        {filteredPartners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <p className={`text-lg ${currentTheme.text}`}>
              No partners found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
