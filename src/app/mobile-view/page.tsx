"use client";

import { useState } from "react";
import Link from "next/link";
import MobileTopAppBar from "./components/MobileTopAppBar";
import MobileBottomNavBar from "./components/MobileBottomNavBar";
import MobileSplashScreen from "./components/MobileSplashScreen";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDashboardStats, useEmployees, useDocuments, useConfig, getSmartDocumentIcon } from "@/backend/useHooks";
import { formatDisplayDate } from "@/lib/dateUtils";

export default function MobileDashboard() {
  const [showSplash, setShowSplash] = useState(true);

  const { stats, loading: statsLoading } = useDashboardStats();
  const { employees, loading: empLoading } = useEmployees();
  const { documents, isLive, loading: docLoading } = useDocuments();
  const { documentTypes, loading: configLoading } = useConfig();

  // Pre-loading flag: indicates when all core data fetching is complete
  const isDataLoaded = !statsLoading && !empLoading && !docLoading && !configLoading;

  const getEmployee = (empId: string) => {
    return employees.find((e) => e.id === empId);
  };

  const getDocIcon = (docTypeName: string) => {
    const found = documentTypes.find((dt) => dt.name.toLowerCase() === (docTypeName || "").toLowerCase());
    return (found && found.icon) || getSmartDocumentIcon(docTypeName);
  };

  const urgentExpiries = documents
    .filter((d) => d.status === "expired" || d.status === "expiring_soon")
    .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());

  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      {/* Mobile Video Splash Screen - Preloads Dashboard Data during playback */}
      {showSplash && (
        <MobileSplashScreen
          isDataLoaded={isDataLoaded}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      {/* Mobile view content */}
      <div className="relative z-[100]">
        <MobileTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto space-y-8">
          {/* Summary Hero Card */}
          <section className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[24px] p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <p className={cn(typography.label.md, "uppercase tracking-widest text-on-surface-variant/80")}>Total Employees</p>
                <div className="flex items-start">
                  <h2 className={cn(typography.number.hero, "leading-none tracking-tighter text-on-surface")}>
                    {stats.totalEmployees}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                  <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                    {isLive ? "Live DB" : "Local"}
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {employees.slice(0, 3).map((emp) => (
                    <div key={emp.id} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-sm overflow-hidden font-bold text-white text-xs">
                      {emp.avatar_url ? (
                        <img className="w-full h-full object-cover" alt={emp.full_name} src={emp.avatar_url} />
                      ) : (
                        emp.full_name.charAt(0)
                      )}
                    </div>
                  ))}
                </div>
                <p className={cn(typography.caption.sm, "text-on-surface-variant text-right leading-tight font-bold")}>
                  {stats.validDocumentsCount} active<br />documents
                </p>
              </div>
            </div>
            <div className={cn(typography.label.md, "flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full w-fit mt-2 font-bold")}>
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{documents.length > 0 ? Math.round((stats.validDocumentsCount / documents.length) * 100) : 100}% Compliance Score</span>
            </div>
          </section>

          {/* Quick Actions Row */}
          <section className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center gap-2">
              <Link href="/employees" className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-primary shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">group</span>
              </Link>
              <span className={cn(typography.button.sm, "text-on-surface-variant text-center leading-tight")}>Employees</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link href="/documents" className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-tertiary shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">folder_managed</span>
              </Link>
              <span className={cn(typography.button.sm, "text-on-surface-variant text-center leading-tight")}>Docs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link href="/config" className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-secondary shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">tune</span>
              </Link>
              <span className={cn(typography.button.sm, "text-on-surface-variant text-center leading-tight")}>Config</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link href="/calendar" className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-outline shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">calendar_month</span>
              </Link>
              <span className={cn(typography.button.sm, "text-on-surface-variant text-center leading-tight")}>Calendar</span>
            </div>
          </section>

          {/* Upcoming Document Expiries */}
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className={cn(typography.heading.h2, "text-on-surface")}>Upcoming Expiries</h3>
              <Link href="/documents" className={cn(typography.button.sm, "text-primary hover:underline")}>See all</Link>
            </div>

            {urgentExpiries.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl text-center text-on-surface-variant text-sm">
                No urgent expiries recorded.
              </div>
            ) : (
              urgentExpiries.map((doc) => {
                const emp = getEmployee(doc.employee_id);
                const isExpired = doc.status === "expired";
                return (
                  <div key={doc.id} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {emp?.avatar_url ? (
                        <img className="w-full h-full object-cover" alt={emp.full_name} src={emp.avatar_url} />
                      ) : (
                        (emp?.full_name || "E").charAt(0)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={cn(typography.heading.h4, "text-on-surface truncate")}>{emp?.full_name || "Team Member"}</h4>
                        <span className={cn(typography.label.sm, `px-1.5 py-0.5 rounded-full shrink-0 font-bold ${isExpired ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`)}>
                          {isExpired ? "EXPIRED" : "SOON"}
                        </span>
                      </div>
                      <p className={cn(typography.body.md, "text-on-surface-variant truncate mt-0.5 flex items-center gap-1")}>
                        <span className="material-symbols-outlined text-[16px] text-primary">{getDocIcon(doc.document_type_name)}</span>
                        {doc.document_type_name}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={cn(typography.body.md, `font-bold ${isExpired ? "text-error" : "text-amber-600"}`)}>
                        {formatDisplayDate(doc.expiry_date)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </main>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
