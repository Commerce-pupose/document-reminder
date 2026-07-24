"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import NotificationPopover from "@/components/NotificationPopover";

export default function MobileEmployeesTopAppBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-[110] bg-surface/60 backdrop-blur-2xl border-b border-white/20 shadow-sm flex justify-between items-center px-4 py-3">
      <div className="flex items-center gap-3">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 border border-white/30 backdrop-blur-md hover:opacity-80 transition-opacity active:scale-95 shadow-sm">
          <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
        </Link>
        <h1 className={cn(typography.heading.h2, "text-primary text-base font-bold")}>Employee Docs</h1>
      </div>
      <NotificationPopover />
    </header>
  );
}
