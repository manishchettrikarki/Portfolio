import { createClient } from "@/lib/supabase/server";
import { getTestimonials } from "@/lib/data/testimonials";
import { TestimonialListManager } from "@/components/admin/TestimonialListManager";
import { create, update, remove } from "./actions";

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const items = await getTestimonials(supabase);

  return (
    <TestimonialListManager
      items={items}
      createAction={create}
      updateAction={update}
      deleteAction={remove}
    />
  );
}
