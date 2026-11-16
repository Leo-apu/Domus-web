import { useState, useEffect } from "react";
import {
  Building,
  LogOut,
  MessageSquare,
  HelpCircle,
  Sliders,
  Table
} from "lucide-react";
import { auth, db } from "../../lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import ApartmentsAdmin from "./ApartmentsAdmin";
import TestimonialsAdmin from "./TestimonialsAdmin";
import FaqsAdmin from "./FaqsAdmin";
import SettingsAdmin from "./SettingsAdmin";
import GoogleSheetsAdmin from "./GoogleSheetsAdmin";
import ApartmentEditModal from "./ApartmentEditModal";

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("apartments");
  const [apartments, setApartments] = useState([]);
  const [loadingApartments, setLoadingApartments] = useState(true);
  const [editingApartment, setEditingApartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [settings, setSettings] = useState({
    whatsappNumber: "543886350824",
    whatsappPhone: "+54 9 388 635-0824",
    schedule: "Lunes a Lunes: 09:00 hs a 00:00 hs",
    address: "Av. Juana Manuela Gorriti 613, San Salvador de Jujuy",
    instagramUrl: "https://instagram.com/domusjujuy",
    facebookUrl: "https://facebook.com/domusalquileres",
    tiktokUrl: "https://tiktok.com/@domusjujuy",
    googleSheetsWebhookUrl: ""
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  const [webhookStatus, setWebhookStatus] = useState("idle");
  const [webhookLatency, setWebhookLatency] = useState(null);

  useEffect(() => {
    fetchApartments();
    fetchSettings();
  }, []);

  const fetchApartments = async () => {
    try {
      setLoadingApartments(true);
      const querySnapshot = await getDocs(collection(db, "apartments"));
      const list = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      list.sort((a, b) => (a.order || 0) - (b.order || 0));
      setApartments(list);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    } finally {
      setLoadingApartments(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const snap = await getDocs(collection(db, "settings"));
      if (!snap.empty) {
        snap.forEach((d) => {
          if (d.id === "general") {
            setSettings((prev) => ({ ...prev, ...d.data() }));
          }
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
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

  const handleSaveApartment = async (apartmentData) => {
    try {
      const id = apartmentData.id || `apt-${Date.now()}`;
      await setDoc(doc(db, "apartments", id), {
        ...apartmentData,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setIsModalOpen(false);
      await fetchApartments();
    } catch (error) {
      console.error("Error saving apartment:", error);
      alert("Error al guardar departamento: " + error.message);
    }
  };

  const handleDeleteApartment = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el departamento "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "apartments", id));
      await fetchApartments();
    } catch (error) {
      console.error("Error deleting apartment:", error);
      alert("Error al eliminar el departamento: " + error.message);
    }
  };

  const handleUpdateSetting = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSavedSuccess(false);

    try {
      await setDoc(doc(db, "settings", "general"), {
        ...settings,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSettingsSavedSuccess(true);
      setTimeout(() => setSettingsSavedSuccess(false), 4000);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error al guardar configuración: " + error.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const testWebhook = async () => {
    const url = settings.googleSheetsWebhookUrl || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
    if (!url) {
      alert("No hay URL de webhook configurada.");
      return;
    }

    setWebhookStatus("testing");
    setWebhookLatency(null);
    const start = performance.now();

    try {
      const res = await fetch(`${url}?action=healthCheck`, {
        method: "GET",
        headers: { "Content-Type": "text/plain" }
      });

      const elapsed = Math.round(performance.now() - start);
      setWebhookLatency(elapsed);

      if (res.ok) {
        setWebhookStatus("online");
      } else {
        setWebhookStatus("offline");
      }
    } catch (error) {
      console.warn("Webhook test error:", error);
      setWebhookStatus("offline");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col font-sans">
      <header className="bg-stone-900/90 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-md">
              D
            </div>
            <div>
              <span className="font-serif-title font-bold text-base sm:text-lg tracking-tight block">
                Domus Suites Jujuy
              </span>
              <span className="text-[10px] text-stone-400 font-mono block -mt-1">
                Panel de Administración CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-stone-400 hidden sm:inline-block">
              {auth?.currentUser?.email || "admin@domussuites.com"}
            </span>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-rose-500/20 text-stone-300 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 rounded-lg text-xs font-mono transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-none">
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
            onClick={() => setActiveTab("testimonials")}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "testimonials"
                ? "border-rose-500 text-white"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reseñas de Huéspedes</span>
          </button>

          <button
            onClick={() => setActiveTab("faqs")}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "faqs"
                ? "border-rose-500 text-white"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "settings"
                ? "border-rose-500 text-white"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Ajustes & Contacto</span>
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

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === "apartments" && (
          <ApartmentsAdmin
            apartments={apartments}
            loading={loadingApartments}
            onOpenCreate={handleOpenCreateModal}
            onOpenEdit={handleOpenEditModal}
            onDelete={handleDeleteApartment}
          />
        )}

        {activeTab === "testimonials" && (
          <TestimonialsAdmin apartments={apartments} />
        )}

        {activeTab === "faqs" && (
          <FaqsAdmin apartments={apartments} />
        )}

        {activeTab === "settings" && (
          <SettingsAdmin
            settings={settings}
            onChangeSetting={handleUpdateSetting}
            onSubmit={handleSaveSettings}
            saving={savingSettings}
            savedSuccess={settingsSavedSuccess}
          />
        )}

        {activeTab === "sheets" && (
          <GoogleSheetsAdmin
            webhookUrl={settings.googleSheetsWebhookUrl || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || ""}
            onChangeWebhookUrl={(url) => handleUpdateSetting("googleSheetsWebhookUrl", url)}
            webhookStatus={webhookStatus}
            webhookLatency={webhookLatency}
            onTestWebhook={testWebhook}
          />
        )}
      </main>

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
