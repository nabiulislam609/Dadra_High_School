import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Users, Plus, Edit, Trash2, Search, Filter, X, ShieldCheck, Printer } from 'lucide-react';
import { Student } from '../../../types';

export const AdminStudentsManager: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useCMSStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form fields
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [className, setClassName] = useState('Class 10');
  const [section, setSection] = useState('A');
  const [rollNumber, setRollNumber] = useState(1);
  const [group, setGroup] = useState<'Science' | 'Business Studies' | 'Humanities' | 'General'>('Science');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dateOfBirth, setDateOfBirth] = useState('2009-01-01');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Passed' | 'Transferred'>('Active');

  const openAddModal = () => {
    setEditingStudent(null);
    setStudentId(`DHS-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setName('');
    setBanglaName('');
    setClassName('Class 10');
    setSection('A');
    setRollNumber(students.length + 1);
    setGender('Male');
    setDateOfBirth('2009-01-01');
    setFatherName('');
    setMotherName('');
    setGuardianName('');
    setGuardianPhone('');
    setBloodGroup('B+');
    setStatus('Active');
    setIsModalOpen(true);
  };

  const openEditModal = (std: Student) => {
    setEditingStudent(std);
    setStudentId(std.studentId);
    setName(std.name);
    setBanglaName(std.banglaName || '');
    setClassName(std.className);
    setSection(std.section);
    setRollNumber(std.rollNumber);
    setGender(std.gender);
    setDateOfBirth(std.dateOfBirth);
    setFatherName(std.fatherName);
    setMotherName(std.motherName);
    setGuardianName(std.guardianName || std.fatherName);
    setGuardianPhone(std.guardianPhone);
    setBloodGroup(std.bloodGroup || 'B+');
    setStatus(std.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !studentId || !fatherName || !guardianPhone) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        name,
        banglaName: banglaName || undefined,
        className,
        section,
        rollNumber: Number(rollNumber),
        gender,
        dateOfBirth,
        fatherName,
        motherName,
        guardianName: guardianName || fatherName,
        guardianPhone,
        bloodGroup,
        status
      });
    } else {
      addStudent({
        studentId,
        name,
        banglaName: banglaName || undefined,
        className,
        section,
        rollNumber: Number(rollNumber),
        gender,
        dateOfBirth,
        session: '2026',
        fatherName,
        motherName,
        guardianName: guardianName || fatherName,
        guardianPhone,
        address: 'Joypurhat Sadar, Joypurhat',
        bloodGroup,
        admissionDate: new Date().toISOString().split('T')[0],
        status
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove student "${name}"?`)) {
      deleteStudent(id);
    }
  };

  const classes = ['all', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  const filtered = students.filter(s => {
    const matchesClass = selectedClass === 'all' || s.className === selectedClass;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toString().includes(searchTerm) ||
      s.fatherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Student Enrollment Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Private institutional register of enrolled pupils, class rolls, guardians, and academic status.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Enroll New Student
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {classes.map(c => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedClass === c
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ID, or Roll..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Student ID & Name</th>
                <th className="py-3.5 px-4">Class & Sec</th>
                <th className="py-3.5 px-4">Roll</th>
                <th className="py-3.5 px-4">Stream / Group</th>
                <th className="py-3.5 px-4">Guardian Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(std => (
                <tr key={std.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{std.name}</div>
                    <div className="text-[11px] font-mono text-emerald-800 font-bold">{std.studentId}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {std.className} ({std.section})
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{std.rollNumber}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {std.bloodGroup || 'B+'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div className="font-semibold text-slate-800">{std.fatherName}</div>
                    <div className="text-[11px] text-slate-400">{std.guardianPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                      {std.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(std)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Edit Student"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(std.id, std.name)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700"
                      title="Delete Student"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
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
              {editingStudent ? 'Edit Student Details' : 'Enroll New Student'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Class
                  </label>
                  <select
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    value={section}
                    onChange={e => setSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 uppercase"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Roll No
                  </label>
                  <input
                    type="number"
                    value={rollNumber}
                    onChange={e => setRollNumber(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Academic Group
                  </label>
                  <select
                    value={group}
                    onChange={e => setGroup(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  >
                    <option value="Science">Science</option>
                    <option value="Business Studies">Business Studies</option>
                    <option value="Humanities">Humanities</option>
                    <option value="General">General (Class 6-8)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={e => setFatherName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    value={motherName}
                    onChange={e => setMotherName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Guardian Mobile Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={guardianPhone}
                  onChange={e => setGuardianPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                />
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
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
