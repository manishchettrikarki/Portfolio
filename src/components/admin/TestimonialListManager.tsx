"use client";

import { useState, useTransition } from "react";
import type { TestimonialRow } from "@/lib/data/types";

type Item = TestimonialRow;
type Input = Omit<Item, "id" | "created_at">;

const inputCls =
  "border border-gray-300 rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
const cardCls = "border border-neutral-200 rounded-lg p-5 bg-white mb-4";

const emptyForm: Input = { name: "", role: "", text: "", sort_order: 0 };

export function TestimonialListManager({
  items,
  createAction,
  updateAction,
  deleteAction,
}: {
  items: Item[];
  createAction: (input: Input) => Promise<unknown>;
  updateAction: (id: string, input: Partial<Input>) => Promise<unknown>;
  deleteAction: (id: string) => Promise<unknown>;
}) {
  const [pending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Input>(emptyForm);

  function startEdit(item?: Item) {
    if (item) {
      setEditingId(item.id);
      setForm({ name: item.name, role: item.role, text: item.text, sort_order: item.sort_order });
    } else {
      setEditingId("new");
      setForm({ ...emptyForm, sort_order: items.length });
    }
  }

  function cancel() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function save() {
    startTransition(async () => {
      if (editingId === "new") await createAction(form);
      else if (editingId) await updateAction(editingId, form);
      cancel();
    });
  }

  function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    startTransition(async () => {
      await deleteAction(id);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Testimonials</h1>
        {editingId === null && (
          <button
            onClick={() => startEdit()}
            className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700"
          >
            + Add testimonial
          </button>
        )}
      </div>

      {editingId !== null && (
        <section className={cardCls}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              className={inputCls}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Role / company"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <textarea
            className={inputCls}
            rows={3}
            placeholder="Testimonial text"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <div className="flex gap-2 mt-3">
            <button
              disabled={pending}
              onClick={save}
              className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button onClick={cancel} className="text-sm text-neutral-600 py-2 px-4 rounded-md hover:bg-neutral-100">
              Cancel
            </button>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className={cardCls + " flex items-start justify-between"}>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-neutral-600">{item.role}</p>
              <p className="text-sm text-neutral-500 mt-1">{item.text}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="text-sm text-blue-600">Edit</button>
              <button onClick={() => remove(item.id)} className="text-sm text-red-600">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-neutral-500">No testimonials yet.</p>}
      </div>
    </div>
  );
}
