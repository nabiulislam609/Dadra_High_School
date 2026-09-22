import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface EventsSectionProps {
  onNavigate: (path: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onNavigate }) => {
  const { events } = useCMSStore();

  const upcomingEvents = events
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              School Calendar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Upcoming Events & Competitions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Mark your calendar for upcoming inter-house tournaments, cultural galas, and parent assemblies.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/events')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-colors"
          >
            All Scheduled Events
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.slice(0, 2).map(ev => {
            const eventDateObj = new Date(ev.eventDate);
            const monthStr = eventDateObj.toLocaleDateString('en-US', { month: 'short' });
            const dayNum = eventDateObj.getDate();

            return (
              <div
                key={ev.id}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5 items-start group"
              >
                {/* Date Square Badge */}
                <div className="w-20 h-20 rounded-2xl bg-emerald-700 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                  <span className="text-xs uppercase font-extrabold tracking-wider">{monthStr}</span>
                  <span className="text-2xl font-black">{dayNum}</span>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {ev.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {ev.startTime} - {ev.endTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {ev.location}
                    </span>

                    <button
                      onClick={() => onNavigate(`/events`)}
                      className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      Event Details
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
