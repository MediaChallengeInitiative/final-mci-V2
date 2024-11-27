"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../ui/select";
import { Theme } from "@/interface/interface";
import { Input } from "../ui/input";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  countries: string[];
  sectors: string[];
  currentTheme: Theme;
  resetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  selectedSector,
  setSelectedSector,
  countries,
  sectors,
  currentTheme,
  resetFilters
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-lg"
  >
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search partners..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pl-10 bg-white/50 border-none ${currentTheme.text}`}
        />
      </div>
      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger className="w-full lg:w-[200px] bg-white/50">
          <SelectValue placeholder="Filter by Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Countries</SelectItem>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedSector} onValueChange={setSelectedSector}>
        <SelectTrigger className="w-full lg:w-[200px] bg-white/50">
          <SelectValue placeholder="Filter by Sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Sectors</SelectItem>
          {sectors.map((sector) => (
            <SelectItem key={sector} value={sector}>
              {sector}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={resetFilters}
        className="lg:w-auto w-full bg-white/50"
      >
        <X className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  </motion.div>
);

export default FilterBar;
