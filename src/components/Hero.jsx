import { useState, useEffect, useId } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Users,
  Calendar,
  Sparkles,
  ShieldCheck,
  Camera,
  Search,
  Check,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

const HERO_SLIDES = [
  {
    image: '/images/landing-2.webp',
    title: 'Tu Refugio Céntrico y Exclusivo en Jujuy',
    subtitle: 'Departamento 3 ambientes de 66 m² a 2 cuadras de Plaza Belgrano. Comodidad, calidez y la mejor ubicación para tus vacaciones o estadías de trabajo.',
    badge: 'Ubicación Inmejorable',
  },
  {
    image: '/images/landing-3.webp',
    title: 'Privacidad Total: 2 Baños en Suite',
    subtitle: 'Cada habitación con su propio baño privado completo. Ideal para familias o amigos que buscan máxima independencia.',
    badge: '2 Baños en Suite',
  },
  {
    image: '/images/landing-1.webp',
    title: 'Equipamiento Completo para 4 Huéspedes',
    subtitle: 'Cocina integral equipada, Smart TV, WiFi de 300MB y balcón con vista abierta a los cerros y la ciudad.',
    badge: 'Todo Incluido',
  },
];

export default function Hero({ onOpenGallery, onOpenBookingModal }) {
  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();

  const [currentSlide, setCurrentSlide] = useState(0);

  // Helper dates for the search capsule
  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(getTodayString(1));
  const [checkOut, setCheckOut] = useState(getTodayString(4));
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleCapsuleSubmit = (e) => {
    e.preventDefault();
    if (onOpenBookingModal) {
      onOpenBookingModal({
        checkIn,
        checkOut,
        guests,
      });
    }
  };

  return (
    <section id="inicio" className="relative bg-stone-950 text-white pt-24 sm:pt-28 pb-14 sm:pb-18">
      {/* Background Slides with Ken Burns (ONLY this inner layer has overflow-hidden so the search bar never gets cut off) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center ${
                index === currentSlide ? 'animate-kenburns' : ''
              }`}
            />
            {/* Cinematic dark gradients for crystal-clear readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/45" />
            <div className="absolute inset-0 mesh-gradient-dark opacity-70" />
          </div>
        ))}
      </div>

      {/* Floating Trust Badges in Corners (Desktop only) */}
      <div className="hidden xl:flex absolute top-32 left-8 z-20 items-center gap-2.5 bg-stone-900/80 border border-white/20 px-4 py-2.5 rounded-2xl backdrop-blur-md text-white shadow-xl animate-float-slow">
        <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Ubicación</p>
          <p className="text-xs font-bold text-white">A 2 cuadras de Plaza Belgrano</p>
        </div>
      </div>

      <div className="hidden xl:flex absolute top-32 right-8 z-20 items-center gap-2.5 bg-stone-900/80 border border-white/20 px-4 py-2.5 rounded-2xl backdrop-blur-md text-white shadow-xl animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 fill-amber-400" />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Superanfitrión</p>
          <p className="text-xs font-bold text-white">4.96 ★ Calificación Verificada</p>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        {/* Rating and Spec Pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 text-stone-200 shadow-xl">
          <span className="flex items-center text-amber-400 gap-1 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {APARTMENT_INFO.rating}
          </span>
          <span className="text-white/40">|</span>
          <span className="text-stone-300">San Salvador de Jujuy</span>
          <span className="text-white/40">|</span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <Check className="w-3.5 h-3.5" /> Depto 3 Ambientes
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4 drop-shadow-md">
          {HERO_SLIDES[currentSlide].title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-lg text-stone-200 max-w-2xl font-light leading-relaxed mb-6 drop-shadow">
          {HERO_SLIDES[currentSlide].subtitle}
        </p>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={onOpenGallery}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-amber-300" />
            <span>Ver Fotos ({8})</span>
          </button>

          <a
            href="#espacios"
            className="inline-flex items-center gap-2 bg-stone-900/60 hover:bg-stone-900/90 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
          >
            <Compass className="w-4 h-4 text-rose-400" />
            <span>Recorrido por Ambientes</span>
          </a>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 mb-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-rose-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Manual Slide Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-sm border border-white/15 transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-sm border border-white/15 transition-colors"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 🚀 THE AIRBNB-STYLE FLOATING SEARCH CAPSULE (100% VISIBLE, NO CLIPPING) */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-2.5">
          <span className="text-[11px] font-bold text-amber-300/90 uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Consultar Fechas Directamente con el Anfitrión
          </span>
        </div>

        <form
          onSubmit={handleCapsuleSubmit}
          className="bg-white rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl border-2 border-stone-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-stone-900"
        >
          {/* Check-in Pill */}
          <div className="sm:col-span-3 px-4 py-2 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors cursor-pointer group text-left">
            <label htmlFor={checkInId} className="block text-[10px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-rose-600 transition-colors cursor-pointer">
              Llegada
            </label>
            <input
              id={checkInId}
              type="date"
              required
              min={getTodayString(0)}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (new Date(e.target.value) >= new Date(checkOut)) {
                  const next = new Date(e.target.value);
                  next.setDate(next.getDate() + 1);
                  setCheckOut(next.toISOString().split('T')[0]);
                }
              }}
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
            />
          </div>

          <div className="hidden sm:block w-px h-8 bg-stone-200" />

          {/* Check-out Pill */}
          <div className="sm:col-span-3 px-4 py-2 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors cursor-pointer group text-left">
            <label htmlFor={checkOutId} className="block text-[10px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-rose-600 transition-colors cursor-pointer">
              Salida
            </label>
            <input
              id={checkOutId}
              type="date"
              required
              min={checkIn || getTodayString(1)}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
            />
          </div>

          <div className="hidden sm:block w-px h-8 bg-stone-200" />

          {/* Guests Pill */}
          <div className="sm:col-span-3 px-4 py-2 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors cursor-pointer group text-left">
            <label htmlFor={guestsId} className="block text-[10px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-rose-600 transition-colors cursor-pointer">
              Huéspedes
            </label>
            <select
              id={guestsId}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Huésped</option>
              <option value={2}>2 Huéspedes</option>
              <option value={3}>3 Huéspedes</option>
              <option value={4}>4 Huéspedes (Máx)</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 px-4 rounded-xl sm:rounded-full shadow-lg shadow-rose-900/30 text-xs sm:text-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Solicitar Reserva</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
