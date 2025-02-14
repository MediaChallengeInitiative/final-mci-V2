// types/article.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface BaseArticle {
  id: number;
  title: string;
  slug: string;
  image_url: string | null;
  category: Category;
  published_at: string;
  created_at: string;
}

// Extended interface for full article with content
export interface Article extends BaseArticle {
  content: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ArticlesResponse {
  data: BaseArticle[];
  meta: PaginationMeta;
}

export interface SingleArticleResponse {
  data: Article;
}
