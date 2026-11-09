import { useMemo } from "react";
import {
  Wifi,
  Zap,
  Droplets,
  Tv,
  Bath,
  Building2,
  Sparkles,
  Sun,
  Refrigerator,
  Coffee,
  Utensils,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Layers,
  Wind,
  Car,
  Lock,
  Snowflake,
  Bed,
} from "lucide-react";
import { AMENITIES, APARTMENTS } from "../data/apartmentData";

export default function FeaturesAndAmenities({ selectedApartment }) {
  const apt = selectedApartment || APARTMENTS[0];
  const isGorriti = apt.id === "domus-centro";

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Wifi":
        return <Wifi className="w-6 h-6" />;
      case "Zap":
        return <Zap className="w-6 h-6" />;
      case "Droplets":
        return <Droplets className="w-6 h-6" />;
      case "Tv":
        return <Tv className="w-6 h-6" />;
      case "Bath":
        return <Bath className="w-6 h-6" />;
      case "Building2":
        return <Building2 className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "Sun":
        return <Sun className="w-6 h-6" />;
      case "Refrigerator":
        return <Refrigerator className="w-6 h-6" />;
      case "Coffee":
        return <Coffee className="w-6 h-6" />;
      case "Utensils":
        return <Utensils className="w-6 h-6" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6" />;
      case "Flame":
        return <Flame className="w-6 h-6" />;
      case "Layers":
        return <Layers className="w-6 h-6" />;
      case "Wind":
        return <Wind className="w-6 h-6" />;
      case "Car":
        return <Car className="w-6 h-6" />;
      case "Lock":
        return <Lock className="w-6 h-6" />;
      case "Snowflake":
        return <Snowflake className="w-6 h-6" />;
      case "Bed":
        return <Bed className="w-6 h-6" />;
      default:
        return <CheckCircle2 className="w-6 h-6" />;
    }
  };

  const amenityGroups = useMemo(() => {
    if (Array.isArray(apt.amenities) && apt.amenities.length > 0) {
      const map = new Map();
      apt.amenities.forEach((item) => {
        const cat = item.category || "Servicios Principales";
        if (!map.has(cat)) {
          map.set(cat, []);
        }
        map.get(cat).push(item);
      });
      return Array.from(map.entries()).map(([category, items]) => ({
        category,
        items,
      }));
    }
    return AMENITIES;
  }, [apt.amenities]);

  return (
    <section
      id="comodidades"
      className="py-20 sm:py-24 bg-stone-900 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-init reveal-up">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-medium tracking-[0.25em] uppercase text-rose-300 mb-3">
            <span className="w-5 h-px bg-rose-400/50" />
            <span>SERVICIOS & EQUIPAMIENTO · {(apt.shortName || apt.name || "UNIDAD").toUpperCase()}</span>
            <span className="w-5 h-px bg-rose-400/50" />
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Servicios y Comodidades Pensadas para Vos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-light">
            Disfrutá de una estadía sin sorpresas ni costos ocultos en {apt.shortName || apt.name}. Todos los
            servicios están totalmente cubiertos.
          </p>
        </div>

        {/* 4 pilares destacados de servicios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-white/5 border border-white/10 hover:border-amber-400/40 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 group backdrop-blur-md reveal-init reveal-scale delay-100">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">Luz Incluida</h3>
            <p className="text-xs text-stone-400">
              Instalación eléctrica segura y sin costos extras.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-sky-400/40 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 group backdrop-blur-md reveal-init reveal-scale delay-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">
              Agua Caliente 24/7
            </h3>
            <p className="text-xs text-stone-400">
              Presión constante y termotanque de alta recuperación.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-emerald-400/40 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 group backdrop-blur-md reveal-init reveal-scale delay-300">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wifi className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">
              WiFi Fibra Óptica
            </h3>
            <p className="text-xs text-stone-400">
              Alta velocidad para streaming y home office.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-rose-400/40 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 group backdrop-blur-md reveal-init reveal-scale delay-400">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Tv className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">Smart TV HD</h3>
            <p className="text-xs text-stone-400">
              Pantalla plana con apps de streaming y cable.
            </p>
          </div>
        </div>

        {/* Grilla dinámica de categorías y comodidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {amenityGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className="bg-stone-800/60 border border-stone-700/80 rounded-3xl p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif-title text-xl font-bold text-rose-400 mb-6 pb-3 border-b border-stone-700">
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {group.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-stone-200 flex items-center justify-center shrink-0">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {item.name}
                        </h4>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ficha técnica rápida de la unidad seleccionada */}
        <div className="bg-linear-to-r from-stone-800 to-stone-800/90 border border-stone-700 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="border-r border-stone-700/80 last:border-none pr-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title">
                {apt.bedrooms || (isGorriti ? "3" : "1")}
              </span>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 font-medium">
                {apt.bedrooms && apt.bedrooms > 1 ? `${apt.bedrooms} Dormitorios` : "Ambientes Principales"}
              </p>
            </div>
            <div className="border-r border-stone-700/80 last:border-none pr-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title">
                {apt.bathrooms || (isGorriti ? "2" : "1")}
              </span>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 font-medium">
                {apt.bathrooms && apt.bathrooms > 1 ? `${apt.bathrooms} Baños` : "Baño Privado"}
              </p>
            </div>
            <div className="border-r border-stone-700/80 last:border-none pr-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title">
                {apt.surfaceM2 || 45} m²
              </span>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 font-medium">
                Superficie Cubierta
              </p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-serif-title">
                {apt.floor || (isGorriti ? "Piso 4" : "Cómoda")}
              </span>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 font-medium">
                {apt.zone || "Excelente Ubicación"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
