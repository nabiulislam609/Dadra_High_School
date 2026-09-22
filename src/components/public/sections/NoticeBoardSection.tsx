import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Bell, Calendar, Pin, ArrowRight, Download, FileText, ChevronRight, X } from 'lucide-react';
import { Notice } from '../../../types';

interface NoticeBoardSectionProps {
  onNavigate: (path: string) => void;
}

export const NoticeBoardSection: React.FC<NoticeBoardSectionProps> = ({ onNavigate }) => {
  const { notices } = useCMSStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalNotice, setActiveModalNotice] = useState<Notice | null>(null);

  const published = notices.filter(n => n.isPublished);
  const categories = ['All', 'Academic', 'Exam', 'Admission', 'Event', 'General'];

  const filtered = selectedCategory === 'All'
    ? published
    : published.filter(n => n.category.toLowerCase() === selectedCategory.toLowerCase());

  // Sort pinned first, then by publishDate descending
  const sorted = [...filtered].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5" />
              Official Bulletin
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Notice Board & Announcements
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Stay informed with academic schedules, board directives, and institutional circulars.
            </p>
          </div>

          {/* Category Tabs & View All */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate('/notices')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition-colors"
            >
              All Notices Archive
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notices Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sorted.slice(0, 6).map(notice => (
            <div
              key={notice.id}
              onClick={() => setActiveModalNotice(notice)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between hover:shadow-md ${
                notice.isPinned
                  ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300'
                  : 'bg-slate-50/50 border-slate-200/70 hover:border-emerald-300 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {notice.category}
                    </span>
                    {notice.isPinned && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        <Pin className="w-3 h-3 rotate-45" />
                        Pinned
                      </span>
                    )}
                    {notice.isImportant && (
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md animate-pulse">
                        Important
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {notice.publishDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {notice.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Notice & Circular
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                {notice.attachmentUrl && (
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-200">
                    <FileText className="w-3 h-3 text-red-500" />
                    PDF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Detail Reader Modal */}
      {activeModalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalNotice(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
              <span className="bg-emerald-100 px-2.5 py-1 rounded-md">{activeModalNotice.category}</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                Published: {activeModalNotice.publishDate}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {activeModalNotice.title}
            </h3>

            <p className="text-sm font-medium text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {activeModalNotice.shortDescription}
            </p>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-6">
              {activeModalNotice.content}
            </div>

            {activeModalNotice.attachmentUrl && (
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">Official Attachment / Circular PDF</span>
                    <span className="text-[11px] text-emerald-700">Official document issued by administration</span>
                  </div>
                </div>
                <a
                  href={activeModalNotice.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </a>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400">Dadra High School • Joypurhat</span>
              <button
                onClick={() => setActiveModalNotice(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
