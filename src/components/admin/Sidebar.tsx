"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/login/actions";

const NAV = [
  { href: "/admin/dashboard/site", label: "Site & About" },
  { href: "/admin/dashboard/experience", label: "Experience" },
  { href: "/admin/dashboard/education", label: "Education" },
  { href: "/admin/dashboard/testimonials", label: "Testimonials" },
  { href: "/admin/dashboard/portfolio", label: "Portfolio" },
  { href: "/admin/dashboard/blogs", label: "Blogs" },
  { href: "/admin/dashboard/cv", label: "CV / Resume" },
  { href: "/admin/dashboard/messages", label: "Messages" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 min-h-screen p-4 flex flex-col">
      <div className="mb-6 px-2">
        <p className="font-bold text-lg">Admin</p>
        <p className="text-xs text-neutral-500">Portfolio dashboard</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm px-3 py-2 rounded-md transition-colors ${
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200">
        <Link
          href="/"
          target="_blank"
          className="text-sm px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
        >
          View site ↗
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full text-left text-sm px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
