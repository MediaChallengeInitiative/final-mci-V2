// app/lib/api/categories.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Category {
  id: number;
  name: string;
  slug: string;
  content: string | null;
  total_items: number;
  articles_count: number;
  blog_posts_count: number;
}

interface CategoryDetail extends Category {
  latest_content: Array<{
    id: number;
    title: string;
    slug: string;
    type: "article" | "blog";
    published_at: string;
    created_at: string;
  }>;
}

interface NavigationCategory {
  id: number;
  name: string;
  slug: string;
}

export async function getCategories(
  search?: string
): Promise<{ data: Category[] }> {
  const params = new URLSearchParams(search ? { search } : {});
  const response = await axios.get(`${API_URL}/categories?${params}`);
  return response.data;
}

export async function getCategory(
  slug: string
): Promise<{ data: CategoryDetail }> {
  const response = await axios.get(`${API_URL}/categories/${slug}`);
  return response.data;
}

export async function getNavigationCategories(): Promise<{
  data: NavigationCategory[];
}> {
  const response = await axios.get(`${API_URL}/categories/navigation`);
  return response.data;
}
