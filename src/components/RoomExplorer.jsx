import { useState, useEffect } from "react";
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

export default function RoomExplorer({
  onSelectRoomImage,
  apartment,
  roomsDetails,
}) {
  const rooms = roomsDetails || apartment?.roomsDetails || ROOMS_DETAILS;
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id || "living-comedor");

  // Reset to first room of the active apartment
  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setActiveRoomId(rooms[0].id);
    }
  }, [apartment?.id, rooms]);

  const activeRoom =
    rooms.find((r) => r.id === activeRoomId) || rooms[0] || ROOMS_DETAILS[0];

  const getRoomIcon = (id) => {
    if (id.includes("living") || id.includes("suite-principal")) {
      return <Tv className="w-4 h-4" />;
    }
    if (id.includes("cocina") || id.includes("kitchenette")) {
      return <UtensilsCrossed className="w-4 h-4" />;
    }
    if (id.includes("dorm") || id.includes("master") || id.includes("hab")) {
      return <Bed className="w-4 h-4" />;
    }
    if (id.includes("baño")) {
      return <Bath className="w-4 h-4" />;
    }
    return <Compass className="w-4 h-4" />;
  };

  return (
    <section
      id="espacios"
      className="py-20 bg-stone-100/60 bg-topo-pattern border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-init reveal-up">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-medium tracking-[0.25em] uppercase text-amber-800 mb-3">
            <span className="w-5 h-px bg-amber-600/40" />
            <span>DISTRIBUCIÓN & AMBIENTES</span>
            <span className="w-5 h-px bg-amber-600/40" />
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Recorrido por Espacios de{" "}
            <span className="text-amber-700">
              {apartment?.shortName || "la Unidad"}
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 font-light">
            {apartment?.type || "Departamento"} de {apartment?.surfaceM2 || 66} m² diseñado para garantizar
            confort, luminosidad y privacidad total.
          </p>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar reveal-init reveal-up delay-100">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoomId(room.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeRoomId === room.id
                  ? "bg-stone-900 text-white shadow-lg scale-105"
                  : "bg-white text-stone-600 hover:bg-stone-50 border border-stone-200"
              }`}
            >
              {getRoomIcon(room.id)}
              <span>{room.name}</span>
            </button>
          ))}
        </div>

        {/* Active Room Detail Showcase */}
        {activeRoom && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden reveal-init reveal-scale delay-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Photo Side */}
              <div
                onClick={onSelectRoomImage}
                className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-stone-950 cursor-pointer group"
              >
                <img
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors" />

                <div className="absolute top-4 left-4">
                  <span className="bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {activeRoom.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs bg-black/60 backdrop-blur-md inline-block px-3 py-1 rounded-md text-stone-300">
                    Clic para ver fotos ampliadas en la galería
                  </p>
                </div>
              </div>

              {/* Specs & Features Side */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                      <Maximize className="w-3.5 h-3.5 text-stone-500" />
                      {activeRoom.area}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      {activeRoom.capacity}
                    </span>
                  </div>

                  <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 mb-6">
                    {activeRoom.name}
                  </h3>

                  <div className="space-y-3.5 mb-8">
                    {activeRoom.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-stone-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-500 text-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Totalmente amoblado y listo para habitar</span>
                  </div>
                  <button
                    onClick={onSelectRoomImage}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 underline underline-offset-4 cursor-pointer"
                  >
                    Ver en Galería
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
