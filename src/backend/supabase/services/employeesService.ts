import { getSupabaseClient } from '../client';
import { Employee } from '../../data-types/models';

export const employeesService = {
  async getEmployees(): Promise<Employee[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data: employees, error } = await supabase
      .from('employees')
      .select(`
        *,
        documents (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }

    return ((employees as any[]) || []).map((emp) => ({
      id: emp.id,
      employee_code: emp.employee_code,
      full_name: emp.full_name,
      avatar_url: emp.avatar_url || undefined,
      department_name: emp.department_name || undefined,
      department_id: emp.department_id || undefined,
      location: emp.location || undefined,
      email: emp.email || undefined,
      phone: emp.phone || undefined,
      position: emp.position || undefined,
      status: (emp.status as Employee['status']) || 'active',
      documents: (emp.documents || []).map((doc: any) => ({
        id: doc.id,
        employee_id: doc.employee_id,
        document_type_id: doc.document_type_id,
        document_type_name: doc.document_type_name,
        document_number: doc.document_number,
        issuing_country: doc.issuing_country,
        issue_date: doc.issue_date,
        expiry_date: doc.expiry_date,
        status: doc.status,
        file_url: doc.file_url,
        notes: doc.notes,
      })),
      created_at: emp.created_at,
      updated_at: emp.updated_at,
    }));
  },

  async getEmployeeById(id: string): Promise<Employee | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('employees')
      .select(`*, documents (*)`)
      .eq('id', id)
      .single();

    if (error || !data) return null;

    const emp = data as any;
    return {
      id: emp.id,
      employee_code: emp.employee_code,
      full_name: emp.full_name,
      avatar_url: emp.avatar_url || undefined,
      department_name: emp.department_name || undefined,
      department_id: emp.department_id || undefined,
      location: emp.location || undefined,
      email: emp.email || undefined,
      phone: emp.phone || undefined,
      position: emp.position || undefined,
      status: (emp.status as Employee['status']) || 'active',
      documents: emp.documents || [],
      created_at: emp.created_at,
      updated_at: emp.updated_at,
    };
  },

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const rawPayload: Record<string, any> = {
      employee_code: employee.employee_code,
      full_name: employee.full_name,
      avatar_url: employee.avatar_url,
      department_name: employee.department_name || null,
      department_id: employee.department_id || null,
      location: employee.location,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      status: employee.status || 'active',
    };

    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, v]) => v !== undefined)
    );

    const { data, error } = await supabase
      .from('employees')
      .insert([payload])
      .select()
      .single();

    if (error) {
      const errMsg = error.message || error.details || error.hint || JSON.stringify(error);
      console.error('Error creating employee:', errMsg);
      throw new Error(errMsg);
    }

    const created = data as any;
    return {
      id: created.id,
      employee_code: created.employee_code,
      full_name: created.full_name,
      avatar_url: created.avatar_url || undefined,
      department_name: created.department_name || undefined,
      department_id: created.department_id || undefined,
      location: created.location || undefined,
      email: created.email || undefined,
      phone: created.phone || undefined,
      position: created.position || undefined,
      status: (created.status as Employee['status']) || 'active',
      documents: [],
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  },

  async updateEmployee(id: string, updates: Partial<Employee>): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    const payload: any = {
      ...cleanUpdates,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('employees')
      .update(payload)
      .eq('id', id);

    if (error) {
      const errMsg = error.message || error.details || error.hint || JSON.stringify(error);
      console.error('Error updating employee:', errMsg);
      throw new Error(errMsg);
    }

    return true;
  },

  async deleteEmployee(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase.from('employees').delete().eq('id', id);

    if (error) {
      const errMsg = error.message || error.details || error.hint || JSON.stringify(error);
      console.error('Error deleting employee:', errMsg);
      throw new Error(errMsg);
    }

    return true;
  },
};
