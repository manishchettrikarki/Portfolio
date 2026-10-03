import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";
import { buildSiteSeo, ogImageTags, canonicalUrl } from "@/lib/seo";

/**
 * Builds Metadata for a static page (About, Portfolio, Blogs, Contact).
 * Title gets the "%s | Site Name" template from the root layout automatically.
 */
export async function getPageMetadata(
  path: string,
  title: string,
  description: string,
): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const site = await getSiteContent(supabase);
    const seo = buildSiteSeo(site);

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl(seo, path) ?? path },
      openGraph: {
        title: `${title} | ${seo.name}`,
        description,
        url: seo.url ? canonicalUrl(seo, path) : undefined,
        siteName: seo.name,
        images: ogImageTags(seo),
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${seo.name}`,
        description,
        images: seo.ogImage ? [seo.ogImage] : undefined,
      },
    };
  } catch {
    return { title, description };
  }
}
