"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ResponsiveRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isMobileRoute = pathname.startsWith("/mobile-view");

      if (isMobile && !isMobileRoute) {
        // Map desktop to mobile routes
        if (pathname === "/") router.replace("/mobile-view");
        else if (pathname === "/employees") router.replace("/mobile-view/employees");
        else if (pathname === "/calendar") router.replace("/mobile-view/calendar");
        else if (pathname === "/reports") router.replace("/mobile-view/reports");
        else if (pathname === "/settings") router.replace("/mobile-view/settings");
      } else if (!isMobile && isMobileRoute) {
        // Map mobile to desktop routes
        if (pathname === "/mobile-view") router.replace("/");
        else if (pathname === "/mobile-view/employees") router.replace("/employees");
        else if (pathname === "/mobile-view/calendar") router.replace("/calendar");
        else if (pathname === "/mobile-view/reports") router.replace("/reports");
        else if (pathname === "/mobile-view/settings") router.replace("/settings");
      }
    };

    // Run on initial mount and when route changes
    handleResize();

    // Run on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname, router, mounted]);

  // Return nothing, this is purely for side-effects
  return null;
}
