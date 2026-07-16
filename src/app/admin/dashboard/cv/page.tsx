import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";
import { CvUploader } from "./CvUploader";

export default async function CvPage() {
  const supabase = await createClient();
  const site = await getSiteContent(supabase);

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">CV / Resume</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Upload a PDF. It becomes downloadable from the About section of the
        site immediately.
      </p>
      <CvUploader cvUrl={site.cv_url} cvFilename={site.cv_filename} />
    </div>
  );
}
