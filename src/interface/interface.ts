import { ReactNode } from "react";
import { PortableTextBlock } from "@portabletext/types";

// Basic Sanity reference type
type Reference = {
  _id?: string;
  _type?: string;
  _ref?: string; // Added _ref which is commonly used in Sanity references
};

export interface SanityImage {
  _type: "image"; // Add this line
  asset: Reference;
  hotspot?: boolean;
}

type Slug = {
  current: string;
  currentSlug: string;
};

export interface Author {
  name?: string;
  _id?: string;
  _type?: string;
}

export interface AboutUs {
  title: string;
  currentSlug: Slug;
  shortDescription: PortableTextBlock[];
  description: PortableTextBlock[];
  image: SanityImage;
  key_features: {
    title: string;
    description: PortableTextBlock[];
  }[];
}

export interface Courses {
  title: string;
  currentSlug: Slug;
  shortDescription: PortableTextBlock[];
  description: PortableTextBlock[];
  duration: string;
  image: string;
  instructors?: string[];
}

export interface Curriculum {
  course: string;
  currentSlug: Slug;
  title: string;
  description: string;
  resources?: { url: string; description: PortableTextBlock[] }[];
}

export interface InstructorsData {
  name: string;
  currentSlug: Slug;
  title: string;
  bio: PortableTextBlock[];
  expertise: string[];
  image: SanityImage;
  linkedIn?: string;
}

export interface StaffData {
  name: string;
  title: string;
  currentSlug: Slug;
  bio: PortableTextBlock[];
  image: SanityImage;
}

export interface Theme {
  name: string;
  bg: string;
  text: string;
  cardBg: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  hover: string;
}

export interface ColorSwitcherProps {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  isColorMenuOpen: boolean;
  setIsColorMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StaffPageProps {
  staff: StaffData[];
  page: string | string[];
  totalPages: number;
  per_page: string | string[];
}

export interface StaffCardProps {
  staff: StaffData;
  theme: Theme;
  index: number;
}

export interface Intakes {
  title: string;
  currentSlug: Slug;
  start_date: Date;
  application_deadline: Date;
  description?: PortableTextBlock[];
}

export interface Applications {
  intake: string;
  currentSlug: Slug;
  name: string;
  email: string;
  motivation: string;
  status: string;
}

export interface Students {
  name: string;
  currentSlug: Slug;
  course: string;
  image: SanityImage;
  testimonial: PortableTextBlock[];
}

export interface Testimonials {
  name: string;
  currentSlug: Slug;
  title_position?: string;
  testimonial: PortableTextBlock[];
  image: SanityImage;
  publishedAt: string | Date;
}

export interface NextGenCycle {
  stage: string;
  image: SanityImage;
  description: string;
}

export interface PartnerData {
  partnerName: string;
  currentSlug: Slug;
  image: SanityImage;
  partnerSince: string | Date;
  country: string;
  sectors: string;
  recognition: string;
}

export interface WhereAlumniWorkData {
  employerName: string;
  currentSlug: Slug;
  image: SanityImage;
}

export interface ThematicData {
  name: string;
  currentSlug: Slug;
  image: SanityImage;
  link: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: Slug;
  priority: "firstBlog" | "secondBlog" | "thirdBlog" | "normalBlog";
  author: Reference;
  mainImage: SanityImage;
  categories: Reference[];
  publishedAt: string | Date;
  link: string;
}

export interface ArticleData {
  readingTime: ReactNode;
  excerpt: ReactNode;
  _id: string;
  title: string;
  slug: Slug;
  priority: "firstBlog" | "secondBlog" | "thirdBlog" | "normalBlog";
  author?: Author;
  mainImage: SanityImage;
  categories: Reference[];
  publishedAt: string | Date;
  link: string;
  description?: PortableTextBlock[];
}

export interface ComingSoonItem {
  title: string;
  businessCase?: string;
  solution?: string;
}

export interface SolutionInterface {
  _id?: string;
  _type: "solution";
  title: string;
  slug: Slug;
  leadingAssumption?: string;
  challengeStatement: PortableTextBlock[];
  solution: PortableTextBlock[];
  description: PortableTextBlock[];
  callToAction: PortableTextBlock[];
  icon?: SanityImage;
  coverImage?: SanityImage;
  order?: number;
  comingSoon?: ComingSoonItem[];
  bgColorTo?: string;
  bgColorFrom?: string;
  iconName?: string;
  iconSize?: string;
  challengeTitle?: string;
}

export interface Program {
  _id?: string;
  _type: "program";
  name: string;
  slug: Slug;
  description: PortableTextBlock[];
  programType: "fellowship" | "training" | "innovation";
  status: "active" | "upcoming" | "completed";
  coverImage: SanityImage;
  solution?: Reference; // Remove the generic type parameter
  gallery: SanityImage[];
}

export interface Fellowship {
  _id?: string;
  _type: "fellowship";
  name: string;
  program: Reference;
  durationMonths: number;
  batchNumber: number;
  startDate: string;
  endDate: string;
  fellowshipType: "media" | "communications";
}

export interface Fellow {
  _id?: string;
  _type: "fellow";
  firstName: string;
  lastName: string;
  email: string;
  fellowship: Reference;
  batchYear?: number;
  currentStatus?: "active" | "graduated" | "placed";
  skills?: string[];
  profileImage?: SanityImage;
}

export interface Story {
  _id: string;
  _type: "story";
  title: string;
  slug: {
    current: string;
  };
  content: Array<{
    _type: "block" | "image";
    children?: Array<{ _type: "span"; text: string }>;
  }>;
  author: {
    _ref: string;
    _type: "reference";
  };
  storyType: "solution" | "narrative-change" | "development";
  publishedAt: string;
  tags: string[];
  problemStatement: string;
  solutionApproach: string;
  impact: string;
}

export interface Impact {
  _id: string;
  _type: "impact";
  solution: {
    _ref: string;
    _type: "reference";
  };
  metricName: string;
  value: number;
  measurementDate: string;
  measurementMethod: string;
  description: Array<{
    _type: "block";
    children: Array<{ _type: "span"; text: string }>;
  }>;
}

export interface FellowProfile {
  _type: "fellowProfile";
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  fellowship?: Reference;
  batchYear?: number;
  currentStatus: "active" | "graduated" | "placed";
  skills?: string[];
  profileImage?: SanityImage;
}

// import { ReactNode } from "react";

// type Reference<T> = {
//   _id?: string;
//   _type?: string;
// };

// type Slug = {
//   current: any;
//   currentSlug: string;
// };

// type Image = {
//   asset: Reference<any>;
//   hotspot?: boolean;
// };

// export interface Author {
//   name?: string;
//   _id?: string;
//   _type?: string;
// }

// export interface AboutUs {
//   title: string;
//   currentSlug: Slug;
//   shortDescription: any;
//   description: any;
//   image: Image; // Assuming this is a URL to the image
//   key_features: {
//     title: string;
//     description: any;
//   }[];
// }

// export interface Courses {
//   title: string;
//   currentSlug: Slug;
//   shortDescription: any;
//   description: any;
//   duration: string;
//   image: string; // URL to the image
//   instructors?: string[]; // Assuming this is an array of instructor IDs
// }

// export interface Curriculum {
//   course: string;
//   currentSlug: Slug;
//   title: string;
//   description: string;
//   resources?: { url: string; description: any }[];
// }

// export interface InstructorsData {
//   name: string;
//   currentSlug: Slug;
//   title: string;
//   bio: any;
//   expertise: string[];
//   image: Image;
//   linkedIn?: string;
// }
// // export interface StaffData {
// //   linkedin: any;
// //   twitter: any;
// //   email: any;
// //   name: string;
// //   currentSlug: Slug;
// //   title: string;
// //   bio: any;
// //   image: Image;
// // }

// export interface StaffData {
//   name: string;
//   title: string;
//   currentSlug: Slug;
//   bio: Array<any>;
//   image: Image;
//   // qualifications: string[];
//   // achievements: string[];
//   // expertise: string[];
//   // contact: {
//   //   email: string;
//   //   phone?: string;
//   //   socialLink?: string;
//   // };
// }

// //Start Color Types
// export interface Theme {
//   name: string;
//   bg: string;
//   text: string;
//   cardBg: string;
//   gradientFrom: string;
//   gradientVia: string;
//   gradientTo: string;
//   hover: string;
// }

// export interface ColorSwitcherProps {
//   currentTheme: Theme;
//   setCurrentTheme: (theme: Theme) => void;
//   isColorMenuOpen: boolean;
//   setIsColorMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export interface StaffPageProps {
//   staff: StaffData[];
//   page: string | string[];
//   totalPages: number;
//   per_page: string | string[];
// }

// export interface StaffCardProps {
//   staff: StaffData;
//   theme: Theme;
//   index: number;
// }

// //End Color Types

// export interface Intakes {
//   title: string;
//   currentSlug: Slug;
//   start_date: Date;
//   application_deadline: Date;
//   description?: any;
// }

// export interface Applications {
//   intake: string;
//   currentSlug: Slug;
//   name: string;
//   email: string;
//   motivation: string;
//   status: string;
// }

// export interface Students {
//   name: string;
//   currentSlug: Slug;
//   course: string;
//   image: Image;
//   testimonial: any;
// }

// export interface Testimonials {
//   name: string;
//   currentSlug: Slug;
//   title_position?: string;
//   testimonial: any;
//   image: Image;
//   publishedAt: string | Date;
// }

// export interface NextGenCycle {
//   stage: string;
//   image: Image;
//   description: string;
// }

// export interface PartnerData {
//   partnerName: string;
//   currentSlug: Slug;
//   image: Image;
//   partnerSince: any;
//   country: string;
//   sectors: string;
//   recognition: string;
// }

// export interface WhereAlumniWorkData {
//   employerName: string;
//   currentSlug: Slug;
//   image: Image;
// }

// export interface ThematicData {
//   name: string;
//   currentSlug: Slug;
//   image: Image;
//   link: string;
// }

// export interface Blog {
//   _id: string;
//   title: string;
//   slug: Slug;
//   priority: "firstBlog" | "secondBlog" | "thirdBlog" | "normalBlog";
//   author: Reference<Author>;
//   mainImage: Image;
//   categories: Reference<any>[];
//   publishedAt: string | Date;
//   link: string;
// }
// export interface ArticleData {
//   readingTime: ReactNode;
//   excerpt: ReactNode;
//   _id: string;
//   title: string;
//   slug: Slug;
//   priority: "firstBlog" | "secondBlog" | "thirdBlog" | "normalBlog";
//   author?: Author;
//   mainImage: Image;
//   categories: Reference<any>[];
//   publishedAt: string | Date;
//   link: string;
//   description?: any;
// }

// export interface ComingSoonItem {
//   title: string;
//   businessCase?: string;
//   solution?: string;
// }

// export interface SolutionInterface {
//   _id?: string;
//   _type: "solution";
//   title: string;
//   slug: Slug;
//   leadingAssumption?: string;
//   challengeStatement: any[]; // Array of blocks for rich text
//   solution: any[]; // Array of blocks for explaining the solution
//   description: any[]; // Array of blocks for the solution description
//   callToAction: any[]; // Array of blocks for the call to action
//   icon?: Image; // Optional image for the solution icon
//   coverImage?: Image; // Optional image for the solution icon
//   order?: number; // Optional order for display
//   comingSoon?: ComingSoonItem[]; // Array of coming soon items
//   bgColorTo?: string; // Background color to
//   bgColorFrom?: string; // Background color from
//   iconName?: string; // Name of the icon
//   iconSize?: string; // Size of the icon
//   challengeTitle?: string; // Title for the challenge
// }

// export interface Program {
//   _id?: string;
//   _type: "program";
//   name: string;
//   slug: Slug;
//   description: any[]; // Array of blocks for rich text, Sanity uses `block` type for descriptions
//   programType: "fellowship" | "training" | "innovation"; // Enum for program types
//   status: "active" | "upcoming" | "completed"; // Enum for the status
//   coverImage: Image; // The main cover image for the program
//   solution?: Reference<SolutionInterface>; // Optional reference to the related solution
//   gallery: Image[]; // Array of images for the gallery
// }

// export interface Fellowship {
//   _id?: string;
//   _type: "fellowship";
//   name: string;
//   program: Reference<Program>; // Reference to the Program schema
//   durationMonths: number;
//   batchNumber: number;
//   startDate: string; // Stored as a string in the format 'YYYY-MM-DD'
//   endDate: string; // Stored as a string in the format 'YYYY-MM-DD'
//   fellowshipType: "media" | "communications"; // Enums for fellowship type
// }

// export interface Fellow {
//   _id?: string;
//   _type: "fellow";
//   firstName: string;
//   lastName: string;
//   email: string;
//   fellowship: Reference<Fellowship>; // Reference to another document (Fellowship)
//   batchYear?: number;
//   currentStatus?: "active" | "graduated" | "placed";
//   skills?: string[];
//   profileImage?: Image;
// }

// export interface Story {
//   _id: string;
//   _type: "story";
//   title: string;
//   slug: {
//     current: string;
//   };
//   content: Array<{
//     _type: "block" | "image";
//     children?: Array<{ _type: "span"; text: string }>;
//   }>;
//   author: {
//     _ref: string;
//     _type: "reference";
//   };
//   storyType: "solution" | "narrative-change" | "development";
//   publishedAt: string; // ISO date string
//   tags: string[];
//   problemStatement: string;
//   solutionApproach: string;
//   impact: string;
// }

// export interface Impact {
//   _id: string;
//   _type: "impact";
//   solution: {
//     _ref: string;
//     _type: "reference";
//   };
//   metricName: string;
//   value: number;
//   measurementDate: string; // ISO date string
//   measurementMethod: string;
//   description: Array<{
//     _type: "block";
//     children: Array<{ _type: "span"; text: string }>;
//   }>;
// }

// export interface FellowProfile {
//   _type: "fellowProfile";
//   _id?: string;
//   firstName: string;
//   lastName: string;
//   email?: string;
//   fellowship?: Reference<Fellowship>;
//   batchYear?: number;
//   currentStatus: "active" | "graduated" | "placed";
//   skills?: string[];
//   profileImage?: Image;
// }
