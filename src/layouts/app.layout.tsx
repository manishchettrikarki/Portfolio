"use client";

import { ReactNode } from "react";
import { SectionProvider } from "@/components/reusable/sectionContext";
import { Preloader } from "@/components/reusable/preloader";
import { CustomCursor } from "@/components/reusable/customCursor";
import { PortfolioFloatingTitle } from "@/components/reusable/portfolioFloatingTitle";
import { AppModal } from "@/components/reusable/appModal";
import { Header } from "@/components/app/header";
import { Footer } from "@/components/app/footer";
import { PortfolioContentProvider } from "@/utils/usePortfolioContent";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <PortfolioContentProvider>
      <SectionProvider>
        <Preloader />
        <CustomCursor />
        <PortfolioFloatingTitle />
        <AppModal />

        <div className="layout">
          {/* Desktop sidebar lives inside Header */}
          <Header />

          {/* Main content area */}
          <main className="main">
            {children}
            <Footer />
          </main>
        </div>
      </SectionProvider>
    </PortfolioContentProvider>
  );
}
