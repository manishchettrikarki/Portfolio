"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import {
  siteConfig as DEFAULT_SITE_CONFIG,
  aboutBio as DEFAULT_ABOUT_BIO,
  shortInfo as DEFAULT_SHORT_INFO,
  counters as DEFAULT_COUNTERS,
  skills as DEFAULT_SKILLS,
  skillList as DEFAULT_SKILL_LIST,
  experience as DEFAULT_EXPERIENCE,
  education as DEFAULT_EDUCATION,
  testimonials as DEFAULT_TESTIMONIALS,
  portfolioItems as DEFAULT_PORTFOLIO_ITEMS,
  blogsItem as DEFAULT_BLOGS_ITEMS,
} from "@/utils/constants";
import type {
  ShortInfoItem,
  CounterItem,
  Skill,
  ResumeItem,
  Testimonial,
  PortfolioItem,
  BlogsItem,
  SocialLink,
} from "@/types";

interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  social: SocialLink[];
  cvFile: string | null;
  profileImageUrl: string | null;
}

interface PortfolioContentValue {
  loading: boolean;
  siteConfig: SiteConfig;
  aboutBio: string;
  shortInfo: ShortInfoItem[];
  counters: CounterItem[];
  skills: Skill[];
  skillList: string[];
  experience: ResumeItem[];
  education: ResumeItem[];
  testimonials: Testimonial[];
  portfolioItems: PortfolioItem[];
  blogsItems: BlogsItem[];
}

const defaultValue: PortfolioContentValue = {
  loading: true,
  siteConfig: { ...DEFAULT_SITE_CONFIG, cvFile: DEFAULT_SITE_CONFIG.cvFile, profileImageUrl: null },
  aboutBio: DEFAULT_ABOUT_BIO,
  shortInfo: DEFAULT_SHORT_INFO,
  counters: DEFAULT_COUNTERS,
  skills: DEFAULT_SKILLS,
  skillList: DEFAULT_SKILL_LIST,
  experience: DEFAULT_EXPERIENCE,
  education: DEFAULT_EDUCATION,
  testimonials: DEFAULT_TESTIMONIALS,
  portfolioItems: DEFAULT_PORTFOLIO_ITEMS,
  blogsItems: DEFAULT_BLOGS_ITEMS,
};

const PortfolioContentContext =
  createContext<PortfolioContentValue>(defaultValue);

export function PortfolioContentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [value, setValue] = useState<PortfolioContentValue>(defaultValue);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    async function load() {
      const [site, experience, education, testimonials, portfolio, blogs] =
        await Promise.all([
          supabase.from("site_content").select("*").eq("id", 1).single(),
          supabase
            .from("experience")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("education")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("testimonials")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("portfolio_items")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("blogs")
            .select("*")
            .eq("published", true)
            .order("created_at", { ascending: false }),
        ]);

      if (cancelled) return;

      if (
        site.error ||
        experience.error ||
        education.error ||
        testimonials.error ||
        portfolio.error ||
        blogs.error
      ) {
        // Keep static fallback content if Supabase isn't reachable/configured.
        console.error(
          "Failed to load portfolio content from Supabase, using defaults.",
          site.error ||
            experience.error ||
            education.error ||
            testimonials.error ||
            portfolio.error ||
            blogs.error,
        );
        setValue((v) => ({ ...v, loading: false }));
        return;
      }

      const s = site.data;

      setValue({
        loading: false,
        siteConfig: {
          name: s.name,
          role: s.role,
          tagline: s.tagline,
          email: s.email,
          phone: s.phone,
          location: s.location,
          social: s.social ?? [],
          cvFile: s.cv_url ?? null,
          profileImageUrl: s.profile_image_url ?? null,
        },
        aboutBio: s.about_bio,
        shortInfo: s.short_info ?? [],
        counters: s.counters ?? [],
        skills: s.skills ?? [],
        skillList: s.skill_list ?? [],
        experience: (experience.data ?? []).map((e) => ({
          period: e.period,
          title: e.title,
          subtitle: e.subtitle,
          description: e.description,
        })),
        education: (education.data ?? []).map((e) => ({
          period: e.period,
          title: e.title,
          subtitle: e.subtitle,
          description: e.description,
        })),
        testimonials: (testimonials.data ?? []).map((t) => ({
          id: t.id,
          name: t.name,
          role: t.role,
          text: t.text,
        })),
        portfolioItems: (portfolio.data ?? []).map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          categoryLabel: p.category_label,
          type: p.type,
          client: p.client,
          date: p.project_date,
          url: p.url ?? undefined,
          imageUrl: p.image_url,
          description: p.description,
          technologies: p.technologies ?? [],
        })),
        blogsItems: (blogs.data ?? []).map((b) => ({
          id: b.id,
          title: b.title,
          slug: b.slug,
          excerpt: b.excerpt,
          date: b.date_label,
          category: b.category,
          author: b.author,
          readTime: b.read_time,
          content: b.content,
          tags: b.tags ?? [],
          quote: b.quote ?? undefined,
          coverImageUrl: b.cover_image_url,
        })),
      });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PortfolioContentContext.Provider value={value}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  return useContext(PortfolioContentContext);
}