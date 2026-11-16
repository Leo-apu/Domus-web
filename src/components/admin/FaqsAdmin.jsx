import { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { subscribeToFaqs, saveFaqs } from "../../services/apartmentService";
import { generateFaqsWithGemini } from "../../services/geminiService";
import { FAQS } from "../../data/apartmentData";

export default function FaqsAdmin({ apartments = [] }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const unsub = subscribeToFaqs((list) => {
      if (Array.isArray(list) && list.length > 0) {
        setFaqs(
          list.map((f, idx) => ({
            id: f.id || `faq-${idx + 1}-${Date.now()}`,
            q: f.q || "",
            a: f.a || "",
            active: f.active !== false,
          }))
        );
      } else {
        setFaqs(FAQS);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = () => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      q: "¿Nueva pregunta frecuente?",
      a: "Escribí aquí la respuesta clara para los huéspedes...",
      active: true,
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleUpdate = (idx, field, value) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleMove = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= faqs.length) return;
    setFaqs((prev) => {
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;
      return updated;
    });
  };

  const handleDelete = (idx) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta pregunta frecuente?")) {
      setFaqs((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleGenerateWithAI = async () => {
    setIsGeneratingWithAI(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const suggested = await generateFaqsWithGemini(apartments);
      const formatted = suggested.map((f, idx) => ({
        id: `faq-ai-${Date.now()}-${idx}`,
        q: f.q,
        a: f.a,
        active: true,
      }));
      setFaqs((prev) => [...prev, ...formatted]);
      setSuccessMsg(`¡Gemini IA agregó ${formatted.length} preguntas frecuentes sugeridas! Recordá guardar los cambios.`);
    } catch (err) {
      console.error("Gemini FAQ error:", err);
      setErrorMsg(err.message || "No se pudieron generar las preguntas con IA.");
    } finally {
      setIsGeneratingWithAI(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await saveFaqs(faqs);
      setSuccessMsg("¡Preguntas frecuentes guardadas y publicadas exitosamente en la web!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Error guardando FAQs:", err);
      setErrorMsg(err.message || "Error al guardar preguntas en Firestore.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin mr-3 text-rose-500" />
        <span className="text-sm font-mono">Cargando preguntas frecuentes...</span>
      </div>
    );
  }

  const activeCount = faqs.filter((f) => f.active !== false).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold">
              Preguntas Frecuentes ({faqs.length})
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-light mt-1">
            Respuestas a las dudas habituales de los viajeros. Hay <strong className="text-rose-400">{activeCount} activas</strong> en la web.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isGeneratingWithAI}
            onClick={handleGenerateWithAI}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
            title="Generar preguntas frecuentes sugeridas con Gemini IA"
          >
            {isGeneratingWithAI ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Consultando IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Sugerir con Gemini IA</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold py-2.5 px-3.5 rounded-xl border border-stone-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-rose-400" />
            <span>+ Agregar</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-lg transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {faqs.length === 0 ? (
        <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 text-center space-y-3">
          <p className="text-sm text-stone-400">No hay preguntas frecuentes cargadas.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-bold hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear la primera pregunta</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              className={`p-4 sm:p-5 rounded-2xl bg-stone-900 border transition-all ${
                faq.active !== false
                  ? "border-white/10 hover:border-white/20"
                  : "border-stone-800/60 opacity-60 bg-stone-950/80"
              }`}
            >
              <div className="space-y-3">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[10px] font-mono font-bold bg-white/10 text-stone-400 px-2 py-0.5 rounded-md shrink-0">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={faq.q || ""}
                      onChange={(e) => handleUpdate(idx, "q", e.target.value)}
                      placeholder="¿Escribí la pregunta aquí?"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-semibold focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => handleUpdate(idx, "active", faq.active === false)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                        faq.active !== false
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-stone-800 text-stone-400 border-stone-700"
                      }`}
                      title={faq.active !== false ? "Visible en la web" : "Oculto"}
                    >
                      {faq.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{faq.active !== false ? "Visible" : "Oculto"}</span>
                    </button>

                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, -1)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-300 transition-colors cursor-pointer"
                      title="Subir posición"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === faqs.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-300 transition-colors cursor-pointer"
                      title="Bajar posición"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                      title="Eliminar pregunta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={faq.a || ""}
                    onChange={(e) => handleUpdate(idx, "a", e.target.value)}
                    placeholder="Escribí la respuesta detallada..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:border-rose-500 focus:outline-none resize-y leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
