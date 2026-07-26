-- ==========================================
-- VISA EXPIRY REMINDER - PUSH SUBSCRIPTIONS SCHEMA
-- Migration: 004_push_subscriptions_schema.sql
-- ==========================================

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    endpoint TEXT NOT NULL UNIQUE,
    auth TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on push_subscriptions" ON public.push_subscriptions FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on push_subscriptions" ON public.push_subscriptions FOR ALL USING (true);
