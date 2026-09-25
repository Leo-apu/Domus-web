import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Tag } from "lucide-react";

export default function PhotoLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onSelectIndex((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft")
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleNext = () => onSelectIndex((currentIndex + 1) % images.length);
  const handlePrev = () =>
    onSelectIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-stone-950/95 backdrop-blur-xl text-white animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-stone-800 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-semibold text-stone-300">
            {currentIndex + 1} de {images.length} fotos
          </span>
          <span className="hidden sm:inline text-stone-600">|</span>
          <span className="hidden sm:flex items-center gap-1 text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-medium capitalize">
            <Tag className="w-3 h-3" />
            {currentImage.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors"
            aria-label="Cerrar galería"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar (Esc)</span>
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center backdrop-blur-md border border-stone-700 shadow-xl transition-transform hover:scale-105 active:scale-95"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center backdrop-blur-md border border-stone-700 shadow-xl transition-transform hover:scale-105 active:scale-95"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <div className="flex flex-col items-center justify-center max-w-5xl max-h-full px-2">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
          />

          <div className="mt-3 text-center max-w-xl">
            <h3 className="text-base sm:text-lg font-bold text-white font-serif-title">
              {currentImage.title}
            </h3>
            {currentImage.description && (
              <p className="text-xs sm:text-sm text-stone-400 mt-1 line-clamp-2">
                {currentImage.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-stone-800 bg-stone-950/80 shrink-0 overflow-x-auto">
        <div className="flex items-center justify-center gap-2 max-w-5xl mx-auto">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => onSelectIndex(idx)}
              className={`relative rounded-lg overflow-hidden shrink-0 transition-all ${
                idx === currentIndex
                  ? "ring-2 ring-rose-500 scale-105 opacity-100"
                  : "opacity-50 hover:opacity-80 scale-95"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-14 h-11 sm:w-18 sm:h-12 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
