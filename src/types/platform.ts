// types/platform.ts
export interface BasePlatform {
  id: number;
  name: string;
  link: string;
  description: string;
  logo_url: string | null;
  created_at: string;
}

export interface Platform extends BasePlatform {
  // Additional fields for full platform details
}

export interface PlatformsResponse {
  data: Platform[];
}

export interface SinglePlatformResponse {
  data: Platform;
}

export interface PlatformLogo {
  id: number;
  name: string;
  link: string;
  logo_url: string;
}
