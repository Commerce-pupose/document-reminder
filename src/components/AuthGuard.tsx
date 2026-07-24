"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/backend/supabase/services/authService";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    // Allow login route without redirection
    if (pathname?.includes("/login")) {
      setAuthorized(true);
      return;
    }

    const user = authService.getCurrentUser();
    if (!user) {
      setAuthorized(false);
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // Render a smooth loading spinner while checking authentication
  if (!authorized && !pathname?.includes("/login")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-on-surface-variant text-sm font-semibold">Redirecting to Login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
