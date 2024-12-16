import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface FeatureCardProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
  benefits?: string[];
}

// import { ReactNode } from "react";

// export interface FeatureCardProps {
//   icon: ReactNode;
//   title: string;
//   description: string;
//   benefits?: string[];
//   index: number;
// }
