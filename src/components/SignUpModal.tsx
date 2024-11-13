// components/SignUpModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Building2,
  BookOpen,
  Target,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

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
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="pl-10 w-full rounded-xl border border-gray-200 py-3 px-4 bg-gray-50/50 
                   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                   hover:bg-gray-50 transition-all duration-300 placeholder:text-gray-400"
        placeholder={placeholder}
      />
    </div>
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
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData(INITIAL_FORM_STATE);
      }, 2000);
    } catch (err) {
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
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl min-h-[200px] bg-white rounded-2xl shadow-xl
                        overflow-hidden mx-auto my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header with sticky close button */}
              <div className="sticky top-0 z-50 bg-white pt-4 px-6 pb-0 flex justify-end">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full 
                           hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, ease: "linear" }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Application Submitted!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for starting your innovation journey with us.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center p-2 bg-sky-50 rounded-xl mb-4">
                        <Sparkles className="w-6 h-6 text-sky-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Start Your Innovation Journey
                      </h2>
                      <p className="text-gray-600">
                        Tell us about your innovative idea and how we can help
                        you bring it to life.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                        //   icon={<User className="w-5 h-5" />}
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          label="First Name"
                        />
                        <InputField
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          label="Last Name"
                        />
                      </div>

                      <InputField
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email Address"
                      />

                      <InputField
                        name="ideaName"
                        placeholder="Your innovative idea name"
                        value={formData.ideaName}
                        onChange={handleChange}
                        label="Idea/Innovation Name"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Idea Description
                          <span
                            className={`ml-2 ${wordCount > 100 ? "text-red-500" : "text-gray-400"}`}
                          >
                            ({wordCount}/100 words)
                          </span>
                        </label>
                        <div className="relative flex items-start">
                          <div className="absolute left-4 top-3.5 text-gray-400">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <textarea
                            name="ideaDescription"
                            required
                            value={formData.ideaDescription}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe your innovative idea in detail..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl
                                     focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                                     hover:border-gray-300 transition-all duration-300
                                     placeholder:text-gray-400 text-gray-900 resize-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          What support are you looking for?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {interestOptions.map((option) => (
                            <motion.label
                              key={option.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative flex items-center p-3 rounded-xl cursor-pointer
                                        ${
                                          formData.interests.includes(option.id)
                                            ? "bg-sky-50 border-2 border-sky-500"
                                            : "bg-white border border-gray-200 hover:border-gray-300"
                                        } transition-all duration-300`}
                            >
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={formData.interests.includes(option.id)}
                                onChange={() => handleInterestChange(option.id)}
                              />
                              <span className="text-xl mr-3">
                                {option.icon}
                              </span>
                              <span className="text-sm font-medium text-gray-700">
                                {option.label}
                              </span>
                            </motion.label>
                          ))}
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">{error}</span>
                        </motion.div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-xl font-medium text-lg
                                  flex items-center justify-center gap-2 relative overflow-hidden
                                  ${
                                    isSubmitting
                                      ? "bg-gray-100 text-gray-400"
                                      : "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700"
                                  } border-2 border-sky-500 transition-all duration-300 shadow-lg hover:shadow-xl
                                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                                  disabled:cursor-not-allowed`}
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 bg-sky-500 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Target className="w-5 h-5" />
                            <span className="text-sky-500">Submit Application</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
