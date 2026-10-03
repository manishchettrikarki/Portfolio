import type { Metadata } from "next";
import { PortfolioView } from "@/components/views/portfolio";
import { getPageMetadata } from "@/lib/pageSeo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "/portfolio",
    "Portfolio",
    "Selected projects and work.",
  );
}

export default function PortfolioPage() {
  return <PortfolioView />;
}
