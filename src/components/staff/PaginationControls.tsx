"use client";
import React, { useEffect, useState } from "react"; // Removed unused FC
import { useRouter, useSearchParams } from "next/navigation";
import { getTotalStaff } from "@/utils/get-all-staff";

export const PaginationControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 8;

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getTotalStaff()
      .then((res) => {
        setTotal(res);
      })
      .catch((error) => {
        console.error("Error fetching total staff:", error);
      });
  }, []);

  const totalPages = Math.ceil(total / per_page);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // Only render pagination if we have more than one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

// "use client";
// import React, { FC, useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { getTotalStaff } from "@/utils/get-all-staff";
// // import {Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../ui/pagination";

// export const PaginationControls = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const page = searchParams.get("page") ?? "1";
//   // const per_page = searchParams.get("per_page") ?? "8";
//   const per_page = Number(searchParams.get("per_page")) || 8;

//   const [total, setTotal] = useState<number>(0);

//   useEffect(() => {
//     getTotalStaff()
//       .then((res) => {
//         setTotal(res);
//       })
//       .catch((error) => {
//         console.error("Error fetching total staff:", error);
//       });
//   }, []);

//   const totalPages = Math.ceil(total / per_page);

//   return (
//     <></>
//   );
// };
