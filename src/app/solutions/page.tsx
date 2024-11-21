import React from "react";
import { Metadata } from "next";
import { getAllSolutions } from "@/utils/get-all-solutions";
import SolutionsClientPage from "@/components/SolutionsClientPage";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "6S Model | MCI",
  description: "Explore MCI's 6S Model solutions for media development"
};

export default async function Page() {
  const solutions = await getAllSolutions();

  // console.log(solutions);

  return (
    <section className="bg-transparent w-full pt-12 md:pt-24 lg:pt-16">
      <Breadcrumb title="6S Model" />
      <SolutionsClientPage solutions={solutions} />
    </section>
  );
}
