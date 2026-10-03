import type { SiteContentRow } from "@/lib/data/types";

export interface SiteSeo {
  name: string;
  tagline: string;
  url: string;
  description: string;
  ogImage: string;
  twitter: string;
}

/** Builds the SEO config object from the live site_content row. */
export function buildSiteSeo(site: SiteContentRow): SiteSeo {
  return {
    name: site.name || "Portfolio",
    tagline: site.tagline || "",
    url: (site.site_url || "").replace(/\/+$/, ""),
    description:
      site.meta_description || site.tagline || site.about_bio || "",
    ogImage: site.og_image_url || site.profile_image_url || "",
    twitter: site.twitter_handle || "",
  };
}

/** `"Page | Site Name"`, or `"Site Name | tagline"` for the homepage. */
export function pageTitle(seo: SiteSeo, page?: string) {
  if (page) return `${page} | ${seo.name}`;
  return seo.tagline ? `${seo.name} | ${seo.tagline}` : seo.name;
}

/** Next.js Metadata `openGraph.images` array, or undefined if no image is set. */
export function ogImageTags(seo: SiteSeo, overrideUrl?: string | null) {
  const url = overrideUrl || seo.ogImage;
  if (!url) return undefined;
  return [{ url, width: 1200, height: 630, alt: seo.name }];
}

/** Absolute canonical URL for a given path, or undefined if site_url isn't set. */
export function canonicalUrl(seo: SiteSeo, path: string) {
  if (!seo.url) return undefined;
  return `${seo.url}${path.startsWith("/") ? path : `/${path}`}`;
}
