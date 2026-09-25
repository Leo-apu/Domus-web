import { MapPin, ShieldCheck, Wifi, Sparkles, Calendar } from "lucide-react";

export default function ParallaxBanner({ onOpenBookingModal }) {
  return (
    <section
      className="relative py-28 sm:py-36 bg-parallax-banner bg-stone-900 text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/landing-3.webp')",
      }}
    >
      <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-[2px]" />
      <div className="absolute inset-0 mesh-gradient-dark opacity-60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-rose-500/25 border border-rose-400/40 text-rose-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 reveal-init reveal-up">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          San Salvador de Jujuy
        </div>

        <h2 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-md reveal-init reveal-up delay-100">
          Tu Puerta de Entrada a los Paisajes del Norte
        </h2>

        <p className="text-sm sm:text-lg text-stone-200 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow reveal-init reveal-up delay-200">
          Disfrutá de la tranquilidad de un departamento de categoría con 2
          dormitorios en suite, ubicado en el centro neurálgico de Jujuy y con
          salida directa hacia la Quebrada de Humahuaca.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center reveal-init reveal-scale delay-100">
            <MapPin className="w-5 h-5 text-rose-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">
              A 2 cuadras de Plaza Belgrano
            </p>
            <p className="text-[11px] text-stone-300 mt-0.5">
              Acceso a pie a cafés y peñas
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center reveal-init reveal-scale delay-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">2 Baños en Suite</p>
            <p className="text-[11px] text-stone-300 mt-0.5">
              Privacidad total para 4 personas
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center reveal-init reveal-scale delay-300">
            <Wifi className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Fibra Óptica 300MB</p>
            <p className="text-[11px] text-stone-300 mt-0.5">
              Streaming y Home Office fluido
            </p>
          </div>
        </div>

        <div className="reveal-init reveal-up delay-300">
          <button
            onClick={() => onOpenBookingModal && onOpenBookingModal()}
            className="inline-flex items-center gap-2.5 bg-linear-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            <span>Solicitar Disponibilidad</span>
          </button>
        </div>
      </div>
    </section>
  );
}
