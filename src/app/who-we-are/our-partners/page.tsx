"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Image from "next/image";
import { PartnerData } from "@/interface/interface";
import { getAllPartners } from "@/utils/get-all-partners";
import { urlFor } from "@/lib/sanity";
// import Breadcrumb from "@/components/breadcrumb";

export default function Page() {
  const [partners, setPartners] = useState<PartnerData[]>([]);

  useEffect(() => {
    getAllPartners().then((res) => {
      setPartners(res);
    });
  }, []);

  function getFormattedDate(publishedAt: string | Date): string {
    const date = new Date(publishedAt as string);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      year: "numeric",
      day: "numeric"
    }; // Include day in options
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <section className="w-full py-10 md:py-20 lg:py-28 lg:mt-0 mt-4">
        {/* <Breadcrumb title={"Our Partners"} /> */}
        <Table className="text-white border-separate border-spacing-y-2 text-2md">
          <TableHeader>
            <TableRow
              className="rounded-md bg-sky-700"
              style={{ borderRadius: "10px !important" }}
            >
              <TableHead className="w-[200px]">Partner Logo</TableHead>
              <TableHead className="w-[200px]">Partner Name</TableHead>
              <TableHead className="w-[200px]">Partner Since</TableHead>
              <TableHead className="w-[200px]">Country</TableHead>
              <TableHead className="w-[200px]">Sectors</TableHead>
              <TableHead className="w-[200px]">Recognition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white text-black text-[1rem]">
            {partners.map((data, i: number) => (
              <TableRow key={i} className="bg-gray-200">
                <TableCell className="font-medium">
                  <Image
                    className="w-full h-[200px] object-contain object-left"
                    src={urlFor(data.image).url()}
                    width={100}
                    height={100}
                    alt="partner logo"
                  />
                </TableCell>
                <TableCell className="text-black">{data.partnerName}</TableCell>
                <TableCell className="text-center">
                  {getFormattedDate(data.partnerSince)}
                </TableCell>
                <TableCell>{data.country}</TableCell>
                <TableCell>{data.sectors}</TableCell>
                <TableCell>{data.recognition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
