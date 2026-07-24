"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        // Unregister stale service workers (old hr-portal cache) so the new
        // 'reminder-app-v2' cache activates and serves the updated manifest.
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          const sw = reg.active || reg.waiting || reg.installing;
          if (sw) {
            try {
              const resp = await fetch(reg.scope + "sw.js");
              const text = await resp.text();
              if (text.includes("hr-portal")) {
                await reg.unregister();
                console.log("[PWA] Unregistered stale hr-portal service worker");
              }
            } catch {
              // ignore fetch errors
            }
          }
        }

        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log(
              "[PWA] ServiceWorker successfully registered with scope:",
              registration.scope
            );
            // Force immediate activation so updated manifest is applied
            if (registration.waiting) {
              registration.waiting.postMessage({ type: "SKIP_WAITING" });
            }
          })
          .catch((error) => {
            console.error("[PWA] ServiceWorker registration failed:", error);
          });
      });
    }
  }, []);

  return null;
}
