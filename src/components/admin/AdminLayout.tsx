import React, { useState } from 'react';
import { useCMSStore } from '../../lib/store';
import { 
  LayoutDashboard, 
  LayoutTemplate, 
  Bell, 
  Users, 
  GraduationCap, 
  Sparkles, 
  Award, 
  Newspaper, 
  Calendar, 
  Image, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X,
  School
} from 'lucide-react';

import { AdminDashboardOverview } from './views/AdminDashboardOverview';
import { AdminSectionsManager } from './views/AdminSectionsManager';
import { AdminNoticesManager } from './views/AdminNoticesManager';
import { AdminStudentsManager } from './views/AdminStudentsManager';
import { AdminTeachersManager } from './views/AdminTeachersManager';
import { AdminAdmissionsManager } from './views/AdminAdmissionsManager';
import { AdminResultsManager } from './views/AdminResultsManager';
import { AdminNewsManager } from './views/AdminNewsManager';
import { AdminEventsManager } from './views/AdminEventsManager';
import { AdminGalleryManager } from './views/AdminGalleryManager';
import { AdminMessagesManager } from './views/AdminMessagesManager';
import { AdminSettingsManager } from './views/AdminSettingsManager';

interface AdminLayoutProps {
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitAdmin }) => {
  const { adminUser, logoutAdmin, siteSettings, admissionApplications, contactMessages, notices } = useCMSStore();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingAdmissions = admissionApplications.filter(a => a.status === 'Pending').length;
  const unreadMessages = contactMessages.filter(m => m.status === 'unread').length;

  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'sections', label: 'Homepage Sections', icon: LayoutTemplate },
    { 
      id: 'notices', 
      label: 'Notices & Circulars', 
      icon: Bell, 
      count: notices.length 
    },
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'teachers', label: 'Teachers & Faculty', icon: GraduationCap },
    { 
      id: 'admissions', 
      label: 'Online Admissions', 
      icon: Sparkles, 
      badge: pendingAdmissions > 0 ? pendingAdmissions : undefined,
      badgeColor: 'bg-purple-600 text-white' 
    },
    { id: 'results', label: 'Exam Results Sheet', icon: Award },
    { id: 'news', label: 'News & Press', icon: Newspaper },
    { id: 'events', label: 'Calendar Events', icon: Calendar },
    { id: 'gallery', label: 'Photo Gallery', icon: Image },
    { 
      id: 'messages', 
      label: 'Public Inquiries', 
      icon: MessageSquare, 
      badge: unreadMessages > 0 ? unreadMessages : undefined,
      badgeColor: 'bg-rose-600 text-white' 
    },
    { id: 'settings', label: 'Institutional Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logoutAdmin();
    onExitAdmin();
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminDashboardOverview onSelectTab={tab => setActiveTab(tab)} />;
      case 'sections':
        return <AdminSectionsManager />;
      case 'notices':
        return <AdminNoticesManager />;
      case 'students':
        return <AdminStudentsManager />;
      case 'teachers':
        return <AdminTeachersManager />;
      case 'admissions':
        return <AdminAdmissionsManager />;
      case 'results':
        return <AdminResultsManager />;
      case 'news':
        return <AdminNewsManager />;
      case 'events':
        return <AdminEventsManager />;
      case 'gallery':
        return <AdminGalleryManager />;
      case 'messages':
        return <AdminMessagesManager />;
      case 'settings':
        return <AdminSettingsManager />;
      default:
        return <AdminDashboardOverview onSelectTab={tab => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <School className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black tracking-tight text-white">
                    {siteSettings.siteName}
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
                    EIIN: {siteSettings.eiin}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Administrative Management Console
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>

            {/* Current user */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-white flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {adminUser?.name || 'Administrator'}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  {adminUser?.role || 'super_admin'}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/40 transition-colors"
                title="Log Out of Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside
          className={`lg:w-64 shrink-0 fixed inset-y-0 left-0 z-50 lg:static bg-white lg:bg-transparent p-5 lg:p-0 shadow-2xl lg:shadow-none transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <span className="font-bold text-slate-800 text-sm">Navigation Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1 bg-white p-3 rounded-3xl border border-slate-200/80 shadow-sm">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/10'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && !item.badge && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 p-4 rounded-3xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
            <span className="font-bold block">Live CMS Synchronization</span>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              All changes to notices, admissions, and exam marks immediately update and reflect on the public portal without redeployment.
            </p>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 min-w-0">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};
