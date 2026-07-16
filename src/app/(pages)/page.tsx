import { AboutView } from "@/components/views/about";
import { BlogsView } from "@/components/views/blogs";
import { ContactView } from "@/components/views/contact";
import { HomeView } from "@/components/views/home";
import { PortfolioView } from "@/components/views/portfolio";

export default function HomePage() {
  return (
    <>
      <HomeView />
      <AboutView />
      <PortfolioView />
      <BlogsView />
      <ContactView />
    </>
  );
}
