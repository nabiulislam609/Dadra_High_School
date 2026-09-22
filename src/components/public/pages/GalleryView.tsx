import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Image, Eye, X } from 'lucide-react';
import { GalleryImage } from '../../../types';

export const GalleryView: React.FC = () => {
  const { galleryImages, galleryAlbums } = useCMSStore();
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const published = galleryImages
    .filter(i => i.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const getAlbumName = (albumId: string) => {
    const alb = galleryAlbums.find(a => a.id === albumId);
    return alb ? alb.name : albumId;
  };

  const albums = ['all', ...galleryAlbums.map(a => a.name)];

  const filtered = published.filter(img => {
    if (selectedAlbum === 'all') return true;
    return img.albumId === selectedAlbum || getAlbumName(img.albumId).toLowerCase() === selectedAlbum.toLowerCase();
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Image className="w-3.5 h-3.5" />
            Visual Records
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Photo Gallery & Campus Memories
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            A photographic chronicle of life, learning, and celebration at Dadra High School.
          </p>
        </div>

        {/* Album Tabs */}
        <div className="flex flex-wrap gap-2">
          {albums.map(alb => (
            <button
              key={alb}
              onClick={() => setSelectedAlbum(alb)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                selectedAlbum === alb
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {alb}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(img => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={img.imageUrl}
                  alt={img.altText || img.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/20 text-white backdrop-blur-md">
                    <Eye className="w-6 h-6" />
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {getAlbumName(img.albumId)}
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl inline-block max-h-[80vh]">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.caption}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-white space-y-1">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                {getAlbumName(activeImage.albumId)} Album
              </span>
              <p className="text-sm font-semibold max-w-xl mx-auto">
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
