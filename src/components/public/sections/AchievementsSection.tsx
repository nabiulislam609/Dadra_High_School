import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Award, Trophy, Star, ArrowRight } from 'lucide-react';
import { Achievement } from '../../../types';

interface AchievementsSectionProps {
  onNavigate: (path: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ onNavigate }) => {
  const { achievements } = useCMSStore();

  const published = achievements
    .filter((a: Achievement) => a.isPublished)
    .sort((a: Achievement, b: Achievement) => a.displayOrder - b.displayOrder);

  if (published.length === 0) return null;

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200/60 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              Honors & Accolades
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              School Pride & Accolades
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Celebrating district, divisional and national recognitions earned by our talented students and mentors.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/achievements')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            All Institutional Honors
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {published.map(ach => (
            <div
              key={ach.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src={ach.imageUrl}
                  alt={ach.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-950" />
                  {ach.year}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    {ach.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {ach.studentName && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
                    Recipient: <span className="font-semibold text-slate-800">{ach.studentName}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
