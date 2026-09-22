import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { MessageSquare, Mail, Phone, CheckCircle, Trash2 } from 'lucide-react';

export const AdminMessagesManager: React.FC = () => {
  const { contactMessages, updateMessageStatus, deleteContactMessage } = useCMSStore();

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete message from ${name}?`)) {
      deleteContactMessage(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Public Contact Messages & Guardian Inquiries
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Questions, general inquiries, and suggestions submitted by parents, guardians, and alumni.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {contactMessages.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
            No incoming inquiries recorded.
          </div>
        ) : (
          contactMessages.map(msg => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.status === 'read'
                  ? 'bg-white border-slate-200/80'
                  : 'bg-emerald-50/40 border-emerald-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                  {msg.status === 'unread' && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  {msg.createdAt ? msg.createdAt.split('T')[0] : '2026-03-01'}
                </div>
              </div>

              <div className="py-3 text-xs text-slate-700 space-y-2">
                <div className="flex flex-wrap gap-4 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {msg.email}
                  </span>
                  {msg.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {msg.phone}
                    </span>
                  )}
                  <span>•</span>
                  <span>Subject: <strong className="text-slate-800">{msg.subject}</strong></span>
                </div>
                <p className="p-3 rounded-xl bg-slate-50 text-slate-800 font-medium">
                  {msg.message}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                {msg.status === 'unread' && (
                  <button
                    onClick={() => updateMessageStatus(msg.id, 'read')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id, msg.name)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
