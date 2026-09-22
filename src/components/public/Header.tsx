import React, { useState } from 'react';
import { useCMSStore } from '../../lib/store';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Youtube, 
  Instagram, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  GraduationCap,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { siteSettings, navigation, adminUser } = useCMSStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const visibleNavItems = navigation
    .filter(item => item.isVisible)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const handleNavClick = (url: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(url, '_blank');
    } else {
      onNavigate(url);
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-100 sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Contact Details & EIIN */}
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              EIIN: {siteSettings.eiin}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {siteSettings.officeHours}
            </span>
            <a href={`tel:${siteSettings.phone}`} className="inline-flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              {siteSettings.phone}
            </a>
            <a href={`mailto:${siteSettings.email}`} className="hidden lg:inline-flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              {siteSettings.email}
            </a>
          </div>

          {/* Social Links & Admin Access */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-r border-slate-700 pr-3">
              {siteSettings.facebookUrl && (
                <a href={siteSettings.facebookUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {siteSettings.youtubeUrl && (
                <a href={siteSettings.youtubeUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-rose-400 transition-colors">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              )}
              {siteSettings.instagramUrl && (
                <a href={siteSettings.instagramUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={() => onNavigate('/admin')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all shadow-sm"
              title="Access School Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {adminUser ? 'Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Main School Brand Identity Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          onClick={() => onNavigate('/')}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-emerald-50 p-1 border-2 border-emerald-600 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <img 
              src={siteSettings.logoUrl} 
              alt={siteSettings.siteName} 
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bangla text-emerald-800 text-lg md:text-xl font-bold tracking-tight">
                {siteSettings.banglaName}
              </span>
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                Est. {siteSettings.establishedYear}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {siteSettings.siteName}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl font-medium">
              {siteSettings.tagline}
            </p>
          </div>
        </div>

        {/* Quick Action Badges */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium block">Admissions Helpdesk</span>
            <span className="text-sm font-bold text-slate-800">{siteSettings.emergencyPhone}</span>
          </div>
          <button
            onClick={() => onNavigate('/admission')}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            Apply for Admission
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-emerald-800 text-white border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleNavItems.map(item => {
              const isActive = currentPath === item.url;
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div 
                  key={item.id} 
                  className="relative group py-2"
                  onMouseEnter={() => hasChildren && setActiveDropdown(item.id)}
                  onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.url, item.openNewTab)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-emerald-950 text-white shadow-inner' 
                        : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasChildren && <ChevronDown className="w-4 h-4 text-emerald-300 group-hover:rotate-180 transition-transform" />}
                  </button>

                  {/* Dropdown Menu */}
                  {hasChildren && (
                    <div className="absolute top-full left-0 w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.children?.map(sub => (
                        <button
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavClick(sub.url, sub.openNewTab);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                            currentPath === sub.url 
                              ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {sub.openNewTab && <ExternalLink className="w-3.5 h-3.5 text-slate-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Result Button on Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onNavigate('/results')}
              className="flex items-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-emerald-700 font-medium transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              Check SSC / Exam Results
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center justify-between w-full md:hidden py-2.5">
            <span className="text-sm font-bold tracking-wide text-emerald-100">
              DADRA HIGH SCHOOL
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-900 border-t border-emerald-950 px-4 pt-2 pb-5 space-y-1">
            {visibleNavItems.map(item => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = activeDropdown === item.id;

              return (
                <div key={item.id} className="border-b border-emerald-800/60 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNavClick(item.url, item.openNewTab)}
                      className={`text-left w-full py-2.5 px-3 rounded-lg text-sm font-semibold ${
                        currentPath === item.url ? 'bg-emerald-950 text-white' : 'text-emerald-100 hover:bg-emerald-800'
                      }`}
                    >
                      {item.label}
                      {item.banglaLabel && <span className="ml-2 text-xs text-emerald-300 font-bangla">({item.banglaLabel})</span>}
                    </button>
                    {hasChildren && (
                      <button
                        onClick={() => setActiveDropdown(isExpanded ? null : item.id)}
                        className="p-2 text-emerald-300 hover:text-white"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-emerald-950/60 rounded-lg my-1">
                      {item.children?.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(sub.url, sub.openNewTab)}
                          className="w-full text-left py-2 px-3 text-xs text-emerald-200 hover:text-white rounded hover:bg-emerald-800 block"
                        >
                          • {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('/admission')}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-center rounded-lg text-sm"
              >
                Apply for Admission 2026
              </button>
              <button
                onClick={() => handleNavClick('/admin')}
                className="w-full py-2 bg-slate-800 text-slate-200 hover:text-white font-medium text-center rounded-lg text-xs"
              >
                Admin Management Portal
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
