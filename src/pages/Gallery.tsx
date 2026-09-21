import React from 'react';
import { COLLEGE_DATA } from '../data/svceData';

interface GalleryProps {
  onNavigate: (page: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span>Gallery</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Campus Life &amp; Infrastructure</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
            A visual tour of our modern academic facilities, laboratories, and vibrant campus events.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Featured Campus Photograph Hero */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative">
            <img
              src="assets/images/college.jpeg"
              alt="SVCE Campus Main View"
              className="w-full max-h-[460px] object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-dark via-navy/80 to-transparent p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
              <div>
                <span className="bg-gold text-navy-dark font-extrabold text-xs px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2 inline-block">
                  <i className="fa-solid fa-camera mr-1"></i> Featured Campus View
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                  {COLLEGE_DATA.name} — Main Campus
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {COLLEGE_DATA.address.fullText}
                </p>
              </div>
              <span className="text-xs font-semibold text-gold-light">
                <i className="fa-solid fa-building mr-1"></i> Permanent Multi-Storey RCC Infrastructure
              </span>
            </div>
          </div>

          {/* Infrastructure Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <img
                src="assets/images/college.jpeg"
                alt="Main Academic Complex"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-surface-main flex-grow flex items-center justify-between">
                <strong className="text-navy text-sm font-bold">Main Academic Complex</strong>
                <span className="text-xs text-slate-500 font-semibold">G+2 RCC Structure</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="w-full h-48 bg-primary-gradient flex flex-col items-center justify-center text-white p-6 text-center">
                <i className="fa-solid fa-book-open text-4xl text-gold-light mb-2"></i>
                <h4 className="font-bold text-base">Central Library</h4>
                <p className="text-xs text-slate-300 mt-1">5,000+ Pedagogical Reference Volumes</p>
              </div>
              <div className="p-4 bg-surface-main flex items-center justify-between">
                <strong className="text-navy text-sm font-bold">Digital Reading Room</strong>
                <span className="text-xs text-slate-500 font-semibold">Fully Automated</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="w-full h-48 bg-navy-light flex flex-col items-center justify-center text-white p-6 text-center">
                <i className="fa-solid fa-flask text-4xl text-gold-light mb-2"></i>
                <h4 className="font-bold text-base">Science &amp; Math Labs</h4>
                <p className="text-xs text-slate-300 mt-1">Physics, Chemistry, Life Science &amp; Math</p>
              </div>
              <div className="p-4 bg-surface-main flex items-center justify-between">
                <strong className="text-navy text-sm font-bold">Instructional Lab</strong>
                <span className="text-xs text-slate-500 font-semibold">Certified Equipment</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="w-full h-48 bg-navy flex flex-col items-center justify-center text-white p-6 text-center">
                <i className="fa-solid fa-computer text-4xl text-gold-light mb-2"></i>
                <h4 className="font-bold text-base">ICT Resource Centre</h4>
                <p className="text-xs text-slate-300 mt-1">35 High-Speed Workstations</p>
              </div>
              <div className="p-4 bg-surface-main flex items-center justify-between">
                <strong className="text-navy text-sm font-bold">Computer Lab</strong>
                <span className="text-xs text-slate-500 font-semibold">Broadband Enabled</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="w-full h-48 bg-primary-gradient flex flex-col items-center justify-center text-white p-6 text-center">
                <i className="fa-solid fa-palette text-4xl text-gold-light mb-2"></i>
                <h4 className="font-bold text-base">Art &amp; Craft Workshop</h4>
                <p className="text-xs text-slate-300 mt-1">Visual Arts &amp; Low-Cost TLM Room</p>
              </div>
              <div className="p-4 bg-surface-main flex items-center justify-between">
                <strong className="text-navy text-sm font-bold">Fine Arts Studio</strong>
                <span className="text-xs text-slate-500 font-semibold">Practical Pedagogy</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="w-full h-48 bg-navy-dark flex flex-col items-center justify-center text-white p-6 text-center">
                <i className="fa-solid fa-people-roof text-4xl text-gold-light mb-2"></i>
                <h4 className="font-bold text-base">Multi-Purpose Auditorium</h4>
                <p className="text-xs text-slate-300 mt-1">250+ Seating Capacity for Meets</p>
              </div>
              <div className="p-4 bg-surface-main flex items-center justify-between">
                <strong className="text-navy text-sm font-bold">Assembly Hall</strong>
                <span className="text-xs text-slate-500 font-semibold">Acoustic System</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
