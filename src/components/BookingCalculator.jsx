import { useState, useId } from 'react';
import {
  Calendar,
  Users,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
  BadgePercent,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { APARTMENT_INFO } from '../data/apartmentData';

export default function BookingCalculator({ onOpenBookingModal }) {
  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();

  // Helper to format date as YYYY-MM-DD for input
  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(getTodayString(1));
  const [checkOut, setCheckOut] = useState(getTodayString(4));
  const [guests, setGuests] = useState(2);

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // Format date to local Argentine format DD/MM/YYYY
  const formatDateLocal = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Build WhatsApp URL with prefilled text
  const handleWhatsAppBooking = () => {
    // Confetti effect
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    const message = `¡Hola Domus Alquileres! 👋\nMe gustaría consultar disponibilidad para alojarme en su departamento en San Salvador de Jujuy:\n\n📅 Fecha de Ingreso: ${formatDateLocal(checkIn)}\n📅 Fecha de Salida: ${formatDateLocal(checkOut)}\n🌙 Total: ${nights} ${nights === 1 ? 'noche' : 'noches'}\n👥 Cantidad de Huéspedes: ${guests} ${guests === 1 ? 'persona' : 'personas'}\n\n¿Tienen disponibilidad para esas fechas y cuál sería la tarifa? ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/5493880000000?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <section id="calculadora" className="py-20 bg-stone-50 bg-topo-pattern mesh-gradient-warm border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Reserva Directa Sin Comisiones de Plataformas
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold">
                Consultá Disponibilidad y Tarifas
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Elegí tus fechas y cantidad de personas para coordinar directamente con el anfitrión.
              </p>
            </div>

            <div className="shrink-0 bg-stone-800/80 border border-stone-700 rounded-2xl px-4 py-2 text-center">
              <span className="text-xs text-stone-400 block">Capacidad Máxima</span>
              <span className="text-base sm:text-lg font-bold text-amber-400">Hasta 4 Huéspedes</span>
            </div>
          </div>

          {/* Calculator Inputs Grid */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {/* Check-in */}
              <div className="space-y-1.5">
                <label htmlFor={checkInId} className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  Fecha de Llegada (Check-in)
                </label>
                <input
                  id={checkInId}
                  type="date"
                  min={getTodayString(0)}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (new Date(e.target.value) >= new Date(checkOut)) {
                      const nextDay = new Date(e.target.value);
                      nextDay.setDate(nextDay.getDate() + 1);
                      setCheckOut(nextDay.toISOString().split('T')[0]);
                    }
                  }}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all cursor-pointer"
                />
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Check-in desde las {APARTMENT_INFO.checkIn}
                </span>
              </div>

              {/* Check-out */}
              <div className="space-y-1.5">
                <label htmlFor={checkOutId} className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  Fecha de Salida (Check-out)
                </label>
                <input
                  id={checkOutId}
                  type="date"
                  min={checkIn || getTodayString(1)}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all cursor-pointer"
                />
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Check-out hasta las {APARTMENT_INFO.checkOut}
                </span>
              </div>

              {/* Guests Count */}
              <div className="space-y-1.5">
                <label htmlFor={guestsId} className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                  <Users className="w-4 h-4 text-rose-500" />
                  Cantidad de Huéspedes
                </label>
                <select
                  id={guestsId}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all cursor-pointer"
                >
                  <option value={1}>1 Huésped (Uso individual)</option>
                  <option value={2}>2 Huéspedes (Pareja o amigos)</option>
                  <option value={3}>3 Huéspedes</option>
                  <option value={4}>4 Huéspedes (Capacidad total)</option>
                </select>
                <span className="text-[11px] text-stone-400">
                  2 dormitorios y 2 baños en suite
                </span>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <p className="text-xs uppercase font-bold text-stone-400 tracking-wider">
                  Resumen de tu estadía
                </p>
                <p className="text-base sm:text-lg font-bold text-stone-800">
                  {nights} {nights === 1 ? 'noche' : 'noches'} · {guests} {guests === 1 ? 'huésped' : 'huéspedes'}
                </p>
                <p className="text-xs text-stone-500">
                  Del <span className="font-semibold text-stone-700">{formatDateLocal(checkIn)}</span> al{' '}
                  <span className="font-semibold text-stone-700">{formatDateLocal(checkOut)}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-stone-600">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  WiFi, Luz, Gas y Agua incluidos
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200">
                  <BadgePercent className="w-3.5 h-3.5 text-amber-600" />
                  Descuento por estadías semanales (+7 días)
                </span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (onOpenBookingModal) {
                    onOpenBookingModal({ checkIn, checkOut, guests });
                  }
                }}
                className="w-full sm:flex-1 flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-rose-900/20 text-sm sm:text-base transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Solicitar Reserva (Registrar en Planilla)</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl text-sm transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Directo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
