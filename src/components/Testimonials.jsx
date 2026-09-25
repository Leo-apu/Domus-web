import { Star, Quote, CheckCircle2, Award, HeartHandshake } from "lucide-react";
import { TESTIMONIALS, APARTMENT_INFO } from "../data/apartmentData";

export default function Testimonials() {
  return (
    <section
      id="opiniones"
      className="py-20 bg-stone-50 bg-topo-pattern mesh-gradient-warm border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-init reveal-up">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Experiencia de Nuestros Huéspedes
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Opiniones Reales y Calificaciones
          </h2>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-stone-200/90">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-extrabold text-stone-900 text-xl font-serif-title">
              {APARTMENT_INFO.rating}
            </span>
            <span className="text-stone-400">|</span>
            <span className="text-xs sm:text-sm text-stone-600 font-medium">
              Más de {APARTMENT_INFO.reviewsCount} estadías exitosas
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12 reveal-init reveal-up delay-100">
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm text-center">
            <span className="text-xs text-stone-500 font-medium">Limpieza</span>
            <p className="text-xl font-bold text-stone-900 mt-0.5">5.0 ★</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm text-center">
            <span className="text-xs text-stone-500 font-medium">
              Ubicación
            </span>
            <p className="text-xl font-bold text-stone-900 mt-0.5">5.0 ★</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm text-center">
            <span className="text-xs text-stone-500 font-medium">
              Atención Anfitrión
            </span>
            <p className="text-xl font-bold text-stone-900 mt-0.5">4.9 ★</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm text-center">
            <span className="text-xs text-stone-500 font-medium">
              Calidad / Precio
            </span>
            <p className="text-xl font-bold text-stone-900 mt-0.5">4.9 ★</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-init reveal-up delay-${(idx + 1) * 100}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] bg-rose-50 text-rose-700 font-semibold px-2.5 py-0.5 rounded-full">
                    {t.tag}
                  </span>
                </div>

                <h3 className="font-serif-title font-bold text-stone-900 text-base mb-2">
                  "{t.title}"
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-6">
                  {t.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{t.name}</h4>
                  <p className="text-[11px] text-stone-400 font-medium">
                    {t.origin} · {t.date}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
