import { useState, useRef, useId } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { APARTMENT_INFO } from "../data/apartmentData";

export default function ContactForm() {
  const formRef = useRef(null);
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const { serviceId, templateId, publicKey } = APARTMENT_INFO.emailJsConfig;

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey,
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    } catch (err) {
      console.error("Error enviando email:", err);
      setStatus("error");
      setErrorMsg(
        "Hubo un inconveniente al enviar el mensaje. Por favor contactanos directamente por WhatsApp.",
      );
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 bg-stone-50 bg-topo-pattern mesh-gradient-warm border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 reveal-init reveal-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5" />
                Atención Directa
              </div>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Estamos para Ayudarte a Planificar tu Estadía
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                ¿Tenés consultas sobre disponibilidad, tarifas especiales para
                estadías prolongadas o traslados en Jujuy? Escribinos y te
                responderemos en breve.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    WhatsApp / Teléfono
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Respuesta inmediata
                  </p>
                  <a
                    href={APARTMENT_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 mt-1 inline-block"
                  >
                    Iniciar conversación por WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Horario de Atención
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    {APARTMENT_INFO.schedule}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Ubicación del Departamento
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    {APARTMENT_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-700 text-white shadow-lg flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-emerald-100 font-medium">
                  ¿Querés una respuesta más rápida?
                </p>
                <h4 className="text-base font-bold">
                  Escribinos por WhatsApp ahora
                </h4>
              </div>
              <a
                href={APARTMENT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-white text-emerald-700 hover:bg-emerald-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-transform hover:scale-105"
              >
                Abrir Chat
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-xl reveal-init reveal-right">
            <h3 className="font-serif-title text-2xl font-bold text-stone-900 mb-2">
              Envianos un Mensaje
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              Completá el formulario y te contactaremos por correo electrónico o
              WhatsApp.
            </p>

            {status === "success" ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in fade-in duration-300">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">
                  ¡Mensaje Enviado con Éxito!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 mt-2 max-w-md mx-auto">
                  Muchas gracias por tu consulta. Nos pondremos en contacto con
                  vos a la brevedad para coordinar tu estadía en Jujuy.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-5 text-xs font-semibold bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{errorMsg}</p>
                      <a
                        href={APARTMENT_INFO.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-bold mt-1 inline-block"
                      >
                        Click aquí para abrir WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor={nameId}
                      className="text-xs font-bold text-stone-700 uppercase tracking-wider"
                    >
                      Nombre y Apellido *
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      name="name"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-stone-200 text-stone-800 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor={emailId}
                      className="text-xs font-bold text-stone-700 uppercase tracking-wider"
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      name="email"
                      required
                      placeholder="Ej. juan@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-stone-200 text-stone-800 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor={phoneId}
                      className="text-xs font-bold text-stone-700 uppercase tracking-wider"
                    >
                      Teléfono / WhatsApp
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      name="phone"
                      placeholder="Ej. +54 9 388 123456"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-stone-200 text-stone-800 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor={subjectId}
                      className="text-xs font-bold text-stone-700 uppercase tracking-wider"
                    >
                      Asunto o Fechas Estimadas *
                    </label>
                    <input
                      id={subjectId}
                      type="text"
                      name="subject"
                      required
                      placeholder="Ej. Consulta estadía fin de semana largo"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white border border-stone-200 text-stone-800 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor={messageId}
                    className="text-xs font-bold text-stone-700 uppercase tracking-wider"
                  >
                    Mensaje o Consulta *
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    rows={4}
                    placeholder="Contanos cuántas personas viajan, fechas estimadas de llegada y salida o cualquier consulta que tengas..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-stone-200 text-stone-800 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-70 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-rose-900/20 text-base transition-all hover:scale-101 active:scale-99 cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando mensaje...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar Consulta Directa</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
