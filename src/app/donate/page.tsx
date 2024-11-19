"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import {
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronRight,
  ChevronLeft,
  Check,
  HandHeart,
  Newspaper,
  Users
} from "lucide-react";
import axios from "axios";
import Image from "next/image";

// Types
interface ProgressStepsProps {
  currentStep: number;
}

interface StepOneProps {
  donationType: string;
  setDonationType: (type: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  customAmount: string;
  setCustomAmount: (amount: string) => void;
}

interface StepTwoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  countries: Country[];
}

interface StepThreeProps {
  donationType: string;
  amount: string;
  customAmount: string;
  formData: FormData;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
}

interface Country {
  name: string;
  code: string;
}

// Components
const WaveOverlay: React.FC = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden">
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="relative block w-full h-24"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        className="fill-sky-900/10"
      />
    </svg>
  </div>
);

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => (
  <div className="flex justify-between mb-8 sm:mb-12 relative px-2 sm:px-4">
    {[1, 2, 3].map((step) => (
      <div key={step} className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={false}
          animate={{
            scale: currentStep >= step ? 1.1 : 1,
            backgroundColor:
              currentStep >= step
                ? "rgb(14, 165, 233)"
                : "rgba(255, 255, 255, 0.1)"
          }}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
              ${currentStep >= step ? "bg-sky-500" : "bg-white/10"}`}
        >
          {currentStep > step ? (
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <span className="text-sm sm:text-base text-white">{step}</span>
          )}
        </motion.div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-sky-200 whitespace-nowrap">
          {step === 1
            ? "Choose Amount"
            : step === 2
              ? "Your Details"
              : "Payment"}
        </div>
      </div>
    ))}
    <div className="absolute top-4 sm:top-5 left-0 w-full h-0.5 bg-white/10 -z-10">
      <motion.div
        className="h-full bg-sky-500"
        initial={{ width: "0%" }}
        animate={{ width: `${(currentStep - 1) * 50}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </div>
);

const StepOne: React.FC<StepOneProps> = ({
  donationType,
  setDonationType,
  amount,
  setAmount,
  customAmount,
  setCustomAmount
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-6 sm:space-y-8"
  >
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-white">
        Select Donation Type
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {["once", "monthly", "annual"].map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDonationType(type)}
            className={`px-4 py-3 rounded-xl capitalize transition-all text-sm sm:text-base
              ${
                donationType === type
                  ? "bg-sky-500 text-white"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
          >
            {type}
          </motion.button>
        ))}
      </div>
    </div>

    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-white">
        Select Amount
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {["50", "100", "200", "500", "1000", "custom"].map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setAmount(value);
              if (value !== "custom") setCustomAmount("");
            }}
            className={`px-4 py-3 rounded-xl transition-all text-sm sm:text-base
              ${
                amount === value
                  ? "bg-sky-500 text-white"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
          >
            {value === "custom" ? "Custom" : `$${value}`}
          </motion.button>
        ))}
      </div>

      {/* Custom amount input */}
      {amount === "custom" && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="pt-2"
        >
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white text-sm sm:text-base"
          />
        </motion.div>
      )}
    </div>
  </motion.div>
);

const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  setFormData,
  countries
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-6"
  >
    <div className="space-y-2">
      <label className="text-sm text-sky-200">Full Name *</label>
      <input
        type="text"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        className="w-full px-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
        placeholder="Enter your full name"
      />
    </div>

    <div className="space-y-2">
      <label className="text-sm text-sky-200">Email Address *</label>
      <div className="relative">
        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-sky-300" />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
          placeholder="Enter your email"
        />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm text-sky-200">Phone Number (Optional)</label>
      <div className="relative">
        <Phone className="absolute left-4 top-3.5 h-5 w-5 text-sky-300" />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
          placeholder="Enter your phone number"
        />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm text-sky-200">Country *</label>
      <div className="relative">
        <Globe className="absolute left-4 top-3.5 h-5 w-5 text-sky-300" />
        <select
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white appearance-none"
        >
          <option value="">Select your country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm text-sky-200">Address *</label>
      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-sky-300" />
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
          placeholder="Enter your address"
          rows={3}
        />
      </div>
    </div>
  </motion.div>
);

const StepThree: React.FC<StepThreeProps> = ({
  donationType,
  amount,
  customAmount,
  formData
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-8"
  >
    <div className="bg-white/5 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-white">Donation Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sky-200">
          <span>Amount:</span>
          <span className="font-semibold text-white">
            ${amount === "custom" ? customAmount : amount}
          </span>
        </div>
        <div className="flex justify-between text-sky-200">
          <span>Type:</span>
          <span className="font-semibold text-white capitalize">
            {donationType}
          </span>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Payment Details</h3>
      <div className="space-y-4">
        <div className="relative">
          <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-sky-300" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
            placeholder="Card number"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="px-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
            placeholder="MM/YY"
          />
          <input
            type="text"
            className="px-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
            placeholder="CVC"
          />
        </div>
      </div>
    </div>

    <button className="w-full py-4 bg-sky-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-500/25 transition-all">
      Complete Donation
    </button>
  </motion.div>
);

const ParallaxText: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
};

// Form Container Component
const FormContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <div className="relative -mt-16 sm:-mt-24 md:-mt-32 container mx-auto px-4 pb-12 sm:pb-16 md:pb-24">
    <div className="w-full md:w-[85%] lg:w-[75%] xl:w-[65%] mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl min-h-[500px] sm:min-h-[600px] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-sky-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-[#f6931d]/10 rounded-full blur-3xl -z-10" />
        {children}
      </div>
    </div>
  </div>
);

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const sortedCountries: Country[] = response.data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-gray-900 relative overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute -top-48 -left-48 w-96 h-96"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-sky-500/30 relative overflow-hidden">
          <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-sky-500/10 to-[#f6931d]/10 backdrop-blur-xl" />
          <motion.div
            className="absolute inset-0"
            animate={{
              borderColor: [
                "rgba(14, 165, 233, 0.2)",
                "rgba(251, 146, 60, 0.2)"
              ],
              rotate: 360
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ borderRadius: "100%", border: "2px solid" }}
          />
        </div>
      </motion.div>

      {/* Similar circles for bottom-right and top-right */}
      <motion.div
        className="absolute -bottom-24 -right-24 w-96 h-96"
        animate={{
          rotate: -360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Similar circle structure */}
      </motion.div>

      <motion.div
        className="absolute top-1/4 -right-32 w-64 h-64"
        animate={{
          rotate: 180,
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Similar circle structure */}
      </motion.div>

      <HeroSection />

      <FormContainer>
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

        {/* Enhanced Navigation Buttons */}
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
      </FormContainer>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/assets/images/hero/hero-1.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-sky-900/50 to-slate-950/90" />
      </motion.div>

      {/* Grid Pattern - Responsive sizing */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2 border border-sky-500/20 rounded-full bg-sky-500/10 backdrop-blur-sm"
          >
            <span className="text-sm sm:text-base text-sky-300 font-medium">
              {/* Building Africa's Media Future */}A Humane Media That Shapes
              The Future
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight font-display"
          >
            Join the Movement,
            <span className="block text-[#f6931d]">Fund the Change</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white mx-auto font-light leading-relaxed italic px-4"
          >
            Support the next generation of journalists, content creators, and
            story leaders. Your investment will empower a new era of informed
            and engaged citizens.
          </motion.p>

          {/* Stats Cards - Responsive grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 px-4"
          >
            {/* Stats Card 1 */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-sky-500/50 transition-all duration-300"
            >
              <HandHeart className="w-6 h-6 sm:w-8 sm:h-8 text-sky-400 mb-2 sm:mb-3" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                3000+
              </h3>
              <p className="text-sm sm:text-base text-sky-200">
                Journalists Trained
              </p>
            </motion.div>

            {/* Stats Card 2 */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#f6931d]/50 transition-all duration-300"
            >
              <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mb-2 sm:mb-3" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                30+
              </h3>
              <p className="text-sm sm:text-base text-sky-200">
                African Countries
              </p>
            </motion.div>

            {/* Stats Card 3 */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-sky-500/50 transition-all duration-300 sm:col-span-2 md:col-span-1 mx-auto w-full"
            >
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-sky-400 mb-2 sm:mb-3" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                12+
              </h3>
              <p className="text-sm sm:text-base text-sky-200">
                Years Experience
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <WaveOverlay />
    </section>
  );
};
export default Page;
