import { Heart, Sparkles, CheckCircle, ShieldCheck } from "lucide-react";
import { APARTMENT_INFO } from "../data/apartmentData";

export default function ParallaxStory({ onOpenBookingModal }) {
  return (
    <section
      className="relative py-28 sm:py-36 bg-parallax-banner text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/landing-1.webp')",
      }}
    >
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-[2px]" />
      <div className="absolute inset-0 mesh-gradient-dark opacity-75" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 reveal-init reveal-up">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          Nuestra Historia & Compromiso
        </div>

        <h2 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg reveal-init reveal-up delay-100">
          Desde Siempre, Brindando Calidad y Confort
        </h2>

        <p className="text-sm sm:text-lg text-stone-200 max-w-3xl mx-auto font-light leading-relaxed mb-12 drop-shadow reveal-init reveal-up delay-200">
          En Domus nos dedicamos a ofrecer soluciones de alojamiento que
          combinan ubicación estratégica, independencia y un servicio cercano.
          Cuidamos cada detalle de limpieza, equipamiento y atención para que te
          sientas como en tu propia casa.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center reveal-init reveal-scale delay-100">
            <span className="font-serif-title text-3xl sm:text-4xl font-extrabold text-amber-400 block mb-1">
              4.96 ★
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white block">
              Calificación Media
            </span>
            <span className="text-[11px] text-stone-300">
              Basada en más de 50 estadías
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center reveal-init reveal-scale delay-200">
            <span className="font-serif-title text-3xl sm:text-4xl font-extrabold text-rose-400 block mb-1">
              66 m²
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white block">
              Espacio Exclusivo
            </span>
            <span className="text-[11px] text-stone-300">
              3 ambientes + Balcón
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center reveal-init reveal-scale delay-300">
            <span className="font-serif-title text-3xl sm:text-4xl font-extrabold text-emerald-400 block mb-1">
              100%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white block">
              Servicios Incluidos
            </span>
            <span className="text-[11px] text-stone-300">
              Luz, agua, gas y WiFi 300MB
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center reveal-init reveal-scale delay-400">
            <span className="font-serif-title text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-1">
              24/7
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white block">
              Asistencia al Huésped
            </span>
            <span className="text-[11px] text-stone-300">
              Contacto directo con el dueño
            </span>
          </div>
        </div>

        <div className="reveal-init reveal-up delay-400">
          <button
            onClick={() => onOpenBookingModal && onOpenBookingModal()}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-rose-600 via-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Planificar mi Estadía en Domus</span>
          </button>
        </div>
      </div>
    </section>
  );
}
