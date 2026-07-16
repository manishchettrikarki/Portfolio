"use client";

import { useState } from "react";
import { useSectionContext } from "@/components/reusable/sectionContext";
import { SectionTitle } from "@/components/reusable/sectionTitle";
import { ExternalIcon } from "@/components/reusable/icons";
import { portfolioFilters } from "@/utils/constants";
import { usePortfolioContent } from "@/utils/usePortfolioContent";
import type { PortfolioCategory, PortfolioItem } from "@/types";

export function PortfolioView() {
  const { active, openModal } = useSectionContext();
  const [filter, setFilter] = useState<PortfolioCategory>("all");
  const { portfolioItems } = usePortfolioContent();

  const filtered =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === filter);

  const showFloating = (title: string, label: string) => {
    const el = document.getElementById("portfolio-titles");
    if (!el) return;
    el.innerHTML = `${title}<span style="display:block;font-size:10px;opacity:.55;letter-spacing:1.5px;text-transform:uppercase;margin-top:3px">${label}</span>`;
    el.classList.add("visible");
  };

  const hideFloating = () => {
    document.getElementById("portfolio-titles")?.classList.remove("visible");
  };

  return (
    <section className={`view ${active === "portfolio" ? "view--active" : ""}`}>
      <div style={{ padding: "64px 56px" }}>
        <SectionTitle title="Portfolio" bgText="Works" />

        {/* Filter tabs */}
        <ul
          style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            listStyle: "none",
            padding: 0,
            marginBottom: 36,
          }}
        >
          {portfolioFilters.map((f) => (
            <li key={f.value}>
              <button
                className={`filter-tab ${filter === f.value ? "filter-tab--active" : ""}`}
                onClick={() => setFilter(f.value as PortfolioCategory)}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Grid */}
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            listStyle: "none",
            padding: 0,
          }}
        >
          {filtered.map((item) => (
            <li
              key={item.id}
              className="portfolio-item"
              style={
                item.imageUrl
                  ? {
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                  : undefined
              }
              onMouseEnter={() => showFloating(item.title, item.categoryLabel)}
              onMouseLeave={hideFloating}
              onClick={() => openModal(<PortfolioModal item={item} />)}
            >
              <div className="portfolio-item__overlay">
                <div className="portfolio-item__icon">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              <span
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "rgba(0,0,0,0.65)",
                  color: "#fff",
                  padding: "3px 10px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 9,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {item.type}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PortfolioModal({ item }: { item: PortfolioItem }) {
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: item.imageUrl
            ? `url(${item.imageUrl}) center/cover no-repeat`
            : "linear-gradient(135deg, #c8c8c8, #8a8a8a)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Description */}
        <div style={{ flex: 1, padding: "36px 40px" }}>
          <h3
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "var(--heading)",
              marginBottom: 4,
            }}
          >
            {item.title}
          </h3>
          <span
            style={{
              display: "block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            {item.categoryLabel}
          </span>
          <p style={{ color: "var(--text)", lineHeight: 1.8, fontSize: 14 }}>
            {item.description}
          </p>
        </div>

        {/* Meta panel */}
        <div
          style={{
            width: 220,
            padding: "36px 28px",
            flexShrink: 0,
            borderLeft: "1px solid var(--border)",
            background: "var(--sidebar-bg)",
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--heading)",
              marginBottom: 20,
            }}
          >
            Project Info
          </p>

          {[
            { label: "Client", value: item.client },
            { label: "Date", value: item.date },
            { label: "Category", value: item.categoryLabel },
          ].map((row) => (
            <div key={row.label} style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--heading)",
                  marginBottom: 3,
                }}
              >
                {row.label}
              </p>
              <p style={{ fontSize: 13, color: "var(--text)" }}>{row.value}</p>
            </div>
          ))}

          {item.technologies.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--heading)",
                  marginBottom: 8,
                }}
              >
                Tech
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "2px 8px",
                      border: "1px solid var(--border)",
                      fontSize: 10,
                      color: "var(--text)",
                      letterSpacing: "1px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--heading)",
                transition: "opacity 0.25s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              <ExternalIcon size={14} />
              View Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
