import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { CheckCircle2, ArrowRight, Compass, Target, History, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { siteSettings } = useCMSStore();

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image & Stamp side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                alt="Dadra High School Campus"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Joypurhat, Bangladesh</span>
                <p className="text-sm font-semibold mt-1">Holistic student growth in a peaceful, modern campus environment.</p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-emerald-700 text-white p-5 rounded-2xl shadow-xl border-4 border-white max-w-[200px]">
              <span className="text-3xl font-extrabold block tracking-tight">54+</span>
              <span className="text-xs font-semibold leading-tight block text-emerald-100">
                Years of Academic Distinction Since 1972
              </span>
            </div>
          </div>

          {/* Description & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                <History className="w-3.5 h-3.5" />
                Heritage & Excellence
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Students to Lead, Innovate, and Serve
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                Founded in 1972, {siteSettings.siteName} ({siteSettings.banglaName}) stands as one of the most respected secondary schools in Joypurhat Sadar. Under the Board of Intermediate and Secondary Education (BISE) Rajshahi, our institution combines rigorous science, commerce, and humanities curricula with modern computer training and co-curricular programs.
              </p>
            </div>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Our Mission</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Provide inclusive, high-caliber secondary education that develops critical reasoning and moral integrity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Our Vision</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be northern Bangladesh's premier model school known for science, technology, and sports championship.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Full Digital Multimedia Classrooms</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Well-equipped Science Laboratories</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Modern Computer Training Lab</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Enriched Library with 5,000+ Volumes</span>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors shadow-md"
              >
                Read Full School History
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/teachers')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
              >
                Meet Our Teachers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
