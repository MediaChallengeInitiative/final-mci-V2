// app/lib/api/annual-reports.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getReports(page = 1, search?: string, year?: number) {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(search && { search }),
    ...(year && { year: year.toString() })
  });

  const response = await axios.get(`${API_URL}/annual-reports?${params}`);
  return response.data;
}

export async function getReport(id: number) {
  const response = await axios.get(`${API_URL}/annual-reports/${id}`);
  return response.data;
}

export async function getYears() {
  const response = await axios.get(`${API_URL}/annual-reports/years`);
  return response.data;
}

export function getDownloadUrl(id: number) {
  return `${API_URL}/annual-reports/${id}/download`;
}
