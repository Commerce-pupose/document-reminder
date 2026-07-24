"use client";

import { useState } from "react";
import MobileCalendarTopAppBar from "../components/MobileCalendarTopAppBar";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDocuments, useEmployees, useConfig, getSmartDocumentIcon } from "@/backend/useHooks";
import { formatDisplayDate } from "@/lib/dateUtils";

export default function MobileCalendarPage() {
  const { documents, isLive } = useDocuments();
  const { employees } = useEmployees();
  const { documentTypes } = useConfig();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayDate, setSelectedDayDate] = useState<string | null>(null);

  const getEmployee = (empId: string) => {
    return employees.find((e) => e.id === empId);
  };

  const getDocIcon = (docTypeName: string) => {
    const found = documentTypes.find((dt) => dt.name.toLowerCase() === (docTypeName || "").toLowerCase());
    return (found && found.icon) || getSmartDocumentIcon(docTypeName);
  };

  // Calendar Grid Calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDayDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDayDate(null);
  };

  // Build grid days array
  const gridCells = [];
  // Prev month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    gridCells.push({ dayNum: prevMonthDays - i, isCurrentMonth: false, dateStr: null });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const isoDateStr = `${year}-${monthStr}-${dayStr}`;
    gridCells.push({ dayNum: d, isCurrentMonth: true, dateStr: isoDateStr });
  }
  // Next month padding to fill grid
  const remainingSlots = (7 - (gridCells.length % 7)) % 7;
  for (let i = 1; i <= remainingSlots; i++) {
    gridCells.push({ dayNum: i, isCurrentMonth: false, dateStr: null });
  }

  // Get expiry status for a date string
  const getDocsForDate = (dateStr: string | null) => {
    if (!dateStr) return [];
    return documents.filter((d) => {
      if (!d.expiry_date) return false;
      return d.expiry_date.startsWith(dateStr);
    });
  };

  const todayIso = new Date().toISOString().split('T')[0];

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

  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      <div className="relative z-[100]">
        <MobileCalendarTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto">
          {/* Header & Controls */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={cn(typography.heading.h2, "text-on-surface")}>{monthName}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <span className={cn(typography.caption.sm, "text-on-surface-variant font-medium")}>
                  {isLive ? "Supabase Live DB" : "Local State"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/40 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/40 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Calendar Month Grid */}
          <section className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-7 text-center gap-y-3">
              {/* Day Labels */}
              <span className={cn(typography.caption.md, "font-bold text-outline-variant")}>SUN</span>
              <span className={cn(typography.caption.md, "font-bold text-outline-variant")}>MON</span>
              <span className={cn(typography.caption.md, "font-bold text-outline-variant")}>TUE</span>
              <span className={cn(typography.caption.md, "font-bold text-outline-variant")}>WED</span>
              <span className={cn(typography.caption.md, "font-bold text-outline-variant")}>THU</span>
              <span className={cn(typography.caption.md, "font-bold text-outline-variant")}>FRI</span>
              <span className={cn(typography.caption.md, "font-bold text-outline-variant")}>SAT</span>

              {/* Grid Cells */}
              {gridCells.map((cell, idx) => {
                const dateDocs = getDocsForDate(cell.dateStr);
                const isSelected = selectedDayDate === cell.dateStr;
                const isToday = cell.dateStr === todayIso;

                const hasExpired = dateDocs.some((d) => d.status === 'expired');
                const hasExpiringSoon = dateDocs.some((d) => d.status === 'expiring_soon');
                const hasDocs = dateDocs.length > 0;

                return (
                  <div
                    key={idx}
                    onClick={() => cell.isCurrentMonth && cell.dateStr && setSelectedDayDate(isSelected ? null : cell.dateStr)}
                    className={cn(
                      "relative py-2 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all",
                      !cell.isCurrentMonth && "opacity-30 pointer-events-none",
                      isSelected && "bg-primary text-white shadow-md font-bold",
                      isToday && !isSelected && "ring-2 ring-primary ring-offset-1 font-bold text-primary"
                    )}
                  >
                    <span className={cn(typography.body.md, "font-medium")}>{cell.dayNum}</span>

                    {/* Expiry Dot Indicator */}
                    {hasDocs && (
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full mt-0.5",
                          hasExpired ? "bg-error" : hasExpiringSoon ? "bg-amber-500" : "bg-primary",
                          isSelected && "bg-white"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Day Filter Indicator */}
          {selectedDayDate && (
            <div className="mb-4 flex items-center justify-between bg-primary/10 p-3 rounded-xl">
              <span className={cn(typography.body.md, "text-primary font-bold")}>
                Showing expiries for {formatDisplayDate(selectedDayDate)}
              </span>
              <button onClick={() => setSelectedDayDate(null)} className="text-xs text-primary underline font-semibold">
                Show All
              </button>
            </div>
          )}

          {/* Timeline: EXPIRED */}
          {expiredDocs.length > 0 && (
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className={cn(typography.heading.h3, "text-error uppercase tracking-tight")}>EXPIRED</h3>
                <span className={cn(typography.label.sm, "font-bold text-error")}>{expiredDocs.length} Priority</span>
              </div>
              <div className="space-y-4">
                {expiredDocs.map((doc) => {
                  const emp = getEmployee(doc.employee_id);
                  return (
                    <div key={doc.id} className="relative pl-8">
                      <div className="timeline-line bg-error/40"></div>
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-error bg-white flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-error"></div>
                      </div>
                      <div className="bg-white/40 backdrop-blur-md border border-error/30 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-error/10 text-error rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                            {emp?.avatar_url ? (
                              <img className="w-full h-full object-cover rounded-full" alt={emp.full_name} src={emp.avatar_url} />
                            ) : (
                              (emp?.full_name || "E").charAt(0)
                            )}
                          </div>
                          <div>
                            <h4 className={cn(typography.heading.h4, "text-on-surface")}>{emp?.full_name || "Team Member"}</h4>
                            <p className={cn(typography.body.md, "text-error font-medium mt-0.5 flex items-center gap-1")}>
                              <span className="material-symbols-outlined text-[16px]">{getDocIcon(doc.document_type_name)}</span>
                              {doc.document_type_name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={cn(typography.label.sm, "inline-block px-3 py-1 rounded-full bg-error/10 text-error font-bold")}>
                            {formatDisplayDate(doc.expiry_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Timeline: EXPIRING THIS WEEK */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className={cn(typography.heading.h3, "text-on-surface uppercase tracking-tight")}>EXPIRING THIS WEEK</h3>
              <span className={cn(typography.caption.md, "text-on-surface-variant font-medium")}>{expiringThisWeekDocs.length} items</span>
            </div>
            {expiringThisWeekDocs.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl text-center text-on-surface-variant text-sm">
                No documents expiring this week.
              </div>
            ) : (
              <div className="space-y-4">
                {expiringThisWeekDocs.map((doc) => {
                  const emp = getEmployee(doc.employee_id);
                  return (
                    <div key={doc.id} className="relative pl-8">
                      <div className="timeline-line bg-amber-500/40"></div>
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-amber-500 bg-white flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      </div>
                      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center font-bold shrink-0">
                            {emp?.avatar_url ? (
                              <img className="w-full h-full object-cover rounded-full" alt={emp.full_name} src={emp.avatar_url} />
                            ) : (
                              (emp?.full_name || "E").charAt(0)
                            )}
                          </div>
                          <div>
                            <h4 className={cn(typography.heading.h4, "text-on-surface")}>{emp?.full_name || "Team Member"}</h4>
                            <p className={cn(typography.body.md, "text-on-surface-variant font-medium mt-0.5 flex items-center gap-1")}>
                              <span className="material-symbols-outlined text-[16px] text-primary">{getDocIcon(doc.document_type_name)}</span>
                              {doc.document_type_name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={cn(typography.body.md, "font-bold text-amber-600 block")}>
                            {formatDisplayDate(doc.expiry_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Timeline: UPCOMING */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className={cn(typography.heading.h3, "text-on-surface uppercase tracking-tight")}>UPCOMING</h3>
              <span className={cn(typography.caption.md, "text-on-surface-variant font-medium")}>{upcomingDocs.length} items</span>
            </div>
            {upcomingDocs.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl text-center text-on-surface-variant text-sm">
                No additional upcoming documents.
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingDocs.map((doc) => {
                  const emp = getEmployee(doc.employee_id);
                  return (
                    <div key={doc.id} className="relative pl-8">
                      <div className="timeline-line opacity-50"></div>
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-primary bg-white flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold shrink-0">
                            <span className="material-symbols-outlined">{getDocIcon(doc.document_type_name)}</span>
                          </div>
                          <div>
                            <h4 className={cn(typography.heading.h4, "text-on-surface")}>{emp?.full_name || "Team Member"}</h4>
                            <p className={cn(typography.body.md, "text-on-surface-variant opacity-80 mt-0.5")}>{doc.document_type_name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={cn(typography.body.md, "font-bold text-primary block")}>
                            {formatDisplayDate(doc.expiry_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>
        
        <MobileBottomNavBar />
      </div>
    </div>
  );
}
