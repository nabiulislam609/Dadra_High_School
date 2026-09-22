import React, { useState, useEffect } from 'react';
import { useCMSStore } from '../../lib/store';
import { ChevronLeft, ChevronRight, ArrowRight, Award, BookOpen, Users, Compass } from 'lucide-react';

interface HeroSliderProps {
  onNavigate: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const { heroSlides, siteSettings } = useCMSStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeSlides = heroSlides
    .filter(s => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      {/* Slide Image Stage */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full">
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-75 scale-105 transition-transform duration-10000"
              referrerPolicy="no-referrer"
            />
            {/* Contrast Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/70" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-center pb-24 md:pb-20">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Welcome to {siteSettings.shortName} • Joypurhat, Bangladesh
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {currentSlide.title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow">
              {currentSlide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {currentSlide.buttonText && (
                <button
                  onClick={() => onNavigate(currentSlide.buttonUrl || '/admission')}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm md:text-base shadow-xl shadow-emerald-950/50 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  {currentSlide.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl text-sm md:text-base backdrop-blur-md border border-white/20 transition-colors"
              >
                About Our Heritage
              </button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + activeSlides.length) % activeSlides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % activeSlides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {activeSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating Info Cards beneath Hero */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 -mt-16 sm:-mt-14 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div 
            onClick={() => onNavigate('/about')}
            className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">EIIN & Affiliation</span>
              <span className="text-sm font-extrabold text-slate-800">{siteSettings.eiin} (BISE Rajshahi)</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('/academic')}
            className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">Curriculum</span>
              <span className="text-sm font-extrabold text-slate-800">Classes VI to X (3 Streams)</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('/teachers')}
            className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Faculty</span>
              <span className="text-sm font-extrabold text-slate-800">Govt. Certified Teachers</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('/contact')}
            className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">Location</span>
              <span className="text-sm font-extrabold text-slate-800">Joypurhat Sadar, BD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
