import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Award, GraduationCap, Quote, Mail, Phone } from 'lucide-react';

export const LeadershipView: React.FC = () => {
  const { leadership, siteSettings } = useCMSStore();

  const published = leadership
    .filter(l => l.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Award className="w-3.5 h-3.5" />
            Governance & Vision
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            School Leadership & Administration
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Visionary leaders steering Dadra High School with pedagogical excellence and community values.
          </p>
        </div>

        <div className="space-y-8">
          {published.map(leader => (
            <div
              key={leader.id}
              className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 border-4 border-emerald-600 shadow-lg">
                <img
                  src={leader.photoUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {leader.name}
                  </h2>
                  <span className="text-sm font-bold text-emerald-700 block">
                    {leader.designation}
                  </span>
                  <span className="text-xs text-slate-500 font-medium inline-flex items-center gap-1.5 mt-1">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    {leader.qualification}
                  </span>
                </div>

                <div className="relative pl-6 border-l-2 border-emerald-500 py-1">
                  <Quote className="w-5 h-5 text-emerald-400 absolute -top-2 left-0 -translate-x-1/2 bg-white" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{leader.message}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
