"use client";

import { useState } from "react";
import { useSectionContext } from "@/components/reusable/sectionContext";
import { useDarkMode } from "@/components/reusable/useDarkMode";
import { SocialIcon, SunIcon, MoonIcon } from "@/components/reusable/icons";
import { navLinks } from "@/utils/constants";
import type { SectionId } from "@/types";
import { usePortfolioContent } from "@/utils/usePortfolioContent";

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { active, setActive } = useSectionContext();
  const { isDark, toggle } = useDarkMode();
  const { siteConfig } = usePortfolioContent();

  const navigate = (section: SectionId) => {
    setActive(section);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="sidebar">
        {/* Logo */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <button
            onClick={() => navigate("home")}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "0.5px",
              color: "var(--heading)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.25s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.opacity = "0.65")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.opacity = "1")
            }
          >
            {siteConfig.name}
          </button>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--text)",
              marginTop: 6,
            }}
          >
            {siteConfig.role}
          </p>
        </div>

        {/* Nav */}
        <nav style={{ width: "100%", marginBottom: 40 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navLinks.map((link) => (
              <li key={link.section}>
                <button
                  onClick={() => navigate(link.section)}
                  className={`nav-link ${active === link.section ? "nav-link--active" : ""}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div style={{ display: "flex", gap: 14, marginBottom: 32 }}>
          {siteConfig.social.map((s) => (
            <a
              key={s.icon}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{ color: "var(--text)", transition: "color 0.25s" }}
              onMouseEnter={(e) =>
              ((e.target as SVGElement).closest("a")!.style.color =
                "var(--heading)")
              }
              onMouseLeave={(e) =>
              ((e.target as SVGElement).closest("a")!.style.color =
                "var(--text)")
              }
            >
              <SocialIcon name={s.icon} size={15} />
            </a>
          ))}
        </div>

        {/* Dark toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text)",
            transition: "color 0.25s",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 10,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--heading)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--text)")
          }
        >
          {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          {isDark ? "Light" : "Dark"}
        </button>

        {/* Copyright */}
        <p
          style={{
            position: "absolute",
            bottom: 28,
            fontSize: 11,
            color: "var(--text)",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </aside>

      {/* ── Mobile Topbar ── */}
      <header className="header">
        <button
          onClick={() => navigate("home")}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 17,
            color: "var(--heading)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {siteConfig.name}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text)",
            }}
          >
            {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "var(--heading)",
                  borderRadius: 1,
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: mobileOpen
                    ? i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "none"
                    : "none",
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav
          style={{
            position: "fixed",
            top: 60,
            right: 0,
            width: 240,
            height: "calc(100vh - 60px)",
            background: "var(--sidebar-bg)",
            borderLeft: "1px solid var(--border)",
            padding: "32px 24px",
            zIndex: 199,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 40px 0",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.section}>
                <button
                  onClick={() => navigate(link.section)}
                  className={`nav-link ${active === link.section ? "nav-link--active" : ""}`}
                  style={{ padding: "4px 0" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 14 }}>
            {siteConfig.social.map((s) => (
              <a
                key={s.icon}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: "var(--text)" }}
              >
                <SocialIcon name={s.icon} size={15} />
              </a>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
