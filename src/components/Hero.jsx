import { useState, useEffect } from "react";
import {
  CalendarCheck,
  Camera,
  ChevronDown,
} from "lucide-react";
import { APARTMENTS } from "../data/apartmentData";

const HERO_SLIDES = APARTMENTS[0].heroSlides;

export default function Hero({
  apartments = APARTMENTS,
  onOpenGallery,
  onOpenBookingModal,
  selectedApartment,
  onSelectApartment,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = selectedApartment?.heroSlides || HERO_SLIDES;

  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedApartment?.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToCalculator = (e) => {
    e.preventDefault();
    const el = document.getElementById("calculadora");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToGallery = (e) => {
    e.preventDefault();
    const el = document.getElementById("galeria");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center bg-stone-950 text-white pt-20 sm:pt-24 lg:pt-24 pb-14 sm:pb-16 overflow-hidden"
    >

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${slide.position || "object-center"} transition-transform duration-1000 ease-out ${
                index === currentSlide
                  ? "animate-kenburns scale-105"
                  : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/60 to-stone-950/45" />
            <div className="absolute inset-0 mesh-gradient-dark opacity-65" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full my-auto py-1 sm:py-2">

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-stone-300/90 mb-3 sm:mb-4 reveal-init reveal-up">
          <span className="font-mono text-stone-400">SAN SALVADOR DE JUJUY</span>
          <span className="w-1 h-1 rounded-full bg-amber-400/80" />
          <span className="font-semibold text-white flex items-center gap-1">
            <span className="text-amber-400">★ 4.96</span>
            <span className="text-stone-300 font-light ml-0.5">CALIFICACIÓN SUPERHOST</span>
          </span>
        </div>

        {apartments.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mb-3 sm:mb-4 bg-stone-900/60 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-lg">
            {apartments.map((apt) => {
              const isSelected = apt.id === selectedApartment?.id;
              return (
                <button
                  key={apt.id}
                  onClick={() => onSelectApartment?.(apt.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-stone-900 shadow-sm scale-102"
                      : "text-stone-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{apt.shortName}</span>
                  <span className="text-[10px] ml-1 opacity-70 font-mono">({apt.capacity}p)</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="min-h-13 sm:min-h-18 lg:min-h-22 xl:min-h-26 flex items-center justify-center mb-2 sm:mb-3">
          <h1 className="font-serif-title text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-tight drop-shadow-xl max-w-4xl reveal-init reveal-up delay-100">
            {slides[currentSlide]?.title || slides[0]?.title}
          </h1>
        </div>

        <div className="min-h-10 sm:min-h-11 lg:min-h-13 flex items-center justify-center mb-4 sm:mb-5 lg:mb-6">
          <p className="text-xs sm:text-base lg:text-lg text-stone-200 max-w-2xl font-light leading-relaxed drop-shadow reveal-init reveal-up delay-200">
            {slides[currentSlide]?.subtitle || slides[0]?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl max-w-3xl w-full py-2.5 sm:py-3.5 px-3 sm:px-6 mb-6 sm:mb-8 shadow-2xl reveal-init reveal-scale delay-300">
          <div className="py-1.5 sm:py-0 px-2 sm:px-4 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono font-medium">
              Capacidad
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              Hasta {selectedApartment?.capacity || 4} personas
            </span>
          </div>

          <div className="py-1.5 sm:py-0 px-2 sm:px-4 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono font-medium">
              Dormitorios
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {selectedApartment?.bedrooms || 2}{" "}
              {selectedApartment?.bedrooms === 1 ? "Ambiente" : "Habitaciones"}
            </span>
          </div>

          <div className="py-1.5 sm:py-0 px-2 sm:px-4 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono font-medium">
              Baños
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {selectedApartment?.bathrooms || 2}{" "}
              {selectedApartment?.bathrooms === 1 ? "Privado" : "en Suite"}
            </span>
          </div>

          <div className="py-1.5 sm:py-0 px-2 sm:px-4 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono font-medium">
              Superficie
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {selectedApartment?.surfaceM2 || 66} m² + Balcón
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto reveal-init reveal-up delay-400">
          <a
            href="#calculadora"
            onClick={scrollToCalculator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 via-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full shadow-2xl shadow-rose-950/50 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm lg:text-base cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            <span>Consultar Disponibilidad</span>
          </a>

          <button
            onClick={onOpenGallery}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-semibold px-5 py-3 sm:px-6 sm:py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm lg:text-base cursor-pointer"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            <span>Ver Fotos ({selectedApartment?.shortName || "Unidad"})</span>
          </button>
        </div>
      </div>

      <a
        href="#galeria"
        onClick={scrollToGallery}
        className="absolute bottom-3 sm:bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
        aria-label="Descubrí el departamento y ver fotos"
      >
        <span className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase font-mono tracking-widest text-stone-300 group-hover:text-white transition-colors mb-1 drop-shadow-md">
          Descubrí los espacios
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-stone-900/70 backdrop-blur-md border border-white/20 group-hover:border-white/40 flex items-center justify-center text-stone-300 group-hover:text-white shadow-lg transition-all">
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
        </div>
      </a>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-stone-50 to-transparent pointer-events-none" />
    </section>
  );
}
