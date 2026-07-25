"use client";

import { useState } from "react";
import Link from "next/link";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import UploadDocumentModal from "@/components/UploadDocumentModal";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDocuments, useEmployees, useConfig, getSmartDocumentIcon } from "@/backend/useHooks";
import { DocumentItem } from "@/backend/data-types/models";
import { formatDisplayDate } from "@/lib/dateUtils";

export default function MobileDocumentsPage() {
  const { documents, isLive, deleteDocument } = useDocuments();
  const { employees } = useEmployees();
  const { documentTypes, branches } = useConfig();

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
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

  const getEmployee = (empId: string) => {
    return employees.find((e) => e.id === empId);
  };

  const getEmployeeName = (empId: string) => {
    const found = getEmployee(empId);
    return found ? found.full_name : "Team Member";
  };

  const getEmployeeCompany = (empId: string) => {
    const found = getEmployee(empId);
    return found ? (found.location || "Global Headquarters") : "";
  };

  const getDocIcon = (docTypeName: string) => {
    const found = documentTypes.find((dt) => dt.name.toLowerCase() === (docTypeName || "").toLowerCase());
    if (found && found.icon) {
      return found.icon;
    }
    return getSmartDocumentIcon(docTypeName);
  };

  const filteredDocuments = documents.filter((doc) => {
    const emp = getEmployee(doc.employee_id);
    const empName = (emp ? emp.full_name : "Team Member").toLowerCase();
    const empCompany = emp ? (emp.location || "Global Headquarters") : "";
    const docName = (doc.document_type_name || "").toLowerCase();
    const docNum = (doc.document_number || "").toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch = empName.includes(q) || docName.includes(q) || docNum.includes(q);
    const matchesType = selectedType === "All" || docName.includes(selectedType.toLowerCase());
    const matchesCompany = companyFilter === "All" || empCompany === companyFilter;

    return matchesSearch && matchesType && matchesCompany;
  });

  const getStatusBadge = (status: string) => {
    if (status === "expired") {
      return (
        <span className={cn(typography.label.sm, "flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Expired
        </span>
      );
    }
    if (status === "expiring_soon") {
      return (
        <span className={cn(typography.label.sm, "flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          Expiring Soon
        </span>
      );
    }
    return (
      <span className={cn(typography.label.sm, "flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold")}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        Active
      </span>
    );
  };

  const categoryChips = ["All", ...documentTypes.map((dt) => dt.name)];

  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      {/* Dynamic Atmospheric Background */}
      <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-[101]">
        {/* TopAppBar */}
        <header className="w-full sticky top-0 z-40 bg-surface/60 backdrop-blur-md border-b border-white/20 shadow-sm flex justify-between items-center px-container-margin py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all active:scale-90 text-on-surface-variant">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="flex flex-col">
              <span className={cn(typography.body.md, "font-bold text-primary")}>Back</span>
            </div>
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
          {/* Page Title & Search */}
          <header className="mb-4">
            <h1 className={cn(typography.heading.h1, "text-on-surface tracking-tight")}>Document Library</h1>
            <p className={cn(typography.body.md, "text-on-surface-variant mt-1")}>Manage and track employee compliance files.</p>
          </header>

          <div className="relative mb-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className={cn(typography.body.md, "w-full h-12 pl-12 pr-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant outline-none shadow-sm")}
              placeholder="Search documents or employees..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <select
              className={cn(typography.body.md, "w-full h-12 px-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-sm text-on-surface")}
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option value="All">All Companies</option>
              {branches.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Chips */}
          <section className="mb-section-spacing -mx-container-margin overflow-x-auto hide-scrollbar flex items-center gap-3 px-container-margin">
            {categoryChips.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={cn(
                  typography.button.sm,
                  "px-6 py-2.5 rounded-full whitespace-nowrap active:scale-95 transition-transform",
                  selectedType === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "glass-panel text-on-surface-variant hover:bg-white/80"
                )}
              >
                {cat}
              </button>
            ))}
          </section>

          {/* Document List */}
          <div className="flex flex-col gap-stack-gap">
            {filteredDocuments.length === 0 ? (
              <div className="glass-panel-heavy p-8 rounded-lg text-center text-on-surface-variant">
                No documents found.
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <div key={doc.id} className="glass-panel-heavy p-card-padding rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container">
                      <span className="material-symbols-outlined">{getDocIcon(doc.document_type_name)}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(doc.status)}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => openEditModal(doc)}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                          title="Edit Document"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="p-1 text-on-surface-variant hover:text-error transition-colors"
                          title="Delete Document"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className={cn(typography.heading.h3, "text-on-surface")}>{getEmployeeName(doc.employee_id)}</h3>
                    <p className={cn(typography.caption.sm, "text-on-surface-variant font-medium")}>{getEmployeeCompany(doc.employee_id)}</p>
                    <p className={cn(typography.body.md, "text-on-surface-variant mt-1")}>No: {doc.document_number || "N/A"}</p>
                  </div>
                  <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                    <div>
                      <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Document Type</p>
                      <p className={cn(typography.body.md, "font-bold text-on-surface")}>{doc.document_type_name}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Expiry Date</p>
                      <p className={cn(typography.body.md, "font-bold text-on-surface")}>{formatDisplayDate(doc.expiry_date)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* FAB for upload */}
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

