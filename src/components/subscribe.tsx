"use client"

import React, { useState, useCallback } from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Subscribe = () => {
  const [formState, setFormState] = useState({
    email: "",
    status: "idle",
    message: ""
  });

  const handleSubmit = useCallback(
    async (e:any) => {
      e.preventDefault();
      if (!formState.email) {
        setFormState((prev) => ({
          ...prev,
          status: "error",
          message: "Please enter your email address"
        }));
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
        setFormState((prev) => ({
          ...prev,
          status: "error",
          message: "Please enter a valid email address"
        }));
        return;
      }
      setFormState((prev) => ({ ...prev, status: "loading" }));
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          status: "success",
          message: "Thank you for subscribing!"
        }));
      }, 1500);
    },
    [formState.email]
  );

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Dynamic Padding based on screen size */}
      <div className="px-0 py-0 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24 xl:px-16 xl:py-28 2xl:px-24 2xl:py-32">
        <div className="max-w-[120rem] mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6 bg-[#f6931d] p-4 sm:p-6 md:p-8 lg:p-10 rounded-none sm:rounded-2xl shadow-2xl relative overflow-hidden mx-auto"
          >
            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
              {/* Title Section */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#f6931d]" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Newsletter
                </h2>
              </div>

              {/* Input Section */}
              <div className="lg:col-span-6 relative w-full">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      email: e.target.value,
                      status: "idle"
                    }))
                  }
                  placeholder="Enter your email"
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-white text-[#f6931d] placeholder-[#f6931d]/80 rounded-lg sm:rounded-xl text-base sm:text-lg border-2 border-white focus:border-white focus:ring-2 focus:ring-white transition-all duration-300"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-[#f6931d]" />
              </div>

              {/* Button Section */}
              <div className="lg:col-span-3">
                <button
                  type="submit"
                  disabled={formState.status === "loading" || formState.status === "success"}
                  className="w-full relative rounded-lg sm:rounded-xl overflow-hidden text-base sm:text-lg font-medium text-[#f6931d] bg-white hover:bg-opacity-90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2 px-6 py-3 sm:py-4">
                    {formState.status === "loading" && (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                    {formState.status === "success" && (
                      <Check className="w-5 h-5" />
                    )}
                    {formState.status === "loading"
                      ? "Subscribing..."
                      : formState.status === "success"
                      ? "Subscribed!"
                      : "Subscribe"}
                  </span>
                </button>
              </div>
            </div>

            {/* Alert Section */}
            {(formState.status === "error" || formState.status === "success") && (
              <Alert
                className={`w-full ${
                  formState.status === "error"
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-white/10 border-white/20"
                }`}
              >
                <AlertDescription
                  className={`${
                    formState.status === "error"
                      ? "text-red-200"
                      : "text-white"
                  } text-sm sm:text-base`}
                >
                  {formState.message}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;

// "use client";

// import React, { useState, useCallback } from "react";
// import { Mail, Loader2, Check } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { motion } from "framer-motion";

// const Subscribe = () => {
//   const [formState, setFormState] = useState({
//     email: "",
//     status: "idle",
//     message: ""
//   });

//   // Handle form submission with validation and status updates
//   const handleSubmit = useCallback(
//     async (e: React.FormEvent) => {
//       e.preventDefault();

//       if (!formState.email) {
//         setFormState((prev) => ({
//           ...prev,
//           status: "error",
//           message: "Please enter your email address"
//         }));
//         return;
//       }

//       if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
//         setFormState((prev) => ({
//           ...prev,
//           status: "error",
//           message: "Please enter a valid email address"
//         }));
//         return;
//       }

//       setFormState((prev) => ({ ...prev, status: "loading" }));

//       setTimeout(() => {
//         setFormState((prev) => ({
//           ...prev,
//           status: "success",
//           message: "Thank you for subscribing!"
//         }));
//       }, 1500);
//     },
//     [formState.email]
//   );

//   return (
//     <section className="relative w-full bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f6931d]/10 rounded-full blur-3xl" />
//         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#f6931d]/10 rounded-full blur-3xl" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
//       </div>

//       <div className="max-w-7xl mx-auto relative">
//         <motion.form
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           onSubmit={handleSubmit}
//           className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#f6931d] border border-none p-6 sm:p-8 shadow-2xl relative overflow-hidden rounded-xl"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-xl bg-white">
//               <Mail className="w-7 h-7 text-[#f6931d]" />
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-white">
//               Newsletter
//             </h2>
//           </div>

//           <div className="relative w-full lg:w-auto flex-grow">
//             {/* Label added for accessibility */}
//             <label htmlFor="email" className="sr-only">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={formState.email}
//               onChange={(e) =>
//                 setFormState((prev) => ({
//                   ...prev,
//                   email: e.target.value,
//                   status: "idle"
//                 }))
//               }
//               placeholder="Enter your email"
//               className="w-full h-12 pl-5 pr-12 bg-white text-[#f6931d] placeholder-[#f6931d] backdrop-blur-sm rounded-xl border-2 border-[#f6931d] focus:border-[#f6931d] focus:ring-2 focus:ring-[#f6931d] transition-all duration-300"
//             />
//             <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f6931d]" />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={
//               formState.status === "loading" || formState.status === "success"
//             }
//             className="relative rounded-xl overflow-hidden text-sm font-medium text-[#f6931d] group bg-transparent border-2 border-white hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-white flex items-center justify-center"
//           >
//             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-[#f6931d] hover:text-white dark:bg-[#f6931d] rounded-lg group-hover:bg-opacity-0">
//               {formState.status === "loading" && (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               )}
//               {formState.status === "success" && <Check className="w-5 h-5" />}
//               {formState.status === "loading"
//                 ? "Subscribing..."
//                 : formState.status === "success"
//                   ? "Subscribed!"
//                   : "Subscribe"}
//             </span>
//           </motion.button>

//           {(formState.status === "error" || formState.status === "success") && (
//             <Alert
//               className={`absolute -bottom-16 w-full ${
//                 formState.status === "error"
//                   ? "bg-red-500/10 border-red-500/20"
//                   : "bg-[#f6931d]/10 border-[#f6931d]/20"
//               }`}
//             >
//               <AlertDescription
//                 className={
//                   formState.status === "error"
//                     ? "text-red-200"
//                     : "text-orange-200"
//                 }
//               >
//                 {formState.message}
//               </AlertDescription>
//             </Alert>
//           )}
//         </motion.form>
//       </div>
//     </section>
//   );
// };

// export default Subscribe;
