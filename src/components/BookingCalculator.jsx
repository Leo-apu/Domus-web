import { useState, useId, useEffect } from "react";
import {
  Calendar,
  Users,
  MessageCircle,
  Clock,
  Check,
  BadgePercent,
  Building,
  Loader2,
  CalendarX,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { APARTMENT_INFO, APARTMENTS } from "../data/apartmentData";
import {
  checkAvailability,
  submitBookingToGoogleSheets,
} from "../services/bookingService";
import { formatMoney, formatDateDisplay, buildWhatsAppUrl } from "../utils/formatters";
import { calculateStayPricing } from "../utils/pricing";

export default function BookingCalculator({
  apartments = APARTMENTS,
  onOpenBookingModal,
  selectedApartment,
  onSelectApartment,
}) {
  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();
  const apartmentSelectId = useId();

  const activeApartment = selectedApartment || apartments[0] || APARTMENTS[0];
  const maxCapacity = activeApartment.capacity || 4;

  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  const [checkIn, setCheckIn] = useState(getTodayString(1));
  const [checkOut, setCheckOut] = useState(getTodayString(4));
  const [guests, setGuests] = useState(Math.min(2, maxCapacity));

  const [availability, setAvailability] = useState({
    status: "idle", 
    conflictIn: null,
    conflictOut: null,
  });

  const [isSendingLead, setIsSendingLead] = useState(false);

  useEffect(() => {
    if (guests > maxCapacity) {
      setGuests(maxCapacity);
    }
  }, [maxCapacity, guests]);

  useEffect(() => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      setAvailability({ status: "idle", conflictIn: null, conflictOut: null });
      return;
    }

    setAvailability({ status: "checking", conflictIn: null, conflictOut: null });

    const timer = setTimeout(async () => {
      try {
        const result = await checkAvailability(checkIn, checkOut, activeApartment.id);
        if (result.available === true) {
          setAvailability({ status: "available", conflictIn: null, conflictOut: null });
        } else if (result.available === false) {
          setAvailability({
            status: "occupied",
            conflictIn: result.conflictIn || null,
            conflictOut: result.conflictOut || null,
          });
        } else {
          setAvailability({ status: "idle", conflictIn: null, conflictOut: null });
        }
      } catch (err) {
        console.error("Error verificando disponibilidad:", err);
        setAvailability({ status: "idle", conflictIn: null, conflictOut: null });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [checkIn, checkOut, activeApartment.id]);

  const {
    nights,
    pricePerNight,
    hasWeeklyDiscount,
    subtotal,
    discountAmount,
    totalPrice,
  } = calculateStayPricing(checkIn, checkOut, activeApartment.basePrice);

  const handleWhatsAppBooking = async () => {
    if (availability.status === "occupied") return;

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.65 },
      });
    } catch {

    }

    setIsSendingLead(true);
    submitBookingToGoogleSheets({
      name: "Cliente Web (Inició Seña)",
      phone: "Consulta WhatsApp Web",
      email: "whatsapp-directo@domus.com",
      checkIn: formatDateDisplay(checkIn),
      checkOut: formatDateDisplay(checkOut),
      guests,
      nights,
      departamento: activeApartment.name,
      apartmentId: activeApartment.id,
      notes: `Cotización en web: ${formatMoney(totalPrice)} (${nights} noches). Inició contacto de seña por WhatsApp.`,
      submittedAt: new Date().toISOString(),
    })
      .catch((err) => console.log("Nota: Registro silencioso:", err))
      .finally(() => setIsSendingLead(false));

    const discountText = hasWeeklyDiscount
      ? ` (con 10% de descuento semanal aplicado)`
      : "";

    const message = `¡Hola Domus Alquileres! 👋\nQuiero señar el departamento: *${activeApartment.name}* en Jujuy:\n\n📅 Fecha de Ingreso: ${formatDateDisplay(checkIn)}\n📅 Fecha de Salida: ${formatDateDisplay(checkOut)}\n🌙 Total Estadía: ${nights} ${nights === 1 ? "noche" : "noches"} · ${guests} ${guests === 1 ? "persona" : "personas"}\n💰 Total Calculado en la Web: *${formatMoney(totalPrice)}*${discountText}\n\n¿Me confirman disponibilidad y me pasan el Alias / CBU para transferir la seña? ¡Muchas gracias!`;

    const targetPhone = APARTMENT_INFO.whatsappNumber || "543886350824";
    const url = buildWhatsAppUrl(targetPhone, message);
    window.open(url, "_blank");
  };

  return (
    <section
      id="calculadora"
      className="py-20 sm:py-24 bg-stone-950 text-white relative overflow-hidden"
    >

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 mesh-gradient-dark opacity-35 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl shadow-rose-950/40 border border-white/20 overflow-hidden text-stone-800 reveal-init reveal-up">

          <div className="bg-linear-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-rose-300/90 font-medium mb-1.5 flex items-center justify-center sm:justify-start gap-2">
                <span className="w-4 h-px bg-rose-400/60" />
                <span>COTIZACIÓN INMEDIATA & DIRECTA</span>
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold">
                Cotizá tu Estadía en Vivo
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Elegí tus fechas para consultar disponibilidad con Google Sheets y conocer el monto final exacto.
              </p>
            </div>

            <div className="shrink-0 bg-stone-800/80 border border-stone-700 rounded-2xl px-4 py-2.5 text-center">
              <span className="text-[11px] text-stone-400 block uppercase font-semibold">
                Tarifa por Noche
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-400">
                {formatMoney(pricePerNight)}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">

            {apartments.length > 1 && (
              <div className="mb-8">
              <label
                htmlFor={apartmentSelectId}
                className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5"
              >
                <Building className="w-4 h-4 text-rose-500" />
                Seleccioná la Unidad
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {apartments.map((apt) => {
                  const isSelected = apt.id === activeApartment.id;
                  return (
                    <button
                      key={apt.id}
                      type="button"
                      onClick={() => onSelectApartment?.(apt.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-stone-900 border-stone-900 text-white shadow-md scale-[1.01]"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold leading-tight">
                          {apt.name}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${
                            isSelected ? "text-stone-300" : "text-stone-500"
                          }`}
                        >
                          {apt.type} · {apt.zone}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${
                            isSelected
                              ? "bg-rose-500 text-white"
                              : "bg-stone-200 text-stone-700"
                          }`}
                        >
                          {apt.capacity} pers.
                        </span>
                        <p
                          className={`text-[11px] mt-1 font-semibold ${
                            isSelected ? "text-amber-300" : "text-stone-600"
                          }`}
                        >
                          {formatMoney(apt.basePrice)} / noche
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              <div className="space-y-1.5">
                <label
                  htmlFor={checkInId}
                  className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider"
                >
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
                      setCheckOut(nextDay.toISOString().split("T")[0]);
                    }
                  }}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all cursor-pointer"
                />
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Check-in desde las{" "}
                  {APARTMENT_INFO.checkIn}
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={checkOutId}
                  className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider"
                >
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
                  <Clock className="w-3 h-3" /> Check-out hasta las{" "}
                  {APARTMENT_INFO.checkOut}
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={guestsId}
                  className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider"
                >
                  <Users className="w-4 h-4 text-rose-500" />
                  Cantidad de Huéspedes
                </label>
                <select
                  id={guestsId}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all cursor-pointer"
                >
                  {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
                    (num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Huésped" : "Huéspedes"}{" "}
                        {num === maxCapacity ? "(Capacidad Máxima)" : ""}
                      </option>
                    ),
                  )}
                </select>
                <span className="text-[11px] text-stone-400">
                  {activeApartment.bedrooms}{" "}
                  {activeApartment.bedrooms === 1 ? "ambiente" : "dormitorios"} y{" "}
                  {activeApartment.bathrooms}{" "}
                  {activeApartment.bathrooms === 1
                    ? "baño privado"
                    : "baños completos"}
                </span>
              </div>
            </div>

            <div className="mb-8">
              {availability.status === "checking" && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-center gap-3 animate-pulse">
                  <Loader2 className="w-5 h-5 text-amber-600 animate-spin shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    Consultando calendario en tiempo real con Google Sheets...
                  </span>
                </div>
              )}

              {availability.status === "occupied" && (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
                    <CalendarX className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>Fechas no disponibles para {activeApartment.shortName}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
                    Esta unidad ya tiene reserva confirmada{" "}
                    {availability.conflictIn && availability.conflictOut ? (
                      <strong>
                        entre el {availability.conflictIn} y el {availability.conflictOut}
                      </strong>
                    ) : (
                      "en esas fechas"
                    )}
                    . Por favor seleccioná otro rango en el calendario o probá cambiando de departamento arriba.
                  </p>
                </div>
              )}

              {availability.status !== "occupied" && availability.status !== "checking" && (
                <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-4">

                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/80">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-3" />
                      ¡Fechas Disponibles en el Calendario!
                    </span>

                    <span className="text-xs text-stone-500 font-medium">
                      Del{" "}
                      <strong className="text-stone-800">
                        {formatDateDisplay(checkIn)}
                      </strong>{" "}
                      al{" "}
                      <strong className="text-stone-800">
                        {formatDateDisplay(checkOut)}
                      </strong>
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                    <div className="flex items-center justify-between">
                      <span>
                        {formatMoney(pricePerNight)} x {nights}{" "}
                        {nights === 1 ? "noche" : "noches"} ({guests}{" "}
                        {guests === 1 ? "persona" : "personas"})
                      </span>
                      <span className="font-semibold text-stone-800">
                        {formatMoney(subtotal)}
                      </span>
                    </div>

                    {hasWeeklyDiscount && (
                      <div className="flex items-center justify-between text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1">
                          <BadgePercent className="w-4 h-4" /> Descuento semanal
                          (10% de ahorro)
                        </span>
                        <span>-{formatMoney(discountAmount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <p className="text-xs uppercase font-extrabold text-stone-500 tracking-wider">
                        Total Final de la Estadía
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        Incluye luz, gas, agua, ropa blanca y WiFi 300 Mbps · Sin comisiones de plataforma
                      </p>
                    </div>
                    <div className="text-left sm:text-right mt-1 sm:mt-0">
                      <span className="font-serif-title text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-700">
                        {formatMoney(totalPrice)}
                      </span>
                      <span className="text-xs text-stone-500 ml-1 font-semibold">
                        ARS
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {availability.status === "occupied" ? (
                <button
                  type="button"
                  disabled
                  className="w-full flex items-center justify-center gap-2.5 bg-stone-300 text-stone-500 font-bold py-4 px-6 rounded-2xl text-sm sm:text-base cursor-not-allowed"
                >
                  <CalendarX className="w-5 h-5 text-stone-400" />
                  <span>Fechas No Disponibles — Elegí otro rango arriba</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  disabled={isSendingLead}
                  className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-900/25 text-base sm:text-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                >
                  {isSendingLead ? (
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                  ) : (
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                  )}
                  <span>
                    {isSendingLead ? "Conectando con WhatsApp..." : `Señar por WhatsApp · ${formatMoney(totalPrice)}`}
                  </span>
                </button>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenBookingModal) {
                      onOpenBookingModal({
                        checkIn,
                        checkOut,
                        guests,
                        apartmentId: activeApartment.id,
                        apartmentName: activeApartment.name,
                      });
                    }
                  }}
                  className="text-xs sm:text-sm text-stone-500 hover:text-stone-800 transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>¿Preferís dejar una solicitud formal por escrito?</span>
                  <span className="text-rose-600 font-semibold underline underline-offset-2">
                    Cargar datos en el sistema
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 pt-16 sm:pt-20">
        <div className="h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}
