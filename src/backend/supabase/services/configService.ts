import { getSupabaseClient } from '../client';
import { Branch, Department, DocumentType } from '../../data-types/models';

export const configService = {
  // BRANCHES
  async getBranches(): Promise<Branch[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }

    return ((data as any[]) || []).map((b) => ({
      id: b.id,
      name: b.name,
      subtitle: b.subtitle || '',
      created_at: b.created_at,
      updated_at: b.updated_at,
    }));
  },

  async createBranch(branch: Omit<Branch, 'id'>): Promise<Branch | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const payload: any = { name: branch.name, subtitle: branch.subtitle };
    const { data, error } = await supabase
      .from('branches')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating branch:', error);
      throw error;
    }

    const created = data as any;
    return { id: created.id, name: created.name, subtitle: created.subtitle || '' };
  },

  async deleteBranch(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase.from('branches').delete().eq('id', id);
    if (error) {
      console.error('Error deleting branch:', error);
      throw error;
    }
    return true;
  },

  // DEPARTMENTS
  async getDepartments(): Promise<Department[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }

    return ((data as any[]) || []).map((d) => ({
      id: d.id,
      name: d.name,
      employees_count: d.employees_count || 0,
      color: d.color || '#4648d4',
      branch_id: d.branch_id || undefined,
      created_at: d.created_at,
      updated_at: d.updated_at,
    }));
  },

  async createDepartment(dept: Omit<Department, 'id'>): Promise<Department | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const payload: any = {
      name: dept.name,
      employees_count: dept.employees_count || 0,
      color: dept.color || '#4648d4',
      branch_id: dept.branch_id,
    };

    const { data, error } = await supabase
      .from('departments')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating department:', error);
      throw error;
    }

    const created = data as any;
    return {
      id: created.id,
      name: created.name,
      employees_count: created.employees_count,
      color: created.color,
      branch_id: created.branch_id || undefined,
    };
  },

  async deleteDepartment(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase.from('departments').delete().eq('id', id);
    if (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
    return true;
  },

  // DOCUMENT TYPES
  async getDocumentTypes(): Promise<DocumentType[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('document_types')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching document types:', error);
      throw error;
    }

    return ((data as any[]) || []).map((dt) => ({
      id: dt.id,
      name: dt.name,
      category: dt.category,
      requirement: dt.requirement,
      icon: dt.icon || 'description',
      default_notice_days: dt.default_notice_days || [90, 60, 30, 7],
      created_at: dt.created_at,
      updated_at: dt.updated_at,
    }));
  },

  async createDocumentType(docType: Omit<DocumentType, 'id'>): Promise<DocumentType | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const payload: any = {
      name: docType.name,
      category: docType.category,
      requirement: docType.requirement,
      icon: docType.icon || 'description',
      default_notice_days: docType.default_notice_days || [90, 60, 30, 7],
    };

    const { data, error } = await supabase
      .from('document_types')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating document type:', error);
      throw error;
    }

    const created = data as any;
    return {
      id: created.id,
      name: created.name,
      category: created.category,
      requirement: created.requirement,
      icon: created.icon || 'description',
      default_notice_days: created.default_notice_days || [90, 60, 30, 7],
    };
  },

  async deleteDocumentType(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase.from('document_types').delete().eq('id', id);
    if (error) {
      console.error('Error deleting document type:', error);
      throw error;
    }
    return true;
  },
};
