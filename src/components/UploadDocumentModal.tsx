'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { typography } from '@/config/typography';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadDocumentModal({ isOpen, onClose }: UploadDocumentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="modal-container">
      <div className="absolute inset-0 bg-on-background/10 backdrop-blur-sm" onClick={onClose}></div>
      {/* The Modal */}
      <div className="glass-modal w-full max-w-2xl rounded-xl relative flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-white/30 flex justify-between items-center">
          <div>
            <h3 className={cn(typography.heading.h1, "text-primary tracking-tight")}>Upload Document</h3>
            <p className={cn(typography.body.md, "text-on-surface-variant")}>Assign a new document to an employee profile</p>
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/40 transition-colors" 
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {/* Modal Body (Steps) */}
        <div className="p-8 space-y-section-spacing overflow-y-auto max-h-[716px]">
          {/* Step 1: Identity & Type */}
          <div className="space-y-stack-gap">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(typography.caption.sm, "w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold")}>1</span>
              <span className={cn(typography.label.md, "font-bold text-on-surface uppercase tracking-wider")}>Target &amp; Document Type</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-2")}>Employee</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary opacity-60">person_search</span>
                  <input className={cn(typography.body.md, "w-full pl-10 pr-4 py-3 bg-white/40 border-none rounded-lg focus:ring-2 focus:ring-primary/50 transition-all outline-none")} type="text" defaultValue="Jane Doe (EMP-092)"/>
                </div>
              </div>
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-2")}>Document Type</label>
                <select className={cn(typography.body.md, "w-full px-4 py-3 bg-white/40 border-none rounded-lg focus:ring-2 focus:ring-primary/50 appearance-none transition-all outline-none")}>
                  <option>Residence Visa</option>
                  <option>Passport</option>
                  <option>Labour Card</option>
                  <option>Medical Certificate</option>
                  <option>Insurance Policy</option>
                </select>
              </div>
            </div>
          </div>
          {/* Step 2: Upload Zone */}
          <div className="space-y-stack-gap">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(typography.caption.sm, "w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold")}>2</span>
              <span className={cn(typography.label.md, "font-bold text-on-surface uppercase tracking-wider")}>File Selection</span>
            </div>
            <div 
              className="border-2 border-dashed border-primary/30 rounded-lg p-10 flex flex-col items-center justify-center text-center bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group"
              onDragEnter={(e) => { e.preventDefault(); e.currentTarget.classList.add('bg-primary/20', 'border-primary'); }}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('bg-primary/20', 'border-primary'); }}
              onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('bg-primary/20', 'border-primary'); }}
              onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('bg-primary/20', 'border-primary'); }}
            >
              <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
              </div>
              <h4 className={cn(typography.heading.h3, "text-on-surface mb-1")}>Drag and drop files here</h4>
              <p className={cn(typography.body.md, "text-on-surface-variant mb-6")}>PDF, JPG, PNG or DOCX (max 10MB)</p>
              <button className={cn(typography.button.md, "px-8 py-3 bg-white border border-primary/20 text-primary rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all")}>
                Browse Files
              </button>
            </div>
          </div>
          {/* Step 3: Metadata */}
          <div className="space-y-stack-gap">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(typography.caption.sm, "w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold")}>3</span>
              <span className={cn(typography.label.md, "font-bold text-on-surface uppercase tracking-wider")}>Validity &amp; metadata</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-2")}>Document Number</label>
                <input className={cn(typography.body.md, "w-full px-4 py-3 bg-white/40 border-none rounded-lg focus:ring-2 focus:ring-primary/50 transition-all outline-none")} placeholder="e.g. V-98234-LL" type="text"/>
              </div>
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-2")}>Expiry Date</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60">event</span>
                  <input className={cn(typography.body.md, "w-full px-4 py-3 bg-white/40 border-none rounded-lg focus:ring-2 focus:ring-primary/50 transition-all outline-none")} type="date"/>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-surface-container/50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="material-symbols-outlined text-primary">info</span>
              </div>
              <p className={cn(typography.caption.md, "text-on-surface-variant italic")}>Automated reminders will be sent to the employee 30, 15, and 7 days prior to expiry.</p>
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="p-8 pt-0 flex justify-end gap-4">
          <button 
            className={cn(typography.button.md, "px-8 py-3 bg-white/40 text-on-surface-variant rounded-full hover:bg-white/60 transition-all")} 
            onClick={onClose}
          >
            Cancel
          </button>
          <button className={cn(typography.button.lg, "px-10 py-3 bg-primary text-on-primary rounded-full shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center gap-2")}>
            <span>Process Upload</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
