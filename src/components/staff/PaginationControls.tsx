"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTotalStaff } from "@/utils/get-all-staff";
// import {Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../ui/pagination";

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
    <></>
  );
};