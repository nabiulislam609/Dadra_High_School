import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { ArrowUp, ArrowDown, Eye, EyeOff, LayoutTemplate, RotateCcw } from 'lucide-react';
import { HomepageSection } from '../../../types';

export const AdminSectionsManager: React.FC = () => {
  const { homepageSections, toggleSectionVisibility, reorderSection, resetToDefaultData } = useCMSStore();

  const sortedSections = [...homepageSections].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleReset = () => {
    if (window.confirm('Reset all website data to initial official default demo records?')) {
      resetToDefaultData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-emerald-600" />
            Homepage Dynamic Section Builder
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Reorder, toggle, or reorganize modular sections displayed on the public Dadra High School homepage.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Default Layout
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        {sortedSections.map((sec: HomepageSection, idx: number) => (
          <div
            key={sec.id}
            className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
              sec.isVisible ? 'bg-white hover:bg-slate-50/50' : 'bg-slate-50 opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {sec.title}
                  </h4>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {sec.sectionKey}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {sec.isVisible ? 'Currently visible on public site' : 'Hidden from public visitors'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => reorderSection(sec.id, 'up')}
                disabled={idx === 0}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => reorderSection(sec.id, 'down')}
                disabled={idx === sortedSections.length - 1}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleSectionVisibility(sec.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  sec.isVisible
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {sec.isVisible ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visible</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
