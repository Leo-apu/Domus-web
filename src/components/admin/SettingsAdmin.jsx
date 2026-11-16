import { CheckCircle2, Phone, Clock, MapPin, ExternalLink, Loader2, Save } from "lucide-react";

export default function SettingsAdmin({
  settings,
  onChangeSetting,
  onSubmit,
  saving,
  savedSuccess
}) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="font-serif-title text-2xl font-bold">
          Contacto & Canales Directos
        </h2>
        <p className="text-xs text-stone-400 font-light mt-1">
          Ajustá el número de WhatsApp receptor de reservas, horarios de atención y datos visibles para los huéspedes.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡Configuración guardada exitosamente en la nube!</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-stone-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
            Número de WhatsApp Receptor (solo números con código de país)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={settings.whatsappNumber || ""}
              onChange={(e) => onChangeSetting("whatsappNumber", e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="543886350824"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
          <span className="text-[10px] text-stone-500 mt-1 block">
            A este número se enviarán las solicitudes cuando los clientes toquen "Reservar estas fechas por WhatsApp".
          </span>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
            Número Visible en Pantalla
          </label>
          <input
            type="text"
            value={settings.whatsappPhone || ""}
            onChange={(e) => onChangeSetting("whatsappPhone", e.target.value)}
            placeholder="+54 9 388 635-0824"
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
            Horario de Atención
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={settings.schedule || ""}
              onChange={(e) => onChangeSetting("schedule", e.target.value)}
              placeholder="Lunes a Lunes: 09:00 hs a 00:00 hs"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase text-stone-400">
              Dirección Principal de Contacto
            </label>
            {settings.address && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address + ", San Salvador de Jujuy, Argentina")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-rose-400 hover:text-rose-300 font-mono inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ver en Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="relative">
            <MapPin className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => onChangeSetting("address", e.target.value)}
              placeholder="Av. Juana Manuela Gorriti 613, San Salvador de Jujuy"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Redes Sociales & Enlaces Públicos
          </h3>
          <p className="text-[11px] text-stone-400">
            Los enlaces configurados aquí se mostrarán automáticamente en el pie de página (footer) de la web.
          </p>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
              Perfil de Instagram
            </label>
            <input
              type="url"
              value={settings.instagramUrl || ""}
              onChange={(e) => onChangeSetting("instagramUrl", e.target.value)}
              placeholder="https://instagram.com/domusjujuy"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
              Página de Facebook
            </label>
            <input
              type="url"
              value={settings.facebookUrl || ""}
              onChange={(e) => onChangeSetting("facebookUrl", e.target.value)}
              placeholder="https://facebook.com/domusalquileres"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
              Cuenta de TikTok
            </label>
            <input
              type="url"
              value={settings.tiktokUrl || ""}
              onChange={(e) => onChangeSetting("tiktokUrl", e.target.value)}
              placeholder="https://tiktok.com/@domusjujuy"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-rose-950/40 text-sm transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando ajustes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Configuración</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
