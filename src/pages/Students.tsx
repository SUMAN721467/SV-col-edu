import React, { useState, useMemo } from 'react';
import { COLLEGE_DATA } from '../data/svceData';
import { useData } from '../context/DataContext';

interface StudentsProps {
  onNavigate: (page: string) => void;
}

export const Students: React.FC<StudentsProps> = ({ onNavigate }) => {
  const { students } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Extract unique subjects
  const subjects = useMemo(() => {
    return Array.from(new Set(students.map(s => s.subject))).sort();
  }, [students]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.appId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = categoryFilter === 'ALL' || student.category === categoryFilter;
      const matchesSub = subjectFilter === 'ALL' || student.subject === subjectFilter;

      return matchesSearch && matchesCat && matchesSub;
    });
  }, [searchTerm, categoryFilter, subjectFilter]);

  // Pagination slice
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const exportStudentsCSV = () => {
    const headers = ["Sr. No", "Application ID", "Student Name", "Subject", "Type", "Category"];
    const rows = filteredStudents.map(s => [
      s.srNo,
      `"${s.appId}"`,
      `"${s.name}"`,
      `"${s.subject}"`,
      s.type,
      s.category
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SVCE_Admitted_Students_2025_2027.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'GEN': return 'badge-gen';
      case 'SC': return 'badge-sc';
      case 'ST': return 'badge-st';
      case 'OBC-A':
      case 'OBC-B': return 'badge-obc';
      default: return 'badge-gen';
    }
  };

  return (
    <div>
      {/* Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span>Admitted Students</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Admitted Students Directory</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
            Official University portal enrollment list for {COLLEGE_DATA.name} (B.Ed Batch).
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Official Verification Strip */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="block text-slate-400 font-bold uppercase">College Name</span>
              <strong className="text-navy text-sm font-extrabold">{COLLEGE_DATA.name}</strong>
            </div>
            <div>
              <span className="block text-slate-400 font-bold uppercase">Course / Session</span>
              <strong className="text-navy text-sm font-extrabold">B.Ed (Session 2025–27)</strong>
            </div>
            <div>
              <span className="block text-slate-400 font-bold uppercase">Total Admitted</span>
              <strong className="text-gold text-sm font-extrabold">50 Students (100% Filled)</strong>
            </div>
            <div>
              <span className="block text-slate-400 font-bold uppercase">Affiliating University</span>
              <strong className="text-navy text-sm font-extrabold">BSAEU / WBUTTEPA</strong>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-72">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  placeholder="Search by ID, name, subject..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none bg-white text-slate-700 font-medium"
              >
                <option value="ALL">All Categories</option>
                <option value="GEN">General (GEN)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="OBC-A">OBC-A</option>
                <option value="OBC-B">OBC-B</option>
              </select>

              {/* Subject Filter */}
              <select
                value={subjectFilter}
                onChange={(e) => { setSubjectFilter(e.target.value); setCurrentPage(1); }}
                className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none bg-white text-slate-700 font-medium"
              >
                <option value="ALL">All Subjects</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button onClick={exportStudentsCSV} className="btn-secondary-custom whitespace-nowrap">
                <i className="fa-solid fa-file-csv text-emerald-600"></i> Export CSV
              </button>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-heading text-navy text-lg font-bold">
                Student Enrollment Roster ({filteredStudents.length} Records)
              </h3>
              <span className="text-xs text-slate-500">
                Showing {paginatedStudents.length} of {filteredStudents.length} results
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>Sr No.</th>
                    <th>Application ID</th>
                    <th>Candidate Name</th>
                    <th>Method Subject</th>
                    <th>Type</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.length > 0 ? (
                    paginatedStudents.map((student) => (
                      <tr key={student.srNo}>
                        <td className="text-center font-bold text-slate-500">{student.srNo}</td>
                        <td className="font-mono text-xs font-bold text-navy">{student.appId}</td>
                        <td className="font-bold text-slate-800">{student.name}</td>
                        <td className="font-semibold text-slate-700">{student.subject}</td>
                        <td>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">
                            {student.type}
                          </span>
                        </td>
                        <td>
                          <span className={`badge-category ${getCategoryBadgeClass(student.category)}`}>
                            {student.category}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        No student records match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 flex-wrap gap-2 text-xs">
                <span className="text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-50 font-semibold"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-bold ${
                        currentPage === page
                          ? 'bg-navy text-white'
                          : 'border border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-50 font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
};
