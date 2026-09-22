import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Line, 
  ComposedChart 
} from 'recharts';
import { TrendingUp, ArrowRight, Award, CheckCircle } from 'lucide-react';

interface PerformanceSectionProps {
  onNavigate: (path: string) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ onNavigate }) => {
  const { performanceStats } = useCMSStore();

  const sortedStats = [...performanceStats].sort((a, b) => a.year - b.year);

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              Academic Standards
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              SSC Board Examination Performance
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Historical pass rate trends and GPA-5 (A+) statistics under BISE Rajshahi.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/results')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
          >
            Individual Result Search
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Chart View */}
          <div className="lg:col-span-8 bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">
                5-Year SSC Result Comparison (Pass Rate vs. GPA-5 Rate %)
              </h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                BISE Rajshahi
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sortedStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: '#cbd5e1' }} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="passRate" name="Pass Rate (%)" fill="#10b981" radius={[6, 6, 0, 0]} barSize={28} />
                  <Line type="monotone" dataKey="aPlusRate" name="GPA-5 Rate (%)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Highlights side */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800">
                <Award className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Peak Benchmark</span>
              </div>
              <h4 className="text-2xl font-black text-emerald-950">99.5% Pass Rate</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                In the recent 2025 SSC examinations, our students secured 46.2% GPA-5 (Golden A+ / A+), placing Dadra High School among the top schools in Joypurhat.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Academic Features
              </span>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Special coaching sessions for SSC Examinees
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Model tests & chapter-wise continuous assessments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Individual academic counseling for struggling learners
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
