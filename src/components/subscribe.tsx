"use client";

import React, { useState } from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SubscribeFormState {
  email: string;
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

const Subscribe = () => {
  const [formState, setFormState] = useState<SubscribeFormState>({
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

    // Simulate API call
    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        status: "success",
        message: "Thank you for subscribing!"
      }));
    }, 1500);
  };

  return (
    <section className="w-full bg-gradient-to-r from-orange-400 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col lg:flex-row items-center justify-between gap-6 
            backdrop-blur-sm bg-white/10 p-6 sm:p-8 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-7 h-7 text-white" />
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
                text-gray-700 placeholder-gray-400
                bg-white/90 backdrop-blur-sm rounded-xl
                border-2 border-transparent
                focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50
                transition-all duration-300 ease-in-out"
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled={
              formState.status === "loading" || formState.status === "success"
            }
            className="w-full lg:w-auto min-w-[140px] px-8 h-12 
              text-white bg-sky-500 hover:bg-sky-600 
              disabled:bg-sky-400 disabled:cursor-not-allowed
              rounded-xl font-semibold shadow-md 
              hover:shadow-lg transition-all duration-300 
              flex items-center justify-center gap-2"
          >
            {formState.status === "loading" && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            {formState.status === "success" && <Check className="w-5 h-5" />}
            {formState.status === "loading"
              ? "Subscribing..."
              : formState.status === "success"
                ? "Subscribed!"
                : "Subscribe"}
          </button>

          {(formState.status === "error" || formState.status === "success") && (
            <Alert
              className={`absolute -bottom-16 w-full ${
                formState.status === "error"
                  ? "bg-red-50 border-red-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <AlertDescription
                className={
                  formState.status === "error"
                    ? "text-red-800"
                    : "text-green-800"
                }
              >
                {formState.message}
              </AlertDescription>
            </Alert>
          )}
        </form>
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
