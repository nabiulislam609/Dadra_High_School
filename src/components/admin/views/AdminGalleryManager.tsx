import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Image, Plus, Trash2, X, Eye, EyeOff } from 'lucide-react';

export const AdminGalleryManager: React.FC = () => {
  const { galleryImages, galleryAlbums, addImage, deleteImage } = useCMSStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [albumId, setAlbumId] = useState(galleryAlbums[0]?.id || 'album-campus');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !caption) return;

    addImage({
      imageUrl,
      caption,
      albumId: albumId || (galleryAlbums[0]?.id ?? 'album-campus'),
      displayOrder: galleryImages.length + 1,
      isPublished: true
    });

    setImageUrl('');
    setCaption('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this photo from the school album?')) {
      deleteImage(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Image className="w-5 h-5 text-emerald-600" />
            Photo Gallery & Albums Desk
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize campus photography into categorized albums (Campus, Science, Sports, Cultural).
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Photo to Album
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map(img => (
          <div
            key={img.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm relative group flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={img.imageUrl}
                alt={img.caption}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {galleryAlbums.find(a => a.id === img.albumId)?.name || 'Campus'}
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3">
              <p className="text-xs text-slate-700 font-semibold line-clamp-2">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              Add Photo to School Gallery
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Photo Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Album *</label>
                <select
                  value={albumId}
                  onChange={e => setAlbumId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                >
                  {galleryAlbums.map(alb => (
                    <option key={alb.id} value={alb.id}>
                      {alb.name} ({alb.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Photo Caption / Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual science fair demonstration by Class 9 learners"
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
