import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Users, Mail, Phone, ArrowRight, GraduationCap, BookOpen } from 'lucide-react';

interface TeachersSectionProps {
  onNavigate: (path: string) => void;
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ onNavigate }) => {
  const { teachers } = useCMSStore();

  const publishedTeachers = teachers
    .filter(t => t.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (publishedTeachers.length === 0) return null;

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              Honorable Educators
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Faculty & Academic Mentors
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Experienced, passionate, and certified teachers shaping future doctors, engineers, and civic leaders.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/teachers')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-colors"
          >
            View Complete Teachers Directory
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedTeachers.slice(0, 4).map(teacher => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 overflow-hidden relative bg-slate-100">
                  <img
                    src={teacher.photoUrl}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-lg p-1.5 text-center text-white">
                    <span className="text-xs font-bold block">{teacher.subject}</span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {teacher.name}
                  </h3>
                  {teacher.banglaName && (
                    <span className="font-bangla text-xs text-emerald-800 font-semibold block">
                      {teacher.banglaName}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium block">
                    {teacher.designation}
                  </span>
                  <div className="pt-2 flex items-center justify-center gap-1 text-[11px] text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{teacher.qualification}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-around text-xs text-slate-500">
                <a
                  href={`mailto:${teacher.email}`}
                  className="p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  title={teacher.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${teacher.phone}`}
                  className="p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  title={teacher.phone}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
