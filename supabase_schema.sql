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

-- Seed Initial B.Ed Faculty Roster (15 Members)
INSERT INTO public.faculty (sl_no, department, name, dob, age, category, designation, type, subject, master_subject, bed_qual, med_qual, phd_qual, net_set, experience, recognized_exp, initial_appt, joining_date, bio, avatar)
VALUES
(1, 'bed', 'Dr. Krishna Kumar', '05/05/1977', '48Y 9M', 'GEN', 'Principal', 'Regular', 'Education', 'Zoology (64.33%)', 'Yes (63.77%)', 'Yes (56.46%)', 'Yes (Zoology)', 'No', '13.5 Years', '13.5 Years', '28/06/2019', '01/07/2019', 'Principal with 13.5 Years teaching experience in Education and Zoology.', 'fa-graduation-cap'),
(2, 'bed', 'Aparna Sarkar', '26/12/1981', '44Y 1M', 'GEN', 'Assistant Professor', 'Regular', 'Foundation', 'No', 'Yes (65.00%)', 'No', 'No', 'No', '9.5 Years', '9.5 Years', '23/04/2016', '27/04/2016', 'Assistant Professor in Foundation education with 9.5 Years experience.', 'fa-book-open-reader'),
(3, 'bed', 'Samaresh Ojha', '24/11/1980', '45Y 2M', 'OBC-B', 'Assistant Professor', 'Regular', 'English', 'English (52.20%)', 'Yes (60.81%)', 'Yes (58.75%)', 'No', 'No', '9.5 Years', '9.5 Years', '23/04/2016', '27/04/2016', 'Assistant Professor in English with 9.5 Years teaching experience.', 'fa-chalkboard-user'),
(4, 'bed', 'Narayan Chandra Sasmal', '07/01/1974', '52Y 1M', 'GEN', 'Assistant Professor', 'Regular', 'History', 'History (55.25%)', 'Yes (56.50%)', 'Yes (57.66%)', 'No', 'No', '9.5 Years', '9.5 Years', '23/04/2016', '27/04/2016', 'Assistant Professor in History with 9.5 Years teaching experience.', 'fa-landmark'),
(5, 'bed', 'Arun Jana', '25/06/1980', '45Y 7M', 'GEN', 'Assistant Professor', 'Regular', 'Fine Arts', 'No', 'B.F.A. (65.52%)', 'M.F.A. (68.40%)', 'No', 'No', '9.5 Years', '9.5 Years', '23/04/2016', '27/04/2016', 'Assistant Professor in Fine Arts with 9.5 Years teaching experience.', 'fa-palette'),
(6, 'bed', 'Satinath Maity', '11/06/1990', '35Y 7M', 'GEN', 'Assistant Professor', 'Regular', 'Education', 'Education (67.50%)', 'Yes (80.50%)', 'Yes (76.75%)', 'No', 'Yes (NET)', '02 Years', '02 Years', '27/09/2023', '05/10/2023', 'UGC NET qualified Assistant Professor in Education.', 'fa-book-open-reader'),
(7, 'bed', 'Harcharan Singh', '08/01/1987', '39Y 1M', 'GEN', 'Assistant Professor', 'Regular', 'Computer Application', 'Information Technology (65.70%)', 'Yes (73.08%)', 'Yes (67.67%)', 'No', 'Yes (NET)', '02 Years', '02 Years', '27/09/2023', '05/10/2023', 'UGC NET qualified Assistant Professor in Computer Application.', 'fa-laptop-code'),
(8, 'bed', 'Sujoy Chakraborty', '10/11/1988', '37Y 2M', 'GEN', 'Assistant Professor', 'Regular', 'Life Science', 'Botany (61.90%)', 'Yes (69.50%)', 'Yes (77.10%)', 'No', 'Yes (NET)', '02 Years', '02 Years', '27/09/2023', '05/10/2023', 'UGC NET qualified Assistant Professor in Life Science.', 'fa-dna'),
(9, 'bed', 'Debashis Halder', '07/04/1995', '30Y 10M', 'SC', 'Assistant Professor', 'Regular', 'Foundation', 'No', 'Yes (72.45%)', 'No', 'No', 'Yes (SET)', '02 Years', '02 Years', '03/10/2023', '05/10/2023', 'SET qualified Assistant Professor in Foundation.', 'fa-graduation-cap'),
(10, 'bed', 'Poulami Mondal', '23/08/1991', '34Y 5M', 'SC', 'Assistant Professor', 'Regular', 'Geography', 'Geography (58.90%)', 'Yes (58.20%)', 'Yes (74.00%)', 'No', 'Yes (NET)', '02 Years', '02 Years', '03/10/2023', '05/10/2023', 'UGC NET qualified Assistant Professor in Geography.', 'fa-earth-asia'),
(11, 'bed', 'Chandan Pal', '20/03/1989', '36Y 10M', 'GEN', 'Assistant Professor', 'Regular', 'Bengali', 'Bengali (57.37%)', 'Yes (70.5%)', 'Yes (71.60%)', 'No', 'Yes (SET)', '02 Years', '02 Years', '13/10/2023', '13/10/2023', 'SET qualified Assistant Professor in Bengali.', 'fa-book-open-reader'),
(12, 'bed', 'Sk Soriotulla', '06/06/1995', '30Y 8M', 'OBC-A', 'Assistant Professor', 'Regular', 'Health & Physical Education', 'No', 'B.P.Ed. (73.37%)', 'M.P.Ed. (67.59%)', 'No', 'Yes (SET)', '02 Years', '02 Years', '27/09/2023', '05/10/2023', 'SET qualified Assistant Professor in Health & Physical Education.', 'fa-person-running'),
(13, 'bed', 'Indranil Sarkar', '15/02/1989', '36Y 11M', 'GEN', 'Librarian', 'Regular', 'Librarian', 'No', 'BLIS (68.12%)', 'MLIS (63.5%)', 'No', 'Yes (NET)', '02 Years', '02 Years', '03/10/2023', '05/10/2023', 'UGC NET qualified Librarian.', 'fa-book-bookmark'),
(14, 'bed', 'Jayita Sahu', '19/07/1988', '37Y 6M', 'GEN', 'Assistant Professor', 'Regular', 'Performing Art', 'Rabindra Sangeet (62.62%)', 'Yes (91.55%)', 'Yes (73.95%)', 'No', 'Yes (NET)', '1.5 Years', '1.5 Years', '28/03/2024', '01/04/2024', 'UGC NET qualified Assistant Professor in Performing Art.', 'fa-music'),
(15, 'bed', 'Harekrishna Som', '03/08/1974', '51Y 6M', 'GEN', 'Assistant Professor', 'Regular', 'Mathematics', 'Mathematics (N/A %)', 'Yes (64.3%)', 'Yes (69.13%)', 'No', 'Yes (NET)', '1.5 Years', '1.5 Years', '28/03/2024', '01/04/2024', 'UGC NET qualified Assistant Professor in Mathematics.', 'fa-square-root-variable')
-- Seed Initial D.El.Ed Faculty Roster (10 Members)
INSERT INTO public.faculty (sl_no, department, name, dob, age, category, designation, type, subject, master_subject, bed_qual, med_qual, phd_qual, net_set, experience, recognized_exp, initial_appt, joining_date, bio, avatar)
VALUES
(1, 'deled', 'Subhas Chandra Maity', '01/10/1980', '43 Years', 'General', 'Principal (Regular)', 'Regular', 'Environmental Science', 'Yes (64.25%)', 'Yes (63.72%)', 'Yes (70.50%)', 'No', 'No', '10 Years', 'Swami Vibekananda College of Education', '22/07/2024', '23/07/2024', 'Principal (Regular) with 10 Years teaching experience at Swami Vibekananda College of Education.', 'fa-graduation-cap'),
(2, 'deled', 'Partha Sarathi Das', '24/12/1981', '42 Years', 'OBC-B', 'Lecturer (Regular)', 'Regular', 'Bengali', 'Bengali (69.00%)', 'Yes (68.10%)', 'Yes (68.42%)', 'No', 'No', 'No', 'No', '22/07/2024', '23/07/2024', 'Lecturer in Bengali language pedagogy and communicative classroom practices.', 'fa-book-open-reader'),
(3, 'deled', 'Samaresh Ojha', '24/11/1980', '43 Years', 'OBC-B', 'Lecturer (Regular)', 'Regular', 'English', 'Yes (52.20%)', 'Yes (60.80%)', 'Yes (58.70%)', 'No', 'No', '8 Years', 'Swami Vibekananda College of Education', '22/07/2024', '23/07/2024', 'Lecturer in English with 8 Years teaching experience at Swami Vibekananda College of Education.', 'fa-chalkboard-user'),
(4, 'deled', 'Narayan Chandra Sasmal', '07/01/1974', '50 Years', 'General', 'Lecturer (Regular)', 'Regular', 'History / Environmental Science', 'Yes (55.25%)', 'Yes (56.50%)', 'Yes (57.66%)', 'No', 'No', '8 Years', 'Swami Vibekananda College of Education', '22/07/2024', '23/07/2024', 'Lecturer in History / Environmental Science with 8 Years teaching experience.', 'fa-landmark'),
(5, 'deled', 'Aparna Sarkar (Das)', '26/12/1981', '42 Years', 'General', 'Lecturer (Regular)', 'Regular', 'Foundation', 'No', 'Yes (65.00%)', 'No', 'No', 'No', 'No', 'No', '22/07/2024', '23/07/2024', 'Lecturer in Foundation education.', 'fa-brain'),
(6, 'deled', 'Birendra Nath Maity', '14/06/1984', '39 Years', 'General', 'Lecturer (Regular)', 'Regular', 'Science', 'Yes (57.90%)', 'Yes (66.50%)', 'Yes (68.50%)', 'No', 'No', 'No', 'No', '22/07/2024', '23/07/2024', 'Lecturer in Science pedagogy.', 'fa-dna'),
(7, 'deled', 'Harekrishna Som', '03/08/1974', '49 Years', 'General', 'Lecturer (Regular)', 'Regular', 'Mathematics', 'Yes (58.30%)', 'Yes (64.30%)', 'Yes (69.13%)', 'No', 'No', 'No', 'No', '22/07/2024', '23/07/2024', 'Lecturer in Mathematics.', 'fa-square-root-variable'),
(8, 'deled', 'Malay Kumar Shee', '20/08/1989', '34 Years', 'OBC-B', 'Librarian', 'Regular', 'No', 'No', 'B.LIS (61.80%)', 'No', 'No', 'No', 'No', 'No', '22/07/2024', '23/07/2024', 'College Librarian managing library resources.', 'fa-book-bookmark'),
(9, 'deled', 'Tapas Kumar Santra', '11/01/1974', '50 Years', 'General', 'Lecturer (Regular)', 'Regular', 'Health & Physical Education', 'No', 'B.P.Ed (61.83%)', 'M.P.Ed (74.06%)', 'No', 'No', '6 Years', '6 Years', '07/12/2017', '08/12/2017', 'Lecturer in Health & Physical Education with 6 Years experience.', 'fa-person-running'),
(10, 'deled', 'Jayita Sahu', '19/07/1988', '35 Years', 'General', 'Lecturer (Regular)', 'Regular', 'Performing Arts', 'Yes (62.62%)', 'No', 'No', 'No', 'No', '10 Years', '10 Years', '08/09/2013', '09/09/2013', 'Lecturer in Performing Arts with 10 Years teaching experience.', 'fa-music')
ON CONFLICT DO NOTHING;




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

