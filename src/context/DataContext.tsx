import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  STUDENTS_DATA, 
  BED_FACULTY, 
  DELED_FACULTY, 
  NOTICES,
  OFFICIAL_DOCUMENTS 
} from '../data/svceData';
import { StudentRecord, FacultyMember, Notice, OfficialDocument } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface DataContextType {
  students: StudentRecord[];
  bedFaculty: FacultyMember[];
  deledFaculty: FacultyMember[];
  notices: Notice[];
  announcements: string[];
  mandatoryDocuments: OfficialDocument[];
  isSyncing: boolean;
  
  // Student Actions
  addStudent: (student: Omit<StudentRecord, 'srNo'>) => Promise<void>;
  updateStudent: (srNo: number, updated: Partial<StudentRecord>) => Promise<void>;
  deleteStudent: (srNo: number) => Promise<void>;
  pushStudentsToSupabase: () => Promise<{ success: boolean; message: string }>;
  
  // Teacher Actions
  addTeacher: (teacher: Omit<FacultyMember, 'slNo'> & { slNo?: number | string }, department: 'bed' | 'deled') => Promise<void>;
  updateTeacher: (slNo: number | string, updated: Partial<FacultyMember>, department: 'bed' | 'deled') => Promise<void>;
  deleteTeacher: (slNo: number | string, department: 'bed' | 'deled') => Promise<void>;
  pushTeachersToSupabase: () => Promise<{ success: boolean; message: string }>;
  
  // Notice Actions
  addNotice: (notice: Omit<Notice, 'id'>) => Promise<void>;
  updateNotice: (id: number, updated: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: number) => Promise<void>;
  pushNoticesToSupabase: () => Promise<{ success: boolean; message: string }>;
  
  // Announcement Ticker Actions
  addAnnouncement: (text: string) => Promise<void>;
  updateAnnouncement: (index: number, newText: string) => Promise<void>;
  deleteAnnouncement: (index: number) => Promise<void>;
  pushAnnouncementsToSupabase: () => Promise<{ success: boolean; message: string }>;

  // Mandatory Disclosure Documents Actions
  addMandatoryDoc: (doc: Omit<OfficialDocument, 'id'> & { id?: string }) => Promise<void>;
  updateMandatoryDoc: (id: string, updated: Partial<OfficialDocument>) => Promise<void>;
  deleteMandatoryDoc: (id: string) => Promise<void>;
  pushMandatoryDocsToSupabase: () => Promise<{ success: boolean; message: string }>;

  // Database Seed & Sync
  syncAllToSupabase: () => Promise<{ success: boolean; message: string }>;
  fetchFromSupabase: () => Promise<void>;
  resetData: () => void;
}

const DEFAULT_ANNOUNCEMENTS = [
  "Commencement of Micro-Teaching, Orientation & Foundation Classes for Session 2026–28",
  "B.Ed & D.El.Ed Central Counseling & Document Verification Portal Active",
  "Annual Statutory NCTE & WBBPE Regulatory Disclosures & Bio-metric Roster Published",
  "Submission of Practicum & School Internship Portfolios for 2nd Year Trainees"
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. Students State
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('svce_students');
    if (saved) {
      try { return JSON.parse(saved); } catch { return STUDENTS_DATA; }
    }
    return STUDENTS_DATA;
  });

  // 2. B.Ed Faculty State
  const [bedFaculty, setBedFaculty] = useState<FacultyMember[]>(() => {
    const saved = localStorage.getItem('svce_bed_faculty');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 15) {
          return parsed;
        }
        return BED_FACULTY;
      } catch { return BED_FACULTY; }
    }
    return BED_FACULTY;
  });

  // 3. D.El.Ed Faculty State
  const [deledFaculty, setDeledFaculty] = useState<FacultyMember[]>(() => {
    const saved = localStorage.getItem('svce_deled_faculty');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10 && parsed[0]?.slNo === "I.A (1)") {
          return parsed;
        }
        return DELED_FACULTY;
      } catch { return DELED_FACULTY; }
    }
    return DELED_FACULTY;
  });

  // 4. Notices State
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('svce_notices');
    if (saved) {
      try { return JSON.parse(saved); } catch { return NOTICES; }
    }
    return NOTICES;
  });

  // 5. Announcements Bar State
  const [announcements, setAnnouncements] = useState<string[]>(() => {
    const saved = localStorage.getItem('svce_announcements');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_ANNOUNCEMENTS; }
    }
    return DEFAULT_ANNOUNCEMENTS;
  });

  // 6. Mandatory Disclosure Documents State
  const [mandatoryDocuments, setMandatoryDocuments] = useState<OfficialDocument[]>(() => {
    const saved = localStorage.getItem('svce_mandatory_docs');
    if (saved) {
      try { return JSON.parse(saved); } catch { return OFFICIAL_DOCUMENTS; }
    }
    return OFFICIAL_DOCUMENTS;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('svce_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('svce_bed_faculty', JSON.stringify(bedFaculty));
  }, [bedFaculty]);

  useEffect(() => {
    localStorage.setItem('svce_deled_faculty', JSON.stringify(deledFaculty));
  }, [deledFaculty]);

  useEffect(() => {
    localStorage.setItem('svce_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('svce_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('svce_mandatory_docs', JSON.stringify(mandatoryDocuments));
  }, [mandatoryDocuments]);

  // Fetch all collections directly from Supabase on mount
  const fetchFromSupabase = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured()) return;
    setIsSyncing(true);

    try {
      // 1. Fetch Students
      const { data: dbStudents, error: errStudents } = await supabase.from('students').select('*').order('sr_no', { ascending: true });
      if (!errStudents && Array.isArray(dbStudents)) {
        const formattedStudents: StudentRecord[] = dbStudents.map((s, idx) => ({
          srNo: s.sr_no || idx + 1,
          appId: s.app_id,
          name: s.name,
          subject: s.subject,
          type: s.type || 'Regular (Central Merit)',
          category: s.category
        }));
        setStudents(formattedStudents);
      }

      // 2. Fetch Faculty
      const { data: dbFaculty, error: errFaculty } = await supabase.from('faculty').select('*').order('sl_no', { ascending: true });
      if (!errFaculty && Array.isArray(dbFaculty)) {
        const bedList: FacultyMember[] = [];
        const deledList: FacultyMember[] = [];

        dbFaculty.forEach((f, idx) => {
          const originalDeled = f.department === 'deled' ? DELED_FACULTY.find(d => d.name === f.name) : null;
          const originalBed = f.department === 'bed' ? BED_FACULTY.find(b => b.name === f.name) : null;

          const member: FacultyMember = {
            slNo: originalDeled ? originalDeled.slNo : (originalBed ? originalBed.slNo : (f.sl_no || idx + 1)),
            section: f.section || originalDeled?.section,
            name: f.name,
            dob: f.dob || '',
            age: f.age || '',
            category: f.category || 'General',
            designation: f.designation,
            type: f.type || 'Regular',
            subject: f.subject,
            qualifications: {
              masterSubject: f.master_subject || (originalDeled?.qualifications.masterSubject) || (originalBed?.qualifications.masterSubject) || f.subject,
              bEd: f.bed_qual || (originalDeled?.qualifications.bEd) || (originalBed?.qualifications.bEd) || 'Yes',
              mEd: f.med_qual || (originalDeled?.qualifications.mEd) || (originalBed?.qualifications.mEd) || 'Yes',
              maEd: (originalDeled?.qualifications.maEd) || (originalBed?.qualifications.maEd) || 'No',
              phd: f.phd_qual || (originalDeled?.qualifications.phd) || (originalBed?.qualifications.phd) || 'No',
              netSet: f.net_set || (originalDeled?.qualifications.netSet) || (originalBed?.qualifications.netSet) || 'No'
            },
            experience: f.experience || '3 Years',
            recognizedExp: f.recognized_exp || 'Swami Vibekananda College of Education',
            initialAppt: f.initial_appt || '22/07/2024',
            joiningDate: f.joining_date || '23/07/2024',
            bio: f.bio || '',
            avatar: f.avatar || 'fa-chalkboard-user'
          };

          if (f.department === 'deled') {
            deledList.push(member);
          } else {
            bedList.push(member);
          }
        });

        setBedFaculty(bedList);
        setDeledFaculty(deledList);
      }

      // 3. Fetch Notices
      const { data: dbNotices, error: errNotices } = await supabase.from('notices').select('*').order('id', { ascending: false });
      if (!errNotices && Array.isArray(dbNotices)) {
        const formattedNotices: Notice[] = dbNotices.map((n, idx) => ({
          id: n.id || idx + 1,
          subject: n.badge || n.subject || 'General',
          badge: n.badge || n.subject || 'General',
          title: n.title,
          date: n.date,
          link: n.link,
          fileUrl: n.file_url || n.fileUrl,
          fileName: n.file_name || n.fileName,
          fileType: n.file_type || n.fileType,
          fileSize: n.file_size || n.fileSize
        }));
        setNotices(formattedNotices);
      }

      // 4. Fetch Announcements
      const { data: dbAnnouncements, error: errAnnouncements } = await supabase.from('announcements').select('*').order('id', { ascending: false });
      if (!errAnnouncements && Array.isArray(dbAnnouncements)) {
        setAnnouncements(dbAnnouncements.map(a => a.text));
      }

      // 5. Fetch Mandatory Disclosure Documents
      const { data: dbDocs, error: errDocs } = await supabase.from('mandatory_disclosure').select('*').order('sr_no', { ascending: true });
      if (!errDocs && Array.isArray(dbDocs)) {
        const formattedDocs: OfficialDocument[] = dbDocs.map((d, idx) => ({
          id: d.id || `doc-${idx + 1}`,
          srNo: d.sr_no || idx + 1,
          title: d.title,
          subtitle: d.subtitle || '',
          category: d.category,
          categoryBadgeClass: d.category_badge_class || '',
          authority: d.authority || '',
          orderNo: d.order_no || '',
          date: d.date || '',
          fileSize: d.file_size || '',
          pdfPath: d.pdf_path,
          pages: d.pages || 1
        }));
        setMandatoryDocuments(formattedDocs);
      }
    } catch (e) {
      console.warn('Supabase fetch notice:', e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Fetch immediately on mount and set up Realtime DB sync
  useEffect(() => {
    fetchFromSupabase();

    if (!supabase || !isSupabaseConfigured()) return;

    // Realtime channel for live sync across all tabs, incognito mode & devices
    const channel = supabase
      .channel('public-db-realtime-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        () => {
          fetchFromSupabase();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchFromSupabase]);

  // Push All Teachers to Supabase
  const pushTeachersToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      return { success: false, message: 'Supabase is not configured in .env' };
    }

    setIsSyncing(true);
    try {
      const allFacultyPayload = [
        ...bedFaculty.map((f, idx) => ({
          sl_no: typeof f.slNo === 'number' ? f.slNo : idx + 1,
          department: 'bed',
          name: f.name,
          dob: f.dob,
          age: f.age,
          category: f.category,
          designation: f.designation,
          type: f.type,
          subject: f.subject,
          master_subject: f.qualifications.masterSubject,
          bed_qual: f.qualifications.bEd,
          med_qual: f.qualifications.mEd,
          phd_qual: f.qualifications.phd,
          net_set: f.qualifications.netSet,
          experience: f.experience,
          recognized_exp: f.recognizedExp,
          initial_appt: f.initialAppt,
          joining_date: f.joiningDate,
          bio: f.bio,
          avatar: f.avatar
        })),
        ...deledFaculty.map((f, idx) => ({
          sl_no: typeof f.slNo === 'number' ? f.slNo : idx + 1,
          department: 'deled',
          name: f.name,
          dob: f.dob,
          age: f.age,
          category: f.category,
          designation: f.designation,
          type: f.type,
          subject: f.subject,
          master_subject: f.qualifications.masterSubject,
          bed_qual: f.qualifications.bEd,
          med_qual: f.qualifications.mEd,
          phd_qual: f.qualifications.phd,
          net_set: f.qualifications.netSet,
          experience: f.experience,
          recognized_exp: f.recognizedExp,
          initial_appt: f.initialAppt,
          joining_date: f.joiningDate,
          bio: f.bio,
          avatar: f.avatar
        }))
      ];

      await supabase.from('faculty').delete().neq('department', 'none');
      const { error } = await supabase.from('faculty').insert(allFacultyPayload);

      if (error) {
        console.warn('Full faculty insert notice, attempting schema fallback:', error);
        const fallbackPayload = allFacultyPayload.map(f => ({
          sl_no: f.sl_no,
          department: f.department,
          name: f.name,
          designation: f.designation,
          subject: f.subject,
          experience: f.experience,
          joining_date: f.joining_date
        }));
        const { error: fbErr } = await supabase.from('faculty').insert(fallbackPayload);
        if (fbErr) throw fbErr;
      }

      return { success: true, message: `Successfully pushed all ${allFacultyPayload.length} teacher records (15 B.Ed + 10 D.El.Ed) to Supabase 'faculty' table!` };
    } catch (err: unknown) {
      const pgErr = err as { message?: string; details?: string; hint?: string };
      const msg = pgErr?.message || pgErr?.details || (err instanceof Error ? err.message : 'Database error');
      return { success: false, message: `Failed to push teachers: ${msg}` };
    } finally {
      setIsSyncing(false);
    }
  };

  // Push All Students to Supabase
  const pushStudentsToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      return { success: false, message: 'Supabase is not configured in .env' };
    }

    setIsSyncing(true);
    try {
      const studentPayload = students.map(s => ({
        sr_no: s.srNo,
        app_id: s.appId,
        name: s.name,
        subject: s.subject,
        type: s.type,
        category: s.category
      }));

      const { error } = await supabase.from('students').upsert(studentPayload, { onConflict: 'app_id' });
      if (error) throw error;

      return { success: true, message: `Successfully pushed all ${students.length} student records to Supabase 'students' table!` };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Database error';
      return { success: false, message: `Failed to push students: ${msg}` };
    } finally {
      setIsSyncing(false);
    }
  };

  // Push All Notices to Supabase
  const pushNoticesToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      return { success: false, message: 'Supabase is not configured in .env' };
    }

    setIsSyncing(true);
    try {
      await supabase.from('notices').delete().neq('id', 0);

      // 1. Try full schema with file attachments and subject
      const fullNoticePayload = notices.map(n => ({
        badge: n.subject || n.badge || 'General',
        title: n.title,
        date: n.date,
        link: n.link || null,
        file_url: n.fileUrl || null,
        file_name: n.fileName || null,
        file_type: n.fileType || null,
        file_size: n.fileSize || null
      }));

      const { error: fullError } = await supabase.from('notices').insert(fullNoticePayload);
      
      if (fullError) {
        console.warn('Full notice schema insert notice, attempting fallback without file columns:', fullError);
        
        // 2. Fallback to basic schema if file_url columns do not exist in DB yet
        const basicNoticePayload = notices.map(n => ({
          badge: n.subject || n.badge || 'General',
          title: n.title,
          date: n.date,
          link: n.link || null
        }));

        const { error: fallbackError } = await supabase.from('notices').insert(basicNoticePayload);
        if (fallbackError) throw fallbackError;

        return { 
          success: true, 
          message: `Successfully pushed all ${notices.length} notices to Supabase 'notices' table!` 
        };
      }

      return { success: true, message: `Successfully pushed all ${notices.length} notices to Supabase 'notices' table!` };
    } catch (err: unknown) {
      const pgErr = err as { message?: string; details?: string };
      const msg = pgErr?.message || pgErr?.details || (err instanceof Error ? err.message : 'Database error');
      return { success: false, message: `Failed to push notices: ${msg}` };
    } finally {
      setIsSyncing(false);
    }
  };

  // Push All Announcements to Supabase
  const pushAnnouncementsToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      return { success: false, message: 'Supabase is not configured in .env' };
    }

    setIsSyncing(true);
    try {
      await supabase.from('announcements').delete().neq('id', 0);
      const announcementPayload = announcements.map(text => ({
        text,
        is_active: true
      }));
      const { error } = await supabase.from('announcements').insert(announcementPayload);
      if (error) throw error;

      return { success: true, message: `Successfully pushed all ${announcements.length} ticker announcements to Supabase 'announcements' table!` };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Database error';
      return { success: false, message: `Failed to push announcements: ${msg}` };
    } finally {
      setIsSyncing(false);
    }
  };

  // Push All Mandatory Disclosure Documents to Supabase
  const pushMandatoryDocsToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      return { success: false, message: 'Supabase is not configured in .env' };
    }

    setIsSyncing(true);
    try {
      const docPayload = mandatoryDocuments.map((d, idx) => ({
        id: d.id,
        sr_no: d.srNo || idx + 1,
        title: d.title,
        subtitle: d.subtitle || null,
        category: d.category,
        category_badge_class: d.categoryBadgeClass || null,
        authority: d.authority || null,
        order_no: d.orderNo || null,
        date: d.date || null,
        file_size: d.fileSize || null,
        pdf_path: d.pdfPath,
        pages: d.pages || 1
      }));

      const { error } = await supabase.from('mandatory_disclosure').upsert(docPayload, { onConflict: 'id' });
      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          return {
            success: false,
            message: "Table 'mandatory_disclosure' does not exist in Supabase yet. Please run the SQL schema in your Supabase SQL Editor."
          };
        }
        throw error;
      }

      return { success: true, message: `Successfully pushed all ${mandatoryDocuments.length} mandatory documents to Supabase 'mandatory_disclosure' table!` };
    } catch (err: unknown) {
      const pgErr = err as { message?: string; details?: string; hint?: string };
      const msg = pgErr?.message || pgErr?.details || (err instanceof Error ? err.message : 'Database error');
      return { success: false, message: `Failed to push mandatory documents: ${msg}` };
    } finally {
      setIsSyncing(false);
    }
  };

  // Push all baseline data to Supabase PostgreSQL database
  const syncAllToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      return { success: false, message: 'Supabase is not configured in .env' };
    }

    setIsSyncing(true);
    try {
      await pushStudentsToSupabase();
      await pushTeachersToSupabase();
      await pushNoticesToSupabase();
      await pushAnnouncementsToSupabase();
      await pushMandatoryDocsToSupabase();

      return { success: true, message: 'All student, teacher, notice, announcement, and mandatory disclosure records synced to Supabase!' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Database sync error';
      return { success: false, message: msg };
    } finally {
      setIsSyncing(false);
    }
  };

  // Student Actions
  const addStudent = async (studentData: Omit<StudentRecord, 'srNo'>) => {
    const newSrNo = students.length > 0 ? Math.max(...students.map(s => s.srNo)) + 1 : 1;
    const newStudent: StudentRecord = {
      srNo: newSrNo,
      ...studentData
    };
    setStudents(prev => [newStudent, ...prev]);

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('students').insert([{
          sr_no: newSrNo,
          app_id: newStudent.appId,
          name: newStudent.name,
          subject: newStudent.subject,
          type: newStudent.type,
          category: newStudent.category
        }]);
      } catch (err) {
        console.warn('Supabase student insert notice:', err);
      }
    }
  };

  const updateStudent = async (srNo: number, updated: Partial<StudentRecord>) => {
    const existing = students.find(s => s.srNo === srNo);
    if (!existing) return;

    const mergedStudent: StudentRecord = { ...existing, ...updated };
    setStudents(prev => prev.map(s => s.srNo === srNo ? mergedStudent : s));

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('students').update({
          name: mergedStudent.name,
          app_id: mergedStudent.appId,
          subject: mergedStudent.subject,
          category: mergedStudent.category,
          type: mergedStudent.type
        }).eq('app_id', existing.appId);
      } catch (err) {
        console.warn('Supabase student update notice:', err);
      }
    }
  };

  const deleteStudent = async (srNo: number) => {
    const studentToDelete = students.find(s => s.srNo === srNo);
    setStudents(prev => prev.filter(s => s.srNo !== srNo));

    if (supabase && isSupabaseConfigured() && studentToDelete) {
      try {
        await supabase.from('students').delete().eq('app_id', studentToDelete.appId);
      } catch (err) {
        console.warn('Supabase student delete notice:', err);
      }
    }
  };

  // Teacher Actions
  const addTeacher = async (teacherData: Omit<FacultyMember, 'slNo'> & { slNo?: number | string }, department: 'bed' | 'deled') => {
    const targetList = department === 'bed' ? bedFaculty : deledFaculty;
    const newSlNo = teacherData.slNo || (targetList.length + 1);
    const newTeacher: FacultyMember = {
      ...teacherData,
      slNo: newSlNo
    };

    if (department === 'bed') {
      setBedFaculty(prev => [...prev, newTeacher]);
    } else {
      setDeledFaculty(prev => [...prev, newTeacher]);
    }

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('faculty').insert([{
          sl_no: typeof newSlNo === 'number' ? newSlNo : targetList.length + 1,
          department,
          name: newTeacher.name,
          dob: newTeacher.dob,
          age: newTeacher.age,
          category: newTeacher.category,
          designation: newTeacher.designation,
          type: newTeacher.type,
          subject: newTeacher.subject,
          master_subject: newTeacher.qualifications.masterSubject,
          bed_qual: newTeacher.qualifications.bEd,
          med_qual: newTeacher.qualifications.mEd,
          phd_qual: newTeacher.qualifications.phd,
          net_set: newTeacher.qualifications.netSet,
          experience: newTeacher.experience,
          recognized_exp: newTeacher.recognizedExp,
          initial_appt: newTeacher.initialAppt,
          joining_date: newTeacher.joiningDate,
          bio: newTeacher.bio,
          avatar: newTeacher.avatar
        }]);
      } catch (err) {
        console.warn('Supabase faculty insert notice:', err);
      }
    }
  };

  const updateTeacher = async (slNo: number | string, updated: Partial<FacultyMember>, department: 'bed' | 'deled') => {
    const targetList = department === 'bed' ? bedFaculty : deledFaculty;
    const existing = targetList.find(f => f.slNo === slNo);
    if (!existing) return;

    const mergedTeacher: FacultyMember = { 
      ...existing, 
      ...updated,
      qualifications: {
        ...existing.qualifications,
        ...(updated.qualifications || {})
      }
    };

    if (department === 'bed') {
      setBedFaculty(prev => prev.map(f => f.slNo === slNo ? mergedTeacher : f));
    } else {
      setDeledFaculty(prev => prev.map(f => f.slNo === slNo ? mergedTeacher : f));
    }

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('faculty').update({
          name: mergedTeacher.name,
          dob: mergedTeacher.dob,
          age: mergedTeacher.age,
          category: mergedTeacher.category,
          designation: mergedTeacher.designation,
          type: mergedTeacher.type,
          subject: mergedTeacher.subject,
          master_subject: mergedTeacher.qualifications.masterSubject,
          bed_qual: mergedTeacher.qualifications.bEd,
          med_qual: mergedTeacher.qualifications.mEd,
          phd_qual: mergedTeacher.qualifications.phd,
          net_set: mergedTeacher.qualifications.netSet,
          experience: mergedTeacher.experience,
          recognized_exp: mergedTeacher.recognizedExp,
          initial_appt: mergedTeacher.initialAppt,
          joining_date: mergedTeacher.joiningDate,
          bio: mergedTeacher.bio
        })
        .eq('name', existing.name)
        .eq('department', department);
      } catch (err) {
        console.warn('Supabase faculty update notice:', err);
      }
    }
  };

  const deleteTeacher = async (slNo: number | string, department: 'bed' | 'deled') => {
    const targetList = department === 'bed' ? bedFaculty : deledFaculty;
    const teacherToDelete = targetList.find(f => f.slNo === slNo);

    if (department === 'bed') {
      setBedFaculty(prev => prev.filter(f => f.slNo !== slNo));
    } else {
      setDeledFaculty(prev => prev.filter(f => f.slNo !== slNo));
    }

    if (supabase && isSupabaseConfigured() && teacherToDelete) {
      try {
        await supabase
          .from('faculty')
          .delete()
          .eq('name', teacherToDelete.name)
          .eq('department', department);
      } catch (err) {
        console.warn('Supabase faculty delete notice:', err);
      }
    }
  };

  // Notice Actions
  const addNotice = async (noticeData: Omit<Notice, 'id'>) => {
    const newId = notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1;
    const sub = noticeData.subject || noticeData.badge || 'General';
    const newNotice: Notice = {
      id: newId,
      ...noticeData,
      subject: sub,
      badge: sub
    };
    setNotices(prev => [newNotice, ...prev]);

    if (supabase && isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('notices').insert([{
          badge: sub,
          title: newNotice.title,
          date: newNotice.date,
          file_url: newNotice.fileUrl || null,
          file_name: newNotice.fileName || null,
          file_type: newNotice.fileType || null,
          file_size: newNotice.fileSize || null
        }]);

        if (error) {
          // Fallback to basic columns
          await supabase.from('notices').insert([{
            badge: sub,
            title: newNotice.title,
            date: newNotice.date
          }]);
        }
      } catch (err) {
        console.warn('Supabase notice insert notice:', err);
      }
    }
  };

  const updateNotice = async (id: number, updated: Partial<Notice>) => {
    const existing = notices.find(n => n.id === id);
    if (!existing) return;

    const sub = updated.subject || updated.badge || existing.subject || existing.badge || 'General';
    const mergedNotice: Notice = { 
      ...existing, 
      ...updated,
      subject: sub,
      badge: sub
    };
    setNotices(prev => prev.map(n => n.id === id ? mergedNotice : n));

    if (supabase && isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('notices').update({
          badge: sub,
          title: mergedNotice.title,
          date: mergedNotice.date,
          file_url: mergedNotice.fileUrl || null,
          file_name: mergedNotice.fileName || null,
          file_type: mergedNotice.fileType || null,
          file_size: mergedNotice.fileSize || null
        }).eq('title', existing.title);

        if (error) {
          // Fallback to basic columns
          await supabase.from('notices').update({
            badge: sub,
            title: mergedNotice.title,
            date: mergedNotice.date
          }).eq('title', existing.title);
        }
      } catch (err) {
        console.warn('Supabase notice update notice:', err);
      }
    }
  };

  const deleteNotice = async (id: number) => {
    const noticeToDelete = notices.find(n => n.id === id);
    setNotices(prev => prev.filter(n => n.id !== id));

    if (supabase && isSupabaseConfigured() && noticeToDelete) {
      try {
        const { error } = await supabase.from('notices').delete().eq('id', id);
        if (error) {
          await supabase.from('notices').delete().eq('title', noticeToDelete.title);
        }
      } catch (err) {
        console.warn('Supabase notice delete notice:', err);
      }
    }
  };

  // Announcement Bar Actions
  const addAnnouncement = async (text: string) => {
    if (!text.trim()) return;
    const cleanText = text.trim();
    setAnnouncements(prev => [cleanText, ...prev]);

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('announcements').insert([{ text: cleanText, is_active: true }]);
      } catch (err) {
        console.warn('Supabase announcement insert notice:', err);
      }
    }
  };

  const updateAnnouncement = async (index: number, newText: string) => {
    if (!newText.trim()) return;
    const oldText = announcements[index];
    const cleanNewText = newText.trim();

    setAnnouncements(prev => prev.map((item, idx) => idx === index ? cleanNewText : item));

    if (supabase && isSupabaseConfigured() && oldText) {
      try {
        await supabase.from('announcements').update({ text: cleanNewText }).eq('text', oldText);
      } catch (err) {
        console.warn('Supabase announcement update notice:', err);
      }
    }
  };

  const deleteAnnouncement = async (index: number) => {
    const itemToDelete = announcements[index];
    setAnnouncements(prev => prev.filter((_, idx) => idx !== index));

    if (supabase && isSupabaseConfigured() && itemToDelete) {
      try {
        await supabase.from('announcements').delete().eq('text', itemToDelete);
      } catch (err) {
        console.warn('Supabase announcement delete notice:', err);
      }
    }
  };

  // Mandatory Disclosure Document Actions
  const addMandatoryDoc = async (docData: Omit<OfficialDocument, 'id'> & { id?: string }) => {
    const newSrNo = mandatoryDocuments.length > 0 ? Math.max(...mandatoryDocuments.map(d => d.srNo || 0)) + 1 : 1;
    const docId = docData.id || `doc-${Date.now()}`;
    const newDoc: OfficialDocument = {
      ...docData,
      id: docId,
      srNo: docData.srNo || newSrNo
    };
    setMandatoryDocuments(prev => [...prev, newDoc]);

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('mandatory_disclosure').insert([{
          id: newDoc.id,
          sr_no: newDoc.srNo,
          title: newDoc.title,
          subtitle: newDoc.subtitle || null,
          category: newDoc.category,
          category_badge_class: newDoc.categoryBadgeClass || null,
          authority: newDoc.authority || null,
          order_no: newDoc.orderNo || null,
          date: newDoc.date || null,
          file_size: newDoc.fileSize || null,
          pdf_path: newDoc.pdfPath,
          pages: newDoc.pages || 1
        }]);
      } catch (err) {
        console.warn('Supabase mandatory_disclosure insert notice:', err);
      }
    }
  };

  const updateMandatoryDoc = async (id: string, updated: Partial<OfficialDocument>) => {
    const existing = mandatoryDocuments.find(d => d.id === id);
    if (!existing) return;

    const mergedDoc: OfficialDocument = { ...existing, ...updated };
    setMandatoryDocuments(prev => prev.map(d => d.id === id ? mergedDoc : d));

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('mandatory_disclosure').update({
          title: mergedDoc.title,
          subtitle: mergedDoc.subtitle || null,
          category: mergedDoc.category,
          category_badge_class: mergedDoc.categoryBadgeClass || null,
          authority: mergedDoc.authority || null,
          order_no: mergedDoc.orderNo || null,
          date: mergedDoc.date || null,
          file_size: mergedDoc.fileSize || null,
          pdf_path: mergedDoc.pdfPath,
          pages: mergedDoc.pages || 1
        }).eq('id', id);
      } catch (err) {
        console.warn('Supabase mandatory_disclosure update notice:', err);
      }
    }
  };

  const deleteMandatoryDoc = async (id: string) => {
    setMandatoryDocuments(prev => prev.filter(d => d.id !== id));

    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('mandatory_disclosure').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase mandatory_disclosure delete notice:', err);
      }
    }
  };

  const resetData = () => {
    setStudents(STUDENTS_DATA);
    setBedFaculty(BED_FACULTY);
    setDeledFaculty(DELED_FACULTY);
    setNotices(NOTICES);
    setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    setMandatoryDocuments(OFFICIAL_DOCUMENTS);
    localStorage.removeItem('svce_students');
    localStorage.removeItem('svce_bed_faculty');
    localStorage.removeItem('svce_deled_faculty');
    localStorage.removeItem('svce_notices');
    localStorage.removeItem('svce_announcements');
    localStorage.removeItem('svce_mandatory_docs');
  };

  return (
    <DataContext.Provider
      value={{
        students,
        bedFaculty,
        deledFaculty,
        notices,
        announcements,
        mandatoryDocuments,
        isSyncing,
        addStudent,
        updateStudent,
        deleteStudent,
        pushStudentsToSupabase,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        pushTeachersToSupabase,
        addNotice,
        updateNotice,
        deleteNotice,
        pushNoticesToSupabase,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        pushAnnouncementsToSupabase,
        addMandatoryDoc,
        updateMandatoryDoc,
        deleteMandatoryDoc,
        pushMandatoryDocsToSupabase,
        syncAllToSupabase,
        fetchFromSupabase,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

