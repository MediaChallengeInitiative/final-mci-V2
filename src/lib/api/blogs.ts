// lib/api/blogs.ts
import {
  Blog,
  BlogsResponse,
  SingleBlogResponse,
  Category
} from "@/types/blog";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBlogs(
  page = 1,
  category?: string,
  search?: string
): Promise<BlogsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category }),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/blogs?${params}`);
  return response.data;
}

export async function getBlog(slug: string): Promise<SingleBlogResponse> {
  const response = await axios.get(`${API_URL}/blogs/${slug}`);
  return response.data;
}

export async function getCategories(): Promise<{ data: Category[] }> {
  const response = await axios.get(`${API_URL}/blogs/categories`);
  return response.data;
}

export async function getRecentBlogs(
  excludeSlug: string
): Promise<BlogsResponse> {
  const response = await axios.get(`${API_URL}/blogs/recent/${excludeSlug}`);
  return response.data;
}
