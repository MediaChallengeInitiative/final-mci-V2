"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const interestOptions = [
  { id: "marketing", label: "Marketing Support", icon: "🎯" },
  { id: "incubation", label: "Incubation Support", icon: "🌱" },
  { id: "funding", label: "Funding", icon: "💰" },
  { id: "mentorship", label: "Mentorship", icon: "👥" },
  { id: "networking", label: "Networking Opportunities", icon: "🤝" },
  { id: "technical", label: "Technical Support", icon: "⚙️" }
] as const;

export type InterestOption = (typeof interestOptions)[number]["id"];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  ideaName: string;
  ideaDescription: string;
  interests: InterestOption[];
}

const INITIAL_FORM_STATE: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  ideaName: "",
  ideaDescription: "",
  interests: []
};

const InputField: React.FC<{
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
}> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  required = true
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="pl-4 w-full rounded-xl border border-gray-200 py-3 px-4 bg-gray-50/50 
                 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                 hover:bg-gray-50 transition-all duration-300 placeholder:text-gray-400"
      placeholder={placeholder}
    />
  </div>
);

export const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [wordCount, setWordCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "ideaDescription") {
      setWordCount(value.trim().split(/\s+/).length);
    }
  };

  const handleInterestChange = (interest: InterestOption) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (wordCount > 100) {
      setError("Please keep your idea description under 100 words");
      return false;
    }

    if (formData.interests.length === 0) {
      setError("Please select at least one area of support");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData(INITIAL_FORM_STATE);
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="sticky top-0 bg-white px-6 py-4 flex justify-end">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="px-6 pb-6">
                {submitted ? (
                  <div className="text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-bold mt-4">
                      Application Submitted!
                    </h3>
                    <p>
                      Thank you for starting your innovation journey with us.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <InputField
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        label="First Name"
                      />

                      {/* Interest Selection */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Areas of Support Needed
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {interestOptions.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => handleInterestChange(option.id)}
                              className={`p-3 rounded-xl border text-left hover:border-sky-500 transition-colors
                                ${
                                  formData.interests.includes(option.id)
                                    ? "border-sky-500 bg-sky-50"
                                    : "border-gray-200"
                                }`}
                            >
                              <span className="flex items-center gap-2">
                                <span>{option.icon}</span>
                                <span>{option.label}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div>
                      )}

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 px-4 rounded-xl bg-sky-500 text-white font-medium
                                   hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500
                                   focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                                   transition-colors duration-300"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, CheckCircle2 } from "lucide-react";

// interface SignUpModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const interestOptions = [
//   { id: "marketing", label: "Marketing Support", icon: "🎯" },
//   { id: "incubation", label: "Incubation Support", icon: "🌱" },
//   { id: "funding", label: "Funding", icon: "💰" },
//   { id: "mentorship", label: "Mentorship", icon: "👥" },
//   { id: "networking", label: "Networking Opportunities", icon: "🤝" },
//   { id: "technical", label: "Technical Support", icon: "⚙️" }
// ] as const;

// export type InterestOption = (typeof interestOptions)[number]["id"];

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   ideaName: string;
//   ideaDescription: string;
//   interests: InterestOption[];
// }

// const INITIAL_FORM_STATE: FormData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   ideaName: "",
//   ideaDescription: "",
//   interests: []
// };

// const InputField: React.FC<{
//   name: string;
//   type?: string;
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   label: string;
//   required?: boolean;
// }> = ({
//   name,
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   label,
//   required = true
// }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       required={required}
//       value={value}
//       onChange={onChange}
//       className="pl-4 w-full rounded-xl border border-gray-200 py-3 px-4 bg-gray-50/50
//                  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
//                  hover:bg-gray-50 transition-all duration-300 placeholder:text-gray-400"
//       placeholder={placeholder}
//     />
//   </div>
// );

// export const SignUpModal: React.FC<SignUpModalProps> = ({
//   isOpen,
//   onClose
// }) => {
//   const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
//   const [wordCount, setWordCount] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "ideaDescription") {
//       setWordCount(value.trim().split(/\s+/).length);
//     }
//   };

//   const handleInterestChange = (interest: InterestOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       interests: prev.interests.includes(interest)
//         ? prev.interests.filter((i) => i !== interest)
//         : [...prev.interests, interest]
//     }));
//   };

//   const validateForm = (): boolean => {
//     if (!formData.email.includes("@")) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     if (wordCount > 100) {
//       setError("Please keep your idea description under 100 words");
//       return false;
//     }

//     if (formData.interests.length === 0) {
//       setError("Please select at least one area of support");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       setSubmitted(true);
//       setTimeout(() => {
//         onClose();
//         setSubmitted(false);
//         setFormData(INITIAL_FORM_STATE);
//       }, 2000);
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="min-h-screen px-4 text-center flex items-center justify-center">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//               onClick={onClose}
//             />
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
//             >
//               <div className="sticky top-0 bg-white px-6 py-4 flex justify-end">
//                 <motion.button
//                   onClick={onClose}
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
//                 >
//                   <X className="w-5 h-5" />
//                 </motion.button>
//               </div>

//               <div className="px-6 pb-6">
//                 {submitted ? (
//                   <div className="text-center">
//                     <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
//                     <h3 className="text-xl font-bold mt-4">
//                       Application Submitted!
//                     </h3>
//                     <p>
//                       Thank you for starting your innovation journey with us.
//                     </p>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit}>
//                     <InputField
//                       name="firstName"
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       label="First Name"
//                     />
//                     {/* More Input Fields */}
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };
