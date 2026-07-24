import { getSupabaseClient } from '../client';
import { NotificationRecord } from '../../data-types/models';

export const notificationsService = {
  async getNotifications(): Promise<NotificationRecord[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return ((data as any[]) || []).map((item) => ({
      id: item.id,
      notification_key: item.notification_key || item.id,
      title: item.title,
      subtitle: item.subtitle,
      employee_name: item.employee_name,
      expiry_date: item.expiry_date,
      days_remaining: item.days_remaining,
      status: item.status,
      document_id: item.document_id,
      employee_id: item.employee_id,
      is_read: !!item.is_read,
      read_at: item.read_at,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  },

  async markAsRead(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
    return true;
  },

  async markAllAsRead(ids?: string[]): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    let query = supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() });

    if (ids && ids.length > 0) {
      query = query.in('id', ids);
    } else {
      query = query.eq('is_read', false);
    }

    const { error } = await query;
    if (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
    return true;
  },

  async createNotification(notif: Omit<NotificationRecord, 'id' | 'is_read'>): Promise<NotificationRecord | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const payload = {
      notification_key: notif.notification_key,
      title: notif.title,
      subtitle: notif.subtitle,
      employee_name: notif.employee_name,
      expiry_date: notif.expiry_date,
      days_remaining: notif.days_remaining,
      status: notif.status,
      document_id: notif.document_id,
      employee_id: notif.employee_id,
      is_read: false,
    };

    const { data, error } = await supabase
      .from('notifications')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return data as NotificationRecord;
  }
};
