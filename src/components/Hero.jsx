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
  Camera,
  Sparkles,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

const HERO_SLIDES = [
  {
    image: '/images/landing-2.webp',
    title: 'Tu Refugio Céntrico y Exclusivo en Jujuy',
    subtitle: 'Departamento 3 ambientes a solo 2 cuadras de Plaza Belgrano. Máximo confort, privacidad y ubicación privilegiada.',
    badge: 'Ubicación Inmejorable',
  },
  {
    image: '/images/landing-3.webp',
    title: 'Privacidad Total: 2 Baños en Suite',
    subtitle: 'Cada habitación cuenta con su propio baño privado completo. La independencia ideal para familias y amigos.',
    badge: '2 Baños en Suite',
  },
  {
    image: '/images/landing-1.webp',
    title: 'Equipamiento de Categoría para 4 Huéspedes',
    subtitle: 'Cocina integral completa, Smart TV, WiFi 300MB y balcón con vista abierta a los cerros de Jujuy.',
    badge: 'Todo Equipado',
  },
];

export default function Hero({ onOpenGallery, onOpenBookingModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const scrollToCalculator = (e) => {
    e.preventDefault();
    const el = document.getElementById('calculadora');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-center items-center bg-stone-950 text-white pt-24 sm:pt-28 pb-16 overflow-hidden"
    >
      {/* Background Slides with smooth Ken Burns animation and cinematic overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center ${
                index === currentSlide ? 'animate-kenburns scale-105' : 'scale-100'
              }`}
            />
            {/* Cinematic Multilayer Gradients for Crystal Clear Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/45" />
            <div className="absolute inset-0 mesh-gradient-dark opacity-65" />
          </div>
        ))}
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full my-auto">
        {/* Rating and Spec Pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 text-stone-200 shadow-xl reveal-init reveal-up">
          <span className="flex items-center text-amber-400 gap-1 font-bold">
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
            <ShieldCheck className="w-4 h-4" />
            Superanfitrión Verificado
          </span>
        </div>

        {/* Dynamic Title with animation */}
        <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-tight mb-4 drop-shadow-xl max-w-4xl reveal-init reveal-up delay-100">
          {HERO_SLIDES[currentSlide].title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-lg lg:text-xl text-stone-200 max-w-2xl font-light leading-relaxed mb-8 drop-shadow reveal-init reveal-up delay-200">
          {HERO_SLIDES[currentSlide].subtitle}
        </p>

        {/* 🌟 4 Property Highlights Chips (Aesthetic, clean, non-cluttering) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-3xl mb-10 reveal-init reveal-scale delay-300">
          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium uppercase tracking-wider">Capacidad</p>
              <p className="text-xs sm:text-sm font-bold text-white">Hasta 4 pers.</p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Bed className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium uppercase tracking-wider">Dormitorios</p>
              <p className="text-xs sm:text-sm font-bold text-white">2 Habitaciones</p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Bath className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium uppercase tracking-wider">Baños Privados</p>
              <p className="text-xs sm:text-sm font-bold text-white">2 en Suite</p>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3 text-left shadow-lg hover:border-white/30 transition-all">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium uppercase tracking-wider">Superficie</p>
              <p className="text-xs sm:text-sm font-bold text-white">66 m² + Balcón</p>
            </div>
          </div>
        </div>

        {/* 🚀 Dual Luxury CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto reveal-init reveal-up delay-400">
          <a
            href="#calculadora"
            onClick={scrollToCalculator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-600 via-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold px-8 py-4 rounded-full shadow-2xl shadow-rose-950/50 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5 text-amber-200" />
            <span>Consultar Disponibilidad</span>
          </a>

          <button
            onClick={onOpenGallery}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-semibold px-7 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <Camera className="w-5 h-5 text-amber-300" />
            <span>Ver Fotos del Depto</span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2.5 mt-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide ? 'w-8 bg-rose-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Manual Slide Controls for Desktop */}
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

      {/* Scroll Down Hint at the bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-1">
          Descubrí el departamento
        </span>
        <ChevronDown className="w-4 h-4 text-stone-400 animate-bounce" />
      </div>

      {/* Subtle bottom gradient transition into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />
    </section>
  );
}
