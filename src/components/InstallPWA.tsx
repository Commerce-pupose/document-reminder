"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already running in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("[PWA] User accepted the install prompt");
    } else {
      console.log("[PWA] User dismissed the install prompt");
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700/60 backdrop-blur-md transition-all duration-300 transform translate-y-0 flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
        <img src="/icons/icon-192x192.png" alt="Reminder Icon" className="w-9 h-9 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-100 truncate">Reminder App</h4>
        <p className="text-xs text-slate-400 leading-tight">Install for fast offline access & reminders</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleInstallClick}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          Install
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-slate-200 p-1 text-xs"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
