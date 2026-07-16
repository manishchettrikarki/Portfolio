"use client";

import { useEffect, useRef } from "react";
import { useSectionContext } from "@/components/reusable/sectionContext";
import { SectionTitle } from "@/components/reusable/sectionTitle";
import { DownloadIcon } from "@/components/reusable/icons";
import { animateCounter } from "@/utils";
import { usePortfolioContent } from "@/utils/usePortfolioContent";

export function AboutView() {
  const { active } = useSectionContext();
  const isActive = active === "about";
  const {
    aboutBio,
    shortInfo,
    counters,
    skills,
    skillList,
    experience,
    education,
    testimonials,
    siteConfig,
  } = usePortfolioContent();

  return (
    <section className={`view ${isActive ? "view--active" : ""}`}>
      <div style={{ padding: "64px 56px", maxWidth: 900 }}>
        <SectionTitle title="About Me" bgText="About" />

        {/* Bio */}
        <Divider>
          <p
            style={{
              color: "var(--text)",
              lineHeight: 1.8,
              maxWidth: 640,
              marginBottom: 24,
            }}
          >
            {aboutBio}
          </p>
          {siteConfig.cvFile && (
            <a
              href={siteConfig.cvFile}
              download
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ display: "inline-flex" }}
            >
              <DownloadIcon size={16} />
              Download CV
            </a>
          )}
        </Divider>

        {/* Short info */}
        <Divider>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 32px",
            }}
          >
            {shortInfo.map((item) => (
              <li
                key={item.label}
                style={{ display: "flex", gap: 12, fontSize: 14 }}
              >
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--heading)",
                    minWidth: 88,
                    paddingTop: 2,
                  }}
                >
                  {item.label}:
                </span>
                {item.href ? (
                  <a
                    href={item.href}
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
                    {item.value}
                  </a>
                ) : (
                  <span style={{ color: "var(--text)" }}>{item.value}</span>
                )}
              </li>
            ))}
          </ul>
        </Divider>

        {/* Counters */}
        <Divider>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {counters.map((c) => (
              <CounterBox key={c.label} item={c} active={isActive} />
            ))}
          </div>
        </Divider>

        {/* Skill bars */}
        <Divider>
          <Label>Skills</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {skills.map((s) => (
              <SkillBar
                key={s.name}
                name={s.name}
                value={s.value}
                active={isActive}
              />
            ))}
          </div>
        </Divider>

        {/* Skill list */}
        <Divider>
          <Label>Technologies</Label>
          <ul
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {skillList.map((s) => (
              <li
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "var(--text)",
                }}
              >
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        </Divider>

        {/* Resume */}
        <Divider>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}
          >
            <ResumeList title="Experience" items={experience} />
            <ResumeList title="Education" items={education} />
          </div>
        </Divider>

        {/* Testimonials */}
        <div>
          <Label>Testimonials</Label>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial">
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text)",
                    lineHeight: 1.75,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ccc, #999)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "var(--heading)",
                      }}
                    >
                      {t.name}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text)" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        paddingBottom: 48,
        marginBottom: 48,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "var(--heading)",
        marginBottom: 24,
      }}
    >
      {children}
    </p>
  );
}

function SkillBar({
  name,
  value,
  active,
}: {
  name: string;
  value: number;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (active) {
      const t = setTimeout(() => {
        if (ref.current) ref.current.style.width = `${value}%`;
      }, 250);
      return () => clearTimeout(t);
    } else {
      ref.current.style.width = "0%";
    }
  }, [active, value]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "1.5px",
            color: "var(--heading)",
          }}
        >
          {name}
        </span>
        <span style={{ fontSize: 11, color: "var(--text)" }}>{value}%</span>
      </div>
      <div className="skill-bar__track">
        <div ref={ref} className="skill-bar__fill" style={{ width: 0 }} />
      </div>
    </div>
  );
}

function CounterBox({
  item,
  active,
}: {
  item: { value: number; suffix: string; label: string };
  active: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    return animateCounter(item.value, (n) => {
      if (ref.current) ref.current.textContent = n + item.suffix;
    });
  }, [active, item.value, item.suffix]);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 40,
          color: "var(--heading)",
        }}
      >
        <span ref={ref}>0{item.suffix}</span>
      </div>
      <p
        style={{
          fontSize: 10,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--text)",
          marginTop: 6,
        }}
      >
        {item.label}
      </p>
    </div>
  );
}

function ResumeList({
  title,
  items,
}: {
  title: string;
  items: typeof experience;
}) {
  return (
    <div>
      <div
        style={{
          display: "inline-block",
          padding: "6px 16px",
          background: "var(--sidebar-bg)",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--heading)",
          marginBottom: 28,
        }}
      >
        {title}
      </div>
      <ul className="timeline">
        {items.map((item, i) => (
          <li key={i} className="timeline__item">
            <span
              style={{
                display: "inline-block",
                padding: "2px 10px",
                background: "rgba(0,0,0,0.04)",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 10,
                letterSpacing: "1.5px",
                color: "var(--heading)",
                marginBottom: 6,
              }}
            >
              {item.period}
            </span>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "var(--heading)",
                marginBottom: 2,
              }}
            >
              {item.title}
            </h4>
            <p
              style={{
                fontSize: 11,
                color: "var(--text)",
                marginBottom: 6,
                letterSpacing: "1px",
              }}
            >
              {item.subtitle}
            </p>
            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7 }}>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
