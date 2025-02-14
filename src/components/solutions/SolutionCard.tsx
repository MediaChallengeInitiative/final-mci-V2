import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";
import { Solution } from "@/types/solution";
import { getStorageUrl } from "@/lib/api/solutions";
import {
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaHandHoldingHeart,
  FaChartLine,
  FaLightbulb
} from "react-icons/fa";
import { IconType } from "react-icons";

const iconComponents: Record<string, IconType> = {
  FaBrain,
  FaUsers,
  FaNewspaper,
  FaHandHoldingHeart,
  FaChartLine,
  FaLightbulb
};

interface SolutionCardProps {
  solution: Solution;
  index: number;
}

const SolutionCard = React.memo(({ solution, index }: SolutionCardProps) => {
  const formattedDate = useMemo(() => {
    return new Date(solution.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }, [solution.created_at]);

  const IconComponent = solution.icon_name
    ? iconComponents[solution.icon_name]
    : null;
  const iconSize = solution.icon_size || 24;

  return (
    <div
      className="group bg-white overflow-hidden transition-all duration-500 flex flex-col h-full"
      style={{
        background: `linear-gradient(to bottom right, ${
          solution.bg_color_from || "#000000"
        }, ${solution.bg_color_to || "#000000"})`
      }}
    >
      {/* Card Header with Cover Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={getStorageUrl(solution.icon)}
          alt={solution.title}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 6}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Icon Overlay */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          {IconComponent && (
            <IconComponent className="text-white" size={iconSize} />
          )}
        </div>

        {solution.cover_image && (
          <div className="absolute top-4 right-4 transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-lg p-2">
              <div className="relative w-full h-full">
                <Image
                  src={getStorageUrl(solution.cover_image)}
                  alt={`${solution.title} icon`}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-6">
        <Link href={`/solutions/${solution.slug}`} className="block">
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
            {solution.title}
          </h3>

          <div className="flex items-center text-white font-medium mt-auto group-hover:gap-2 transition-all duration-300">
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
});

SolutionCard.displayName = "SolutionCard";

export default SolutionCard;
