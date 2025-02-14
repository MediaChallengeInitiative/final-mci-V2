// types/inquiry.ts

export interface BaseInquiry {
  first_name: string;
  last_name: string;
  email: string;
  subject: string | null; // Changed from optional to nullable
  message: string;
}

export interface Inquiry extends BaseInquiry {
  id: number;
  created_at: string;
  updated_at: string;
  ip_address?: string;
  user_agent?: string;
}

export interface InquiriesResponse {
  data: Inquiry[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface SingleInquiryResponse {
  data: Inquiry;
}

export interface InquiryFormData extends BaseInquiry {
  // Using null instead of undefined for optional fields
  subject: string | null;
}
