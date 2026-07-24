"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import NotificationPopover from "@/components/NotificationPopover";
import GlobalSearchBar from "@/components/GlobalSearchBar";

export default function MobileTopAppBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[110] backdrop-blur-xl bg-surface/60 border-b border-white/20 px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary p-0.5 bg-white shadow-sm shrink-0">
            <img src="/screen.png" alt="HR Portal Logo" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div>
            <h1 className={cn(typography.heading.h3, "text-on-surface leading-tight text-sm font-bold")}>Good Morning!</h1>
            <p className={cn(typography.body.md, "text-on-surface-variant text-xs")}>Documents are under control.</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-white/50 transition-all active:scale-90"
            title="Toggle Search"
          >
            <span className="material-symbols-outlined">{showSearch ? "close" : "search"}</span>
          </button>
          <Link href="/desktop-view/calendar" className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-white/50 transition-all active:scale-90">
            <span className="material-symbols-outlined">calendar_month</span>
          </Link>
          <NotificationPopover />
        </div>
      </div>

      {showSearch && (
        <div className="mt-3 pt-2 border-t border-white/20 animate-in fade-in slide-in-from-top-1 duration-200">
          <GlobalSearchBar />
        </div>
      )}
    </header>
  );
}
