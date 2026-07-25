"use client";

import DesktopDocumentsPage from "../desktop-view/documents/page";
import MobileDocumentsPage from "../mobile-view/documents/page";
import DesktopLayout from "../desktop-view/layout";

export default function DocumentsPage() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLayout>
          <DesktopDocumentsPage />
        </DesktopLayout>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileDocumentsPage />
      </div>
    </>
  );
}
