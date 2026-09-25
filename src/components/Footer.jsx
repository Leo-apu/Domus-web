import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md text-white font-serif font-bold text-lg">
                D
              </div>
              <span className="font-serif-title font-bold text-2xl text-white tracking-tight">
                DOMUS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              Departamentos en alquiler temporario en pleno centro de San Salvador de Jujuy. Espacios modernos, equipados y confortables para que te sientas como en casa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-title text-base font-bold text-white mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#inicio" className="hover:text-rose-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-rose-400 transition-colors">
                  Galería de Fotos (8)
                </a>
              </li>
              <li>
                <a href="#espacios" className="hover:text-rose-400 transition-colors">
                  Recorrido por Ambientes
                </a>
              </li>
              <li>
                <a href="#comodidades" className="hover:text-rose-400 transition-colors">
                  Servicios Incluidos
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-rose-400 transition-colors">
                  Ubicación & Puntos Cercanos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-rose-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div>
            <h4 className="font-serif-title text-base font-bold text-white mb-4">
              Horario de Atención
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Lunes a Lunes</p>
                  <p>09:00 hs a 00:00 hs</p>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                Atención continua todos los días del año, incluyendo feriados y fines de semana largos.
              </p>
            </div>
          </div>

          {/* Direct Contact info */}
          <div>
            <h4 className="font-serif-title text-base font-bold text-white mb-4">
              Ubicación & Contacto
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Gral. San Martín 121, San Salvador de Jujuy, Jujuy, Argentina</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={APARTMENT_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  WhatsApp Directo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <p>© {currentYear} Domus Alquileres Temporarios. Todos los derechos reservados.</p>
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
