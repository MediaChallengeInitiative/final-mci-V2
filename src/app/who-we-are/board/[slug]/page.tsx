import React from "react";
import Image from "next/image";
import { StaffData } from "@/interface/interface";
import { getSingleStaff } from "@/utils/get-single-staff";
import { urlFor } from "@/lib/sanity";
import { getSingleBoardMember } from "@/utils/get-single-board-member";

export default async function Page({ params }: { params: { slug: string } }) {
  const board: StaffData = await getSingleBoardMember(params.slug);
  return (
    <>
      <div className="relative h-[400px] sm:h-[600px] lg:h-[700px]">
        <img
          alt="Cover Image"
          className="h-full w-full object-cover"
          height="300"
          src={urlFor(board.image).url()}
          style={{
            aspectRatio: "1200/500",
            objectFit: "cover",
            objectPosition:"50% 20%"
          }}
          width="300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 text-white">
          <div className="flex items-end gap-4">
            <div className="flex items-center justify-center h-20 w-20 rounded-full ring-2 ring-sky-500 bg-black">
              <span className="text-3xl text-sky-500">
                {board?.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{board?.name}</h1>
              <p className="text-md pt-3">{board?.title}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <p className="text-lg leading-relaxed text-gray-200 dark:text-gray-100 lg:text-justify">
            {board?.bio?.map((paragraph: any, index: number) => (
              <span key={index}>{paragraph.children[0].text}</span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
