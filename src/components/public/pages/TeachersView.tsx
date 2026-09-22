import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Users, Search, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';

export const TeachersView: React.FC = () => {
  const { teachers, staff } = useCMSStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'teachers' | 'staff'>('teachers');

  const publishedTeachers = teachers
    .filter(t => t.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const publishedStaff = staff
    .filter(s => s.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const filteredTeachers = publishedTeachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.banglaName && t.banglaName.includes(searchTerm))
  );

  const filteredStaff = publishedStaff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Users className="w-3.5 h-3.5" />
            Dedicated Faculty
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Teachers & Staff Directory
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Meet the academic mentors and administrative personnel behind Dadra High School.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setSelectedTab('teachers')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                selectedTab === 'teachers'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teaching Faculty ({publishedTeachers.length})
            </button>
            <button
              onClick={() => setSelectedTab('staff')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                selectedTab === 'staff'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Administrative Staff ({publishedStaff.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, subject..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Teachers Grid */}
        {selectedTab === 'teachers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeachers.map(teacher => (
              <div
                key={teacher.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-60 overflow-hidden relative bg-slate-100">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                      {teacher.employeeId}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-xl p-2 text-center text-white">
                      <span className="text-xs font-bold block">{teacher.subject}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2 text-center">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {teacher.name}
                    </h3>
                    {teacher.banglaName && (
                      <span className="font-bangla text-xs text-emerald-800 font-semibold block">
                        {teacher.banglaName}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500 block">
                      {teacher.designation}
                    </span>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-left text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{teacher.qualification}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Joined: {teacher.joiningDate}</span>
                      </div>
                    </div>

                    {teacher.bio && (
                      <p className="text-[11px] text-slate-500 italic pt-1 text-left line-clamp-2">
                        "{teacher.bio}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <a
                    href={`mailto:${teacher.email}`}
                    className="flex items-center gap-1 hover:text-emerald-700 font-medium truncate"
                    title={teacher.email}
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{teacher.email.split('@')[0]}</span>
                  </a>
                  <a
                    href={`tel:${teacher.phone}`}
                    className="flex items-center gap-1 hover:text-emerald-700 font-medium"
                    title={teacher.phone}
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Staff Grid */}
        {selectedTab === 'staff' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStaff.map(s => (
              <div
                key={s.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm p-6 text-center space-y-3"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-emerald-600 shadow-md">
                  <img
                    src={s.photoUrl}
                    alt={s.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
                  <span className="text-xs font-semibold text-emerald-700 block">{s.designation}</span>
                  <span className="text-xs text-slate-500 block">Dept: {s.department}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>{s.email}</div>
                  <div>{s.phone}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
