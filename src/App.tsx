import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMSStore } from './lib/store';
import { ToastContainer } from './components/ui/ToastContainer';
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';
import { NoticeTicker } from './components/public/NoticeTicker';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';

// Public Page Views
import { HomeView } from './components/public/pages/HomeView';
import { AboutView } from './components/public/pages/AboutView';
import { AcademicView } from './components/public/pages/AcademicView';
import { AdmissionView } from './components/public/pages/AdmissionView';
import { NoticesView } from './components/public/pages/NoticesView';
import { TeachersView } from './components/public/pages/TeachersView';
import { StudentsView } from './components/public/pages/StudentsView';
import { ResultsView } from './components/public/pages/ResultsView';
import { EventsView } from './components/public/pages/EventsView';
import { NewsView } from './components/public/pages/NewsView';
import { GalleryView } from './components/public/pages/GalleryView';
import { AchievementsView } from './components/public/pages/AchievementsView';
import { LeadershipView } from './components/public/pages/LeadershipView';
import { ContactView } from './components/public/pages/ContactView';

const SchoolAppContent: React.FC = () => {
  const { adminUser } = useCMSStore();
  
  // Clean router state supporting pathname and hash navigation
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) return hash.startsWith('/') ? hash : `/${hash}`;
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        setCurrentPath(hash.startsWith('/') ? hash : `/${hash}`);
      } else {
        const path = window.location.pathname;
        setCurrentPath(path && path !== '' ? path : '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    setCurrentPath(normalized);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Admin Section Routing
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    if (adminUser) {
      return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
          <AdminLayout onExitAdmin={() => navigate('/')} />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-between">
        <Header currentPath={currentPath} onNavigate={navigate} />
        <div className="py-20">
          <AdminLogin onSuccess={() => navigate('/admin')} onCancel={() => navigate('/')} />
        </div>
        <Footer onNavigate={navigate} />
        <ToastContainer />
      </div>
    );
  }

  // Public View Router
  const renderPublicPage = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return <HomeView onNavigate={navigate} />;
      case '/about':
      case '/history':
        return <AboutView />;
      case '/academic':
      case '/programs':
        return <AcademicView onNavigate={navigate} />;
      case '/admission':
      case '/admissions':
        return <AdmissionView />;
      case '/notices':
      case '/notice-board':
        return <NoticesView />;
      case '/teachers':
      case '/faculty':
      case '/staff':
        return <TeachersView />;
      case '/students':
      case '/student-life':
        return <StudentsView />;
      case '/results':
      case '/ssc-results':
        return <ResultsView />;
      case '/events':
      case '/calendar':
        return <EventsView />;
      case '/news':
      case '/press':
        return <NewsView />;
      case '/gallery':
      case '/photos':
        return <GalleryView />;
      case '/achievements':
      case '/awards':
        return <AchievementsView />;
      case '/leadership':
      case '/principal':
      case '/governing-body':
        return <LeadershipView />;
      case '/contact':
      case '/contact-us':
        return <ContactView />;
      default:
        return <HomeView onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <NoticeTicker onNavigate={navigate} />
      
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      <Footer onNavigate={navigate} />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <SchoolAppContent />
    </CMSProvider>
  );
}
