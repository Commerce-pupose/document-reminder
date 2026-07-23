"use client";

import { useState } from "react";
import Link from "next/link";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function MobileConfigPage() {
  const [activeTab, setActiveTab] = useState<"branches" | "departments" | "documents">("branches");

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
      </header>

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
              onClick={() => setActiveTab("departments")}
              className={cn(typography.button.sm, "relative z-10 flex-1 py-3 transition-colors", activeTab === "departments" ? "text-primary font-bold" : "text-on-surface-variant")}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={cn(typography.button.sm, "relative z-10 flex-1 py-3 transition-colors", activeTab === "documents" ? "text-primary font-bold" : "text-on-surface-variant")}
            >
              Doc Types
            </button>

            {/* Sliding Background */}
            <div
              className="absolute top-1.5 h-[calc(100%-12px)] w-[calc(33.33%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(${activeTab === "branches" ? "4px" : activeTab === "departments" ? "calc(100% + 4px)" : "calc(200% + 4px)"})`
              }}
            ></div>
          </div>
        </div>

        {/* Tab Content: Branches */}
        {activeTab === "branches" && (
          <div className="flex flex-col gap-stack-gap animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <h4 className={cn(typography.heading.h3, "text-on-surface")}>3 Branches</h4>
              <button className={cn(typography.button.sm, "flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20")}>
                <span className="material-symbols-outlined text-[18px]">add</span> Add Branch
              </button>
            </div>

            <div className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between group hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">location_city</span>
                </div>
                <div>
                  <p className={cn(typography.heading.h4, "text-on-surface")}>New York HQ</p>
                  <p className={cn(typography.caption.md, "text-on-surface-variant")}>124 Employees • Main Hub</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white/20 shrink-0">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>

            <div className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">apartment</span>
                </div>
                <div>
                  <p className={cn(typography.heading.h4, "text-on-surface")}>London Office</p>
                  <p className={cn(typography.caption.md, "text-on-surface-variant")}>42 Employees • Regional</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>

            <div className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <div>
                  <p className={cn(typography.heading.h4, "text-on-surface")}>Tokyo Satellite</p>
                  <p className={cn(typography.caption.md, "text-on-surface-variant")}>18 Employees • Branch</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Departments */}
        {activeTab === "departments" && (
          <div className="flex flex-col gap-stack-gap animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <h4 className={cn(typography.heading.h3, "text-on-surface")}>8 Departments</h4>
              <button className={cn(typography.button.sm, "flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20")}>
                <span className="material-symbols-outlined text-[18px]">add</span> Add Dept
              </button>
            </div>

            <div className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">engineering</span>
                </div>
                <div>
                  <p className={cn(typography.heading.h4, "text-on-surface")}>Engineering</p>
                  <p className={cn(typography.caption.md, "text-on-surface-variant")}>Product Development</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>

            <div className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <div>
                  <p className={cn(typography.heading.h4, "text-on-surface")}>Design</p>
                  <p className={cn(typography.caption.md, "text-on-surface-variant")}>Brand & UX</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Document Types */}
        {activeTab === "documents" && (
          <div className="flex flex-col gap-stack-gap animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <h4 className={cn(typography.heading.h3, "text-on-surface")}>5 Doc Types</h4>
              <button className={cn(typography.button.sm, "flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20")}>
                <span className="material-symbols-outlined text-[18px]">add</span> Add Type
              </button>
            </div>

            <div className="glass-card bg-white/40 p-card-padding rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface shrink-0">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <p className={cn(typography.heading.h4, "text-on-surface")}>Contract</p>
                  <p className={cn(typography.caption.md, "text-on-surface-variant")}>Legal Employment Documents</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className={cn(typography.label.sm, "px-2 py-1 bg-primary/10 text-primary rounded h-fit font-bold")}>REQUIRED</div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant shrink-0">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
