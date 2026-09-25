import { useState, useEffect, useId } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Users,
  Calendar,
  Sparkles,
  Camera,
  Search,
  Check,
} from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

const HERO_SLIDES = [
  {
    image: '/images/landing-2.webp',
    title: 'Tu Refugio Céntrico y Exclusivo en Jujuy',
    subtitle: 'Departamento 3 ambientes a 2 cuadras de Plaza Belgrano. Comodidad, calidez y la mejor ubicación.',
    badge: 'Ubicación Inmejorable',
  },
  {
    image: '/images/landing-3.webp',
    title: 'Privacidad Total: 2 Baños en Suite',
    subtitle: 'Cada habitación con su propio baño privado. Ideal para familias o amigos que buscan independencia.',
    badge: '2 Baños en Suite',
  },
  {
    image: '/images/landing-1.webp',
    title: 'Equipamiento Completo para 4 Huéspedes',
    subtitle: 'Cocina integral, Smart TV, WiFi de 300MB y balcón con vista abierta a los cerros jujeños.',
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
    <section id="inicio" className="relative min-h-[85vh] sm:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-center items-center bg-stone-950 text-white pt-24 sm:pt-28 pb-16 sm:pb-20">
      {/* Background Slides with Ken Burns Effect */}
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

      {/* Floating Trust Badges in Corners (Desktop only, positioned comfortably) */}
      <div className="hidden xl:flex absolute top-28 left-8 z-20 items-center gap-2.5 bg-stone-900/80 border border-white/20 px-3.5 py-2 rounded-2xl backdrop-blur-md text-white shadow-xl animate-float-slow">
        <div className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
          <MapPin className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Ubicación</p>
          <p className="text-xs font-bold text-white">A 2 cuadras de Plaza Belgrano</p>
        </div>
      </div>

      <div className="hidden xl:flex absolute top-28 right-8 z-20 items-center gap-2.5 bg-stone-900/80 border border-white/20 px-3.5 py-2 rounded-2xl backdrop-blur-md text-white shadow-xl animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Superanfitrión</p>
          <p className="text-xs font-bold text-white">4.96 ★ Calificación Verificada</p>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
        {/* Rating and Spec Pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 text-stone-200 shadow-xl reveal-init reveal-up">
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

        {/* Hero Title (Clean, elegant, perfectly proportioned) */}
        <h1 className="font-serif-title text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3 drop-shadow-md max-w-3xl reveal-init reveal-up delay-100">
          {HERO_SLIDES[currentSlide].title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xs sm:text-base text-stone-200 max-w-xl font-light leading-relaxed mb-8 drop-shadow reveal-init reveal-up delay-200">
          {HERO_SLIDES[currentSlide].subtitle}
        </p>

        {/* 🚀 THE AIRBNB-STYLE FLOATING SEARCH CAPSULE (CLEAN, ELEVATED, WITH AMPLE SPACE BELOW) */}
        <div className="w-full max-w-3xl mx-auto reveal-init reveal-scale delay-300">
          <form
            onSubmit={handleCapsuleSubmit}
            className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-[0_15px_40px_rgba(0,0,0,0.35)] border border-stone-200/90 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-stone-900"
          >
            {/* Check-in Pill */}
            <div className="sm:col-span-3 px-4 py-2 rounded-xl sm:rounded-full hover:bg-stone-100/80 transition-colors cursor-pointer group text-left">
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
            <div className="sm:col-span-3 px-4 py-2 rounded-xl sm:rounded-full hover:bg-stone-100/80 transition-colors cursor-pointer group text-left">
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
            <div className="sm:col-span-3 px-4 py-2 rounded-xl sm:rounded-full hover:bg-stone-100/80 transition-colors cursor-pointer group text-left">
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

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 mt-8">
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

      {/* Floating 'Ver Fotos (8)' button in bottom-left corner (Airbnb Style, completely non-intrusive) */}
      <div className="absolute bottom-6 left-6 z-20 hidden sm:block">
        <button
          onClick={onOpenGallery}
          className="inline-flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>Ver todas las fotos (8)</span>
        </button>
      </div>

      {/* Manual Slide Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-sm border border-white/15 transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-sm border border-white/15 transition-colors"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
