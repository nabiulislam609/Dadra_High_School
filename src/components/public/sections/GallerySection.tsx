import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Image, ArrowRight, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryImage } from '../../../types';

interface GallerySectionProps {
  onNavigate: (path: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigate }) => {
  const { galleryImages } = useCMSStore();
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const publishedImages = galleryImages
    .filter(img => img.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (publishedImages.length === 0) return null;

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200/60 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Image className="w-3.5 h-3.5" />
              Visual Campus Tour
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Moments & Photo Gallery
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Glimpses into daily student life, laboratories, celebrations, and sports glories.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/gallery')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            Explore Complete Album Collection
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {publishedImages.slice(0, 6).map(img => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="relative h-44 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={img.imageUrl}
                alt={img.altText || img.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-[11px] font-semibold text-white line-clamp-2 leading-tight">
                  {img.caption}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold mt-1 inline-flex items-center gap-1">
                  <Eye className="w-3 h-3" /> View Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150">
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
            <p className="text-white text-sm font-semibold max-w-xl mx-auto">
              {activeImage.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
