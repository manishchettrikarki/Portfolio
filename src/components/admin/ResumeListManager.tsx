"use client";

import { useState, useTransition } from "react";
import type { ExperienceRow } from "@/lib/data/types";

type Item = ExperienceRow; // education rows share the same shape
type Input = Omit<Item, "id" | "created_at">;

const inputCls =
  "border border-gray-300 rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
const cardCls = "border border-neutral-200 rounded-lg p-5 bg-white mb-4";

const emptyForm: Input = { period: "", title: "", subtitle: "", description: "", sort_order: 0 };

export function ResumeListManager({
  entityLabel,
  items,
  createAction,
  updateAction,
  deleteAction,
}: {
  entityLabel: string;
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
      setForm({
        period: item.period,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        sort_order: item.sort_order,
      });
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
      if (editingId === "new") {
        await createAction(form);
      } else if (editingId) {
        await updateAction(editingId, form);
      }
      cancel();
    });
  }

  function remove(id: string) {
    if (!confirm(`Delete this ${entityLabel.toLowerCase()} entry?`)) return;
    startTransition(async () => {
      await deleteAction(id);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">{entityLabel}</h1>
        {editingId === null && (
          <button
            onClick={() => startEdit()}
            className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700"
          >
            + Add entry
          </button>
        )}
      </div>

      {editingId !== null && (
        <section className={cardCls}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              className={inputCls}
              placeholder="Period (e.g. 2023 – Present)"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Subtitle (e.g. company / school)"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
            <input
              type="number"
              className={inputCls}
              placeholder="Sort order"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            />
          </div>
          <textarea
            className={inputCls}
            rows={3}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex gap-2 mt-3">
            <button
              disabled={pending}
              onClick={save}
              className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              onClick={cancel}
              className="text-sm text-neutral-600 py-2 px-4 rounded-md hover:bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className={cardCls + " flex items-start justify-between"}>
            <div>
              <p className="text-xs text-neutral-500">{item.period}</p>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-neutral-600">{item.subtitle}</p>
              <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="text-sm text-blue-600">
                Edit
              </button>
              <button onClick={() => remove(item.id)} className="text-sm text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-neutral-500">No entries yet.</p>
        )}
      </div>
    </div>
  );
}
