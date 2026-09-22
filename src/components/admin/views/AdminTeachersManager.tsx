import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { GraduationCap, Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { Teacher } from '../../../types';

export const AdminTeachersManager: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useCMSStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form Fields
  const [employeeId, setEmployeeId] = useState('T-101');
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [designation, setDesignation] = useState('Assistant Teacher');
  const [subject, setSubject] = useState('Mathematics');
  const [qualification, setQualification] = useState('B.Sc (Hons), M.Sc in Mathematics, B.Ed');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [joiningDate, setJoiningDate] = useState('2018-03-01');
  const [isPublished, setIsPublished] = useState(true);

  const openAddModal = () => {
    setEditingTeacher(null);
    setEmployeeId(`T-${Math.floor(100 + Math.random() * 900)}`);
    setName('');
    setBanglaName('');
    setDesignation('Assistant Teacher');
    setSubject('General');
    setQualification('B.A / B.Sc, B.Ed');
    setEmail(`teacher${Math.floor(10 + Math.random() * 90)}@dadrahighschool.edu.bd`);
    setPhone('+880 1711-000000');
    setPhotoUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80');
    setJoiningDate('2020-01-01');
    setIsPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (t: Teacher) => {
    setEditingTeacher(t);
    setEmployeeId(t.employeeId || `T-${Math.floor(100 + Math.random() * 900)}`);
    setName(t.name);
    setBanglaName(t.banglaName || '');
    setDesignation(t.designation);
    setSubject(t.subject);
    setQualification(t.qualification);
    setEmail(t.email);
    setPhone(t.phone);
    setPhotoUrl(t.photoUrl);
    setJoiningDate(t.joiningDate);
    setIsPublished(t.isPublished);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !designation) return;

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, {
        employeeId: employeeId || editingTeacher.employeeId,
        name,
        banglaName: banglaName || undefined,
        designation,
        subject,
        qualification,
        email,
        phone,
        photoUrl,
        joiningDate,
        isPublished
      });
    } else {
      addTeacher({
        employeeId: employeeId || `T-${Math.floor(100 + Math.random() * 900)}`,
        name,
        banglaName: banglaName || undefined,
        designation,
        subject,
        qualification,
        email,
        phone,
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
        joiningDate,
        displayOrder: teachers.length + 1,
        isPublished
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete faculty member "${name}"?`)) {
      deleteTeacher(id);
    }
  };

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            Faculty & Academic Mentors Desk
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Maintain teachers list, departmental designations, contact numbers, and public profiles.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Faculty Member
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search teachers by name or subject..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        />
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Faculty Member</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Academic Degree</th>
                <th className="py-3.5 px-4">Phone & Email</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-[11px] text-emerald-800 font-bangla">{t.banglaName}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{t.designation}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      {t.subject}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 max-w-xs truncate">{t.qualification}</td>
                  <td className="py-3 px-4 text-slate-500">
                    <div>{t.phone}</div>
                    <div className="text-[11px] text-slate-400">{t.email}</div>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700"
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
              {editingTeacher ? 'Edit Faculty Details' : 'Add New Faculty Member'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Employee ID *</label>
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={e => setEmployeeId(e.target.value)}
                  placeholder="e.g. T-101"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Bangla Name</label>
                  <input
                    type="text"
                    value={banglaName}
                    onChange={e => setBanglaName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 font-bangla"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject Specialization *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Educational Qualifications</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={e => setQualification(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Photo URL</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={e => setPhotoUrl(e.target.value)}
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
                  Save Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
