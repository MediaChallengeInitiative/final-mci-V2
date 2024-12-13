import React from "react";
import { StaffData } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import { getAllBoardMembers } from "@/utils/get-all-board-members";
import Link from "next/link";
// import Breadcrumb from "@/components/breadcrumb";
import { getAllFounders } from "@/utils/get-all-founders";
import Image from "next/image";

export default async function Page() {
  const board: StaffData[] = await getAllBoardMembers();
  const founders: StaffData[] = await getAllFounders();
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 lg:mt-0">
        {/* <Breadcrumb title={"Our Advisory Board"} /> */}
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {board.map((s, i: number) => (
              <Link
                href={`/who-we-are/board/${s.currentSlug}`}
                key={i}
                className="group relative overflow-hidden rounded-xl"
              >
                <Image
                  alt="Recent blog post"
                  className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                  height="400"
                  src={urlFor(s.image).url()}
                  style={{
                    aspectRatio: "300/320",
                    objectFit: "cover"
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
          <div className="max-w-[1570px] pt-16 pb-6 mx-auto px-3">
            <div className="text-center lg:pb-[60px] pb-[40px]">
              <h2 className="text-4xl font-bold tracking-tight text-gray-300 lg:text-6xl">
                Our Founders
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {founders?.map((s, i: number) => (
              <Link
                href={`/who-we-are/board/${s.currentSlug}`}
                key={i}
                className="group relative overflow-hidden rounded-xl"
              >
                <Image
                  alt="Recent blog post"
                  className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                  height="400"
                  src={urlFor(s.image).url()}
                  style={{
                    aspectRatio: "300/320",
                    objectFit: "cover"
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
      </section>
    </>
  );
}
