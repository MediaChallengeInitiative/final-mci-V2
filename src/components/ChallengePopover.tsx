"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChallengePopoverProps {
  text: string;
  description: string;
  icon: string;
  position: { x: number; y: number };
  isVisible: boolean;
}

export const ChallengePopover = ({
  text,
  description,
  position,
  isVisible
}: ChallengePopoverProps) => {
  // Calculate popover position based on circle position
  const getPopoverPosition = () => {
    const { x } = position;
    const centerX = 300;

    // Adjust offset based on position relative to center
    const offsetX = x > centerX ? -320 : 120;
    const offsetY = 120;

    return {
      left: `${x + offsetX}px`,
      top: `${position.y + offsetY}px`
    };
  };

  const arrowPosition = () => {
    const { x } = position;
    const centerX = 300;

    return x > centerX ? "right" : "left";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
      style={getPopoverPosition()}
      className={cn(
        "absolute z-50 w-80 bg-white rounded-[20px]",
        "border-[6px] border-orange-500 shadow-xl",
        "before:content-[''] before:absolute before:w-6 before:h-6",
        "before:bg-orange-500 before:rotate-45",
        arrowPosition() === "right"
          ? [
              "before:right-0 before:top-1/2",
              "before:translate-x-1/2 before:-translate-y-1/2"
            ]
          : [
              "before:left-0 before:top-1/2",
              "before:-translate-x-1/2 before:-translate-y-1/2"
            ],
        !isVisible && "pointer-events-none"
      )}
    >
      <div className="relative bg-white rounded-[14px] p-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/20 to-orange-500/10" />
        <motion.div
          className="flex justify-center items-center mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MessageSquare
            className="w-12 h-12 text-orange-500"
            strokeWidth={1.5}
          />
        </motion.div>
        <h3 className="text-xl font-semibold text-sky-500 mb-2">{text}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <Link
          href="#"
          className="group inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
        >
          Read More
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
};

// "use client";

// import { motion } from "framer-motion";
// import { ArrowUpRight, MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// interface ChallengePopoverProps {
//   text: string;
//   description: string;
//   icon: string;
//   position: { x: number; y: number };
//   isVisible: boolean;
// }

// export const ChallengePopover = ({
//   text,
//   description,
//   position,
//   isVisible
// }: ChallengePopoverProps) => {
//   // Calculate popover position based on circle position
//   const getPopoverPosition = () => {
//     const { x, y } = position;
//     const centerX = 300;
//     const centerY = 300;
//     const angle = Math.atan2(y - centerY, x - centerX);

//     // Determine which quadrant the circle is in
//     const quadrant = {
//       top: y < centerY,
//       right: x > centerX
//     };

//     // Adjust offset based on quadrant
//     const offsetX = quadrant.right ? -320 : 120;
//     const offsetY = quadrant.top ? 120 : -120;

//     return {
//       left: `${x + offsetX}px`,
//       top: `${y + offsetY}px`
//     };
//   };

//   const arrowPosition = () => {
//     const { x, y } = position;
//     const centerX = 300;
//     const centerY = 300;

//     if (x > centerX) return "right";
//     return "left";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8, y: 20 }}
//       animate={{
//         opacity: isVisible ? 1 : 0,
//         scale: isVisible ? 1 : 0.8,
//         y: isVisible ? 0 : 20
//       }}
//       exit={{ opacity: 0, scale: 0.8, y: 20 }}
//       transition={{
//         duration: 0.2,
//         type: "spring",
//         stiffness: 500,
//         damping: 30
//       }}
//       style={getPopoverPosition()}
//       className={cn(
//         "absolute z-50 w-80 bg-white rounded-[20px]",
//         "border-[6px] border-orange-500 shadow-xl",
//         "before:content-[''] before:absolute before:w-6 before:h-6",
//         "before:bg-orange-500 before:rotate-45",
//         arrowPosition() === "right"
//           ? [
//               "before:right-0 before:top-1/2",
//               "before:translate-x-1/2 before:-translate-y-1/2"
//             ]
//           : [
//               "before:left-0 before:top-1/2",
//               "before:-translate-x-1/2 before:-translate-y-1/2"
//             ],
//         !isVisible && "pointer-events-none"
//       )}
//     >
//       <div className="relative bg-white rounded-[14px] p-6 overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/20 to-orange-500/10" />
//         <motion.div
//           className="flex justify-center items-center mb-4"
//           whileHover={{ scale: 1.1 }}
//           transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//           <MessageSquare
//             className="w-12 h-12 text-orange-500"
//             strokeWidth={1.5}
//           />
//         </motion.div>
//         <h3 className="text-xl font-semibold text-sky-500 mb-2">{text}</h3>
//         <p className="text-gray-600 text-sm leading-relaxed mb-4">
//           {description}
//         </p>
//         <Link
//           href="#"
//           className="group inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
//         >
//           Read More
//           <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//         </Link>
//       </div>
//     </motion.div>
//   );
// };
