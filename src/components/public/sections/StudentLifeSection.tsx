import React from 'react';
import { Laptop, BookOpen, Activity, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

interface StudentLifeSectionProps {
  onNavigate: (path: string) => void;
}

export const StudentLifeSection: React.FC<StudentLifeSectionProps> = ({ onNavigate }) => {
  const facilities = [
    {
      title: 'Sheikh Russel Digital Lab',
      desc: '30 modern PCs with high-speed internet, projector classroom, and foundational coding education.',
      icon: Laptop,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Central School Library',
      desc: 'Over 5,000 reference books, encyclopedias, national daily newspapers, and quiet study alcoves.',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Expansive Athletic Field',
      desc: '3-acre green playground accommodating seasonal football, cricket tournaments, and annual athletics.',
      icon: Activity,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Bangladesh Scouts Troop',
      desc: 'Active scout patrol cultivating leadership, survival skills, camping, and community flood relief service.',
      icon: Compass,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'Red Crescent Youth Unit',
      desc: 'First-aid training, disaster response drills, and voluntary campus blood donation awareness drives.',
      icon: HeartHandshake,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      title: 'Cultural & Debating Society',
      desc: 'Weekly parliamentary debate practice, national day drama staging, poetry recitation, and music club.',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    }
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Beyond the Classroom
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Life & Campus Facilities
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            A balanced environment designed to foster physical stamina, civic empathy, and technical curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all space-y-3 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${fac.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
