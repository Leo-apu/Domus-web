import { Plus, Loader2, Building } from "lucide-react";
import ApartmentCard from "./ApartmentCard";

export default function ApartmentsAdmin({
  apartments,
  loading,
  onOpenCreate,
  onOpenEdit,
  onDelete
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-title text-2xl font-bold">
            Catálogo de Departamentos
          </h2>
          <p className="text-xs text-stone-400 font-light mt-1">
            Gestioná los alojamientos cargados en la web, editá sus fotos, tarifas por noche y comodidades.
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-rose-950/40 text-xs sm:text-sm transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Departamento</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 space-y-3">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
          <p className="text-xs font-mono text-stone-400">Cargando departamentos...</p>
        </div>
      ) : apartments.length === 0 ? (
        <div className="text-center py-16 bg-stone-900/50 rounded-3xl border border-white/10 p-8 space-y-4">
          <Building className="w-12 h-12 text-stone-600 mx-auto" />
          <h3 className="text-lg font-bold">No hay departamentos cargados</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Agregá tu primer departamento haciendo clic en el botón de arriba.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apartments.map((apt) => (
            <ApartmentCard
              key={apt.id}
              apartment={apt}
              onEdit={onOpenEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
