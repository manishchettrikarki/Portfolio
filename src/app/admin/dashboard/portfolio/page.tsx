import { createClient } from "@/lib/supabase/server";
import { getPortfolioItems } from "@/lib/data/portfolio";
import { getPortfolioCategories } from "@/lib/data/portfolioCategories";
import { PortfolioListManager } from "@/components/admin/PortfolioListManager";
import { CategoryManager } from "@/components/admin/CategoryManager";
import {
  create,
  update,
  remove,
  uploadImage,
  createCategory,
  updateCategory,
  removeCategory,
} from "./actions";

export default async function PortfolioPage() {
  const supabase = await createClient();
  const [items, categories] = await Promise.all([
    getPortfolioItems(supabase),
    getPortfolioCategories(supabase),
  ]);

  return (
    <div>
      <CategoryManager
        categories={categories}
        createAction={createCategory}
        updateAction={updateCategory}
        deleteAction={removeCategory}
      />
      <PortfolioListManager
        items={items}
        categories={categories}
        createAction={create}
        updateAction={update}
        deleteAction={remove}
        uploadImageAction={uploadImage}
      />
    </div>
  );
}
