import { Loader2, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";

export default function GoogleSheetsAdmin({
  webhookUrl,
  onChangeWebhookUrl,
  webhookStatus,
  webhookLatency,
  onTestWebhook
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="font-serif-title text-2xl font-bold">
          Sincronización con Google Sheets
        </h2>
        <p className="text-xs text-stone-400 font-light mt-1">
          Verificá el estado del webhook de Google Sheets y abrí tu planilla de reservas directamente.
        </p>
      </div>

      <div className="bg-stone-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
              ESTADO DEL WEBHOOK DE GOOGLE SHEETS
            </span>
            <div className="flex items-center gap-2.5">
              {webhookStatus === "testing" ? (
                <>
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                  <span className="font-bold text-amber-400">Verificando conexión...</span>
                </>
              ) : webhookStatus === "online" ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-emerald-400 text-lg">Online & Operativo</span>
                  {webhookLatency && (
                    <span className="text-xs font-mono text-stone-400 ml-1">
                      ({webhookLatency} ms)
                    </span>
                  )}
                </>
              ) : webhookStatus === "offline" ? (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  <span className="font-bold text-rose-500 text-lg">Sin Conexión o URL Inválida</span>
                </>
              ) : (
                <span className="text-stone-400 text-sm">No verificado</span>
              )}
            </div>
          </div>

          <button
            onClick={onTestWebhook}
            disabled={webhookStatus === "testing"}
            className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${webhookStatus === "testing" ? "animate-spin" : ""}`} />
            <span>Probar Conexión</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-emerald-300">
              Planilla de Reservas en Google Drive
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">
              Abrí tu Google Sheet en una pestaña nueva para cambiar estados a Confirmado o Señado.
            </p>
          </div>
          <a
            href="https://docs.google.com/spreadsheets/d/1X5XQe6_hQeZc5s7s8s9/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>Abrir Google Sheet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-2 pt-2">
          <label className="block text-xs font-mono uppercase text-stone-400">
            URL del Webhook de Apps Script (/exec)
          </label>
          <input
            type="text"
            value={webhookUrl || ""}
            onChange={(e) => onChangeWebhookUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/.../exec"
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
          <p className="text-[11px] text-stone-500">
            Esta es la URL que la web consulta para verificar disponibilidad por fechas y calcular precios.
          </p>
        </div>
      </div>
    </div>
  );
}
