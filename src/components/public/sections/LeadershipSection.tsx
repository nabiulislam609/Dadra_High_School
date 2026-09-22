import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Quote, Award, GraduationCap } from 'lucide-react';

interface LeadershipSectionProps {
  onNavigate: (path: string) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onNavigate }) => {
  const { leadership } = useCMSStore();

  const published = leadership
    .filter(l => l.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (published.length === 0) return null;

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Institutional Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Words of Wisdom & Guidance
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Steering Dadra High School with visionary educational leadership and steadfast community commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {published.map(leader => (
            <div
              key={leader.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-600 shadow-md">
                <img
                  src={leader.photoUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 space-y-3">
                <Quote className="w-7 h-7 text-emerald-400 opacity-60" />
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{leader.message}"
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-base font-extrabold text-slate-900">
                    {leader.name}
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 block">
                    {leader.designation}
                  </span>
                  <span className="text-xs text-slate-500 font-medium inline-flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    {leader.qualification}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
