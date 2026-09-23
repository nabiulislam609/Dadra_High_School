import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Award, Plus, Trash2, Search, X } from 'lucide-react';
import { StudentResult, ResultSubject, Student } from '../../../types';

export const AdminResultsManager: React.FC = () => {
  const { studentResults, addStudentResult, updateStudentResult, deleteStudentResult, students } = useCMSStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<StudentResult | null>(null);

  // Form Fields
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('Class 10');
  const [section, setSection] = useState('A');
  const [roll, setRoll] = useState(1);
  const [examName, setSelectedExam] = useState('Pre-Test Examination');
  const [examYear, setExamYear] = useState(2026);

  // Subject Marks State
  const [bangla, setBangla] = useState(85);
  const [english, setEnglish] = useState(82);
  const [math, setMath] = useState(90);
  const [science, setScience] = useState(88);
  const [bgs, setBgs] = useState(84);
  const [religion, setReligion] = useState(92);

  const calculateGradeAndPoint = (m: number) => {
    if (m >= 80) return { grade: 'A+', gradePoint: 5.0 };
    if (m >= 70) return { grade: 'A', gradePoint: 4.0 };
    if (m >= 60) return { grade: 'A-', gradePoint: 3.5 };
    if (m >= 50) return { grade: 'B', gradePoint: 3.0 };
    if (m >= 40) return { grade: 'C', gradePoint: 2.0 };
    if (m >= 33) return { grade: 'D', gradePoint: 1.0 };
    return { grade: 'F', gradePoint: 0.0 };
  };

  const openAddModal = () => {
    setEditingResult(null);
    setStudentId('DHS-2026-1003');
    setStudentName('');
    setClassName('Class 10');
    setSection('A');
    setRoll(3);
    setSelectedExam('Pre-Test Examination');
    setExamYear(2026);
    setBangla(80);
    setEnglish(75);
    setMath(85);
    setScience(80);
    setBgs(78);
    setReligion(88);
    setIsModalOpen(true);
  };

  const handleStudentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStd = students.find((s: Student) => s.studentId === e.target.value);
    if (selectedStd) {
      setStudentId(selectedStd.studentId);
      setStudentName(selectedStd.name);
      setClassName(selectedStd.className);
      setSection(selectedStd.section || 'A');
      setRoll(selectedStd.rollNumber);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !studentName) return;

    const subjects: ResultSubject[] = [
      { id: 'sub-1', subject: 'Bangla', marks: bangla, ...calculateGradeAndPoint(bangla) },
      { id: 'sub-2', subject: 'English', marks: english, ...calculateGradeAndPoint(english) },
      { id: 'sub-3', subject: 'General Mathematics', marks: math, ...calculateGradeAndPoint(math) },
      { id: 'sub-4', subject: 'General Science', marks: science, ...calculateGradeAndPoint(science) },
      { id: 'sub-5', subject: 'Bangladesh & Global Studies', marks: bgs, ...calculateGradeAndPoint(bgs) },
      { id: 'sub-6', subject: 'Islam & Moral Education', marks: religion, ...calculateGradeAndPoint(religion) }
    ];

    const hasFailed = subjects.some(s => s.grade === 'F');
    const totalPoints = subjects.reduce((sum, s) => sum + s.gradePoint, 0);
    const avgGpa = hasFailed ? 0.0 : Math.min(5.0, Number((totalPoints / subjects.length).toFixed(2)));
    const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);

    let finalGrade = 'A+';
    if (avgGpa === 0) finalGrade = 'F';
    else if (avgGpa >= 5.0) finalGrade = 'A+';
    else if (avgGpa >= 4.0) finalGrade = 'A';
    else if (avgGpa >= 3.5) finalGrade = 'A-';
    else if (avgGpa >= 3.0) finalGrade = 'B';
    else if (avgGpa >= 2.0) finalGrade = 'C';
    else finalGrade = 'D';

    const resultPayload = {
      studentId,
      studentName,
      className,
      section,
      roll: Number(roll),
      examName,
      examYear: Number(examYear),
      totalMarks,
      gpa: avgGpa,
      grade: finalGrade,
      published: true,
      subjects
    };

    if (editingResult) {
      updateStudentResult(editingResult.id, resultPayload);
    } else {
      addStudentResult(resultPayload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete result sheet for "${name}"?`)) {
      deleteStudentResult(id);
    }
  };

  const filtered = studentResults.filter((r: StudentResult) =>
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Examination Results & Marks Register
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Input student subject scores, compute GPA, and make results instantly verifiable on the public portal.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Student Result
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by student name or ID..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        />
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap">Student ID & Name</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Class & Roll</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Examination</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Total Marks</th>
                <th className="py-3.5 px-4 whitespace-nowrap">GPA</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Grade</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-6 text-right whitespace-nowrap w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((r: StudentResult) => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{r.studentName}</div>
                    <div className="text-[11px] font-mono text-emerald-800">{r.studentId}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{r.className} (Roll: {r.roll})</td>
                  <td className="py-3 px-4 text-slate-600">{r.examName} ({r.examYear})</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.totalMarks}</td>
                  <td className="py-3 px-4 font-black text-emerald-700">{r.gpa.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      r.grade === 'A+' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {r.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                      {r.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleDelete(r.id, r.studentName)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                        title="Delete Result"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              Input Student Examination Marks
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Select Enrolled Student or Enter ID
                </label>
                <select
                  onChange={handleStudentSelect}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 mb-2"
                >
                  <option value="">-- Choose from existing students --</option>
                  {students.map((s: Student) => (
                    <option key={s.id} value={s.studentId}>
                      {s.name} ({s.studentId} - {s.className})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Student ID *</label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Class</label>
                  <input
                    type="text"
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Roll No</label>
                  <input
                    type="number"
                    value={roll}
                    onChange={e => setRoll(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Year</label>
                  <input
                    type="number"
                    value={examYear}
                    onChange={e => setExamYear(parseInt(e.target.value) || 2026)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Examination</label>
                <select
                  value={examName}
                  onChange={e => setSelectedExam(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                >
                  <option value="Pre-Test Examination">Pre-Test Examination</option>
                  <option value="Annual Examination 2025">Annual Examination 2025</option>
                  <option value="Half-Yearly Examination 2025">Half-Yearly Examination 2025</option>
                </select>
              </div>

              {/* Subject Marks Input Grid */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-800 block mb-2">Subject Marks (Out of 100)</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-0.5">Bangla:</label>
                    <input type="number" min="0" max="100" value={bangla} onChange={e => setBangla(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-0.5">English:</label>
                    <input type="number" min="0" max="100" value={english} onChange={e => setEnglish(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-0.5">General Mathematics:</label>
                    <input type="number" min="0" max="100" value={math} onChange={e => setMath(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-0.5">General Science:</label>
                    <input type="number" min="0" max="100" value={science} onChange={e => setScience(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-0.5">BGS:</label>
                    <input type="number" min="0" max="100" value={bgs} onChange={e => setBgs(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-0.5">Religion:</label>
                    <input type="number" min="0" max="100" value={religion} onChange={e => setReligion(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Publish Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
