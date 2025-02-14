import { ReactNode } from "react";

// types/innovator.ts
export interface BaseInnovator {
  id: number;
  name: string;
  slug: string;
  logo: string;
  image: string;
  short_description: string;
  website_link: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

export interface Innovator extends BaseInnovator {
  location: any;
  description: ReactNode;
  achievements: any;
  creator: User;
  updater: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  deactivation_date: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role_names: string[];
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface InnovatorsResponse {
  data: BaseInnovator[];
  meta: PaginationMeta;
}

export interface SingleInnovatorResponse {
  data: Innovator;
}
