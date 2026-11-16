import { X, ShieldCheck, Lock, FileText, CheckCircle2, Phone } from "lucide-react";
import { APARTMENT_INFO } from "../data/apartmentData";

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-lg font-bold text-white">
                Políticas de Privacidad y Términos
              </h3>
              <p className="text-xs text-stone-400">
                Domus Alquileres Temporarios · Jujuy, Argentina
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-stone-700 text-sm leading-relaxed">

          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold mb-2">
              <Lock className="w-4 h-4" />
              <h4>1. Protección de Datos Personales (Ley N° 25.326)</h4>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm">
              En cumplimiento con la <strong>Ley de Protección de los Datos Personales N° 25.326 de la República Argentina</strong>, te informamos que los datos suministrados a través de nuestros formularios (nombre, teléfono, correo y fechas de viaje) son tratados con absoluta confidencialidad.
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-stone-600 list-disc list-inside">
              <li><strong>Finalidad exclusiva:</strong> Únicamente para coordinar tu reserva, responder tus consultas y confirmar disponibilidad.</li>
              <li><strong>No cesión a terceros:</strong> Jamás vendemos, compartimos ni cedemos tus datos a anunciantes ni bases de datos de terceros.</li>
              <li><strong>Derecho de supresión:</strong> Podés solicitar la rectificación o eliminación total de tus datos en cualquier momento comunicándote a nuestro WhatsApp oficial o correo.</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-amber-600 font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <h4>2. Política de Cookies</h4>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm">
              Este sitio web <strong>no utiliza cookies de rastreo publicitario invasivo</strong> ni comparte tu comportamiento de navegación con redes sociales o plataformas publicitarias externas. Solo se utilizan elementos técnicos locales necesarios para el óptimo funcionamiento y visualización de la página.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
              <FileText className="w-4 h-4" />
              <h4>3. Términos de Estadía y Reserva</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <span className="font-bold text-stone-800 shrink-0">• Check-In / Check-Out:</span>
                <span>Ingreso a partir de las {APARTMENT_INFO.checkIn} y salida hasta las {APARTMENT_INFO.checkOut}. Horarios especiales sujetos a disponibilidad previa.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-stone-800 shrink-0">• Convivencia y Descanso:</span>
                <span>Priorizamos la tranquilidad de nuestros huéspedes y vecinos. Están prohibidas las fiestas, eventos masivos y ruidos molestos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-stone-800 shrink-0">• Confirmación y Seña:</span>
                <span>La solicitud online no genera cobro automático inmediato. La reserva se confirma una vez acordada la seña directamente con el anfitrión.</span>
              </li>
            </ul>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-stone-800">¿Tenés dudas sobre el manejo de tus datos?</p>
              <p className="text-stone-500">Contactate de forma directa con el titular de Domus.</p>
            </div>
            <a
              href={APARTMENT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp de Soporte</span>
            </a>
          </div>
        </div>

        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer"
          >
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
