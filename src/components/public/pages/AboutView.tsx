import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { History, Award, Target, Compass, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { siteSettings, cmsPages } = useCMSStore();
  const aboutPage = cmsPages.find(p => p.slug === 'about');
  const historyPage = cmsPages.find(p => p.slug === 'history');

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            EIIN: {siteSettings.eiin} • BISE Rajshahi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About {siteSettings.siteName}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            {siteSettings.banglaName} — dedicated to scholastic distinction, moral upbringing, and technological literacy in Joypurhat since 1972.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Institution Overview
            </h2>
            <div 
              className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: aboutPage?.content || '' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To foster an inclusive, values-driven environment where learners develop analytical thinking, social empathy, scientific rigor, and leadership capabilities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To be acknowledged as a model secondary institution across northern Bangladesh, renowned for academic integrity and civic leadership.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <History className="w-6 h-6 text-emerald-600" />
              Historical Heritage
            </h2>
            <div 
              className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: historyPage?.content || '' }}
            />
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Campus Infrastructure & Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3.5-Acre Peaceful Campus in Joypurhat Sadar</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 4-Story Modern Multi-Facility Academic Annex</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sheikh Russel Digital Multimedia Computer Lab</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Specialized Physics, Chemistry & Biology Labs</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Central School Library with 5,000+ Books</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bangladesh Scouts & Red Crescent Youth Unit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
