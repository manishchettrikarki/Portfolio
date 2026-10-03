import "@/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";
import { buildSiteSeo, pageTitle, ogImageTags, canonicalUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const site = await getSiteContent(supabase);
    const seo = buildSiteSeo(site);
    const title = pageTitle(seo);

    return {
      title: {
        template: `%s | ${seo.name}`,
        default: title,
      },
      description: seo.description,
      keywords: site.meta_keywords
        ? site.meta_keywords.split(",").map((k) => k.trim()).filter(Boolean)
        : undefined,
      metadataBase: seo.url ? new URL(seo.url) : undefined,
      alternates: { canonical: canonicalUrl(seo, "/") ?? "/" },
      openGraph: {
        title,
        description: seo.description,
        url: seo.url || undefined,
        siteName: seo.name,
        images: ogImageTags(seo),
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: seo.description,
        images: seo.ogImage ? [seo.ogImage] : undefined,
        site: seo.twitter || undefined,
      },
    };
  } catch {
    // Fallback if Supabase isn't reachable/configured yet.
    return {
      title: "Portfolio",
      description: "Personal portfolio website.",
    };
  }
}

async function getWebsiteJsonLd() {
  try {
    const supabase = await createClient();
    const site = await getSiteContent(supabase);
    const seo = buildSiteSeo(site);
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: seo.name,
      url: seo.url || undefined,
      description: seo.description,
    };
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const websiteJsonLd = await getWebsiteJsonLd();

  return (
    <html lang="en">
      <body>
        {websiteJsonLd && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
