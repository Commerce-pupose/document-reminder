'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { typography } from '@/config/typography';
import { useEmployees, useConfig, useDocuments } from '@/backend/useHooks';
import { DocumentItem } from '@/backend/data-types/models';
import { formatSupabaseDate, formatDisplayDate } from '@/lib/dateUtils';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingDocument?: DocumentItem | null;
}

export default function UploadDocumentModal({ isOpen, onClose, editingDocument }: UploadDocumentModalProps) {
  const { employees } = useEmployees();
  const { documentTypes } = useConfig();
  const { addDocument, updateDocument } = useDocuments();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [documentTypeName, setDocumentTypeName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [issuingCountry, setIssuingCountry] = useState('UAE');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (editingDocument) {
      setSelectedEmployeeId(editingDocument.employee_id || (employees[0]?.id || ''));
      setDocumentTypeName(editingDocument.document_type_name || (documentTypes[0]?.name || 'Work Visa'));
      setDocumentNumber(editingDocument.document_number || '');
      setExpiryDate(editingDocument.expiry_date ? formatDisplayDate(editingDocument.expiry_date, true) : '');
      setIssuingCountry(editingDocument.issuing_country || 'UAE');
      setNotes(editingDocument.notes || '');
    } else {
      setSelectedEmployeeId(employees[0]?.id || '');
      setDocumentTypeName(documentTypes[0]?.name || 'Work Visa');
      setDocumentNumber('');
      setExpiryDate('');
      setIssuingCountry('UAE');
      setNotes('');
    }
  }, [editingDocument, isOpen, employees, documentTypes]);

  if (!isOpen) return null;

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Auto-mask digits to dd/mm/yy
    const digits = val.replace(/\D/g, '').slice(0, 6);
    if (digits.length >= 5) {
      val = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 6)}`;
    } else if (digits.length >= 3) {
      val = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    } else {
      val = digits;
    }
    setExpiryDate(val);
  };

  const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setExpiryDate(formatDisplayDate(e.target.value, true));
    }
  };

  const handleProcessUpload = async () => {
    if (!expiryDate) {
      alert('Please enter an expiry date (dd/mm/yy).');
      return;
    }
    const empId = selectedEmployeeId || (employees.length > 0 ? employees[0].id : 'unassigned');
    const docType = documentTypeName || (documentTypes.length > 0 ? documentTypes[0].name : 'Work Visa');

    // Convert date for standard Supabase format (YYYY-MM-DD)
    const supabaseFormattedDate = formatSupabaseDate(expiryDate);

    // Calculate status based on expiry date
    const today = new Date();
    const exp = new Date(supabaseFormattedDate);
    const diffTime = exp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status: 'valid' | 'expiring_soon' | 'expired' = 'valid';
    if (diffDays < 0) {
      status = 'expired';
    } else if (diffDays <= 90) {
      status = 'expiring_soon';
    }

    setSubmitting(true);
    try {
      if (editingDocument) {
        await updateDocument(editingDocument.id, {
          employee_id: empId,
          document_type_name: docType,
          document_number: documentNumber || editingDocument.document_number,
          issuing_country: issuingCountry,
          expiry_date: supabaseFormattedDate,
          status,
          notes,
        });
      } else {
        await addDocument({
          employee_id: empId,
          document_type_name: docType,
          document_number: documentNumber || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
          issuing_country: issuingCountry,
          expiry_date: supabaseFormattedDate,
          status,
          notes,
        });
      }

      onClose();
    } catch (err) {
      console.error('Failed to save document:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 md:p-6" id="modal-container">
      <div className="absolute inset-0 bg-on-background/20 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Responsive Modal Container */}
      <div className="glass-modal w-full max-w-2xl rounded-2xl relative flex flex-col max-h-[85vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-8 sm:py-6 border-b border-white/30 flex justify-between items-center shrink-0 bg-white/40 backdrop-blur-md">
          <div>
            <h3 className={cn(typography.heading.h2, "sm:text-2xl text-primary tracking-tight font-bold")}>
              {editingDocument ? 'Edit Document' : 'Upload Document'}
            </h3>
            <p className={cn(typography.caption.md, "sm:text-sm text-on-surface-variant")}>
              {editingDocument ? 'Update document details and expiry date' : 'Assign a new document to an employee profile'}
            </p>
          </div>
          <button 
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/40 transition-colors text-on-surface-variant shrink-0" 
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1 hide-scrollbar">
          {/* Step 1: Target & Document Type */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={cn(typography.caption.sm, "w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold shrink-0")}>1</span>
              <span className={cn(typography.label.md, "font-bold text-on-surface uppercase tracking-wider")}>Target &amp; Document Type</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-1")}>Employee</label>
                <select
                  className={cn(typography.body.md, "w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/60 border border-white/50 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all outline-none text-sm")}
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                  {employees.length === 0 ? (
                    <option value="">No employees found</option>
                  ) : (
                    employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.full_name} ({emp.employee_code})
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-1")}>Document Type</label>
                <select
                  className={cn(typography.body.md, "w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/60 border border-white/50 rounded-xl focus:ring-2 focus:ring-primary/50 appearance-none transition-all outline-none text-sm")}
                  value={documentTypeName}
                  onChange={(e) => setDocumentTypeName(e.target.value)}
                >
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
            </div>
          </div>

          {/* Step 2: Validity & Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={cn(typography.caption.sm, "w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold shrink-0")}>2</span>
              <span className={cn(typography.label.md, "font-bold text-on-surface uppercase tracking-wider")}>Validity &amp; Metadata</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-1")}>Document Number</label>
                <input
                  className={cn(typography.body.md, "w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/60 border border-white/50 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all outline-none text-sm")}
                  placeholder="e.g. V-98234-LL"
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                />
              </div>

              {/* Custom dd/mm/yy Date Input Field */}
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-1")}>Expiry Date *</label>
                <div className="relative flex items-center">
                  <input
                    className={cn(
                      typography.body.md,
                      "w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 bg-white/60 border border-white/50 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all outline-none text-sm placeholder:text-outline-variant/60"
                    )}
                    placeholder="dd/mm/yy"
                    type="text"
                    maxLength={8}
                    value={expiryDate}
                    onChange={handleDateInputChange}
                  />
                  <label className="absolute right-3 cursor-pointer text-primary hover:opacity-80 flex items-center" title="Select date">
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    <input
                      type="date"
                      className="sr-only"
                      onChange={handleNativePickerChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-1")}>Issuing Country</label>
                <input
                  className={cn(typography.body.md, "w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/60 border border-white/50 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all outline-none text-sm")}
                  placeholder="e.g. UAE, Spain"
                  type="text"
                  value={issuingCountry}
                  onChange={(e) => setIssuingCountry(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className={cn(typography.label.md, "font-bold text-on-surface-variant ml-1")}>Notes (Optional)</label>
                <input
                  className={cn(typography.body.md, "w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/60 border border-white/50 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all outline-none text-sm")}
                  placeholder="Additional remarks..."
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Sticky) */}
        <div className="p-4 sm:p-6 border-t border-white/30 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0 bg-white/40 backdrop-blur-md">
          <button 
            className={cn(typography.button.md, "w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-white/50 text-on-surface-variant rounded-xl hover:bg-white/80 transition-all")} 
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleProcessUpload}
            disabled={submitting}
            className={cn(typography.button.md, "w-full sm:w-auto px-8 py-2.5 sm:py-3 bg-primary text-on-primary rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50")}
          >
            <span>{submitting ? "Saving..." : editingDocument ? "Update Document" : "Save Document"}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
