import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { BookOpen, Award, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface AcademicViewProps {
  onNavigate: (path: string) => void;
}

export const AcademicView: React.FC<AcademicViewProps> = ({ onNavigate }) => {
  const { academicPrograms } = useCMSStore();

  const gradingScale = [
    { marks: '80% - 100%', grade: 'A+', gpa: '5.00', status: 'Outstanding' },
    { marks: '70% - 79%', grade: 'A', gpa: '4.00', status: 'Very Good' },
    { marks: '60% - 69%', grade: 'A-', gpa: '3.50', status: 'Good' },
    { marks: '50% - 59%', grade: 'B', gpa: '3.00', status: 'Satisfactory' },
    { marks: '40% - 49%', grade: 'C', gpa: '2.00', status: 'Passing' },
    { marks: '33% - 39%', grade: 'D', gpa: '1.00', status: 'Minimum Pass' },
    { marks: '0% - 32%', grade: 'F', gpa: '0.00', status: 'Failed' }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum & Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Academic Curriculum & Guidelines
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Approved by the Board of Intermediate and Secondary Education (BISE) Rajshahi.
          </p>
        </div>

        {/* Academic Streams */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Secondary Education Streams (Classes 9 & 10)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicPrograms.map(prog => (
              <div key={prog.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="h-40 rounded-2xl overflow-hidden relative">
                  <img src={prog.imageUrl} alt={prog.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2 py-0.5 rounded">
                    {prog.classRange}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{prog.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Subject Coverage</span>
                  <div className="flex flex-wrap gap-1">
                    {prog.subjects.map((sub, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grading System Table */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">National Uniform Grading Scale</h3>
              <p className="text-xs text-slate-500">Ministry of Education & BISE Rajshahi Secondary Scale</p>
            </div>
            <button
              onClick={() => onNavigate('/results')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg"
            >
              Verify Individual Student Result
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Marks Range</th>
                  <th className="py-3 px-4">Letter Grade</th>
                  <th className="py-3 px-4">Grade Point (GPA)</th>
                  <th className="py-3 px-4">Performance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {gradingScale.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-slate-900">{row.marks}</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        row.grade === 'A+' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {row.grade}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">{row.gpa}</td>
                    <td className="py-2.5 px-4 text-slate-500">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
