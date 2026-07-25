"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useEmployees, useConfig, useDocuments, getSmartDocumentIcon } from "@/backend/useHooks";
import { Employee } from "@/backend/data-types/models";
import { formatSupabaseDate, formatDisplayDate } from "@/lib/dateUtils";

interface DraftDocument {
  id: string;
  document_type_name: string;
  document_number: string;
  expiry_date: string;
  issuing_country: string;
}

const inputCls =
  "w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all";

export default function EmployeesPage() {
  const { employees, isLive, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { branches, documentTypes } = useConfig();
  const { addDocument } = useDocuments();

  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  // Form state
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  // Document upload state while adding employee (Multiple docs support)
  const [attachDocument, setAttachDocument] = useState(false);
  const [draftDocs, setDraftDocs] = useState<DraftDocument[]>([]);
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [docExpiryDate, setDocExpiryDate] = useState("");
  const [docIssuingCountry, setDocIssuingCountry] = useState("UAE");

  const openAddModal = () => {
    setEditingEmp(null);
    setName("");
    setCode("");
    setLocation(branches[0]?.name || "");
    setEmail("");
    setPhone("");
    setPosition("");

    // Reset document fields and draft list
    setAttachDocument(false);
    setDraftDocs([]);
    setDocType(documentTypes[0]?.name || "Work Visa");
    setDocNumber("");
    setDocExpiryDate("");
    setDocIssuingCountry("UAE");

    setShowModal(true);
  };

  const openEditModal = (emp: Employee) => {
    setEditingEmp(emp);
    setName(emp.full_name || "");
    setCode(emp.employee_code || "");
    setLocation(emp.location || (branches[0]?.name || ""));
    setEmail(emp.email || "");
    setPhone(emp.phone || "");
    setPosition(emp.position || "");
    setAttachDocument(false);
    setDraftDocs([]);
    setShowModal(true);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const digits = val.replace(/\D/g, "").slice(0, 6);
    if (digits.length >= 5) {
      val = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 6)}`;
    } else if (digits.length >= 3) {
      val = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    } else {
      val = digits;
    }
    setDocExpiryDate(val);
  };

  const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDocExpiryDate(formatDisplayDate(e.target.value, true));
    }
  };

  const handleAddDraftDoc = () => {
    if (!docExpiryDate.trim()) {
      alert("Please enter an expiry date (dd/mm/yy).");
      return;
    }
    const newDoc: DraftDocument = {
      id: `draft-${Date.now()}-${Math.random()}`,
      document_type_name: docType || (documentTypes[0]?.name || "Work Visa"),
      document_number: docNumber.trim() || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      expiry_date: docExpiryDate.trim(),
      issuing_country: docIssuingCountry.trim() || "UAE",
    };
    setDraftDocs((prev) => [...prev, newDoc]);
    // Reset inputs for next document
    setDocNumber("");
    setDocExpiryDate("");
  };

  const handleRemoveDraftDoc = (id: string) => {
    setDraftDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveEmployee = async () => {
    if (!name.trim()) return;
    const selectedLocation = location || (branches.length > 0 ? branches[0].name : "Global Headquarters");

    if (editingEmp) {
      await updateEmployee(editingEmp.id, {
        employee_code: code.trim() || editingEmp.employee_code,
        full_name: name.trim(),
        location: selectedLocation,
        email: email.trim(),
        phone: phone.trim(),
        position: position.trim(),
      });
    } else {
      const generatedCode = code.trim() || `NEX-${Math.floor(1000 + Math.random() * 9000)}`;
      const created = await addEmployee({
        employee_code: generatedCode,
        full_name: name.trim(),
        location: selectedLocation,
        email: email.trim(),
        phone: phone.trim(),
        position: position.trim() || "Team Member",
        status: "active",
        avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
      });

      // Prepare all draft documents + any active un-submitted doc input
      const docsToSave = [...draftDocs];
      if (attachDocument && docExpiryDate.trim()) {
        docsToSave.push({
          id: `draft-pending`,
          document_type_name: docType || (documentTypes[0]?.name || "Work Visa"),
          document_number: docNumber.trim() || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
          expiry_date: docExpiryDate.trim(),
          issuing_country: docIssuingCountry.trim() || "UAE",
        });
      }

      if (created && created.id && docsToSave.length > 0) {
        for (const d of docsToSave) {
          const supabaseDate = formatSupabaseDate(d.expiry_date);
          const today = new Date();
          const exp = new Date(supabaseDate);
          const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          const status = diffDays < 0 ? "expired" : diffDays <= 90 ? "expiring_soon" : "valid";

          await addDocument({
            employee_id: created.id,
            document_type_name: d.document_type_name,
            document_number: d.document_number,
            issuing_country: d.issuing_country,
            expiry_date: supabaseDate,
            status,
          });
        }
      }
    }

    setShowModal(false);
  };

  // Filtering by Search & Branch
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_code.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = selectedBranch === "all" || emp.location === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const getDocStatusBadge = (emp: Employee) => {
    const docs = emp.documents || [];
    if (docs.some((d) => d.status === "expired")) {
      return (
        <span className={cn(typography.label.sm, "inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200")}>
          Expired
        </span>
      );
    }
    if (docs.some((d) => d.status === "expiring_soon")) {
      return (
        <span className={cn(typography.label.sm, "inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200")}>
          Expiring Soon
        </span>
      );
    }
    return (
      <span className={cn(typography.label.sm, "inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200")}>
        Valid
      </span>
    );
  };

  return (
    <>
      {/* Employee Modal (Add or Edit) */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
          <div className="relative glass-modal rounded-2xl w-full max-w-[540px] p-6 space-y-4 shadow-2xl max-h-[88vh] overflow-y-auto hide-scrollbar" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <h3 className={cn(typography.heading.h2, "text-on-surface")}>
                {editingEmp ? "Edit Employee" : "Add New Employee"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Full Name *</label>
                <input className={inputCls} placeholder="e.g. Sarah Jenkins" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Employee Code</label>
                  <input className={inputCls} placeholder="e.g. NEX-5012" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Location (Branch)</label>
                  <select className={inputCls} value={location || (branches[0]?.name || "")} onChange={(e) => setLocation(e.target.value)}>
                    {branches.length === 0 ? (
                      <option value="Global Headquarters">Global Headquarters</option>
                    ) : (
                      branches.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} {b.subtitle ? `(${b.subtitle})` : ""}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Email</label>
                  <input className={inputCls} placeholder="sarah.j@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Phone</label>
                  <input className={inputCls} placeholder="+971 50 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div>
                <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Position</label>
                <input className={inputCls} placeholder="e.g. Senior Specialist" value={position} onChange={(e) => setPosition(e.target.value)} />
              </div>

              {/* Attach Initial Documents Section (Multiple Document Upload Support) */}
              {!editingEmp && (
                <div className="pt-3 border-t border-outline-variant/20">
                  <div className="flex items-center justify-between cursor-pointer mb-2 bg-surface-container/40 p-3 rounded-xl border border-outline-variant/30 hover:bg-surface-container/60 transition-colors" onClick={() => setAttachDocument(!attachDocument)}>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">note_add</span>
                      <div>
                        <p className={cn(typography.label.md, "font-bold text-on-surface")}>
                          Upload Documents ({draftDocs.length})
                        </p>
                        <p className={cn(typography.caption.sm, "text-on-surface-variant")}>Attach multiple documents (Visa, Passport, IDs)</p>
                      </div>
                    </div>
                    <input type="checkbox" checked={attachDocument} onChange={(e) => setAttachDocument(e.target.checked)} className="w-4 h-4 accent-primary cursor-pointer" />
                  </div>

                  {attachDocument && (
                    <div className="space-y-3 bg-surface-container/30 p-4 rounded-xl border border-outline-variant/30 animate-in fade-in duration-200">
                      {/* Attached Documents List */}
                      {draftDocs.length > 0 && (
                        <div className="space-y-2 mb-3">
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase font-bold")}>Attached ({draftDocs.length})</label>
                          <div className="flex flex-wrap gap-2">
                            {draftDocs.map((d) => (
                              <div key={d.id} className="flex items-center gap-2 px-3 py-1.5 bg-white/70 border border-primary/20 rounded-xl text-xs shadow-sm">
                                <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                                <span className="font-bold text-on-surface">{d.document_type_name}</span>
                                <span className="text-on-surface-variant font-mono">({d.document_number})</span>
                                <span className="text-primary font-medium">Exp: {d.expiry_date}</span>
                                <button type="button" onClick={() => handleRemoveDraftDoc(d.id)} className="text-error hover:opacity-80 ml-1">
                                  <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Document Type</label>
                          <select className={inputCls} value={docType} onChange={(e) => setDocType(e.target.value)}>
                            {documentTypes.length === 0 ? (
                              <>
                                <option>Work Visa</option>
                                <option>Passport</option>
                                <option>Emirates ID</option>
                                <option>Labour Card</option>
                                <option>Insurance Card</option>
                              </>
                            ) : (
                              documentTypes.map((dt) => (
                                <option key={dt.id} value={dt.name}>
                                  {dt.name}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                        <div>
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Document Number</label>
                          <input className={inputCls} placeholder="e.g. V-98234" value={docNumber} onChange={(e) => setDocNumber(e.target.value)} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Expiry Date *</label>
                          <div className="relative flex items-center">
                            <input
                              className={cn(inputCls, "pr-10")}
                              placeholder="dd/mm/yy"
                              maxLength={8}
                              value={docExpiryDate}
                              onChange={handleDateInputChange}
                            />
                            <label className="absolute right-3 cursor-pointer text-primary hover:opacity-80 flex items-center" title="Select date">
                              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                              <input type="date" className="sr-only" onChange={handleNativePickerChange} />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Issuing Country</label>
                          <input className={inputCls} placeholder="e.g. UAE" value={docIssuingCountry} onChange={(e) => setDocIssuingCountry(e.target.value)} />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddDraftDoc}
                        className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_circle</span>
                        <span>Add Document To List</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant")}>
                Cancel
              </button>
              <button onClick={handleSaveEmployee} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl bg-primary text-white shadow-lg")}>
                {editingEmp ? "Update Employee" : "Save Employee"}
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Background Aura */}
      <div className="aura-glow">
        <div className="aura-circle bg-primary-container w-[500px] h-[500px] top-[-100px] left-[-100px]"></div>
        <div className="aura-circle bg-tertiary-container w-[400px] h-[400px] bottom-[10%] right-[-10%]"></div>
        <div className="aura-circle bg-secondary-container w-[300px] h-[300px] top-[40%] left-[20%]"></div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
        {/* Dashboard Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className={cn(typography.heading.h1, "text-on-background")}>Employees</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-primary animate-pulse"}`}></span>
              <p className={cn(typography.body.md, "text-on-surface-variant")}>
                {employees.length} active team members {isLive ? "(Supabase DB)" : "(Local)"}
              </p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className={cn(typography.button.md, "flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all")}
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>Add Employee</span>
          </button>
        </div>

        {/* Main Glass Container */}
        <div className="glass-card rounded-xl overflow-hidden flex flex-col border border-white/40">
          {/* Filters Row */}
          <div className="p-6 border-b border-white/20 flex flex-wrap items-center gap-4">
            <div className="relative min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input
                className={cn(typography.body.md, "w-full bg-white/40 border border-white/40 rounded-full py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20")}
                placeholder="Search by name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className={cn(typography.button.md, "bg-white/40 px-4 py-2 rounded-full border border-white/40 cursor-pointer outline-none")}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="all">All Branches</option>
              {branches.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5">
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Employee</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Branch / Location</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Documents</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Expiry Status</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest text-right")}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                      No employees found.
                    </td>
                  </tr>
                )}
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface-container flex items-center justify-center font-bold text-primary">
                          {emp.avatar_url ? (
                            <img className="w-full h-full object-cover" alt={emp.full_name} src={emp.avatar_url} />
                          ) : (
                            emp.full_name.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className={cn(typography.heading.h3, "text-on-background")}>{emp.full_name}</p>
                          <p className={cn(typography.body.md, "text-on-surface-variant")}>ID: {emp.employee_code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={cn(typography.body.lg, "font-semibold text-on-background")}>{emp.location || "Global Headquarters"}</span>
                        {emp.position && <span className={cn(typography.caption.md, "text-on-surface-variant")}>{emp.position}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {(!emp.documents || emp.documents.length === 0) ? (
                          <span className={cn(typography.caption.sm, "text-on-surface-variant italic")}>No documents</span>
                        ) : (
                          emp.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/40 border border-white/60 text-xs shadow-sm hover:shadow-md transition-shadow">
                              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined text-[14px]">
                                  {getSmartDocumentIcon(doc.document_type_name)}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-on-surface leading-tight truncate max-w-[120px]">{doc.document_type_name}</span>
                                <span className="text-on-surface-variant text-[10px] leading-tight">Exp: {formatDisplayDate(doc.expiry_date)}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getDocStatusBadge(emp)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(emp)}
                          className="p-2 hover:bg-primary/10 rounded-full text-on-surface-variant hover:text-primary transition-all"
                          title="Edit Employee"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => deleteEmployee(emp.id)}
                          className="p-2 hover:bg-error/10 rounded-full text-on-surface-variant hover:text-error transition-all"
                          title="Delete Employee"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="p-6 border-t border-white/20 flex items-center justify-between">
            <p className={cn(typography.caption.md, "font-semibold text-on-surface-variant")}>
              Showing {filteredEmployees.length} of {employees.length} team members
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
