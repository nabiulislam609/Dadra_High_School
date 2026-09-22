import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Settings, Save, RotateCcw, Check } from 'lucide-react';
import { SiteSettings } from '../../../types';

export const AdminSettingsManager: React.FC = () => {
  const { siteSettings, updateSiteSettings, resetToDefaultData } = useCMSStore();
  const [formData, setFormData] = useState<SiteSettings>(siteSettings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('WARNING: Are you sure you want to reset all mock data (notices, students, results, teachers) back to initial factory demo state? This will clear any changes made in this session.')) {
      resetToDefaultData();
      setFormData(siteSettings);
      alert('Institutional database reset to factory state successfully.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600" />
            Institutional Profile & Global Settings
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure school identification, EIIN, contact channels, welcome broadcast marquee, and institutional credentials.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        {isSaved && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            Institutional profile updated and synchronized with public portal!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              School Name (English)
            </label>
            <input
              type="text"
              value={formData.siteName}
              onChange={e => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              School Name (Bangla)
            </label>
            <input
              type="text"
              value={formData.banglaName}
              onChange={e => setFormData({ ...formData, banglaName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/50 font-bangla"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              EIIN Number
            </label>
            <input
              type="text"
              value={formData.eiin}
              onChange={e => setFormData({ ...formData, eiin: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Short Name / Acronym
            </label>
            <input
              type="text"
              value={formData.shortName}
              onChange={e => setFormData({ ...formData, shortName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Established Year
            </label>
            <input
              type="text"
              value={formData.establishedYear}
              onChange={e => setFormData({ ...formData, establishedYear: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Motto / Institutional Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Primary Contact Telephone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Official Institutional Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Emergency Hotline
            </label>
            <input
              type="text"
              value={formData.emergencyPhone}
              onChange={e => setFormData({ ...formData, emergencyPhone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Campus Physical Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Office Hours
          </label>
          <input
            type="text"
            value={formData.officeHours}
            onChange={e => setFormData({ ...formData, officeHours: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
          />
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-200">
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Factory Data
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Institutional Profile
          </button>
        </div>
      </form>
    </div>
  );
};
