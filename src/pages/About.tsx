import React from 'react';
import { COLLEGE_DATA } from '../data/svceData';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Subpage Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">About Swami Vibekananda College of Education</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
            Established under the aegis of Sahid Khudiram Memorial Trust to foster excellence in teacher education.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-12">
          
          {/* Split Trust Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-gold font-bold text-xs uppercase tracking-widest block">
                Genesis &amp; Inspiration
              </span>
              <h3 className="font-heading text-navy text-2xl sm:text-3xl font-bold">
                Sahid Khudiram Memorial Trust
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>{COLLEGE_DATA.name} (SVCE)</strong> was founded with a profound commitment to uplifting rural and semi-urban education across Paschim Medinipur and West Bengal. Established and managed by the esteemed <em>Sahid Khudiram Memorial Trust</em>, the institution embodies patriotic dedication and self-reliant character building.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Recognized by the <strong>National Council for Teacher Education (NCTE)</strong> and affiliated with the <strong>West Bengal Board of Primary Education (WBBPE)</strong> and <strong>Baba Saheb Ambedkar Education University (BSAEU / WBUTTEPA)</strong>, SVCE serves as a beacon for aspiring educators.
              </p>
              <div className="pt-2 flex gap-3">
                <button onClick={() => onNavigate('mandatory-disclosure')} className="btn-gold text-xs">
                  <i className="fa-solid fa-file-shield"></i> Trust Deed &amp; Disclosures
                </button>
              </div>
            </div>

            {/* Campus Photo */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative">
              <img
                src="assets/images/college.jpeg"
                alt="SVCE Campus Building"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-navy-dark/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm">
                <i className="fa-solid fa-location-dot text-gold-light mr-1"></i> Keshiary Campus, Paschim Medinipur
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-bg text-gold flex items-center justify-center text-lg">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h4 className="font-heading font-bold text-navy text-lg">Our Mission</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                To provide quality teacher training through modern pedagogical methodologies, robust ICT resources, and value-based community engagement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h4 className="font-heading font-bold text-navy text-lg">Our Vision</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                To emerge as a premier centre of pedagogical innovation, producing teachers who embody knowledge, ethical integrity, and progressive social responsibility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <h4 className="font-heading font-bold text-navy text-lg">Core Values</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Adherence to statutory transparency, academic discipline, egalitarian access, and continuous professional development for student-teachers.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
