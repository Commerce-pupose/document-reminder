-- ==========================================
-- VISA EXPIRY REMINDER - NOTIFICATIONS SCHEMA
-- Migration: 003_notifications_schema.sql
-- ==========================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    notification_key TEXT UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    employee_name TEXT,
    expiry_date DATE,
    days_remaining INT,
    status TEXT NOT NULL DEFAULT 'expiring_soon', -- 'expired', 'expiring_soon', 'info'
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast status querying
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON public.notifications(created_at);

-- Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on notifications" ON public.notifications FOR ALL USING (true);
