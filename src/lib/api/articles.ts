// lib/api/articles.ts

import axios from "axios";
import {
  BaseArticle,
  Article,
  ArticlesResponse,
  SingleArticleResponse
} from "@/types/article";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getArticles(
  page = 1,
  category?: string,
  search?: string
): Promise<ArticlesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category }),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/articles?${params}`);
  return response.data;
}

export async function getArticle(slug: string): Promise<SingleArticleResponse> {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  return response.data;
}

export async function getCategories() {
  const response = await axios.get(`${API_URL}/articles/categories`);
  return response.data;
}

export async function getRecentArticles(
  excludeSlug: string
): Promise<ArticlesResponse> {
  const response = await axios.get(`${API_URL}/articles/recent/${excludeSlug}`);
  return response.data;
}
