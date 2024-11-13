import React from "react";
import { StaffData } from "@/interface/interface";
import { getAllStaff, getTotalStaff } from "@/utils/get-all-staff";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { PaginationControls } from "@/components/PaginationSection";
import Subscribe from "@/components/subscribe";
import Breadcrumb from "@/components/breadcrumb";

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";

  const per_page = searchParams["per_page"] ?? "8";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const staff: StaffData[] = await getAllStaff(start, end);

  const total: number = await getTotalStaff();

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 lg:mt-0 mt-4">
        <Breadcrumb title={"Our Staff"} />
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((s, i: number) => (
              <Link
                href={`/who-we-are/staff/${s.currentSlug}`}
                key={i}
                className="group relative overflow-hidden rounded-xl"
              >
                <img
                  alt="Recent blog post"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height="400"
                  src={urlFor(s.image).url()}
                  style={{
                    aspectRatio: "300/320",
                    objectFit: "cover",
                    objectPosition:"50% 20%"
                  }}
                  width="300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 md:p-6">
                  <div className="flex h-full flex-col justify-end">
                    <div className="space-y-2">
                      {/* <div className="inline-block rounded-lg bg-gray-900 px-3 py-1 text-sm text-gray-50">
                      {s.name}
                    </div> */}

                      <h2 className="text-md font-bold tracking-tight text-gray-50 md:text-lg lg:text-xl">
                        {s.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <PaginationControls />
      </section>
    </>
  );
}
