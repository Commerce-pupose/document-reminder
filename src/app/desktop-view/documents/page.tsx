'use client';
import { useState } from 'react';
import UploadDocumentModal from '@/components/UploadDocumentModal';
import { cn } from '@/lib/cn';
import { typography } from '@/config/typography';

export default function DocumentsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <div className="p-container-margin pb-24 md:pb-8 space-y-section-spacing">
        {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className={cn(typography.heading.h1, "text-on-surface")}>Document Repository</h3>
          <p className={cn(typography.body.md, "text-on-surface-variant")}>Manage and browse all employee credentials across the global workspace.</p>
        </div>
        <div className="flex gap-3">
          <button className={cn(typography.button.md, "flex items-center gap-2 px-6 py-3 bg-white/20 border border-white/40 backdrop-blur-lg rounded-full text-on-surface hover:bg-white/40 transition-all active:scale-95")}>
            <span className="material-symbols-outlined">upload_file</span>
            Bulk Upload
          </button>
          <button 
            className={cn(typography.button.md, "flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container rounded-full shadow-lg shadow-primary/30 hover:brightness-110 transition-all active:scale-95")}
            onClick={() => setIsUploadModalOpen(true)}
          >
            <span className="material-symbols-outlined">add</span>
            New Document
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <section className="glass-panel-heavy p-6 rounded-lg flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:flex-1 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
          <input className={cn(typography.body.md, "w-full pl-12 pr-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none")} placeholder="Search by name, document ID, or employee..." type="text"/>
        </div>
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <select className={cn(typography.label.md, "px-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]")}>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Expiring Soon</option>
            <option>Expired</option>
          </select>
          <select className={cn(typography.label.md, "px-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]")}>
            <option>Category</option>
            <option>Visa</option>
            <option>Passport</option>
            <option>National ID</option>
            <option>Insurance</option>
          </select>
          <button className="p-3 bg-white/40 border border-white/40 rounded-xl hover:bg-white/60 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
          </button>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-section-spacing">
        {/* Document Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stack-gap">
            {/* Card 1: Passport (Active) */}
            <div className="glass-panel p-card-padding rounded-lg flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">downloading</span>
                </div>
                <span className={cn(typography.label.sm, "px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1")}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Active
                </span>
              </div>
              <h4 className={cn(typography.heading.h3, "text-on-surface mb-1 truncate")}>International Passport</h4>
              <p className={cn(typography.body.md, "text-on-surface-variant mb-6")}>Employee: Elena Zhao</p>
              <div className={cn(typography.label.md, "flex items-center gap-2 text-on-surface-variant mb-6")}>
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Exp: Oct 24, 2028
              </div>
              <button className={cn(typography.button.md, "w-full py-3 bg-white/40 border border-white/60 rounded-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-95")}>
                View Details
              </button>
            </div>

            {/* Card 2: Visa (Expiring Soon) */}
            <div className="glass-panel p-card-padding rounded-lg flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[28px]">badge</span>
                </div>
                <span className={cn(typography.label.sm, "px-3 py-1 bg-orange-100 text-orange-700 rounded-full flex items-center gap-1")}>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Expiring
                </span>
              </div>
              <h4 className={cn(typography.heading.h3, "text-on-surface mb-1 truncate")}>Residence Visa</h4>
              <p className={cn(typography.body.md, "text-on-surface-variant mb-6")}>Employee: Marcus Thorne</p>
              <div className={cn(typography.label.md, "flex items-center gap-2 text-orange-600 font-bold mb-6")}>
                <span className="material-symbols-outlined text-[18px]">warning</span>
                Exp: Nov 12, 2024
              </div>
              <button className={cn(typography.button.md, "w-full py-3 bg-white/40 border border-white/60 rounded-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-95")}>
                Renew Now
              </button>
            </div>

            {/* Card 3: National ID (Expired) */}
            <div className="glass-panel p-card-padding rounded-lg flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-error/10 rounded-2xl flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[28px]">id_card</span>
                </div>
                <span className={cn(typography.label.sm, "px-3 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1")}>
                  Expired
                </span>
              </div>
              <h4 className={cn(typography.heading.h3, "text-on-surface mb-1 truncate")}>National ID Card</h4>
              <p className={cn(typography.body.md, "text-on-surface-variant mb-6")}>Employee: Sofia Al-Sayed</p>
              <div className={cn(typography.label.md, "flex items-center gap-2 text-error font-bold mb-6")}>
                <span className="material-symbols-outlined text-[18px]">error</span>
                Exp: Sep 30, 2023
              </div>
              <button className={cn(typography.button.md, "w-full py-3 bg-error text-white rounded-xl shadow-lg shadow-error/20 hover:brightness-110 transition-all active:scale-95")}>
                Upload New
              </button>
            </div>

            {/* Card 4: Insurance (Active) */}
            <div className="glass-panel p-card-padding rounded-lg flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">health_and_safety</span>
                </div>
                <span className={cn(typography.label.sm, "px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1")}>
                  Active
                </span>
              </div>
              <h4 className={cn(typography.heading.h3, "text-on-surface mb-1 truncate")}>Health Insurance</h4>
              <p className={cn(typography.body.md, "text-on-surface-variant mb-6")}>Employee: James Miller</p>
              <div className={cn(typography.label.md, "flex items-center gap-2 text-on-surface-variant mb-6")}>
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Exp: Jan 15, 2026
              </div>
              <button className={cn(typography.button.md, "w-full py-3 bg-white/40 border border-white/60 rounded-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-95")}>
                View Details
              </button>
            </div>

            {/* Card 5: Work Permit (Active) */}
            <div className="glass-panel p-card-padding rounded-lg flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[28px]">work</span>
                </div>
                <span className={cn(typography.label.sm, "px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1")}>
                  Active
                </span>
              </div>
              <h4 className={cn(typography.heading.h3, "text-on-surface mb-1 truncate")}>Work Permit G-Type</h4>
              <p className={cn(typography.body.md, "text-on-surface-variant mb-6")}>Employee: David Kim</p>
              <div className={cn(typography.label.md, "flex items-center gap-2 text-on-surface-variant mb-6")}>
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Exp: Jun 08, 2025
              </div>
              <button className={cn(typography.button.md, "w-full py-3 bg-white/40 border border-white/60 rounded-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-95")}>
                View Details
              </button>
            </div>

            {/* Card 6: Travel Authorization (Expiring Soon) */}
            <div className="glass-panel p-card-padding rounded-lg flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[28px]">flight</span>
                </div>
                <span className={cn(typography.label.sm, "px-3 py-1 bg-orange-100 text-orange-700 rounded-full flex items-center gap-1")}>
                  Expiring
                </span>
              </div>
              <h4 className={cn(typography.heading.h3, "text-on-surface mb-1 truncate")}>Travel Authorization</h4>
              <p className={cn(typography.body.md, "text-on-surface-variant mb-6")}>Employee: Lucia Rossi</p>
              <div className={cn(typography.label.md, "flex items-center gap-2 text-orange-600 font-bold mb-6")}>
                <span className="material-symbols-outlined text-[18px]">warning</span>
                Exp: Nov 30, 2024
              </div>
              <button className={cn(typography.button.md, "w-full py-3 bg-white/40 border border-white/60 rounded-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-95")}>
                Renew Now
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Recent Activity */}
        <aside className="w-full lg:w-80 space-y-stack-gap">
          <div className="glass-panel-heavy p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h5 className={cn(typography.heading.h3, "text-on-surface")}>Activity</h5>
              <button className={cn(typography.button.sm, "text-primary hover:underline")}>View All</button>
            </div>
            <div className="space-y-6">
              {/* Activity Item 1 */}
              <div className="flex gap-4 relative">
                <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-outline-variant/30"></div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm">upload</span>
                </div>
                <div>
                  <p className={cn(typography.body.md, "text-on-surface leading-tight")}>Elena Zhao uploaded a new Passport copy</p>
                  <p className={cn(typography.caption.sm, "uppercase mt-1")}>2 hours ago</p>
                </div>
              </div>
              {/* Activity Item 2 */}
              <div className="flex gap-4 relative">
                <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-outline-variant/30"></div>
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 flex-shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm">verified</span>
                </div>
                <div>
                  <p className={cn(typography.body.md, "text-on-surface leading-tight")}>Admin approved Marcus Thorne's Medical Insurance</p>
                  <p className={cn(typography.caption.sm, "uppercase mt-1")}>5 hours ago</p>
                </div>
              </div>
              {/* Activity Item 3 */}
              <div className="flex gap-4 relative">
                <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-outline-variant/30"></div>
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-600 flex-shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm">history</span>
                </div>
                <div>
                  <p className={cn(typography.body.md, "text-on-surface leading-tight")}>System sent renewal reminder to Sofia Al-Sayed</p>
                  <p className={cn(typography.caption.sm, "uppercase mt-1")}>Yesterday</p>
                </div>
              </div>
              {/* Activity Item 4 */}
              <div className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm">person_add</span>
                </div>
                <div>
                  <p className={cn(typography.body.md, "text-on-surface leading-tight")}>New profile created for David Kim</p>
                  <p className={cn(typography.caption.sm, "uppercase mt-1")}>2 days ago</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mini Stats Card */}
          <div className="bg-primary text-white p-6 rounded-lg relative overflow-hidden shadow-xl shadow-primary/20">
            <div className="relative z-10">
              <p className={cn(typography.caption.sm, "uppercase font-bold tracking-widest opacity-80 mb-1")}>Total Repository</p>
              <h3 className={cn(typography.number.large, "mb-4")}>1,248 Docs</h3>
              <div className="flex items-center gap-2">
                <span className={cn(typography.label.sm, "flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full")}>
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  12%
                </span>
                <span className={cn(typography.caption.sm, "opacity-70")}>vs last month</span>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10">folder_managed</span>
          </div>
        </aside>
      </div>
    </div>
      <UploadDocumentModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </>
  );
}
