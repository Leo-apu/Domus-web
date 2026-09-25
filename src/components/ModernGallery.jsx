import { useState } from 'react';
import {
  Camera,
  Maximize2,
  Sparkles,
  Eye,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { GALLERY_IMAGES } from '../data/apartmentData';
import PhotoLightbox from './PhotoLightbox';

export default function ModernGallery({ isLightboxOpen, setIsLightboxOpen }) {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { id: 'todas', name: 'Todas las fotos', count: GALLERY_IMAGES.length },
    {
      id: 'living',
      name: 'Living y Comedor',
      count: GALLERY_IMAGES.filter((img) => img.category === 'living').length,
    },
    {
      id: 'dormitorios',
      name: 'Dormitorios',
      count: GALLERY_IMAGES.filter((img) => img.category === 'dormitorios').length,
    },
    {
      id: 'cocina',
      name: 'Cocina',
      count: GALLERY_IMAGES.filter((img) => img.category === 'cocina').length,
    },
    {
      id: 'baños',
      name: 'Baños en Suite',
      count: GALLERY_IMAGES.filter((img) => img.category === 'baños').length,
    },
  ];

  const filteredImages =
    selectedCategory === 'todas'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  const openLightboxAt = (indexInFiltered) => {
    const targetImage = filteredImages[indexInFiltered];
    const globalIndex = GALLERY_IMAGES.findIndex((img) => img.id === targetImage.id);
    setLightboxIndex(globalIndex !== -1 ? globalIndex : 0);
    setIsLightboxOpen(true);
  };

  const openLightboxWithGlobalIndex = (idx) => {
    setLightboxIndex(idx);
    setIsLightboxOpen(true);
  };

  return (
    <section id="galeria" className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-stone-50 bg-topo-pattern mesh-gradient-warm border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 reveal-init reveal-up">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            Galería Fotográfica
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Descubrí Cada Rincón del Departamento
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light">
            Ambientes luminosos, confortables y completamente amoblados para que tu estadía en Jujuy sea inolvidable.
          </p>
        </div>

        {/* 1. Airbnb-Style Mosaic Grid (High Visibility Showcase) */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-12 bg-stone-900 reveal-init reveal-scale delay-100">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 sm:gap-2.5 h-[420px] sm:h-[500px] lg:h-[560px]">
            {/* Featured Left Photo (Living & Comedor) */}
            <div
              onClick={() => openLightboxWithGlobalIndex(0)}
              className="relative md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer group"
            >
              <img
                src={GALLERY_IMAGES[0].src}
                alt={GALLERY_IMAGES[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="bg-rose-600 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded-md tracking-wider">
                  Foto Principal
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-title mt-2">
                  {GALLERY_IMAGES[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 hidden sm:block">
                  {GALLERY_IMAGES[0].description}
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-5 h-5" />
              </div>
            </div>

            {/* Top Right 1 (Living/Sillón) */}
            <div
              onClick={() => openLightboxWithGlobalIndex(1)}
              className="hidden md:block relative overflow-hidden cursor-pointer group"
            >
              <img
                src={GALLERY_IMAGES[1].src}
                alt={GALLERY_IMAGES[1].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-semibold drop-shadow">{GALLERY_IMAGES[1].title}</p>
              </div>
            </div>

            {/* Top Right 2 (Cocina) */}
            <div
              onClick={() => openLightboxWithGlobalIndex(2)}
              className="hidden md:block relative overflow-hidden cursor-pointer group"
            >
              <img
                src={GALLERY_IMAGES[2].src}
                alt={GALLERY_IMAGES[2].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-semibold drop-shadow">{GALLERY_IMAGES[2].title}</p>
              </div>
            </div>

            {/* Bottom Right 1 (Dormitorio Matrimonial) */}
            <div
              onClick={() => openLightboxWithGlobalIndex(3)}
              className="hidden md:block relative overflow-hidden cursor-pointer group"
            >
              <img
                src={GALLERY_IMAGES[3].src}
                alt={GALLERY_IMAGES[3].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-semibold drop-shadow">{GALLERY_IMAGES[3].title}</p>
              </div>
            </div>

            {/* Bottom Right 2 (Dormitorio 2) */}
            <div
              onClick={() => openLightboxWithGlobalIndex(4)}
              className="hidden md:block relative overflow-hidden cursor-pointer group"
            >
              <img
                src={GALLERY_IMAGES[4].src}
                alt={GALLERY_IMAGES[4].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-semibold drop-shadow">{GALLERY_IMAGES[4].title}</p>
              </div>
            </div>
          </div>

          {/* Floating 'Ver todas las fotos' button (Airbnb Style) */}
          <button
            onClick={() => openLightboxWithGlobalIndex(0)}
            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 bg-stone-950/85 hover:bg-stone-950 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <Camera className="w-4 h-4 text-rose-400" />
            <span>Ver todas las fotos ({GALLERY_IMAGES.length})</span>
          </button>
        </div>

        {/* 2. Interactive Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-102'
                  : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200/70'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* 3. Filtered Photos Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightboxAt(index)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/80 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <Maximize2 className="w-5 h-5 text-rose-600" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-stone-900/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize">
                  {image.category}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-title text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 line-clamp-2">
                    {image.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Ampliar fotografía
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex}
        onSelectIndex={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}
