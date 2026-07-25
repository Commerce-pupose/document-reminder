"use client";

import DesktopEmployeesPage from "../desktop-view/employees/page";
import MobileEmployeesPage from "../mobile-view/employees/page";
import DesktopLayout from "../desktop-view/layout";

export default function EmployeesPage() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLayout>
          <DesktopEmployeesPage />
        </DesktopLayout>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileEmployeesPage />
      </div>
    </>
  );
}
