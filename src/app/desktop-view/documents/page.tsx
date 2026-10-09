'use client';

import { useState, useMemo } from 'react';
import UploadDocumentModal from '@/components/UploadDocumentModal';
import { cn } from '@/lib/cn';
import { typography } from '@/config/typography';
import { useDocuments, useEmployees, useConfig } from '@/backend/useHooks';
import { DocumentItem, Employee } from '@/backend/data-types/models';
import { formatDisplayDate } from '@/lib/dateUtils';

function worstStatus(docs: DocumentItem[]): string {
  if (docs.some((d) => d.status === 'expired')) return 'expired';
  if (docs.some((d) => d.status === 'expiring_soon')) return 'expiring_soon';
  if (docs.some((d) => d.status === 'renewed')) return 'renewed';
  return 'valid';
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'expired')
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-bold tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        Expired
      </span>
    );
  if (status === 'expiring_soon')
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-[11px] font-bold tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        Expiring Soon
      </span>
    );
  if (status === 'renewed')
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        Renewed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Active
    </span>
  );
}

function docDateColor(status: string) {
  if (status === 'expired') return 'text-red-600 font-semibold';
  if (status === 'expiring_soon') return 'text-orange-600 font-semibold';
  return 'text-on-surface font-semibold';
}

function EmployeeDocCard({
  employee,
  docs,
  onEdit,
  onDelete,
}: {
  employee: Employee;
  docs: DocumentItem[];
  onEdit: (doc: DocumentItem) => void;
  onDelete: (docId: string) => void;
}) {
  const status = worstStatus(docs);
  const cols = Math.min(docs.length, 3);

  return (
    <div
      className={cn(
        'glass-panel-heavy rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
        status === 'expired' && 'ring-1 ring-red-200',
        status === 'expiring_soon' && 'ring-1 ring-orange-200',
      )}
    >
      <div className="px-5 pt-4 pb-3 flex justify-between items-start gap-2">
        <h4 className={cn(typography.heading.h3, 'text-on-surface font-extrabold tracking-tight leading-tight')}>
          {employee.location || 'Global HQ'}
        </h4>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <StatusBadge status={status} />
          <button
            onClick={() => docs[0] && onEdit(docs[0])}
            className="p-1 text-on-surface-variant hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
          <button
            onClick={() => docs.forEach((d) => onDelete(d.id))}
            className="p-1 text-on-surface-variant hover:text-error rounded-full hover:bg-error/10 transition-colors"
            title="Delete all"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>

      <div className="px-5 py-3 flex items-center gap-4 border-t border-b border-white/30">
        {employee.avatar_url ? (
          <img
            src={employee.avatar_url}
            alt={employee.full_name}
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-sm ring-2 ring-white"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm ring-2 ring-white">
            <span className="material-symbols-outlined text-[28px] text-primary">person</span>
          </div>
        )}
        <p className={cn(typography.body.md, 'text-on-surface-variant')}>
          Employee: <span className="font-bold text-on-surface">{employee.full_name}</span>
        </p>
      </div>

      <div
        className="px-5 py-4 grid gap-x-4 gap-y-3"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {docs.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onEdit(doc)}
            className="flex flex-col gap-0.5 text-left hover:opacity-70 transition-opacity group"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/80 group-hover:text-primary transition-colors">
              {doc.document_type_name}
            </span>
            <span className={cn('text-[13px]', docDateColor(doc.status))}>
              {formatDisplayDate(doc.expiry_date)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const { documents, isLive, deleteDocument } = useDocuments();
  const { employees } = useEmployees();
  const { branches } = useConfig();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');

  const openNewDocModal = () => {
    setEditingDoc(null);
    setIsUploadModalOpen(true);
  };

  const openEditModal = (doc: DocumentItem) => {
    setEditingDoc(doc);
    setIsUploadModalOpen(true);
  };

  const getEmployee = (empId: string) => employees.find((e) => e.id === empId);

  const grouped = useMemo(() => {
    const map = new Map<string, { employee: Employee; docs: DocumentItem[] }>();
    documents.forEach((doc) => {
      const emp = getEmployee(doc.employee_id);
      if (!emp) return;

      const empCompany = emp.location || 'Global HQ';
      const empName = emp.full_name.toLowerCase();
      const docName = (doc.document_type_name || '').toLowerCase();
      const docNum = (doc.document_number || '').toLowerCase();
      const q = search.toLowerCase();

      const matchesSearch =
        empName.includes(q) ||
        empCompany.toLowerCase().includes(q) ||
        docName.includes(q) ||
        docNum.includes(q);
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesCompany = companyFilter === 'all' || empCompany === companyFilter;

      if (!matchesSearch || !matchesStatus || !matchesCompany) return;

      if (!map.has(emp.id)) map.set(emp.id, { employee: emp, docs: [] });
      map.get(emp.id)!.docs.push(doc);
    });
    return Array.from(map.values());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, employees, search, statusFilter, companyFilter]);

  const totalExpired = documents.filter((d) => d.status === 'expired').length;
  const totalExpiring = documents.filter((d) => d.status === 'expiring_soon').length;

  return (
    <>
      <div className="p-container-margin pb-24 md:pb-8 space-y-section-spacing">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className={cn(typography.heading.h1, 'text-on-surface')}>Document Repository</h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className={cn(typography.caption.sm, 'text-on-surface font-medium')}>
                  {isLive ? 'Supabase Live DB' : 'Local'}
                </span>
              </div>
            </div>
            <p className={cn(typography.body.md, 'text-on-surface-variant mt-1')}>
              Manage and browse all employee credentials across the global workspace.
            </p>
          </div>
          <button
            className={cn(typography.button.md, 'flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container rounded-full shadow-lg shadow-primary/30 hover:brightness-110 transition-all active:scale-95')}
            onClick={openNewDocModal}
          >
            <span className="material-symbols-outlined">add</span>
            New Document
          </button>
        </div>

        <section className="glass-panel-heavy p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
            <input
              className={cn(typography.body.md, 'w-full pl-12 pr-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none')}
              placeholder="Search by name, document ID, or employee..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select
              className={cn(typography.label.md, 'px-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]')}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="valid">Active / Valid</option>
              <option value="expiring_soon">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
            <select
              className={cn(typography.label.md, 'px-4 py-3 bg-white/40 border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none min-w-[140px]')}
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option value="all">All Companies</option>
              {branches.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Documents', value: documents.length, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Expired', value: totalExpired, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Expiring Soon', value: totalExpiring, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((s) => (
            <div key={s.label} className={cn('rounded-2xl p-4 flex items-center gap-4 glass-panel', s.bg)}>
              <span className={cn(typography.number.large, s.color)}>{s.value}</span>
              <span className={cn(typography.label.md, 'text-on-surface-variant')}>{s.label}</span>
            </div>
          ))}
        </div>

        {grouped.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-40 mb-2">folder_open</span>
            <p className={cn(typography.heading.h3, 'text-on-surface')}>No documents found in repository</p>
            <p className={cn(typography.body.md, 'text-on-surface-variant mt-1 mb-6')}>
              Upload a new document to assign it to an employee.
            </p>
            <button
              onClick={openNewDocModal}
              className={cn(typography.button.md, 'px-6 py-2.5 bg-primary text-white rounded-full shadow-md')}
            >
              Upload First Document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stack-gap">
            {grouped.map(({ employee, docs }) => (
              <EmployeeDocCard
                key={employee.id}
                employee={employee}
                docs={docs}
                onEdit={openEditModal}
                onDelete={deleteDocument}
              />
            ))}
          </div>
        )}
      </div>
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        editingDocument={editingDoc}
      />
    </>
  );
}
