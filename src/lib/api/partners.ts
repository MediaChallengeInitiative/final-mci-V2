// app/lib/api/partners.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Partner {
  id: number;
  name: string;
  slug: string;
  website: string | null;
  logo_url: string | null;
  created_at: string;
}

interface PartnerLogo {
  id: number;
  name: string;
  logo_url: string;
  website: string | null;
}

interface AlphabeticalPartners {
  [letter: string]: Partner[];
}

export async function getPartners(
  search?: string
): Promise<{ data: Partner[] }> {
  const params = new URLSearchParams(search ? { search } : {});
  const response = await axios.get(`${API_URL}/partners?${params}`);
  return response.data;
}

export async function getPartner(slug: string): Promise<{ data: Partner }> {
  const response = await axios.get(`${API_URL}/partners/${slug}`);
  return response.data;
}

export async function getFeaturedPartners(): Promise<{ data: Partner[] }> {
  const response = await axios.get(`${API_URL}/partners/featured`);
  return response.data;
}

export async function getAlphabeticalPartners(): Promise<{
  data: AlphabeticalPartners;
}> {
  const response = await axios.get(`${API_URL}/partners/alphabetical`);
  return response.data;
}

export async function getPartnerLogos(): Promise<{ data: PartnerLogo[] }> {
  const response = await axios.get(`${API_URL}/partners/logos`);
  return response.data;
}
