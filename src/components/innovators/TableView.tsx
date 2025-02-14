// components/TableView.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { BaseInnovator } from "@/types/innovator";
import { getStorageUrl } from "@/lib/api/innovators";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface TableViewProps {
  innovators: BaseInnovator[];
  isLoading?: boolean;
}

const TableView: React.FC<TableViewProps> = ({ innovators, isLoading }) => {
  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-sky-50/50">
              <TableHead className="w-[250px] py-4">Organization</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[200px]">Added</TableHead>
              <TableHead className="w-[120px]">Links</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(6)].map((_, i) => (
              <TableRow key={i}>
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-sky-50/50">
            <TableHead className="w-[250px] py-4">Organization</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[200px]">Added</TableHead>
            <TableHead className="w-[120px]">Links</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence mode="wait">
            {innovators.map((innovator, i) => (
              <motion.tr
                key={innovator.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group hover:bg-gray-50/50"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    {innovator.logo && (
                      <div className="w-12 h-12 relative flex-shrink-0 rounded-lg overflow-hidden bg-white shadow-sm">
                        <Image
                          src={getStorageUrl(innovator.logo)}
                          alt={`${innovator.name} logo`}
                          fill
                          className="object-contain p-2"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <Link
                      href={`/innovators/${innovator.slug}`}
                      className="font-medium text-gray-900 hover:text-sky-500 transition-colors"
                    >
                      {innovator.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600 max-w-md">
                  <p className="line-clamp-2">{innovator.short_description}</p>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(innovator.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/innovators/${innovator.slug}`}
                      className="p-2 text-gray-500 hover:text-sky-500 transition-colors"
                      title="View Details"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                    {innovator.website_link && (
                      <a
                        href={innovator.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-sky-500 transition-colors"
                        title="Visit Website"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;