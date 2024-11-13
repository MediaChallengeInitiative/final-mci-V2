import { IconType } from "react-icons";

export interface Statistic {
  icon: IconType;
  number: string;
  text: string;
  category: "broadcast" | "social" | "print" | "education" | "career";
  description: string;
  highlight: string;
}

export interface SuccessStory {
  name: string;
  role: string;
  story: string;
  achievement: string;
  image: string;
}

export interface ImpactGalleryItem {
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface ImpactGalleryItem {
    title: string;
    description: string;
    image: string;
    category: string;
    date?: string;
    location?: string;
  }
