"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { getTotalStaff } from "@/utils/get-all-staff";

export const PaginationControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  // const per_page = searchParams.get("per_page") ?? "8";
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

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem
          className={`${
            Number(page) > 1
              ? "bg-sky-500 hover:bg-sky-600 text-white rounded-lg"
              : "bg-sky-900 text-gray-600"
          }`}
        >
          <PaginationPrevious
            onClick={() => {
              if (Number(page) > 1) {
                router.push(
                  `/who-we-are/staff/?page=${
                    Number(page) - 1
                  }&per_page=${per_page}`
                );
              }
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-white text-xl mx-4">
            {page} / {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={`${
            Number(page) < totalPages
              ? "bg-sky-500 hover:bg-sky-600 text-white rounded-lg"
              : "bg-sky-900 text-gray-600"
          }`}
        >
          <PaginationNext
            onClick={() => {
              if (Number(page) < totalPages) {
                router.push(
                  `/who-we-are/staff/?page=${
                    Number(page) + 1
                  }&per_page=${per_page}`
                );
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
