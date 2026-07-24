export interface Branch {
  id: string;
  name: string;
  subtitle: string;
  created_at?: string;
  updated_at?: string;
}

export interface Department {
  id: string;
  name: string;
  employees_count: number;
  color: string;
  branch_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DocumentType {
  id: string;
  name: string;
  category: string;
  requirement: string;
  icon: string;
  default_notice_days?: number[];
  created_at?: string;
  updated_at?: string;
}

export interface DocumentItem {
  id: string;
  employee_id: string;
  document_type_id?: string;
  document_type_name: string;
  document_number?: string;
  issuing_country?: string;
  issue_date?: string;
  expiry_date: string;
  status: 'valid' | 'expiring_soon' | 'expired' | 'renewed';
  file_url?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Employee {
  id: string;
  employee_code: string;
  full_name: string;
  avatar_url?: string;
  department_name?: string;
  department_id?: string;
  location?: string;
  email?: string;
  phone?: string;
  position?: string;
  status: 'active' | 'inactive' | 'on_leave';
  documents?: DocumentItem[];
  created_at?: string;
  updated_at?: string;
}

export interface ExpiryReminder {
  id: string;
  document_id: string;
  employee_id: string;
  notice_date: string;
  days_before: number;
  status: 'pending' | 'sent' | 'acknowledged' | 'dismissed';
  recipient_email?: string;
  sent_at?: string;
  created_at?: string;
  employee_name?: string;
  document_type_name?: string;
}

export interface NotificationRecord {
  id: string;
  notification_key?: string;
  title: string;
  subtitle: string;
  employee_name?: string;
  expiry_date?: string;
  days_remaining?: number;
  status: 'expired' | 'expiring_soon' | 'info';
  document_id?: string;
  employee_id?: string;
  is_read: boolean;
  read_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SystemSettings {
  id?: string;
  company_name: string;
  notification_email: string;
  reminder_days_before: number[];
  email_notifications_enabled: boolean;
  auto_renewal_reminders: boolean;
  date_format: string;
  updated_at?: string;
}

export interface DashboardStats {
  totalEmployees: number;
  expiringDocumentsCount: number;
  expiredDocumentsCount: number;
  validDocumentsCount: number;
  activeRemindersCount: number;
}
