"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import UploadDocumentModal from "@/components/UploadDocumentModal";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDocuments, useEmployees, useConfig } from "@/backend/useHooks";
import { DocumentItem, Employee } from "@/backend/data-types/models";
import { formatDisplayDate } from "@/lib/dateUtils";

function worstStatus(docs: DocumentItem[]): string {
  if (docs.some((d) => d.status === "expired")) return "expired";
  if (docs.some((d) => d.status === "expiring_soon")) return "expiring_soon";
  if (docs.some((d) => d.status === "renewed")) return "renewed";
  return "valid";
}

function StatusBadge({ status }: { status: string }) {
  if (status === "expired")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-bold tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        Expired
      </span>
    );
  if (status === "expiring_soon")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-[11px] font-bold tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        Expiring
      </span>
    );
  if (status === "renewed")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        Renewed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Active
    </span>
  );
}

function docDateColor(status: string) {
  if (status === "expired") return "text-red-600 font-semibold";
  if (status === "expiring_soon") return "text-orange-600 font-semibold";
  return "text-on-surface font-semibold";
}

function MobileEmployeeDocCard({
  employee,
  docs,
  onEdit,
  onDelete,
}: {
  employee: Employee;
  docs: DocumentItem[];
  onEdit: (doc: DocumentItem) => void;
  onDelete: (docId: string) => void;
}) {
  const status = worstStatus(docs);
  const cols = Math.min(docs.length, 3);

  return (
    <div
      className={cn(
        "glass-panel-heavy rounded-2xl overflow-hidden flex flex-col shadow-sm",
        status === "expired" && "ring-1 ring-red-200",
        status === "expiring_soon" && "ring-1 ring-orange-200"
      )}
    >
      {/* Top: company + status + actions */}
      <div className="px-4 pt-4 pb-3 flex justify-between items-start gap-2">
        <h4 className={cn(typography.heading.h3, "text-on-surface font-extrabold tracking-tight leading-tight")}>
          {employee.location || "Global HQ"}
        </h4>
        <div className="flex items-center gap-1 flex-shrink-0">
          <StatusBadge status={status} />
          <button
            onClick={() => docs[0] && onEdit(docs[0])}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
          <button
            onClick={() => docs.forEach((d) => onDelete(d.id))}
            className="p-1 text-on-surface-variant hover:text-error transition-colors"
            title="Delete"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>

      {/* Middle: avatar + name */}
      <div className="px-4 py-3 flex items-center gap-3 border-t border-b border-white/30">
        {employee.avatar_url ? (
          <img
            src={employee.avatar_url}
            alt={employee.full_name}
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-sm">
            <span className="material-symbols-outlined text-[24px] text-primary">person</span>
          </div>
        )}
        <p className={cn(typography.body.md, "text-on-surface-variant text-sm")}>
          Employee: <span className="font-bold text-on-surface">{employee.full_name}</span>
        </p>
      </div>

      {/* Bottom: doc expiry grid */}
      <div
        className="px-4 py-3 grid gap-x-3 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {docs.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onEdit(doc)}
            className="flex flex-col gap-0.5 text-left"
          >
            <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/70">
              {doc.document_type_name}
            </span>
            <span className={cn("text-[12px]", docDateColor(doc.status))}>
              {formatDisplayDate(doc.expiry_date)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MobileDocumentsPage() {
  const { documents, isLive, deleteDocument } = useDocuments();
  const { employees } = useEmployees();
  const { branches } = useConfig();

  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);

  const openNewModal = () => {
    setEditingDoc(null);
    setIsUploadModalOpen(true);
  };

  const openEditModal = (doc: DocumentItem) => {
    setEditingDoc(doc);
    setIsUploadModalOpen(true);
  };

  const getEmployee = (empId: string) => employees.find((e) => e.id === empId);

  const grouped = useMemo(() => {
    const map = new Map<string, { employee: Employee; docs: DocumentItem[] }>();
    documents.forEach((doc) => {
      const emp = getEmployee(doc.employee_id);
      if (!emp) return;

      const empCompany = emp.location || "Global HQ";
      const empName = emp.full_name.toLowerCase();
      const docName = (doc.document_type_name || "").toLowerCase();
      const docNum = (doc.document_number || "").toLowerCase();
      const q = search.toLowerCase();

      const matchesSearch =
        empName.includes(q) ||
        empCompany.toLowerCase().includes(q) ||
        docName.includes(q) ||
        docNum.includes(q);
      const matchesStatus = statusFilter === "All" || doc.status === statusFilter.toLowerCase().replace(" ", "_");
      const matchesCompany = companyFilter === "All" || empCompany === companyFilter;

      if (!matchesSearch || !matchesStatus || !matchesCompany) return;

      if (!map.has(emp.id)) map.set(emp.id, { employee: emp, docs: [] });
      map.get(emp.id)!.docs.push(doc);
    });
    return Array.from(map.values());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, employees, search, statusFilter, companyFilter]);

  const statusChips = ["All", "Active", "Expiring Soon", "Expired"];

  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      <div className="fixed inset-0 bg-background z-[99]"></div>

      <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-[101]">
        {/* Header */}
        <header className="w-full sticky top-0 z-40 bg-surface/60 backdrop-blur-md border-b border-white/20 shadow-sm flex justify-between items-center px-container-margin py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all active:scale-90 text-on-surface-variant">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <span className={cn(typography.body.md, "font-bold text-primary")}>Back</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                {isLive ? "Live" : "Local"}
              </span>
            </div>
            <Link href="/calendar" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all active:scale-90 text-primary">
              <span className="material-symbols-outlined">calendar_month</span>
            </Link>
          </div>
        </header>

        <main className="px-container-margin py-6 pb-safe">
          <header className="mb-4">
            <h1 className={cn(typography.heading.h1, "text-on-surface tracking-tight")}>Document Library</h1>
            <p className={cn(typography.body.md, "text-on-surface-variant mt-1")}>Manage and track employee compliance files.</p>
          </header>

          {/* Search */}
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className={cn(typography.body.md, "w-full h-12 pl-12 pr-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant outline-none shadow-sm")}
              placeholder="Search documents or employees..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Company filter */}
          <div className="mb-4">
            <select
              className={cn(typography.body.md, "w-full h-12 px-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-sm text-on-surface")}
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option value="All">All Companies</option>
              {branches.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Status chips */}
          <section className="mb-section-spacing -mx-container-margin overflow-x-auto hide-scrollbar flex items-center gap-3 px-container-margin">
            {statusChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setStatusFilter(chip)}
                className={cn(
                  typography.button.sm,
                  "px-5 py-2 rounded-full whitespace-nowrap active:scale-95 transition-transform",
                  statusFilter === chip
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "glass-panel text-on-surface-variant hover:bg-white/80"
                )}
              >
                {chip}
              </button>
            ))}
          </section>

          {/* Cards */}
          <div className="flex flex-col gap-stack-gap">
            {grouped.length === 0 ? (
              <div className="glass-panel-heavy p-8 rounded-2xl text-center text-on-surface-variant">
                No documents found.
              </div>
            ) : (
              grouped.map(({ employee, docs }) => (
                <MobileEmployeeDocCard
                  key={employee.id}
                  employee={employee}
                  docs={docs}
                  onEdit={openEditModal}
                  onDelete={deleteDocument}
                />
              ))
            )}
          </div>
        </main>

        <button
          onClick={openNewModal}
          className="fixed bottom-32 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center fab-glow active:scale-90 transition-transform z-[110] animate-float"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>

        <UploadDocumentModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          editingDocument={editingDoc}
        />

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
