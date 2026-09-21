import React, { useState, useMemo } from 'react';
import { COLLEGE_DATA } from '../data/svceData';
import { useData } from '../context/DataContext';
import { Notice } from '../types';

interface NoticesProps {
  onNavigate: (page: string) => void;
}

export const Notices: React.FC<NoticesProps> = ({ onNavigate }) => {
  const { notices } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [viewingAttachment, setViewingAttachment] = useState<Notice | null>(null);

  // Extract unique subjects
  const subjects = useMemo(() => {
    const subs = new Set(notices.map(n => n.subject || n.badge || 'General'));
    return ['ALL', ...Array.from(subs)];
  }, [notices]);

  // Filter notices
  const filteredNotices = useMemo(() => {
    return notices.filter(notice => {
      const noticeSub = notice.subject || notice.badge || 'General';
      const matchesSearch = 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticeSub.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (notice.fileName && notice.fileName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        notice.date.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = categoryFilter === 'ALL' || noticeSub === categoryFilter;

      return matchesSearch && matchesSubject;
    });
  }, [notices, searchTerm, categoryFilter]);

  const getSubjectClass = (subjectStr?: string) => {
    const s = (subjectStr || '').toLowerCase();
    if (s.includes('academic') || s.includes('exam')) return 'bg-sky-100 text-sky-800 border-sky-300';
    if (s.includes('admission') || s.includes('counsel')) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (s.includes('compliance') || s.includes('ncte')) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (s.includes('holiday') || s.includes('urgent')) return 'bg-rose-100 text-rose-800 border-rose-300';
    if (s.includes('intern') || s.includes('practicum') || s.includes('student')) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-slate-100 text-slate-800 border-slate-300';
  };

  const getFileIcon = (fileName?: string) => {
    if (!fileName) return { icon: 'fa-solid fa-paperclip', color: 'text-slate-600', bg: 'bg-slate-100' };
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (['pdf'].includes(ext)) {
      return { icon: 'fa-solid fa-file-pdf', color: 'text-red-600', bg: 'bg-red-50' };
    }
    if (['doc', 'docx'].includes(ext)) {
      return { icon: 'fa-solid fa-file-word', color: 'text-blue-600', bg: 'bg-blue-50' };
    }
    if (['xls', 'xlsx', 'csv'].includes(ext)) {
      return { icon: 'fa-solid fa-file-excel', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    }
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) {
      return { icon: 'fa-solid fa-file-image', color: 'text-purple-600', bg: 'bg-purple-50' };
    }
    return { icon: 'fa-solid fa-file-lines', color: 'text-amber-600', bg: 'bg-amber-50' };
  };

  const isImageFile = (fileName?: string) => {
    if (!fileName) return false;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext);
  };

  const isPdfFile = (fileName?: string) => {
    if (!fileName) return false;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return ext === 'pdf';
  };

  return (
    <div>
      {/* Page Header Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline cursor-pointer">Home</button>
            <span>/</span>
            <span>Official Notice Board</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold flex items-center gap-3">
                <i className="fa-solid fa-clipboard-list text-gold"></i>
                Official Institutional Notice Board
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1.5 max-w-2xl">
                Real-time official circulars, admission bulletins, examination notifications &amp; academic schedules for {COLLEGE_DATA.name}.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-gold-light/40 text-gold-light text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {notices.length} Live Circulars
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-10 bg-surface-main min-h-[600px]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6">

          {/* Institutional Compliance Notice Strip */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-bg text-gold-dark flex items-center justify-center text-lg flex-shrink-0">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <div>
                <h2 className="font-bold text-navy text-sm sm:text-base">Notice &amp; Circular Bulletin</h2>
                <p className="text-xs text-slate-500">
                  Approved by {COLLEGE_DATA.name} Academic Council • Affiliated to BSAEU &amp; WBBPE
                </p>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Search notices by title, document name, date or keywords..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-main border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-gold transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Subject Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-slate-400 uppercase mr-1 whitespace-nowrap">Subject:</span>
                {subjects.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setCategoryFilter(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      categoryFilter === sub
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sub === 'ALL' ? 'All Subjects' : sub}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Notices Grid / Feed */}
          {filteredNotices.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                <i className="fa-solid fa-clipboard-question"></i>
              </div>
              <h3 className="font-heading font-bold text-navy text-lg">No notices match your filter</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try clearing your search query or selecting "All Notices" to view the complete institutional archive.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setCategoryFilter('ALL'); }}
                className="btn-gold text-xs px-4 py-2"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice, idx) => {
                const fileInfo = getFileIcon(notice.fileName);
                return (
                  <div
                    key={notice.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-gold transition-all duration-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {/* Date Badge */}
                      <div className="w-14 h-14 rounded-2xl bg-navy text-white flex flex-col items-center justify-center flex-shrink-0 text-center shadow-sm">
                        <span className="text-[10px] font-bold text-gold uppercase leading-none">NOTICE</span>
                        <span className="text-sm font-extrabold mt-0.5">#{notice.id}</span>
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getSubjectClass(notice.subject || notice.badge)}`}>
                            {notice.subject || notice.badge}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <i className="fa-regular fa-calendar-days text-slate-400"></i>
                            {notice.date}
                          </span>
                          {idx === 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-200 uppercase animate-pulse">
                              Latest
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading font-bold text-navy text-base sm:text-lg group-hover:text-gold-dark transition-colors leading-snug">
                          {notice.title}
                        </h3>

                        {/* File Attachment Direct View Pill */}
                        {notice.fileName && notice.fileUrl && (
                          <div className="pt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewingAttachment(notice);
                              }}
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${fileInfo.bg} border border-slate-200 hover:border-gold text-slate-800 text-xs font-semibold hover:shadow-sm transition-all cursor-pointer group/pill`}
                              title="Click to Open Notice Attachment Only"
                            >
                              <i className={`${fileInfo.icon} ${fileInfo.color} text-sm`}></i>
                              <span className="font-bold truncate max-w-[200px] sm:max-w-xs">{notice.fileName}</span>
                              {notice.fileSize && (
                                <span className="text-[10px] text-slate-400">({notice.fileSize})</span>
                              )}
                              <span className="text-[11px] text-navy group-hover/pill:text-gold-dark font-bold flex items-center gap-1 ml-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                                <i className="fa-solid fa-eye text-gold-dark text-[10px]"></i> View File
                              </span>
                            </button>
                          </div>
                        )}

                        <p className="text-xs text-slate-500">
                          Institutional Authority: Office of the Principal / Secretary, SVCE
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-stretch md:self-center justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 flex-wrap">
                      <button
                        onClick={() => setSelectedNotice(notice)}
                        className="px-4 py-2 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <i className="fa-solid fa-eye text-gold"></i>
                        <span>View Notice</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          window.print();
                        }}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        title="Print / Save Document"
                      >
                        <i className="fa-solid fa-print text-navy"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Notice Detail & Attachment Viewer Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-navy-dark/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-primary-gradient p-5 sm:p-6 text-white flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-gold-light flex items-center justify-center">
                  <i className="fa-solid fa-file-lines text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg">Official Institutional Notice</h3>
                  <p className="text-[11px] text-slate-300">Swami Vibekananda College of Education</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNotice(null)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl cursor-pointer leading-none transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs sm:text-sm overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSubjectClass(selectedNotice.subject || selectedNotice.badge)}`}>
                  {selectedNotice.subject || selectedNotice.badge}
                </span>
                <span className="text-slate-600 font-semibold text-xs flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                  <i className="fa-regular fa-calendar-days text-gold-dark"></i>
                  {selectedNotice.date}
                </span>
              </div>

              <div className="bg-surface-main p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Notice Announcement</span>
                <p className="font-bold text-navy text-base sm:text-lg leading-relaxed">
                  {selectedNotice.title}
                </p>
              </div>

              {/* Attached Document In-App Viewer Section */}
              {selectedNotice.fileName && selectedNotice.fileUrl && (
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                      <i className="fa-solid fa-paperclip text-gold"></i> Attached Document / File
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {selectedNotice.fileSize || 'Attachment'}
                      </span>
                      <button
                        type="button"
                        onClick={() => window.open(selectedNotice.fileUrl, '_blank')}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-gold text-navy text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:bg-gold-bg transition-all cursor-pointer"
                        title="Open attachment in full browser tab"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-gold-dark"></i>
                        <span>Open in New Tab</span>
                      </button>
                    </div>
                  </div>

                  {/* Document Header Bar */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${getFileIcon(selectedNotice.fileName).bg} flex items-center justify-center text-lg flex-shrink-0`}>
                      <i className={`${getFileIcon(selectedNotice.fileName).icon} ${getFileIcon(selectedNotice.fileName).color}`}></i>
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-navy text-sm truncate">{selectedNotice.fileName}</div>
                      <div className="text-xs text-slate-400">Viewing attached file directly</div>
                    </div>
                  </div>

                  {/* Inline Image Viewer */}
                  {isImageFile(selectedNotice.fileName) && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900/5 p-2 flex flex-col items-center justify-center">
                      <img
                        src={selectedNotice.fileUrl}
                        alt={selectedNotice.fileName}
                        className="max-h-[500px] w-auto max-w-full object-contain rounded-xl shadow-sm hover:scale-[1.01] transition-transform"
                      />
                    </div>
                  )}

                  {/* Inline PDF Viewer */}
                  {isPdfFile(selectedNotice.fileName) && (
                    <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-sm bg-slate-100">
                      <iframe
                        src={selectedNotice.fileUrl}
                        title={selectedNotice.fileName}
                        className="w-full h-[480px] rounded-2xl border-none"
                      />
                    </div>
                  )}

                  {/* Other file types viewer fallback */}
                  {!isImageFile(selectedNotice.fileName) && !isPdfFile(selectedNotice.fileName) && (
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-gold-bg text-gold-dark flex items-center justify-center text-xl mx-auto">
                        <i className={getFileIcon(selectedNotice.fileName).icon}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-sm">{selectedNotice.fileName}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Click below to view this document in your browser
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => window.open(selectedNotice.fileUrl, '_blank')}
                        className="btn-gold text-xs px-4 py-2"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square mr-1.5"></i>
                        View Document
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="text-slate-600 text-xs leading-relaxed space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="font-bold text-navy flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-info text-gold"></i> Institutional Instructions:
                </div>
                <p>
                  All concerned faculty members, staff, and enrolled students are hereby instructed to take notice of the above circular and comply with the mentioned guidelines.
                </p>
                <div className="pt-2 text-[11px] text-slate-500">
                  Issued under the authority of the Governing Body, Swami Vibekananda College of Education.
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSelectedNotice(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer text-xs"
                >
                  Close
                </button>
                {selectedNotice.fileUrl && (
                  <>
                    <button
                      type="button"
                      onClick={() => window.open(selectedNotice.fileUrl, '_blank')}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold shadow-sm cursor-pointer flex items-center gap-2 text-xs transition-all"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square text-gold"></i>
                      <span>Open in New Tab</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedNotice.fileUrl!;
                        link.download = selectedNotice.fileName || `SVCE_Notice_${selectedNotice.id}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-primary-gradient text-white font-bold shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 text-xs transition-all"
                    >
                      <i className="fa-solid fa-download text-gold"></i>
                      <span>Download Attachment</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Notice Attachment Viewer Modal */}
      {viewingAttachment && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full flex flex-col max-h-[92vh] shadow-2xl overflow-hidden text-white">
            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center flex-shrink-0 gap-3">
              <div className="flex items-center gap-3 truncate">
                <div className={`w-10 h-10 rounded-xl ${getFileIcon(viewingAttachment.fileName).bg} flex items-center justify-center text-lg flex-shrink-0`}>
                  <i className={`${getFileIcon(viewingAttachment.fileName).icon} ${getFileIcon(viewingAttachment.fileName).color}`}></i>
                </div>
                <div className="truncate">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white truncate">
                    {viewingAttachment.fileName || 'Attached Document'}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {viewingAttachment.subject || viewingAttachment.badge} • {viewingAttachment.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => window.open(viewingAttachment.fileUrl, '_blank')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Open in full browser tab"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-gold"></i>
                  <span className="hidden sm:inline">Open in Tab</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = viewingAttachment.fileUrl!;
                    link.download = viewingAttachment.fileName || `SVCE_Notice_${viewingAttachment.id}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-primary-gradient text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Download Attachment"
                >
                  <i className="fa-solid fa-download text-gold"></i>
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingAttachment(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl cursor-pointer leading-none transition-colors"
                  title="Close Viewer"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Lightbox Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex items-center justify-center bg-black/40">
              {isImageFile(viewingAttachment.fileName) && (
                <img
                  src={viewingAttachment.fileUrl}
                  alt={viewingAttachment.fileName}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              )}

              {isPdfFile(viewingAttachment.fileName) && (
                <iframe
                  src={viewingAttachment.fileUrl}
                  title={viewingAttachment.fileName}
                  className="w-full h-[75vh] rounded-xl border border-slate-800 bg-white"
                />
              )}

              {!isImageFile(viewingAttachment.fileName) && !isPdfFile(viewingAttachment.fileName) && (
                <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-gold/15 text-gold flex items-center justify-center text-2xl mx-auto">
                    <i className={getFileIcon(viewingAttachment.fileName).icon}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{viewingAttachment.fileName}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Click below to view or open this file in your browser
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open(viewingAttachment.fileUrl, '_blank')}
                    className="btn-gold text-xs px-5 py-2.5"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square mr-1.5"></i>
                    Open Document
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
