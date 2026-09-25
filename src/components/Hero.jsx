import { useState, useEffect } from 'react';
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
  ShieldCheck,
  Camera,
} from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

const HERO_SLIDES = [
  {
    image: '/images/landing-2.webp',
    title: 'Tu Nuevo Espacio Ideal en Jujuy',
    subtitle: 'Departamento 3 ambientes, luminoso y moderno, en pleno centro de San Salvador de Jujuy.',
    badge: 'Ubicación Inmejorable',
  },
  {
    image: '/images/landing-3.webp',
    title: 'Confort y Privacidad Total',
    subtitle: '2 dormitorios independientes, cada uno con su propio baño privado en suite.',
    badge: '2 Baños en Suite',
  },
  {
    image: '/images/landing-1.webp',
    title: 'Equipamiento Completo para 4 Personas',
    subtitle: 'Cocina integral, Smart TV, WiFi de alta velocidad y balcón con vista a la ciudad.',
    badge: 'Calidad Garantizada',
  },
];

export default function Hero({ onOpenGallery }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section id="inicio" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 pt-20">
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transform transition-transform duration-10000`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlays for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/40 to-stone-950/80" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white flex flex-col items-center">
        {/* Rating and Location Pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 text-stone-200 shadow-lg">
          <span className="flex items-center text-amber-400 font-semibold gap-1">
            <Star className="w-4 h-4 fill-amber-400" />
            {APARTMENT_INFO.rating}
          </span>
          <span className="text-white/40">|</span>
          <span className="flex items-center gap-1 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            Centro, San Salvador de Jujuy
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Superanfitrión
          </span>
        </div>

        {/* Dynamic Title with animation */}
        <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight mb-4 drop-shadow-md">
          {HERO_SLIDES[currentSlide].title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-stone-200 max-w-2xl font-light leading-relaxed mb-8 drop-shadow">
          {HERO_SLIDES[currentSlide].subtitle}
        </p>

        {/* Property Highlights Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-2xl mb-8">
          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-stone-400 font-medium">Capacidad</p>
              <p className="text-sm font-bold text-white">Hasta 4 pers.</p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Bed className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-stone-400 font-medium">Dormitorios</p>
              <p className="text-sm font-bold text-white">2 Habitaciones</p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Bath className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-stone-400 font-medium">Baños</p>
              <p className="text-sm font-bold text-white">2 en Suite</p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-stone-400 font-medium">Superficie</p>
              <p className="text-sm font-bold text-white">66 m² + Balcón</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href="#calculadora"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold px-7 py-3.5 rounded-xl shadow-xl shadow-rose-900/30 transition-all hover:scale-105 active:scale-95 text-base"
          >
            <CalendarCheck className="w-5 h-5" />
            <span>Consultar Disponibilidad</span>
          </a>

          <button
            onClick={onOpenGallery}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-base"
          >
            <Camera className="w-5 h-5 text-amber-300" />
            <span>Ver Fotos del Depto</span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 mt-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-rose-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Manual Slide Controls */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white items-center justify-center backdrop-blur-sm border border-white/10 transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white items-center justify-center backdrop-blur-sm border border-white/10 transition-colors"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Subtle Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />
    </section>
  );
}
