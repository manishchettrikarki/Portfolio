"use client";

import { usePortfolioContent } from "@/utils/usePortfolioContent";

export function Footer() {
  const { siteConfig } = usePortfolioContent();

  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "var(--heading)", fontWeight: 600 }}>
          {siteConfig.name}
        </span>
        . All rights reserved.
      </p>
      <p>
        Built with{" "}
        <span style={{ color: "var(--heading)", fontWeight: 600 }}>
          Next.js 16
        </span>{" "}
        +{" "}
        <span style={{ color: "var(--heading)", fontWeight: 600 }}>
          Tailwind CSS v4
        </span>
      </p>
    </footer>
  );
}
