import Image from "next/image";
import { memo } from "react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  image: string;
  isEven: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimelineItem = memo(function TimelineItem({
  year,
  title,
  description,
  image,
  isEven,
  isFirst,
  isLast
}: TimelineItemProps) {
  return (
    <div
      className={`
        relative flex flex-col items-center
        ${isFirst ? "first-timeline-item" : ""}
        ${isLast ? "last-timeline-item" : ""}
      `}
      role="listitem"
      aria-label={`Timeline event from ${year}: ${title}`}
    >
      {/* Year */}
      <div
        className={`
          absolute 
          ${isEven ? "-top-12" : "-bottom-12"} 
          lg:block hidden
          transition-opacity duration-300 group-hover:opacity-100
          text-[32px] font-bold text-sky-500 whitespace-nowrap
          transform hover:scale-105 transition-transform
        `}
      >
        {year}
      </div>

      {/* Content */}
      <div
        className={`
          w-[140px] 
          ${isEven ? "lg:-mb-20" : "lg:-mt-20"}
          group
          transition-transform duration-300 hover:scale-105
        `}
      >
        {/* Image Container */}
        <div
          className="
          rounded-full overflow-hidden w-[140px] h-[140px] relative
          ring-2 ring-orange-500/20 ring-offset-2
          transform transition-all duration-300
          group-hover:ring-orange-500/50 group-hover:shadow-lg
        "
        >
          <Image
            src={image}
            alt={title}
            width={140}
            height={140}
            className="
              object-cover w-full h-full
              transform transition-transform duration-500
              group-hover:scale-110
            "
            priority={isFirst}
            sizes="140px"
            quality={90}
          />

          {/* Overlay on hover */}
          <div
            className="
            absolute inset-0 bg-gradient-to-b from-transparent to-black/50
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
          />
        </div>

        {/* Text Content */}
        <div
          className="
          mt-2 text-center px-1
          transform transition-all duration-300
          group-hover:translate-y-1
        "
        >
          <h3
            className="
            text-[11px] font-medium text-orange-500 
            line-clamp-2 mb-1
            group-hover:text-orange-600
          "
          >
            {title}
          </h3>
          {description && (
            <p
              className="
              text-[10px] text-gray-600 
              leading-tight line-clamp-2
              opacity-80 group-hover:opacity-100
            "
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Timeline Node */}
      <div
        className="
        absolute top-1/2 -translate-y-1/2
        transition-transform duration-300
        group-hover:scale-110
      "
      >
        <div
          className="
          w-3 h-3 rounded-full 
          bg-orange-500 
          border-2 border-white 
          shadow-md
          group-hover:shadow-lg
          transition-all duration-300
          group-hover:bg-orange-600
        "
        />
      </div>
    </div>
  );
});

TimelineItem.displayName = "TimelineItem";

export default TimelineItem;

// import Image from 'next/image';

// interface TimelineItemProps {
//   year: string;
//   title: string;
//   description: string;
//   image: string;
//   isEven: boolean;
// }

// export default function TimelineItem({ year, title, description, image, isEven }: TimelineItemProps) {
//   return (
//     <div className="relative flex flex-col items-center">
//       {/* Year */}
//       <div className={`absolute ${isEven ? '-top-12' : '-bottom-12'} lg:block hidden`}>
//         <span className="text-[32px] font-bold text-sky-500 whitespace-nowrap">
//           {year}
//         </span>
//       </div>

//       {/* Content */}
//       <div className={`w-[140px] ${isEven ? 'lg:-mb-20' : 'lg:-mt-20'}`}>
//         <div className="rounded-full overflow-hidden w-[140px] h-[140px] relative">
//           <Image
//             src={image}
//             alt={title}
//             width={140}
//             height={140}
//             className="object-cover"
//           />
//         </div>
//         <div className="mt-2 text-center px-1">
//           <h3 className="text-[11px] font-medium text-orange-500 line-clamp-2">{title}</h3>
//           <p className="text-[10px] text-gray-600 mt-1 leading-tight line-clamp-2">{description}</p>
//         </div>
//       </div>

//       {/* Timeline node */}
//       <div className="absolute top-1/2 -translate-y-1/2">
//         <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-md" />
//       </div>
//     </div>
//   );
// }
