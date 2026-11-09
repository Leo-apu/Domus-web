import {
  MapPin,
  Navigation,
  Compass,
  ExternalLink,
  Clock,
  Car,
  Footprints,
  Building,
} from "lucide-react";
import { NEARBY_PLACES, APARTMENT_INFO, APARTMENTS } from "../data/apartmentData";

export default function LocationSection({
  apartments = APARTMENTS,
  selectedApartment,
  onSelectApartment,
}) {
  const activeApartment = selectedApartment || apartments[0] || APARTMENTS[0];
  const places = activeApartment.nearbyPlaces || NEARBY_PLACES;
  const address = activeApartment.address || APARTMENT_INFO.address;
  const mapUrl = activeApartment.googleMapsUrl || APARTMENT_INFO.googleMapsUrl;
  const embedUrl = activeApartment.mapEmbedUrl || APARTMENT_INFO.mapEmbedUrl;

    return (
    <section
      id="ubicacion"
      className="py-20 sm:py-24 bg-stone-900 text-white relative overflow-hidden"
    >
      {/* Ambient Lighting & Atmosphere */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 reveal-init reveal-up">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-medium tracking-[0.25em] uppercase text-rose-400 mb-3">
            <span className="w-5 h-px bg-rose-400/50" />
            <span>ENTORNO & CONECTIVIDAD</span>
            <span className="w-5 h-px bg-rose-400/50" />
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Ubicación de{" "}
            <span className="font-serif italic font-normal text-rose-400">
              {activeApartment.shortName}
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-300 font-light">
            <strong className="text-white font-semibold">{address}</strong>
            {" · "}
            {activeApartment.zone}. Excelente punto de partida para disfrutar de
            la ciudad y de las excursiones a la Quebrada.
          </p>

          {/* Quick Location Switcher Buttons (Solo si hay más de 1 unidad activa) */}
          {apartments.length > 1 && (
            <div className="mt-6 inline-flex flex-wrap items-center justify-center p-1.5 bg-stone-800/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg gap-2">
              {apartments.map((apt) => {
                const isSelected = apt.id === activeApartment.id;
                return (
                  <button
                    key={apt.id}
                    onClick={() => onSelectApartment?.(apt.id)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-stone-950 shadow-md scale-[1.02]"
                        : "text-stone-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <MapPin
                      className={`w-3.5 h-3.5 ${
                        isSelected ? "text-rose-600" : "text-stone-400"
                      }`}
                    />
                    <span>{apt.shortName}</span>
                    <span
                      className={`hidden sm:inline text-[11px] ${
                        isSelected ? "text-stone-600" : "text-stone-400"
                      }`}
                    >
                      ({apt.address.split(",")[0]})
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Nearby places list */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 reveal-init reveal-left">
            <div className="space-y-3">
              <h3 className="font-serif-title text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-rose-400" />
                <span>Puntos de Interés Cercanos</span>
              </h3>

              <div className="bg-stone-800/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl divide-y divide-white/10 overflow-hidden">
                {places.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-stone-100 group-hover:text-rose-400 transition-colors">
                          {place.name}
                        </h4>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {place.desc}
                        </p>
                      </div>
                      <span className="shrink-0 bg-white/10 text-stone-200 text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
                        <Footprints className="w-3 h-3 text-rose-400" />
                        {place.distance}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400 font-medium">
                      <span className="text-rose-400 font-semibold">
                        {place.type}
                      </span>
                      <span className="flex items-center gap-1 text-stone-400">
                        <Clock className="w-3 h-3" /> {place.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 px-5 rounded-2xl text-sm transition-all shadow-lg shadow-rose-950/40 hover:scale-102 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Abrir en Google Maps / Cómo llegar</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/70" />
              </a>
            </div>
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-7 bg-stone-850 rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col min-h-95 lg:min-h-120 reveal-init reveal-right">
            <div className="bg-stone-950 text-white px-5 py-3.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-semibold text-stone-200">
                  {address}
                </span>
              </div>
              <span className="text-[11px] bg-white/10 text-stone-300 px-2.5 py-0.5 rounded font-mono">
                {activeApartment.shortName}
              </span>
            </div>

            <div className="relative flex-1 w-full h-full min-h-87.5">
              <iframe
                title={`Ubicación de ${activeApartment.name}`}
                src={embedUrl}
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
