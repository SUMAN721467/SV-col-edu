import React, { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdminAuthenticated?: boolean;
}

interface NavLinkItem {
  id: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavLinkItem[] = [
  { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
  { id: 'notices', label: 'Notice Board', icon: 'fa-solid fa-clipboard-list' },
  { id: 'academics', label: 'Programs & Courses', icon: 'fa-solid fa-book-open' },
  { id: 'faculty', label: 'Faculty & Staff', icon: 'fa-solid fa-chalkboard-user' },
  { id: 'students', label: 'Admitted Students', icon: 'fa-solid fa-users' },
  { id: 'mandatory-disclosure', label: 'Mandatory Disclosure', icon: 'fa-solid fa-file-shield' },
  { id: 'gallery', label: 'Gallery', icon: 'fa-solid fa-images' },
  { id: 'about', label: 'About Us', icon: 'fa-solid fa-university' },
  { id: 'contact', label: 'Contact Us', icon: 'fa-solid fa-headset' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isAdminAuthenticated = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const adminTargetPage = isAdminAuthenticated ? 'admin' : 'admin-login';
  const adminButtonText = isAdminAuthenticated ? 'Admin Panel' : 'Admin Log-in';

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-md">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex items-center justify-between relative py-1.5 lg:py-0">
        
        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center m-0 p-0 flex-nowrap">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 py-3 px-2 xl:px-3 text-[13px] font-semibold tracking-tight whitespace-nowrap transition-colors duration-200 relative cursor-pointer ${
                    isActive
                      ? 'text-gold-light bg-white/[0.08]'
                      : 'text-white hover:text-gold-light hover:bg-white/[0.05]'
                  }`}
                >
                  <i className={`${item.icon} text-xs opacity-90`}></i>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold-gradient"></span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile Header Branding Text */}
        <div className="lg:hidden flex items-center gap-2">
          <span className="text-gold-light font-bold text-xs uppercase tracking-wider">
            SVCE Portal
          </span>
        </div>

        {/* Action Controls: Notice Board (Mobile) + Admin (Desktop) + Hamburger Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notice Board Button for Mobile Navbar */}
          <button
            onClick={() => handleNavClick('notices')}
            className="lg:hidden bg-gold-gradient text-navy-dark font-bold text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-gold hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer"
          >
            <i className="fa-solid fa-clipboard-list text-xs"></i>
            <span>Notice Board</span>
          </button>

          {/* Admin Button for Desktop */}
          <button
            onClick={() => handleNavClick(adminTargetPage)}
            className="hidden lg:inline-flex bg-gold-gradient text-navy-dark font-bold text-xs sm:text-[13px] px-3 sm:px-4 py-1.5 rounded-full items-center gap-1.5 shadow-gold hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer"
          >
            <i className={`fa-solid ${isAdminAuthenticated ? 'fa-user-gear' : 'fa-lock'} text-xs`}></i>
            <span>{adminButtonText}</span>
          </button>

          {/* 3-Line Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden bg-white/10 hover:bg-white/20 text-white p-2 rounded-md border border-white/20 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg w-5 text-center`}></i>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown (Inside 3-line bar) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-dark border-t border-white/10 shadow-2xl animate-fadeIn">
          <ul className="flex flex-col py-3 px-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-gold/20 text-gold-light border-l-4 border-gold'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <i className={`${item.icon} text-sm w-5 text-center text-gold-light`}></i>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}

            {/* Admin Button inside 3-Line Menu */}
            <li className="pt-2.5 mt-1 border-t border-white/10">
              <button
                onClick={() => handleNavClick(adminTargetPage)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-navy-dark font-bold text-sm shadow-gold hover:opacity-95 transition-all cursor-pointer"
              >
                <i className={`fa-solid ${isAdminAuthenticated ? 'fa-user-gear' : 'fa-lock'} text-xs`}></i>
                <span>{adminButtonText}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
