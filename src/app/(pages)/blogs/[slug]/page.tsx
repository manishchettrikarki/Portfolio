import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublishedBlogBySlug } from "@/lib/data/blogs";
import { getSiteContent } from "@/lib/data/site";
import { buildSiteSeo, ogImageTags, canonicalUrl } from "@/lib/seo";
import { BlogPostContent } from "@/components/views/blogs/BlogPostContent";
import type { BlogsItem } from "@/types";

function toBlogsItem(
  row: NonNullable<Awaited<ReturnType<typeof getPublishedBlogBySlug>>>,
): BlogsItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    date: row.date_label,
    category: row.category,
    author: row.author,
    readTime: row.read_time,
    content: row.content,
    tags: row.tags ?? [],
    quote: row.quote ?? undefined,
    coverImageUrl: row.cover_image_url,
    videoUrl: row.video_url,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const [row, site] = await Promise.all([
    getPublishedBlogBySlug(supabase, slug),
    getSiteContent(supabase),
  ]);

  if (!row) return { title: "Post not found" };

  const seo = buildSiteSeo(site);
  const path = `/blogs/${row.slug}`;
  const title = row.title;
  const description = row.excerpt;
  const images = row.cover_image_url
    ? [{ url: row.cover_image_url, width: 1200, height: 630, alt: row.title }]
    : ogImageTags(seo);

  return {
    title,
    description,
    authors: row.author ? [{ name: row.author }] : undefined,
    alternates: { canonical: canonicalUrl(seo, path) ?? path },
    openGraph: {
      title,
      description,
      url: seo.url ? canonicalUrl(seo, path) : undefined,
      siteName: seo.name,
      images,
      type: "article",
      publishedTime: row.created_at,
      modifiedTime: row.updated_at,
      authors: row.author ? [row.author] : undefined,
      tags: row.tags ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images?.map((i) => i.url),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const [row, site] = await Promise.all([
    getPublishedBlogBySlug(supabase, slug),
    getSiteContent(supabase),
  ]);

  if (!row) notFound();

  const seo = buildSiteSeo(site);
  const path = `/blogs/${row.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: row.title,
    description: row.excerpt,
    image: row.cover_image_url || seo.ogImage || undefined,
    datePublished: row.created_at,
    dateModified: row.updated_at,
    author: row.author ? { "@type": "Person", name: row.author } : undefined,
    publisher: { "@type": "Organization", name: seo.name },
    mainEntityOfPage: seo.url ? canonicalUrl(seo, path) : undefined,
  };

  return (
    <section className="view view--active">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ padding: "64px 56px", maxWidth: 880, margin: "0 auto" }}>
        <Link
          href="/blogs"
          style={{
            display: "inline-block",
            marginBottom: 24,
            fontSize: 12,
            color: "var(--text)",
          }}
        >
          ← Back to blogs
        </Link>
        <BlogPostContent post={toBlogsItem(row)} />
      </div>
    </section>
  );
}
