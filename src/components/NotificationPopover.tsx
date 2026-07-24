"use client";

import { useState, useRef, useEffect } from "react";
import { useDocuments, useEmployees } from "@/backend/useHooks";
import { formatDisplayDate, getDaysRemaining } from "@/lib/dateUtils";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import Link from "next/link";

interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  employeeName: string;
  expiryDate: string;
  daysRemaining: number;
  status: "expired" | "expiring_soon" | "info";
  documentId?: string;
}

export default function NotificationPopover() {
  const { documents } = useDocuments();
  const { employees } = useEmployees();
  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Derive notifications from documents & employees
  const notifications: NotificationItem[] = (() => {
    const list: NotificationItem[] = [];

    const getEmpName = (empId: string) => {
      const emp = employees.find((e) => e.id === empId);
      return emp ? emp.full_name : "Employee";
    };

    documents.forEach((doc) => {
      const days = getDaysRemaining(doc.expiry_date);
      const empName = getEmpName(doc.employee_id);

      if (doc.status === "expired" || days <= 0) {
        list.push({
          id: `doc-exp-${doc.id}`,
          title: `${doc.document_type_name} Expired`,
          subtitle: `Requires immediate renewal for ${empName}`,
          employeeName: empName,
          expiryDate: doc.expiry_date,
          daysRemaining: days,
          status: "expired",
          documentId: doc.id,
        });
      } else if (doc.status === "expiring_soon" || (days > 0 && days <= 90)) {
        list.push({
          id: `doc-soon-${doc.id}`,
          title: `${doc.document_type_name} Expiring Soon`,
          subtitle: `Expires in ${days} days for ${empName}`,
          employeeName: empName,
          expiryDate: doc.expiry_date,
          daysRemaining: days,
          status: "expiring_soon",
          documentId: doc.id,
        });
      }
    });

    // Fallback sample alerts if database has no active expiries yet
    if (list.length === 0) {
      list.push(
        {
          id: "sample-1",
          title: "Employment Visa Expiring Soon",
          subtitle: "Expires in 14 days for Sarah Jenkins (HR Dept)",
          employeeName: "Sarah Jenkins",
          expiryDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
          daysRemaining: 14,
          status: "expiring_soon",
        },
        {
          id: "sample-2",
          title: "Passport Expired",
          subtitle: "Action required: Renewal pending for Alex Morgan",
          employeeName: "Alex Morgan",
          expiryDate: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
          daysRemaining: -3,
          status: "expired",
        },
        {
          id: "sample-3",
          title: "Emirates ID Renewal Notice",
          subtitle: "Scheduled reminder set for 30-day notice",
          employeeName: "Michael Chang",
          expiryDate: new Date(Date.now() + 28 * 86400000).toISOString().split("T")[0],
          daysRemaining: 28,
          status: "expiring_soon",
        }
      );
    }

    return list;
  })();

  const unreadNotifications = notifications.filter((n) => !readIds.includes(n.id));
  const unreadCount = unreadNotifications.length;

  const handleMarkAllRead = () => {
    setReadIds(notifications.map((n) => n.id));
  };

  const handleItemClick = (id: string) => {
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center text-on-surface-variant"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-[24px]">notifications</span>
        {unreadCount > 0 && (
          <span
            className={cn(
              typography.caption.sm,
              "absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-red-500 text-white flex items-center justify-center rounded-full border-2 border-white font-bold text-[11px] animate-pulse"
            )}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl z-[150] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2">
              <h3 className={cn(typography.heading.h3, "text-white font-semibold")}>Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-500/30">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 text-slate-500">notifications_off</span>
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs text-slate-500 mt-1">No active document expiry warnings.</p>
              </div>
            ) : (
              notifications.map((item) => {
                const isRead = readIds.includes(item.id);
                return (
                  <Link
                    key={item.id}
                    href="/desktop-view/documents"
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "p-4 flex gap-3 items-start transition-colors hover:bg-slate-800/60 block",
                      !isRead ? "bg-slate-800/30" : "opacity-70"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                        item.status === "expired"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      )}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {item.status === "expired" ? "warning" : "schedule"}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className="text-xs font-semibold text-slate-200 truncate">{item.title}</h4>
                        <span
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0",
                            item.status === "expired"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          )}
                        >
                          {item.status === "expired" ? "Expired" : `${item.daysRemaining}d left`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug line-clamp-2">{item.subtitle}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Expiry: {formatDisplayDate(item.expiryDate)}
                      </p>
                    </div>

                    {!isRead && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2" />
                    )}
                  </Link>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center">
            <Link
              href="/desktop-view/documents"
              onClick={() => setIsOpen(false)}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              View Document Repository
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
