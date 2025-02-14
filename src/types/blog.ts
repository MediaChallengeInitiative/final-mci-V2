// types/blog.ts
export interface BaseBlog {
  id: number;
  title: string;
  slug: string;
  link: string;
  image_url: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  creator: string | null;
  published_at: string;
  created_at: string;
}

export interface Blog extends BaseBlog {
  // Add any additional fields specific to full blog posts
}

export interface BlogsResponse {
  data: Blog[];
  meta: {
    current_page: number[];
    last_page: number[];
    per_page: number[];
    total: number[];
    from: number;
    to: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface SingleBlogResponse {
  data: Blog;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}
