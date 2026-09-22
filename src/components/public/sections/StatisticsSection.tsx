import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Users, GraduationCap, Award, BookOpen, Clock, Laptop } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const { students, teachers, siteSettings, performanceStats } = useCMSStore();

  const totalStudents = students.length > 0 ? 850 + students.length : 920;
  const totalTeachers = teachers.length > 0 ? 24 + teachers.length : 32;
  const latestStat = performanceStats[performanceStats.length - 1];
  const passRate = latestStat ? latestStat.passRate : 99.5;
  const yearsEst = new Date().getFullYear() - parseInt(siteSettings.establishedYear || '1972');

  const stats = [
    {
      label: 'Enrolled Students',
      value: `${totalStudents}+`,
      sub: 'Classes 6 through 10',
      icon: Users,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-800/40'
    },
    {
      label: 'Qualified Educators',
      value: `${totalTeachers}+`,
      sub: 'Dedicated subject specialists',
      icon: GraduationCap,
      color: 'text-blue-400',
      bg: 'bg-blue-950/40 border-blue-800/40'
    },
    {
      label: 'Average SSC Pass Rate',
      value: `${passRate}%`,
      sub: 'BISE Rajshahi Board',
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-800/40'
    },
    {
      label: 'Years of Excellence',
      value: `${yearsEst}+`,
      sub: 'Founded in 1972',
      icon: Clock,
      color: 'text-teal-400',
      bg: 'bg-teal-950/40 border-teal-800/40'
    }
  ];

  return (
    <section className="py-14 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
            Institutional Legacy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dadra High School in Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Consistent performance, expanding infrastructure, and enduring trust of Joypurhat community.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border backdrop-blur-md ${s.bg} flex flex-col justify-between hover:scale-105 transition-transform`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-400">{s.label}</span>
                  <div className={`p-2 rounded-xl bg-white/5 ${s.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white block">
                    {s.value}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 block font-medium">
                    {s.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
