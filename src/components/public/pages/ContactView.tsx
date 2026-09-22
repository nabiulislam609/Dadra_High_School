import React from 'react';
import { ContactSection } from '../sections/ContactSection';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useCMSStore } from '../../../lib/store';

export const ContactView: React.FC = () => {
  const { siteSettings } = useCMSStore();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Mail className="w-3.5 h-3.5" />
            Direct Communication
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact Dadra High School
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Joypurhat Sadar, Joypurhat, Rajshahi Division, Bangladesh.
          </p>
        </div>

        <ContactSection onNavigate={() => {}} />
      </div>
    </div>
  );
};
