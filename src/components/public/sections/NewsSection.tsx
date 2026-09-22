import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react';

interface NewsSectionProps {
  onNavigate: (path: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  const { news } = useCMSStore();

  const publishedNews = news
    .filter(n => n.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (publishedNews.length === 0) return null;

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200/60 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              Campus Press
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest News & Stories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Celebrating milestones, science competitions, and campus community events.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/news')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            All News & Press Releases
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedNews.slice(0, 3).map(article => (
            <div
              key={article.id}
              onClick={() => onNavigate(`/news/${article.slug}`)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {article.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-3 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Full Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
