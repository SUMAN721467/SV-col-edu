import React from 'react';
import { COLLEGE_DATA } from '../../data/svceData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-navy-dark text-slate-300 pt-12 border-t-4 border-gold">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          
          {/* About Column */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-base uppercase tracking-wider border-b border-white/10 pb-2">
              {COLLEGE_DATA.name}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A premier Teacher Education Institution offering recognized B.Ed and D.El.Ed courses. Run and managed by Sahid Khudiram Memorial Trust, Aurangabad, Paschim Medinipur.
            </p>
            <div className="text-xs text-gold-light font-semibold pt-1">
              <i className="fa-solid fa-landmark mr-1"></i> NCTE Code: ERCAPP77 &amp; ERCAPP3967
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-base uppercase tracking-wider border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gold-light transition-colors flex items-center gap-1.5 cursor-pointer">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('notices')} className="hover:text-gold-light transition-colors flex items-center gap-1.5 cursor-pointer">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Notice Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academics')} className="hover:text-gold-light transition-colors flex items-center gap-1.5 cursor-pointer">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Programs &amp; Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faculty')} className="hover:text-gold-light transition-colors flex items-center gap-1.5 cursor-pointer">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Faculty Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('students')} className="hover:text-gold-light transition-colors flex items-center gap-1.5 cursor-pointer">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Admitted Students
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-gold-light transition-colors flex items-center gap-1.5 cursor-pointer">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Statutory Disclosures */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-base uppercase tracking-wider border-b border-white/10 pb-2">
              Statutory Disclosures
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('mandatory-disclosure')} className="hover:text-gold-light transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Mandatory Disclosures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mandatory-disclosure')} className="hover:text-gold-light transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Official PDF Vault (9)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mandatory-disclosure')} className="hover:text-gold-light transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> NCTE &amp; WBBPE Orders
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-gold-light transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-gold"></i> Campus Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-login')} className="hover:text-gold-light transition-colors flex items-center gap-1.5 text-gold-light font-bold">
                  <i className="fa-solid fa-lock text-[10px]"></i> Admin Log-in Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Location */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-base uppercase tracking-wider border-b border-white/10 pb-2">
              Administrative Office
            </h4>
            <div className="text-xs sm:text-sm text-slate-400 space-y-2">
              <p className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-gold text-sm mt-0.5 flex-shrink-0"></i>
                <span>{COLLEGE_DATA.address.fullText}</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-gold text-sm flex-shrink-0"></i>
                <span>{COLLEGE_DATA.contact.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-gold text-sm flex-shrink-0"></i>
                <span>{COLLEGE_DATA.contact.email}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="bg-[#030a16] border-t border-white/5 py-4 text-xs text-slate-400">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            &copy; 2026 {COLLEGE_DATA.name}. All Rights Reserved.
          </div>
          <div>
            Official Website: <a href="https://www.svcoledu.net.in/" target="_blank" rel="noreferrer" className="text-gold-light hover:underline">{COLLEGE_DATA.contact.website}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
