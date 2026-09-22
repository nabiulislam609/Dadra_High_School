import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Award, Search, Printer, AlertCircle } from 'lucide-react';
import { StudentResult, ResultSubject } from '../../../types';

export const ResultsView: React.FC = () => {
  const { studentResults, siteSettings } = useCMSStore();
  const [studentIdInput, setStudentIdInput] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');
  const [foundResult, setFoundResult] = useState<StudentResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentIdInput.trim()) return;

    setHasSearched(true);
    const cleanedInput = studentIdInput.trim().toUpperCase();

    // Search by student ID or roll number
    const result = studentResults.find(
      (r: StudentResult) => 
        (r.studentId.toUpperCase() === cleanedInput || r.roll.toString() === cleanedInput) &&
        (selectedExam === 'all' || r.examName === selectedExam)
    );

    setFoundResult(result || null);
  };

  const handleQuickDemo = (id: string, exam: string) => {
    setStudentIdInput(id);
    setSelectedExam(exam);
    const result = studentResults.find((r: StudentResult) => r.studentId === id && (exam === 'all' || r.examName === exam));
    setFoundResult(result || null);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3 no-print">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Award className="w-3.5 h-3.5" />
            BISE Rajshahi Curriculum Standard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Online Academic Result & Transcript
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Verify term examination results, subject-wise marks, and download institutional grade sheets.
          </p>
        </div>

        {/* Search Panel */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 no-print">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            Search Student Examination Record
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Student ID or Class Roll Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DHS-2026-1001 or 1"
                value={studentIdInput}
                onChange={e => setStudentIdInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 uppercase"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Examination Term
              </label>
              <select
                value={selectedExam}
                onChange={e => setSelectedExam(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              >
                <option value="all">All Available Terms</option>
                <option value="Pre-Test Examination">Pre-Test Examination</option>
                <option value="Annual Examination 2025">Annual Examination 2025</option>
                <option value="Half-Yearly Examination 2025">Half-Yearly Examination 2025</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </form>

          {/* Quick Demo Helpers */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Demo Records:</span>
            <button
              onClick={() => handleQuickDemo('DHS-2026-1001', 'all')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 transition-colors"
            >
              Nusrat Jahan (GPA 5.00)
            </button>
            <button
              onClick={() => handleQuickDemo('DHS-2026-1002', 'all')}
              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold border border-blue-200 transition-colors"
            >
              Tanvir Ahmed (GPA 4.88)
            </button>
          </div>
        </div>

        {/* Search Results Display */}
        {hasSearched && !foundResult && (
          <div className="bg-white p-8 rounded-3xl border border-amber-200 text-center space-y-3 no-print">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Examination Record Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              We couldn't locate any published result for ID "{studentIdInput}". Please check your Student ID number or roll number.
            </p>
          </div>
        )}

        {foundResult && (
          <div className="space-y-4">
            <div className="flex justify-end no-print">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Official Academic Transcript
              </button>
            </div>

            {/* Official Academic Transcript Card (Optimized for Screen & Print) */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-xl space-y-6 printable-transcript">
              {/* Transcript Header */}
              <div className="text-center pb-6 border-b-2 border-slate-900 space-y-1 relative">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-emerald-50 p-1 border border-emerald-500">
                    <img src={siteSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h2 className="font-bangla text-emerald-800 font-bold text-base">
                      {siteSettings.banglaName}
                    </h2>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                      {siteSettings.siteName}
                    </h1>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium pt-1">
                  Joypurhat Sadar, Joypurhat • EIIN: {siteSettings.eiin} • Board: BISE Rajshahi
                </p>

                <div className="inline-block bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mt-2">
                  Academic Progress Report & Mark Sheet
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Student Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{foundResult.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Student ID:</span>
                  <span className="font-mono font-bold text-emerald-800">{foundResult.studentId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Class / Roll No:</span>
                  <span className="font-bold text-slate-800">{foundResult.className} (Sec: {foundResult.section}, Roll: {foundResult.roll})</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Examination:</span>
                  <span className="font-bold text-slate-800">{foundResult.examName} ({foundResult.examYear})</span>
                </div>
              </div>

              {/* Subject Marks Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border border-slate-200">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Subject Name</th>
                      <th className="py-2.5 px-3 text-center">Marks Obtained</th>
                      <th className="py-2.5 px-3 text-center">Letter Grade</th>
                      <th className="py-2.5 px-3 text-center">Grade Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {foundResult.subjects.map((sub: ResultSubject, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-semibold text-slate-900">{sub.subject}</td>
                        <td className="py-2 px-3 text-center font-bold text-slate-900">{sub.marks}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                            sub.grade === 'A+' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {sub.grade}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center font-semibold">{sub.gradePoint.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Overall Summary Bar */}
              <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Final Result Evaluation
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-emerald-950">
                      GPA: {foundResult.gpa.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-sm">
                      Grade: {foundResult.grade}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-600 block">
                    Result Status: <strong className="text-emerald-700 uppercase">{foundResult.published ? 'Published' : 'Draft'}</strong>
                  </span>
                  <span className="text-xs text-slate-500 block">
                    Total Marks: <strong>{foundResult.totalMarks}</strong>
                  </span>
                </div>
              </div>

              {/* Official Signatures Stamp */}
              <div className="pt-12 grid grid-cols-3 gap-6 text-center text-xs text-slate-600 border-t border-slate-200">
                <div>
                  <div className="border-t border-dashed border-slate-400 pt-2 w-36 mx-auto">
                    <span className="font-semibold block">Class Teacher</span>
                    <span className="text-[10px] text-slate-400">Signature</span>
                  </div>
                </div>

                <div>
                  <div className="border-t border-dashed border-slate-400 pt-2 w-36 mx-auto">
                    <span className="font-semibold block">Exam Controller</span>
                    <span className="text-[10px] text-slate-400">Signature & Seal</span>
                  </div>
                </div>

                <div>
                  <div className="border-t border-dashed border-slate-400 pt-2 w-36 mx-auto">
                    <span className="font-semibold block">Headmaster</span>
                    <span className="text-[10px] text-slate-400">Dadra High School</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
