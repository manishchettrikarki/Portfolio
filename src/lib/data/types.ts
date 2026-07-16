import type { ShortInfoItem, CounterItem, Skill, SocialLink } from "@/types";

export interface SiteContentRow {
  id: number;
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  social: SocialLink[];
  about_bio: string;
  short_info: ShortInfoItem[];
  counters: CounterItem[];
  skills: Skill[];
  skill_list: string[];
  cv_url: string | null;
  cv_filename: string | null;
  updated_at: string;
}

export interface ExperienceRow {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export type EducationRow = ExperienceRow;

export interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  text: string;
  sort_order: number;
  created_at: string;
}

export interface PortfolioItemRow {
  id: string;
  title: string;
  category: string;
  category_label: string;
  type: "image" | "video" | "audio";
  client: string;
  project_date: string;
  url: string | null;
  image_url: string | null;
  description: string;
  technologies: string[];
  sort_order: number;
  created_at: string;
}

export interface BlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date_label: string;
  category: string;
  author: string;
  read_time: string;
  quote: string | null;
  tags: string[];
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}
