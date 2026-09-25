import {
  MapPin,
  Navigation,
  Compass,
  ExternalLink,
  Clock,
  Car,
  Footprints,
} from "lucide-react";
import { NEARBY_PLACES, APARTMENT_INFO } from "../data/apartmentData";

export default function LocationSection() {
  return (
    <section
      id="ubicacion"
      className="py-20 bg-stone-50 bg-topo-pattern mesh-gradient-warm border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-init reveal-up">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Ubicación Estratégica
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            En Pleno Centro de San Salvador de Jujuy
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 font-light">
            {APARTMENT_INFO.address}. A solo 2 cuadras de la plaza principal y a
            pasos de los mejores restaurantes, bancos y atractivos turísticos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 reveal-init reveal-left">
            <div className="space-y-3">
              <h3 className="font-serif-title text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-rose-600" />
                <span>Puntos de Interés a Pocos Metros</span>
              </h3>

              {NEARBY_PLACES.map((place, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-stone-800 group-hover:text-rose-600 transition-colors">
                        {place.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {place.desc}
                      </p>
                    </div>
                    <span className="shrink-0 bg-stone-100 text-stone-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Footprints className="w-3 h-3 text-rose-500" />
                      {place.distance}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-medium">
                    <span className="text-rose-600 font-semibold">
                      {place.type}
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <Clock className="w-3 h-3" /> {place.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <a
                href={APARTMENT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3.5 px-5 rounded-2xl text-sm transition-all shadow-md hover:scale-102"
              >
                <Navigation className="w-4 h-4 text-rose-400" />
                <span>Abrir en Google Maps / Cómo llegar</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xl flex flex-col min-h-[380px] lg:min-h-[480px] reveal-init reveal-right">
            <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-semibold text-stone-200">
                  {APARTMENT_INFO.address}
                </span>
              </div>
              <span className="text-[11px] bg-white/10 text-stone-300 px-2 py-0.5 rounded font-mono">
                Jujuy, Argentina
              </span>
            </div>

            <div className="relative flex-1 w-full h-full min-h-[350px]">
              <iframe
                title="Ubicación de Domus Alquileres en San Salvador de Jujuy"
                src={APARTMENT_INFO.mapEmbedUrl}
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
