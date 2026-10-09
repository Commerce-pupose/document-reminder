"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import MobileEmployeesTopAppBar from "../components/MobileEmployeesTopAppBar";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useEmployees, useConfig, useDocuments, getSmartDocumentIcon } from "@/backend/useHooks";
import { Employee } from "@/backend/data-types/models";
import { formatSupabaseDate, formatDisplayDate } from "@/lib/dateUtils";
import { uploadAvatar } from "@/lib/uploadAvatar";

interface DraftDocument {
  id: string;
  document_type_name: string;
  document_number: string;
  expiry_date: string;
  issuing_country: string;
}

/** Reusable avatar display: shows photo if present, else person icon */
function AvatarDisplay({
  url,
  name,
  size = "md",
}: {
  url?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "sm"
      ? "w-8 h-8"
      : size === "lg"
      ? "w-16 h-16"
      : "w-10 h-10";
  const iconSize =
    size === "sm" ? "text-[16px]" : size === "lg" ? "text-[32px]" : "text-[20px]";

  return (
    <div
      className={cn(
        dim,
        "rounded-full border-2 border-white shadow-sm overflow-hidden bg-primary/10 flex items-center justify-center text-primary shrink-0"
      )}
    >
      {url ? (
        <img className="w-full h-full object-cover" alt={name} src={url} />
      ) : (
        <span className={cn("material-symbols-outlined", iconSize)}>person</span>
      )}
    </div>
  );
}

export default function MobileEmployeesPage() {
  const { employees, isLive, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { branches, documentTypes } = useConfig();
  const { addDocument } = useDocuments();

  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  // Avatar state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Document upload fields for mobile modal
  const [attachDocument, setAttachDocument] = useState(false);
  const [draftDocs, setDraftDocs] = useState<DraftDocument[]>([]);
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [docExpiryDate, setDocExpiryDate] = useState("");
  const [docIssuingCountry, setDocIssuingCountry] = useState("UAE");

  const [saving, setSaving] = useState(false);

  const resetAvatarState = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const openAddModal = () => {
    setEditingEmp(null);
    setName("");
    setCode("");
    setLocation(branches[0]?.name || "");
    setEmail("");
    setPhone("");
    setPosition("");
    resetAvatarState();
    
    // Reset doc fields
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
    setAvatarFile(null);
    
    // Show existing avatar as preview (if any), but not the old Unsplash URL
    const existingUrl = emp.avatar_url;
    const isOldDefault = existingUrl?.includes("unsplash.com");
    setAvatarPreview(existingUrl && !isOldDefault ? existingUrl : null);
    
    setAttachDocument(false);
    setDraftDocs([]);
    setShowModal(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const digits = val.replace(/\D/g, "").slice(0, 8);
    if (digits.length >= 5) {
      val = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    } else if (digits.length >= 3) {
      val = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    } else {
      val = digits;
    }
    setDocExpiryDate(val);
  };

  const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDocExpiryDate(formatDisplayDate(e.target.value, false));
    }
  };

  const handleAddDraftDoc = () => {
    if (!docExpiryDate.trim()) {
      alert("Please enter an expiry date (dd/mm/yyyy).");
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
    setDocNumber("");
    setDocExpiryDate("");
  };

  const handleRemoveDraftDoc = (id: string) => {
    setDraftDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const selectedLocation = location || (branches.length > 0 ? branches[0].name : "Global Headquarters");

    if (editingEmp) {
      let newAvatarUrl: string | undefined = undefined;
      if (avatarFile) {
        newAvatarUrl = (await uploadAvatar(avatarFile, editingEmp.id)) ?? undefined;
      } else if (avatarPreview === null) {
        newAvatarUrl = undefined;
      }

      await updateEmployee(editingEmp.id, {
        employee_code: code.trim() || editingEmp.employee_code,
        full_name: name.trim(),
        location: selectedLocation,
        email: email.trim(),
        phone: phone.trim(),
        position: position.trim(),
        ...(newAvatarUrl !== undefined ? { avatar_url: newAvatarUrl } : {}),
        // Clear old unsplash default if no new avatar provided
        ...(avatarFile === null && editingEmp.avatar_url?.includes("unsplash.com")
          ? { avatar_url: undefined }
          : {}),
      });
    } else {
      let avatarUrl: string | undefined = undefined;
      if (avatarFile) {
        avatarUrl = (await uploadAvatar(avatarFile)) ?? undefined;
      }

      const created = await addEmployee({
        employee_code: code.trim() || `NEX-${Math.floor(1000 + Math.random() * 9000)}`,
        full_name: name.trim(),
        location: selectedLocation,
        email: email.trim(),
        phone: phone.trim(),
        position: position.trim() || "Team Member",
        status: "active",
        ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
      });

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

    setSaving(false);
    setShowModal(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_code.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = selectedBranch === "All" || emp.location === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const getStatusTag = (emp: any) => {
    const docs = emp.documents || [];
    if (docs.some((d: any) => d.status === "expired")) {
      return (
        <span className={cn(typography.label.sm, "flex items-center gap-1 text-error font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
          EXPIRED
        </span>
      );
    }
    if (docs.some((d: any) => d.status === "expiring_soon")) {
      return (
        <span className={cn(typography.label.sm, "flex items-center gap-1 text-amber-500 font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          EXPIRING SOON
        </span>
      );
    }
    return (
      <span className={cn(typography.label.sm, "flex items-center gap-1 text-green-500 font-bold")}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        ACTIVE
      </span>
    );
  };

  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      {/* Background & Aura */}
      <div className="fixed inset-0 bg-background z-[99]"></div>
      <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-[101]">
        {/* Header */}
        <MobileEmployeesTopAppBar />

        {/* Content */}
        <main className="px-container-margin py-6 pb-safe">
          <header className="mb-6">
            <h1 className={cn(typography.heading.h1, "text-on-surface tracking-tight")}>Team Directory</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-primary animate-pulse"}`}></span>
              <p className={cn(typography.body.md, "text-on-surface-variant")}>{employees.length} Active Employees</p>
            </div>
          </header>

          {/* Search */}
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className={cn(typography.body.md, "w-full h-12 pl-12 pr-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant outline-none shadow-sm")}
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Branch filter */}
          <div className="mb-6">
            <select
              className={cn(typography.body.md, "w-full h-12 px-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-sm")}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="All">All Branches</option>
              {branches.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredEmployees.length === 0 ? (
              <div className="glass-panel-heavy p-8 rounded-2xl text-center text-on-surface-variant">
                No employees found matching your criteria.
              </div>
            ) : (
              filteredEmployees.map((emp) => {
                const isOldDefault = emp.avatar_url?.includes("unsplash.com");
                const avatarUrl = isOldDefault ? undefined : emp.avatar_url;
                
                return (
                  <div key={emp.id} className="glass-panel-heavy rounded-2xl p-4 flex flex-col gap-4 shadow-sm border border-white/40 hover:bg-white/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <AvatarDisplay url={avatarUrl} name={emp.full_name} size="lg" />
                        <div>
                          <h3 className={cn(typography.heading.h3, "text-on-surface font-bold")}>{emp.full_name}</h3>
                          <p className={cn(typography.body.md, "text-on-surface-variant text-sm mt-0.5")}>{emp.position || "Team Member"}</p>
                          <p className={cn(typography.caption.sm, "text-on-surface-variant/70 font-mono mt-1")}>{emp.employee_code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEditModal(emp)} className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => deleteEmployee(emp.id)} className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-white/30 pt-3">
                      {getStatusTag(emp)}
                      <span className={cn(typography.caption.md, "font-bold text-on-surface-variant")}>{emp.location || "Global HQ"}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        <MobileBottomNavBar />

        {/* FAB */}
        <button
          onClick={openAddModal}
          className="fixed bottom-28 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform z-[110]"
        >
          <span className="material-symbols-outlined text-[28px]">person_add</span>
        </button>

        {/* Add/Edit Modal Full Screen Mobile */}
        {showModal && (
          <div className="fixed inset-0 z-[200] bg-surface flex flex-col animate-in slide-in-from-bottom-full duration-300">
            <header className="px-4 py-4 flex items-center justify-between border-b border-outline-variant/20 bg-surface/80 backdrop-blur-md sticky top-0 z-10">
              <h2 className={cn(typography.heading.h2, "text-on-surface")}>{editingEmp ? "Edit Employee" : "New Employee"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-surface-container active:scale-95 transition-transform text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>
            
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 pb-safe">
              
              {/* Avatar Picker for Mobile */}
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-primary/10 flex items-center justify-center text-primary">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[48px]">person</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute inset-0 rounded-full flex items-center justify-center bg-black/20"
                  >
                    <span className="material-symbols-outlined text-white text-[28px]">photo_camera</span>
                  </button>
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="text-xs px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold active:bg-primary/20 transition-colors"
                  >
                    {avatarPreview ? "Change Photo" : "Upload Photo"}
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={() => { setAvatarFile(null); setAvatarPreview(null); }}
                      className="text-xs px-4 py-2 rounded-full bg-error/10 text-error border border-error/20 font-bold active:bg-error/20 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Full Name *</label>
                  <input
                    className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Code</label>
                    <input
                      className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. NEX-50"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Branch</label>
                    <select
                      className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                      value={location || (branches[0]?.name || "")}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {branches.length === 0 ? (
                        <option value="Global Headquarters">Global HQ</option>
                      ) : (
                        branches.map((b) => (
                          <option key={b.id} value={b.name}>{b.name}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Position</label>
                  <input
                    className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Designer"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Email</label>
                    <input
                      className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="sarah@..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Phone</label>
                    <input
                      className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="+971..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {!editingEmp && (
                <div className="pt-4 border-t border-outline-variant/20">
                  <div
                    className="flex items-center justify-between cursor-pointer mb-2 bg-surface-container/40 p-4 rounded-xl border border-outline-variant/30 active:scale-[0.98] transition-transform"
                    onClick={() => setAttachDocument(!attachDocument)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-[24px]">note_add</span>
                      <div>
                        <p className={cn(typography.label.lg, "font-bold text-on-surface")}>Upload Documents ({draftDocs.length})</p>
                        <p className={cn(typography.caption.sm, "text-on-surface-variant")}>Visa, Passport, IDs</p>
                      </div>
                    </div>
                    <input type="checkbox" checked={attachDocument} onChange={(e) => setAttachDocument(e.target.checked)} className="w-5 h-5 accent-primary" />
                  </div>

                  {attachDocument && (
                    <div className="space-y-4 bg-surface-container/30 p-4 rounded-xl border border-outline-variant/30 animate-in fade-in duration-200">
                      {draftDocs.length > 0 && (
                        <div className="mb-4 space-y-2">
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase font-bold")}>Attached</label>
                          <div className="flex flex-col gap-2">
                            {draftDocs.map((d) => (
                              <div key={d.id} className="flex items-center justify-between px-3 py-2 bg-white/70 border border-primary/20 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-[20px] text-primary">description</span>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-on-surface">{d.document_type_name}</span>
                                    <span className="text-[10px] text-on-surface-variant font-mono">{d.document_number} • Exp: {d.expiry_date}</span>
                                  </div>
                                </div>
                                <button type="button" onClick={() => handleRemoveDraftDoc(d.id)} className="p-2 text-error active:bg-error/10 rounded-full transition-colors">
                                  <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Type</label>
                          <select
                            className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                            value={docType}
                            onChange={(e) => setDocType(e.target.value)}
                          >
                            {documentTypes.length === 0 ? (
                              <>
                                <option>Work Visa</option>
                                <option>Passport</option>
                                <option>Emirates ID</option>
                              </>
                            ) : (
                              documentTypes.map((dt) => (
                                <option key={dt.id} value={dt.name}>{dt.name}</option>
                              ))
                            )}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Doc Number</label>
                            <input
                              className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                              placeholder="e.g. V-98234"
                              value={docNumber}
                              onChange={(e) => setDocNumber(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Issuing Country</label>
                            <input
                              className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                              placeholder="e.g. UAE"
                              value={docIssuingCountry}
                              onChange={(e) => setDocIssuingCountry(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1 font-bold")}>Expiry Date *</label>
                          <div className="relative flex items-center">
                            <input
                              className="w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl pl-4 pr-12 py-3 text-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                              placeholder="dd/mm/yyyy"
                              maxLength={10}
                              value={docExpiryDate}
                              onChange={handleDateInputChange}
                            />
                            <label className="absolute right-4 cursor-pointer text-primary active:scale-95 flex items-center h-full">
                              <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                              <input type="date" className="sr-only" onChange={handleNativePickerChange} />
                            </label>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddDraftDoc}
                          className="w-full py-3 bg-primary/10 active:bg-primary/20 text-primary border border-primary/30 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 mt-2"
                        >
                          <span className="material-symbols-outlined">add_circle</span>
                          <span>Add to list</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-outline-variant/20 bg-surface/80 backdrop-blur-md pb-safe">
              <button
                onClick={handleSave}
                disabled={saving}
                className={cn(typography.button.lg, "w-full py-4 rounded-xl bg-primary text-white shadow-lg active:scale-95 transition-transform font-bold text-base disabled:opacity-60")}
              >
                {saving ? "Saving..." : editingEmp ? "Update Employee" : "Save Employee"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
