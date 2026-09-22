import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Sparkles, CheckCircle2, XCircle, Search, Eye, X, Printer, Phone, Calendar } from 'lucide-react';
import { AdmissionApplication } from '../../../types';

export const AdminAdmissionsManager: React.FC = () => {
  const { admissionApplications, updateAdmissionStatus } = useCMSStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Pending' | 'Accepted' | 'Rejected'>('all');
  const [activeApp, setActiveApp] = useState<AdmissionApplication | null>(null);

  const filtered = admissionApplications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.guardianPhone.includes(searchTerm) ||
      app.classApplied.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Online Admission Applications Queue
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review online student registrations, verify documents, and update application outcomes.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-1.5">
          {(['all', 'Pending', 'Accepted', 'Rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === tab
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab === 'all' ? 'All Applications' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, tracking no, phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Tracking Code</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Class Applied</th>
                <th className="py-3.5 px-4">Father / Guardian</th>
                <th className="py-3.5 px-4">Contact Phone</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                    {app.applicationNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{app.studentName}</div>
                    {app.banglaName && (
                      <div className="text-[11px] font-bangla text-emerald-800">{app.banglaName}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{app.classApplied}</td>
                  <td className="py-3 px-4 text-slate-600">{app.fatherName}</td>
                  <td className="py-3 px-4 text-slate-600">{app.guardianPhone}</td>
                  <td className="py-3 px-4 text-slate-500">{app.createdAt ? app.createdAt.split('T')[0] : '2026-03-01'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      app.status === 'Accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => setActiveApp(app)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {app.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateAdmissionStatus(app.id, 'Accepted', 'Documents verified')}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                          title="Accept"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateAdmissionStatus(app.id, 'Rejected', 'Missing prerequisite certificates')}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700"
                          title="Reject"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {activeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs sm:text-sm">
            <button
              onClick={() => setActiveApp(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Tracking: {activeApp.applicationNumber}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {activeApp.studentName} {activeApp.banglaName && `(${activeApp.banglaName})`}
              </h3>
              <p className="text-xs text-slate-500">
                Application for {activeApp.classApplied} • Status: <strong className="uppercase text-emerald-700">{activeApp.status}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-slate-700">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-semibold">{activeApp.dateOfBirth} ({activeApp.gender})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Father's Name:</span>
                <span className="font-semibold">{activeApp.fatherName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Mother's Name:</span>
                <span className="font-semibold">{activeApp.motherName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Guardian Phone:</span>
                <span className="font-semibold">{activeApp.guardianPhone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Email:</span>
                <span className="font-semibold">{activeApp.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Previous School:</span>
                <span className="font-semibold">{activeApp.previousSchool || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Present Address:</span>
                <span className="font-semibold">{activeApp.address}</span>
              </div>
            </div>

            {activeApp.status === 'Pending' && (
              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    updateAdmissionStatus(activeApp.id, 'Rejected', 'Document review failed');
                    setActiveApp(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => {
                    updateAdmissionStatus(activeApp.id, 'Accepted', 'Document verified');
                    setActiveApp(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Approve Application
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
