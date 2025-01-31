// app/lib/api/donations.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface DonationOverview {
  statistics: {
    total_amount: {
      current_year: number;
      last_year: number;
    };
    total_donors: {
      current_year: number;
      last_year: number;
    };
    recurring_donors: number;
  };
  recent_donations: Array<{
    id: number;
    donor_name: string;
    amount: number;
    currency: string;
    type: string;
    date: string;
  }>;
}

interface MonthlyTotal {
  month: string;
  date: string;
  total_amount: number;
  donation_count: number;
}

interface LeaderboardEntry {
  donor_name: string;
  total_amount: number;
  donation_count: number;
  average_donation: number;
}

interface TypeDistribution {
  [key: string]: number;
}

export async function getDonationOverview(): Promise<{
  data: DonationOverview;
}> {
  const response = await axios.get(`${API_URL}/donations/overview`);
  return response.data;
}

export async function getMonthlyTotals(
  year?: number
): Promise<{ data: MonthlyTotal[] }> {
  const params = new URLSearchParams(year ? { year: year.toString() } : {});
  const response = await axios.get(
    `${API_URL}/donations/monthly-totals?${params}`
  );
  return response.data;
}

export async function getLeaderboard(
  timeframe: "month" | "year" | "all" = "year"
): Promise<{ data: LeaderboardEntry[] }> {
  const response = await axios.get(
    `${API_URL}/donations/leaderboard?timeframe=${timeframe}`
  );
  return response.data;
}

export async function getTypeDistribution(): Promise<{
  data: TypeDistribution;
}> {
  const response = await axios.get(`${API_URL}/donations/type-distribution`);
  return response.data;
}
