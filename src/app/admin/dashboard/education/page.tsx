import { createClient } from "@/lib/supabase/server";
import { getEducation } from "@/lib/data/education";
import { ResumeListManager } from "@/components/admin/ResumeListManager";
import { create, update, remove } from "./actions";

export default async function EducationPage() {
  const supabase = await createClient();
  const items = await getEducation(supabase);

  return (
    <ResumeListManager
      entityLabel="Education"
      items={items}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
    />
  );
}
