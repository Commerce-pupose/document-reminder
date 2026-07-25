"use client";

import DesktopReportsPage from "../desktop-view/reports/page";
import MobileReportsPage from "../mobile-view/reports/page";
import DesktopLayout from "../desktop-view/layout";

export default function ReportsPage() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLayout>
          <DesktopReportsPage />
        </DesktopLayout>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileReportsPage />
      </div>
    </>
  );
}
