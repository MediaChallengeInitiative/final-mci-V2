import StaffPage from "@/components/staff/StaffPage";
import { getAllStaff, getTotalStaff } from "@/utils/get-all-staff";
import ErrorPage from "@/components/ErrorPage";

// Remove conflicting configurations and keep what's necessary
export const runtime = "edge";
export const preferredRegion = "auto";
// Remove force-static as it conflicts with edge runtime
export const revalidate = 3600;

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  searchParams: SearchParams;
}

function parsePageParam(
  pageParam: string | string[] | undefined,
  defaultValue: number = 1
): number {
  const page = Number(pageParam);
  return isNaN(page) || page < 1 ? defaultValue : Math.floor(page);
}

function parsePerPageParam(
  perPageParam: string | string[] | undefined,
  defaultValue: number = 8
): number {
  const perPage = Number(perPageParam);
  return isNaN(perPage) || perPage < 1 || perPage > 100
    ? defaultValue
    : Math.floor(perPage);
}

export default async function PageWrapper({ searchParams }: PageProps) {
  const page = parsePageParam(searchParams["page"]);
  const per_page = parsePerPageParam(searchParams["per_page"]);
  const start = (page - 1) * per_page;
  const end = start + per_page;

  try {
    // Fetch staff data and total count in parallel
    const [staff, total] = await Promise.all([
      getAllStaff(start, end),
      getTotalStaff()
    ]);

    const totalPages = Math.ceil(total / per_page);

    return (
      <StaffPage
        staff={staff}
        page={String(page)}
        totalPages={totalPages}
        per_page={String(per_page)}
      />
    );
  } catch (error) {
    console.error("Error fetching staff data:", error);
    return (
      <ErrorPage message="Failed to load staff data. Please try again later." />
    );
  }
}
