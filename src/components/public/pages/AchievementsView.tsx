import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Trophy, Star, Award, ShieldCheck } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements } = useCMSStore();

  const published = achievements
    .filter(a => a.isPublished)
    .sort((a, b) => b.year - a.year);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Trophy className="w-3.5 h-3.5" />
            Distinction & Honor
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Institutional Achievements & Awards
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Recognitions won by students and faculty in national debates, science Olympiads, and athletic championships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.map(ach => (
            <div
              key={ach.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={ach.imageUrl}
                  alt={ach.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  {ach.year}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    {ach.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {ach.studentName && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                    Honoree / Recipient: <span className="font-bold text-slate-900">{ach.studentName}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
