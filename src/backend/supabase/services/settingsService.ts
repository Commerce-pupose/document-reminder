import { getSupabaseClient, isSupabaseConfigured } from '../client';
import { SystemSettings } from '../../data-types/models';

const DEFAULT_SETTINGS: SystemSettings = {
  company_name: 'Acme Corporation',
  notification_email: 'hr-alerts@acme.com',
  reminder_days_before: [30, 15, 7],
  email_notifications_enabled: true,
  auto_renewal_reminders: true,
  date_format: 'DD/MM/YY',
};

export const settingsService = {
  async getSettings(): Promise<SystemSettings> {
    if (!isSupabaseConfigured()) {
      return DEFAULT_SETTINGS;
    }
    const supabase = getSupabaseClient();
    if (!supabase) return DEFAULT_SETTINGS;

    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      console.warn('No system_settings row found, using defaults:', error?.message);
      return DEFAULT_SETTINGS;
    }

    return (data as unknown) as SystemSettings;
  },

  async updateSettings(updates: Partial<SystemSettings>): Promise<SystemSettings | null> {
    if (!isSupabaseConfigured()) return null;
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const current = await this.getSettings();
    const payload = {
      ...current,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (current.id) {
      const { data, error } = await supabase
        .from('system_settings')
        .update(payload as any)
        .eq('id', current.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating system_settings:', error);
        throw error;
      }
      return (data as unknown) as SystemSettings;
    } else {
      const { data, error } = await supabase
        .from('system_settings')
        .insert([payload as any])
        .select()
        .single();

      if (error) {
        console.error('Error inserting system_settings:', error);
        throw error;
      }
      return (data as unknown) as SystemSettings;
    }
  },
};
