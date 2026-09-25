import { useState, useEffect, useId, useCallback } from "react";
import {
  X,
  Calendar,
  Users,
  Phone,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Send,
  MessageCircle,
  CalendarCheck,
  CalendarX,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  submitBookingToGoogleSheets,
  checkAvailability,
} from "../services/bookingService";
import { APARTMENT_INFO } from "../data/apartmentData";

export default function BookingModal({
  isOpen,
  onClose,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 2,
}) {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const guestsId = useId();
  const notesId = useId();

  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests: initialGuests,
    notes: "",
  });

  const [status, setStatus] = useState("idle");
  const [responseInfo, setResponseInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [availability, setAvailability] = useState({ status: "idle" });
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStatus("idle");
        setResponseInfo(null);
        setErrorMessage("");
        setAvailability({ status: "idle" });
        setFormData({
          name: "",
          phone: "",
          email: "",
          checkIn: initialCheckIn || "",
          checkOut: initialCheckOut || "",
          guests: initialGuests || 2,
          notes: "",
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialCheckIn, initialCheckOut, initialGuests]);
  useEffect(() => {
    if (isOpen && status === "idle") {
      setFormData((prev) => ({
        ...prev,
        checkIn: initialCheckIn || prev.checkIn,
        checkOut: initialCheckOut || prev.checkOut,
        guests: initialGuests || prev.guests,
      }));
    }
  }, [isOpen, initialCheckIn, initialCheckOut, initialGuests]);

  useEffect(() => {
    const { checkIn, checkOut } = formData;
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      setAvailability({ status: "idle" });
      return;
    }

    setAvailability({ status: "checking" });

    const timer = setTimeout(async () => {
      const result = await checkAvailability(checkIn, checkOut);
      if (result.available === true) {
        setAvailability({ status: "available" });
      } else if (result.available === false) {
        setAvailability({
          status: "occupied",
          conflictIn: result.conflictIn || null,
          conflictOut: result.conflictOut || null,
        });
      } else {
        setAvailability({ status: "unknown" });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [formData.checkIn, formData.checkOut]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 1;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        nights,
        submittedAt: new Date().toISOString(),
      };

      const result = await submitBookingToGoogleSheets(payload);
      setResponseInfo(result);
      setStatus("success");

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        console.log("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "No pudimos registrar la solicitud en la planilla en este momento. Podés contactar directamente al anfitrión por WhatsApp.",
      );
    }
  };

  const handleDirectWhatsApp = () => {
    const msg = encodeURIComponent(
      `¡Hola Domus Alquileres! 👋\nSoy ${formData.name || "un viajero"}. Quería consultar si tienen disponibilidad para ingresar el ${formData.checkIn} y salir el ${formData.checkOut} (${nights} ${nights === 1 ? "noche" : "noches"} para ${formData.guests} personas). ¿Está disponible?`,
    );
    window.open(`https://wa.me/5493880000000?text=${msg}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-4 sm:p-6 relative border-b border-stone-800">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-1.5">
            <Sparkles className="w-3 h-3 text-rose-400" />
            Reserva Directa sin Intermediarios
          </div>

          <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-white tracking-tight">
            Solicitud de Reserva
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-sm sm:max-w-md leading-relaxed">
            Los datos se cargarán en nuestro sistema. El dueño verificará la
            disponibilidad y te responderá por WhatsApp.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {status === "success" ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div>
                <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900">
                  ¡Solicitud Registrada con Éxito!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  Guardamos tu solicitud para el{" "}
                  <span className="font-semibold text-stone-800">
                    {formData.checkIn}
                  </span>{" "}
                  al{" "}
                  <span className="font-semibold text-stone-800">
                    {formData.checkOut}
                  </span>{" "}
                  ({nights} {nights === 1 ? "noche" : "noches"}).
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mt-4 text-left text-xs text-amber-800 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    El anfitrión revisará el calendario para confirmar las
                    fechas y te escribirá a tu WhatsApp (
                    <strong className="text-amber-900">{formData.phone}</strong>
                    ).
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleDirectWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Hablar con el dueño ahora</span>
                </button>

                <button
                  onClick={onClose}
                  className="sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold py-3 px-5 rounded-xl transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {status === "error" && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="underline font-bold mt-1 inline-block cursor-pointer"
                    >
                      Enviar consulta directa por WhatsApp →
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-stone-50 rounded-xl p-2.5 sm:p-3 border border-stone-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 font-medium block text-[11px]">
                    Llegada
                  </span>
                  <input
                    type="date"
                    required
                    name="checkIn"
                    min={getTodayString(0)}
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="font-bold text-stone-800 bg-transparent focus:outline-none w-full cursor-pointer text-xs sm:text-sm mt-0.5"
                  />
                </div>
                <div className="border-l border-stone-200 pl-3">
                  <span className="text-stone-400 font-medium block text-[11px]">
                    Salida
                  </span>
                  <input
                    type="date"
                    required
                    name="checkOut"
                    min={formData.checkIn || getTodayString(1)}
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="font-bold text-stone-800 bg-transparent focus:outline-none w-full cursor-pointer text-xs sm:text-sm mt-0.5"
                  />
                </div>
              </div>

              {availability.status === "checking" && (
                <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-stone-400" />
                  Verificando disponibilidad...
                </div>
              )}
              {availability.status === "available" && (
                <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                  <CalendarCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ¡Fechas disponibles! Completá el formulario y enviá tu
                  solicitud.
                </div>
              )}
              {availability.status === "occupied" && (
                <div className="flex flex-col gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5">
                  <span className="flex items-center gap-2">
                    <CalendarX className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    Esas fechas no están disponibles.
                  </span>
                  {availability.conflictIn && availability.conflictOut ? (
                    <span className="pl-5 font-normal text-rose-600">
                      Ya hay una reserva confirmada del{" "}
                      <strong className="font-bold text-rose-800">
                        {availability.conflictIn}
                      </strong>{" "}
                      al{" "}
                      <strong className="font-bold text-rose-800">
                        {availability.conflictOut}
                      </strong>
                      . Elegí otras fechas o consultá por WhatsApp.
                    </span>
                  ) : (
                    <span className="pl-5 font-normal text-rose-600">
                      Ya existe una reserva en ese período. Elegí otras fechas o
                      consultá por WhatsApp.
                    </span>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor={guestsId}
                  className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1"
                >
                  Cantidad de Huéspedes
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    id={guestsId}
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 Huésped</option>
                    <option value={2}>
                      2 Huéspedes (1 Dormitorio o 2 camas)
                    </option>
                    <option value={3}>3 Huéspedes</option>
                    <option value={4}>4 Huéspedes (Capacidad total)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor={nameId}
                    className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1"
                  >
                    Tu Nombre *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id={nameId}
                      type="text"
                      required
                      name="name"
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={phoneId}
                    className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1"
                  >
                    WhatsApp / Celular *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id={phoneId}
                      type="tel"
                      required
                      name="phone"
                      placeholder="Ej. +54 9 388..."
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor={emailId}
                  className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1"
                >
                  Correo Electrónico (Opcional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    placeholder="Ej. juan@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={notesId}
                  className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1"
                >
                  Comentarios o Pedidos Especiales
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <textarea
                    id={notesId}
                    name="notes"
                    rows={2}
                    placeholder="Horario aproximado de llegada, motivo de viaje o alguna consulta..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={
                    status === "loading" ||
                    availability.status === "occupied" ||
                    availability.status === "checking"
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-rose-900/20 text-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando en sistema...</span>
                    </>
                  ) : availability.status === "checking" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verificando disponibilidad...</span>
                    </>
                  ) : availability.status === "occupied" ? (
                    <>
                      <CalendarX className="w-4 h-4" />
                      <span>Fechas no disponibles</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        Confirmar Solicitud ({nights}{" "}
                        {nights === 1 ? "noche" : "noches"})
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 text-center mt-2">
                  🔒 Sin cobro inmediato. El dueño revisará tu solicitud y te
                  contactará para coordinar la seña.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
