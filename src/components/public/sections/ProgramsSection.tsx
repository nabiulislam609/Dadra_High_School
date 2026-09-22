import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { BookOpen, ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';

interface ProgramsSectionProps {
  onNavigate: (path: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onNavigate }) => {
  const { academicPrograms } = useCMSStore();

  const activePrograms = academicPrograms
    .filter(p => p.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activePrograms.length === 0) return null;

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200/60 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 bg-blue-100/80 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              Curriculum & Disciplines
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Academic Programs & Streams
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Affiliated with BISE Rajshahi, offering specialized secondary education streams for classes VI to X.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/academic')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-white border border-blue-200 hover:bg-blue-50 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            Detailed Curriculum & Syllabus
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePrograms.map(program => (
            <div
              key={program.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={program.imageUrl}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {program.classRange}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Subjects
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {program.subjects.slice(0, 4).map((sub, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {sub}
                        </span>
                      ))}
                      {program.subjects.length > 4 && (
                        <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">
                          +{program.subjects.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('/admission')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Apply for this stream
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
