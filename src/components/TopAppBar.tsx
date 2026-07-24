"use client";

import GlobalSearchBar from "./GlobalSearchBar";
import NotificationPopover from "./NotificationPopover";

export default function TopAppBar() {
  return (
    <header className="hidden md:flex md:pl-[300px] sticky top-0 z-40 backdrop-blur-[40px] border-b border-white/10 bg-surface/40 justify-between items-center px-card-padding py-4">
      <div className="flex items-center gap-8 flex-1">
        <GlobalSearchBar />
      </div>

      <div className="flex items-center gap-6">
        <NotificationPopover />
      </div>
    </header>
  );
}
