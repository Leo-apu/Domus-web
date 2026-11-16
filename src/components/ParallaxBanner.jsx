import { MapPin, ShieldCheck, Wifi, Sparkles, Calendar } from "lucide-react";
import { APARTMENTS } from "../data/apartmentData";

export default function ParallaxBanner({
  selectedApartment,
  onOpenBookingModal,
}) {
  const apt = selectedApartment || APARTMENTS[0];
  const isGorriti = apt.id === "domus-centro";

  return (
    <section
      className="relative py-28 sm:py-36 bg-parallax-banner bg-stone-900 text-white overflow-hidden transition-all duration-700"
      style={{
        backgroundImage: `url('${apt.coverImage || "/images/landing-3.webp"}')`,
      }}
    >
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-[2px]" />
      <div className="absolute inset-0 mesh-gradient-dark opacity-65" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-medium tracking-[0.25em] uppercase text-rose-300 mb-6 reveal-init reveal-up">
          <span className="w-5 h-px bg-rose-400/60" />
          <span>UBICACIÓN ESTRATÉGICA · {apt.shortName.toUpperCase()}</span>
          <span className="w-5 h-px bg-rose-400/60" />
        </div>

        <h2 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-md reveal-init reveal-up delay-100">
          {isGorriti
            ? "Tu Puerta de Entrada a los Paisajes del Norte"
            : "Confort, Ubicación y Conectividad Estratégica"}
        </h2>

        <p className="text-sm sm:text-lg text-stone-200 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow reveal-init reveal-up delay-200">
          {isGorriti
            ? "Disfrutá de la tranquilidad de un departamento de categoría con 2 dormitorios en suite sobre Av. Gorriti 613, a pasos del Parque Lineal Xibi Xibi y a minutos caminando del centro histórico."
            : "Disfrutá de un estudio boutique moderno y confortable sobre Av. Párroco Marshke 516, con sommier King size, kitchenette equipada y salida directa hacia las rutas turísticas de Jujuy."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center reveal-init reveal-scale delay-100">
            <MapPin className="w-5 h-5 text-rose-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">
              {isGorriti ? "A pasos del Parque Xibi Xibi" : "Av. Párroco Marshke 516"}
            </p>
            <p className="text-[11px] text-stone-300 mt-0.5">
              {isGorriti
                ? "A 6 cuadras del casco céntrico"
                : "Conexión ágil a Rutas 9, 66 y Terminal"}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center reveal-init reveal-scale delay-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">
              {isGorriti ? "2 Baños en Suite" : "Sommier King Size"}
            </p>
            <p className="text-[11px] text-stone-300 mt-0.5">
              {isGorriti
                ? "Privacidad total para 4 personas"
                : "Descanso premium para 2 personas"}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center reveal-init reveal-scale delay-300">
            <Wifi className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Fibra Óptica 300MB</p>
            <p className="text-[11px] text-stone-300 mt-0.5">
              {isGorriti
                ? "Streaming y Home Office fluido"
                : "Ideal trabajo remoto y nómades"}
            </p>
          </div>
        </div>

        <div className="reveal-init reveal-up delay-300">
          <button
            onClick={() =>
              onOpenBookingModal &&
              onOpenBookingModal({
                apartmentId: apt.id,
                apartmentName: apt.name,
              })
            }
            className="inline-flex items-center gap-2.5 bg-linear-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            <span>Consultar Disponibilidad en {apt.shortName}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
