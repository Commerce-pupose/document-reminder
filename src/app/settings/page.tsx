"use client";

import DesktopSettingsPage from "../desktop-view/settings/page";
import MobileSettingsPage from "../mobile-view/settings/page";
import DesktopLayout from "../desktop-view/layout";

export default function SettingsPage() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLayout>
          <DesktopSettingsPage />
        </DesktopLayout>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileSettingsPage />
      </div>
    </>
  );
}
