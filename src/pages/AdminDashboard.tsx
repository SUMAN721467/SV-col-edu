import React, { useState } from 'react';
import { COLLEGE_DATA } from '../data/svceData';
import { supabase, isSupabaseConfigured, supabaseUrl } from '../services/supabase';
import { useData } from '../context/DataContext';
import { FacultyMember, StudentRecord, Notice, OfficialDocument } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

type TabType = 'overview' | 'teachers' | 'students' | 'notices' | 'announcements' | 'disclosure';

// Category badge color helper for Mandatory Disclosure Documents
const getDocCategoryBadgeClass = (category: string): string => {
  switch (category) {
    case 'NCTE RECOGNITION':
      return 'bg-purple-100 text-purple-700 border border-purple-200';
    case 'UNIVERSITY AFFILIATION':
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'STATE BOARD AFFILIATION':
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'UNIVERSITY NOC':
      return 'bg-slate-100 text-slate-700 border border-slate-200';
    case 'STATUTORY SAFETY':
      return 'bg-rose-100 text-rose-700 border border-rose-200';
    case 'FACULTY ROSTER':
      return 'bg-sky-100 text-sky-700 border border-sky-200';
    case 'STUDENT ADMISSIONS':
      return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'TRUST & LAND DEED':
      return 'bg-indigo-100 text-indigo-700 border border-indigo-200';
    case 'INFRASTRUCTURE & PLAN':
      return 'bg-teal-100 text-teal-700 border border-teal-200';
    default:
      return 'bg-slate-100 text-slate-700 border border-slate-200';
  }
};

// Helper to format ISO date "YYYY-MM-DD" to standard readable notice date "21 Sep 2026"
const formatNoticeDate = (isoDate: string): string => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dStr = String(day).padStart(2, '0');
    return `${dStr} ${months[month] || ''} ${year}`;
  }
  return isoDate;
};

// Helper to convert arbitrary date string (e.g. "21 Sep 2026", "2026-09-21") to "YYYY-MM-DD" for <input type="date">
const toIsoDateString = (dateStr?: string): string => {
  if (!dateStr || !dateStr.trim()) {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const clean = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }
  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};


export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigate }) => {
  const { 
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
  } = useData();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State: Add Teacher Modal
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [teacherDept, setTeacherDept] = useState<'bed' | 'deled'>('bed');
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    dob: '01/01/1985',
    age: '39 Years',
    category: 'General',
    designation: 'Lecturer (Regular)',
    type: 'Regular',
    subject: '',
    masterSubject: '',
    bEd: 'Yes',
    mEd: 'Yes',
    phd: 'No',
    experience: '3 Years',
    recognizedExp: 'Swami Vibekananda College of Education',
    initialAppt: '22/07/2024',
    joiningDate: '23/07/2024',
    bio: ''
  });

  // Form State: Edit Teacher Modal
  const [editingTeacher, setEditingTeacher] = useState<{ teacher: FacultyMember; dept: 'bed' | 'deled' } | null>(null);
  const [editTeacherForm, setEditTeacherForm] = useState({
    name: '',
    dob: '',
    age: '',
    category: 'General',
    designation: 'Lecturer (Regular)',
    type: 'Regular',
    subject: '',
    masterSubject: '',
    bEd: '',
    mEd: '',
    phd: '',
    experience: '',
    initialAppt: '',
    joiningDate: '',
    bio: ''
  });

  // Form State: Add Student Modal
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: '',
    appId: `ADM/BED/2025-27/0000${String(students.length + 1).padStart(2, '0')}`,
    subject: 'Bengali',
    category: 'GEN' as 'GEN' | 'SC' | 'ST' | 'OBC-A' | 'OBC-B',
    type: 'Regular (Central Merit)'
  });

  // Form State: Edit Student Modal
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [editStudentForm, setEditStudentForm] = useState({
    name: '',
    appId: '',
    subject: 'Bengali',
    category: 'GEN' as 'GEN' | 'SC' | 'ST' | 'OBC-A' | 'OBC-B',
    type: 'Regular (Central Merit)'
  });

  // Form State: Add Notice Modal
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    subject: '',
    title: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    fileUrl: '',
    fileName: '',
    fileType: '',
    fileSize: ''
  });

  // Form State: Edit Notice Modal
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [editNoticeForm, setEditNoticeForm] = useState({
    subject: '',
    title: '',
    date: '',
    fileUrl: '',
    fileName: '',
    fileType: '',
    fileSize: ''
  });

  // Form State: New Announcement Input
  const [newAnnouncementText, setNewAnnouncementText] = useState('');

  // Form State: Edit Announcement Modal
  const [editingAnnouncement, setEditingAnnouncement] = useState<{ index: number; text: string } | null>(null);
  const [editAnnouncementText, setEditAnnouncementText] = useState('');

  // Form State: Add Mandatory Disclosure Document Modal
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [docForm, setDocForm] = useState({
    title: '',
    subtitle: '',
    category: 'NCTE RECOGNITION',
    authority: 'Eastern Regional Committee, NCTE Bhubaneswar',
    orderNo: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    fileSize: '500 KB',
    pdfPath: 'assets/pdf/B.ED . RECOGNISED COPY.pdf',
    pages: 2
  });

  // Form State: Edit Mandatory Disclosure Document Modal
  const [editingDoc, setEditingDoc] = useState<OfficialDocument | null>(null);
  const [editDocForm, setEditDocForm] = useState({
    title: '',
    subtitle: '',
    category: 'NCTE RECOGNITION',
    authority: '',
    orderNo: '',
    date: '',
    fileSize: '',
    pdfPath: '',
    pages: 1
  });

  // Document Lightbox Preview
  const [previewingDoc, setPreviewingDoc] = useState<OfficialDocument | null>(null);

  // SQL Setup Modal
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Search terms in dashboard tabs
  const [teacherSearch, setTeacherSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [noticeSearch, setNoticeSearch] = useState('');
  const [docSearch, setDocSearch] = useState('');

  // Confirmation Delete Dialog State
  const [confirmDelete, setConfirmDelete] = useState<{
    title: string;
    itemName: string;
    itemType: 'Notice' | 'Student' | 'Teacher' | 'Announcement' | 'Mandatory Document';
    onConfirm: () => void | Promise<void>;
  } | null>(null);

  const isConnected = isSupabaseConfigured();

  const sessionData = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('svce_admin_session') || '{}');
    } catch {
      return {};
    }
  })();
  const adminEmail = sessionData?.user?.email || 'admin@svcoledu.net.in';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSignOut = async () => {
    if (supabase && isConnected) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('svce_admin_session');
    onLogout();
  };

  // Handlers: Add Teacher
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name.trim() || !teacherForm.subject.trim()) {
      showToast('Please fill in Teacher Name and Subject');
      return;
    }

    const newTeacherData: Omit<FacultyMember, 'slNo'> = {
      name: teacherForm.name.trim(),
      dob: teacherForm.dob,
      age: teacherForm.age,
      category: teacherForm.category,
      designation: teacherForm.designation,
      type: teacherForm.type,
      subject: teacherForm.subject.trim(),
      qualifications: {
        bEd: teacherForm.bEd,
        mEd: teacherForm.mEd,
        maEd: 'No',
        masterSubject: teacherForm.masterSubject || teacherForm.subject,
        phd: teacherForm.phd,
        netSet: 'No'
      },
      experience: teacherForm.experience,
      recognizedExp: teacherForm.recognizedExp,
      initialAppt: teacherForm.initialAppt,
      joiningDate: teacherForm.joiningDate,
      bio: teacherForm.bio || `${teacherForm.designation} in ${teacherForm.subject} at SVCE.`,
      avatar: 'fa-chalkboard-user'
    };

    await addTeacher(newTeacherData, teacherDept);
    setShowAddTeacherModal(false);
    showToast(`Teacher "${teacherForm.name.trim()}" added & automatically saved to Database!`);
    setTeacherForm({
      name: '',
      dob: '01/01/1985',
      age: '39 Years',
      category: 'General',
      designation: 'Lecturer (Regular)',
      type: 'Regular',
      subject: '',
      masterSubject: '',
      bEd: 'Yes',
      mEd: 'Yes',
      phd: 'No',
      experience: '3 Years',
      recognizedExp: 'Swami Vibekananda College of Education',
      initialAppt: '22/07/2024',
      joiningDate: '23/07/2024',
      bio: ''
    });
  };

  // Handlers: Open Edit Teacher
  const handleOpenEditTeacher = (teacher: FacultyMember, dept: 'bed' | 'deled') => {
    setEditingTeacher({ teacher, dept });
    setEditTeacherForm({
      name: teacher.name,
      dob: teacher.dob || '',
      age: teacher.age || '',
      category: teacher.category || 'General',
      designation: teacher.designation,
      type: teacher.type || 'Regular',
      subject: teacher.subject,
      masterSubject: teacher.qualifications?.masterSubject || '',
      bEd: teacher.qualifications?.bEd || 'Yes',
      mEd: teacher.qualifications?.mEd || 'Yes',
      phd: teacher.qualifications?.phd || 'No',
      experience: teacher.experience || '',
      initialAppt: teacher.initialAppt || '',
      joiningDate: teacher.joiningDate || '',
      bio: teacher.bio || ''
    });
  };

  // Handlers: Save Edit Teacher
  const handleSaveEditTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    await updateTeacher(editingTeacher.teacher.slNo, {
      name: editTeacherForm.name.trim(),
      dob: editTeacherForm.dob,
      age: editTeacherForm.age,
      category: editTeacherForm.category,
      designation: editTeacherForm.designation,
      type: editTeacherForm.type,
      subject: editTeacherForm.subject.trim(),
      qualifications: {
        ...editingTeacher.teacher.qualifications,
        masterSubject: editTeacherForm.masterSubject || editTeacherForm.subject,
        bEd: editTeacherForm.bEd,
        mEd: editTeacherForm.mEd,
        phd: editTeacherForm.phd
      },
      experience: editTeacherForm.experience,
      initialAppt: editTeacherForm.initialAppt,
      joiningDate: editTeacherForm.joiningDate,
      bio: editTeacherForm.bio
    }, editingTeacher.dept);

    setEditingTeacher(null);
    showToast(`Faculty record for "${editTeacherForm.name}" updated in Database!`);
  };

  // Handlers: Add Student
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name.trim() || !studentForm.appId.trim()) {
      showToast('Please fill in Student Name and Admission ID');
      return;
    }

    await addStudent({
      name: studentForm.name.trim(),
      appId: studentForm.appId.trim().toUpperCase(),
      subject: studentForm.subject,
      category: studentForm.category,
      type: studentForm.type
    });

    setShowAddStudentModal(false);
    showToast(`Student "${studentForm.name.trim()}" registered & automatically saved to Database!`);
    setStudentForm({
      name: '',
      appId: `ADM/BED/2025-27/0000${String(students.length + 2).padStart(2, '0')}`,
      subject: 'Bengali',
      category: 'GEN',
      type: 'Regular (Central Merit)'
    });
  };

  // Handlers: Open Edit Student
  const handleOpenEditStudent = (student: StudentRecord) => {
    setEditingStudent(student);
    setEditStudentForm({
      name: student.name,
      appId: student.appId,
      subject: student.subject,
      category: student.category,
      type: student.type
    });
  };

  // Handlers: Save Edit Student
  const handleSaveEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    await updateStudent(editingStudent.srNo, {
      name: editStudentForm.name.trim(),
      appId: editStudentForm.appId.trim().toUpperCase(),
      subject: editStudentForm.subject,
      category: editStudentForm.category,
      type: editStudentForm.type
    });

    setEditingStudent(null);
    showToast(`Student record for "${editStudentForm.name}" updated in Database!`);
  };

  // Helper: File Upload Reader (PDF, Word, Excel, CSV, Images, etc.)
  const handleFileUpload = (file: File, isEdit: boolean) => {
    const sizeInKb = (file.size / 1024).toFixed(1);
    const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : `${sizeInKb} KB`;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      if (isEdit) {
        setEditNoticeForm(prev => ({
          ...prev,
          fileUrl: base64,
          fileName: file.name,
          fileType: file.type || file.name.split('.').pop() || 'file',
          fileSize: sizeStr
        }));
      } else {
        setNoticeForm(prev => ({
          ...prev,
          fileUrl: base64,
          fileName: file.name,
          fileType: file.type || file.name.split('.').pop() || 'file',
          fileSize: sizeStr
        }));
      }
      showToast(`Document "${file.name}" attached successfully!`);
    };
    reader.readAsDataURL(file);
  };

  // Handlers: Add Notice
  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title.trim()) {
      showToast('Please enter a Notice Title');
      return;
    }

    const sub = noticeForm.subject.trim() || 'General Notice';
    await addNotice({
      subject: sub,
      badge: sub,
      title: noticeForm.title.trim(),
      date: noticeForm.date.trim(),
      fileUrl: noticeForm.fileUrl || undefined,
      fileName: noticeForm.fileName || undefined,
      fileType: noticeForm.fileType || undefined,
      fileSize: noticeForm.fileSize || undefined
    });

    setShowAddNoticeModal(false);
    showToast('Official Notice published & automatically updated in Database!');
    setNoticeForm({
      subject: '',
      title: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileUrl: '',
      fileName: '',
      fileType: '',
      fileSize: ''
    });
  };

  // Handlers: Open Edit Notice
  const handleOpenEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setEditNoticeForm({
      subject: notice.subject || notice.badge || '',
      title: notice.title,
      date: notice.date,
      fileUrl: notice.fileUrl || '',
      fileName: notice.fileName || '',
      fileType: notice.fileType || '',
      fileSize: notice.fileSize || ''
    });
  };

  // Handlers: Save Edit Notice
  const handleSaveEditNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;

    const sub = editNoticeForm.subject.trim() || 'General Notice';
    await updateNotice(editingNotice.id, {
      subject: sub,
      badge: sub,
      title: editNoticeForm.title.trim(),
      date: editNoticeForm.date.trim(),
      fileUrl: editNoticeForm.fileUrl || undefined,
      fileName: editNoticeForm.fileName || undefined,
      fileType: editNoticeForm.fileType || undefined,
      fileSize: editNoticeForm.fileSize || undefined
    });

    setEditingNotice(null);
    showToast(`Notice "${editNoticeForm.title}" updated & saved to Database!`);
  };

  // Handlers: Add Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementText.trim()) return;

    await addAnnouncement(newAnnouncementText.trim());
    setNewAnnouncementText('');
    showToast('Announcement added & automatically updated in Database!');
  };

  // Handlers: Open Edit Announcement
  const handleOpenEditAnnouncement = (index: number, text: string) => {
    setEditingAnnouncement({ index, text });
    setEditAnnouncementText(text);
  };

  // Handlers: Save Edit Announcement
  const handleSaveEditAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;

    await updateAnnouncement(editingAnnouncement.index, editAnnouncementText.trim());
    setEditingAnnouncement(null);
    showToast('Announcement updated in Database!');
  };

  // Handlers: Add Mandatory Disclosure Document
  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title.trim() || !docForm.pdfPath.trim()) {
      showToast('Please provide Document Title and File Path');
      return;
    }

    const badgeClass = getDocCategoryBadgeClass(docForm.category);
    await addMandatoryDoc({
      title: docForm.title.trim(),
      subtitle: docForm.subtitle.trim() || undefined,
      category: docForm.category,
      categoryBadgeClass: badgeClass,
      authority: docForm.authority.trim() || undefined,
      orderNo: docForm.orderNo.trim() || undefined,
      date: docForm.date.trim() || undefined,
      fileSize: docForm.fileSize.trim() || 'Official PDF',
      pdfPath: docForm.pdfPath.trim(),
      pages: Number(docForm.pages) || 1
    });

    setShowAddDocModal(false);
    showToast(`Document "${docForm.title.trim()}" added & automatically synced to Database!`);
    setDocForm({
      title: '',
      subtitle: '',
      category: 'NCTE RECOGNITION',
      authority: 'Eastern Regional Committee, NCTE Bhubaneswar',
      orderNo: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileSize: '500 KB',
      pdfPath: 'assets/pdf/B.ED . RECOGNISED COPY.pdf',
      pages: 2
    });
  };

  // Handlers: Open Edit Document
  const handleOpenEditDoc = (doc: OfficialDocument) => {
    setEditingDoc(doc);
    setEditDocForm({
      title: doc.title,
      subtitle: doc.subtitle || '',
      category: doc.category,
      authority: doc.authority || '',
      orderNo: doc.orderNo || '',
      date: doc.date || '',
      fileSize: doc.fileSize || '',
      pdfPath: doc.pdfPath,
      pages: doc.pages || 1
    });
  };

  // Handlers: Save Edit Document
  const handleSaveEditDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;

    const badgeClass = getDocCategoryBadgeClass(editDocForm.category);
    await updateMandatoryDoc(editingDoc.id, {
      title: editDocForm.title.trim(),
      subtitle: editDocForm.subtitle.trim() || undefined,
      category: editDocForm.category,
      categoryBadgeClass: badgeClass,
      authority: editDocForm.authority.trim() || undefined,
      orderNo: editDocForm.orderNo.trim() || undefined,
      date: editDocForm.date.trim() || undefined,
      fileSize: editDocForm.fileSize.trim() || undefined,
      pdfPath: editDocForm.pdfPath.trim(),
      pages: Number(editDocForm.pages) || 1
    });

    setEditingDoc(null);
    showToast(`Document "${editDocForm.title.trim()}" updated & saved to Database!`);
  };

  // Handlers: Delete Document with Confirmation Modal
  const handleDeleteDoc = (doc: OfficialDocument) => {
    setConfirmDelete({
      title: 'Delete Mandatory Disclosure Document',
      itemName: doc.title,
      itemType: 'Mandatory Document',
      onConfirm: async () => {
        await deleteMandatoryDoc(doc.id);
        showToast(`Document "${doc.title}" deleted from Database & Vault.`);
        setConfirmDelete(null);
      }
    });
  };

  // Handlers: Push Mandatory Documents to Supabase
  const handlePushDocs = async () => {
    const res = await pushMandatoryDocsToSupabase();
    showToast(res.message);
  };

  return (
    <div className="py-10 bg-surface-main min-h-[85vh]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6">

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-gold flex items-center gap-3 animate-bounce">
            <i className="fa-solid fa-circle-check text-gold-light text-lg"></i>
            <span className="font-semibold text-sm">{toastMessage}</span>
          </div>
        )}

        {/* Admin Header Banner */}
        <div className="bg-primary-gradient text-white p-6 sm:p-8 rounded-3xl shadow-lg border-b-4 border-gold flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-gold-light/40 flex items-center justify-center text-2xl text-gold-light flex-shrink-0">
              <i className="fa-solid fa-user-gear"></i>
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl">
                Institutional Administration Panel
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {COLLEGE_DATA.name} • <span className="text-gold-light font-semibold">Admin: {adminEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
              isConnected
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}>
              <i className={`fa-solid ${isConnected ? 'fa-circle-check text-emerald-600' : 'fa-database text-amber-600'}`}></i>
              {isConnected ? (isSyncing ? 'Syncing with Supabase...' : 'Supabase Connected') : 'Demo Local Mode'}
            </span>

            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 rounded-xl bg-white/15 text-white border border-white/25 hover:bg-white hover:text-navy text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i> View Public Site
            </button>

            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-xl bg-red-500/20 text-red-200 border border-red-500/40 hover:bg-red-600 hover:text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-chart-pie text-gold"></i> Overview
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'teachers'
                ? 'bg-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-chalkboard-user text-gold"></i> Manage Teachers ({bedFaculty.length + deledFaculty.length})
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'students'
                ? 'bg-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-user-graduate text-gold"></i> Manage Students ({students.length})
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'notices'
                ? 'bg-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-clipboard-list text-gold"></i> Notice Board ({notices.length})
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'announcements'
                ? 'bg-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-bullhorn text-gold"></i> Announcement Bar ({announcements.length})
          </button>

          <button
            onClick={() => setActiveTab('disclosure')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'disclosure'
                ? 'bg-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-file-shield text-gold"></i> Mandatory Disclosure ({mandatoryDocuments.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              <div 
                onClick={() => setActiveTab('students')}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-gold transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-bg text-gold flex items-center justify-center text-xl flex-shrink-0">
                  <i className="fa-solid fa-user-graduate"></i>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-navy text-2xl">{students.length}</h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Students</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('teachers')}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-gold transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl flex-shrink-0">
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-navy text-2xl">{bedFaculty.length + deledFaculty.length}</h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Teachers</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('notices')}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-gold transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
                  <i className="fa-solid fa-clipboard-list"></i>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-navy text-2xl">{notices.length}</h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Notices</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('announcements')}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-gold transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl flex-shrink-0">
                  <i className="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-navy text-2xl">{announcements.length}</h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Ticker</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('disclosure')}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-gold transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
                  <i className="fa-solid fa-file-shield"></i>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-navy text-2xl">{mandatoryDocuments.length}</h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase">PDF Vault</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-navy text-lg flex items-center gap-2">
                <i className="fa-solid fa-bolt text-gold"></i> Quick Administrative Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <button
                  onClick={() => { setActiveTab('teachers'); setShowAddTeacherModal(true); }}
                  className="p-4 rounded-2xl bg-surface-main hover:bg-gold-bg border border-slate-200 hover:border-gold text-left transition-all group cursor-pointer"
                >
                  <i className="fa-solid fa-user-plus text-xl text-gold mb-2 block group-hover:scale-110 transition-transform"></i>
                  <strong className="block text-sm text-navy font-bold">+ Add Teacher</strong>
                  <span className="text-xs text-slate-500">Insert B.Ed / D.El.Ed</span>
                </button>

                <button
                  onClick={() => { setActiveTab('students'); setShowAddStudentModal(true); }}
                  className="p-4 rounded-2xl bg-surface-main hover:bg-gold-bg border border-slate-200 hover:border-gold text-left transition-all group cursor-pointer"
                >
                  <i className="fa-solid fa-graduation-cap text-xl text-gold mb-2 block group-hover:scale-110 transition-transform"></i>
                  <strong className="block text-sm text-navy font-bold">+ Add Student</strong>
                  <span className="text-xs text-slate-500">Register new trainee</span>
                </button>

                <button
                  onClick={() => { setActiveTab('notices'); setShowAddNoticeModal(true); }}
                  className="p-4 rounded-2xl bg-surface-main hover:bg-gold-bg border border-slate-200 hover:border-gold text-left transition-all group cursor-pointer"
                >
                  <i className="fa-solid fa-file-circle-plus text-xl text-gold mb-2 block group-hover:scale-110 transition-transform"></i>
                  <strong className="block text-sm text-navy font-bold">+ Publish Notice</strong>
                  <span className="text-xs text-slate-500">Add to board</span>
                </button>

                <button
                  onClick={() => { setActiveTab('announcements'); }}
                  className="p-4 rounded-2xl bg-surface-main hover:bg-gold-bg border border-slate-200 hover:border-gold text-left transition-all group cursor-pointer"
                >
                  <i className="fa-solid fa-bullhorn text-xl text-gold mb-2 block group-hover:scale-110 transition-transform"></i>
                  <strong className="block text-sm text-navy font-bold">+ Ticker Bar</strong>
                  <span className="text-xs text-slate-500">Broadcast headline</span>
                </button>

                <button
                  onClick={() => { setActiveTab('disclosure'); setShowAddDocModal(true); }}
                  className="p-4 rounded-2xl bg-surface-main hover:bg-gold-bg border border-slate-200 hover:border-gold text-left transition-all group cursor-pointer"
                >
                  <i className="fa-solid fa-file-shield text-xl text-gold mb-2 block group-hover:scale-110 transition-transform"></i>
                  <strong className="block text-sm text-navy font-bold">+ Add PDF Doc</strong>
                  <span className="text-xs text-slate-500">Statutory Vault order</span>
                </button>
              </div>
            </div>

            {/* Live Announcements Roster Preview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-heading font-bold text-navy text-lg flex items-center gap-2">
                  <i className="fa-solid fa-bullhorn text-gold"></i> Live Notice Board Snapshot
                </h3>
                <button 
                  onClick={() => setActiveTab('notices')}
                  className="text-xs font-bold text-gold hover:underline cursor-pointer"
                >
                  Manage All Notices →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Badge</th>
                      <th>Announcement Title</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map(notice => (
                      <tr key={notice.id}>
                        <td><span className="badge-category badge-gen">{notice.badge}</span></td>
                        <td className="font-bold text-slate-800">{notice.title}</td>
                        <td className="text-slate-500">{notice.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE TEACHERS */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                    <i className="fa-solid fa-chalkboard-user text-gold"></i>
                    <span>Faculty &amp; Teaching Staff Management</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage certified faculty records with real-time automatic cloud database synchronization.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Auto-Sync Active</span>
                  </span>

                  <button
                    onClick={async () => {
                      showToast("Pushing all teachers to database...");
                      const res = await pushTeachersToSupabase();
                      showToast(res.message);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs shadow-md hover:bg-navy-dark transition-all flex items-center gap-2 cursor-pointer"
                    title="Double check and sync faculty records to cloud database"
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-gold"></i>
                    <span>Push to Database</span>
                  </button>

                  <button
                    onClick={() => setShowAddTeacherModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gold text-navy-dark font-extrabold text-xs shadow-md hover:bg-gold-light transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-user-plus"></i> + Add New Teacher
                  </button>
                </div>
              </div>

              {/* Department Toggle & Search */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setTeacherDept('bed')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      teacherDept === 'bed' ? 'bg-navy text-white' : 'bg-surface-main text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    B.Ed Department ({bedFaculty.length})
                  </button>
                  <button
                    onClick={() => setTeacherDept('deled')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      teacherDept === 'deled' ? 'bg-navy text-white' : 'bg-surface-main text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    D.El.Ed Department ({deledFaculty.length})
                  </button>
                </div>

                <div className="w-full sm:w-72 relative">
                  <i className="fa-solid fa-search absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                  <input
                    type="text"
                    placeholder="Search teacher by name or subject..."
                    value={teacherSearch}
                    onChange={e => setTeacherSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-surface-main border border-slate-200 rounded-xl outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Teachers Table */}
              <div className="overflow-x-auto">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Teacher Name</th>
                      <th>Designation</th>
                      <th>Subject / Method</th>
                      <th>Qualifications</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(teacherDept === 'bed' ? bedFaculty : deledFaculty)
                      .filter(t => t.name.toLowerCase().includes(teacherSearch.toLowerCase()) || t.subject.toLowerCase().includes(teacherSearch.toLowerCase()))
                      .map((teacher, index) => (
                        <tr key={teacher.slNo || index}>
                          <td>{index + 1}</td>
                          <td className="font-bold text-navy flex items-center gap-2">
                            <i className={`fa-solid ${teacher.avatar || 'fa-user-tie'} text-gold`}></i>
                            {teacher.name}
                          </td>
                          <td>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                              {teacher.designation}
                            </span>
                          </td>
                          <td className="font-semibold text-slate-700">{teacher.subject}</td>
                          <td className="text-xs text-slate-500">
                            {teacher.qualifications?.masterSubject} (B.Ed: {teacher.qualifications?.bEd})
                          </td>
                          <td>
                            <span className="badge-category badge-gen">{teacher.category}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditTeacher(teacher, teacherDept)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-gold-bg text-navy hover:text-gold-dark text-xs font-bold transition-all cursor-pointer"
                                title="Edit Teacher Details"
                              >
                                <i className="fa-solid fa-pen-to-square"></i> Edit
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmDelete({
                                    title: 'Delete Faculty Record',
                                    itemName: `${teacher.name} (${teacher.designation} - ${teacher.subject})`,
                                    itemType: 'Teacher',
                                    onConfirm: async () => {
                                      await deleteTeacher(teacher.slNo, teacherDept);
                                      showToast(`Teacher "${teacher.name}" removed from Database.`);
                                      setConfirmDelete(null);
                                    }
                                  });
                                }}
                                className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
                                title="Delete Teacher"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE STUDENTS */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                    <i className="fa-solid fa-user-graduate text-gold"></i>
                    <span>Admitted Trainees &amp; Student Roster</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage enrolled trainees with real-time automatic cloud database synchronization.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Auto-Sync Active</span>
                  </span>

                  <button
                    onClick={async () => {
                      showToast("Pushing all students to database...");
                      const res = await pushStudentsToSupabase();
                      showToast(res.message);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs shadow-md hover:bg-navy-dark transition-all flex items-center gap-2 cursor-pointer"
                    title="Double check and sync student records to cloud database"
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-gold"></i>
                    <span>Push to Database</span>
                  </button>

                  <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gold text-navy-dark font-extrabold text-xs shadow-md hover:bg-gold-light transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-user-plus"></i> + Add New Student
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full sm:w-80 relative">
                <i className="fa-solid fa-search absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Search by student name, ID or subject..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-surface-main border border-slate-200 rounded-xl outline-none focus:border-gold"
                />
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Application / Reg ID</th>
                      <th>Trainee Name</th>
                      <th>Method Subject</th>
                      <th>Category</th>
                      <th>Admission Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter(s => 
                        s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                        s.appId.toLowerCase().includes(studentSearch.toLowerCase()) ||
                        s.subject.toLowerCase().includes(studentSearch.toLowerCase())
                      )
                      .map((student, index) => (
                        <tr key={student.srNo}>
                          <td>{index + 1}</td>
                          <td className="font-mono text-xs font-bold text-navy">{student.appId}</td>
                          <td className="font-bold text-slate-800">{student.name}</td>
                          <td className="font-semibold text-slate-700">{student.subject}</td>
                          <td>
                            <span className="badge-category badge-gen">{student.category}</span>
                          </td>
                          <td>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {student.type}
                            </span>
                          </td>
                          <td>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditStudent(student)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-gold-bg text-navy hover:text-gold-dark text-xs font-bold transition-all cursor-pointer"
                                title="Edit Student Details"
                              >
                                <i className="fa-solid fa-pen-to-square"></i> Edit
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmDelete({
                                    title: 'Delete Student Record',
                                    itemName: `${student.name} (App ID: ${student.appId} - ${student.subject})`,
                                    itemType: 'Student',
                                    onConfirm: async () => {
                                      await deleteStudent(student.srNo);
                                      showToast(`Student "${student.name}" removed from Database.`);
                                      setConfirmDelete(null);
                                    }
                                  });
                                }}
                                className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
                                title="Delete Student"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NOTICE BOARD */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                    <i className="fa-solid fa-clipboard-list text-gold"></i>
                    <span>Official Institutional Notice Board</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage official circulars with real-time automatic cloud database synchronization.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Auto-Sync Active</span>
                  </span>

                  <button
                    onClick={async () => {
                      showToast("Pushing all notices to database...");
                      const res = await pushNoticesToSupabase();
                      showToast(res.message);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs shadow-md hover:bg-navy-dark transition-all flex items-center gap-2 cursor-pointer"
                    title="Double check and sync notice circulars to cloud database"
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-gold"></i>
                    <span>Push to Database</span>
                  </button>

                  <button
                    onClick={() => setShowAddNoticeModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gold text-navy-dark font-extrabold text-xs shadow-md hover:bg-gold-light transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-plus"></i> + Publish New Notice
                  </button>
                </div>
              </div>

              {/* Published Notices List */}
              <div className="overflow-x-auto">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subject</th>
                      <th>Notice Title</th>
                      <th>Date Issued</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map((notice, idx) => (
                      <tr key={notice.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <span className="badge-category badge-gen">{notice.subject || notice.badge || 'Notice'}</span>
                        </td>
                        <td>
                          <div className="font-bold text-slate-800">{notice.title}</div>
                          {notice.fileName && (
                            <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              <i className="fa-solid fa-paperclip text-emerald-600"></i>
                              <span>{notice.fileName} ({notice.fileSize || 'Attached'})</span>
                            </div>
                          )}
                        </td>
                        <td className="text-slate-500">{notice.date}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditNotice(notice)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-gold-bg text-navy hover:text-gold-dark text-xs font-bold transition-all cursor-pointer"
                              title="Edit Notice Details"
                            >
                              <i className="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button
                              onClick={() => {
                                setConfirmDelete({
                                  title: 'Delete Official Notice',
                                  itemName: notice.title,
                                  itemType: 'Notice',
                                  onConfirm: async () => {
                                    await deleteNotice(notice.id);
                                    showToast('Notice removed from Database.');
                                    setConfirmDelete(null);
                                  }
                                });
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
                              title="Delete Notice"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ANNOUNCEMENT BAR */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                    <i className="fa-solid fa-bullhorn text-gold"></i>
                    <span>Live Top Announcement Marquee Ticker</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Updates added here automatically update in database and scroll across the marquee ticker.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Auto-Sync Active</span>
                  </span>

                  <button
                    onClick={async () => {
                      showToast("Pushing all announcements to database...");
                      const res = await pushAnnouncementsToSupabase();
                      showToast(res.message);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs shadow-md hover:bg-navy-dark transition-all flex items-center gap-2 cursor-pointer"
                    title="Double check and sync marquee ticker announcements to cloud database"
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-gold"></i>
                    <span>Push to Database</span>
                  </button>
                </div>
              </div>

              {/* Add New Announcement Form */}
              <form onSubmit={handleCreateAnnouncement} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Enter high-priority announcement text (e.g. Admission portal open for session 2026–28)..."
                  value={newAnnouncementText}
                  onChange={e => setNewAnnouncementText(e.target.value)}
                  className="flex-grow px-4 py-3 text-sm bg-surface-main border border-slate-300 rounded-xl outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gold text-navy-dark font-extrabold text-sm shadow-md hover:bg-gold-light transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                >
                  <i className="fa-solid fa-plus"></i> Add to Ticker
                </button>
              </form>

              {/* Active Announcements List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Currently Active Announcements ({announcements.length})
                </h4>
                {announcements.map((item, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-surface-main border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 text-gold flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{item}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleOpenEditAnnouncement(index, item)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-gold-bg text-navy hover:text-gold-dark text-xs font-bold transition-all cursor-pointer"
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmDelete({
                            title: 'Remove Ticker Announcement',
                            itemName: item,
                            itemType: 'Announcement',
                            onConfirm: async () => {
                              await deleteAnnouncement(index);
                              showToast('Announcement removed from Database.');
                              setConfirmDelete(null);
                            }
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
                      >
                        <i className="fa-solid fa-trash-can"></i> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MANDATORY DISCLOSURE & PDF VAULT */}
        {activeTab === 'disclosure' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                    <i className="fa-solid fa-file-shield text-gold"></i>
                    <span>Mandatory Disclosure &amp; PDF Vault Manager</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage statutory NCTE orders, university affiliations, fire safety certificates, faculty rosters, and trainee lists.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Auto-Sync Active</span>
                  </span>

                  <button
                    onClick={() => setShowSqlModal(true)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    title="View SQL table creation script for Supabase"
                  >
                    <i className="fa-solid fa-database text-gold"></i>
                    <span>SQL Table Schema</span>
                  </button>

                  <button
                    onClick={handlePushDocs}
                    className="px-3.5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs shadow-md hover:bg-navy-dark transition-all flex items-center gap-2 cursor-pointer"
                    title="Double check and sync all mandatory disclosure documents to Supabase database"
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-gold"></i>
                    <span>Push to Database</span>
                  </button>

                  <button
                    onClick={() => setShowAddDocModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gold text-navy-dark font-extrabold text-xs shadow-md hover:bg-gold-light transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>+ Add Document</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="text"
                    placeholder="Search documents by title, order number, authority, or category..."
                    value={docSearch}
                    onChange={e => setDocSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-surface-main border border-slate-200 rounded-xl outline-none focus:border-gold"
                  />
                </div>
                {docSearch && (
                  <button
                    onClick={() => setDocSearch('')}
                    className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Table of Mandatory Documents */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0a2342] text-white text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4 text-center w-12 border-b border-navy-light/30">#</th>
                      <th className="py-3.5 px-5 border-b border-navy-light/30">Document Name &amp; Description</th>
                      <th className="py-3.5 px-5 border-b border-navy-light/30">Category</th>
                      <th className="py-3.5 px-5 border-b border-navy-light/30">Authority &amp; Order No</th>
                      <th className="py-3.5 px-5 border-b border-navy-light/30">File Size</th>
                      <th className="py-3.5 px-5 text-center w-48 border-b border-navy-light/30">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                    {mandatoryDocuments
                      .filter(d => {
                        if (!docSearch.trim()) return true;
                        const q = docSearch.toLowerCase();
                        return (
                          d.title.toLowerCase().includes(q) ||
                          (d.subtitle && d.subtitle.toLowerCase().includes(q)) ||
                          (d.orderNo && d.orderNo.toLowerCase().includes(q)) ||
                          (d.authority && d.authority.toLowerCase().includes(q)) ||
                          d.category.toLowerCase().includes(q)
                        );
                      })
                      .map((doc, idx) => (
                        <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4 text-center font-bold text-slate-900 text-sm">
                            {doc.srNo || idx + 1}
                          </td>
                          <td className="py-4 px-5">
                            <div>
                              <strong className="block text-[#0a2342] font-bold text-[13.5px] leading-tight">
                                {doc.title}
                              </strong>
                              {doc.subtitle && (
                                <span className="text-[11.5px] text-slate-500 block mt-1">
                                  {doc.subtitle}
                                </span>
                              )}
                              <span className="text-[11px] text-slate-400 font-mono block mt-0.5 truncate max-w-xs">
                                <i className="fa-solid fa-file-pdf text-red-500 mr-1"></i>
                                {doc.pdfPath}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wide uppercase ${
                                doc.categoryBadgeClass || getDocCategoryBadgeClass(doc.category)
                              }`}
                            >
                              {doc.category}
                            </span>
                          </td>
                          <td className="py-4 px-5">
                            <div className="space-y-0.5">
                              <span className="block font-medium text-slate-700">{doc.authority || 'SVCE Statutory'}</span>
                              {doc.orderNo && (
                                <span className="block font-mono text-[11px] text-slate-500 font-semibold">{doc.orderNo}</span>
                              )}
                              {doc.date && (
                                <span className="block text-[11px] text-gold font-bold">{doc.date}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-5 font-semibold text-slate-600 text-xs whitespace-nowrap">
                            {doc.fileSize || `${doc.pages || 1} Pages`}
                          </td>
                          <td className="py-4 px-5 text-center">
                            <div className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
                              {/* View */}
                              <button
                                type="button"
                                onClick={() => setPreviewingDoc(doc)}
                                className="px-2.5 py-1.5 rounded-lg bg-gold/15 text-gold-dark hover:bg-gold hover:text-navy-dark font-bold text-[11px] transition-all cursor-pointer"
                                title="View PDF Document"
                              >
                                <i className="fa-solid fa-eye"></i> View
                              </button>

                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditDoc(doc)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-bold text-[11px] transition-all cursor-pointer"
                                title="Edit Document Metadata"
                              >
                                <i className="fa-solid fa-pen-to-square"></i> Edit
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteDoc(doc)}
                                className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 font-bold text-[11px] transition-all cursor-pointer"
                                title="Delete Document"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD TEACHER */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-user-plus text-gold"></i> Add New Faculty Member
              </h3>
              <button onClick={() => setShowAddTeacherModal(false)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="p-6 space-y-4 overflow-y-auto flex-grow text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Department</label>
                  <select
                    value={teacherDept}
                    onChange={e => setTeacherDept(e.target.value as 'bed' | 'deled')}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-bold text-navy"
                  >
                    <option value="bed">B.Ed (Bachelor of Education)</option>
                    <option value="deled">D.El.Ed (Elementary Education)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Teacher Full Name *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.name}
                    onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    placeholder="e.g. Subhas Chandra Maity"
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Designation</label>
                  <select
                    value={teacherForm.designation}
                    onChange={e => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="Lecturer (Regular)">Lecturer (Regular)</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="HOD">Head of Department (HOD)</option>
                    <option value="Principal">Principal</option>
                    <option value="Librarian">Librarian</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Subject / Method *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.subject}
                    onChange={e => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                    placeholder="e.g. Mathematics, Bengali, Life Science"
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Master Subject &amp; Marks</label>
                  <input
                    type="text"
                    value={teacherForm.masterSubject}
                    onChange={e => setTeacherForm({ ...teacherForm, masterSubject: e.target.value })}
                    placeholder="e.g. M.Sc. Mathematics (64.50%)"
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Category</label>
                  <select
                    value={teacherForm.category}
                    onChange={e => setTeacherForm({ ...teacherForm, category: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="General">General</option>
                    <option value="OBC-A">OBC-A</option>
                    <option value="OBC-B">OBC-B</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">B.Ed Qualification</label>
                  <input
                    type="text"
                    value={teacherForm.bEd}
                    onChange={e => setTeacherForm({ ...teacherForm, bEd: e.target.value })}
                    placeholder="Yes (65%)"
                    className="w-full p-2 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">M.Ed Qualification</label>
                  <input
                    type="text"
                    value={teacherForm.mEd}
                    onChange={e => setTeacherForm({ ...teacherForm, mEd: e.target.value })}
                    placeholder="Yes (60%)"
                    className="w-full p-2 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Total Experience</label>
                  <input
                    type="text"
                    value={teacherForm.experience}
                    onChange={e => setTeacherForm({ ...teacherForm, experience: e.target.value })}
                    placeholder="e.g. 5 Years"
                    className="w-full p-2 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Teacher Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1B: EDIT TEACHER */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-user-pen text-gold"></i> Edit Faculty Member ({editingTeacher.dept.toUpperCase()})
              </h3>
              <button onClick={() => setEditingTeacher(null)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEditTeacher} className="p-6 space-y-4 overflow-y-auto flex-grow text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Teacher Name *</label>
                  <input
                    type="text"
                    required
                    value={editTeacherForm.name}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, name: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Designation</label>
                  <select
                    value={editTeacherForm.designation}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, designation: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="Lecturer (Regular)">Lecturer (Regular)</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="HOD">Head of Department (HOD)</option>
                    <option value="Principal">Principal</option>
                    <option value="Librarian">Librarian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Subject / Method *</label>
                  <input
                    type="text"
                    required
                    value={editTeacherForm.subject}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, subject: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Master Subject &amp; Marks</label>
                  <input
                    type="text"
                    value={editTeacherForm.masterSubject}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, masterSubject: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Category</label>
                  <select
                    value={editTeacherForm.category}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, category: e.target.value })}
                    className="w-full p-2 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="General">General</option>
                    <option value="OBC-A">OBC-A</option>
                    <option value="OBC-B">OBC-B</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">B.Ed Qualification</label>
                  <input
                    type="text"
                    value={editTeacherForm.bEd}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, bEd: e.target.value })}
                    className="w-full p-2 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">M.Ed Qualification</label>
                  <input
                    type="text"
                    value={editTeacherForm.mEd}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, mEd: e.target.value })}
                    className="w-full p-2 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Total Experience</label>
                  <input
                    type="text"
                    value={editTeacherForm.experience}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, experience: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Date of Joining</label>
                  <input
                    type="text"
                    value={editTeacherForm.joiningDate}
                    onChange={e => setEditTeacherForm({ ...editTeacherForm, joiningDate: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Changes to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD STUDENT */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-graduation-cap text-gold"></i> Register New Trainee
              </h3>
              <button onClick={() => setShowAddStudentModal(false)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Trainee Full Name *</label>
                <input
                  type="text"
                  required
                  value={studentForm.name}
                  onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                  placeholder="e.g. Ananya Sen"
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Application / Admission ID *</label>
                <input
                  type="text"
                  required
                  value={studentForm.appId}
                  onChange={e => setStudentForm({ ...studentForm, appId: e.target.value })}
                  placeholder="ADM/BED/2025-27/000051"
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Method Subject</label>
                  <select
                    value={studentForm.subject}
                    onChange={e => setStudentForm({ ...studentForm, subject: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="Bengali">Bengali</option>
                    <option value="English">English</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Life Science">Life Science</option>
                    <option value="Physical Science">Physical Science</option>
                    <option value="Sanskrit">Sanskrit</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Category</label>
                  <select
                    value={studentForm.category}
                    onChange={e => setStudentForm({ ...studentForm, category: e.target.value as 'GEN' | 'SC' | 'ST' | 'OBC-A' | 'OBC-B' })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="GEN">GEN (General)</option>
                    <option value="OBC-A">OBC-A</option>
                    <option value="OBC-B">OBC-B</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2B: EDIT STUDENT */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-user-pen text-gold"></i> Edit Trainee Record
              </h3>
              <button onClick={() => setEditingStudent(null)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Trainee Name *</label>
                <input
                  type="text"
                  required
                  value={editStudentForm.name}
                  onChange={e => setEditStudentForm({ ...editStudentForm, name: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Admission ID *</label>
                <input
                  type="text"
                  required
                  value={editStudentForm.appId}
                  onChange={e => setEditStudentForm({ ...editStudentForm, appId: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-mono text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Method Subject</label>
                  <select
                    value={editStudentForm.subject}
                    onChange={e => setEditStudentForm({ ...editStudentForm, subject: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="Bengali">Bengali</option>
                    <option value="English">English</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Life Science">Life Science</option>
                    <option value="Physical Science">Physical Science</option>
                    <option value="Sanskrit">Sanskrit</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Category</label>
                  <select
                    value={editStudentForm.category}
                    onChange={e => setEditStudentForm({ ...editStudentForm, category: e.target.value as 'GEN' | 'SC' | 'ST' | 'OBC-A' | 'OBC-B' })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  >
                    <option value="GEN">GEN (General)</option>
                    <option value="OBC-A">OBC-A</option>
                    <option value="OBC-B">OBC-B</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Changes to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NOTICE */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-clipboard-list text-gold"></i> Publish Institutional Notice
              </h3>
              <button onClick={() => setShowAddNoticeModal(false)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Admission 2026–28, B.Ed Examination, Holiday Notice, NCTE Compliance..."
                  value={noticeForm.subject}
                  onChange={e => setNoticeForm({ ...noticeForm, subject: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Notice Title / Announcement *</label>
                <textarea
                  required
                  rows={3}
                  value={noticeForm.title}
                  onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  placeholder="e.g. Schedule for B.Ed 1st Semester Internal Assessment & Practical Examination..."
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-navy">Issue Date *</label>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
                    <i className="fa-regular fa-calendar-check text-gold-dark"></i>
                    <span>{noticeForm.date || formatNoticeDate(toIsoDateString(noticeForm.date))}</span>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={toIsoDateString(noticeForm.date)}
                    onChange={e => {
                      const val = e.target.value;
                      setNoticeForm({ ...noticeForm, date: formatNoticeDate(val) });
                    }}
                    className="w-full p-2.5 pl-10 bg-surface-main border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 cursor-pointer focus:border-gold focus:outline-none"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-dark pointer-events-none text-sm">
                    <i className="fa-solid fa-calendar-days"></i>
                  </div>
                </div>
              </div>

              {/* File Attachment Upload (PDF, Word, Excel, CSV, Images, etc.) */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-dashed border-slate-300 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-navy text-xs flex items-center gap-1.5">
                    <i className="fa-solid fa-paperclip text-gold"></i>
                    <span>Attach File / Document (Optional)</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    PDF, Word, Excel, CSV, JPG, PNG
                  </span>
                </div>

                {noticeForm.fileName ? (
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-300 text-xs shadow-sm">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        <i className="fa-solid fa-file-circle-check"></i>
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-800 truncate">{noticeForm.fileName}</div>
                        <div className="text-[10px] text-slate-400">{noticeForm.fileSize} • Ready to Publish</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNoticeForm({ ...noticeForm, fileUrl: '', fileName: '', fileType: '', fileSize: '' })}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors text-xs font-bold cursor-pointer flex-shrink-0"
                      title="Remove Attachment"
                    >
                      <i className="fa-solid fa-xmark mr-1"></i> Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 bg-white hover:bg-gold-bg/30 border border-slate-200 hover:border-gold rounded-xl cursor-pointer transition-all text-center group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.txt,.zip,application/*,image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, false);
                      }}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-gold/20 text-slate-500 group-hover:text-gold-dark flex items-center justify-center text-lg mb-1.5 transition-colors">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <span className="text-xs font-bold text-navy group-hover:text-gold-dark">
                      Click to Upload PDF, Word, Excel, CSV or Image
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Supports all file formats (.pdf, .doc, .docx, .xls, .xlsx, .csv, .jpg, .png)
                    </span>
                  </label>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3B: EDIT NOTICE */}
      {editingNotice && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-pen-to-square text-gold"></i> Edit Institutional Notice
              </h3>
              <button onClick={() => setEditingNotice(null)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEditNotice} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Admission 2026–28, B.Ed Examination, Holiday Notice, NCTE Compliance..."
                  value={editNoticeForm.subject}
                  onChange={e => setEditNoticeForm({ ...editNoticeForm, subject: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Notice Title / Announcement *</label>
                <textarea
                  required
                  rows={3}
                  value={editNoticeForm.title}
                  onChange={e => setEditNoticeForm({ ...editNoticeForm, title: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-navy">Issue Date *</label>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
                    <i className="fa-regular fa-calendar-check text-gold-dark"></i>
                    <span>{editNoticeForm.date || formatNoticeDate(toIsoDateString(editNoticeForm.date))}</span>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={toIsoDateString(editNoticeForm.date)}
                    onChange={e => {
                      const val = e.target.value;
                      setEditNoticeForm({ ...editNoticeForm, date: formatNoticeDate(val) });
                    }}
                    className="w-full p-2.5 pl-10 bg-surface-main border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 cursor-pointer focus:border-gold focus:outline-none"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-dark pointer-events-none text-sm">
                    <i className="fa-solid fa-calendar-days"></i>
                  </div>
                </div>
              </div>

              {/* Edit Notice File Attachment Upload */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-dashed border-slate-300 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-navy text-xs flex items-center gap-1.5">
                    <i className="fa-solid fa-paperclip text-gold"></i>
                    <span>Attached Document / File</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    PDF, Word, Excel, CSV, Images
                  </span>
                </div>

                {editNoticeForm.fileName ? (
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-300 text-xs shadow-sm">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        <i className="fa-solid fa-file-circle-check"></i>
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-800 truncate">{editNoticeForm.fileName}</div>
                        <div className="text-[10px] text-slate-400">{editNoticeForm.fileSize || 'Attached'}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditNoticeForm({ ...editNoticeForm, fileUrl: '', fileName: '', fileType: '', fileSize: '' })}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors text-xs font-bold cursor-pointer flex-shrink-0"
                      title="Remove Attachment"
                    >
                      <i className="fa-solid fa-xmark mr-1"></i> Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 bg-white hover:bg-gold-bg/30 border border-slate-200 hover:border-gold rounded-xl cursor-pointer transition-all text-center group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.txt,.zip,application/*,image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, true);
                      }}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-gold/20 text-slate-500 group-hover:text-gold-dark flex items-center justify-center text-lg mb-1.5 transition-colors">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <span className="text-xs font-bold text-navy group-hover:text-gold-dark">
                      Click to Upload or Replace Document
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Supports PDF, Word, Excel, CSV, JPEG, JPG, PNG
                    </span>
                  </label>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Changes to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: EDIT ANNOUNCEMENT */}
      {editingAnnouncement && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-pen-to-square text-gold"></i> Edit Marquee Announcement
              </h3>
              <button onClick={() => setEditingAnnouncement(null)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEditAnnouncement} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Announcement Text *</label>
                <textarea
                  required
                  rows={3}
                  value={editAnnouncementText}
                  onChange={e => setEditAnnouncementText(e.target.value)}
                  className="w-full p-3 bg-surface-main border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAnnouncement(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Headline to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD MANDATORY DISCLOSURE DOCUMENT */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-file-shield text-gold"></i> Add Mandatory Disclosure Document
              </h3>
              <button onClick={() => setShowAddDocModal(false)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateDoc} className="p-6 space-y-4 overflow-y-auto flex-grow text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Ed NCTE Recognition Order Copy"
                  value={docForm.title}
                  onChange={e => setDocForm({ ...docForm, title: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Subtitle / Memo Particulars</label>
                <input
                  type="text"
                  placeholder="e.g. ERCAPP3967 • Order No: F.No.234.2.1/APP3967/52099"
                  value={docForm.subtitle}
                  onChange={e => setDocForm({ ...docForm, subtitle: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Category / Governing Body *</label>
                  <select
                    value={docForm.category}
                    onChange={e => setDocForm({ ...docForm, category: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-bold text-navy"
                  >
                    <option value="NCTE RECOGNITION">NCTE RECOGNITION</option>
                    <option value="UNIVERSITY AFFILIATION">UNIVERSITY AFFILIATION</option>
                    <option value="STATE BOARD AFFILIATION">STATE BOARD AFFILIATION</option>
                    <option value="UNIVERSITY NOC">UNIVERSITY NOC</option>
                    <option value="STATUTORY SAFETY">STATUTORY SAFETY</option>
                    <option value="FACULTY ROSTER">FACULTY ROSTER</option>
                    <option value="STUDENT ADMISSIONS">STUDENT ADMISSIONS</option>
                    <option value="TRUST & LAND DEED">TRUST &amp; LAND DEED</option>
                    <option value="INFRASTRUCTURE & PLAN">INFRASTRUCTURE &amp; PLAN</option>
                    <option value="STATUTORY COMPLIANCE">STATUTORY COMPLIANCE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">File Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 810 KB or 3.0 MB"
                    value={docForm.fileSize}
                    onChange={e => setDocForm({ ...docForm, fileSize: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    placeholder="e.g. Eastern Regional Committee, NCTE Bhubaneswar"
                    value={docForm.authority}
                    onChange={e => setDocForm({ ...docForm, authority: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Order / Memo Number</label>
                  <input
                    type="text"
                    placeholder="e.g. F.No.234.2.1/APP3967/52099"
                    value={docForm.orderNo}
                    onChange={e => setDocForm({ ...docForm, orderNo: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Notification Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 04/04/2017 or 2025"
                    value={docForm.date}
                    onChange={e => setDocForm({ ...docForm, date: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Total Pages</label>
                  <input
                    type="number"
                    min={1}
                    value={docForm.pages}
                    onChange={e => setDocForm({ ...docForm, pages: parseInt(e.target.value, 10) || 1 })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* PDF File Path / Upload */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block font-bold text-navy">PDF File Source / Path *</label>
                
                {/* Preset Selector */}
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Select from existing PDF files:</span>
                  <select
                    value={docForm.pdfPath}
                    onChange={e => setDocForm({ ...docForm, pdfPath: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-[11px]"
                  >
                    <option value="assets/pdf/B.ED . RECOGNISED COPY.pdf">assets/pdf/B.ED . RECOGNISED COPY.pdf (791 KB)</option>
                    <option value="assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf">assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf (113 KB)</option>
                    <option value="assets/pdf/B.ED. AFFILIATION COPY 2025 - 2026.pdf">assets/pdf/B.ED. AFFILIATION COPY 2025 - 2026.pdf (829 KB)</option>
                    <option value="assets/pdf/D.EL.ED AFFILIATION COPY.pdf">assets/pdf/D.EL.ED AFFILIATION COPY.pdf (177 KB)</option>
                    <option value="assets/pdf/NOC  FOR B.ED..pdf">assets/pdf/NOC  FOR B.ED..pdf (65 KB)</option>
                    <option value="assets/pdf/FIRE CERTIFICATE.pdf">assets/pdf/FIRE CERTIFICATE.pdf (452 KB)</option>
                    <option value="assets/pdf/B. Ed teacher list.pdf">assets/pdf/B. Ed teacher list.pdf (2.98 MB)</option>
                    <option value="assets/pdf/D.EL.ED Teacher list.pdf">assets/pdf/D.EL.ED Teacher list.pdf (2.43 MB)</option>
                    <option value="assets/pdf/STUDENT LIST  B.ED 2025-2027.pdf">assets/pdf/STUDENT LIST  B.ED 2025-2027.pdf (166 KB)</option>
                  </select>
                </div>

                {/* Upload or Custom Input */}
                <div className="pt-1">
                  <span className="text-[11px] text-slate-500 block mb-1">Or upload PDF from your computer:</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const sizeKb = Math.round(file.size / 1024);
                        const formattedSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
                        const reader = new FileReader();
                        reader.onload = (loadEvt) => {
                          const dataUrl = loadEvt.target?.result as string;
                          setDocForm(prev => ({
                            ...prev,
                            pdfPath: dataUrl || `assets/pdf/${file.name}`,
                            fileSize: formattedSize,
                            title: prev.title || file.name.replace(/\.pdf$/i, '')
                          }));
                          showToast(`File "${file.name}" loaded (${formattedSize})`);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-[11px] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-navy file:text-white hover:file:bg-navy-dark cursor-pointer"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Custom File Path / URL:</span>
                  <input
                    type="text"
                    required
                    value={docForm.pdfPath}
                    onChange={e => setDocForm({ ...docForm, pdfPath: e.target.value })}
                    placeholder="assets/pdf/..."
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save to Database &amp; Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5B: EDIT MANDATORY DISCLOSURE DOCUMENT */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-primary-gradient p-6 text-white flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-pen-to-square text-gold"></i> Edit Mandatory Disclosure Document
              </h3>
              <button onClick={() => setEditingDoc(null)} className="text-white/80 hover:text-white text-xl cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEditDoc} className="p-6 space-y-4 overflow-y-auto flex-grow text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={editDocForm.title}
                  onChange={e => setEditDocForm({ ...editDocForm, title: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Subtitle / Memo Particulars</label>
                <input
                  type="text"
                  value={editDocForm.subtitle}
                  onChange={e => setEditDocForm({ ...editDocForm, subtitle: e.target.value })}
                  className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Category / Governing Body *</label>
                  <select
                    value={editDocForm.category}
                    onChange={e => setEditDocForm({ ...editDocForm, category: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-bold text-navy"
                  >
                    <option value="NCTE RECOGNITION">NCTE RECOGNITION</option>
                    <option value="UNIVERSITY AFFILIATION">UNIVERSITY AFFILIATION</option>
                    <option value="STATE BOARD AFFILIATION">STATE BOARD AFFILIATION</option>
                    <option value="UNIVERSITY NOC">UNIVERSITY NOC</option>
                    <option value="STATUTORY SAFETY">STATUTORY SAFETY</option>
                    <option value="FACULTY ROSTER">FACULTY ROSTER</option>
                    <option value="STUDENT ADMISSIONS">STUDENT ADMISSIONS</option>
                    <option value="TRUST & LAND DEED">TRUST &amp; LAND DEED</option>
                    <option value="INFRASTRUCTURE & PLAN">INFRASTRUCTURE &amp; PLAN</option>
                    <option value="STATUTORY COMPLIANCE">STATUTORY COMPLIANCE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">File Size</label>
                  <input
                    type="text"
                    value={editDocForm.fileSize}
                    onChange={e => setEditDocForm({ ...editDocForm, fileSize: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    value={editDocForm.authority}
                    onChange={e => setEditDocForm({ ...editDocForm, authority: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Order / Memo Number</label>
                  <input
                    type="text"
                    value={editDocForm.orderNo}
                    onChange={e => setEditDocForm({ ...editDocForm, orderNo: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Notification Date</label>
                  <input
                    type="text"
                    value={editDocForm.date}
                    onChange={e => setEditDocForm({ ...editDocForm, date: e.target.value })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Total Pages</label>
                  <input
                    type="number"
                    min={1}
                    value={editDocForm.pages}
                    onChange={e => setEditDocForm({ ...editDocForm, pages: parseInt(e.target.value, 10) || 1 })}
                    className="w-full p-2.5 bg-surface-main border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* PDF File Path / Upload */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block font-bold text-navy">PDF File Source / Path *</label>
                
                {/* Preset Selector */}
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Select from existing PDF files:</span>
                  <select
                    value={editDocForm.pdfPath}
                    onChange={e => setEditDocForm({ ...editDocForm, pdfPath: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-[11px]"
                  >
                    <option value="assets/pdf/B.ED . RECOGNISED COPY.pdf">assets/pdf/B.ED . RECOGNISED COPY.pdf (791 KB)</option>
                    <option value="assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf">assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf (113 KB)</option>
                    <option value="assets/pdf/B.ED. AFFILIATION COPY 2025 - 2026.pdf">assets/pdf/B.ED. AFFILIATION COPY 2025 - 2026.pdf (829 KB)</option>
                    <option value="assets/pdf/D.EL.ED AFFILIATION COPY.pdf">assets/pdf/D.EL.ED AFFILIATION COPY.pdf (177 KB)</option>
                    <option value="assets/pdf/NOC  FOR B.ED..pdf">assets/pdf/NOC  FOR B.ED..pdf (65 KB)</option>
                    <option value="assets/pdf/FIRE CERTIFICATE.pdf">assets/pdf/FIRE CERTIFICATE.pdf (452 KB)</option>
                    <option value="assets/pdf/B. Ed teacher list.pdf">assets/pdf/B. Ed teacher list.pdf (2.98 MB)</option>
                    <option value="assets/pdf/D.EL.ED Teacher list.pdf">assets/pdf/D.EL.ED Teacher list.pdf (2.43 MB)</option>
                    <option value="assets/pdf/STUDENT LIST  B.ED 2025-2027.pdf">assets/pdf/STUDENT LIST  B.ED 2025-2027.pdf (166 KB)</option>
                  </select>
                </div>

                {/* Upload from computer */}
                <div className="pt-1">
                  <span className="text-[11px] text-slate-500 block mb-1">Or upload replacement PDF:</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const sizeKb = Math.round(file.size / 1024);
                        const formattedSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
                        const reader = new FileReader();
                        reader.onload = (loadEvt) => {
                          const dataUrl = loadEvt.target?.result as string;
                          setEditDocForm(prev => ({
                            ...prev,
                            pdfPath: dataUrl || `assets/pdf/${file.name}`,
                            fileSize: formattedSize
                          }));
                          showToast(`Replacement file "${file.name}" loaded (${formattedSize})`);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-[11px] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-navy file:text-white hover:file:bg-navy-dark cursor-pointer"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Custom File Path / URL:</span>
                  <input
                    type="text"
                    required
                    value={editDocForm.pdfPath}
                    onChange={e => setEditDocForm({ ...editDocForm, pdfPath: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Changes to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5C: PDF LIGHTBOX PREVIEW */}
      {previewingDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-navy-dark/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setPreviewingDoc(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 sm:px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center text-lg flex-shrink-0">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-white text-sm sm:text-base truncate">
                    {previewingDoc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="font-semibold text-gold-light">{previewingDoc.category}</span>
                    <span>•</span>
                    <span>{previewingDoc.fileSize || 'PDF Document'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <a
                  href={previewingDoc.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <a
                  href={previewingDoc.pdfPath}
                  download
                  className="bg-[#f27a1a] hover:bg-[#e06c10] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <i className="fa-solid fa-download text-[11px]"></i>
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewingDoc(null)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-base transition-colors"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            {/* Viewer Iframe */}
            <div className="flex-1 bg-slate-900 p-2 sm:p-4 overflow-hidden relative">
              <iframe
                src={`${previewingDoc.pdfPath}#toolbar=1&navpanes=0`}
                title={previewingDoc.title}
                className="w-full h-full rounded-xl border border-slate-800 bg-white"
              />
            </div>
          </div>
        </div>
      )}


      {/* CONFIRM DELETE MODAL DIALOG */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-navy-dark/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-7 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center text-2xl mx-auto shadow-sm">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-heading font-extrabold text-navy text-lg sm:text-xl">
                {confirmDelete.title || 'Confirm Delete'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Are you sure you want to permanently delete this {confirmDelete.itemType.toLowerCase()}? This will update the database immediately.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 text-left line-clamp-3">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">{confirmDelete.itemType} Details:</div>
              {confirmDelete.itemName}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete.onConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-trash-can"></i>
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SQL SETUP MODAL */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-navy-dark/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center text-lg">
                  <i className="fa-solid fa-database"></i>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base">Supabase SQL Table Schema</h3>
                  <p className="text-[11px] text-slate-400">Run this query once in your Supabase SQL Editor</p>
                </div>
              </div>
              <button onClick={() => setShowSqlModal(false)} className="text-slate-400 hover:text-white text-xl">
                &times;
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 relative">
                <pre className="text-gold-light font-mono text-[11px] leading-relaxed whitespace-pre-wrap overflow-x-auto">
{`-- 1. Create Mandatory Disclosure Table
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

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.mandatory_disclosure ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Access Policies
DROP POLICY IF EXISTS "Allow public read mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public read mandatory_disclosure" ON public.mandatory_disclosure FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public insert mandatory_disclosure" ON public.mandatory_disclosure FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public update mandatory_disclosure" ON public.mandatory_disclosure FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete mandatory_disclosure" ON public.mandatory_disclosure;
CREATE POLICY "Allow public delete mandatory_disclosure" ON public.mandatory_disclosure FOR DELETE USING (true);`}
                </pre>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-[11.5px] space-y-1">
                <strong><i className="fa-solid fa-lightbulb text-gold mr-1"></i> Quick Setup Steps:</strong>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-300">
                  <li>Click <strong>Copy SQL Query</strong> below.</li>
                  <li>Open your <strong>Supabase Dashboard → SQL Editor</strong>.</li>
                  <li>Paste the query and click <strong>Run</strong>.</li>
                  <li>Return here and click <strong>Push to Database</strong> to sync all 9 documents!</li>
                </ol>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const sqlText = `CREATE TABLE IF NOT EXISTS public.mandatory_disclosure (
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
CREATE POLICY "Allow public delete mandatory_disclosure" ON public.mandatory_disclosure FOR DELETE USING (true);`;
                  navigator.clipboard.writeText(sqlText);
                  showToast('SQL Query copied to clipboard!');
                }}
                className="px-5 py-2 rounded-xl bg-[#f27a1a] hover:bg-[#e06c10] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <i className="fa-solid fa-copy"></i>
                <span>Copy SQL Query</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
