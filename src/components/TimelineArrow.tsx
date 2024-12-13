import { memo } from "react";

interface TimelineArrowProps {
  className?: string;
}

const TimelineArrow = memo(function TimelineArrow({
  className = ""
}: TimelineArrowProps) {
  return (
    <div
      className={`
        relative z-10 mx-1 flex items-center
        group transition-transform duration-300 hover:scale-110
        ${className}
      `}
      aria-hidden="true"
    >
      <div
        className={`
          w-6 h-6 bg-orange-500
          transition-all duration-300
          group-hover:bg-orange-600
          animate-pulse-subtle
        `}
        style={{
          clipPath: "polygon(0 0, 100% 50%, 0 100%)"
        }}
      />
      <div
        className={`
          w-6 h-6 bg-orange-500 -ml-3
          transition-all duration-300
          group-hover:bg-orange-600
          animate-pulse-subtle
          [animation-delay:150ms]
        `}
        style={{
          clipPath: "polygon(0 0, 100% 50%, 0 100%)"
        }}
      />
    </div>
  );
});

TimelineArrow.displayName = "TimelineArrow";

export default TimelineArrow;

// export default function TimelineArrow() {
//     return (
//       <div className="relative z-10 mx-1 flex items-center">
//         <div className="timeline-arrow w-6 h-6 bg-orange-500" />
//         <div className="timeline-arrow w-6 h-6 bg-orange-500 -ml-3" />
//       </div>
//     );
//   }
