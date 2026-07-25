"use client";

import DesktopConfigPage from "../desktop-view/config/page";
import MobileConfigPage from "../mobile-view/config/page";
import DesktopLayout from "../desktop-view/layout";

export default function ConfigPage() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLayout>
          <DesktopConfigPage />
        </DesktopLayout>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileConfigPage />
      </div>
    </>
  );
}
