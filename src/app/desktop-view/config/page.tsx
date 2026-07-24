"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useConfig, getSmartDocumentIcon } from "@/backend/useHooks";
import { Branch, Department, DocumentType } from "@/backend/data-types/models";

const DEPT_COLORS = ["#4648d4", "#7f458d", "#4b5a9c", "#ba1a1a", "#2e7d32", "#f57c00"];

const inputCls =
  "w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all";

function Modal({
  title,
  onClose,
  onSave,
  children,
  accentColor = "#4648d4",
}: {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
      <div className="relative glass-modal rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className={cn(typography.heading.h2, "text-on-surface")}>{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant")}>
            Cancel
          </button>
          <button onClick={onSave} style={{ backgroundColor: accentColor }} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl text-white shadow-lg")}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  message,
  onClose,
  onConfirm,
}: {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
      <div className="relative glass-modal rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className={cn(typography.heading.h3, "text-on-surface")}>{title}</h3>
        <p className={cn(typography.body.md, "text-on-surface-variant")}>{message}</p>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant")}>
            Cancel
          </button>
          <button onClick={onConfirm} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl bg-error text-white shadow-lg")}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfigPage() {
  const {
    branches,
    departments,
    documentTypes,
    isLive,
    addBranch,
    updateBranch,
    deleteBranch,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addDocumentType,
    updateDocumentType,
    deleteDocumentType,
  } = useConfig();

  // Search filter states
  const [branchSearch, setBranchSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [docSearch, setDocSearch] = useState("");

  // Branch Modal State
  const [branchModal, setBranchModal] = useState<{ mode: "add" | "edit"; item?: Branch } | null>(null);
  const [branchForm, setBranchForm] = useState({ name: "", subtitle: "" });
  const [deletingBranch, setDeletingBranch] = useState<Branch | null>(null);

  // Department Modal State
  const [deptModal, setDeptModal] = useState<{ mode: "add" | "edit"; item?: Department } | null>(null);
  const [deptForm, setDeptForm] = useState({ name: "", employees_count: 0, color: DEPT_COLORS[0] });
  const [deletingDept, setDeletingDept] = useState<Department | null>(null);

  // Document Type Modal State
  const [docModal, setDocModal] = useState<{ mode: "add" | "edit"; item?: DocumentType } | null>(null);
  const [docForm, setDocForm] = useState({ name: "", category: "", requirement: "Required", icon: "description" });
  const [deletingDoc, setDeletingDoc] = useState<DocumentType | null>(null);

  // Branch handlers
  const openAddBranch = () => { setBranchForm({ name: "", subtitle: "" }); setBranchModal({ mode: "add" }); };
  const openEditBranch = (b: Branch) => { setBranchForm({ name: b.name, subtitle: b.subtitle || "" }); setBranchModal({ mode: "edit", item: b }); };
  const saveBranch = async () => {
    if (!branchForm.name.trim()) return;
    if (branchModal?.mode === "add") {
      await addBranch(branchForm);
    } else if (branchModal?.item) {
      await updateBranch(branchModal.item.id, branchForm);
    }
    setBranchModal(null);
  };
  const confirmDeleteBranch = async () => {
    if (deletingBranch) await deleteBranch(deletingBranch.id);
    setDeletingBranch(null);
  };

  // Department handlers
  const openAddDept = () => { setDeptForm({ name: "", employees_count: 0, color: DEPT_COLORS[0] }); setDeptModal({ mode: "add" }); };
  const openEditDept = (d: Department) => { setDeptForm({ name: d.name, employees_count: d.employees_count || 0, color: d.color || DEPT_COLORS[0] }); setDeptModal({ mode: "edit", item: d }); };
  const saveDept = async () => {
    if (!deptForm.name.trim()) return;
    if (deptModal?.mode === "add") {
      await addDepartment(deptForm);
    } else if (deptModal?.item) {
      await updateDepartment(deptModal.item.id, deptForm);
    }
    setDeptModal(null);
  };
  const confirmDeleteDept = async () => {
    if (deletingDept) await deleteDepartment(deletingDept.id);
    setDeletingDept(null);
  };

  // Document handlers
  const openAddDoc = () => { setDocForm({ name: "", category: "", requirement: "Required", icon: "description" }); setDocModal({ mode: "add" }); };
  const openEditDoc = (d: DocumentType) => { setDocForm({ name: d.name, category: d.category, requirement: d.requirement, icon: d.icon }); setDocModal({ mode: "edit", item: d }); };
  const saveDoc = async () => {
    if (!docForm.name.trim()) return;
    const smartIcon = docForm.icon && docForm.icon !== "description" ? docForm.icon : getSmartDocumentIcon(docForm.name, docForm.category);
    const payload = { ...docForm, icon: smartIcon };

    if (docModal?.mode === "add") {
      await addDocumentType(payload);
    } else if (docModal?.item) {
      await updateDocumentType(docModal.item.id, payload);
    }
    setDocModal(null);
  };
  const confirmDeleteDoc = async () => {
    if (deletingDoc) await deleteDocumentType(deletingDoc.id);
    setDeletingDoc(null);
  };

  const filteredBranches = branches.filter((b) =>
    (b.name + " " + (b.subtitle || "")).toLowerCase().includes(branchSearch.toLowerCase())
  );
  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(deptSearch.toLowerCase())
  );
  const filteredDocs = documentTypes.filter((d) =>
    (d.name + " " + d.category + " " + d.requirement).toLowerCase().includes(docSearch.toLowerCase())
  );

  return (
    <>
      {branchModal && (
        <Modal
          title={branchModal.mode === "add" ? "Add Branch" : "Edit Branch"}
          onClose={() => setBranchModal(null)}
          onSave={saveBranch}
          accentColor="#4648d4"
        >
          <div className="space-y-4">
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Branch Name *</label>
              <input className={cn(typography.body.md, inputCls)} placeholder="e.g. Dubai HQ" value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} />
            </div>
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Subtitle / Location</label>
              <input className={cn(typography.body.md, inputCls)} placeholder="e.g. Regional Hub" value={branchForm.subtitle} onChange={(e) => setBranchForm({ ...branchForm, subtitle: e.target.value })} />
            </div>
          </div>
        </Modal>
      )}

      {deptModal && (
        <Modal
          title={deptModal.mode === "add" ? "Add Department" : "Edit Department"}
          onClose={() => setDeptModal(null)}
          onSave={saveDept}
          accentColor="#7f458d"
        >
          <div className="space-y-4">
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Department Name *</label>
              <input className={cn(typography.body.md, inputCls)} placeholder="e.g. Legal & Compliance" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} />
            </div>
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Initial Member Count</label>
              <input className={cn(typography.body.md, inputCls)} type="number" min="0" value={deptForm.employees_count} onChange={(e) => setDeptForm({ ...deptForm, employees_count: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Accent Color</label>
              <div className="flex gap-3 pt-1">
                {DEPT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setDeptForm({ ...deptForm, color })}
                    style={{ backgroundColor: color }}
                    className={cn("w-8 h-8 rounded-full border-2 transition-all", deptForm.color === color ? "border-on-surface scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100")}
                  />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {docModal && (
        <Modal
          title={docModal.mode === "add" ? "Add Document Type" : "Edit Document Type"}
          onClose={() => setDocModal(null)}
          onSave={saveDoc}
          accentColor="#4b5a9c"
        >
          <div className="space-y-4">
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Document Name *</label>
              <input className={cn(typography.body.md, inputCls)} placeholder="e.g. Work Visa" value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} />
            </div>
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Category</label>
              <input className={cn(typography.body.md, inputCls)} placeholder="e.g. Legal, Medical, Identity" value={docForm.category} onChange={(e) => setDocForm({ ...docForm, category: e.target.value })} />
            </div>
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>Requirement Status</label>
              <select className={cn(typography.body.md, inputCls)} value={docForm.requirement} onChange={(e) => setDocForm({ ...docForm, requirement: e.target.value })}>
                <option value="Required">Required</option>
                <option value="Mandatory">Mandatory</option>
                <option value="Standard">Standard</option>
                <option value="Optional">Optional</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {deletingBranch && <ConfirmModal title="Delete Branch?" message={`Delete "${deletingBranch.name}"?`} onClose={() => setDeletingBranch(null)} onConfirm={confirmDeleteBranch} />}
      {deletingDept && <ConfirmModal title="Delete Department?" message={`Delete "${deletingDept.name}"?`} onClose={() => setDeletingDept(null)} onConfirm={confirmDeleteDept} />}
      {deletingDoc && <ConfirmModal title="Delete Document Type?" message={`Delete "${deletingDoc.name}"?`} onClose={() => setDeletingDoc(null)} onConfirm={confirmDeleteDoc} />}

      {/* Aura background glow */}
      <div className="aura-glow">
        <div className="aura-circle bg-primary-container w-[500px] h-[500px] top-[-100px] left-[-100px]"></div>
        <div className="aura-circle bg-tertiary-container w-[400px] h-[400px] bottom-[10%] right-[-10%]"></div>
        <div className="aura-circle bg-secondary-container w-[300px] h-[300px] top-[40%] left-[20%]"></div>
      </div>

      <div className="p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3">
              <h2 className={cn(typography.heading.h1, "text-on-background")}>System Configuration</h2>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                  {isLive ? "Supabase Live DB" : "Local State"}
                </span>
              </div>
            </div>
            <p className={cn(typography.body.md, "text-on-surface-variant mt-1")}>
              Manage organizational branches, department definitions, and required document type templates.
            </p>
          </div>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Branches Section */}
          <section className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">location_city</span>
                </div>
                <div>
                  <h3 className={cn(typography.heading.h3, "text-on-surface")}>Branches</h3>
                  <p className={cn(typography.caption.sm, "text-on-surface-variant")}>{branches.length} locations</p>
                </div>
              </div>
              <button onClick={openAddBranch} className="p-2 bg-primary text-white rounded-full shadow-lg shadow-primary/25 hover:opacity-90 active:scale-90 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="mb-4 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className={cn(typography.body.md, "w-full bg-surface-container/50 border border-outline-variant/30 rounded-full py-2 pl-9 pr-4 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all")} placeholder="Search branches..." value={branchSearch} onChange={(e) => setBranchSearch(e.target.value)} />
            </div>
            <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[380px] hide-scrollbar">
              {filteredBranches.length === 0 && <div className={cn(typography.body.md, "py-8 text-center text-on-surface-variant")}>No branches found.</div>}
              {filteredBranches.map((b) => (
                <div key={b.id} className="p-4 bg-white/50 border border-outline-variant/20 rounded-xl flex items-center justify-between group hover:bg-white/80 hover:shadow-md transition-all">
                  <div>
                    <p className={cn(typography.heading.h4, "text-on-surface")}>{b.name}</p>
                    <p className={cn(typography.caption.md, "text-on-surface-variant")}>{b.subtitle || "Global Hub"}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditBranch(b)} className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => setDeletingBranch(b)} className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Departments Section */}
          <section className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div>
                  <h3 className={cn(typography.heading.h3, "text-on-surface")}>Departments</h3>
                  <p className={cn(typography.caption.sm, "text-on-surface-variant")}>{departments.length} departments</p>
                </div>
              </div>
              <button onClick={openAddDept} className="p-2 bg-secondary text-white rounded-full shadow-lg shadow-secondary/25 hover:opacity-90 active:scale-90 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="mb-4 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className={cn(typography.body.md, "w-full bg-surface-container/50 border border-outline-variant/30 rounded-full py-2 pl-9 pr-4 focus:border-secondary focus:ring-1 focus:ring-secondary/30 outline-none transition-all")} placeholder="Search departments..." value={deptSearch} onChange={(e) => setDeptSearch(e.target.value)} />
            </div>
            <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[380px] hide-scrollbar">
              {filteredDepts.length === 0 && <div className={cn(typography.body.md, "py-8 text-center text-on-surface-variant")}>No departments found.</div>}
              {filteredDepts.map((dept) => (
                <div key={dept.id} className="p-4 bg-white/50 border border-outline-variant/20 rounded-xl flex items-center justify-between group hover:bg-white/80 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: dept.color || "#4648d4" }} />
                    <div>
                      <p className={cn(typography.heading.h4, "text-on-surface")}>{dept.name}</p>
                      <p className={cn(typography.caption.md, "text-on-surface-variant")}>{dept.employees_count || 0} employees</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditDept(dept)} className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => setDeletingDept(dept)} className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Document Types Section */}
          <section className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <h3 className={cn(typography.heading.h3, "text-on-surface")}>Document Types</h3>
                  <p className={cn(typography.caption.sm, "text-on-surface-variant")}>{documentTypes.length} types</p>
                </div>
              </div>
              <button onClick={openAddDoc} className="p-2 bg-tertiary text-white rounded-full shadow-lg shadow-tertiary/25 hover:opacity-90 active:scale-90 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="mb-4 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className={cn(typography.body.md, "w-full bg-surface-container/50 border border-outline-variant/30 rounded-full py-2 pl-9 pr-4 focus:border-tertiary focus:ring-1 focus:ring-tertiary/30 outline-none transition-all")} placeholder="Search doc types..." value={docSearch} onChange={(e) => setDocSearch(e.target.value)} />
            </div>
            <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[380px] hide-scrollbar">
              {filteredDocs.length === 0 && <div className={cn(typography.body.md, "py-8 text-center text-on-surface-variant")}>No document types found.</div>}
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="p-4 bg-white/50 border border-outline-variant/20 rounded-xl flex items-center justify-between group hover:bg-white/80 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">
                        {doc.icon && doc.icon !== "description" ? doc.icon : getSmartDocumentIcon(doc.name, doc.category)}
                      </span>
                    </div>
                    <div>
                      <p className={cn(typography.heading.h4, "text-on-surface")}>{doc.name}</p>
                      <p className={cn(typography.caption.md, "text-on-surface-variant")}>{doc.category} - {doc.requirement}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditDoc(doc)} className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => setDeletingDoc(doc)} className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
