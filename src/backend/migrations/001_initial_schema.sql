-- ==========================================
-- VISA EXPIRY REMINDER - INITIAL DATABASE SCHEMA
-- Migration: 001_initial_schema.sql
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BRANCHES TABLE
CREATE TABLE IF NOT EXISTS public.branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subtitle TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    employees_count INT DEFAULT 0,
    color TEXT DEFAULT '#4648d4',
    branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DOCUMENT TYPES TABLE
CREATE TABLE IF NOT EXISTS public.document_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    requirement TEXT NOT NULL DEFAULT 'Required',
    icon TEXT DEFAULT 'description',
    default_notice_days INT[] DEFAULT '{90, 60, 30, 7}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EMPLOYEES TABLE
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_code TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    department_name TEXT,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    location TEXT DEFAULT 'Global Headquarters',
    email TEXT,
    phone TEXT,
    position TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    document_type_id UUID REFERENCES public.document_types(id) ON DELETE SET NULL,
    document_type_name TEXT NOT NULL,
    document_number TEXT,
    issuing_country TEXT DEFAULT 'UAE',
    issue_date DATE,
    expiry_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'valid', -- 'valid', 'expiring_soon', 'expired', 'renewed'
    file_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. REMINDERS TABLE
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    notice_date DATE NOT NULL,
    days_before INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'acknowledged', 'dismissed'
    recipient_email TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_employees_status ON public.employees(status);
CREATE INDEX IF NOT EXISTS idx_documents_employee ON public.documents(employee_id);
CREATE INDEX IF NOT EXISTS idx_documents_expiry ON public.documents(expiry_date);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);
CREATE INDEX IF NOT EXISTS idx_reminders_status ON public.reminders(status);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous & authenticated access (customizable per deployment requirement)
CREATE POLICY "Allow public read access on branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on branches" ON public.branches FOR ALL USING (true);

CREATE POLICY "Allow public read access on departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on departments" ON public.departments FOR ALL USING (true);

CREATE POLICY "Allow public read access on document_types" ON public.document_types FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on document_types" ON public.document_types FOR ALL USING (true);

CREATE POLICY "Allow public read access on employees" ON public.employees FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on employees" ON public.employees FOR ALL USING (true);

CREATE POLICY "Allow public read access on documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on documents" ON public.documents FOR ALL USING (true);

CREATE POLICY "Allow public read access on reminders" ON public.reminders FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on reminders" ON public.reminders FOR ALL USING (true);

-- ==========================================
-- SEED DATA FOR DEMO / INITIAL SETUP
-- ==========================================

-- Insert Default Branches
INSERT INTO public.branches (id, name, subtitle) VALUES
('b1111111-1111-1111-1111-111111111111', 'HQ - Dubai', 'Primary Hub - UAE'),
('b2222222-2222-2222-2222-222222222222', 'Abu Dhabi Office', 'Regional HQ - UAE'),
('b3333333-3333-3333-3333-333333333333', 'Sharjah Branch', 'Operational Center - UAE')
ON CONFLICT (id) DO NOTHING;

-- Insert Default Departments
INSERT INTO public.departments (id, name, employees_count, color, branch_id) VALUES
('d1111111-1111-1111-1111-111111111111', 'Engineering', 42, '#4648d4', 'b1111111-1111-1111-1111-111111111111'),
('d2222222-2222-2222-2222-222222222222', 'Design', 12, '#7f458d', 'b1111111-1111-1111-1111-111111111111'),
('d3333333-3333-3333-3333-333333333333', 'Human Resources', 8, '#4b5a9c', 'b1111111-1111-1111-1111-111111111111'),
('d4444444-4444-4444-4444-444444444444', 'Marketing', 15, '#ba1a1a', 'b2222222-2222-2222-2222-222222222222')
ON CONFLICT (id) DO NOTHING;

