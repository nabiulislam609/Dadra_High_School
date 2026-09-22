import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { 
  Users, 
  GraduationCap, 
  Bell, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Settings,
  Plus
} from 'lucide-react';

interface AdminDashboardOverviewProps {
  onSelectTab: (tab: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ onSelectTab }) => {
  const { 
    students, 
    teachers, 
    notices, 
    admissionApplications, 
    contactMessages, 
    updateAdmissionStatus,
    studentResults,
    homepageSections
  } = useCMSStore();

  const pendingAdmissions = admissionApplications.filter(a => a.status === 'Pending');
  const unreadMessages = contactMessages.filter(m => m.status === 'unread');

  const stats = [
    {
      label: 'Enrolled Students',
      value: students.length,
      sub: 'Classes 6 through 10',
      icon: Users,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      tab: 'students'
    },
    {
      label: 'Teaching Faculty',
      value: teachers.length,
      sub: 'Certified Subject Mentors',
      icon: GraduationCap,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      tab: 'teachers'
    },
    {
      label: 'Active Notices',
      value: notices.filter(n => n.isPublished).length,
      sub: 'Published circulars',
      icon: Bell,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      tab: 'notices'
    },
    {
      label: 'Pending Admissions',
      value: pendingAdmissions.length,
      sub: 'Online student applications',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      tab: 'admissions'
    },
    {
      label: 'Published Results',
      value: studentResults.length,
      sub: 'Term mark sheets',
      icon: FileText,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      tab: 'results'
    },
    {
      label: 'Unread Inquiries',
      value: unreadMessages.length,
      sub: 'Public contact submissions',
      icon: MessageSquare,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      tab: 'messages'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            Dadra High School • Joypurhat Sadar
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Administrative Management Console
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Complete institutional control over notices, students, teachers, online admissions, examination results, and homepage layout.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => onSelectTab('notices')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Notice
          </button>
          <button
            onClick={() => onSelectTab('sections')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Manage Homepage Sections
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectTab(s.tab)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500">{s.label}</span>
                <div className={`p-2 rounded-xl border ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {s.value}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5 truncate">
                  {s.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two columns: Pending Admissions & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pending Admissions Review */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Recent Online Admission Applications
              </h2>
              <p className="text-xs text-slate-500">
                Incoming student applications awaiting verification.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('admissions')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              View All ({admissionApplications.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {admissionApplications.slice(0, 4).map(app => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{app.studentName}</span>
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                      {app.applicationNumber}
                    </span>
                  </div>
                  <div className="text-slate-500 flex flex-wrap gap-2">
                    <span>Applied: <strong className="text-slate-700">{app.classApplied}</strong></span>
                    <span>•</span>
                    <span>Phone: {app.guardianPhone}</span>
                    <span>•</span>
                    <span className="capitalize font-semibold text-amber-700">{app.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {app.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => updateAdmissionStatus(app.id, 'Accepted', 'Documents verified by admission committee')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 transition-colors"
                        title="Approve Application"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateAdmissionStatus(app.id, 'Rejected', 'Age criteria or missing certificates')}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold flex items-center gap-1 transition-colors"
                        title="Reject Application"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {app.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices & Quick Links */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Recent Notices
              </h2>
              <p className="text-xs text-slate-500">
                Latest active announcements on the public board.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('notices')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              All Notices
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {notices.slice(0, 4).map(notice => (
              <div
                key={notice.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded">
                    {notice.category}
                  </span>
                  <span>{notice.publishDate}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {notice.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Quick shortcuts */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Quick Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onSelectTab('students')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-left transition-colors"
              >
                + Register New Student
              </button>
              <button
                onClick={() => onSelectTab('results')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-left transition-colors"
              >
                + Publish Exam Result
              </button>
              <button
                onClick={() => onSelectTab('teachers')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-left transition-colors"
              >
                + Add Faculty Member
              </button>
              <button
                onClick={() => onSelectTab('settings')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-left transition-colors"
              >
                ⚙ Edit Site Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
