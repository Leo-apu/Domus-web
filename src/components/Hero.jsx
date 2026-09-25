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
} from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

const HERO_SLIDES = [
  {
    image: '/images/landing-2.webp',
    title: 'Tu Refugio Céntrico y Exclusivo en Jujuy',
    subtitle: 'Departamento 3 ambientes de 66 m² a 2 cuadras de Plaza Belgrano. Comodidad, calidez y la mejor ubicación.',
    badge: 'Ubicación Inmejorable',
  },
  {
    image: '/images/landing-3.webp',
    title: 'Privacidad Absoluta: 2 Baños en Suite',
    subtitle: 'Cada habitación con su propio baño privado completo. Ideal para familias o amigos que buscan independencia.',
    badge: 'Máximo Confort',
  },
  {
    image: '/images/landing-1.webp',
    title: 'Equipamiento Premium para 4 Personas',
    subtitle: 'Cocina integral completa, Smart TV, WiFi de 300MB y balcón con vista abierta a los cerros y la ciudad.',
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
    <section id="inicio" className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-stone-950 pt-20">
      {/* Background Slides with Ken Burns Motion Effect */}
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
              index === currentSlide ? 'animate-kenburns' : ''
            }`}
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
          <div className="absolute inset-0 mesh-gradient-dark opacity-60" />
        </div>
      ))}

      {/* Floating Trust Badges in Corners */}
      <div className="hidden lg:flex absolute top-28 left-8 z-20 items-center gap-2.5 bg-stone-900/70 border border-white/15 px-4 py-2 rounded-2xl backdrop-blur-md text-white shadow-xl animate-float-slow">
        <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Ubicación</p>
          <p className="text-xs font-bold text-white">A 2 cuadras de Plaza Belgrano</p>
        </div>
      </div>

      <div className="hidden lg:flex absolute top-28 right-8 z-20 items-center gap-2.5 bg-stone-900/70 border border-white/15 px-4 py-2 rounded-2xl backdrop-blur-md text-white shadow-xl animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 fill-amber-400" />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Superanfitrión</p>
          <p className="text-xs font-bold text-white">4.96 ★ Calificación Verificada</p>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center text-white flex-1 flex flex-col items-center justify-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 text-stone-200 shadow-xl">
          <span className="flex items-center text-amber-400 gap-1">
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
        <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4 drop-shadow-lg">
          {HERO_SLIDES[currentSlide].title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-lg text-stone-200 max-w-2xl font-light leading-relaxed mb-6 drop-shadow">
          {HERO_SLIDES[currentSlide].subtitle}
        </p>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGallery}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg text-xs sm:text-sm transition-all hover:scale-105 active:scale-95"
          >
            <Camera className="w-4 h-4 text-amber-300" />
            <span>Ver Fotos ({8})</span>
          </button>

          <a
            href="#espacios"
            className="inline-flex items-center gap-2 bg-stone-900/60 hover:bg-stone-900/90 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
          >
            <Compass className="w-4 h-4 text-rose-400" />
            <span>Ver Ambientes</span>
          </a>
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

      {/* 🚀 THE AIRBNB-STYLE FLOATING CAPSULE SEARCH BAR */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 w-full -mb-10 sm:-mb-12">
        <form
          onSubmit={handleCapsuleSubmit}
          className="glass-capsule rounded-3xl p-3 sm:p-3.5 shadow-2xl border border-stone-200/90 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-1 items-center"
        >
          {/* Check-in Pill */}
          <div className="sm:col-span-3 px-4 py-2.5 rounded-2xl hover:bg-stone-100/80 transition-colors cursor-pointer group">
            <label htmlFor={checkInId} className="block text-[10px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-rose-600 transition-colors">
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
          <div className="sm:col-span-3 px-4 py-2.5 rounded-2xl hover:bg-stone-100/80 transition-colors cursor-pointer group">
            <label htmlFor={checkOutId} className="block text-[10px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-rose-600 transition-colors">
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
          <div className="sm:col-span-3 px-4 py-2.5 rounded-2xl hover:bg-stone-100/80 transition-colors cursor-pointer group">
            <label htmlFor={guestsId} className="block text-[10px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-rose-600 transition-colors">
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
              <option value={4}>4 Huéspedes (Máximo)</option>
            </select>
          </div>

          {/* Main Action Button */}
          <div className="sm:col-span-3 sm:pl-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 via-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-rose-600/30 text-xs sm:text-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Solicitar Reserva</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
