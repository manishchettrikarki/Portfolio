// Shared Tailwind class tokens for the admin dashboard, so every list
// manager, form, and card looks consistent. Change the look of the whole
// dashboard by editing these in one place.

export const inputCls =
  "border border-neutral-200 rounded-lg py-2 px-3 text-sm w-full bg-white transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400";

export const labelCls = "text-xs font-medium text-neutral-500 mb-1 block";

export const cardCls =
  "border border-neutral-200/80 rounded-2xl p-5 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] mb-4";

export const btnPrimaryCls =
  "inline-flex items-center justify-center gap-1.5 bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:pointer-events-none shadow-sm";

export const btnDangerCls = "text-sm text-rose-600 hover:text-rose-700";

export const btnGhostCls =
  "text-sm text-neutral-600 py-2 px-4 rounded-lg hover:bg-neutral-100 transition-colors";

export const pageHeaderCls = "text-xl font-semibold text-neutral-900 mb-1 tracking-tight";
export const pageSubCls = "text-sm text-neutral-500 mb-6";
