"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Theme {
  name: string;
  bg: string;
  text: string;
  cardBg: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  hover: string;
}

interface ModernPaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  baseUrl: string;
  className?: string;
  currentTheme: Theme; // Add theme prop
}

export function ModernPagination({
  currentPage,
  totalPages,
  perPage,
  baseUrl,
  className,
  currentTheme
}: ModernPaginationProps) {
  const router = useRouter();

  const getThemeColors = () => {
    const themeColors = {
      hover: "",
      active: "",
      activeHover: ""
    };

    switch (currentTheme.name) {
      case "green":
        themeColors.hover = "hover:bg-green-100";
        themeColors.active = "bg-green-500";
        themeColors.activeHover = "hover:bg-green-600";
        break;
      case "sky":
        themeColors.hover = "hover:bg-sky-100";
        themeColors.active = "bg-sky-500";
        themeColors.activeHover = "hover:bg-sky-600";
        break;
      case "pink":
        themeColors.hover = "hover:bg-pink-100";
        themeColors.active = "bg-pink-500";
        themeColors.activeHover = "hover:bg-pink-600";
        break;
      case "orange":
        themeColors.hover = "hover:bg-orange-100";
        themeColors.active = "bg-orange-500";
        themeColors.activeHover = "hover:bg-orange-600";
        break;
      case "purple":
        themeColors.hover = "hover:bg-purple-100";
        themeColors.active = "bg-purple-500";
        themeColors.activeHover = "hover:bg-purple-600";
        break;
      case "dark":
        themeColors.hover = "hover:bg-gray-700";
        themeColors.active = "bg-gray-600";
        themeColors.activeHover = "hover:bg-gray-500";
        break;
      default: // default theme
        themeColors.hover = "hover:bg-orange-100";
        themeColors.active = "bg-orange-500";
        themeColors.activeHover = "hover:bg-orange-600";
    }

    return themeColors;
  };

  const handlePageChange = (page: number) => {
    router.push(`${baseUrl}?page=${page}&per_page=${perPage}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const themeColors = getThemeColors();

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("flex justify-center items-center gap-2", className)}
    >
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-10 w-10 rounded-xl transition-all duration-200",
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : themeColors.hover
        )}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-default hover:bg-transparent"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              className={cn(
                "h-10 w-10 rounded-2xl font-medium transition-all duration-200",
                currentPage === page
                  ? `${themeColors.active} ${themeColors.activeHover} text-white`
                  : themeColors.hover
              )}
            >
              {page}
              {currentPage === page && (
                <span className="sr-only">(Current page)</span>
              )}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-10 w-10 rounded-xl transition-all duration-200",
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : themeColors.hover
        )}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  );
}

// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ModernPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   perPage: number;
//   baseUrl: string;
//   className?: string;
// }

// export function ModernPagination({
//   currentPage,
//   totalPages,
//   perPage,
//   baseUrl,
//   className
// }: ModernPaginationProps) {
//   const router = useRouter();

//   const handlePageChange = (page: number) => {
//     router.push(`${baseUrl}?page=${page}&per_page=${perPage}`);
//   };

//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const showEllipsis = totalPages > 7;

//     if (!showEllipsis) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }

//     // Always show first page
//     pages.push(1);

//     if (currentPage > 3) {
//       pages.push("...");
//     }

//     // Show pages around current page
//     for (
//       let i = Math.max(2, currentPage - 1);
//       i <= Math.min(totalPages - 1, currentPage + 1);
//       i++
//     ) {
//       pages.push(i);
//     }

//     if (currentPage < totalPages - 2) {
//       pages.push("...");
//     }

//     // Always show last page
//     if (totalPages > 1) {
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   return (
//     <nav
//       role="navigation"
//       aria-label="Pagination Navigation"
//       className={cn("flex justify-center items-center gap-2", className)}
//     >
//       <Button
//         variant="outline"
//         size="icon"
//         className={cn(
//           "h-10 w-10 rounded-xl transition-all duration-200",
//           currentPage === 1
//             ? "opacity-50 cursor-not-allowed"
//             : "hover:bg-orange-100"
//         )}
//         onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <ChevronLeft className="h-4 w-4" />
//         <span className="sr-only">Previous page</span>
//       </Button>

//       <div className="flex items-center gap-2">
//         {getPageNumbers().map((page, index) =>
//           page === "..." ? (
//             <Button
//               key={`ellipsis-${index}`}
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10 cursor-default hover:bg-transparent"
//               disabled
//             >
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           ) : (
//             <Button
//               key={page}
//               variant={currentPage === page ? "default" : "ghost"}
//               onClick={() => typeof page === "number" && handlePageChange(page)}
//               className={cn(
//                 "h-10 w-10 rounded-2xl font-medium transition-all duration-200",
//                 currentPage === page
//                   ? "bg-orange-500 hover:bg-orange-600 text-white"
//                   : "hover:bg-orange-100"
//               )}
//             >
//               {page}
//               {currentPage === page && (
//                 <span className="sr-only">(Current page)</span>
//               )}
//             </Button>
//           )
//         )}
//       </div>

//       <Button
//         variant="outline"
//         size="icon"
//         className={cn(
//           "h-10 w-10 rounded-xl transition-all duration-200",
//           currentPage === totalPages
//             ? "opacity-50 cursor-not-allowed"
//             : "hover:bg-orange-100"
//         )}
//         onClick={() =>
//           currentPage < totalPages && handlePageChange(currentPage + 1)
//         }
//         disabled={currentPage === totalPages}
//       >
//         <ChevronRight className="h-4 w-4" />
//         <span className="sr-only">Next page</span>
//       </Button>
//     </nav>
//   );
// }
