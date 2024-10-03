type Reference<T> = {
  _id?: string;
  _type?: string;
};

type Slug = {
  currentSlug: string;
};

type Image = {
  asset: Reference<any>;
  hotspot?: boolean;
};

export interface Author {
  name?: string;
  _id?: string;
  _type?: string;
}

export interface AboutUs {
  title: string;
  currentSlug: Slug;
  shortDescription: any;
  description: any;
  image: Image; // Assuming this is a URL to the image
  key_features: {
    title: string;
    description: any;
  }[];
}

export interface Courses {
  title: string;
  currentSlug: Slug;
  shortDescription: any;
  description: any;
  duration: string;
  image: string; // URL to the image
  instructors?: string[]; // Assuming this is an array of instructor IDs
}

export interface Curriculum {
  course: string;
  currentSlug: Slug;
  title: string;
  description: string;
  resources?: { url: string; description: any }[];
}

export interface InstructorsData {
  name: string;
  currentSlug: Slug;
  title: string;
  bio: any;
  expertise: string[];
  image: Image;
  linkedIn?: string;
}
export interface StaffData {
  name: string;
  currentSlug: Slug;
  title: string;
  bio: any;
  image: Image;
}

export interface Intakes {
  title: string;
  currentSlug: Slug;
  start_date: Date;
  application_deadline: Date;
  description?: any;
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
  image: Image;
  testimonial: any;
}

export interface Testimonials {
  name: string;
  currentSlug: Slug;
  title_position?: string;
  testimonial: any;
  image: Image;
  publishedAt: string | Date;
}

export interface NextGenCycle {
  stage: string;
  image: Image;
  description: string;
}

export interface PartnerData {
  partnerName: string;
  currentSlug: Slug;
  image: Image;
  partnerSince: any;
  country: string;
  sectors: string;
  recognition: string;
}
export interface ThematicData {
  name: string;
  currentSlug: Slug;
  image: Image;
  link: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: Slug;
  priority: "firstBlog" | "secondBlog" | "thirdBlog" | "normalBlog";
  author: Reference<Author>;
  mainImage: Image;
  categories: Reference<any>[];
  publishedAt: string | Date;
  link: string;
}
export interface ArticleData {
  _id: string;
  title: string;
  slug: Slug;
  priority: "firstBlog" | "secondBlog" | "thirdBlog" | "normalBlog";
  author?: Author;
  mainImage: Image;
  categories: Reference<any>[];
  publishedAt: string | Date;
  link: string;
  description?: any;
}
