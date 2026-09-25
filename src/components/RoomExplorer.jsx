import { useState } from "react";
import {
  Bed,
  Bath,
  UtensilsCrossed,
  Tv,
  CheckCircle2,
  Maximize,
  Users,
  Compass,
} from "lucide-react";
import { ROOMS_DETAILS } from "../data/apartmentData";

export default function RoomExplorer({ onSelectRoomImage }) {
  const [activeRoomId, setActiveRoomId] = useState(ROOMS_DETAILS[0].id);

  const activeRoom =
    ROOMS_DETAILS.find((r) => r.id === activeRoomId) || ROOMS_DETAILS[0];

  const getRoomIcon = (id) => {
    switch (id) {
      case "living-comedor":
        return <Tv className="w-4 h-4" />;
      case "cocina":
        return <UtensilsCrossed className="w-4 h-4" />;
      case "dormitorio-1":
      case "dormitorio-2":
        return <Bed className="w-4 h-4" />;
      case "baños":
        return <Bath className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="espacios"
      className="py-20 bg-stone-100/60 bg-topo-pattern border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-init reveal-up">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Distribución & Ambientes
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Recorrido por Espacios
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 font-light">
            Departamento de 3 ambientes de 66 m² diseñado para garantizar
            confort, luminosidad y privacidad total.
          </p>
        </div>

        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar reveal-init reveal-up delay-100">
          {ROOMS_DETAILS.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoomId(room.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 ${
                activeRoomId === room.id
                  ? "bg-stone-900 text-white shadow-xl scale-102 ring-2 ring-stone-900/10"
                  : "bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {getRoomIcon(room.id)}
              <span>{room.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-init reveal-scale delay-200">
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden shadow-lg bg-stone-100 aspect-[16/10]">
            <img
              src={activeRoom.image}
              alt={activeRoom.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {activeRoom.badge}
              </span>
              <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Maximize className="w-3 h-3 text-amber-400" />
                {activeRoom.area}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs text-stone-300 font-medium">
                Ubicación y Confort
              </p>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title drop-shadow">
                {activeRoom.name}
              </h3>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  {getRoomIcon(activeRoom.id)}
                </div>
                <div>
                  <h3 className="font-serif-title text-2xl font-bold text-stone-900">
                    {activeRoom.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-500 font-medium mt-0.5">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {activeRoom.capacity}
                    </span>
                    <span>•</span>
                    <span>{activeRoom.area}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Espacio preparado con detalles de categoría para brindar una
                experiencia de estadía superior.
              </p>

              <div className="space-y-3 mb-8">
                {activeRoom.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-stone-700 font-medium leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <a
                href="#calculadora"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md hover:scale-102"
              >
                <span>Consultar este espacio</span>
              </a>

              <a
                href="#galeria"
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Ver más fotos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
