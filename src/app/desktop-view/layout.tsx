"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopAppBar from "@/components/TopAppBar";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname?.includes("/login");

  if (isLoginPage) {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  return (
    <>
      <Sidebar />
      <TopAppBar />
      <main className="md:pl-[280px] flex flex-col min-h-screen">
        {children}
      </main>
    </>
  );
}
