"use client";

import { useState, useEffect, useCallback } from 'react';
import { DocumentItem } from '../data-types/models';
import { documentsService } from '../supabase/services/documentsService';
import { isSupabaseConfigured } from '../supabase/client';

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const data = await documentsService.getDocuments();
        setDocuments(data || []);
        setIsLive(true);
      } else {
        setIsLive(false);
        setDocuments([]);
      }
    } catch (err: any) {
      console.error('Supabase documents fetch error:', err);
      setError(err?.message || 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const addDocument = async (newDoc: Omit<DocumentItem, 'id'>) => {
    if (!isSupabaseConfigured()) {
      const mockDoc: DocumentItem = {
        id: `doc-local-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...newDoc,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setDocuments((prev) => [mockDoc, ...prev]);
      return mockDoc;
    }
    try {
      const created = await documentsService.createDocument(newDoc);
      if (created) {
        setDocuments((prev) => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('Failed to create document on Supabase, fallback to local:', err);
      const fallbackDoc: DocumentItem = {
        id: `doc-local-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...newDoc,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setDocuments((prev) => [fallbackDoc, ...prev]);
      return fallbackDoc;
    }
    return null;
  };

  const updateDocument = async (id: string, updates: Partial<DocumentItem>) => {
    if (isSupabaseConfigured()) {
      try {
        await documentsService.updateDocument(id, updates);
      } catch (err) {
        console.error('Failed to update document on Supabase:', err);
      }
    }
    setDocuments((prev) => prev.map((d) => (String(d.id) === String(id) ? { ...d, ...updates } : d)));
  };

  const deleteDocument = async (id: string) => {
    if (isSupabaseConfigured()) {
      try {
        await documentsService.deleteDocument(id);
      } catch (err) {
        console.error('Failed to delete document on Supabase:', err);
      }
    }
    setDocuments((prev) => prev.filter((d) => String(d.id) !== String(id)));
  };

  return {
    documents,
    loading,
    error,
    isLive,
    refresh: fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
  };
}
