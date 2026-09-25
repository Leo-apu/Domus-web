import { CalendarCheck, MessageCircle, Star } from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

export default function MobileBookingBar() {
  return (
    <aside aria-label="Reserva rápida para móviles" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-1 text-xs font-bold text-stone-900">
          <span>Depto 3 Ambientes</span>
          <span className="text-amber-500 flex items-center text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 inline" /> 4.96
          </span>
        </div>
        <p className="text-[11px] text-stone-500 font-medium">Hasta 4 huéspedes · 2 baños</p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="#calculadora"
          className="inline-flex items-center gap-1.5 bg-stone-900 text-white text-xs font-semibold px-3 py-2.5 rounded-xl shadow-sm"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>Cotizar</span>
        </a>

        <a
          href={APARTMENT_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-md"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
