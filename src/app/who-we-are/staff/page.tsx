// import StaffPage from "@/components/staff/StaffPage";
// import { getAllStaff, getTotalStaff } from "@/utils/get-all-staff";

// export const runtime = "edge";
// export const preferredRegion = "auto";
// export const dynamic = "force-dynamic";
// export const revalidate = 3600;

// export default async function PageWrapper({
//   searchParams
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const page = searchParams["page"] ?? "1";
//   const per_page = searchParams["per_page"] ?? "8";
//   const start = (Number(page) - 1) * Number(per_page);
//   const end = start + Number(per_page);

//   const [staff, total] = await Promise.all([
//     getAllStaff(start, end),
//     getTotalStaff()
//   ]);

//   const totalPages = Math.ceil(total / Number(per_page));

//   return (
//     <StaffPage
//       staff={staff}
//       page={page}
//       totalPages={totalPages}
//       per_page={per_page}
//     />
//   );
// }


import StaffPage from "@/components/staff/StaffPage";
import { getAllStaff, getTotalStaff } from "@/utils/get-all-staff";
import ErrorPage from "@/components/ErrorPage"; // Ensure this is the correct path

export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-static";
export const revalidate = 3600;

export default async function PageWrapper({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Math.max(1, Number(searchParams["page"] ?? "1"));
  const per_page = Math.max(1, Math.min(100, Number(searchParams["per_page"] ?? "8")));
  const start = (page - 1) * per_page;
  const end = start + per_page;

  try {
    const [staff, total] = await Promise.all([
      getAllStaff(start, end),
      getTotalStaff(),
    ]);

    const totalPages = Math.ceil(total / per_page);

    return (
      <StaffPage
        staff={staff}
        page={String(page)} // Convert number to string
        totalPages={totalPages}
        per_page={String(per_page)} // Convert number to string
      />
    );
  } catch (error) {
    console.error(error);
    return <ErrorPage message="Failed to load staff data." />;
  }
}



// "use client";
// import React, { useState } from "react";
// import {
//   ColorSwitcherProps,
//   StaffData,
//   StaffPageProps,
//   Theme
// } from "@/interface/interface";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Breadcrumb from "@/components/breadcrumb";
// import { ModernPagination } from "@/components/ui/modern-pagination";
// import { Palette } from "lucide-react";
// import { getAllStaff, getTotalStaff } from "@/utils/get-all-staff";
// import { urlFor } from "@/lib/sanity";
// import Image from "next/image";

// const themes: Theme[] = [
//   {
//     name: "default",
//     bg: "bg-white",
//     text: "text-gray-900",
//     cardBg: "from-orange-500 via-purple-500 to-blue-500",
//     gradientFrom: "from-orange-500",
//     gradientVia: "via-purple-500",
//     gradientTo: "to-blue-500",
//     hover: "hover:bg-gray-50"
//   },
//   {
//     name: "green",
//     bg: "bg-green-50",
//     text: "text-green-900",
//     cardBg: "from-green-500 via-emerald-500 to-teal-500",
//     gradientFrom: "from-green-500",
//     gradientVia: "via-emerald-500",
//     gradientTo: "to-teal-500",
//     hover: "hover:bg-green-100"
//   },
//   {
//     name: "sky",
//     bg: "bg-sky-50",
//     text: "text-sky-900",
//     cardBg: "from-sky-500 via-blue-500 to-indigo-500",
//     gradientFrom: "from-sky-500",
//     gradientVia: "via-blue-500",
//     gradientTo: "to-indigo-500",
//     hover: "hover:bg-sky-100"
//   },
//   {
//     name: "pink",
//     bg: "bg-pink-50",
//     text: "text-pink-900",
//     cardBg: "from-pink-500 via-rose-500 to-red-500",
//     gradientFrom: "from-pink-500",
//     gradientVia: "via-rose-500",
//     gradientTo: "to-red-500",
//     hover: "hover:bg-pink-100"
//   },
//   {
//     name: "orange",
//     bg: "bg-orange-50",
//     text: "text-orange-900",
//     cardBg: "from-orange-500 via-amber-500 to-yellow-500",
//     gradientFrom: "from-orange-500",
//     gradientVia: "via-amber-500",
//     gradientTo: "to-yellow-500",
//     hover: "hover:bg-orange-100"
//   },
//   {
//     name: "purple",
//     bg: "bg-purple-50",
//     text: "text-purple-900",
//     cardBg: "from-purple-500 via-violet-500 to-indigo-500",
//     gradientFrom: "from-purple-500",
//     gradientVia: "via-violet-500",
//     gradientTo: "to-indigo-500",
//     hover: "hover:bg-purple-100"
//   },
//   {
//     name: "dark",
//     bg: "bg-gray-900",
//     text: "text-white",
//     cardBg: "from-gray-700 via-gray-600 to-gray-500",
//     gradientFrom: "from-gray-700",
//     gradientVia: "via-gray-600",
//     gradientTo: "to-gray-500",
//     hover: "hover:bg-gray-800"
//   }
// ];

// const ColorSwitcher: React.FC<ColorSwitcherProps> = ({
//   currentTheme,
//   setCurrentTheme,
//   isColorMenuOpen,
//   setIsColorMenuOpen
// }) => (
//   <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
//     <button
//       onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
//       className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 mb-2 shadow-lg"
//     >
//       <Palette className="w-6 h-6 text-gray-700" />
//     </button>

//     {isColorMenuOpen && (
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-xl"
//       >
//         <div className="grid grid-cols-2 gap-2">
//           {themes.map((theme) => (
//             <button
//               key={theme.name}
//               onClick={() => setCurrentTheme(theme)}
//               className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${theme.cardBg} hover:scale-110 transition-transform duration-200 shadow-lg`}
//               title={theme.name}
//             />
//           ))}
//         </div>
//       </motion.div>
//     )}
//   </div>
// );

// const StaffPage: React.FC<StaffPageProps> = ({
//   staff,
//   page,
//   totalPages,
//   per_page
// }) => {
//   const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
//   const [isColorMenuOpen, setIsColorMenuOpen] = useState<boolean>(true);

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
//     >
//       <ColorSwitcher
//         currentTheme={currentTheme}
//         setCurrentTheme={setCurrentTheme}
//         isColorMenuOpen={isColorMenuOpen}
//         setIsColorMenuOpen={setIsColorMenuOpen}
//       />
//       <section className="w-full py-12 md:py-24 lg:py-32 lg:mt-0 mt-4">
//         <Breadcrumb title="Our Staff" />
//         <div className="container grid gap-12 px-4 md:px-6">
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             {staff.map((s, i: number) => (
//               <Link
//                 href={`/who-we-are/staff/${s.currentSlug}`}
//                 key={i}
//                 className={`group relative block p-1 rounded-2xl bg-gradient-to-tr ${currentTheme.cardBg} hover:shadow-2xl hover:-translate-y-1 transition-all duration-500`}
//                 prefetch={true}
//               >
//                 <div className="relative overflow-hidden rounded-xl bg-white">
//                   <div className="aspect-[3/4] overflow-hidden">
//                     <Image
//                       width={200}
//                       height={200}
//                       alt={s.name}
//                       className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
//                       src={urlFor(s.image).url()}
//                       style={{
//                         objectPosition: "50% 20%"
//                       }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                     <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45" />
//                     <div className="absolute bottom-20 left-4 w-8 h-8 rounded-full border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-rotate-45" />
//                   </div>

//                   <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
//                     <div className="relative">
//                       <div
//                         className={`h-1 w-10 bg-gradient-to-r ${currentTheme.gradientFrom} ${currentTheme.gradientTo} rounded-full mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100`}
//                       />
//                       <h2 className="text-xl font-bold text-white tracking-wide mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
//                         {s.name}
//                       </h2>
//                       <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
//                         View Profile
//                       </p>
//                     </div>

//                     <div className="absolute -bottom-1 -right-1 w-20 h-20">
//                       <div className="absolute inset-0 rotate-45 transform origin-bottom-right scale-0 group-hover:scale-100 transition-transform duration-500">
//                         <div
//                           className={`w-full h-full bg-gradient-to-br ${currentTheme.gradientFrom} ${currentTheme.gradientTo} opacity-20 backdrop-blur-sm`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//         <ModernPagination
//           currentPage={Number(page)}
//           totalPages={totalPages}
//           perPage={Number(per_page)}
//           baseUrl="/who-we-are/staff"
//           className="mt-8"
//           currentTheme={currentTheme} // Add this line
//         />
//       </section>
//     </div>
//   );
// };

// // Wrapper component to handle async data
// export default async function PageWrapper({
//   searchParams
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const page = searchParams["page"] ?? "1";
//   const per_page = searchParams["per_page"] ?? "8";
//   const start = (Number(page) - 1) * Number(per_page);
//   const end = start + Number(per_page);

//   const staff: StaffData[] = await getAllStaff(start, end);
//   const total: number = await getTotalStaff();
//   const totalPages = Math.ceil(total / Number(per_page));

//   return (
//     <StaffPage
//       staff={staff}
//       page={page}
//       totalPages={totalPages}
//       per_page={per_page}
//     />
//   );
// }
