// app/lib/api/articles.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Article {
  id: number;
  title: string;
  slug: string;
  link: string;
  image: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  published_at: string;
  created_at: string;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export async function getArticles(
  page = 1,
  category?: string,
  search?: string
): Promise<PaginatedResponse<Article>> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category }),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/articles?${params}`);
  return response.data;
}

export async function getArticle(slug: string): Promise<{ data: Article }> {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  return response.data;
}

export async function getCategories() {
  const response = await axios.get(`${API_URL}/articles/categories`);
  return response.data;
}

export async function getRecentArticles(excludeSlug: string) {
  const response = await axios.get(`${API_URL}/articles/recent/${excludeSlug}`);
  return response.data;
}
