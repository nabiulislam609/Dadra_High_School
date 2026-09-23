import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Link as LinkIcon, Check, RefreshCw } from 'lucide-react';

interface PhotoUploadFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  fallbackName?: string;
}

export const PhotoUploadField: React.FC<PhotoUploadFieldProps> = ({
  id,
  label,
  value,
  onChange,
  helperText = 'Upload from computer (JPG, PNG, WebP) or provide a web link',
  fallbackName = 'User'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Resize down to standard crisp passport/profile dimensions
        const maxDimension = 640;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          onChange(optimizedDataUrl);
        } else {
          onChange(rawDataUrl);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        onChange(rawDataUrl);
        setIsProcessing(false);
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      setIsProcessing(false);
      alert('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setShowUrlInput(false);
      setUrlInputValue('');
    }
  };

  const handleRemovePhoto = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2" id={`${id}-container`}>
      <div className="flex items-center justify-between">
        <label htmlFor={`${id}-file-input`} className="text-xs font-bold text-slate-700 block">
          {label}
        </label>
        <button
          type="button"
          id={`${id}-toggle-url-btn`}
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? 'Hide URL Input' : 'Or use Image URL'}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl" id={`${id}-url-box`}>
          <input
            type="url"
            id={`${id}-url-input`}
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            placeholder="Paste direct image link (e.g. https://...)"
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="button"
            id={`${id}-apply-url-btn`}
            onClick={handleApplyUrl}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
          >
            <Check className="w-3 h-3" />
            Apply
          </button>
        </div>
      )}

      {/* Main Upload & Dropzone Box */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200">
        {/* Preview Avatar */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center">
            {value ? (
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <ImageIcon className="w-7 h-7 stroke-1" />
                <span className="text-[10px] font-bold mt-1 text-slate-400">
                  {fallbackName.charAt(0).toUpperCase() || 'Photo'}
                </span>
              </div>
            )}
          </div>
          {value && (
            <button
              type="button"
              id={`${id}-remove-btn`}
              onClick={handleRemovePhoto}
              title="Remove photo"
              className="absolute -top-1.5 -right-1.5 p-1 bg-rose-600 text-white rounded-full shadow hover:bg-rose-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Drag & Drop / File Select Zone */}
        <div
          id={`${id}-dropzone`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 w-full border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-300'
              : 'border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/20'
          }`}
        >
          <input
            type="file"
            id={`${id}-file-input`}
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
          />

          {isProcessing ? (
            <div className="flex items-center gap-2 text-emerald-700 py-1 font-bold text-xs">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Processing photo...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-800">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {value ? 'Click or drag to change photo' : 'Upload photo from computer'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 max-w-xs">
                Drag & drop image file here, or click to browse computer files (JPG, PNG, WebP)
              </p>
            </>
          )}
        </div>
      </div>

      <p className="text-[10px] text-slate-400 pl-1">{helperText}</p>
    </div>
  );
};
