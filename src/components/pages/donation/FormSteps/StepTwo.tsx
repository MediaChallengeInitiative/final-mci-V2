// components/pages/donation/FormSteps/StepTwo.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { StepTwoProps } from "../types";

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
        required
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
          required
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
          required
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
          required
        />
      </div>
    </div>
  </motion.div>
);

export default StepTwo;
