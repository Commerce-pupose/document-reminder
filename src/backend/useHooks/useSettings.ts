"use client";

import { useState, useEffect, useCallback } from 'react';
import { SystemSettings } from '../data-types/models';
import { settingsService } from '../supabase/services/settingsService';
import { isSupabaseConfigured } from '../supabase/client';

const DEFAULT_SETTINGS: SystemSettings = {
  company_name: 'Acme Corporation',
  notification_email: 'hr-alerts@acme.com',
  reminder_days_before: [30, 15, 7],
  email_notifications_enabled: true,
  auto_renewal_reminders: true,
  date_format: 'DD/MM/YY',
};

export function useSettings() {
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const data = await settingsService.getSettings();
        setSettings(data || DEFAULT_SETTINGS);
        setIsLive(true);
      } else {
        setIsLive(false);
        setSettings(DEFAULT_SETTINGS);
      }
    } catch (err: any) {
      console.error('Supabase settings fetch error:', err);
      setError(err?.message || 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (updates: Partial<SystemSettings>) => {
    if (isSupabaseConfigured()) {
      try {
        const updated = await settingsService.updateSettings(updates);
        if (updated) {
          setSettings(updated);
          return updated;
        }
      } catch (err) {
        console.error('Failed to update settings on Supabase:', err);
        throw err;
      }
    }
    setSettings((prev) => ({ ...prev, ...updates }));
    return null;
  };

  return {
    settings,
    loading,
    error,
    isLive,
    refresh: fetchSettings,
    updateSettings,
  };
}
