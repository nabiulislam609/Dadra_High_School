import React from 'react';
import { useCMSStore } from '../../lib/store';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Youtube, 
  Instagram, 
  ShieldCheck, 
  ChevronRight, 
  ArrowUp,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteSettings, navigation } = useCMSStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = navigation.filter(n => n.isVisible).slice(0, 6);

  const importantPortals = [
    { name: 'Ministry of Education Bangladesh', url: 'https://moedu.gov.bd' },
    { name: 'BISE Rajshahi Education Board', url: 'https://rajshahieducationboard.gov.bd' },
    { name: 'Directorate of Secondary & Higher Education (DSHE)', url: 'https://dshe.gov.bd' },
    { name: 'National Curriculum & Textbook Board (NCTB)', url: 'https://nctb.gov.bd' },
    { name: 'Joypurhat District Administration', url: 'https://joypurhat.gov.bd' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* Upper Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Identity & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-emerald-50 p-1 border border-emerald-500 shrink-0">
                <img
                  src={siteSettings.logoUrl}
                  alt={siteSettings.siteName}
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-bangla text-emerald-400 font-bold text-sm block">
                  {siteSettings.banglaName}
                </span>
                <span className="text-white font-extrabold text-base block leading-tight">
                  {siteSettings.siteName}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  EIIN: {siteSettings.eiin} • Est. {siteSettings.establishedYear}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {siteSettings.tagline}. Affiliated with the Board of Intermediate and Secondary Education (BISE) Rajshahi, Joypurhat Sadar, Bangladesh.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {siteSettings.facebookUrl && (
                <a
                  href={siteSettings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteSettings.youtubeUrl && (
                <a
                  href={siteSettings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {siteSettings.instagramUrl && (
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.url)}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/results')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-300 font-semibold"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Check Exam Results</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Government & Education Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-slate-800 pb-2">
              Important Portals
            </h4>
            <ul className="space-y-2">
              {importantPortals.map((p, i) => (
                <li key={i}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center justify-between text-slate-300"
                  >
                    <span>{p.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-slate-800 pb-2">
              Contact & Address
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.officeHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="border-t border-slate-900 bg-black/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p className="text-center sm:text-left text-[11px]">
            {siteSettings.copyrightText}
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onNavigate('/admin')}
              className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
