-- ==============================================================================
-- Swami Vibekananda College of Education (SVCE)
-- Complete Supabase PostgreSQL Database Schema & Initial Data Setup
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/jyemhebaheytkqomsfcy/sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. TABLE: admin_users
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT DEFAULT 'SVCE Administrator',
    role TEXT DEFAULT 'institutional_admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read admin_users" ON public.admin_users;
CREATE POLICY "Allow public read admin_users" ON public.admin_users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert admin_users" ON public.admin_users;
CREATE POLICY "Allow public insert admin_users" ON public.admin_users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update admin_users" ON public.admin_users;
CREATE POLICY "Allow public update admin_users" ON public.admin_users FOR UPDATE USING (true);

INSERT INTO public.admin_users (email, password, name, role)
VALUES ('admin@svcoledu.net.in', 'svce@2013', 'SVCE Administrator', 'institutional_admin')
ON CONFLICT (email) DO UPDATE 
SET password = EXCLUDED.password, role = EXCLUDED.role;


-- ------------------------------------------------------------------------------
-- 2. TABLE: students
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sr_no INTEGER,
    app_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    type TEXT DEFAULT 'Regular (Central Merit)',
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read students" ON public.students;
CREATE POLICY "Allow public read students" ON public.students FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert students" ON public.students;
CREATE POLICY "Allow public insert students" ON public.students FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update students" ON public.students;
CREATE POLICY "Allow public update students" ON public.students FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete students" ON public.students;
CREATE POLICY "Allow public delete students" ON public.students FOR DELETE USING (true);


-- ------------------------------------------------------------------------------
-- 3. TABLE: faculty
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sl_no INTEGER,
    department TEXT NOT NULL, -- 'bed' or 'deled'
    name TEXT NOT NULL,
    dob TEXT,
    age TEXT,
    category TEXT,
    designation TEXT NOT NULL,
    type TEXT DEFAULT 'Regular',
    subject TEXT NOT NULL,
    master_subject TEXT,
    bed_qual TEXT,
    med_qual TEXT,
    phd_qual TEXT,
    net_set TEXT,
    experience TEXT,
    recognized_exp TEXT,
    initial_appt TEXT,
    joining_date TEXT,
    bio TEXT,
    avatar TEXT DEFAULT 'fa-chalkboard-user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read faculty" ON public.faculty;
CREATE POLICY "Allow public read faculty" ON public.faculty FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert faculty" ON public.faculty;
CREATE POLICY "Allow public insert faculty" ON public.faculty FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update faculty" ON public.faculty;
CREATE POLICY "Allow public update faculty" ON public.faculty FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete faculty" ON public.faculty;
CREATE POLICY "Allow public delete faculty" ON public.faculty FOR DELETE USING (true);


-- ------------------------------------------------------------------------------
-- 4. TABLE: notices
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
    id SERIAL PRIMARY KEY,
    badge TEXT NOT NULL,
    subject TEXT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    link TEXT,
    file_url TEXT,
    file_name TEXT,
    file_type TEXT,
    file_size TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migration support for existing notices table:
ALTER TABLE public.notices ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.notices ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE public.notices ADD COLUMN IF NOT EXISTS file_name TEXT;
ALTER TABLE public.notices ADD COLUMN IF NOT EXISTS file_type TEXT;
ALTER TABLE public.notices ADD COLUMN IF NOT EXISTS file_size TEXT;

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read notices" ON public.notices;
CREATE POLICY "Allow public read notices" ON public.notices FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert notices" ON public.notices;
CREATE POLICY "Allow public insert notices" ON public.notices FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update notices" ON public.notices;
CREATE POLICY "Allow public update notices" ON public.notices FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete notices" ON public.notices;
CREATE POLICY "Allow public delete notices" ON public.notices FOR DELETE USING (true);



-- ------------------------------------------------------------------------------
-- 5. TABLE: announcements (Top Marquee Ticker)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read announcements" ON public.announcements;
CREATE POLICY "Allow public read announcements" ON public.announcements FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert announcements" ON public.announcements;
CREATE POLICY "Allow public insert announcements" ON public.announcements FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update announcements" ON public.announcements;
CREATE POLICY "Allow public update announcements" ON public.announcements FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete announcements" ON public.announcements;
CREATE POLICY "Allow public delete announcements" ON public.announcements FOR DELETE USING (true);


-- ------------------------------------------------------------------------------
-- 6. TABLE: mandatory_disclosure (Statutory Official Documents Vault)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mandatory_disclosure (
    id TEXT PRIMARY KEY,
    sr_no INTEGER,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    category_badge_class TEXT,
    authority TEXT,
    order_no TEXT,
    date TEXT,
    file_size TEXT,
    pdf_path TEXT NOT NULL,
    pages INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.mandatory_disclosure ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public read mandatory_disclosure" ON public.mandatory_disclosure FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public insert mandatory_disclosure" ON public.mandatory_disclosure FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public update mandatory_disclosure" ON public.mandatory_disclosure FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public delete mandatory_disclosure" ON public.mandatory_disclosure FOR DELETE USING (true);


-- ------------------------------------------------------------------------------
-- 7. Initial Seed Notices, Announcements & Mandatory Disclosure
-- ------------------------------------------------------------------------------
INSERT INTO public.notices (badge, title, date) VALUES
('Academic 2026–28', 'Commencement of Micro-Teaching, Orientation & Foundation Classes for Session 2026–28', '28 Sep 2026'),
('Admission 2026–28', 'B.Ed & D.El.Ed Central Counseling & Document Verification Portal Active', '15 Oct 2026'),
('Compliance 2026', 'Annual Statutory NCTE & WBBPE Regulatory Disclosures & Bio-metric Roster Published', '02 Nov 2026'),
('Student Notice', 'Submission of Practicum & School Internship Portfolios for 2nd Year Trainees', '10 Nov 2026')
ON CONFLICT DO NOTHING;

INSERT INTO public.announcements (text, is_active) VALUES
('Commencement of Micro-Teaching, Orientation & Foundation Classes for Session 2026–28', true),
('B.Ed & D.El.Ed Central Counseling & Document Verification Portal Active', true),
('Annual Statutory NCTE & WBBPE Regulatory Disclosures & Bio-metric Roster Published', true),
('Submission of Practicum & School Internship Portfolios for 2nd Year Trainees', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.mandatory_disclosure (id, sr_no, title, subtitle, category, category_badge_class, authority, order_no, date, file_size, pdf_path, pages) VALUES
('bed-ncte', 1, 'B.Ed NCTE Recognition Order Copy', 'ERCAPP3967 • Order No: F.No.234.2.1/APP3967/52099', 'NCTE RECOGNITION', 'bg-purple-100 text-purple-700 border border-purple-200', 'Eastern Regional Committee, NCTE Bhubaneswar', 'F.No.234.2.1/APP3967/52099', '04/04/2017', '810 KB', 'assets/pdf/B.ED . RECOGNISED COPY.pdf', 4),
('deled-ncte', 2, 'D.El.Ed NCTE Recognition Order Copy', 'ERCAPP77 • Order No: ERC/7–162.6.8/21191', 'NCTE RECOGNITION', 'bg-purple-100 text-purple-700 border border-purple-200', 'Eastern Regional Committee, NCTE Bhubaneswar', 'ERC/7-162.6.8/21191', '15/10/2013', '116 KB', 'assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf', 4),
('bed-affiliation', 3, 'B.Ed Affiliation Order (2025 – 2026)', 'Baba Saheb Ambedkar Education University (BSAEU)', 'UNIVERSITY AFFILIATION', 'bg-emerald-100 text-emerald-700 border border-emerald-200', 'Baba Saheb Ambedkar Education University (BSAEU)', 'BSAEU/AFFIL/BED/2025-26', '2025', '848 KB', 'assets/pdf/B.ED. AFFILIATION COPY 2025 - 2026.pdf', 2),
('deled-affiliation', 4, 'D.El.Ed Affiliation Order (WBBPE)', 'West Bengal Board of Primary Education • Memo: 83/WBBPE/2024', 'STATE BOARD AFFILIATION', 'bg-emerald-100 text-emerald-700 border border-emerald-200', 'West Bengal Board of Primary Education (WBBPE)', '83/WBBPE/2024', '2024', '181 KB', 'assets/pdf/D.EL.ED AFFILIATION COPY.pdf', 1),
('bed-noc', 5, 'No Objection Certificate (NOC) for B.Ed', 'Vidyasagar University, Midnapore • Signed 04/06/2015', 'UNIVERSITY NOC', 'bg-slate-100 text-slate-700 border border-slate-200', 'Vidyasagar University, Midnapore', 'VU/R/Affi./105/2015', '04/06/2015', '67 KB', 'assets/pdf/NOC  FOR B.ED..pdf', 1),
('fire-certificate', 6, 'Government Fire Safety Certificate', 'West Bengal Fire & Emergency Services • FSR/0125186231500164', 'STATUTORY SAFETY', 'bg-rose-100 text-rose-700 border border-rose-200', 'West Bengal Fire & Emergency Services', 'FSR/0125186231500164', '2024', '463 KB', 'assets/pdf/FIRE CERTIFICATE.pdf', 2),
('bed-staff-list', 7, 'Certified B.Ed Faculty & Staff List', '15 Appointed Staff Members • Signed by BSAEU Assistant Registrar', 'FACULTY ROSTER', 'bg-sky-100 text-sky-700 border border-sky-200', 'Swami Vibekananda College of Education', 'SVCE/STAFF/BED/2026', '2024', '3.0 MB', 'assets/pdf/B. Ed teacher list.pdf', 3),
('deled-staff-list', 8, 'Certified D.El.Ed Faculty & Staff List', 'Appointed Staff Members • Signed by WBBPE Secretary & DIET Nominee', 'FACULTY ROSTER', 'bg-sky-100 text-sky-700 border border-sky-200', 'Swami Vibekananda College of Education', 'SVCE/STAFF/DELED/2026', '2024', '2.4 MB', 'assets/pdf/D.EL.ED Teacher list.pdf', 2),
('bed-student-list', 9, 'Admitted B.Ed Student List (50 Trainees)', 'Session 2026–2028 Admitted Roster • University Directives', 'STUDENT ADMISSIONS', 'bg-amber-100 text-amber-800 border border-amber-200', 'Swami Vibekananda College of Education', 'SVCE/BED/ADM/2025-27', '2025', '170 KB', 'assets/pdf/STUDENT LIST  B.ED 2025-2027.pdf', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  category = EXCLUDED.category,
  category_badge_class = EXCLUDED.category_badge_class,
  authority = EXCLUDED.authority,
  order_no = EXCLUDED.order_no,
  date = EXCLUDED.date,
  file_size = EXCLUDED.file_size,
  pdf_path = EXCLUDED.pdf_path,
  pages = EXCLUDED.pages;

