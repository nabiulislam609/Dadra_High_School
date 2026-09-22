import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Newspaper, Calendar, User, ArrowRight, X, Tag } from 'lucide-react';
import { NewsItem } from '../../../types';

export const NewsView: React.FC = () => {
  const { news } = useCMSStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const published = news
    .filter(n => n.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const categories = ['all', 'Science & ICT', 'Sports', 'Academic', 'Campus', 'Community'];

  const filtered = published.filter(n => {
    return selectedCategory === 'all' || n.category === selectedCategory;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Newspaper className="w-3.5 h-3.5" />
            School Journalism & Updates
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            News & Press Releases
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Covering academic milestones, sports championships, and campus life stories.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
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

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Full Story
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 pr-8">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>Published: {activeArticle.publishedAt}</span>
                <span>By {activeArticle.author}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden max-h-72">
              <img
                src={activeArticle.featuredImage}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap py-2">
              {activeArticle.content}
            </div>

            {activeArticle.tags && (
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                {activeArticle.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
