import React, { useState } from 'react';
import { COLLEGE_DATA } from '../data/svceData';
import { DocModal } from '../components/common/DocModal';
import { useData } from '../context/DataContext';
import { OfficialDocument } from '../types';

interface MandatoryDisclosureProps {
  onNavigate: (page: string) => void;
}

export const MandatoryDisclosure: React.FC<MandatoryDisclosureProps> = ({ onNavigate }) => {
  const { mandatoryDocuments } = useData();
  const [activeTab, setActiveTab] = useState('vault');
  const [modalType, setModalType] = useState<string | null>(null);

  const [viewingDoc, setViewingDoc] = useState<OfficialDocument | null>(null);

  return (
    <div>
      {/* Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span>Mandatory Disclosure</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Statutory Mandatory Disclosure</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
            In compliance with Section 14 &amp; 15 of NCTE Regulations, WBBPE norms, and University guidelines.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
            {[
              { id: 'vault', label: `Official PDF Vault (${mandatoryDocuments.length})`, icon: 'fa-solid fa-folder-open' },
              { id: 'general', label: 'Institutional Info', icon: 'fa-solid fa-landmark' },
              { id: 'orders', label: 'NCTE & Affiliation Orders', icon: 'fa-solid fa-file-signature' },
              { id: 'land', label: 'Land & Building', icon: 'fa-solid fa-building' },
              { id: 'infra', label: 'Labs & Infrastructure', icon: 'fa-solid fa-flask' },
              { id: 'compliance', label: 'Regulatory Compliance', icon: 'fa-solid fa-clipboard-check' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <i className={`${tab.icon} ${activeTab === tab.id ? 'text-gold-light' : 'text-gold'}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: PDF Vault */}
          {activeTab === 'vault' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
              <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="bg-gold text-navy-dark text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Statutory Repository
                    </span>
                    <h3 className="font-heading text-navy text-xl font-bold mt-2">
                      Official Certified PDF Documents &amp; Gazettes
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Verified repository of regulatory recognition orders, affiliations, fire NOC, teacher lists, and student rosters.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <i className="fa-solid fa-file-shield text-emerald-600"></i>
                    <span>{mandatoryDocuments.length} Verified Documents</span>
                  </div>
                </div>
              </div>

              {/* Table Matching Screenshot */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0a2342] text-white text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4 text-center w-12 border-b border-navy-light/30">#</th>
                      <th className="py-3.5 px-5 border-b border-navy-light/30">Document Name &amp; Description</th>
                      <th className="py-3.5 px-5 border-b border-navy-light/30">Category / Governing Body</th>
                      <th className="py-3.5 px-5 border-b border-navy-light/30">File Size</th>
                      <th className="py-3.5 px-5 text-center w-48 border-b border-navy-light/30">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                    {mandatoryDocuments.map((doc, idx) => (
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
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wide uppercase ${
                              doc.categoryBadgeClass || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-4 px-5 font-semibold text-slate-600 text-xs whitespace-nowrap">
                          {doc.fileSize || `${doc.pages || 1} Pages`}
                        </td>
                        <td className="py-4 px-5 text-center">
                          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
                            {/* Orange View Button */}
                            <button
                              type="button"
                              onClick={() => setViewingDoc(doc)}
                              className="bg-[#f27a1a] hover:bg-[#e06c10] text-white font-bold text-[11.5px] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                              title={`View ${doc.title}`}
                            >
                              <i className="fa-solid fa-eye text-xs"></i>
                              <span>View</span>
                            </button>

                            {/* White Download Button */}
                            <a
                              href={doc.pdfPath}
                              download
                              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-[11.5px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                              title={`Download ${doc.title}`}
                            >
                              <i className="fa-solid fa-download text-xs"></i>
                              <span>Download</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Institutional General Particulars */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <h3 className="font-heading text-navy text-xl font-bold border-b border-slate-200 pb-3">
                Section A: Basic Institutional Particulars
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="p-4 bg-surface-main rounded-xl space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[11px]">Name of Institution</span>
                  <p className="font-bold text-navy text-base">{COLLEGE_DATA.name}</p>
                </div>
                <div className="p-4 bg-surface-main rounded-xl space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[11px]">Managing Society / Trust</span>
                  <p className="font-bold text-navy text-base">{COLLEGE_DATA.managedBy}</p>
                </div>
                <div className="p-4 bg-surface-main rounded-xl space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[11px]">Year of Establishment</span>
                  <p className="font-bold text-navy">{COLLEGE_DATA.establishedYear} (Continuous Operation)</p>
                </div>
                <div className="p-4 bg-surface-main rounded-xl space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[11px]">Institutional Category</span>
                  <p className="font-bold text-navy">{COLLEGE_DATA.category}</p>
                </div>
                <div className="p-4 bg-surface-main rounded-xl space-y-1 md:col-span-2">
                  <span className="text-slate-400 font-bold uppercase text-[11px]">Postal Address</span>
                  <p className="font-semibold text-slate-800">{COLLEGE_DATA.address.fullText}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Orders & Affiliation */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <h3 className="font-heading text-navy text-xl font-bold border-b border-slate-200 pb-3">
                Section B: Recognition &amp; Affiliation Orders
              </h3>

              <div className="space-y-6">
                <div className="p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h4 className="font-bold text-navy text-base">D.El.Ed Recognition (NCTE Bhubaneswar)</h4>
                    <span className="badge-category badge-gen">Code: ERCAPP77</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Order No: <code>ERC/7-162.6.8/NCTE/D.El.Ed./2013/21191</code> dated 15/10/2013. Approved annual intake of 50 students.
                  </p>
                  <button onClick={() => setModalType('deled-ncte')} className="btn-gold text-xs">
                    <i className="fa-solid fa-file-pdf"></i> View Gazette Provisions &amp; PDF
                  </button>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h4 className="font-bold text-navy text-base">B.Ed Recognition (NCTE Bhubaneswar)</h4>
                    <span className="badge-category badge-gen">Code: ERCAPP3967</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Order No: <code>F. No. 234.2.1(Part-2)/APP3967/B.Ed./2016/52099</code> dated 04/04/2017. Approved annual intake of 50 students.
                  </p>
                  <button onClick={() => setModalType('bed-ncte')} className="btn-gold text-xs">
                    <i className="fa-solid fa-file-pdf"></i> View Gazette Provisions &amp; PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Land & Building */}
          {activeTab === 'land' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <h3 className="font-heading text-navy text-xl font-bold border-b border-slate-200 pb-3">
                Section C: Land Title, Property &amp; Campus Building
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-3 text-xs sm:text-sm text-slate-700">
                  <p><strong>Plot &amp; Khatian No:</strong> Plot No. L.R.-1859, R.S.-1530</p>
                  <p><strong>Ownership:</strong> Registered Freehold Title in the name of Sahid Khudiram Memorial Trust</p>
                  <p><strong>Total Land Area:</strong> 3500+ Sq. Meters (Permanent Campus)</p>
                  <p><strong>Built-up Area:</strong> 2500+ Sq. Meters (G+2 Multi-Storey RCC Structure)</p>
                  <div className="pt-2 flex gap-3">
                    <a href="assets/pdf/LAND DEED.pdf" target="_blank" rel="noreferrer" className="btn-gold text-xs">
                      <i className="fa-solid fa-file-pdf"></i> View Land Deed PDF
                    </a>
                    <a href="assets/pdf/BUILDING PLAN.pdf" target="_blank" rel="noreferrer" className="btn-secondary-custom text-xs">
                      <i className="fa-solid fa-file-pdf"></i> View Building Plan
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="assets/images/college.jpeg"
                    alt="SVCE Campus Infrastructure"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Labs & Infrastructure */}
          {activeTab === 'infra' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <h3 className="font-heading text-navy text-xl font-bold border-b border-slate-200 pb-3">
                Section D: Instructional Laboratories &amp; Resource Centers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-5 bg-surface-main rounded-xl space-y-2 border border-slate-200">
                  <i className="fa-solid fa-book-open text-2xl text-gold"></i>
                  <h4 className="font-bold text-navy text-base">Central Library</h4>
                  <p className="text-xs text-slate-600">Over 5,000 reference pedagogical volumes, 15 national journals, and e-learning reading room.</p>
                </div>
                <div className="p-5 bg-surface-main rounded-xl space-y-2 border border-slate-200">
                  <i className="fa-solid fa-computer text-2xl text-gold"></i>
                  <h4 className="font-bold text-navy text-base">ICT Resource Centre</h4>
                  <p className="text-xs text-slate-600">35 modern networked desktop stations equipped with high-speed broadband and projection smart screens.</p>
                </div>
                <div className="p-5 bg-surface-main rounded-xl space-y-2 border border-slate-200">
                  <i className="fa-solid fa-flask text-2xl text-gold"></i>
                  <h4 className="font-bold text-navy text-base">Science &amp; Math Lab</h4>
                  <p className="text-xs text-slate-600">Equipped with physics, chemistry, biology specimens, microscopes, and math teaching kits.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Regulatory Compliance */}
          {activeTab === 'compliance' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <h3 className="font-heading text-navy text-xl font-bold border-b border-slate-200 pb-3">
                Section E: Statutory Compliance &amp; Committees
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl">
                  <i className="fa-solid fa-circle-check text-emerald-600 mr-1.5"></i>
                  <strong>Anti-Ragging Committee &amp; Squad:</strong> Constituted in accordance with UGC &amp; Supreme Court guidelines. Zero tolerance policy.
                </div>
                <div className="p-4 bg-sky-50 text-sky-900 border border-sky-200 rounded-xl">
                  <i className="fa-solid fa-circle-check text-sky-600 mr-1.5"></i>
                  <strong>Internal Complaints Committee (ICC):</strong> Formed as per Sexual Harassment of Women at Workplace Act 2013.
                </div>
                <div className="p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl">
                  <i className="fa-solid fa-circle-check text-amber-600 mr-1.5"></i>
                  <strong>Grievance Redressal Cell:</strong> Direct online portal for student-teacher and parent representations.
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* In-App PDF Viewer Modal */}
      {viewingDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-navy-dark/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setViewingDoc(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="p-4 sm:px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center text-lg flex-shrink-0">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-white text-sm sm:text-base truncate">
                    {viewingDoc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="font-semibold text-gold-light">{viewingDoc.category}</span>
                    <span>•</span>
                    <span>{viewingDoc.fileSize || 'Official PDF'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <a
                  href={viewingDoc.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  title="Open in new window"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <a
                  href={viewingDoc.pdfPath}
                  download
                  className="bg-[#f27a1a] hover:bg-[#e06c10] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                  title="Download PDF"
                >
                  <i className="fa-solid fa-download text-[11px]"></i>
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-base transition-colors"
                  title="Close viewer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            {/* Modal Body / PDF Iframe */}
            <div className="flex-1 bg-slate-900 p-2 sm:p-4 overflow-hidden relative">
              <iframe
                src={`${viewingDoc.pdfPath}#toolbar=1&navpanes=0`}
                title={viewingDoc.title}
                className="w-full h-full rounded-xl border border-slate-800 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      <DocModal
        isOpen={Boolean(modalType)}
        type={modalType || ''}
        onClose={() => setModalType(null)}
      />
    </div>
  );
};
