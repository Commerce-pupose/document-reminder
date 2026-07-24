"use client";

import Dashboard from "./desktop-view/page";
import MobileDashboard from "./mobile-view/page";
import DesktopLayout from "./desktop-view/layout";

export default function HomePage() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLayout>
          <Dashboard />
        </DesktopLayout>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileDashboard />
      </div>
    </>
  );
}
