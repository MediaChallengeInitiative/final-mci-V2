// types/articleData.ts
export interface ArticleData {
  title: string;
  publishedAt: string;
  content: string;
  mainImage: {
    url: string;
  };
  description: Array<{
    _key: string;
    _type: string;
    children: Array<{
      _key: string;
      _type: string;
      text: string;
      marks: string[];
    }>;
    markDefs: Array<any>;
    style: string;
  }>;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  author?: {
    name: string;
  };
}
