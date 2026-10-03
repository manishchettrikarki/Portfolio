"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/login/actions";
import {
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  QuoteBubbleIcon,
  ImageIcon,
  EditIcon,
  FileTextIcon,
  MailIcon,
  ExternalLinkIcon,
  LogOutIcon,
} from "./AdminIcons";

const NAV_GROUPS = [
  {
    label: "Content",
    items: [
      { href: "/admin/dashboard/site", label: "Site & About", icon: UserIcon },
      { href: "/admin/dashboard/experience", label: "Experience", icon: BriefcaseIcon },
      { href: "/admin/dashboard/education", label: "Education", icon: GraduationCapIcon },
      { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: QuoteBubbleIcon },
      { href: "/admin/dashboard/portfolio", label: "Portfolio", icon: ImageIcon },
      { href: "/admin/dashboard/blogs", label: "Blogs", icon: EditIcon },
    ],
  },
  {
    label: "Files & inbox",
    items: [
      { href: "/admin/dashboard/cv", label: "CV / Resume", icon: FileTextIcon },
      { href: "/admin/dashboard/messages", label: "Messages", icon: MailIcon },
    ],
  },
];

export function Sidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-neutral-200/80 min-h-screen bg-white flex flex-col">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-neutral-100">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          A
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-neutral-900 leading-tight">
            Admin
          </p>
          <p className="text-xs text-neutral-400 leading-tight truncate">
            Portfolio dashboard
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = pathname?.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={active ? "text-indigo-600" : "text-neutral-400 group-hover:text-neutral-500"}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-neutral-100">
        {userEmail && (
          <p className="px-3 mb-2 text-xs text-neutral-400 truncate" title={userEmail}>
            {userEmail}
          </p>
        )}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
        >
          <ExternalLinkIcon size={16} className="text-neutral-400" />
          View site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 text-left text-sm px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOutIcon size={16} />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
