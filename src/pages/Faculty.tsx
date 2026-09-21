import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { FacultyMember } from '../types';

interface FacultyProps {
  onNavigate: (page: string) => void;
}

export const Faculty: React.FC<FacultyProps> = ({ onNavigate }) => {
  const { bedFaculty, deledFaculty } = useData();
  const [activeCourse, setActiveCourse] = useState<'bed' | 'deled'>('bed');
  const [searchTerm, setSearchTerm] = useState('');
  const [designationFilter, setDesignationFilter] = useState('all');

  const currentFacultyList: FacultyMember[] = activeCourse === 'bed' ? bedFaculty : deledFaculty;
  const currentPdfPath = activeCourse === 'bed' ? 'assets/pdf/B. Ed teacher list.pdf' : 'assets/pdf/D.EL.ED Teacher list.pdf';

  // Filtered members
  const filteredMembers = useMemo(() => {
    return currentFacultyList.filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.qualifications.masterSubject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDesignation = 
        designationFilter === 'all' || 
        member.designation.toLowerCase().includes(designationFilter.toLowerCase());

      return matchesSearch && matchesDesignation;
    });
  }, [currentFacultyList, searchTerm, designationFilter]);

  const exportFacultyCSV = () => {
    const headers = ["Sl No", "Name", "DOB", "Age", "Category", "Designation", "Subject", "Qualifications", "Experience", "Initial Appt", "Joining Date"];
    const rows = filteredMembers.map(m => [
      m.slNo,
      `"${m.name}"`,
      m.dob,
      `"${m.age}"`,
      m.category,
      `"${m.designation}"`,
      `"${m.subject}"`,
      `"${m.qualifications.masterSubject} | B.Ed: ${m.qualifications.bEd} | M.Ed: ${m.qualifications.mEd}"`,
      `"${m.experience}"`,
      m.initialAppt,
      m.joiningDate
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SVCE_Faculty_${activeCourse.toUpperCase()}_Roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span>Faculty &amp; Staff</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Certified Faculty &amp; Staff Directory</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
            Certified roster of teaching and pedagogical faculty members in accordance with NCTE &amp; University norms.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Program Toggle Tabs */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3 flex-wrap">
            <button
              onClick={() => setActiveCourse('bed')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                activeCourse === 'bed'
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <i className="fa-solid fa-graduation-cap text-gold"></i>
              <span>B.Ed Faculty Roster ({BED_FACULTY.length})</span>
            </button>

            <button
              onClick={() => setActiveCourse('deled')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                activeCourse === 'deled'
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <i className="fa-solid fa-chalkboard-user text-gold"></i>
              <span>D.El.Ed Faculty Roster ({DELED_FACULTY.length})</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto flex-1 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-80">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, subject, or qualification..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>

              <select
                value={designationFilter}
                onChange={(e) => setDesignationFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none bg-white text-slate-700 font-medium"
              >
                <option value="all">All Designations</option>
                <option value="Principal">Principal / HOD</option>
                <option value="Lecturer">Lecturers</option>
                <option value="Librarian">Librarian</option>
                <option value="Physical Education">Physical Education</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <a
                href={currentPdfPath}
                target="_blank"
                rel="noreferrer"
                className="btn-gold text-xs whitespace-nowrap"
              >
                <i className="fa-solid fa-file-pdf"></i> View Signed {activeCourse.toUpperCase()} PDF
              </a>
              <button onClick={exportFacultyCSV} className="btn-secondary-custom whitespace-nowrap">
                <i className="fa-solid fa-download"></i> CSV
              </button>
            </div>
          </div>

          {/* Faculty Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.slNo} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3.5 bg-surface-main">
                  <div className="w-12 h-12 rounded-full bg-primary-gradient text-gold-light flex items-center justify-center text-lg flex-shrink-0 border border-gold/40">
                    <i className={`fa-solid ${member.avatar || 'fa-user'}`}></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-navy text-base leading-snug">
                      {member.name}
                    </h3>
                    <span className="text-gold font-bold text-xs uppercase block">
                      {member.designation}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2 text-xs text-slate-600 flex-grow">
                  <p><strong className="text-slate-800">Subject:</strong> {member.subject}</p>
                  <p><strong className="text-slate-800">Qualifications:</strong> {member.qualifications.masterSubject}</p>
                  <p><strong className="text-slate-800">B.Ed / M.Ed:</strong> B.Ed: {member.qualifications.bEd} | M.Ed: {member.qualifications.mEd}</p>
                  <p><strong className="text-slate-800">Experience:</strong> {member.experience} ({member.recognizedExp})</p>
                  <p><strong className="text-slate-800">Joining Date:</strong> {member.joiningDate}</p>
                  {member.bio && <p className="text-slate-500 italic pt-1 text-[11px] border-t border-slate-100">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Full Certified Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
            <h3 className="font-heading text-navy text-lg font-bold">
              Official Certified Staff Particulars Table ({activeCourse.toUpperCase()} Roster)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>Sl.</th>
                    <th>Name &amp; Age</th>
                    <th>Category</th>
                    <th>Designation</th>
                    <th>Subject</th>
                    <th>Master's &amp; Teacher Degree</th>
                    <th>Teaching Exp.</th>
                    <th>Joining Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m) => (
                    <tr key={m.slNo}>
                      <td className="text-center font-bold text-slate-500">{m.slNo}</td>
                      <td>
                        <strong className="block text-navy">{m.name}</strong>
                        <span className="text-slate-500 text-xs">{m.dob} ({m.age})</span>
                      </td>
                      <td>
                        <span className="badge-category badge-gen">{m.category}</span>
                      </td>
                      <td className="font-semibold text-slate-700">{m.designation}</td>
                      <td className="font-semibold text-slate-800">{m.subject}</td>
                      <td>
                        <div className="text-xs">
                          <strong>{m.qualifications.masterSubject}</strong>
                          <div className="text-slate-500">B.Ed: {m.qualifications.bEd} | M.Ed: {m.qualifications.mEd}</div>
                        </div>
                      </td>
                      <td>{m.experience}</td>
                      <td>{m.joiningDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
