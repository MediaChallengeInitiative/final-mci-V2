// types/history.ts

export interface BaseHistory {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface History extends BaseHistory {
  creator?: {
    id: number;
    name: string;
  };
  updater?: {
    id: number;
    name: string;
  };
}

export interface TimelineEntry {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  slug: string;
}

export interface HistoryDetail {
  current: History;
  previous: History | null;
  next: History | null;
}

export interface Statistics {
  total_entries: number;
  with_images: number;
  latest_addition: string | null;
  last_update: string | null;
}

export interface HistoriesResponse {
  data: History[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface TimelineResponse {
  data: TimelineEntry[];
}

export interface SingleHistoryResponse {
  data: History;
}

export interface HistoryDetailResponse {
  data: HistoryDetail;
}

export interface StatisticsResponse {
  data: Statistics;
}
