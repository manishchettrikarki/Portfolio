import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";
import { SiteForm } from "./SiteForm";

export default async function SitePage() {
  const supabase = await createClient();
  const site = await getSiteContent(supabase);

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Site & About</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Controls the hero, header, footer, about bio, short info, counters
        and skills shown across the site.
      </p>
      <SiteForm site={site} />
    </div>
  );
}
