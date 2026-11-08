import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Users,
  Bed,
  Bath,
  Maximize2,
  CalendarCheck,
  Camera,
  Sparkles,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { APARTMENT_INFO, APARTMENTS } from "../data/apartmentData";

const HERO_SLIDES = APARTMENTS[0].heroSlides;

export default function Hero({
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

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length,
    );

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
        {/* Top Badges & Rating */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 lg:mb-5 text-stone-200 shadow-xl reveal-init reveal-up">
          <span className="flex items-center text-amber-400 gap-1 font-bold">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
            {APARTMENT_INFO.rating}
          </span>
          <span className="text-white/40">|</span>
          <span className="flex items-center gap-1 text-stone-300 text-xs sm:text-sm">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
            Centro, San Salvador de Jujuy
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:flex text-emerald-400 font-semibold items-center gap-1 text-xs sm:text-sm">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Superanfitrión Verificado
          </span>
        </div>

        {/* Quick Apartment Unit Switcher Pills inside Hero */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 bg-stone-900/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl">
          {APARTMENTS.map((apt) => {
            const isSelected = apt.id === selectedApartment?.id;
            return (
              <button
                key={apt.id}
                onClick={() => onSelectApartment?.(apt.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/40 scale-105"
                    : "text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{apt.shortName}</span>
                <span className="text-[10px] opacity-80">({apt.capacity}p)</span>
              </button>
            );
          })}
        </div>

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

        {/* Dynamic Apartment Specs Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-3.5 w-full max-w-4xl xl:max-w-5xl mb-5 sm:mb-7 lg:mb-8 reveal-init reveal-scale delay-300">
          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl p-2.5 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 flex items-center gap-2.5 sm:gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-stone-400 font-medium uppercase tracking-wider whitespace-nowrap">
                Capacidad
              </p>
              <p className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                Hasta {selectedApartment?.capacity || 4} pers.
              </p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl p-2.5 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 flex items-center gap-2.5 sm:gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-stone-400 font-medium uppercase tracking-wider whitespace-nowrap">
                Dormitorios
              </p>
              <p className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                {selectedApartment?.bedrooms || 2}{" "}
                {selectedApartment?.bedrooms === 1
                  ? "Ambiente"
                  : "Habitaciones"}
              </p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl p-2.5 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 flex items-center gap-2.5 sm:gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-stone-400 font-medium uppercase tracking-wider whitespace-nowrap">
                Baños
              </p>
              <p className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                {selectedApartment?.bathrooms || 2}{" "}
                {selectedApartment?.bathrooms === 1
                  ? "Baño Privado"
                  : "en Suite"}
              </p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl p-2.5 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 flex items-center gap-2.5 sm:gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-stone-400 font-medium uppercase tracking-wider whitespace-nowrap">
                Superficie
              </p>
              <p className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                {selectedApartment?.surfaceM2 || 66} m² + Balcón
              </p>
            </div>
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

        <div className="flex sm:hidden items-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? "w-6 bg-rose-500 shadow-sm shadow-rose-500/50"
                  : "w-1.5 bg-white/40"
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-900/40 hover:bg-stone-900/80 text-white items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-110 cursor-pointer"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-900/40 hover:bg-stone-900/80 text-white items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-110 cursor-pointer"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="hidden sm:flex absolute bottom-3 sm:bottom-4 lg:bottom-5 left-5 sm:left-8 z-20 items-center gap-2 bg-stone-900/75 backdrop-blur-md border border-white/20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-xl">
        <span className="text-[10px] sm:text-[11px] text-stone-300 font-mono font-semibold">
          0{currentSlide + 1} / 0{slides.length}
        </span>
        <div className="flex items-center gap-1.5 ml-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? "w-5 sm:w-6 bg-rose-500 shadow-sm shadow-rose-500/50"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <a
        href="#galeria"
        onClick={scrollToGallery}
        className="absolute bottom-3 sm:bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
        aria-label="Descubrí el departamento y ver fotos"
      >
        <span className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase font-bold tracking-widest text-stone-300 group-hover:text-white transition-colors mb-1 drop-shadow-md">
          Descubrí el departamento
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-stone-900/70 backdrop-blur-md border border-white/20 group-hover:border-white/40 flex items-center justify-center text-stone-300 group-hover:text-white shadow-lg transition-all">
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
        </div>
      </a>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-stone-50 to-transparent pointer-events-none" />
    </section>
  );
}
