"use client";

import { useSectionContext } from "@/components/reusable/sectionContext";
import { SectionTitle } from "@/components/reusable/sectionTitle";
import { CalendarIcon, QuoteIcon } from "@/components/reusable/icons";
import { usePortfolioContent } from "@/utils/usePortfolioContent";
import type { BlogsItem } from "@/types";

export function BlogsView() {
  const { active, openModal } = useSectionContext();
  const { blogsItems: blogsItems } = usePortfolioContent();

  return (
    <section className={`view ${active === "blogs" ? "view--active" : ""}`}>
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
            <BlogsCard
              key={post.id}
              post={post}
              onOpen={() => openModal(<BlogsModal post={post} />)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function BlogsCard({ post, onOpen }: { post: BlogsItem; onOpen: () => void }) {
  return (
    <li style={{ background: "var(--sidebar-bg)" }}>
      {/* Image placeholder */}
      <div
        onClick={onOpen}
        style={{
          position: "relative",
          aspectRatio: "16/9",
          cursor: "pointer",
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
      </div>

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
          <button
            onClick={onOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              textAlign: "left",
              padding: 0,
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
          </button>
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
        <button className="read-more" onClick={onOpen}>
          Read More
        </button>
      </div>
    </li>
  );
}

function BlogsModal({ post }: { post: BlogsItem }) {
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: post.coverImageUrl
            ? `url(${post.coverImageUrl}) center/cover no-repeat`
            : "linear-gradient(135deg, #d0d0d0, #a0a0a0)",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            bottom: 20,
            left: 28,
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
      </div>

      <div style={{ padding: "36px 48px" }}>
        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            fontSize: 11,
            color: "var(--text)",
            marginBottom: 16,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <CalendarIcon size={12} />
            {post.date}
          </span>
          <span>By {post.author}</span>
          <span>{post.readTime}</span>
        </div>

        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: "var(--heading)",
            lineHeight: 1.3,
            marginBottom: 20,
          }}
        >
          {post.title}
        </h2>

        <p
          style={{
            color: "var(--text)",
            lineHeight: 1.8,
            fontSize: 14,
            fontStyle: "italic",
            borderLeft: "4px solid var(--heading)",
            paddingLeft: 20,
            marginBottom: 28,
          }}
        >
          {post.excerpt}
        </p>

        {post.quote && (
          <div
            style={{
              margin: "28px 0",
              padding: "24px 28px",
              background: "var(--sidebar-bg)",
              border: "1px solid var(--border)",
            }}
          >
            <QuoteIcon size={28} />
            <blockquote
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "var(--heading)",
                lineHeight: 1.6,
                fontStyle: "italic",
                marginTop: 12,
              }}
            >
              {post.quote}
            </blockquote>
          </div>
        )}

        <div
          style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div
          style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 12px",
                border: "1px solid var(--border)",
                fontSize: 10,
                color: "var(--text)",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
