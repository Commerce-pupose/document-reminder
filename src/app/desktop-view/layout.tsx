import Sidebar from "@/components/Sidebar";
import TopAppBar from "@/components/TopAppBar";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
