"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDashboardStats, useEmployees, useDocuments, useConfig, getSmartDocumentIcon } from "@/backend/useHooks";
import { formatDisplayDate } from "@/lib/dateUtils";

export default function Dashboard() {
  const { stats, loading } = useDashboardStats();
  const { employees } = useEmployees();
  const { documents, isLive } = useDocuments();
  const { documentTypes } = useConfig();

  const getEmployee = (empId: string) => {
    return employees.find((e) => e.id === empId);
  };

  const getDocIcon = (docTypeName: string) => {
    const found = documentTypes.find((dt) => dt.name.toLowerCase() === (docTypeName || "").toLowerCase());
    return (found && found.icon) || getSmartDocumentIcon(docTypeName);
  };

  // Filter urgent / upcoming expiries sorted by date
  const urgentExpiries = documents
    .filter((d) => d.status === "expired" || d.status === "expiring_soon")
    .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());

  return (
    <div className="p-4 sm:p-6 lg:p-container-margin space-y-6 lg:space-y-section-spacing max-w-[1400px] mx-auto w-full">

      {/* Header Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex justify-between items-end">
        <div>
          <h1 className={cn(typography.heading.h1, "text-on-surface tracking-tight")}>Good Morning</h1>
          <p className={cn(typography.body.lg, "text-on-surface-variant mt-1")}>Your employee documents and compliance are under control.</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 border border-white/60 shadow-sm">
          <span className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
          <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
            {isLive ? "Supabase Live DB" : "Local State"}
          </span>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-grid-gutter">

        {/* Total Employees */}
        <div className="glass-panel-heavy p-5 sm:p-card-padding rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
            <span className={cn(typography.label.sm, "px-3 py-1 bg-white/40 text-primary-fixed-dim rounded-full border border-white/50 whitespace-nowrap font-bold")}>
              Active Team
            </span>
          </div>
          <div className="space-y-1">
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Total Employees</p>
            <h3 className={cn(typography.number.hero, "text-on-surface")}>{loading ? "..." : stats.totalEmployees}</h3>
          </div>
          <div className="mt-6 flex -space-x-3">
            {employees.slice(0, 4).map((emp, i) => (
              <div key={emp.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                {emp.avatar_url ? (
                  <img className="w-full h-full object-cover" alt={emp.full_name} src={emp.avatar_url} />
                ) : (
                  emp.full_name.charAt(0)
                )}
              </div>
            ))}
            {employees.length > 4 && (
              <div className={cn(typography.caption.sm, "w-8 h-8 rounded-full border-2 border-white bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed")}>
                +{employees.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Active Documents */}
        <div className="glass-panel-heavy p-5 sm:p-card-padding rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            </div>
            <span className={cn(typography.label.sm, "flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full whitespace-nowrap font-bold")}>
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {stats.validDocumentsCount} Valid
            </span>
          </div>
          <div className="space-y-1">
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Total Repository Docs</p>
            <h3 className={cn(typography.number.hero, "text-on-surface")}>{loading ? "..." : documents.length}</h3>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-on-surface/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-tertiary rounded-full"
                style={{ width: `${documents.length > 0 ? (stats.validDocumentsCount / documents.length) * 100 : 100}%` }}
              ></div>
            </div>
            <span className={cn(typography.caption.sm, "text-on-surface-variant whitespace-nowrap font-bold")}>
              {documents.length > 0 ? Math.round((stats.validDocumentsCount / documents.length) * 100) : 100}% Compliant
            </span>
          </div>
        </div>

        {/* Expiring Soon & Expired */}
        <div className="glass-panel-heavy p-5 sm:p-card-padding rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-transform border-error/10 sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-error/10 text-error rounded-2xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_late</span>
            </div>
            <div className={cn(typography.label.sm, "px-2.5 py-1 bg-error text-white rounded-full whitespace-nowrap font-bold")}>
              Action Required
            </div>
          </div>
          <div className="space-y-1">
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Expiring &amp; Expired</p>
            <h3 className={cn(typography.number.hero, "text-on-surface")}>{loading ? "..." : stats.activeRemindersCount}</h3>
          </div>
          <p className={cn(typography.body.md, "mt-6 text-on-surface-variant")}>
            <span className="text-error font-bold">{stats.expiredDocumentsCount} Expired</span> • {stats.expiringDocumentsCount} Expiring Soon
          </p>
        </div>
      </section>

      {/* Quick Actions Row */}
      <section className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Link href="/employees" className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-primary">person_add</span>
          <span>Employees</span>
        </Link>
        <Link href="/documents" className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-tertiary">folder_managed</span>
          <span>Document Library</span>
        </Link>
        <Link href="/config" className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-secondary">tune</span>
          <span>System Config</span>
        </Link>
        <Link href="/calendar" className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-outline">calendar_month</span>
          <span>Calendar</span>
        </Link>
      </section>

      {/* Document List Section */}
      <section className="space-y-stack-gap">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
          <div>
            <h2 className={cn(typography.heading.h2, "text-on-surface")}>Upcoming Document Expiries</h2>
            <p className={cn(typography.body.md, "text-on-surface-variant")}>Priority actions required for employee credentials.</p>
          </div>
          <Link href="/documents" className={cn(typography.button.md, "text-primary hover:underline flex items-center gap-1")}>
            See all repository <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="space-y-3">
          {urgentExpiries.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl text-center text-on-surface-variant">
              No urgent document expiries requiring immediate action.
            </div>
          ) : (
            urgentExpiries.map((doc) => {
              const emp = getEmployee(doc.employee_id);
              const isExpired = doc.status === "expired";
              return (
                <div
                  key={doc.id}
                  className={`glass-panel hover:-translate-y-[2px] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group hover:bg-white/50 transition-all border-l-4 ${
                    isExpired ? "border-l-error" : "border-l-amber-500"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0 flex items-center justify-center font-bold text-primary">
                      {emp?.avatar_url ? (
                        <img className="w-full h-full object-cover" alt={emp.full_name} src={emp.avatar_url} />
                      ) : (
                        (emp?.full_name || "E").charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>{emp?.full_name || "Team Member"}</h4>
                      <p className={cn(typography.body.md, "text-on-surface-variant truncate")}>
                        {emp?.department_name || "General"} • {emp?.location || "Global HQ"}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-between sm:justify-start gap-2 pl-16 sm:pl-0">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">{getDocIcon(doc.document_type_name)}</span>
                      <span className={cn(typography.body.lg, "font-bold text-on-surface")}>{doc.document_type_name}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-1">
                    <span className={cn(typography.label.sm, `px-3 py-1 rounded-full whitespace-nowrap font-bold ${isExpired ? "bg-error/10 text-error" : "bg-amber-500/10 text-amber-600"}`)}>
                      {isExpired ? "Expired" : "Expiring Soon"} ({formatDisplayDate(doc.expiry_date)})
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}