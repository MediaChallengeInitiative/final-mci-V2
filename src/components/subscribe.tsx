"use client";

import React, { useState } from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const Subscribe = () => {
  const [formState, setFormState] = useState({
    email: "",
    status: "idle",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  return (
    <section className="relative w-full bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f6931d]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#f6931d]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#f6931d] border border-none
                   p-6 sm:p-8 shadow-2xl relative overflow-hidden rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white">
              <Mail className="w-7 h-7 text-[#f6931d]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Newsletter
            </h2>
          </div>

          <div className="relative w-full lg:w-auto flex-grow">
            <input
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
              className="w-full h-12 pl-5 pr-12 
                      bg-white text-[#f6931d] placeholder-[#f6931d]
                      backdrop-blur-sm rounded-xl border-2 border-[#f6931d]
                      focus:border-[#f6931d] focus:ring-2 focus:ring-[#f6931d]
                      transition-all duration-300"
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f6931d]" />
          </div>

          {/* <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Purple to pink
            </span>
          </button> */}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={
              formState.status === "loading" || formState.status === "success"
            }
            className="relative rounded-xl overflow-hidden text-sm font-medium text-[#f6931d] group bg-transparent border-2 border-white hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-white flex items-center justify-center"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-[#f6931d] hover:text-white dark:bg-[#f6931d] rounded-lg group-hover:bg-opacity-0">
              {formState.status === "loading" && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
              {formState.status === "success" && <Check className="w-5 h-5" />}
              {formState.status === "loading"
                ? "Subscribing..."
                : formState.status === "success"
                  ? "Subscribed!"
                  : "Subscribe"}
            </span>
          </motion.button>

          {(formState.status === "error" || formState.status === "success") && (
            <Alert
              className={`absolute -bottom-16 w-full 
                           ${
                             formState.status === "error"
                               ? "bg-red-500/10 border-red-500/20"
                               : "bg-[#f6931d]/10 border-[#f6931d]/20"
                           }`}
            >
              <AlertDescription
                className={
                  formState.status === "error"
                    ? "text-red-200"
                    : "text-orange-200"
                }
              >
                {formState.message}
              </AlertDescription>
            </Alert>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Subscribe;

// import React from "react";

// export default function Subscribe() {
//   return (
//     <>
//       <section className="w-full bg-[#f6931d] py-6 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <form className="flex flex-col lg:flex-row items-center justify-between gap-4">
//             <label
//               htmlFor="email"
//               className="text-3xl sm:text-4xl font-bold text-white whitespace-nowrap"
//             >
//               newsletter
//             </label>
//             <div className="relative w-full lg:w-auto flex-grow">
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Email"
//                 className="w-full outline-none border-stock-1 border border-opacity-40 h-12 pl-4 pr-12 text-[#f6931d] placeholder-[#f6931d] bg-white border-none rounded-md focus:ring-2 focus:ring-[#0097d1]"
//               />
//               <div className="absolute right-4 top-1/2 -translate-y-1/2">
//                 <svg
//                   width={17}
//                   height={15}
//                   viewBox="0 0 17 15"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M16.2188 0.96875H0.78125C0.452832 0.96875 0.1875 1.23408 0.1875 1.5625V13.4375C0.1875 13.7659 0.452832 14.0312 0.78125 14.0312H16.2188C16.5472 14.0312 16.8125 13.7659 16.8125 13.4375V1.5625C16.8125 1.23408 16.5472 0.96875 16.2188 0.96875ZM15.4766 3.02461V12.6953H1.52344V3.02461L1.01133 2.62568L1.74053 1.68867L2.53467 2.30654H14.4672L15.2613 1.68867L15.9905 2.62568L15.4766 3.02461V3.02461ZM14.4672 2.30469L8.5 6.94336L2.53281 2.30469L1.73867 1.68682L1.00947 2.62383L1.52158 3.02275L7.85986 7.95088C8.04214 8.09249 8.26639 8.16936 8.49722 8.16936C8.72804 8.16936 8.95229 8.09249 9.13457 7.95088L15.4766 3.02461L15.9887 2.62568L15.2595 1.68867L14.4672 2.30469Z"
//                     fill="#f6931d"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full lg:w-auto px-8 h-12 text-[#0097d1] bg-white hover:bg-[#0097d1] hover:text-white transition-colors duration-300 rounded-xl font-semibold"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }
