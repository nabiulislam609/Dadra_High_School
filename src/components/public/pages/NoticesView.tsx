import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Bell, Search, Calendar, FileText, Download, Eye, X, Filter } from 'lucide-react';
import { Notice } from '../../../types';

export const NoticesView: React.FC = () => {
  const { notices } = useCMSStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const published = notices
    .filter(n => n.isPublished)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  const categories = ['all', 'Academic', 'Exam', 'Admission', 'General', 'Urgent', 'Event'];

  const filteredNotices = published.filter(n => {
    const matchesCategory = selectedCategory === 'all' || n.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Bell className="w-3.5 h-3.5" />
            Official Circulars
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Notices & Circulars Archive
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Official announcements, examination schedules, holidays, and administrative directives.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by notice title or memo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Notices Table / Card List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
          {filteredNotices.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No circulars found matching your search criteria.
            </div>
          ) : (
            filteredNotices.map(notice => (
              <div
                key={notice.id}
                className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {notice.publishDate}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveNotice(notice)}
                    className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    {notice.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1">
                    {notice.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveNotice(notice)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Read Circular
                  </button>

                  {notice.attachmentUrl && (
                    <a
                      href={notice.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Notice Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveNotice(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {activeNotice.category} Circular
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 pr-8">
                {activeNotice.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span>Published: {activeNotice.publishDate}</span>
              </div>
            </div>

            <div className="py-4 border-y border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {activeNotice.content}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Dadra High School Administrative Desk</span>
              {activeNotice.attachmentUrl && (
                <a
                  href={activeNotice.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Attached Document
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
