import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { BookOpen, ShieldCheck, CheckCircle2, Clock, Award, Users, AlertCircle } from 'lucide-react';

export const StudentsView: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Users className="w-3.5 h-3.5" />
            Student Body & Life
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Student Guidelines & Code of Conduct
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Fostering discipline, academic integrity, punctuality, and mutual respect on campus.
          </p>
        </div>

        {/* Info notice about student privacy as requested in prompt */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Institutional Privacy Notice:</span>
            Student personal identification, addresses, and contact records are securely protected in the administrative database and accessible only to authorized guardians via our confidential result portal or the Headmaster's desk.
          </div>
        </div>

        {/* Rules & Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Campus Hours & Punctuality
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Morning assembly begins strictly at <strong>9:15 AM</strong>. Gates close at 9:30 AM.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Classes conclude at <strong>3:45 PM</strong>. Minimum 85% attendance required for exam eligibility.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Sick leave requests must be countersigned by parents/guardians within 3 school days.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Prescribed School Uniform
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Boys:</strong> White shirt with school monogram, navy blue trousers, black shoes, white socks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Girls:</strong> White salwar-kameez, navy blue orna/scarf, black flat shoes, white socks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>School identification badge must be visibly worn at all times while on school grounds.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Integrity */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Co-Curricular Participation & Character
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every enrolled student is expected to take an active role in at least one student organization: Bangladesh Scouts, Red Crescent Youth, Debate Society, Science Club, or the School Athletics League. We place equal emphasis on moral character, kindness toward peers, and reverence for teachers and staff.
          </p>
        </div>
      </div>
    </div>
  );
};
