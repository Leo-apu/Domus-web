import { MapPin, Image as ImageIcon, Edit3, Trash2 } from "lucide-react";
import { formatMoney } from "../../utils/formatters";

export default function ApartmentCard({ apartment, onEdit, onDelete }) {
  return (
    <div className="bg-stone-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group">
      <div>
        <div className="relative aspect-16/9 bg-stone-950 overflow-hidden">
          <img
            src={apartment.coverImage || "/images/landing-2.webp"}
            alt={apartment.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/15">
              {apartment.type}
            </span>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                apartment.isActive !== false
                  ? "bg-emerald-500/90 text-white"
                  : "bg-stone-700 text-stone-300"
              }`}
            >
              {apartment.isActive !== false ? "ACTIVO EN WEB" : "PAUSADO / OCULTO"}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-bold text-amber-400">
            {formatMoney(apartment.basePrice)} / noche
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold">
                {apartment.shortName}
              </span>
              <span className="text-[10px] font-mono text-stone-500">
                ID: {apartment.id}
              </span>
            </div>
            <h3 className="font-serif-title text-xl font-bold text-white">
              {apartment.name}
            </h3>
            <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span className="truncate">{apartment.address}</span>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-800 text-center text-xs font-mono">
            <div>
              <span className="text-[10px] text-stone-500 block">Huéspedes</span>
              <span className="font-bold text-stone-200">{apartment.capacity}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Dorm.</span>
              <span className="font-bold text-stone-200">{apartment.bedrooms}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Baños</span>
              <span className="font-bold text-stone-200">{apartment.bathrooms}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Sup.</span>
              <span className="font-bold text-stone-200">{apartment.surfaceM2}m²</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Descripción del Departamento:
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              {apartment.description || "Sin descripción asignada aún."}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-300 flex items-center gap-1.5 font-semibold">
                <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                <span>Fotos del Catálogo ({apartment.gallery?.length || 0})</span>
              </span>
              <span className="text-[10px] text-stone-500">
                {apartment.gallery?.length > 0 ? "Deslizá para ver todas →" : ""}
              </span>
            </div>

            {apartment.gallery && apartment.gallery.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-stone-800">
                {apartment.gallery.map((img, idx) => {
                  const isCover = img.src === apartment.coverImage;
                  return (
                    <div
                      key={img.id || idx}
                      className={`relative shrink-0 w-24 h-18 rounded-xl overflow-hidden border group/thumb bg-stone-950 transition-transform hover:scale-105 ${
                        isCover ? "border-amber-400 ring-1 ring-amber-400" : "border-stone-800"
                      }`}
                      title={`${img.title || "Foto"} - ${img.description || ""}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt || img.title || "Foto"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isCover && (
                        <span className="absolute bottom-0 inset-x-0 bg-amber-400 text-stone-950 text-[8px] font-black tracking-wider text-center py-0.5">
                          PORTADA
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col justify-end p-1.5">
                        <span className="text-[9px] text-white font-bold leading-tight line-clamp-1">
                          {img.title || `Foto ${idx + 1}`}
                        </span>
                        <span className="text-[8px] text-stone-300 line-clamp-1">
                          {img.category || "general"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-stone-950 border border-dashed border-stone-800 text-center text-xs text-stone-500">
                No hay fotos cargadas en este departamento.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-2">
        <span className="text-[11px] font-mono text-stone-400">
          {apartment.gallery?.length || 0} fotos • {apartment.highlights?.length || 0} destacados
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(apartment)}
            className="inline-flex items-center gap-1.5 bg-linear-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer hover:scale-[1.02]"
          >
            <Edit3 className="w-3.5 h-3.5 text-rose-400" />
            <span>Editar Fotos & Textos</span>
          </button>

          <button
            onClick={() => onDelete(apartment.id, apartment.name)}
            className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-colors cursor-pointer"
            title="Eliminar departamento"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
