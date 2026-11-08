import { MapPin, Phone, Mail, Clock, Heart, Lock } from "lucide-react";
import { APARTMENT_INFO } from "../data/apartmentData";

export default function Footer({ onOpenPrivacyModal, onNavigateAdmin }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md text-white font-serif font-bold text-lg">
                D
              </div>
              <span className="font-serif-title font-bold text-2xl text-white tracking-tight">
                DOMUS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              Departamentos en alquiler temporario en pleno centro de San
              Salvador de Jujuy. Espacios modernos, equipados y confortables
              para que te sientas como en casa.
            </p>
          </div>

          <div>
            <h4 className="font-serif-title text-base font-bold text-white mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#inicio"
                  className="hover:text-rose-400 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  className="hover:text-rose-400 transition-colors"
                >
                  Galería de Fotos
                </a>
              </li>
              <li>
                <a
                  href="#espacios"
                  className="hover:text-rose-400 transition-colors"
                >
                  Recorrido por Ambientes
                </a>
              </li>
              <li>
                <a
                  href="#comodidades"
                  className="hover:text-rose-400 transition-colors"
                >
                  Servicios Incluidos
                </a>
              </li>
              <li>
                <a
                  href="#calculadora"
                  className="hover:text-rose-400 transition-colors"
                >
                  Cotizador en Vivo
                </a>
              </li>
              <li>
                <a
                  href="#ubicacion"
                  className="hover:text-rose-400 transition-colors"
                >
                  Ubicación & Mapa
                </a>
              </li>
              <li>
                <a
                  href="#opiniones"
                  className="hover:text-rose-400 transition-colors"
                >
                  Opiniones de Huéspedes
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="hover:text-rose-400 transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif-title text-base font-bold text-white mb-4">
              Información Importante
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-200">Check-in:</strong>{" "}
                  {APARTMENT_INFO.checkIn}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-200">Check-out:</strong>{" "}
                  {APARTMENT_INFO.checkOut}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>San Salvador de Jujuy, Jujuy, Argentina</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif-title text-base font-bold text-white">
              Atención Directa
            </h4>
            <p className="text-xs text-stone-400">
              Coordinamos tu reserva sin comisiones de intermediarios y te
              asesoramos con tu viaje.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={APARTMENT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-md"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
                <span>Escribinos por WhatsApp</span>
              </a>
              <div>
                <a
                  href={APARTMENT_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-400 hover:text-white transition-colors"
                >
                  {APARTMENT_INFO.whatsappPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              © {currentYear} Domus Alquileres Temporarios. Todos los derechos reservados.
            </p>
            <span className="hidden sm:inline text-stone-700">|</span>
            <button
              onClick={() => onOpenPrivacyModal && onOpenPrivacyModal()}
              className="text-stone-400 hover:text-rose-400 underline underline-offset-4 transition-colors cursor-pointer"
            >
              Políticas de Privacidad & Términos (Ley 25.326)
            </button>
            <span className="hidden sm:inline text-stone-700">|</span>
            <button
              onClick={() => onNavigateAdmin && onNavigateAdmin()}
              className="text-stone-500 hover:text-rose-400 transition-colors cursor-pointer inline-flex items-center gap-1 font-mono text-[11px]"
              title="Acceso restringido para el dueño"
            >
              <Lock className="w-3 h-3" />
              <span>Acceso Dueño</span>
            </button>
          </div>

          <p className="flex items-center justify-center gap-1.5">
            <span>Desarrollado con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>por</span>
            <a
              href="https://portfolio-cruz-leandro.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-rose-400 font-semibold underline underline-offset-2 transition-colors"
            >
              Leandro V. Cruz - Analista Programador
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
