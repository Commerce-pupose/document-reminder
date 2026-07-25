"use client";

import DesktopCalendarPage from "../desktop-view/calendar/page";
import MobileCalendarPage from "../mobile-view/calendar/page";
import DesktopLayout from "../desktop-view/layout";

export default function CalendarPage() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLayout>
          <DesktopCalendarPage />
        </DesktopLayout>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileCalendarPage />
      </div>
    </>
  );
}
