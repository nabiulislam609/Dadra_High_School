import React, { useState } from 'react';
import { useCMSStore } from '../../lib/store';
import { Bell, ArrowRight, X, FileText, Calendar, Download } from 'lucide-react';
import { Notice } from '../../types';

interface NoticeTickerProps {
  onNavigate: (path: string) => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({ onNavigate }) => {
  const { notices } = useCMSStore();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const publishedNotices = notices.filter(n => n.isPublished);
  if (publishedNotices.length === 0) return null;

  return (
    <>
      <div className="bg-amber-500 text-slate-900 border-b border-amber-600/30 overflow-hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
          {/* Label Badge */}
          <div className="flex items-center gap-1.5 bg-slate-950 text-amber-400 text-xs font-bold px-3 py-1 rounded-md shrink-0 uppercase tracking-wider shadow-sm">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            Notice Ticker
          </div>

          {/* Marquee Content */}
          <div className="overflow-hidden flex-1 relative whitespace-nowrap">
            <div className="inline-flex items-center gap-8 text-sm font-semibold text-slate-900 animate-marquee hover:[animation-play-state:paused]">
              {publishedNotices.map((notice, idx) => (
                <button
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="inline-flex items-center gap-2 hover:underline hover:text-slate-950 transition-colors cursor-pointer text-left"
                >
                  {notice.isImportant && (
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide animate-pulse">
                      URGENT
                    </span>
                  )}
                  <span>• {notice.title}</span>
                  <span className="text-xs text-amber-900 font-normal">({notice.publishDate})</span>
                  {idx < publishedNotices.length - 1 && <span className="text-amber-700/60 mx-2">|</span>}
                </button>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <button
            onClick={() => onNavigate('/notices')}
            className="text-xs font-bold text-slate-950 hover:text-black underline flex items-center gap-1 shrink-0 ml-2"
          >
            All Notices
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Notice Reader Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
              <span className="bg-emerald-100 px-2.5 py-1 rounded-md">{selectedNotice.category}</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                Published: {selectedNotice.publishDate}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {selectedNotice.title}
            </h3>

            <p className="text-sm font-medium text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedNotice.shortDescription}
            </p>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-6">
              {selectedNotice.content}
            </div>

            {selectedNotice.attachmentUrl && (
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">Official Attachment / Routine PDF</span>
                    <span className="text-[11px] text-emerald-700">Verified institutional circular</span>
                  </div>
                </div>
                <a
                  href={selectedNotice.attachmentUrl}
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
              <span className="text-xs text-slate-400">Dadra High School Official Bulletin</span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
