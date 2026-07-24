import { getSupabaseClient } from '../client';
import { DocumentItem } from '../../data-types/models';

export const documentsService = {
  async getDocuments(): Promise<DocumentItem[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('expiry_date', { ascending: true });

    if (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }

    return ((data as any[]) || []).map((doc) => ({
      id: doc.id,
      employee_id: doc.employee_id,
      document_type_id: doc.document_type_id || undefined,
      document_type_name: doc.document_type_name,
      document_number: doc.document_number || undefined,
      issuing_country: doc.issuing_country || undefined,
      issue_date: doc.issue_date || undefined,
      expiry_date: doc.expiry_date,
      status: doc.status as DocumentItem['status'],
      file_url: doc.file_url || undefined,
      notes: doc.notes || undefined,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    }));
  },

  async getExpiringDocuments(daysThreshold: number = 90): Promise<DocumentItem[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysThreshold);
    const targetDateStr = targetDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .lte('expiry_date', targetDateStr)
      .order('expiry_date', { ascending: true });

    if (error) {
      console.error('Error fetching expiring documents:', error);
      throw error;
    }

    return ((data as any[]) || []).map((doc) => ({
      id: doc.id,
      employee_id: doc.employee_id,
      document_type_id: doc.document_type_id || undefined,
      document_type_name: doc.document_type_name,
      document_number: doc.document_number || undefined,
      issuing_country: doc.issuing_country || undefined,
      issue_date: doc.issue_date || undefined,
      expiry_date: doc.expiry_date,
      status: doc.status as DocumentItem['status'],
      file_url: doc.file_url || undefined,
      notes: doc.notes || undefined,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    }));
  },

  async createDocument(document: Omit<DocumentItem, 'id'>): Promise<DocumentItem | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const payload: any = {
      employee_id: document.employee_id,
      document_type_id: document.document_type_id,
      document_type_name: document.document_type_name,
      document_number: document.document_number,
      issuing_country: document.issuing_country,
      issue_date: document.issue_date,
      expiry_date: document.expiry_date,
      status: document.status || 'valid',
      file_url: document.file_url,
      notes: document.notes,
    };

    const { data, error } = await supabase
      .from('documents')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating document:', error);
      throw error;
    }

    const created = data as any;
    return {
      id: created.id,
      employee_id: created.employee_id,
      document_type_id: created.document_type_id || undefined,
      document_type_name: created.document_type_name,
      document_number: created.document_number || undefined,
      issuing_country: created.issuing_country || undefined,
      issue_date: created.issue_date || undefined,
      expiry_date: created.expiry_date,
      status: created.status as DocumentItem['status'],
      file_url: created.file_url || undefined,
      notes: created.notes || undefined,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  },

  async updateDocument(id: string, updates: Partial<DocumentItem>): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const payload: any = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('documents')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Error updating document:', error);
      throw error;
    }

    return true;
  },

  async deleteDocument(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase.from('documents').delete().eq('id', id);

    if (error) {
      console.error('Error deleting document:', error);
      throw error;
    }

    return true;
  },
};
