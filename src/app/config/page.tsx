"use client";

import { useState, useRef } from "react";

// Types
interface Branch {
  id: number;
  name: string;
  subtitle: string;
}

interface Department {
  id: number;
  name: string;
  employees: number;
  color: string;
}

interface DocumentType {
  id: number;
  name: string;
  category: string;
  requirement: string;
  icon: string;
}

// Initial Data
const INITIAL_BRANCHES: Branch[] = [
  { id: 1, name: "HQ - Dubai", subtitle: "Primary Hub - UAE" },
  { id: 2, name: "Abu Dhabi Office", subtitle: "Regional HQ - UAE" },
  { id: 3, name: "Sharjah Branch", subtitle: "Operational Center - UAE" },
];

const DEPT_COLORS = ["#4648d4", "#7f458d", "#4b5a9c", "#ba1a1a", "#2e7d32", "#f57c00"];

const INITIAL_DEPARTMENTS: Department[] = [
  { id: 1, name: "Engineering", employees: 42, color: DEPT_COLORS[0] },
  { id: 2, name: "Design", employees: 12, color: DEPT_COLORS[1] },
  { id: 3, name: "Human Resources", employees: 8, color: DEPT_COLORS[2] },
  { id: 4, name: "Marketing", employees: 15, color: DEPT_COLORS[3] },
];

const INITIAL_DOCS: DocumentType[] = [
  { id: 1, name: "Passport", category: "Identity", requirement: "Required", icon: "verified_user" },
  { id: 2, name: "Work Visa", category: "Legal", requirement: "Mandatory", icon: "work" },
  { id: 3, name: "Insurance Card", category: "Health", requirement: "Standard", icon: "medical_information" },
  { id: 4, name: "Emirates ID", category: "Identity", requirement: "Required", icon: "badge" },
  { id: 5, name: "Labour Card", category: "Legal", requirement: "Mandatory", icon: "contract" },
];

const inputCls =
  "w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all";

// Modal Component
interface ModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  accentColor?: string;
}

function Modal({ title, onClose, onSave, children, accentColor = "#4648d4" }: ModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
      <div
        className="relative glass-modal rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-headline-md font-bold text-on-surface">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        {children}
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors">
            Cancel
          </button>
          <button onClick={onSave} style={{ backgroundColor: accentColor }} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98] shadow-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Delete Dialog
interface DeleteDialogProps {
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteDialog({ itemName, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
      <div className="relative glass-modal rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-error">delete_forever</span>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-on-surface text-lg">Delete &quot;{itemName}&quot;?</h3>
          <p className="text-sm text-on-surface-variant mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-error text-white font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Page
export default function ConfigPage() {
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [branchSearch, setBranchSearch] = useState("");
  const [branchModal, setBranchModal] = useState<{ mode: "add" | "edit"; item?: Branch } | null>(null);
  const [branchForm, setBranchForm] = useState({ name: "", subtitle: "" });
  const [deleteBranch, setDeleteBranch] = useState<Branch | null>(null);

  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [deptSearch, setDeptSearch] = useState("");
  const [deptModal, setDeptModal] = useState<{ mode: "add" | "edit"; item?: Department } | null>(null);
  const [deptForm, setDeptForm] = useState({ name: "", employees: "", color: DEPT_COLORS[0] });
  const [deleteDept, setDeleteDept] = useState<Department | null>(null);

  const [docs, setDocs] = useState<DocumentType[]>(INITIAL_DOCS);
  const [docSearch, setDocSearch] = useState("");
  const [docModal, setDocModal] = useState<{ mode: "add" | "edit"; item?: DocumentType } | null>(null);
  const [docForm, setDocForm] = useState({ name: "", category: "", requirement: "Required", icon: "description" });
  const [deleteDoc, setDeleteDoc] = useState<DocumentType | null>(null);

  const nextId = useRef(100);
  const uid = () => nextId.current++;

  // Branch handlers
  const openAddBranch = () => { setBranchForm({ name: "", subtitle: "" }); setBranchModal({ mode: "add" }); };
  const openEditBranch = (b: Branch) => { setBranchForm({ name: b.name, subtitle: b.subtitle }); setBranchModal({ mode: "edit", item: b }); };
  const saveBranch = () => {
    if (!branchForm.name.trim()) return;
    if (branchModal?.mode === "add") {
      setBranches((prev) => [...prev, { id: uid(), name: branchForm.name, subtitle: branchForm.subtitle }]);
    } else if (branchModal?.item) {
      setBranches((prev) => prev.map((b) => b.id === branchModal.item!.id ? { ...b, ...branchForm } : b));
    }
    setBranchModal(null);
  };
  const confirmDeleteBranch = () => {
    if (deleteBranch) setBranches((p) => p.filter((b) => b.id !== deleteBranch.id));
    setDeleteBranch(null);
  };

  // Department handlers
  const openAddDept = () => { setDeptForm({ name: "", employees: "", color: DEPT_COLORS[0] }); setDeptModal({ mode: "add" }); };
  const openEditDept = (d: Department) => { setDeptForm({ name: d.name, employees: String(d.employees), color: d.color }); setDeptModal({ mode: "edit", item: d }); };
  const saveDept = () => {
    if (!deptForm.name.trim()) return;
    if (deptModal?.mode === "add") {
      setDepartments((prev) => [...prev, { id: uid(), name: deptForm.name, employees: Number(deptForm.employees) || 0, color: deptForm.color }]);
    } else if (deptModal?.item) {
      setDepartments((prev) => prev.map((d) => d.id === deptModal.item!.id ? { ...d, name: deptForm.name, employees: Number(deptForm.employees) || 0, color: deptForm.color } : d));
    }
    setDeptModal(null);
  };
  const confirmDeleteDept = () => {
    if (deleteDept) setDepartments((p) => p.filter((d) => d.id !== deleteDept.id));
    setDeleteDept(null);
  };

  // Document handlers
  const openAddDoc = () => { setDocForm({ name: "", category: "", requirement: "Required", icon: "description" }); setDocModal({ mode: "add" }); };
  const openEditDoc = (d: DocumentType) => { setDocForm({ name: d.name, category: d.category, requirement: d.requirement, icon: d.icon }); setDocModal({ mode: "edit", item: d }); };
  const saveDoc = () => {
    if (!docForm.name.trim()) return;
    if (docModal?.mode === "add") {
      setDocs((prev) => [...prev, { id: uid(), ...docForm }]);
    } else if (docModal?.item) {
      setDocs((prev) => prev.map((d) => d.id === docModal.item!.id ? { ...d, ...docForm } : d));
    }
    setDocModal(null);
  };
  const confirmDeleteDoc = () => {
    if (deleteDoc) setDocs((p) => p.filter((d) => d.id !== deleteDoc.id));
    setDeleteDoc(null);
  };

  const filteredBranches = branches.filter((b) =>
    (b.name + " " + b.subtitle).toLowerCase().includes(branchSearch.toLowerCase())
  );
  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(deptSearch.toLowerCase())
  );
  const filteredDocs = docs.filter((d) =>
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
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Branch Name *</label>
              <input className={inputCls} placeholder="e.g. Dubai HQ" value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Subtitle / Location</label>
              <input className={inputCls} placeholder="e.g. Regional Hub" value={branchForm.subtitle} onChange={(e) => setBranchForm({ ...branchForm, subtitle: e.target.value })} />
            </div>
          </div>
        </Modal>
      )}

      {deptModal && (
        <Modal
          title={deptModal.mode === "add" ? "Add Department" : "Edit Department"}
          onClose={() => setDeptModal(null)}
          onSave={saveDept}
          accentColor="#4b5a9c"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Department Name *</label>
              <input className={inputCls} placeholder="e.g. Finance" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Number of Employees</label>
              <input className={inputCls} placeholder="e.g. 20" type="number" min={0} value={deptForm.employees} onChange={(e) => setDeptForm({ ...deptForm, employees: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Color Tag</label>
              <div className="flex gap-2 flex-wrap">
                {DEPT_COLORS.map((c) => (
                  <button
                    key={c}
                    style={{ backgroundColor: c }}
                    onClick={() => setDeptForm({ ...deptForm, color: c })}
                    className={`w-8 h-8 rounded-full transition-all ${deptForm.color === c ? "scale-110 ring-2 ring-offset-2 ring-on-surface/30" : "hover:scale-105"}`}
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
          accentColor="#7f458d"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Document Name *</label>
              <input className={inputCls} placeholder="e.g. Residency Permit" value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Category</label>
                <input className={inputCls} placeholder="e.g. Legal" value={docForm.category} onChange={(e) => setDocForm({ ...docForm, category: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Requirement</label>
                <select className={inputCls} value={docForm.requirement} onChange={(e) => setDocForm({ ...docForm, requirement: e.target.value })}>
                  <option>Required</option>
                  <option>Mandatory</option>
                  <option>Standard</option>
                  <option>Optional</option>
                  <option>Confidential</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Icon (Material Symbol name)</label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined">{docForm.icon || "description"}</span>
                </div>
                <input className={inputCls} placeholder="e.g. badge, contract, description" value={docForm.icon} onChange={(e) => setDocForm({ ...docForm, icon: e.target.value })} />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {deleteBranch && <DeleteDialog itemName={deleteBranch.name} onClose={() => setDeleteBranch(null)} onConfirm={confirmDeleteBranch} />}
      {deleteDept && <DeleteDialog itemName={deleteDept.name} onClose={() => setDeleteDept(null)} onConfirm={confirmDeleteDept} />}
      {deleteDoc && <DeleteDialog itemName={deleteDoc.name} onClose={() => setDeleteDoc(null)} onConfirm={confirmDeleteDoc} />}

      <div className="px-6 md:px-10 py-8 max-w-[1400px] mx-auto w-full space-y-8">


        <div className="relative z-10">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Platform Entities</h2>
          <p className="text-on-surface-variant max-w-xl text-sm sm:text-body-lg">
            Organize the core structural data of your organization. Changes here reflect across all modules.
          </p>
        </div>


        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Branches", value: branches.length, icon: "domain", color: "text-primary", bg: "bg-primary/10" },
            { label: "Departments", value: departments.length, icon: "account_tree", color: "text-secondary", bg: "bg-secondary/10" },
            { label: "Doc Types", value: docs.length, icon: "description", color: "text-tertiary", bg: "bg-tertiary/10" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color} shrink-0`}>
                <span className="material-symbols-outlined text-[20px] sm:text-[28px]">{s.icon}</span>
              </div>
              <div>
                <p className="text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider">{s.label}</p>
                <p className="font-bold text-xl sm:text-headline-md text-on-surface">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <section className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-base">Branches</h3>
                  <p className="text-[10px] text-on-surface-variant">{branches.length} locations</p>
                </div>
              </div>
              <button onClick={openAddBranch} className="p-2 bg-primary text-white rounded-full shadow-lg shadow-primary/25 hover:opacity-90 active:scale-90 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="mb-4 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-full py-2 pl-9 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="Search branches..." value={branchSearch} onChange={(e) => setBranchSearch(e.target.value)} />
            </div>
            <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[380px] hide-scrollbar">
              {filteredBranches.length === 0 && <div className="py-8 text-center text-on-surface-variant text-sm">No branches found.</div>}
              {filteredBranches.map((branch) => (
                <div key={branch.id} className="p-4 bg-white/50 border border-outline-variant/20 rounded-xl flex items-center justify-between group hover:bg-white/80 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{branch.name}</p>
                      <p className="text-[11px] text-on-surface-variant">{branch.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditBranch(branch)} className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => setDeleteBranch(branch)} className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">account_tree</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-base">Departments</h3>
                  <p className="text-[10px] text-on-surface-variant">{departments.length} teams</p>
                </div>
              </div>
              <button onClick={openAddDept} className="p-2 bg-secondary text-white rounded-full shadow-lg shadow-secondary/25 hover:opacity-90 active:scale-90 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="mb-4 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-full py-2 pl-9 pr-4 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/30 outline-none transition-all" placeholder="Search departments..." value={deptSearch} onChange={(e) => setDeptSearch(e.target.value)} />
            </div>
            <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[380px] hide-scrollbar">
              {filteredDepts.length === 0 && <div className="py-8 text-center text-on-surface-variant text-sm">No departments found.</div>}
              {filteredDepts.map((dept) => (
                <div key={dept.id} className="p-4 bg-white/50 border border-outline-variant/20 rounded-xl flex items-center justify-between group hover:bg-white/80 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-9 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
                    <div>
                      <p className="font-bold text-on-surface text-sm">{dept.name}</p>
                      <p className="text-[11px] text-on-surface-variant">{dept.employees} Employees</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditDept(dept)} className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => setDeleteDept(dept)} className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-base">Document Types</h3>
                  <p className="text-[10px] text-on-surface-variant">{docs.length} types</p>
                </div>
              </div>
              <button onClick={openAddDoc} className="p-2 bg-tertiary text-white rounded-full shadow-lg shadow-tertiary/25 hover:opacity-90 active:scale-90 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="mb-4 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-full py-2 pl-9 pr-4 text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary/30 outline-none transition-all" placeholder="Search doc types..." value={docSearch} onChange={(e) => setDocSearch(e.target.value)} />
            </div>
            <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[380px] hide-scrollbar">
              {filteredDocs.length === 0 && <div className="py-8 text-center text-on-surface-variant text-sm">No document types found.</div>}
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="p-4 bg-white/50 border border-outline-variant/20 rounded-xl flex items-center justify-between group hover:bg-white/80 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">{doc.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{doc.name}</p>
                      <p className="text-[11px] text-on-surface-variant">{doc.category} - {doc.requirement}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditDoc(doc)} className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => setDeleteDoc(doc)} className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10 transition-colors">
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
