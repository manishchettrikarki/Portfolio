import { createClient } from "@/lib/supabase/server";
import { getExperience } from "@/lib/data/experience";
import { ResumeListManager } from "@/components/admin/ResumeListManager";
import { create, update, remove } from "./actions";

export default async function ExperiencePage() {
  const supabase = await createClient();
  const items = await getExperience(supabase);

  return (
    <ResumeListManager
      entityLabel="Experience"
      items={items}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
    />
  );
}
