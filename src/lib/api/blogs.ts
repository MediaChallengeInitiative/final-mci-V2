// app/lib/api/blogs.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string | null;
  read_time: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  published_at: string;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  blog_posts_count: number;
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

export async function getBlogPosts(
  page = 1,
  category?: string,
  search?: string
): Promise<PaginatedResponse<BlogPost>> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category }),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/blogs?${params}`);
  return response.data;
}

export async function getBlogPost(slug: string): Promise<{ data: BlogPost }> {
  const response = await axios.get(`${API_URL}/blogs/${slug}`);
  return response.data;
}

export async function getCategories(): Promise<{ data: Category[] }> {
  const response = await axios.get(`${API_URL}/blogs/categories`);
  return response.data;
}

export async function getRelatedPosts(
  slug: string
): Promise<{ data: BlogPost[] }> {
  const response = await axios.get(`${API_URL}/blogs/related/${slug}`);
  return response.data;
}
