"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useConfig, getSmartDocumentIcon } from "@/backend/useHooks";
import { Branch, DocumentType } from "@/backend/data-types/models";

export default function MobileConfigPage() {
  const [activeTab, setActiveTab] = useState<"branches" | "documents">("branches");
  const {
    branches,
    documentTypes,
    isLive,
    addBranch,
    deleteBranch,
    addDocumentType,
    deleteDocumentType,
  } = useConfig();

  // Modal / Add state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [branchName, setBranchName] = useState("");
  const [branchSubtitle, setBranchSubtitle] = useState("");

  const [docName, setDocName] = useState("");
  const [docCategory, setDocCategory] = useState("");
  const [docReq, setDocReq] = useState("Required");

  const handleAddBranch = async () => {
    if (!branchName.trim()) return;
    await addBranch({ name: branchName, subtitle: branchSubtitle || "Branch" });
    setBranchName("");
    setBranchSubtitle("");
    setShowAddModal(false);
  };

  const handleAddDocType = async () => {
    if (!docName.trim()) return;
    const smartIcon = getSmartDocumentIcon(docName, docCategory);
    await addDocumentType({
      name: docName,
      category: docCategory || "General",
      requirement: docReq,
      icon: smartIcon,
    });
    setDocName("");
    setDocCategory("");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen text-on-surface pb-32 pt-24">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-[110] bg-surface/60 backdrop-blur-2xl border-b border-white/20 shadow-sm flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 border border-white/30 backdrop-blur-md hover:opacity-80 transition-opacity active:scale-95 shadow-sm">
            <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
          </Link>
          <h1 className={cn(typography.heading.h2, "text-primary")}>System Config</h1>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
          <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
          <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
            {isLive ? "Live DB" : "Local"}
          </span>
        </div>
      </header>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
          <div className="relative glass-modal rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h3 className={cn(typography.heading.h3, "text-on-surface")}>
                Add {activeTab === "branches" ? "Branch" : "Document Type"}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {activeTab === "branches" && (
              <div className="space-y-3">
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Branch Name (e.g. Dubai HQ)"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                />
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Subtitle (e.g. Main Hub - UAE)"
                  value={branchSubtitle}
                  onChange={(e) => setBranchSubtitle(e.target.value)}
                />
                <button onClick={handleAddBranch} className="w-full py-2.5 bg-primary text-white rounded-xl font-medium shadow-md">
                  Save Branch
                </button>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-3">
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Document Name (e.g. Passport, Visa, ID)"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                />
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Category (e.g. Identity, Legal)"
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                />
                <select
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none"
                  value={docReq}
                  onChange={(e) => setDocReq(e.target.value)}
                >
                  <option>Required</option>
                  <option>Mandatory</option>
                  <option>Standard</option>
                  <option>Optional</option>
                </select>
                <button onClick={handleAddDocType} className="w-full py-2.5 bg-primary text-white rounded-xl font-medium shadow-md">
                  Save Document Type
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="px-container-margin">
        {/* Segmented Control (Tabs) */}
        <div className="mb-8 sticky top-[10px] z-40">
          <div className="glass-card p-1.5 rounded-xl flex items-center relative overflow-hidden bg-white/40 backdrop-blur-md border border-white/50">
            <button
              onClick={() => setActiveTab("branches")}
              className={cn(typography.button.sm, "relative z-10 flex-1 py-3 transition-colors", activeTab === "branches" ? "text-primary font-bold" : "text-on-surface-variant")}
            >
              Branches
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={cn(typography.button.sm, "relative z-10 flex-1 py-3 transition-colors", activeTab === "documents" ? "text-primary font-bold" : "text-on-surface-variant")}
            >
              Doc Types
            </button>

            {/* Sliding Background */}
            <div
              className="absolute top-1.5 h-[calc(100%-12px)] w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(${activeTab === "branches" ? "4px" : "calc(100% + 4px)"})`
              }}
            ></div>
          </div>
        </div>

        {/* Tab Content: Branches */}
        {activeTab === "branches" && (
          <div className="flex flex-col gap-stack-gap animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <h4 className={cn(typography.heading.h3, "text-on-surface")}>{branches.length} Branches</h4>
              <button
                onClick={() => setShowAddModal(true)}
                className={cn(typography.button.sm, "flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20")}
              >
                <span className="material-symbols-outlined text-[18px]">add</span> Add Branch
              </button>
            </div>

            {branches.map((b) => (
              <div key={b.id} className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between group hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">location_city</span>
                  </div>
                  <div>
                    <p className={cn(typography.heading.h4, "text-on-surface")}>{b.name}</p>
                    <p className={cn(typography.caption.md, "text-on-surface-variant")}>{b.subtitle || "Location"}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteBranch(b.id)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-white/20 shrink-0"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Document Types */}
        {activeTab === "documents" && (
          <div className="flex flex-col gap-stack-gap animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <h4 className={cn(typography.heading.h3, "text-on-surface")}>{documentTypes.length} Doc Types</h4>
              <button
                onClick={() => setShowAddModal(true)}
                className={cn(typography.button.sm, "flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20")}
              >
                <span className="material-symbols-outlined text-[18px]">add</span> Add Type
              </button>
            </div>

            {documentTypes.map((dt) => (
              <div key={dt.id} className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      {dt.icon && dt.icon !== "description" ? dt.icon : getSmartDocumentIcon(dt.name, dt.category)}
                    </span>
                  </div>
                  <div>
                    <p className={cn(typography.heading.h4, "text-on-surface")}>{dt.name}</p>
                    <p className={cn(typography.caption.md, "text-on-surface-variant")}>{dt.category}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className={cn(typography.label.sm, "px-2 py-1 bg-primary/10 text-primary rounded h-fit font-bold uppercase")}>
                    {dt.requirement}
                  </div>
                  <button
                    onClick={() => deleteDocumentType(dt.id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error shrink-0"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

