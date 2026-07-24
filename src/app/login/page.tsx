"use client";

import DesktopLoginPage from "../desktop-view/login/page";
import MobileLoginPage from "../mobile-view/login/page";

export default function LoginPage() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLoginPage />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileLoginPage />
      </div>
    </>
  );
}
