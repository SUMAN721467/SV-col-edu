import React from 'react';
import { COLLEGE_DATA } from '../../data/svceData';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-navy-dark text-white/85 text-xs py-2 border-b border-white/10 hidden md:block">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center flex-wrap gap-4">
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <i className="fa-solid fa-location-dot text-gold-light text-xs"></i>
            {COLLEGE_DATA.address.village}, {COLLEGE_DATA.address.postOffice}, {COLLEGE_DATA.address.district}, WB - {COLLEGE_DATA.address.pincode}
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <i className="fa-solid fa-phone text-gold-light text-xs"></i>
            +91 97327 94252
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <span className="bg-gold/20 text-gold-light border border-gold/40 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide inline-flex items-center gap-1">
            <i className="fa-solid fa-certificate text-gold-light"></i>
            NCTE Code: ERCAPP77 &amp; ERCAPP3967
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <i className="fa-solid fa-envelope text-gold-light text-xs"></i>
            {COLLEGE_DATA.contact.email}
          </span>
        </div>
      </div>
    </div>
  );
};
