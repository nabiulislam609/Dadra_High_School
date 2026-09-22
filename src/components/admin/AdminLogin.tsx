import React, { useState } from 'react';
import { useCMSStore } from '../../lib/store';
import { Lock, Mail, ShieldCheck, ArrowRight, School, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const { loginAdmin } = useCMSStore();
  const [email, setEmail] = useState('admin@dadrahighschool.edu.bd');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, 'super_admin');
    if (success) {
      onSuccess();
    } else {
      setError('Invalid admin credentials. Please use the pre-filled demo login.');
    }
  };

  const fillDemo = () => {
    setEmail('admin@dadrahighschool.edu.bd');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6 relative">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
            Administrative Portal
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Dadra High School CMS
          </h2>
          <p className="text-xs text-slate-500">
            Enter administrator credentials to manage notices, students, teachers, results, and site content.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-4 h-4" />
            Enter Admin Dashboard
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-slate-600">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Pre-configured Demo Credentials:</span>
            <button
              type="button"
              onClick={fillDemo}
              className="text-emerald-700 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Auto-Fill
            </button>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            Email: admin@dadrahighschool.edu.bd<br />
            Password: admin123
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
