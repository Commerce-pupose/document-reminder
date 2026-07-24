"use client";

import { useState } from "react";
import MobileReportsTopAppBar from "../components/MobileReportsTopAppBar";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDashboardStats, useEmployees, useDocuments, useConfig } from "@/backend/useHooks";

export default function MobileReportsPage() {
  const { stats, loading } = useDashboardStats();
  const { employees } = useEmployees();
  const { documents } = useDocuments();
  const { documentTypes } = useConfig();

  const [selectedType, setSelectedType] = useState<string>("All");

  const filteredDocs = selectedType === "All"
    ? documents
    : documents.filter((d) => (d.document_type_name || "").toLowerCase() === selectedType.toLowerCase());

  const totalFiltered = filteredDocs.length;
  const validFiltered = filteredDocs.filter((d) => d.status === "valid").length;
  const complianceRate = totalFiltered > 0 ? Math.round((validFiltered / totalFiltered) * 100) : 100;

  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32 overflow-x-hidden">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      <div className="relative z-[100]">
        <MobileReportsTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto space-y-6">
          {/* Filter Chips */}
          <section className="flex gap-2 overflow-x-auto hide-scrollbar py-2 -mx-2 px-2">
            <button
              onClick={() => setSelectedType("All")}
              className={cn(
                typography.button.sm,
                "px-5 py-2 rounded-full shrink-0 font-bold transition-all",
                selectedType === "All" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/40 border border-white/60 text-on-surface-variant"
              )}
            >
              All
            </button>
            {documentTypes.map((dt) => (
              <button
                key={dt.id}
                onClick={() => setSelectedType(dt.name)}
                className={cn(
                  typography.button.sm,
                  "px-5 py-2 rounded-full shrink-0 font-bold transition-all whitespace-nowrap",
                  selectedType === dt.name ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/40 border border-white/60 text-on-surface-variant"
                )}
              >
                {dt.name}
              </button>
            ))}
          </section>

          {/* Overview Card */}
          <section className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm shadow-primary/5">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="absolute inset-0 transform -rotate-90 w-40 h-40">
                <circle className="text-primary-container/20" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12" />
                <circle
                  className="text-primary"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="70"
                  stroke="currentColor"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * complianceRate) / 100}
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className={cn(typography.number.hero, "leading-none text-on-surface")}>{loading ? "..." : `${complianceRate}%`}</span>
                <span className={cn(typography.caption.sm, "font-bold text-on-surface-variant mt-1")}>Compliance</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className={cn(typography.heading.h3, "text-on-surface mb-1")}>Overall Compliance</h2>
              <p className={cn(typography.body.md, "text-on-surface-variant")}>
                {selectedType === "All" ? "Across all active documents" : `Filtered by ${selectedType}`}
              </p>
            </div>
          </section>

          {/* Metric Grid */}
          <section className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">description</span>
              <span className={cn(typography.number.medium, "text-on-surface")}>{totalFiltered}</span>
              <span className={cn(typography.label.md, "text-on-surface-variant font-semibold")}>Total Documents</span>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <span className="material-symbols-outlined text-emerald-600 text-[24px]">verified</span>
              <span className={cn(typography.number.medium, "text-on-surface")}>{validFiltered}</span>
              <span className={cn(typography.label.md, "text-on-surface-variant font-semibold")}>Valid Documents</span>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <span className="material-symbols-outlined text-amber-500 text-[24px]">pending_actions</span>
              <span className={cn(typography.number.medium, "text-on-surface")}>{stats.expiringDocumentsCount}</span>
              <span className={cn(typography.label.md, "text-on-surface-variant font-semibold")}>Expiring Soon</span>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <span className="material-symbols-outlined text-error text-[24px]">event_busy</span>
              <span className={cn(typography.number.medium, "text-error")}>{stats.expiredDocumentsCount}</span>
              <span className={cn(typography.label.md, "text-on-surface-variant font-semibold")}>Expired</span>
            </div>
          </section>

          {/* Workforce Overview */}
          <section className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className={cn(typography.heading.h3, "text-on-surface font-bold")}>Active Workforce</span>
              <span className={cn(typography.caption.sm, "text-primary font-bold")}>{employees.length} Staff Members</span>
            </div>
            <div className="w-full bg-white/50 h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${complianceRate}%` }} />
            </div>
            <p className={cn(typography.caption.sm, "text-on-surface-variant")}>
              {stats.validDocumentsCount} of {totalFiltered} tracked records are fully compliant.
            </p>
          </section>
        </main>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
