import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';

export const EventsView: React.FC = () => {
  const { events } = useCMSStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');

  const filtered = events
    .filter(e => selectedFilter === 'all' || e.status === selectedFilter)
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Calendar className="w-3.5 h-3.5" />
            Institutional Calendar
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Events & Co-Curricular Calendar
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Scheduled science fairs, national day observances, sports tournaments, and examinations.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {(['all', 'upcoming', 'ongoing', 'completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                selectedFilter === tab
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab} Events
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(ev => {
            const dateObj = new Date(ev.eventDate);
            const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
            const day = dateObj.getDate();

            return (
              <div
                key={ev.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-20 h-20 rounded-2xl bg-emerald-700 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                  <span className="text-xs uppercase font-extrabold tracking-wider">{month}</span>
                  <span className="text-3xl font-black">{day}</span>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {ev.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {ev.startTime} - {ev.endTime}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      ev.status === 'upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {ev.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {ev.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
