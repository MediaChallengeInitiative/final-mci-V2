// app/lib/api/events.ts

import axios from "axios";
import { format, parseISO } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface Event {
  id: number;
  name: string;
  about_event: string;
  location: string;
  date: string;
  time: string;
  main_speaker: string;
  image: string | null;
  category_id: number;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
  };
  creator?: {
    id: number;
    name: string;
  };
  updater?: {
    id: number;
    name: string;
  };
}

export interface EventDetail extends Event {
  attendees_count: number;
  duration: number;
  is_full: boolean;
  next_event: Event | null;
  previous_event: Event | null;
  is_upcoming: boolean;
}

export interface UpcomingEvent {
  id: number;
  name: string;
  about_event: string;
  location: string;
  date: string;
  time: string;
  main_speaker: string;
  image_url: string | null;
  category: string;
  attendees_count: number;
  is_full: boolean;
  days_until: number;
}

export interface Attendee {
  id: number;
  name: string;
  status: 'confirmed' | 'cancelled' | 'attended';
  attended_at: string | null;
}

export interface AttendanceData {
  attendees: Attendee[];
  is_upcoming: boolean;
  is_full: boolean;
  total_count: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface EventFilters {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  upcoming?: boolean;
  date_range?: string;
}

// API Functions
export async function getEvents(filters: EventFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 10).toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.category && { category: filters.category.toString() }),
    ...(filters.upcoming && { upcoming: 'true' }),
    ...(filters.date_range && { date_range: filters.date_range })
  });

  const response = await axios.get<PaginatedResponse<Event>>(
    `${API_URL}/events?${params}`
  );
  return response.data;
}

export async function getEvent(id: number) {
  const response = await axios.get<{ data: EventDetail }>(
    `${API_URL}/events/${id}`
  );
  return response.data.data;
}

export async function getCategories() {
  const response = await axios.get<{ data: Category[] }>(
    `${API_URL}/events/categories`
  );
  return response.data.data;
}

export async function getUpcomingEvents(params: { limit?: number; category?: number } = {}) {
  const queryParams = new URLSearchParams({
    ...(params.limit && { limit: params.limit.toString() }),
    ...(params.category && { category: params.category.toString() })
  });

  const response = await axios.get<{ data: UpcomingEvent[] }>(
    `${API_URL}/events/upcoming?${queryParams}`
  );
  return response.data.data;
}

export async function getEventAttendees(eventId: number) {
  const response = await axios.get<{ data: AttendanceData }>(
    `${API_URL}/events/${eventId}/attendees`
  );
  return response.data.data;
}

export async function registerAttendance(eventId: number, data: {
  user_id: number;
  status: 'confirmed' | 'cancelled' | 'attended';
  attended_at?: string;
}) {
  const response = await axios.post<{ 
    message: string;
    attendees_count: number;
    is_full: boolean;
  }>(
    `${API_URL}/events/${eventId}/register-attendance`,
    data
  );
  return response.data;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/events/${id}/download-image`;
}

// Helper function to format event datetime
export function formatEventDateTime(date: string, time: string) {
  const dateTime = `${date}T${time}`;
  return format(parseISO(dateTime), 'PPPp');
}

// Helper function to format duration
export function formatDuration(hours: number) {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  }
  if (hours === 1) {
    return '1 hour';
  }
  return `${hours} hours`;
}

// Helper function to download image
export async function downloadEventImage(id: number, eventName: string) {
  const response = await axios.get(getImageDownloadUrl(id), {
    responseType: 'blob'
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${eventName}.${getFileExtension(response.headers['content-type'])}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

// Helper function to get file extension from MIME type
function getFileExtension(mimeType: string | undefined) {
  if (!mimeType) return 'jpg';
  const lookup: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp'
  };
  return lookup[mimeType] || 'jpg';
}

// Error handling
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Axios error interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        error.response.data.message || 'An error occurred',
        error.response.data.errors
      );
    }
    throw error;
  }
);