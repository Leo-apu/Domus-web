import { useState, useEffect } from "react";
import {
  Building,
  Plus,
  Settings,
  Table,
  LogOut,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  RefreshCw,
  Phone,
  Clock,
  MapPin,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  subscribeToApartments,
  saveApartment,
  deleteApartment,
  seedInitialApartmentsIfEmpty,
  getSiteSettings,
  saveSiteSettings,
} from "../../services/apartmentService";
import ApartmentEditModal from "./ApartmentEditModal";

export default function AdminDashboard({ onBackToSite }) {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("apartments"); // 'apartments' | 'settings' | 'sheets'
  const [apartments, setApartments] = useState([]);
  const [loadingApartments, setLoadingApartments] = useState(true);
  const [editingApartment, setEditingApartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    whatsappNumber: "543886350824",
    whatsappPhone: "+54 9 388 635-0824",
    whatsappLink: "https://wa.link/49xxkp",
    address: "Av. Juana Manuela Gorriti 613, San Salvador de Jujuy",
    schedule: "Lunes a Lunes: 09:00 hs a 00:00 hs",
    googleSheetsWebhookUrl: "",
    instagramUrl: "https://instagram.com/domusalquileres",
    facebookUrl: "",
    tiktokUrl: "",
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Google Sheets Webhook Health Test
  const [webhookStatus, setWebhookStatus] = useState("idle"); // 'idle' | 'testing' | 'online' | 'offline'
  const [webhookLatency, setWebhookLatency] = useState(null);

  // 1. Escuchar departamentos en Firestore
  useEffect(() => {
    seedInitialApartmentsIfEmpty();

    const unsubscribe = subscribeToApartments(
      (list) => {
        setApartments(list);
        setLoadingApartments(false);
      },
      (err) => {
        console.error("Firestore apartments error:", err);
        setLoadingApartments(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Cargar configuración general
  useEffect(() => {
    async function loadSettings() {
      const data = await getSiteSettings();
      if (data) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
      setLoadingSettings(false);
    }
    loadSettings();
  }, []);

  // Probar webhook de Google Sheets en vivo
  const testWebhook = async () => {
    const url = settings.googleSheetsWebhookUrl || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
    if (!url) {
      setWebhookStatus("offline");
      return;
    }

    setWebhookStatus("testing");
    const startTime = performance.now();

    try {
      const res = await fetch(url, { method: "GET" });
      const endTime = performance.now();
      setWebhookLatency(Math.round(endTime - startTime));

      if (res.ok) {
        setWebhookStatus("online");
      } else {
        setWebhookStatus("offline");
      }
    } catch (e) {
      setWebhookStatus("offline");
    }
  };

  const handleOpenCreateModal = () => {
    setEditingApartment(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (apt) => {
    setEditingApartment(apt);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente "${name}"?`)) {
      try {
        await deleteApartment(id);
      } catch (err) {
        alert("Error al eliminar: " + err.message);
      }
    }
  };

  const handleSaveApartment = async (apartmentData) => {
    await saveApartment(apartmentData);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSavedSuccess(false);

    try {
      await saveSiteSettings(settings);
      setSettingsSavedSuccess(true);
      setTimeout(() => setSettingsSavedSuccess(false), 4000);
    } catch (err) {
      alert("Error al guardar ajustes: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col">
      {/* Top Navbar Admin */}
      <header className="border-b border-white/10 bg-stone-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h1 className="font-serif-title text-lg sm:text-xl font-bold tracking-tight">
              Domus Jujuy <span className="text-xs font-mono font-normal text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-md ml-1.5">ADMIN CMS</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline text-xs font-mono text-stone-400">
              {user?.email}
            </span>

            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/15 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Web</span>
            </button>

            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-white/5 overflow-x-auto">
          <button
            onClick={() => setActiveTab("apartments")}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "apartments"
                ? "border-rose-500 text-white"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Departamentos ({apartments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "settings"
                ? "border-rose-500 text-white"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Contacto & Redes</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("sheets");
              if (webhookStatus === "idle") testWebhook();
            }}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "sheets"
                ? "border-rose-500 text-white"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Google Sheets & Reservas</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* TAB 1: DEPARTAMENTOS */}
        {activeTab === "apartments" && (
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
                onClick={handleOpenCreateModal}
                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-rose-950/40 text-xs sm:text-sm transition-all hover:scale-102 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Departamento</span>
              </button>
            </div>

            {loadingApartments ? (
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
                  <div
                    key={apt.id}
                    className="bg-stone-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      {/* Cover Photo */}
                      <div className="relative aspect-16/9 bg-stone-950 overflow-hidden">
                        <img
                          src={apt.coverImage || "/images/landing-2.webp"}
                          alt={apt.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/15">
                            {apt.type}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                              apt.isActive !== false
                                ? "bg-emerald-500/90 text-white"
                                : "bg-stone-700 text-stone-300"
                            }`}
                          >
                            {apt.isActive !== false ? "ACTIVO EN WEB" : "PAUSADO / OCULTO"}
                          </span>
                        </div>

                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-bold text-amber-400">
                          ${(apt.basePrice || 0).toLocaleString("es-AR")} / noche
                        </div>
                      </div>

                      {/* Info Body */}
                      <div className="p-5 sm:p-6 space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold">
                              {apt.shortName}
                            </span>
                            <span className="text-[10px] font-mono text-stone-500">
                              ID: {apt.id}
                            </span>
                          </div>
                          <h3 className="font-serif-title text-xl font-bold text-white">
                            {apt.name}
                          </h3>
                          <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                            <span className="truncate">{apt.address}</span>
                          </p>
                        </div>

                        {/* Quick Specs */}
                        <div className="grid grid-cols-4 gap-2 py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-800 text-center text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-stone-500 block">Huéspedes</span>
                            <span className="font-bold text-stone-200">{apt.capacity}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 block">Dorm.</span>
                            <span className="font-bold text-stone-200">{apt.bedrooms}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 block">Baños</span>
                            <span className="font-bold text-stone-200">{apt.bathrooms}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 block">Sup.</span>
                            <span className="font-bold text-stone-200">{apt.surfaceM2}m²</span>
                          </div>
                        </div>

                        {/* Descripción de la Unidad */}
                        <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                            Descripción del Departamento:
                          </span>
                          <p className="text-xs text-stone-300 leading-relaxed">
                            {apt.description || "Sin descripción asignada aún."}
                          </p>
                        </div>

                        {/* Tira de Fotos de la Galería */}
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-stone-300 flex items-center gap-1.5 font-semibold">
                              <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                              <span>Fotos del Catálogo ({apt.gallery?.length || 0})</span>
                            </span>
                            <span className="text-[10px] text-stone-500">
                              {apt.gallery?.length > 0 ? "Deslizá para ver todas →" : ""}
                            </span>
                          </div>

                          {apt.gallery && apt.gallery.length > 0 ? (
                            <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-stone-800">
                              {apt.gallery.map((img, idx) => {
                                const isCover = img.src === apt.coverImage;
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

                    {/* Bottom Actions */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-2">
                      <span className="text-[11px] font-mono text-stone-400">
                        {apt.gallery?.length || 0} fotos • {apt.highlights?.length || 0} destacados
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(apt)}
                          className="inline-flex items-center gap-1.5 bg-linear-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer hover:scale-102"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Editar Fotos & Textos</span>
                        </button>

                        <button
                          onClick={() => handleDelete(apt.id, apt.name)}
                          className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-colors cursor-pointer"
                          title="Eliminar departamento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONFIGURACIÓN & CONTACTO */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="font-serif-title text-2xl font-bold">
                Contacto & Canales Directos
              </h2>
              <p className="text-xs text-stone-400 font-light mt-1">
                Ajustá el número de WhatsApp receptor de reservas, horarios de atención y datos visibles para los huéspedes.
              </p>
            </div>

            {settingsSavedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>¡Configuración guardada exitosamente en la nube!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-stone-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
                  Número de WhatsApp Receptor (solo números con código de país)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value.replace(/[^0-9]/g, "") })}
                    placeholder="543886350824"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
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
                  value={settings.whatsappPhone}
                  onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                  placeholder="+54 9 388 635-0824"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
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
                    value={settings.schedule}
                    onChange={(e) => setSettings({ ...settings, schedule: e.target.value })}
                    placeholder="Lunes a Lunes: 09:00 hs a 00:00 hs"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
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
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="Av. Juana Manuela Gorriti 613, San Salvador de Jujuy"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              
              {/* Redes Sociales & Enlaces Públicos */}
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
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/domusjujuy"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
                    Página de Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.facebookUrl || ""}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/domusalquileres"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
                    Cuenta de TikTok
                  </label>
                  <input
                    type="url"
                    value={settings.tiktokUrl || ""}
                    onChange={(e) => setSettings({ ...settings, tiktokUrl: e.target.value })}
                    placeholder="https://tiktok.com/@domusjujuy"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-rose-950/40 text-sm transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
                >
                  {savingSettings ? (
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
        )}

        {/* TAB 3: GOOGLE SHEETS & RESERVAS */}
        {activeTab === "sheets" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="font-serif-title text-2xl font-bold">
                Sincronización con Google Sheets
              </h2>
              <p className="text-xs text-stone-400 font-light mt-1">
                Verificá el estado del webhook de Google Sheets y abrí tu planilla de reservas directamente.
              </p>
            </div>

            {/* Health Test Card */}
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
                  onClick={testWebhook}
                  disabled={webhookStatus === "testing"}
                  className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${webhookStatus === "testing" ? "animate-spin" : ""}`} />
                  <span>Probar Conexión</span>
                </button>
              </div>

              {/* Botón directo a la planilla */}
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
                  href="https://docs.google.com/spreadsheets/d/1X5XQe6_hQeZc5s7s8s9/edit" // Fallback / placeholder o personalizable
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <span>Abrir Google Sheet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* URL Webhook field */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-mono uppercase text-stone-400">
                  URL del Webhook de Apps Script (/exec)
                </label>
                <input
                  type="text"
                  value={settings.googleSheetsWebhookUrl || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || ""}
                  onChange={(e) => setSettings({ ...settings, googleSheetsWebhookUrl: e.target.value })}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-300 focus:border-rose-500 focus:outline-none"
                />
                <p className="text-[11px] text-stone-500">
                  Esta es la URL que la web consulta para verificar disponibilidad por fechas y calcular precios.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Crear / Editar Departamento */}
      {isModalOpen && (
        <ApartmentEditModal
          apartment={editingApartment}
          onSave={handleSaveApartment}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
