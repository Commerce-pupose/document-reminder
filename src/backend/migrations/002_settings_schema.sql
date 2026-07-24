-- Migration: 002_settings_schema.sql
-- Description: Create system_settings table for global application preferences

CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT 'Acme Corporation',
  notification_email TEXT NOT NULL DEFAULT 'hr-alerts@acme.com',
  reminder_days_before INT[] DEFAULT ARRAY[30, 15, 7],
  email_notifications_enabled BOOLEAN DEFAULT TRUE,
  auto_renewal_reminders BOOLEAN DEFAULT TRUE,
  date_format TEXT DEFAULT 'DD/MM/YY',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access
CREATE POLICY "Allow read access to system_settings" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Allow insert access to system_settings" ON public.system_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update access to system_settings" ON public.system_settings FOR UPDATE USING (true);

-- Seed initial row
INSERT INTO public.system_settings (company_name, notification_email, reminder_days_before, email_notifications_enabled, auto_renewal_reminders, date_format)
SELECT 'Acme Corporation', 'hr-alerts@acme.com', ARRAY[30, 15, 7], TRUE, TRUE, 'DD/MM/YY'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings);
