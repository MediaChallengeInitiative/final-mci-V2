// app/lib/api/donors.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface DonorStatistics {
  total_donors: {
    current_year: number;
    last_year: number;
    total: number;
  };
  active_donors: {
    count: number;
    percentage: number;
  };
  donor_locations: Array<{
    country: string;
    count: number;
  }>;
  recent_donors: Array<{
    id: number;
    name: string;
    country: string;
    joined_date: string;
  }>;
}

interface TopDonor {
  id: number;
  name: string;
  country: string;
  donation_count: number;
  total_amount: number;
  average_amount: number;
}

interface GrowthData {
  month: string;
  new_donors: number;
  active_donors: number;
}

interface GeoDistribution {
  counts: { [country: string]: number };
  percentages: { [country: string]: number };
}

interface RetentionRate {
  year: number;
  retention_rate: number;
}

export async function getDonorOverview(): Promise<{ data: DonorStatistics }> {
  const response = await axios.get(`${API_URL}/donors/overview`);
  return response.data;
}

export async function getTopDonors(
  timeframe: "month" | "year" | "all" = "year",
  limit: number = 10
): Promise<{ data: TopDonor[] }> {
  const params = new URLSearchParams({ timeframe, limit: limit.toString() });
  const response = await axios.get(`${API_URL}/donors/top?${params}`);
  return response.data;
}

export async function getDonorGrowth(): Promise<{ data: GrowthData[] }> {
  const response = await axios.get(`${API_URL}/donors/growth`);
  return response.data;
}

export async function getGeoDistribution(): Promise<{ data: GeoDistribution }> {
  const response = await axios.get(`${API_URL}/donors/geo-distribution`);
  return response.data;
}

export async function getRetentionRates(): Promise<{ data: RetentionRate[] }> {
  const response = await axios.get(`${API_URL}/donors/retention-rates`);
  return response.data;
}
