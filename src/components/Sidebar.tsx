"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Dashboard", icon: "dashboard" },
    { href: "/employees", label: "Employees", icon: "group" },
    { href: "/documents", label: "Documents", icon: "description" },
    { href: "/calendar", label: "Calendar", icon: "calendar_month" },
    { href: "/reports", label: "Reports", icon: "analytics" },
    { href: "/config", label: "Config", icon: "tune" },
    { href: "/settings", label: "Settings", icon: "settings" },
  ];

  return (
    <aside className="hidden md:flex h-screen w-[280px] fixed left-0 top-0 backdrop-blur-[20px] border-r border-white/20 bg-surface-container/60 flex-col py-8 px-5 z-50">
      <div className="mb-12 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/50 border border-white/60 shadow-md flex items-center justify-center p-1 shrink-0">
          <img src="/screen.png" alt="Reminder Logo" className="w-full h-full object-contain rounded-lg" />
        </div>
        <div>
          <h1 className={cn(typography.heading.h2, "text-primary")}>Reminder</h1>
          <p className={cn(typography.caption.sm, "uppercase tracking-widest text-on-surface-variant/70 font-bold")}>Document Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-4 py-3 px-4 rounded-xl transition-all",
                isActive
                  ? "text-primary font-bold border-r-4 border-primary active:scale-95 bg-white/40"
                  : "text-on-surface-variant hover:bg-white/10"
              )}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className={cn(typography.body.md)}>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Link href="/documents" className={cn(typography.button.lg, "w-full py-4 px-4 bg-primary text-white rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-all active:scale-95 font-bold")}>
          <span className="material-symbols-outlined">upload_file</span>
          <span>Upload Document</span>
        </Link>
      </div>
    </aside>
  );
}
