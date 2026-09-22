import React from 'react';
import { Sparkles, GraduationCap, FileText, PhoneCall, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface QuickAccessSectionProps {
  onNavigate: (path: string) => void;
}

export const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({ onNavigate }) => {
  const actions = [
    {
      title: 'Online Admission 2026',
      desc: 'Apply online for Classes 6 through 9 with instant registration tracking ID.',
      icon: Sparkles,
      action: '/admission',
      btnText: 'Apply Online',
      color: 'bg-emerald-600 text-white'
    },
    {
      title: 'SSC & Exam Results',
      desc: 'Search student mark sheets and download certified institutional transcripts.',
      icon: GraduationCap,
      action: '/results',
      btnText: 'Search Result',
      color: 'bg-blue-600 text-white'
    },
    {
      title: 'Academic Routine & Syllabus',
      desc: 'Download current term routines, holiday list, and subject syllabuses.',
      icon: Download,
      action: '/notices',
      btnText: 'Download Files',
      color: 'bg-amber-600 text-white'
    },
    {
      title: 'Helpline & Office Inquiry',
      desc: 'Direct contact with Headmaster desk and student admission inquiry.',
      icon: PhoneCall,
      action: '/contact',
      btnText: 'Contact Desk',
      color: 'bg-teal-600 text-white'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl text-white">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
              Student & Parent Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Quick Services & Student Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Essential administrative links, academic records, and applications accessible with a single click.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((act, i) => {
              const Icon = act.icon;
              return (
                <div
                  key={i}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10">
                    <button
                      onClick={() => onNavigate(act.action)}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      {act.btnText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
