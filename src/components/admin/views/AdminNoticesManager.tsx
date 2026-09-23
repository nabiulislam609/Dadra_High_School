import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Bell, Plus, Edit, Trash2, Search, CheckCircle2, Clock, X, AlertCircle } from 'lucide-react';
import { Notice } from '../../../types';

export const AdminNoticesManager: React.FC = () => {
  const { notices, addNotice, updateNotice, deleteNotice } = useCMSStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Academic' | 'Exam' | 'Admission' | 'General' | 'Event' | 'Urgent'>('Academic');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [attachmentUrl, setAttachmentUrl] = useState('');

  const openAddModal = () => {
    setTitle('');
    setCategory('Academic');
    setContent('');
    setIsImportant(false);
    setIsPinned(false);
    setIsPublished(true);
    setAttachmentUrl('');
    setEditingNotice(null);
    setIsAdding(true);
  };

  const openEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setTitle(notice.title);
    setCategory(notice.category);
    setContent(notice.content);
    setIsImportant(notice.isImportant || false);
    setIsPinned(notice.isPinned);
    setIsPublished(notice.isPublished);
    setAttachmentUrl(notice.attachmentUrl || '');
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const shortDesc = content.slice(0, 120);

    if (editingNotice) {
      updateNotice(editingNotice.id, {
        title,
        slug,
        shortDescription: shortDesc,
        category,
        content,
        isImportant,
        isPinned,
        isPublished,
        attachmentUrl: attachmentUrl || undefined,
        updatedAt: new Date().toISOString()
      });
    } else {
      addNotice({
        title,
        slug,
        shortDescription: shortDesc,
        category,
        content,
        publishDate: new Date().toISOString().split('T')[0],
        isImportant,
        isPinned,
        isPublished,
        attachmentUrl: attachmentUrl || undefined
      });
    }

    setIsAdding(false);
    setEditingNotice(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete notice: "${title}"?`)) {
      deleteNotice(id);
    }
  };

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            Notices & Circulars Desk
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish academic schedules, holiday notices, examination routines, and official memos.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Circular
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search circulars by title, memo..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        />
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap">Title & Memo</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Category</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Date</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Priority</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-6 text-right whitespace-nowrap w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(notice => (
                <tr key={notice.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 max-w-md">
                    <div className="font-bold text-slate-900 line-clamp-1">{notice.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {notice.isPinned && '• Pinned to Ticker'} {notice.isImportant && '• Important Flag'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      {notice.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{notice.publishDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      notice.isImportant
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {notice.isImportant ? 'Important' : 'Normal'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      notice.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {notice.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(notice)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-colors"
                        title="Edit Notice"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id, notice.title)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                        title="Delete Notice"
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

      {/* Add / Edit Notice Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              {editingNotice ? 'Edit Notice / Circular' : 'Create New Notice / Circular'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Circular Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule of Annual Examination 2026"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Exam">Exam</option>
                    <option value="Admission">Admission</option>
                    <option value="General">General</option>
                    <option value="Event">Event</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Publication Status
                  </label>
                  <select
                    value={isPublished ? 'published' : 'draft'}
                    onChange={e => setIsPublished(e.target.value === 'published')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isImportant}
                    onChange={e => setIsImportant(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  Mark as High Priority / Important
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={e => setIsPinned(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  Pin to Top Notice Ticker
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Circular Content / Body *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter the complete text of the notice..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  PDF / Document Attachment URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/notices/routine.pdf"
                  value={attachmentUrl}
                  onChange={e => setAttachmentUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Save Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
