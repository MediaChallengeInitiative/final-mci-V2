import React from "react";

export default function HistoryPage() {
  return <div>HistoryPage</div>;
}

// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import Image from "next/image";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Search, Clock, Calendar, Loader2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import {
//   getHistoryEntries,
//   getHistoryStatistics,
//   getImageUrl,
//   formatDate,
//   downloadHistoryImage
// } from "@/lib/api/history";
// import type { History, Statistics } from "@/types/history"; // Changed from HistoryEntry to History

// // Text Reveal Animation Component
// const TextReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({
//   children,
//   delay = 0
// }) => (
//   <div className="overflow-hidden">
//     <motion.div
//       initial={{ y: "100%", opacity: 0, rotate: 10 }}
//       animate={{ y: 0, opacity: 1, rotate: 0 }}
//       transition={{
//         duration: 0.8,
//         delay,
//         ease: [0.16, 1, 0.3, 1]
//       }}
//     >
//       {children}
//     </motion.div>
//   </div>
// );

// // Stats Card Component
// const StatsCard: React.FC<{
//   value: string | number;
//   label: string;
// }> = ({ value, label }) => (
//   <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//     <div className="text-2xl font-bold text-white">{value}</div>
//     <div className="text-sm text-gray-300">{label}</div>
//   </div>
// );

// // Hero Section Component
// const HeroSection: React.FC<{ statistics: Statistics | null }> = ({
//   statistics
// }) => {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, 150]);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   return (
//     <section className="relative w-full h-[60vh] overflow-hidden">
//       {/* Parallax Background */}
//       <motion.div
//         style={{ y: isMobile ? 0 : y }}
//         className="absolute inset-0 w-full h-full"
//       >
//         <div className="absolute inset-0 w-full h-full">
//           <Image
//             src="/assets/images/history-bg.jpg"
//             alt="History Background"
//             fill
//             className="object-cover"
//             priority
//             sizes="100vw"
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-gray-900/30 to-amber-900/20" />
//       </motion.div>

//       {/* Grid Pattern */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center justify-center mb-8"
//           >
//             <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-amber-500/20 text-amber-500 bg-opacity-70 backdrop-blur-sm">
//               <Clock className="w-4 h-4 mr-2" />
//               <span className="text-sm font-medium">
//                 Our Journey Through Time
//               </span>
//             </span>
//           </motion.div>

//           <div className="space-y-4">
//             <TextReveal delay={0.2}>
//               <span className="text-white block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
//                 Our Legacy of
//               </span>
//             </TextReveal>
//             <TextReveal delay={0.4}>
//               <span className="text-amber-500 block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
//                 Innovation & Growth
//               </span>
//             </TextReveal>
//           </div>

//           {statistics && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//               className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4"
//             >
//               <StatsCard
//                 value={statistics.total_entries}
//                 label="Historical Milestones"
//               />
//               <StatsCard
//                 value={statistics.with_images}
//                 label="Visual Memories"
//               />
//               <div className="hidden md:block">
//                 <StatsCard
//                   value={
//                     statistics.latest_addition
//                       ? new Date(statistics.latest_addition).getFullYear()
//                       : "N/A"
//                   }
//                   label="Latest Addition"
//                 />
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Timeline Entry Component
// const TimelineEntry: React.FC<{ entry: HistoryEntry; index: number }> = ({
//   entry,
//   index
// }) => {
//   const imageUrl = entry.image ? getImageUrl(entry.image) : null;

//   const handleImageDownload = async () => {
//     if (entry.image) {
//       try {
//         await downloadHistoryImage(entry.id, entry.title);
//       } catch (error) {
//         console.error("Error downloading image:", error);
//       }
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className="relative"
//     >
//       <Card className="mb-8 hover:shadow-lg transition-shadow duration-300">
//         <CardHeader>
//           <div className="flex items-center gap-2 text-amber-600 mb-2">
//             <Calendar className="w-4 h-4" />
//             <span className="text-sm">{formatDate(entry.created_at)}</span>
//             {entry.creator && (
//               <span className="text-sm text-gray-500 ml-auto">
//                 By {entry.creator.name}
//               </span>
//             )}
//           </div>
//           <CardTitle className="text-xl font-bold">{entry.title}</CardTitle>
//           <CardDescription>{entry.description}</CardDescription>
//         </CardHeader>
//         {imageUrl && (
//           <CardContent>
//             <div className="relative h-48 rounded-lg overflow-hidden group">
//               <Image
//                 src={imageUrl}
//                 alt={entry.title}
//                 fill
//                 className="object-cover transition-transform group-hover:scale-105"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               />
//               <button
//                 onClick={handleImageDownload}
//                 className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 Download
//               </button>
//             </div>
//           </CardContent>
//         )}
//       </Card>
//     </motion.div>
//   );
// };

// // Error Message Component
// const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({
//   message,
//   onRetry
// }) => (
//   <div className="text-center py-8">
//     <p className="text-red-600 mb-4">{message}</p>
//     <Button onClick={onRetry} variant="outline">
//       Try Again
//     </Button>
//   </div>
// );

// // Main Page Component
// export default function HistoryPage() {
//   const [entries, setEntries] = useState<HistoryEntry[]>([]);
//   const [statistics, setStatistics] = useState<Statistics | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async (pageNum: number, search: string) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await getHistoryEntries({
//         page: pageNum,
//         per_page: 10,
//         search
//       });

//       if (pageNum === 1) {
//         setEntries(response.data);
//       } else {
//         setEntries((prev) => [...prev, ...response.data]);
//       }

//       setHasMore(response.meta.current_page < response.meta.last_page);
//     } catch (err) {
//       setError("Failed to load historical entries. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const fetchStatistics = useCallback(async () => {
//     try {
//       const response = await getHistoryStatistics();
//       setStatistics(response.data);
//     } catch (err) {
//       console.error("Failed to load statistics:", err);
//     }
//   }, []);

//   useEffect(() => {
//     const initializePage = async () => {
//       await Promise.all([fetchData(1, ""), fetchStatistics()]);
//     };
//     initializePage();
//   }, [fetchData, fetchStatistics]);

//   const handleSearch = useCallback(
//     async (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value;
//       setSearchTerm(value);
//       setPage(1);
//       await fetchData(1, value);
//     },
//     [fetchData]
//   );

//   const loadMore = useCallback(async () => {
//     if (isLoading) return;
//     const nextPage = page + 1;
//     setPage(nextPage);
//     await fetchData(nextPage, searchTerm);
//   }, [isLoading, page, searchTerm, fetchData]);

//   return (
//     <div className="min-h-screen bg-white">
//       <HeroSection statistics={statistics} />

//       <div className="max-w-6xl mx-auto px-4 py-12">
//         {/* Search Section */}
//         <div className="mb-8">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               type="text"
//               placeholder="Search historical events..."
//               className="pl-10 w-full"
//               value={searchTerm}
//               onChange={handleSearch}
//               disabled={isLoading}
//             />
//           </div>
//         </div>

//         {/* Timeline Section */}
//         {error ? (
//           <ErrorMessage
//             message={error}
//             onRetry={() => fetchData(1, searchTerm)}
//           />
//         ) : (
//           <div className="space-y-8">
//             {entries.map((entry, index) => (
//               <TimelineEntry key={entry.id} entry={entry} index={index} />
//             ))}

//             {entries.length === 0 && !isLoading && (
//               <p className="text-center text-gray-500 py-8">
//                 No historical entries found.
//               </p>
//             )}
//           </div>
//         )}

//         {/* Load More Button */}
//         {hasMore && !error && (
//           <div className="mt-8 text-center">
//             <Button
//               onClick={loadMore}
//               disabled={isLoading}
//               className="bg-amber-600 hover:bg-amber-700 text-white"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Load More"
//               )}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
