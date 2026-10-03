import type { Metadata } from "next";
import { AboutView } from "@/components/views/about";
import { getPageMetadata } from "@/lib/pageSeo";
import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";
import { buildSiteSeo } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "/about",
    "About",
    "Background, skills, experience, and education.",
  );
}

export default async function AboutPage() {
  let jsonLd: Record<string, unknown> | null = null;
  try {
    const supabase = await createClient();
    const site = await getSiteContent(supabase);
    const seo = buildSiteSeo(site);
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name || undefined,
      jobTitle: site.role || undefined,
      email: site.email ? `mailto:${site.email}` : undefined,
      image: site.profile_image_url || undefined,
      url: seo.url || undefined,
      sameAs: (site.social ?? [])
        .map((s) => s.url)
        .filter((u): u is string => Boolean(u)),
    };
  } catch {
    // Supabase unreachable — skip structured data, page still renders.
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <AboutView />
    </>
  );
}
