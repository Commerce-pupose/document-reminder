'use client';

import { useState } from 'react';
import UploadDocumentModal from '@/components/UploadDocumentModal';
import { cn } from '@/lib/cn';
import { typography } from '@/config/typography';
import { useDocuments, useEmployees, useConfig, getSmartDocumentIcon } from '@/backend/useHooks';
import { DocumentItem } from '@/backend/data-types/models';
import { formatDisplayDate } from '@/lib/dateUtils';

export default function DocumentsPage() {
  const { documents, isLive, deleteDocument } = useDocuments();
  const { employees } = useEmployees();
  const { documentTypes, branches } = useConfig();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');

  const openNewDocModal = () => {
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
    return found ? found.full_name : 'Team Member';
  };

  const getEmployeeCompany = (empId: string) => {
    const found = getEmployee(empId);
    return found ? (found.location || 'Global Headquarters') : '';
  };

  const getDocIcon = (docTypeName: string) => {
    const found = documentTypes.find((dt) => dt.name.toLowerCase() === (docTypeName || '').toLowerCase());
    if (found && found.icon) {
      return found.icon;
    }
    return getSmartDocumentIcon(docTypeName);
  };

  const filteredDocuments = documents.filter((doc) => {
    const emp = getEmployee(doc.employee_id);
    const empName = (emp ? emp.full_name : 'Team Member').toLowerCase();
    const empCompany = emp ? (emp.location || 'Global Headquarters') : '';
    const docName = (doc.document_type_name || '').toLowerCase();
    const docNum = (doc.document_number || '').toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch = empName.includes(q) || empCompany.toLowerCase().includes(q) || docName.includes(q) || docNum.includes(q);
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || docName.includes(categoryFilter.toLowerCase());
    const matchesCompany = companyFilter === 'all' || empCompany === companyFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesCompany;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'expired') {
      return (
        <span className={cn(typography.label.sm, "px-3 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1 font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Expired
        </span>
      );
    }
    if (status === 'expiring_soon') {
      return (
        <span className={cn(typography.label.sm, "px-3 py-1 bg-orange-100 text-orange-700 rounded-full flex items-center gap-1 font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          Expiring Soon
        </span>
      );
    }
    return (
      <span className={cn(typography.label.sm, "px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1 font-bold")}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        Active
      </span>
    );
  };

  return (
    <>
      <div className="p-container-margin pb-24 md:pb-8 space-y-section-spacing">
        {/* Page Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className={cn(typography.heading.h1, "text-on-surface")}>Document Repository</h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                  {isLive ? "Supabase Live DB" : "Local"}
                </span>
              </div>
            </div>
            <p className={cn(typography.body.md, "text-on-surface-variant mt-1")}>
              Manage and browse all employee credentials across the global workspace.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              className={cn(typography.button.md, "flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container rounded-full shadow-lg shadow-primary/30 hover:brightness-110 transition-all active:scale-95")}
              onClick={openNewDocModal}
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
            <input
              className={cn(typography.body.md, "w-full pl-12 pr-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none")}
              placeholder="Search by name, document ID, or employee..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select
              className={cn(typography.label.md, "px-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]")}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="valid">Active / Valid</option>
              <option value="expiring_soon">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>

            <select
              className={cn(typography.label.md, "px-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]")}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {documentTypes.map((dt) => (
                <option key={dt.id} value={dt.name}>
                  {dt.name}
                </option>
              ))}
            </select>

            <select
              className={cn(typography.label.md, "px-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]")}
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option value="all">All Companies</option>
              {branches.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-section-spacing">
          {/* Document Grid */}
          <div className="flex-1">
            {filteredDocuments.length === 0 ? (
              <div className="glass-panel p-12 rounded-lg text-center">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-40 mb-2">folder_open</span>
                <p className={cn(typography.heading.h3, "text-on-surface")}>No documents found in repository</p>
                <p className={cn(typography.body.md, "text-on-surface-variant mt-1 mb-6")}>
                  Upload a new document to assign it to an employee.
                </p>
                <button
                  onClick={openNewDocModal}
                  className={cn(typography.button.md, "px-6 py-2.5 bg-primary text-white rounded-full shadow-md")}
                >
                  Upload First Document
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stack-gap">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="glass-panel p-card-padding rounded-lg flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[28px]">
                          {getDocIcon(doc.document_type_name)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusBadge(doc.status)}
                        <button
                          onClick={() => openEditModal(doc)}
                          className="p-1 text-on-surface-variant hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                          title="Edit Document"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="p-1 text-on-surface-variant hover:text-error rounded-full hover:bg-error/10 transition-colors"
                          title="Delete Document"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                    <h4 className={cn(typography.heading.h3, "text-on-surface mb-1 truncate")}>{doc.document_type_name}</h4>
                    <p className={cn(typography.body.md, "text-on-surface-variant mb-1")}>Employee: {getEmployeeName(doc.employee_id)}</p>
                    <p className={cn(typography.caption.sm, "text-on-surface-variant/80 mb-2 font-medium")}>{getEmployeeCompany(doc.employee_id)}</p>
                    {doc.document_number && (
                      <p className={cn(typography.caption.sm, "text-outline mb-4 font-mono")}>No: {doc.document_number}</p>
                    )}
                    <div className={cn(typography.label.md, "flex items-center justify-between text-on-surface-variant mt-auto pt-4 border-t border-white/20")}>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span>Exp: {formatDisplayDate(doc.expiry_date)}</span>
                      </div>
                      {doc.issuing_country && (
                        <span className="text-xs px-2 py-0.5 bg-surface-container/60 rounded font-semibold text-on-surface-variant">
                          {doc.issuing_country}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Repository Stats */}
          <aside className="w-full lg:w-80 space-y-stack-gap">
            <div className="bg-primary text-white p-6 rounded-lg relative overflow-hidden shadow-xl shadow-primary/20">
              <div className="relative z-10">
                <p className={cn(typography.caption.sm, "uppercase font-bold tracking-widest opacity-80 mb-1")}>Total Repository</p>
                <h3 className={cn(typography.number.large, "mb-4")}>{documents.length} Docs</h3>
                <div className="flex items-center gap-2">
                  <span className={cn(typography.label.sm, "flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full")}>
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    {documents.filter((d) => d.status === 'valid').length} Active
                  </span>
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
        editingDocument={editingDoc}
      />
    </>
  );
}

