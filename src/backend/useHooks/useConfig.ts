"use client";

import { useState, useEffect, useCallback } from 'react';
import { Branch, Department, DocumentType } from '../data-types/models';
import { configService } from '../supabase/services/configService';
import { isSupabaseConfigured } from '../supabase/client';

export const DOCUMENT_ICONS = [
  'verified_user',
  'badge',
  'public',
  'work',
  'health_and_safety',
  'contract',
  'description',
  'id_card',
  'airplane_ticket',
  'assignment_ind',
  'folder_open',
  'article',
  'credit_card',
  'shield',
];

export function getSmartDocumentIcon(name: string = '', category: string = ''): string {
  const text = (name + ' ' + category).toLowerCase();
  if (text.includes('passport')) return 'public';
  if (text.includes('visa')) return 'airplane_ticket';
  if (text.includes('id') || text.includes('national') || text.includes('emirates')) return 'badge';
  if (text.includes('insurance') || text.includes('health') || text.includes('medical')) return 'health_and_safety';
  if (text.includes('work') || text.includes('labour') || text.includes('permit')) return 'work';
  if (text.includes('contract') || text.includes('agreement') || text.includes('legal')) return 'contract';

  // Random selection from document icon pool
  const randomIndex = Math.floor(Math.random() * DOCUMENT_ICONS.length);
  return DOCUMENT_ICONS[randomIndex];
}

export function useConfig() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const [bData, dData, dtData] = await Promise.all([
          configService.getBranches(),
          configService.getDepartments(),
          configService.getDocumentTypes(),
        ]);
        setBranches(bData || []);
        setDepartments(dData || []);
        setDocumentTypes(dtData || []);
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    } catch (err: any) {
      console.error('Supabase config fetch error:', err);
      setError(err?.message || 'Failed to fetch config');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Branch CRUD
  const addBranch = async (b: Omit<Branch, 'id'>) => {
    if (!isSupabaseConfigured()) return null;
    try {
      const created = await configService.createBranch(b);
      if (created) {
        setBranches((prev) => [...prev, created]);
        return created;
      }
    } catch (err) {
      console.error('Error creating branch on Supabase:', err);
      throw err;
    }
    return null;
  };

  const updateBranch = async (id: string, updates: Partial<Branch>) => {
    setBranches((prev) => prev.map((b) => (String(b.id) === String(id) ? { ...b, ...updates } : b)));
  };

  const deleteBranch = async (id: string) => {
    if (isSupabaseConfigured()) {
      try {
        await configService.deleteBranch(id);
      } catch (err) {
        console.error('Error deleting branch on Supabase:', err);
      }
    }
    setBranches((prev) => prev.filter((b) => String(b.id) !== String(id)));
  };

  // Department CRUD
  const addDepartment = async (d: Omit<Department, 'id'>) => {
    if (!isSupabaseConfigured()) return null;
    try {
      const created = await configService.createDepartment(d);
      if (created) {
        setDepartments((prev) => [...prev, created]);
        return created;
      }
    } catch (err) {
      console.error('Error creating department on Supabase:', err);
      throw err;
    }
    return null;
  };

  const updateDepartment = async (id: string, updates: Partial<Department>) => {
    setDepartments((prev) => prev.map((d) => (String(d.id) === String(id) ? { ...d, ...updates } : d)));
  };

  const deleteDepartment = async (id: string) => {
    if (isSupabaseConfigured()) {
      try {
        await configService.deleteDepartment(id);
      } catch (err) {
        console.error('Error deleting department on Supabase:', err);
      }
    }
    setDepartments((prev) => prev.filter((d) => String(d.id) !== String(id)));
  };

  // Document Type CRUD
  const addDocumentType = async (dt: Omit<DocumentType, 'id'>) => {
    if (!isSupabaseConfigured()) return null;
    
    // Assign smart or random icon if generic description or empty
    const finalIcon = (!dt.icon || dt.icon === 'description') 
      ? getSmartDocumentIcon(dt.name, dt.category) 
      : dt.icon;

    const payload = { ...dt, icon: finalIcon };

    try {
      const created = await configService.createDocumentType(payload);
      if (created) {
        setDocumentTypes((prev) => [...prev, created]);
        return created;
      }
    } catch (err) {
      console.error('Error creating document type on Supabase:', err);
      throw err;
    }
    return null;
  };

  const updateDocumentType = async (id: string, updates: Partial<DocumentType>) => {
    setDocumentTypes((prev) => prev.map((dt) => (String(dt.id) === String(id) ? { ...dt, ...updates } : dt)));
  };

  const deleteDocumentType = async (id: string) => {
    if (isSupabaseConfigured()) {
      try {
        await configService.deleteDocumentType(id);
      } catch (err) {
        console.error('Error deleting document type on Supabase:', err);
      }
    }
    setDocumentTypes((prev) => prev.filter((dt) => String(dt.id) !== String(id)));
  };

  return {
    branches,
    departments,
    documentTypes,
    loading,
    error,
    isLive,
    refresh: fetchConfig,
    addBranch,
    updateBranch,
    deleteBranch,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addDocumentType,
    updateDocumentType,
    deleteDocumentType,
  };
}
