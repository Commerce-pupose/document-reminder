"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDocuments, useEmployees, useConfig, getSmartDocumentIcon } from "@/backend/useHooks";
import { formatDisplayDate } from "@/lib/dateUtils";

export default function CalendarPage() {
  const { documents, isLive } = useDocuments();
  const { employees } = useEmployees();
  const { documentTypes } = useConfig();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const getEmployee = (empId: string) => {
    return employees.find((e) => e.id === empId);
  };

  const getDocIcon = (docTypeName: string) => {
    const found = documentTypes.find((dt) => dt.name.toLowerCase() === (docTypeName || "").toLowerCase());
    return (found && found.icon) || getSmartDocumentIcon(docTypeName);
  };

  // Month navigation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDateStr(null);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDateStr(null);
  };
  const goToday = () => {
    setCurrentDate(new Date());
    setSelectedDateStr(null);
  };

  // Build grid cells
  const gridCells = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    gridCells.push({ dayNum: prevMonthDays - i, isCurrentMonth: false, dateStr: null });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const isoDateStr = `${year}-${monthStr}-${dayStr}`;
    gridCells.push({ dayNum: d, isCurrentMonth: true, dateStr: isoDateStr });
  }
  const remainingSlots = (7 - (gridCells.length % 7)) % 7;
  for (let i = 1; i <= remainingSlots; i++) {
    gridCells.push({ dayNum: i, isCurrentMonth: false, dateStr: null });
  }

  const getDocsForDate = (dateStr: string | null) => {
    if (!dateStr) return [];
    return documents.filter((d) => {
      if (!d.expiry_date) return false;
      return d.expiry_date.startsWith(dateStr);
    });
  };

  const todayIso = new Date().toISOString().split('T')[0];

  // Group documents
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiredDocs = documents.filter((d) => {
    if (d.status === "expired") return true;
    if (!d.expiry_date) return false;
    const exp = new Date(d.expiry_date);
    return exp < today;
  });

  const expiringThisWeekDocs = documents.filter((d) => {
    if (!d.expiry_date) return false;
    const exp = new Date(d.expiry_date);
    exp.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  const upcomingDocs = documents.filter((d) => {
    if (!d.expiry_date) return false;
    const exp = new Date(d.expiry_date);
    exp.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 7;
  });

  const complianceScore = documents.length > 0
    ? Math.round(((documents.length - expiredDocs.length) / documents.length) * 100)
    : 100;

  return (
    <div className="px-12 py-10 max-w-[1400px] mx-auto w-full space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className={cn(typography.heading.h1, "text-on-background")}>Expiry Calendar</h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                {isLive ? "Supabase Live DB" : "Local State"}
              </span>
            </div>
          </div>
          <p className={cn(typography.body.lg, "text-on-surface-variant mt-1")}>
            Managing {documents.length} document renewals across global workforce.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center bg-white/40 p-1 rounded-2xl border border-white/20 shadow-sm backdrop-blur-md">
          <button onClick={prevMonth} className={cn(typography.button.md, "px-4 py-2.5 rounded-xl hover:bg-white/60 transition-colors flex items-center text-on-surface-variant font-semibold")}>
            <span className="material-symbols-outlined mr-1 text-[20px]">chevron_left</span>
            Prev
          </button>
          <button onClick={goToday} className={cn(typography.button.md, "px-6 py-2.5 rounded-xl text-primary bg-white shadow-sm ring-1 ring-black/5 font-bold")}>
            {monthName}
          </button>
          <button onClick={nextMonth} className={cn(typography.button.md, "px-4 py-2.5 rounded-xl hover:bg-white/60 transition-colors flex items-center text-on-surface-variant font-semibold")}>
            Next
            <span className="material-symbols-outlined ml-1 text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Expired KPI */}
        <div className="glass-panel p-6 rounded-[24px] relative overflow-hidden border-l-4 border-l-error">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Expired Documents</p>
            <div className="w-10 h-10 bg-error/10 text-error rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">warning</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-on-surface")}>{expiredDocs.length}</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-error")}>
            <span>Requires urgent renewal</span>
          </div>
        </div>

        {/* Due Today KPI */}
        <div className="glass-panel p-6 rounded-[24px] relative overflow-hidden border-l-4 border-l-orange-500">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Due Today</p>
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">today</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-on-surface")}>{getDocsForDate(todayIso).length}</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-on-surface-variant")}>
            <span>Action required today</span>
          </div>
        </div>

        {/* Expiring This Week KPI */}
        <div className="glass-panel p-6 rounded-[24px] relative overflow-hidden border-l-4 border-l-tertiary">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Expiring This Week</p>
            <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">date_range</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-on-surface")}>{expiringThisWeekDocs.length}</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-tertiary")}>
            <span>Within next 7 days</span>
          </div>
        </div>

        {/* Compliance Score KPI */}
        <div className="glass-panel-heavy p-6 rounded-[24px] relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Compliance Score</p>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">verified</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-primary")}>{complianceScore}%</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-green-600")}>
            <span>Global workspace health</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Expiry Timeline List (Left) + Interactive Calendar Component (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Expiry Timeline List (Left Side, 5 cols) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={cn(typography.heading.h2, "text-on-surface")}>
              {selectedDateStr ? `Expiries for ${formatDisplayDate(selectedDateStr)}` : "All Expiries"}
            </h3>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto hide-scrollbar pr-1">
            {/* Filtered by Selected Day */}
            {selectedDateStr ? (
              getDocsForDate(selectedDateStr).length === 0 ? (
                <div className="glass-panel p-8 rounded-[20px] text-center text-on-surface-variant">
                  No documents expiring on {formatDisplayDate(selectedDateStr)}.
                </div>
              ) : (
                getDocsForDate(selectedDateStr).map((doc) => {
                  const emp = getEmployee(doc.employee_id);
                  return (
                    <div key={doc.id} className="glass-panel-heavy rounded-[20px] p-5 flex items-center justify-between gap-4 border-l-4 border-l-primary">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined">{getDocIcon(doc.document_type_name)}</span>
                        </div>
                        <div>
                          <h4 className={cn(typography.heading.h4, "text-on-surface")}>{emp?.full_name || "Team Member"}</h4>
                          <p className={cn(typography.caption.md, "text-on-surface-variant")}>{doc.document_type_name}</p>
                        </div>
                      </div>
                      <span className={cn(typography.caption.md, "font-bold text-primary bg-primary/10 px-3 py-1 rounded-full")}>
                        {formatDisplayDate(doc.expiry_date)}
                      </span>
                    </div>
                  );
                })
              )
            ) : (
              <>
                {/* Expired List */}
                {expiredDocs.map((doc) => {
                  const emp = getEmployee(doc.employee_id);
                  return (
                    <div key={doc.id} className="glass-panel-heavy rounded-[20px] p-4 flex items-center justify-between gap-3 border-l-4 border-l-error">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">warning</span>
                        </div>
                        <div>
                          <h4 className={cn(typography.heading.h4, "text-on-surface")}>{emp?.full_name || "Team Member"}</h4>
                          <p className={cn(typography.caption.md, "text-error font-medium")}>{doc.document_type_name} (Expired)</p>
                        </div>
                      </div>
                      <span className={cn(typography.caption.md, "font-bold text-error bg-error/10 px-3 py-1 rounded-full")}>
                        {formatDisplayDate(doc.expiry_date)}
                      </span>
                    </div>
                  );
                })}

                {/* Expiring Soon / Upcoming List */}
                {expiringThisWeekDocs.concat(upcomingDocs).map((doc) => {
                  const emp = getEmployee(doc.employee_id);
                  return (
                    <div key={doc.id} className="glass-panel rounded-[20px] p-4 flex items-center justify-between gap-3 border-l-4 border-l-primary">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{getDocIcon(doc.document_type_name)}</span>
                        </div>
                        <div>
                          <h4 className={cn(typography.heading.h4, "text-on-surface")}>{emp?.full_name || "Team Member"}</h4>
                          <p className={cn(typography.caption.md, "text-on-surface-variant")}>{doc.document_type_name}</p>
                        </div>
                      </div>
                      <span className={cn(typography.caption.md, "font-bold text-primary bg-primary/10 px-3 py-1 rounded-full")}>
                        {formatDisplayDate(doc.expiry_date)}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Calendar Grid Component (Right Side, 7 cols) */}
        <div className="xl:col-span-7 glass-panel-heavy p-6 sm:p-8 rounded-[24px] border border-white/40 shadow-xl space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-white/20">
            <h3 className={cn(typography.heading.h2, "text-on-surface")}>{monthName}</h3>
            {selectedDateStr && (
              <button
                onClick={() => setSelectedDateStr(null)}
                className="text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full font-bold hover:bg-primary/20 transition-colors"
              >
                Clear Date Filter ({formatDisplayDate(selectedDateStr)})
              </button>
            )}
          </div>

          {/* Month Calendar Grid */}
          <div className="grid grid-cols-7 text-center gap-2">
            {/* Day Header Labels */}
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((dayName) => (
              <span key={dayName} className={cn(typography.caption.md, "font-bold text-outline-variant py-2")}>
                {dayName}
              </span>
            ))}

            {/* Grid Cells */}
            {gridCells.map((cell, idx) => {
              const dateDocs = getDocsForDate(cell.dateStr);
              const isSelected = selectedDateStr === cell.dateStr;
              const isToday = cell.dateStr === todayIso;

              const hasExpired = dateDocs.some((d) => d.status === 'expired');
              const hasExpiringSoon = dateDocs.some((d) => d.status === 'expiring_soon');
              const hasDocs = dateDocs.length > 0;

              return (
                <div
                  key={idx}
                  onClick={() => cell.isCurrentMonth && cell.dateStr && setSelectedDateStr(isSelected ? null : cell.dateStr)}
                  className={cn(
                    "min-h-[70px] p-2 flex flex-col items-center justify-between rounded-2xl cursor-pointer transition-all border border-transparent",
                    !cell.isCurrentMonth && "opacity-25 pointer-events-none",
                    cell.isCurrentMonth && "hover:bg-white/60 hover:shadow-md",
                    isSelected && "bg-primary text-white shadow-lg border-primary font-bold scale-[1.03]",
                    isToday && !isSelected && "bg-primary/10 border-primary/40 font-bold text-primary"
                  )}
                >
                  <span className={cn(typography.body.lg, "font-semibold")}>{cell.dayNum}</span>

                  {/* Badges / Dots */}
                  {hasDocs && (
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          hasExpired ? "bg-error" : hasExpiringSoon ? "bg-amber-500" : "bg-primary",
                          isSelected && "bg-white"
                        )}
                        title={`${dateDocs.length} document(s)`}
                      />
                      <span className={cn(typography.caption.sm, "font-bold opacity-80", isSelected ? "text-white" : "text-on-surface-variant")}>
                        {dateDocs.length}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
