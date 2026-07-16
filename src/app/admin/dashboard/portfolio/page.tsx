import { createClient } from "@/lib/supabase/server";
import { getPortfolioItems } from "@/lib/data/portfolio";
import { PortfolioListManager } from "@/components/admin/PortfolioListManager";
import { create, update, remove, uploadImage } from "./actions";

export default async function PortfolioPage() {
  const supabase = await createClient();
  const items = await getPortfolioItems(supabase);

  return (
    <PortfolioListManager
      items={items}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
      uploadImageAction={uploadImage}
    />
  );
}
