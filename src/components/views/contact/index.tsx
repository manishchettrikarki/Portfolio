"use client";

import { useState } from "react";
import { useSectionContext } from "@/components/reusable/sectionContext";
import { SectionTitle } from "@/components/reusable/sectionTitle";
import { SocialIcon } from "@/components/reusable/icons";
import { usePortfolioContent } from "@/utils/usePortfolioContent";
import type { ContactFormData, FormStatus } from "@/types";

const INIT_FORM: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
const INIT_STATUS: FormStatus = { type: "idle", message: "" };

export function ContactView() {
  const { active } = useSectionContext();
  const { siteConfig } = usePortfolioContent();
  const [form, setForm] = useState<ContactFormData>(INIT_FORM);
  const [status, setStatus] = useState<FormStatus>(INIT_STATUS);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setTimeout(() => setStatus(INIT_STATUS), 3500);
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: data.message });
        setForm(INIT_FORM);
        setTimeout(() => setStatus(INIT_STATUS), 5000);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong.",
        });
        setTimeout(() => setStatus(INIT_STATUS), 4000);
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
      setTimeout(() => setStatus(INIT_STATUS), 4000);
    }
  };

  return (
    <section className={`view ${active === "contact" ? "view--active" : ""}`}>
      <div style={{ padding: "64px 56px", maxWidth: 900 }}>
        <SectionTitle title="Contact" bgText="Contact" />

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}
        >
          {/* Info */}
          <div>
            <p
              style={{
                color: "var(--text)",
                lineHeight: 1.8,
                marginBottom: 32,
                fontSize: 14,
              }}
            >
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Feel free to reach
              out!
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                marginBottom: 32,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                {
                  label: "Email",
                  value: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                },
                {
                  label: "Phone",
                  value: siteConfig.phone,
                  href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
                },
                {
                  label: "Location",
                  value: siteConfig.location,
                  href: undefined,
                },
                { label: "Freelance", value: "Available", href: undefined },
              ].map((row) => (
                <li
                  key={row.label}
                  style={{ display: "flex", gap: 14, fontSize: 14 }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "var(--heading)",
                      minWidth: 80,
                      paddingTop: 2,
                    }}
                  >
                    {row.label}
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      style={{
                        color: "var(--text)",
                        transition: "color 0.25s",
                      }}
                      onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--heading)")
                      }
                      onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--text)")
                      }
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span style={{ color: "var(--text)" }}>{row.value}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {siteConfig.social.map((s) => (
                <a
                  key={s.icon}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-icon-btn"
                >
                  <SocialIcon name={s.icon} size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <input
                className="form-input"
                type="text"
                name="name"
                value={form.name}
                onChange={set}
                placeholder="Your Name *"
              />
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={set}
                placeholder="Your Email *"
              />
            </div>
            <input
              className="form-input"
              type="text"
              name="subject"
              value={form.subject}
              onChange={set}
              placeholder="Subject"
            />
            <textarea
              className="form-input"
              name="message"
              value={form.message}
              onChange={set}
              placeholder="Your Message *"
              rows={6}
              style={{ resize: "none" }}
            />

            {status.type === "error" && (
              <p
                style={{
                  padding: "12px 16px",
                  border: "1px solid #f87171",
                  color: "#dc2626",
                  fontSize: 13,
                  background: "rgba(239,68,68,0.05)",
                }}
              >
                {status.message}
              </p>
            )}
            {status.type === "success" && (
              <p
                style={{
                  padding: "12px 16px",
                  border: "1px solid #4ade80",
                  color: "#16a34a",
                  fontSize: 13,
                  background: "rgba(74,222,128,0.05)",
                }}
              >
                {status.message}
              </p>
            )}

            <button
              className="btn btn--primary"
              onClick={submit}
              disabled={status.type === "loading"}
              style={{
                opacity: status.type === "loading" ? 0.6 : 1,
                cursor: status.type === "loading" ? "not-allowed" : "pointer",
              }}
            >
              {status.type === "loading" ? "Sending…" : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
