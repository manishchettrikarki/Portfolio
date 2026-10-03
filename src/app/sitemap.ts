import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";
import { buildSiteSeo } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  let baseUrl = "";
  try {
    const site = await getSiteContent(supabase);
    baseUrl = buildSiteSeo(site).url;
  } catch {
    // Supabase unreachable — fall back to relative entries below.
  }

  if (!baseUrl) return [];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blogs`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, updated_at")
    .eq("published", true);

  const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
