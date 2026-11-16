import { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { subscribeToTestimonials, saveTestimonials } from "../../services/apartmentService";
import { TESTIMONIALS } from "../../data/apartmentData";

export default function TestimonialsAdmin({ apartments = [] }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const unsub = subscribeToTestimonials((list) => {
      if (Array.isArray(list) && list.length > 0) {
        setTestimonials(
          list.map((t, idx) => ({
            id: t.id || `test-${idx + 1}-${Date.now()}`,
            name: t.name || "",
            origin: t.origin || "",
            rating: Number(t.rating) || 5,
            date: t.date || "",
            title: t.title || "",
            comment: t.comment || "",
            tag: t.tag || (apartments[0]?.name ? `${apartments[0]?.shortName || apartments[0]?.name}` : "Estadía Verificada"),
            active: t.active !== false,
          }))
        );
      } else {
        setTestimonials(TESTIMONIALS);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [apartments]);

  const handleAdd = () => {
    const defaultTag = apartments[0]?.shortName || apartments[0]?.name || "Estadía Verificada";
    const newTestimonial = {
      id: `test-${Date.now()}`,
      name: "Nuevo Huésped",
      origin: "Buenos Aires",
      rating: 5,
      date: "Reciente",
      title: "Excelente experiencia en Domus",
      comment: "La atención, la limpieza y la comodidad fueron impecables. Súper recomendable para descansar y conocer Jujuy.",
      tag: defaultTag,
      active: true,
    };
    setTestimonials([newTestimonial, ...testimonials]);
  };

  const handleUpdate = (idx, field, value) => {
    setTestimonials((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleMove = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= testimonials.length) return;
    setTestimonials((prev) => {
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;
      return updated;
    });
  };

  const handleDelete = (idx) => {
    if (confirm("¿Estás seguro de que deseas eliminar este testimonio?")) {
      setTestimonials((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await saveTestimonials(testimonials);
      setSuccessMsg("¡Testimonios guardados y publicados exitosamente en la web!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Error guardando testimonios:", err);
      setErrorMsg(err.message || "Error al guardar testimonios en Firestore.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin mr-3 text-rose-500" />
        <span className="text-sm font-mono">Cargando testimonios...</span>
      </div>
    );
  }

  const activeCount = testimonials.filter((t) => t.active !== false).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <MessageSquare className="w-4 h-4" />
            </span>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold">
              Testimonios y Reseñas ({testimonials.length})
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-light mt-1">
            Gestioná las valoraciones reales de tus huéspedes. Hay <strong className="text-amber-400">{activeCount} activas</strong> visibles en la web pública.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold py-2.5 px-4 rounded-xl border border-stone-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-rose-400" />
            <span>+ Agregar Reseña</span>
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

      {testimonials.length === 0 ? (
        <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 text-center space-y-3">
          <p className="text-sm text-stone-400">No hay testimonios cargados.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-bold hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear la primera reseña</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className={`p-5 rounded-3xl bg-stone-900 border transition-all ${
                t.active !== false
                  ? "border-white/10 hover:border-white/20"
                  : "border-stone-800/60 opacity-60 bg-stone-950/80"
              }`}
            >
              <div className="space-y-4">

                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-white/10 text-stone-300 px-2 py-0.5 rounded-md">
                      #{idx + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleUpdate(idx, "rating", star)}
                          className="p-0.5 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                          title={`${star} estrellas`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= (t.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "text-stone-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-amber-400 font-mono ml-1">
                      {t.rating || 5}.0
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdate(idx, "active", t.active === false)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                        t.active !== false
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-stone-800 text-stone-400 border-stone-700"
                      }`}
                      title={t.active !== false ? "Visible en la web (clic para ocultar)" : "Oculto (clic para mostrar)"}
                    >
                      {t.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{t.active !== false ? "Visible" : "Oculto"}</span>
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
                      disabled={idx === testimonials.length - 1}
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
                      title="Eliminar testimonio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                      Nombre del Huésped *
                    </label>
                    <input
                      type="text"
                      value={t.name || ""}
                      onChange={(e) => handleUpdate(idx, "name", e.target.value)}
                      placeholder="Ej: Sofía & Carlos"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                      Ciudad / Procedencia
                    </label>
                    <input
                      type="text"
                      value={t.origin || ""}
                      onChange={(e) => handleUpdate(idx, "origin", e.target.value)}
                      placeholder="Ej: Buenos Aires / Córdoba / Salta"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                      Fecha de Estadía
                    </label>
                    <input
                      type="text"
                      value={t.date || ""}
                      onChange={(e) => handleUpdate(idx, "date", e.target.value)}
                      placeholder="Ej: Enero 2026"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                      Título Destacado de la Reseña
                    </label>
                    <input
                      type="text"
                      value={t.title || ""}
                      onChange={(e) => handleUpdate(idx, "title", e.target.value)}
                      placeholder="Ej: ¡Excelente ubicación y súper limpio!"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                      Etiqueta / Departamento
                    </label>
                    <input
                      type="text"
                      value={t.tag || ""}
                      onChange={(e) => handleUpdate(idx, "tag", e.target.value)}
                      placeholder="Ej: Domus Gorriti (3 Ambientes)"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-amber-300 focus:border-rose-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                    Comentario Completo del Huésped
                  </label>
                  <textarea
                    rows={2}
                    value={t.comment || ""}
                    onChange={(e) => handleUpdate(idx, "comment", e.target.value)}
                    placeholder="Escribí lo que opinó el huésped..."
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
