import React from 'react';
import { useCMSStore } from '../../lib/store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCMSStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-xl border transition-all transform translate-y-0 backdrop-blur-md ${
              isSuccess 
                ? 'bg-emerald-900/90 text-white border-emerald-500/50' 
                : isError 
                ? 'bg-rose-900/90 text-white border-rose-500/50' 
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-300 shrink-0" />}
              <span className="text-sm font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
