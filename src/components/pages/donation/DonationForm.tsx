// components/pages/donation/DonationForm.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import axios from "axios";
import dynamic from "next/dynamic";
import { FormData, CountryData, RestCountryResponse } from "../donation/types";

// Dynamic imports for steps
const StepOne = dynamic(() => import("./FormSteps/StepOne"), {
  loading: () => <LoadingSpinner />
});

const StepTwo = dynamic(() => import("./FormSteps/StepTwo"), {
  loading: () => <LoadingSpinner />
});

const StepThree = dynamic(() => import("./FormSteps/StepThree"), {
  loading: () => <LoadingSpinner />
});

const ProgressSteps = dynamic(
  () => import("../donation/FormSteps/ProgressSteps"),
  {
    loading: () => <LoadingSpinner />
  }
);

const LoadingSpinner = () => (
  <div className="w-full h-[200px] flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
  </div>
);

const FormContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <div className="relative -mt-16 sm:-mt-24 md:-mt-32 container mx-auto px-4 pb-12 sm:pb-16 md:pb-24">
    <div className="w-full md:w-[85%] lg:w-[75%] xl:w-[65%] mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl min-h-[500px] sm:min-h-[600px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-sky-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-[#f6931d]/10 rounded-full blur-3xl -z-10" />
        {children}
      </div>
    </div>
  </div>
);

const DonationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Form states
  const [donationType, setDonationType] = useState<string>("once");
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    address: ""
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<RestCountryResponse[]>(
          "https://restcountries.com/v3.1/all"
        );
        const sortedCountries: CountryData[] = response.data
          .map((country: RestCountryResponse) => ({
            name: country.name.common,
            code: country.cca2
          }))
          .sort((a: CountryData, b: CountryData) =>
            a.name.localeCompare(b.name)
          );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const nextStep = () => {
    // Validation before proceeding
    if (currentStep === 1 && (!donationType || !amount)) {
      alert("Please select donation type and amount");
      return;
    }
    if (currentStep === 2 && (!formData.fullName || !formData.email)) {
      alert("Please fill in required fields");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <FormContainer>
      <Suspense fallback={<LoadingSpinner />}>
        <ProgressSteps currentStep={currentStep} />

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepOne
              donationType={donationType}
              setDonationType={setDonationType}
              amount={amount}
              setAmount={setAmount}
              customAmount={customAmount}
              setCustomAmount={setCustomAmount}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              formData={formData}
              setFormData={setFormData}
              countries={countries}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              donationType={donationType}
              amount={amount}
              customAmount={customAmount}
              formData={formData}
            />
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              className="group flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all"
            >
              <motion.div
                className="transition-transform"
                whileHover={{ x: -3 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.div>
              Back
            </motion.button>
          )}
          {currentStep < 3 && (
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="group ml-auto flex items-center gap-2 px-6 py-3 bg-sky-500 rounded-xl text-white hover:shadow-lg hover:shadow-sky-500/25 transition-all"
            >
              Next
              <motion.div
                className="transition-transform"
                whileHover={{ x: 3 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          )}
        </div>
      </Suspense>
    </FormContainer>
  );
};

export default DonationForm;
