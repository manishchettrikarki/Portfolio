import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";
import { buildSiteSeo } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const supabase = await createClient();

  let baseUrl = "";
  try {
    const site = await getSiteContent(supabase);
    baseUrl = buildSiteSeo(site).url;
  } catch {
    // Supabase unreachable — omit sitemap link below.
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: baseUrl ? `${baseUrl}/sitemap.xml` : undefined,
  };
}
