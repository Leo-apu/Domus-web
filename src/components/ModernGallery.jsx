import { useState, useEffect } from "react";
import {
  Camera,
  Maximize2,
  Sparkles,
  Eye,
  CheckCircle2,
  ChevronRight,
  Building,
} from "lucide-react";
import { GALLERY_IMAGES } from "../data/apartmentData";
import PhotoLightbox from "./PhotoLightbox";

export default function ModernGallery({
  isLightboxOpen,
  setIsLightboxOpen,
  apartment,
  galleryImages,
}) {
  const images =
    galleryImages ||
    apartment?.galleryImages ||
    apartment?.gallery ||
    GALLERY_IMAGES;
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Reset category filter when apartment changes
  useEffect(() => {
    setSelectedCategory("todas");
    setLightboxIndex(0);
  }, [apartment?.id]);

  const rawCategories = [
    { id: "todas", name: "Todas las fotos", count: images.length },
    {
      id: "living",
      name: "Living y Espacios",
      count: images.filter((img) => img.category === "living").length,
    },
    {
      id: "dormitorios",
      name: "Dormitorios",
      count: images.filter((img) => img.category === "dormitorios").length,
    },
    {
      id: "cocina",
      name: "Cocina",
      count: images.filter((img) => img.category === "cocina").length,
    },
    {
      id: "baños",
      name: "Baños",
      count: images.filter((img) => img.category === "baños").length,
    },
    {
      id: "exterior",
      name: "Balcón y Vistas",
      count: images.filter((img) => img.category === "exterior").length,
    },
    {
      id: "general",
      name: "General",
      count: images.filter((img) => img.category === "general").length,
    },
  ];

  const categories = rawCategories.filter(
    (cat) => cat.id === "todas" || cat.count > 0,
  );

  const filteredImages =
    selectedCategory === "todas"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightboxAt = (indexInFiltered) => {
    const targetImage = filteredImages[indexInFiltered];
    const globalIndex = images.findIndex((img) => img.id === targetImage?.id);
    setLightboxIndex(globalIndex !== -1 ? globalIndex : 0);
    setIsLightboxOpen(true);
  };

  const openLightboxWithGlobalIndex = (idx) => {
    const validIdx = idx < images.length ? idx : 0;
    setLightboxIndex(validIdx);
    setIsLightboxOpen(true);
  };

  // Safe items for the collage grid (5 slots)
  const collageSlot0 = images[0] || images[0];
  const collageSlot1 = images[1] || images[0];
  const collageSlot2 = images[2] || images[1] || images[0];
  const collageSlot3 = images[3] || images[2] || images[0];
  const collageSlot4 = images[4] || images[3] || images[0];

  return (
    <section
      id="galeria"
      className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-stone-50 bg-topo-pattern mesh-gradient-warm border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 reveal-init reveal-up">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-medium tracking-[0.25em] uppercase text-rose-700 mb-3">
            <span className="w-5 h-px bg-rose-500/40" />
            <span>GALERÍA FOTOGRÁFICA</span>
            <span className="w-5 h-px bg-rose-500/40" />
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Descubrí Cada Rincón de{" "}
            <span className="text-rose-600">
              {apartment?.name || "Domus Alquileres"}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light">
            Ambientes luminosos, confortables y completamente amoblados para que
            tu estadía en Jujuy sea inolvidable.
          </p>
        </div>

        {/* Mosaic Collage Gallery Showcase */}
        {images.length > 0 && (
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-12 bg-stone-900 reveal-init reveal-scale delay-100">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 sm:gap-2.5 h-105 sm:h-125 lg:h-140">
              {/* Main large feature image */}
              <div
                onClick={() => openLightboxWithGlobalIndex(0)}
                className="relative md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer group"
              >
                <img
                  src={collageSlot0.src}
                  alt={collageSlot0.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="bg-rose-600 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded-md tracking-wider">
                    Foto Principal
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-title mt-2">
                    {collageSlot0.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 hidden sm:block">
                    {collageSlot0.description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              {/* Secondary slot 1 */}
              <div
                onClick={() => openLightboxWithGlobalIndex(1)}
                className="hidden md:block relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={collageSlot1.src}
                  alt={collageSlot1.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">
                    {collageSlot1.title}
                  </p>
                </div>
              </div>

              {/* Secondary slot 2 */}
              <div
                onClick={() => openLightboxWithGlobalIndex(2)}
                className="hidden md:block relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={collageSlot2.src}
                  alt={collageSlot2.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">
                    {collageSlot2.title}
                  </p>
                </div>
              </div>

              {/* Secondary slot 3 */}
              <div
                onClick={() => openLightboxWithGlobalIndex(3)}
                className="hidden md:block relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={collageSlot3.src}
                  alt={collageSlot3.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">
                    {collageSlot3.title}
                  </p>
                </div>
              </div>

              {/* Secondary slot 4 */}
              <div
                onClick={() => openLightboxWithGlobalIndex(4)}
                className="hidden md:block relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={collageSlot4.src}
                  alt={collageSlot4.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">
                    {collageSlot4.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating button to open lightbox */}
            <button
              onClick={() => openLightboxWithGlobalIndex(0)}
              className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 bg-stone-950/85 hover:bg-stone-950 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-amber-300" />
              <span>Ver todas las fotos ({images.length})</span>
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 reveal-init reveal-up delay-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-stone-900 text-white shadow-md scale-105"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat.name}
              <span
                className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightboxAt(index)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col cursor-pointer hover:-translate-y-1 reveal-init reveal-scale"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors" />

                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {image.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-md text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-title text-base sm:text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
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
        images={images}
        currentIndex={lightboxIndex}
        onSelectIndex={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}
