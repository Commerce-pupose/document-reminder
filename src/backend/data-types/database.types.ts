export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      branches: {
        Row: {
          id: string
          name: string
          subtitle: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subtitle?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subtitle?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      departments: {
        Row: {
          id: string
          name: string
          employees_count: number
          color: string
          branch_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          employees_count?: number
          color?: string
          branch_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          employees_count?: number
          color?: string
          branch_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      document_types: {
        Row: {
          id: string
          name: string
          category: string
          requirement: string
          icon: string | null
          default_notice_days: number[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string
          requirement?: string
          icon?: string | null
          default_notice_days?: number[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          requirement?: string
          icon?: string | null
          default_notice_days?: number[] | null
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          employee_code: string
          full_name: string
          avatar_url: string | null
          department_name: string | null
          department_id: string | null
          location: string | null
          email: string | null
          phone: string | null
          position: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_code: string
          full_name: string
          avatar_url?: string | null
          department_name?: string | null
          department_id?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          position?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_code?: string
          full_name?: string
          avatar_url?: string | null
          department_name?: string | null
          department_id?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          position?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          employee_id: string
          document_type_id: string | null
          document_type_name: string
          document_number: string | null
          issuing_country: string | null
          issue_date: string | null
          expiry_date: string
          status: string
          file_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          document_type_id?: string | null
          document_type_name: string
          document_number?: string | null
          issuing_country?: string | null
          issue_date?: string | null
          expiry_date: string
          status?: string
          file_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          document_type_id?: string | null
          document_type_name?: string
          document_number?: string | null
          issuing_country?: string | null
          issue_date?: string | null
          expiry_date?: string
          status?: string
          file_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          document_id: string
          employee_id: string
          notice_date: string
          days_before: number
          status: string
          recipient_email: string | null
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          employee_id: string
          notice_date: string
          days_before: number
          status?: string
          recipient_email?: string | null
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          employee_id?: string
          notice_date?: string
          days_before?: number
          status?: string
          recipient_email?: string | null
          sent_at?: string | null
          created_at?: string
        }
      }
    }
  }
}
