import { CalendarIcon, QuoteIcon } from "@/components/reusable/icons";
import type { BlogsItem } from "@/types";

export function BlogPostContent({ post }: { post: BlogsItem }) {
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

        <h1
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
        </h1>

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

        {post.videoUrl && (
          <video
            src={post.videoUrl}
            controls
            style={{ width: "100%", marginTop: 28, background: "#000" }}
          />
        )}

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
