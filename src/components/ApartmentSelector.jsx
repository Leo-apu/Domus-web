import {
  Users,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { APARTMENTS } from "../data/apartmentData";

export default function ApartmentSelector({
  apartments = APARTMENTS,
  selectedApartmentId,
  onSelectApartment,
  onOpenBookingModal,
}) {
  const handleSelectAndScroll = (apartmentId, targetSectionId = "galeria") => {
    onSelectApartment(apartmentId);
    const target = document.getElementById(targetSectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="departamentos"
      className="py-16 sm:py-20 bg-stone-100/70 bg-topo-pattern border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-init reveal-up">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-medium tracking-[0.25em] uppercase text-amber-800 mb-3">
            <span className="w-5 h-px bg-amber-600/40" />
            <span>NUESTRAS {apartments.length} UNIDADES EXCLUSIVAS</span>
            <span className="w-5 h-px bg-amber-600/40" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Elegí el espacio ideal para tu estadía en{" "}
            <span className="font-serif italic font-normal text-rose-600">Jujuy</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Alojamientos temporarios de categoría en San Salvador de Jujuy, pensados para el descanso de familias, parejas y profesionales.
          </p>

          <div className="mt-6 sm:mt-8 inline-flex p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-md gap-1 sm:gap-2 max-w-full overflow-x-auto">
            {apartments.map((apt) => {
              const isSelected = apt.id === selectedApartmentId;
              return (
                <button
                  key={apt.id}
                  onClick={() => onSelectApartment(apt.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-stone-900 text-white shadow-md shadow-stone-900/20 scale-[1.02]"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  <span>{apt.shortName}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? "bg-rose-500 text-white"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {apt.capacity} pers.
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`grid grid-cols-1 ${apartments.length === 2 ? 'md:grid-cols-2' : apartments.length >= 3 ? 'md:grid-cols-3' : 'max-w-2xl'} max-w-5xl mx-auto gap-6 sm:gap-8 items-stretch`}>
          {apartments.map((apt) => {
            const isSelected = apt.id === selectedApartmentId;
            return (
              <div
                key={apt.id}
                onClick={() => onSelectApartment(apt.id)}
                className={`relative flex flex-col rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden bg-white text-stone-800 ${
                  isSelected
                    ? "ring-3 ring-rose-500 shadow-2xl shadow-rose-900/15 -translate-y-1.5 border-transparent"
                    : "border border-stone-200/90 shadow-md hover:shadow-xl hover:border-stone-300 hover:-translate-y-1"
                }`}
              >

                {isSelected && (
                  <div className="bg-linear-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    <span>UNIDAD ACTIVA EN LA PÁGINA</span>
                  </div>
                )}

                <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                  <img
                    src={apt.coverImage}
                    alt={apt.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="bg-stone-900/85 backdrop-blur-md text-white border border-white/20 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {apt.type}
                    </span>
                    <span className="bg-amber-400 text-stone-950 font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full shadow-md">
                      {apt.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium flex items-center justify-between">
                    <span className="text-stone-300 drop-shadow-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {apt.address.split(",")[0]}
                    </span>
                    <span className="font-bold text-amber-300 drop-shadow-sm">
                      Hasta {apt.capacity} huéspedes
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{apt.address}</span>
                    </div>

                    <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-2">
                      {apt.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 mb-5 leading-relaxed">
                      {apt.description}
                    </p>

                    <div className="grid grid-cols-4 gap-2 py-3 px-2 rounded-2xl bg-stone-50 border border-stone-200/80 mb-5 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="w-4 h-4 text-rose-500 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase font-semibold">
                          Capacidad
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          {apt.capacity} pers.
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-stone-200">
                        <Bed className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase font-semibold">
                          Dorm.
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          {apt.bedrooms}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-stone-200">
                        <Bath className="w-4 h-4 text-sky-500 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase font-semibold">
                          Baños
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          {apt.bathrooms}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-stone-200">
                        <Maximize2 className="w-4 h-4 text-emerald-500 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase font-semibold">
                          Sup.
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          {apt.surfaceM2}m²
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {apt.highlights.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-stone-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApartment(apt.id);
                        if (onOpenBookingModal) {
                          onOpenBookingModal({ apartmentId: apt.id });
                        }
                      }}
                      className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/25"
                          : "bg-stone-900 hover:bg-stone-850 text-white shadow-xs"
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      Consultar / Reservar {apt.shortName}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndScroll(apt.id, "galeria");
                      }}
                      className="w-full py-2 px-4 rounded-xl font-semibold text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Ver Fotos y Espacios</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
