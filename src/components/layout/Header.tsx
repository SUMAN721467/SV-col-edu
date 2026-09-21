import React from 'react';
import { COLLEGE_DATA } from '../../data/svceData';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-white border-b border-slate-200 py-3 sm:py-4 shadow-sm relative z-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 flex-wrap">
        
        {/* Brand Identity */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 sm:gap-4 text-left transition-opacity hover:opacity-95 focus:outline-none group"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-navy border-2 sm:border-3 border-gold-light shadow-md flex-shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img
              src="assets/images/vivekananda.jpg"
              alt="Swami Vibekananda Emblem"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="font-heading text-navy font-extrabold text-base sm:text-xl md:text-2xl uppercase tracking-tight leading-tight">
              {COLLEGE_DATA.name}
            </h1>
            <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {COLLEGE_DATA.bengaliName} • Co-Educational Teacher Training Institute
            </div>
            <div className="text-[11px] sm:text-xs text-crimson font-semibold tracking-wide mt-0.5 flex items-center gap-1">
              <i className="fa-solid fa-shield-halved"></i>
              Managed by {COLLEGE_DATA.managedBy}
            </div>
          </div>
        </button>

        {/* Accreditations on Tablet/Desktop */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <div className="accred-pill">
            <i className="fa-solid fa-award text-gold text-lg"></i>
            <div className="text-xs leading-tight">
              <strong className="block text-navy font-bold">NCTE Recognized</strong>
              <span className="text-slate-500 text-[11px]">ERC-NCTE, Bhubaneswar</span>
            </div>
          </div>

          <div className="accred-pill">
            <i className="fa-solid fa-building-columns text-gold text-lg"></i>
            <div className="text-xs leading-tight">
              <strong className="block text-navy font-bold">WBBPE &amp; BSAEU Affiliated</strong>
              <span className="text-slate-500 text-[11px]">Govt. of West Bengal</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
