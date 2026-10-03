"use client";

import Link from "next/link";
import { SectionTitle } from "@/components/reusable/sectionTitle";
import { CalendarIcon } from "@/components/reusable/icons";
import { usePortfolioContent } from "@/utils/usePortfolioContent";
import type { BlogsItem } from "@/types";

export function BlogsView() {
  const { blogsItems } = usePortfolioContent();

  return (
    <section className="view view--active">
      <div style={{ padding: "64px 56px" }}>
        <SectionTitle title="Blogs" bgText="Blog" />

        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            listStyle: "none",
            padding: 0,
          }}
        >
          {blogsItems.map((post) => (
            <BlogsCard key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function BlogsCard({ post }: { post: BlogsItem }) {
  const href = `/blogs/${post.slug}`;

  return (
    <li style={{ background: "var(--sidebar-bg)" }}>
      {/* Image */}
      <Link
        href={href}
        style={{
          position: "relative",
          aspectRatio: "16/9",
          display: "block",
          background: post.coverImageUrl
            ? `url(${post.coverImageUrl}) center/cover no-repeat`
            : "linear-gradient(135deg, #d0d0d0, #a0a0a0)",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "3px 12px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 9,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div style={{ padding: "22px 24px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
            fontSize: 11,
            color: "var(--text)",
          }}
        >
          <CalendarIcon size={12} />
          <span>{post.date}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{post.readTime}</span>
        </div>

        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--heading)",
            lineHeight: 1.4,
            marginBottom: 10,
          }}
        >
          <Link
            href={href}
            style={{
              color: "inherit",
              transition: "opacity 0.25s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.65")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            {post.title}
          </Link>
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "var(--text)",
            lineHeight: 1.75,
            marginBottom: 16,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{ height: 1, background: "var(--border)", marginBottom: 14 }}
        />
        <Link href={href} className="read-more">
          Read More
        </Link>
      </div>
    </li>
  );
}
