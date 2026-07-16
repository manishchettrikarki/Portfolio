"use client";

import { useSectionContext } from "@/components/reusable/sectionContext";
import { SocialIcon } from "@/components/reusable/icons";
import { usePortfolioContent } from "@/utils/usePortfolioContent";

export function HomeView() {
  const { active, setActive } = useSectionContext();
  const { siteConfig } = usePortfolioContent();

  return (
    <section className={`view ${active === "home" ? "view--active" : ""}`}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 64,
            flexWrap: "wrap",
            maxWidth: 800,
            width: "100%",
          }}
        >
          {/* Morphing avatar placeholder */}
          <div
            className="avatar-morph"
            style={{
              width: 260,
              height: 260,
              flexShrink: 0,
              background: "url('/profile.jpg') center/cover no-repeat",
            }}
          />

          {/* Text content */}
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 10,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--text)",
                marginBottom: 14,
              }}
            >
              Hello, I&apos;m
            </span>

            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 64px)",
                color: "var(--heading)",
                lineHeight: 1.1,
                marginBottom: 10,
              }}
            >
              {siteConfig.name}
            </h1>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--text)",
                marginBottom: 18,
              }}
            >
              {siteConfig.role}
            </p>

            <p
              style={{
                color: "var(--text)",
                lineHeight: 1.75,
                maxWidth: 420,
                marginBottom: 28,
              }}
            >
              {siteConfig.tagline}
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
              {siteConfig.social.map((s) => (
                <a
                  key={s.icon}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: "var(--text)", transition: "color 0.25s" }}
                  onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--heading)")
                  }
                  onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text)")
                  }
                >
                  <SocialIcon name={s.icon} size={16} />
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                className="btn btn--primary"
                onClick={() => setActive("portfolio")}
              >
                View Work
              </button>
              <button
                className="btn btn--outline"
                onClick={() => setActive("contact")}
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
