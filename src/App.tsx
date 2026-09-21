import React, { useState, useEffect } from 'react';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { NoticeTicker } from './components/layout/NoticeTicker';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Academics } from './pages/Academics';
import { Faculty } from './pages/Faculty';
import { Students } from './pages/Students';
import { MandatoryDisclosure } from './pages/MandatoryDisclosure';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Notices } from './pages/Notices';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

const PAGE_ROUTE_MAP: Record<string, string> = {
  home: '/home',
  about: '/about',
  academics: '/academics',
  faculty: '/faculty',
  students: '/students',
  notices: '/notices',
  'mandatory-disclosure': '/mandatory-disclosure',
  gallery: '/gallery',
  contact: '/contact',
  admin: '/admin',
  'admin-dashboard': '/admin',
  'admin-login': '/admin-login',
  login: '/admin-login'
};

const parsePathToPage = (path: string): string => {
  const clean = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'home') return 'home';
  if (clean === 'admin' || clean === 'admin-dashboard') return 'admin';
  if (clean === 'admin-login' || clean === 'login') return 'admin-login';
  if (PAGE_ROUTE_MAP[clean]) return clean;
  return 'home';
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Check session & sync browser URL on initial mount
  useEffect(() => {
    const session = sessionStorage.getItem('svce_admin_session');
    const isAuth = Boolean(session);
    setIsAdminAuthenticated(isAuth);

    const initialPage = parsePathToPage(window.location.pathname);
    setCurrentPage(initialPage);

    // Sync canonical browser URL
    const canonicalPath = PAGE_ROUTE_MAP[initialPage] || '/home';
    if (window.location.pathname !== canonicalPath) {
      window.history.replaceState({ page: initialPage }, '', canonicalPath);
    }

    // Handle browser Back / Forward history navigation
    const handlePopState = () => {
      const page = parsePathToPage(window.location.pathname);
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle URL history push and page transition
  const navigateTo = (page: string) => {
    let targetPage = page;
    if (page === 'admin-dashboard') targetPage = 'admin';
    if (page === 'login') targetPage = 'admin-login';

    const canonicalPath = PAGE_ROUTE_MAP[targetPage] || `/${targetPage}`;
    if (window.location.pathname !== canonicalPath) {
      window.history.pushState({ page: targetPage }, '', canonicalPath);
    }

    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if viewing the dedicated Admin Dashboard
  const isInsideAdminDashboard = 
    (currentPage === 'admin' || currentPage === 'admin-dashboard') && isAdminAuthenticated;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      case 'about':
        return <About onNavigate={navigateTo} />;
      case 'academics':
        return <Academics onNavigate={navigateTo} />;
      case 'faculty':
        return <Faculty onNavigate={navigateTo} />;
      case 'students':
        return <Students onNavigate={navigateTo} />;
      case 'notices':
        return <Notices onNavigate={navigateTo} />;
      case 'mandatory-disclosure':
        return <MandatoryDisclosure onNavigate={navigateTo} />;
      case 'gallery':
        return <Gallery onNavigate={navigateTo} />;
      case 'contact':
        return <Contact onNavigate={navigateTo} />;
      case 'admin-login':
        return isAdminAuthenticated ? (
          <AdminDashboard
            onLogout={() => {
              sessionStorage.removeItem('svce_admin_session');
              setIsAdminAuthenticated(false);
              navigateTo('home');
            }}
            onNavigate={navigateTo}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={() => {
              setIsAdminAuthenticated(true);
              navigateTo('admin');
            }}
            onNavigate={navigateTo}
          />
        );
      case 'admin':
      case 'admin-dashboard':
        return isAdminAuthenticated ? (
          <AdminDashboard
            onLogout={() => {
              sessionStorage.removeItem('svce_admin_session');
              setIsAdminAuthenticated(false);
              navigateTo('home');
            }}
            onNavigate={navigateTo}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={() => {
              setIsAdminAuthenticated(true);
              navigateTo('admin');
            }}
            onNavigate={navigateTo}
          />
        );
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-main text-slate-800">
      {/* Hide Public Header / Navbar / Ticker when Inside Admin Dashboard */}
      {!isInsideAdminDashboard && (
        <>
          {/* Top Contact Bar */}
          <TopBar />

          {/* Main Header with Crest */}
          <Header onNavigate={navigateTo} />

          {/* Sticky Navigation Bar */}
          <Navbar 
            currentPage={currentPage} 
            onNavigate={navigateTo}
            isAdminAuthenticated={isAdminAuthenticated}
          />

          {/* Announcement Marquee Ticker */}
          <NoticeTicker onNavigate={navigateTo} />
        </>
      )}

      {/* Main Page Content */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Hide Public Footer when Inside Admin Dashboard */}
      {!isInsideAdminDashboard && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
};
