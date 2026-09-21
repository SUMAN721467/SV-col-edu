import React, { useState } from 'react';
import { COLLEGE_DATA } from '../data/svceData';
import { DocModal } from '../components/common/DocModal';
import { useData } from '../context/DataContext';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { bedFaculty, deledFaculty, students } = useData();
  const [modalType, setModalType] = useState<string | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy-dark text-white py-16 sm:py-24 overflow-hidden min-h-[480px] flex items-center">
        {/* Bright Background College Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 scale-105 transition-transform duration-700 filter brightness-110 contrast-105"
          style={{ backgroundImage: `url('assets/images/college.jpeg')` }}
        ></div>
        {/* Soft Contrast Gradient to keep text crisp while keeping college campus bright & visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/50 to-navy-dark/20"></div>
        <div className="absolute inset-0 bg-navy-dark/15"></div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-xs sm:text-sm font-semibold">
                <i className="fa-solid fa-star text-gold-light text-xs"></i>
                Premier Teacher Education Hub • Paschim Medinipur
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Empowering Next-Generation{' '}
                <span className="bg-gradient-to-r from-gold-warm via-gold-light to-white bg-clip-text text-transparent">
                  Transformational Educators
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
                {COLLEGE_DATA.name} (SVCE) is dedicated to nurturing inspired, ethically grounded, and technologically adept teachers through recognized 2-Year D.El.Ed and B.Ed programs.
              </p>

              <div className="flex flex-wrap gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('academics')}
                  className="btn-gold"
                >
                  <i className="fa-solid fa-compass"></i> Explore Courses
                </button>
                <button
                  onClick={() => onNavigate('notices')}
                  className="btn-outline-navy"
                >
                  <i className="fa-solid fa-clipboard-list text-gold-light"></i> Notice Board
                </button>
                <button
                  onClick={() => onNavigate('mandatory-disclosure')}
                  className="btn-outline-navy"
                >
                  <i className="fa-solid fa-file-lines"></i> Mandatory Disclosures
                </button>
              </div>
            </div>

            {/* Right Quote Box */}
            <div className="lg:col-span-5">
              <div className="bg-navy-dark/25 backdrop-blur-[2px] p-6 sm:p-8 rounded-3xl border border-white/20 shadow-xl relative space-y-4">
                <i className="fa-solid fa-quote-left text-3xl text-gold-light/70 absolute top-4 right-6"></i>
                <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed pt-2 drop-shadow-md">
                  "Education is the manifestation of the perfection already in man. We want that education by which character is formed, strength of mind is increased, the intellect is expanded, and by which one can stand on one's own feet."
                </p>
                <div className="pt-2 border-t border-white/20">
                  <strong className="block text-gold-light font-bold text-sm tracking-wide drop-shadow-sm">
                    Swami Vibekananda
                  </strong>
                  <span className="text-xs text-slate-100 drop-shadow-sm">
                    Guiding Spiritual &amp; Educational Philosophy
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-bg text-gold flex items-center justify-center text-xl flex-shrink-0">
                <i className="fa-solid fa-user-graduate"></i>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-navy text-2xl">100 Seats</h3>
                <p className="text-xs text-slate-500 font-semibold uppercase">Total Annual Intake</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl flex-shrink-0">
                <i className="fa-solid fa-chalkboard-user"></i>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-navy text-2xl">{bedFaculty.length + deledFaculty.length} Members</h3>
                <p className="text-xs text-slate-500 font-semibold uppercase">Qualified Faculty Staff</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
                <i className="fa-solid fa-landmark"></i>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-navy text-2xl">Since 2013</h3>
                <p className="text-xs text-slate-500 font-semibold uppercase">Institutional Heritage</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-navy text-2xl">100% NCTE</h3>
                <p className="text-xs text-slate-500 font-semibold uppercase">WBBPE &amp; BSAEU Compliant</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Course Highlights */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
              Academic Offerings
            </span>
            <h2 className="font-heading text-navy text-2xl sm:text-3xl font-extrabold">
              Recognized Teacher Education Programs
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Comprehensive two-year professional degree and diploma programs adhering to NCTE regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* D.El.Ed Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="bg-primary-gradient text-white p-6 relative">
                <span className="bg-gold text-navy-dark text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  Primary Level
                </span>
                <h3 className="font-heading text-xl font-bold">Diploma in Elementary Education (D.El.Ed)</h3>
                <p className="text-xs text-slate-300 mt-1">NCTE Code: ERCAPP77 • Affiliated to WBBPE</p>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600 bg-surface-main p-4 rounded-xl">
                  <div>
                    <span className="block font-bold text-navy">Approved Intake</span>
                    <span>50 Seats / Year</span>
                  </div>
                  <div>
                    <span className="block font-bold text-navy">Course Duration</span>
                    <span>2 Years Regular</span>
                  </div>
                  <div>
                    <span className="block font-bold text-navy">Eligibility</span>
                    <span>50% in 10+2 / HS</span>
                  </div>
                  <div>
                    <span className="block font-bold text-navy">Affiliating Body</span>
                    <span>WBBPE, West Bengal</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setModalType('deled-ncte')} className="btn-secondary-custom flex-1">
                    <i className="fa-solid fa-file-lines text-gold"></i> NCTE Order
                  </button>
                  <button onClick={() => onNavigate('academics')} className="btn-gold flex-1">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* B.Ed Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="bg-primary-gradient text-white p-6 relative">
                <span className="bg-gold text-navy-dark text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  Secondary Level
                </span>
                <h3 className="font-heading text-xl font-bold">Bachelor of Education (B.Ed)</h3>
                <p className="text-xs text-slate-300 mt-1">NCTE Code: ERCAPP3967 • Affiliated to BSAEU</p>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600 bg-surface-main p-4 rounded-xl">
                  <div>
                    <span className="block font-bold text-navy">Approved Intake</span>
                    <span>50 Seats / Year</span>
                  </div>
                  <div>
                    <span className="block font-bold text-navy">Course Duration</span>
                    <span>2 Years Regular</span>
                  </div>
                  <div>
                    <span className="block font-bold text-navy">Eligibility</span>
                    <span>50% in UG / PG</span>
                  </div>
                  <div>
                    <span className="block font-bold text-navy">Affiliating Body</span>
                    <span>BSAEU / WBUTTEPA</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setModalType('bed-ncte')} className="btn-secondary-custom flex-1">
                    <i className="fa-solid fa-file-lines text-gold"></i> NCTE Order
                  </button>
                  <button onClick={() => onNavigate('academics')} className="btn-gold flex-1">
                    View Details
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Campus Spotlight & Principal's Message */}
      <section className="py-12 bg-surface-alt border-y border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* College Campus Photo */}
              <div className="lg:col-span-5 relative min-h-[300px]">
                <img
                  src="assets/images/college.jpeg"
                  alt="Swami Vibekananda College of Education Campus Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-navy-dark/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm">
                  <i className="fa-solid fa-building text-gold-light mr-1"></i> SVCE Academic &amp; Admin Complex
                </div>
              </div>

              {/* Leadership Desk */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-4 flex flex-col justify-center">
                <span className="text-gold font-bold text-xs uppercase tracking-widest">
                  Leadership &amp; Vision
                </span>
                <h3 className="font-heading text-navy text-2xl font-bold">
                  From the Principal's Desk
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Welcome to <strong>{COLLEGE_DATA.name}</strong>. As an institution under the aegis of <em>Sahid Khudiram Memorial Trust</em>, our mission is rooted in the timeless ideal of shaping educators who are not merely conveyors of academic curricula, but enlightened architects of young minds.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  In our serene campus in Aurangabad, Keshiary, we combine rigorous pedagogical theory with cutting-edge ICT laboratories, rich library resources, and values-based moral development. We take pride in our 100% adherence to NCTE and WBBPE regulations.
                </p>
                <div className="pt-2">
                  <strong className="block text-navy font-bold text-sm">{COLLEGE_DATA.principal}</strong>
                  <span className="text-xs text-slate-500">Principal, Swami Vibekananda College of Education</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Doc Modal */}
      <DocModal
        isOpen={Boolean(modalType)}
        type={modalType || ''}
        onClose={() => setModalType(null)}
      />
    </div>
  );
};
