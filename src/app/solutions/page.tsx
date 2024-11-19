import React from "react";
import { Solution } from "@/interface/interface";
import Breadcrumb from "@/components/breadcrumb";
import { getAllSolutions, getTotalSolutions } from "@/utils/get-all-solutions";
import SolutionsClientPage from "@/components/SolutionsClientPage";

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = 6; // Two rows of three blogs each

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const initialSolutions: Solution[] = await getAllSolutions(start, end);
  const totalSolutions: number = await getTotalSolutions();

  return (
    <section className="bg-white w-full py-12 md:py-24 lg:py-16 lg:mt-0 mt-2">
      <Breadcrumb title="6S Model" />
      <SolutionsClientPage
        initialSolutions={initialSolutions}
        totalSolutions={totalSolutions}
        per_page={per_page}
      />
    </section>
  );
}
