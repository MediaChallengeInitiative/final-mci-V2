// components/pages/donation/types.ts
export interface CountryData {
  name: string;
  code: string;
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
}

export interface ProgressStepsProps {
  currentStep: number;
}

export interface StepOneProps {
  donationType: string;
  setDonationType: (type: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  customAmount: string;
  setCustomAmount: (amount: string) => void;
}

export interface StepTwoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  countries: CountryData[];
}

export interface StepThreeProps {
  donationType: string;
  amount: string;
  customAmount: string;
  formData: FormData;
}

export interface FormContainerProps {
  children: React.ReactNode;
}

export interface RestCountryResponse {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  region: string;
}
