import React from 'react';
import { COLLEGE_DATA } from '../data/svceData';

interface AcademicsProps {
  onNavigate: (page: string) => void;
}

export const Academics: React.FC<AcademicsProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span>Programs &amp; Courses</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Academic Programs &amp; Courses</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
            NCTE recognized 2-Year professional programs in Elementary and Secondary Teacher Education.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-12">
          
          {/* Course Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* D.El.Ed Detailed Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Primary Level
                </span>
                <h3 className="font-heading text-navy text-2xl font-bold mt-2">
                  Diploma in Elementary Education (D.El.Ed)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  NCTE Code: ERCAPP77 / 2012 • ERC Order: ERC/7-162.6.8/NCTE/D.El.Ed./2013/21191
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <p>
                  The D.El.Ed course prepares candidates for teaching at the primary and upper-primary levels (Classes I to VIII), focusing on child psychology, experiential pedagogy, language acquisition, and foundational mathematics.
                </p>
                <div className="bg-surface-main p-4 rounded-xl space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <strong>Annual Sanctioned Intake:</strong>
                    <span>50 Seats</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <strong>Duration:</strong>
                    <span>2 Academic Years (Regular Mode)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <strong>Affiliating Board:</strong>
                    <span>West Bengal Board of Primary Education (WBBPE)</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Eligibility:</strong>
                    <span>50% in 10+2 (45% for SC/ST/OBC/PH)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a href="assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf" target="_blank" rel="noreferrer" className="btn-gold text-xs">
                  <i className="fa-solid fa-file-pdf"></i> View D.El.Ed Recognition Order
                </a>
              </div>
            </div>

            {/* B.Ed Detailed Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Secondary Level
                </span>
                <h3 className="font-heading text-navy text-2xl font-bold mt-2">
                  Bachelor of Education (B.Ed)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  NCTE Code: ERCAPP3967 • Order No: F. No. 234.2.1(Part-2)/APP3967/B.Ed./2016/52099
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <p>
                  The B.Ed course prepares graduate and post-graduate students for teaching at the secondary and higher secondary levels (Classes IX to XII), emphasizing modern pedagogical methodology, action research, micro-teaching, and ICT tools.
                </p>
                <div className="bg-surface-main p-4 rounded-xl space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <strong>Annual Sanctioned Intake:</strong>
                    <span>50 Seats</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <strong>Duration:</strong>
                    <span>2 Academic Years (Regular Mode)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <strong>Affiliating University:</strong>
                    <span>Baba Saheb Ambedkar Education University (BSAEU)</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Eligibility:</strong>
                    <span>50% in Bachelor's / Master's Degree (45% for SC/ST/PWD)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a href="assets/pdf/B.ED . RECOGNISED COPY.pdf" target="_blank" rel="noreferrer" className="btn-gold text-xs">
                  <i className="fa-solid fa-file-pdf"></i> View B.Ed Recognition Order
                </a>
              </div>
            </div>

          </div>

          {/* Seat Distribution & Fees Policy */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h4 className="font-heading text-navy text-xl font-bold">
              Admission &amp; Statutory Regulatory Norms
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Admissions to both B.Ed and D.El.Ed courses at {COLLEGE_DATA.name} are conducted strictly through the centralized state counseling portal and merit-based verification supervised by WBBPE and BSAEU. Fees charged are in strict accordance with the state government fee regulatory committee guidelines.
            </p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => onNavigate('students')} className="btn-secondary-custom">
                <i className="fa-solid fa-users text-gold"></i> View Admitted Students List
              </button>
              <button onClick={() => onNavigate('mandatory-disclosure')} className="btn-secondary-custom">
                <i className="fa-solid fa-file-shield text-gold"></i> View Complete Disclosures
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
