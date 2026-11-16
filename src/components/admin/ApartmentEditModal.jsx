import { useState, useRef } from "react";
import {
  X,
  Upload,
  Trash2,
  Star,
  Loader2,
  Check,
  AlertCircle,
  Plus,
  ArrowUp,
  ArrowDown,
  MapPin,
  Navigation,
  ExternalLink,
  Compass,
  Sparkles,
  Image as ImageIcon,
  Sliders,
  CheckCircle2,
  Wind,
  Utensils,
  Coffee,
  Lock,
  Car,
  Bed,
} from "lucide-react";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { generateNearbyPlacesWithGemini, generateAmenitiesWithGemini } from "../../services/geminiService";


const POPULAR_PRESET_AMENITIES = [
  { name: "WiFi Fibra Óptica 300MB", desc: "Conexión de ultra alta velocidad para streaming y trabajo", icon: "Wifi", category: "Servicios Esenciales" },
  { name: "Aire Acondicionado Frío/Calor", desc: "Climatización individual en todos los ambientes", icon: "Wind", category: "Confort y Habitabilidad" },
  { name: "Smart TV 43\" Full HD", desc: "Con Netflix, YouTube y aplicaciones de streaming", icon: "Tv", category: "Confort y Habitabilidad" },
  { name: "Sommier King Size", desc: "Colchón de resortes pocket de alta gama con sábanas de percal", icon: "Bed", category: "Confort y Habitabilidad" },
  { name: "Cocina Totalmente Equipada", desc: "Horno, anafes a gas, vajilla completa para 4 personas", icon: "Utensils", category: "Cocina y Gastronomía" },
  { name: "Heladera con Freezer", desc: "Capacidad familiar para estadías prolongadas", icon: "Refrigerator", category: "Cocina y Gastronomía" },
  { name: "Cafetera y Pava Eléctrica", desc: "Kit de bienvenida con infusiones de cortesía", icon: "Coffee", category: "Cocina y Gastronomía" },
  { name: "Cochera Cubierta Privada", desc: "Portón automático con control remoto incluido", icon: "Car", category: "Servicios Esenciales" },
  { name: "Check-in Autónomo 24hs", desc: "Cerradura digital con clave personalizada", icon: "Lock", category: "Servicios Esenciales" },
  { name: "Ropa Blanca y Toallas", desc: "Juego completo de toallas y toallones de puro algodón", icon: "Sparkles", category: "Servicios Esenciales" },
];

export default function ApartmentEditModal({ apartment, onSave, onClose }) {
  const isEditing = !!apartment?.id;
  const fileInputRef = useRef(null);

  // Normalizamos la lista de imágenes para que cada foto tenga id, src, title, category y description garantizados
  const rawList = Array.isArray(apartment?.gallery) && apartment.gallery.length > 0
    ? apartment.gallery
    : Array.isArray(apartment?.galleryImages) && apartment.galleryImages.length > 0
    ? apartment.galleryImages
    : [];

  const initialGallery = rawList.map((img, idx) => ({
    id: img.id || `img-${idx + 1}`,
    src: img.src || "",
    alt: img.alt || img.title || `${apartment?.shortName || "Departamento"} - Foto`,
    title: img.title || `Ambiente ${idx + 1}`,
    category: img.category || "general",
    description: img.description || "",
    featured: Boolean(img.featured),
  }));

  const [formData, setFormData] = useState({
    id: apartment?.id || "",
    name: apartment?.name || "",
    shortName: apartment?.shortName || "",
    type: apartment?.type || "Departamento",
    badge: apartment?.badge || "Disponible",
    capacity: apartment?.capacity || 2,
    bedrooms: apartment?.bedrooms || 1,
    bathrooms: apartment?.bathrooms || 1,
    surfaceM2: apartment?.surfaceM2 || 45,
    floor:
      apartment?.floor ||
      (apartment?.id === "domus-suite"
        ? "Planta cómoda y luminosa"
        : "Piso 4 - Al frente con balcón"),
    basePrice: apartment?.basePrice || 45000,
    address: apartment?.address || "San Salvador de Jujuy, Jujuy",
    zone: apartment?.zone || "Centro",
    googleMapsUrl: apartment?.googleMapsUrl || "",
    description: apartment?.description || "",
    coverImage: apartment?.coverImage || initialGallery[0]?.src || "/images/landing-2.webp",
    highlights: apartment?.highlights || [
      "Excelente ubicación",
      "WiFi de alta velocidad",
      "Totalmente equipado",
    ],
    gallery: initialGallery,
    nearbyPlaces: apartment?.nearbyPlaces || [],
    amenities: apartment?.amenities || [],
    isActive: apartment?.isActive !== false,
  });

  const [newHighlight, setNewHighlight] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingNearby, setIsGeneratingNearby] = useState(false);
  const [nearbySuccessMessage, setNearbySuccessMessage] = useState("");
  const [isGeneratingAmenities, setIsGeneratingAmenities] = useState(false);
  const [amenitiesSuccessMessage, setAmenitiesSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleAddHighlight = (e) => {
    e.preventDefault();
    if (!newHighlight.trim()) return;
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight.trim()],
    }));
    setNewHighlight("");
  };

  const handleRemoveHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  // Subida de múltiples fotos a Cloudinary
  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage("");

    try {
      const uploadedImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await uploadToCloudinary(file, "domus-alquiler", (p) => {
          const overall = Math.round(((i + p / 100) / files.length) * 100);
          setUploadProgress(overall);
        });

        const newImageObj = {
          id: `img-${Date.now()}-${i}`,
          src: res.url,
          alt: `${formData.shortName || "Departamento"} - Foto`,
          title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          category: "general",
          description: "Ambiente confortable, luminoso y totalmente equipado.",
          featured: i === 0 && !formData.coverImage,
        };

        uploadedImages.push(newImageObj);
      }

      setFormData((prev) => {
        const updatedGallery = [...(prev.gallery || []), ...uploadedImages];
        return {
          ...prev,
          gallery: updatedGallery,
          // Si no tenía foto de portada, asignamos la primera que subió
          coverImage: prev.coverImage || uploadedImages[0]?.src || "",
        };
      });
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "Error al subir una o más imágenes.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSetCover = (imgSrc) => {
    setFormData((prev) => ({ ...prev, coverImage: imgSrc }));
  };

  const handleUpdatePhoto = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.gallery];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, gallery: updated };
    });
  };

  const handleMovePhoto = (index, direction) => {
    setFormData((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.gallery.length) return prev;
      const updated = [...prev.gallery];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, gallery: updated };
    });
  };

  const handleDeleteImage = (index) => {
    setFormData((prev) => {
      const imgToDelete = prev.gallery[index];
      const newGallery = prev.gallery.filter((_, i) => i !== index);
      let newCover = prev.coverImage;
      if (imgToDelete?.src === prev.coverImage) {
        newCover = newGallery[0]?.src || "/images/landing-2.webp";
      }
      return {
        ...prev,
        gallery: newGallery,
        coverImage: newCover,
      };
    });
  };

  const handleOpenGoogleMapsSearch = () => {
    const query = formData.address
      ? `${formData.address}, San Salvador de Jujuy, Argentina`
      : formData.zone
      ? `${formData.zone}, San Salvador de Jujuy, Argentina`
      : "San Salvador de Jujuy, Jujuy, Argentina";

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  
  const handleGenerateAmenitiesWithAI = async () => {
    setIsGeneratingAmenities(true);
    setErrorMessage("");
    setAmenitiesSuccessMessage("");
    try {
      const generated = await generateAmenitiesWithGemini(
        formData.name || formData.shortName,
        formData.type,
        formData.bedrooms,
        formData.bathrooms
      );
      setFormData((prev) => ({
        ...prev,
        amenities: generated,
      }));
      setAmenitiesSuccessMessage(`¡Gemini generó ${generated.length} comodidades sugeridas para esta tipología!`);
      setTimeout(() => setAmenitiesSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Gemini amenities error:", err);
      setErrorMessage(err.message || "No se pudieron generar las comodidades con IA.");
    } finally {
      setIsGeneratingAmenities(false);
    }
  };

  const handleTogglePresetAmenity = (preset) => {
    setFormData((prev) => {
      const current = prev.amenities || [];
      const exists = current.some((a) => a.name.toLowerCase() === preset.name.toLowerCase());
      if (exists) {
        return {
          ...prev,
          amenities: current.filter((a) => a.name.toLowerCase() !== preset.name.toLowerCase()),
        };
      } else {
        return {
          ...prev,
          amenities: [...current, { ...preset }],
        };
      }
    });
  };

  const handleAddCustomAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [
        ...(prev.amenities || []),
        {
          name: "Nueva Comodidad",
          desc: "Descripción del servicio o equipamiento",
          icon: "CheckCircle2",
          category: "Servicios Esenciales",
        },
      ],
    }));
  };

  const handleUpdateAmenity = (idx, field, value) => {
    setFormData((prev) => {
      const updated = [...(prev.amenities || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, amenities: updated };
    });
  };

  const handleRemoveAmenity = (idx) => {
    setFormData((prev) => ({
      ...prev,
      amenities: (prev.amenities || []).filter((_, i) => i !== idx),
    }));
  };

  const handleGenerateNearbyWithAI = async () => {
    if (!formData.address && !formData.zone) {
      setErrorMessage("Ingresá primero la dirección o zona del departamento para generar los lugares cercanos con IA.");
      return;
    }

    setIsGeneratingNearby(true);
    setErrorMessage("");
    setNearbySuccessMessage("");

    try {
      const places = await generateNearbyPlacesWithGemini(formData.address, formData.zone);
      setFormData((prev) => ({
        ...prev,
        nearbyPlaces: places,
      }));
      setNearbySuccessMessage(`¡Se generaron ${places.length} puntos de interés estratégicos con Gemini! Podés editarlos a tu gusto.`);
      setTimeout(() => setNearbySuccessMessage(""), 6000);
    } catch (err) {
      console.error("Gemini Nearby error:", err);
      setErrorMessage(err.message || "No se pudieron generar los lugares cercanos con IA.");
    } finally {
      setIsGeneratingNearby(false);
    }
  };

  const handleUpdateNearbyPlace = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.nearbyPlaces];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, nearbyPlaces: updated };
    });
  };

  const handleRemoveNearbyPlace = (index) => {
    setFormData((prev) => ({
      ...prev,
      nearbyPlaces: prev.nearbyPlaces.filter((_, i) => i !== index),
    }));
  };

  const handleAddManualNearbyPlace = () => {
    setFormData((prev) => ({
      ...prev,
      nearbyPlaces: [
        ...prev.nearbyPlaces,
        {
          name: "Nuevo punto de interés",
          distance: "2 cuadras (200 m)",
          time: "3 minutos a pie",
          type: "Comercial & Gastronómico",
          desc: "Excelente opción de cercanía para los huéspedes.",
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.shortName.trim()) {
      setErrorMessage("El nombre y el nombre corto son obligatorios.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const autoEmbed =
        formData.mapEmbedUrl ||
        (formData.address
          ? `https://maps.google.com/maps?q=${encodeURIComponent(
              formData.address + ", San Salvador de Jujuy"
            )}&hl=es&z=17&output=embed`
          : "");

      const payload = {
        ...formData,
        mapEmbedUrl: autoEmbed || formData.mapEmbedUrl || "",
        gallery: formData.gallery,
        galleryImages: formData.gallery,
        nearbyPlaces: formData.nearbyPlaces || [],
        amenities: formData.amenities || [],
        coverImage: formData.coverImage || formData.gallery[0]?.src || "/images/landing-2.webp",
      };
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage(err.message || "Error al guardar el departamento.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-stone-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header Modal */}
        <div className="shrink-0 p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-stone-950 text-white">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-rose-400 block mb-1">
              {isEditing ? "EDITAR UNIDAD EXISTENTE" : "NUEVA UNIDAD"}
            </span>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold">
              {formData.name || "Nuevo Departamento"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-stone-200">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form id="apartment-form" onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Datos Principales */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-wider uppercase text-amber-400 font-bold border-b border-white/10 pb-2">
                1. Datos Principales & Tarifa
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Domus Gorriti - 3 Ambientes"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                    Nombre Corto / Botón *
                  </label>
                  <input
                    type="text"
                    required
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    placeholder="Ej: Domus Gorriti"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                    Tipo de Propiedad
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Ej: 3 Ambientes / Suite Boutique"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                    Tarifa por Noche ($ ARS) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="500"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleChange}
                    placeholder="48000"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-amber-400 font-bold focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Especificaciones & Capacidad */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-wider uppercase text-amber-400 font-bold border-b border-white/10 pb-2">
                2. Capacidad y Distribución
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                    Huéspedes Máx.
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                    Dormitorios
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                    Baños
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                    Superficie m²
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    name="surfaceM2"
                    value={formData.surfaceM2}
                    onChange={handleChange}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Piso / Nivel y Orientación del departamento */}
              <div className="pt-1">
                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1 flex items-center justify-between">
                  <span>Piso / Nivel & Vista en el Edificio</span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    Visible en la tarjeta de especificaciones (ej: "Piso 4 - Al frente con balcón")
                  </span>
                </label>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="Ej: Piso 4 - Al frente con balcón / Planta baja cómoda"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* 3. Ubicación & Dirección con Asistente de Google Maps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-xs font-mono tracking-wider uppercase text-amber-400 font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>3. Ubicación en San Salvador de Jujuy</span>
                </h3>

                <button
                  type="button"
                  onClick={handleOpenGoogleMapsSearch}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-mono transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Caja Asistente para ubicar en Maps */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      ¿No conocés la dirección exacta o querés ubicarlo en el mapa?
                    </span>
                    <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                      Tocá el botón para abrir Google Maps en Jujuy, buscá el edificio, hacé clic en <strong>Compartir</strong> &gt; <strong>Copiar enlace</strong> y pegalo abajo.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleOpenGoogleMapsSearch}
                      className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{formData.address ? "Buscar esta dirección en Maps" : "Ubicar en Google Maps"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    {formData.googleMapsUrl && (
                      <a
                        href={formData.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                        title="Ver enlace actual"
                      >
                        <span>Probar enlace</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono uppercase text-stone-400">
                      Dirección Exacta
                    </label>
                    {formData.address && (
                      <button
                        type="button"
                        onClick={handleOpenGoogleMapsSearch}
                        className="text-[10px] text-rose-400 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Ver en Maps</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Ej: Av. Gorriti 613, San Salvador de Jujuy"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                    Zona / Barrio
                  </label>
                  <input
                    type="text"
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    placeholder="Ej: Zona Centro - Frente al Parque Xibi Xibi"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono uppercase text-stone-400">
                      Enlace de Google Maps (URL compartida o enlace directo)
                    </label>
                    <span className="text-[10px] text-stone-500 font-mono">
                      Compartir &gt; Copiar enlace
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="url"
                      name="googleMapsUrl"
                      value={formData.googleMapsUrl}
                      onChange={handleChange}
                      placeholder="https://maps.app.goo.gl/... o https://maps.google.com/..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none pr-24"
                    />
                    {formData.googleMapsUrl && (
                      <a
                        href={formData.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-stone-800 hover:bg-stone-700 text-rose-300 font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <span>Abrir</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Este enlace alimenta el botón "¿Cómo llegar?" y los marcadores en la web para que los huéspedes naveguen con GPS.
                  </p>
                </div>

                {/* Puntos de Interés Cercanos */}
                <div className="sm:col-span-2 pt-3 border-t border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold flex items-center gap-2">
                        <Compass className="w-4 h-4 text-amber-400" />
                        <span>Lugares Cercanos & Conectividad ({formData.nearbyPlaces?.length || 0})</span>
                      </h4>
                      <p className="text-[11px] text-stone-400 font-light mt-0.5">
                        Aparecen a la izquierda del mapa en la web (distancias a pie, parques, comercios y rutas).
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleGenerateNearbyWithAI}
                        disabled={isGeneratingNearby}
                        className="inline-flex items-center gap-1.5 bg-linear-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                        title="Generar puntos estratégicos en base a la dirección con Gemini 3.5 Flash Lite"
                      >
                        {isGeneratingNearby ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Analizando con IA...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                            <span>✨ Autogenerar con Gemini IA</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleAddManualNearbyPlace}
                        className="inline-flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                        title="Agregar un punto manualmente"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>

                  {nearbySuccessMessage && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{nearbySuccessMessage}</span>
                    </div>
                  )}

                  {formData.nearbyPlaces?.length === 0 ? (
                    <div className="p-5 rounded-2xl bg-stone-950/60 border border-dashed border-stone-800 text-center space-y-2">
                      <p className="text-xs text-stone-400">
                        No hay lugares cercanos personalizados aún para este departamento.
                      </p>
                      <button
                        type="button"
                        onClick={handleGenerateNearbyWithAI}
                        disabled={isGeneratingNearby}
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono font-bold cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Hacé clic acá para autogenerarlos con Gemini en 1 segundo</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.nearbyPlaces.map((place, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5 relative group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                              Punto #{pIdx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveNearbyPlace(pIdx)}
                              className="text-stone-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                              title="Eliminar este lugar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                                Nombre del Lugar
                              </label>
                              <input
                                type="text"
                                value={place.name || ""}
                                onChange={(e) => handleUpdateNearbyPlace(pIdx, "name", e.target.value)}
                                placeholder="Ej: Parque Lineal Xibi Xibi"
                                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                                Categoría / Tipo
                              </label>
                              <input
                                type="text"
                                value={place.type || ""}
                                onChange={(e) => handleUpdateNearbyPlace(pIdx, "type", e.target.value)}
                                placeholder="Ej: Espacio Verde & Recreativo"
                                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                                Distancia
                              </label>
                              <input
                                type="text"
                                value={place.distance || ""}
                                onChange={(e) => handleUpdateNearbyPlace(pIdx, "distance", e.target.value)}
                                placeholder="Ej: 1 cuadra (100 m)"
                                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                                Tiempo Estimado
                              </label>
                              <input
                                type="text"
                                value={place.time || ""}
                                onChange={(e) => handleUpdateNearbyPlace(pIdx, "time", e.target.value)}
                                placeholder="Ej: 2 minutos a pie"
                                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                                Descripción para el Huésped
                              </label>
                              <input
                                type="text"
                                value={place.desc || ""}
                                onChange={(e) => handleUpdateNearbyPlace(pIdx, "desc", e.target.value)}
                                placeholder="Ej: Paseo urbano con ciclovías, senderos peatonales y áreas de ejercicio junto al río."
                                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:border-rose-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Descripción del Departamento */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-wider uppercase text-amber-400 font-bold border-b border-white/10 pb-2">
                4. Descripción General y Puntos Clave
              </h3>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono uppercase text-stone-400">
                    Descripción del Departamento *
                  </label>
                  <span className="text-[11px] font-mono text-stone-500">
                    {formData.description?.length || 0} caracteres
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describí los ambientes, luminosidad, distribución, equipamiento y por qué es ideal para los huéspedes..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3.5 text-sm text-white focus:border-rose-500 focus:outline-none resize-y leading-relaxed"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Esta descripción se muestra a los viajeros en el selector de departamentos, en la ficha de reserva y en los resúmenes.
                </p>
              </div>

              {/* Highlights lista */}
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">
                  Puntos Destacados (Comodidades principales)
                </label>
                <div className="space-y-2 mb-2">
                  {formData.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 bg-stone-950 border border-stone-800 px-3.5 py-2 rounded-xl text-xs"
                    >
                      <span>• {h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        className="text-stone-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                        title="Eliminar punto destacado"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Agregar punto destacado (ej: Cochera opcional, WiFi 300MB)..."
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddHighlight(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Gestor de Fotos y Descripciones Individuales */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-xs font-mono tracking-wider uppercase text-amber-400 font-bold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-400" />
                  <span>5. Galería de Fotos y Descripciones de Ambientes</span>
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  {formData.gallery.length} fotos cargadas
                </span>
              </div>

              {/* Dropzone / Botón de subida desde celular o PC */}
              <div className="border-2 border-dashed border-stone-700 hover:border-rose-500 rounded-2xl p-6 text-center transition-colors bg-stone-950/60">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFilesSelected}
                  className="hidden"
                  id="cloudinary-files"
                />

                {isUploading ? (
                  <div className="py-4 space-y-3">
                    <Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
                    <p className="text-xs font-bold text-white">
                      Subiendo y optimizando fotos ({uploadProgress}%)...
                    </p>
                    <div className="w-48 h-2 bg-stone-800 rounded-full mx-auto overflow-hidden">
                      <div
                        className="h-full bg-rose-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="cloudinary-files"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-rose-400">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Tocá para subir fotos nuevas desde celular o PC
                    </span>
                    <span className="text-[11px] text-stone-400 font-light">
                      Formatos JPG, PNG o WebP. Se optimizan automáticamente en Cloudinary.
                    </span>
                  </label>
                )}
              </div>

              {/* Lista editable de cada foto con título, categoría y descripción */}
              {formData.gallery.length === 0 ? (
                <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center text-xs text-stone-400">
                  No hay fotos cargadas aún en este departamento.
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  {formData.gallery.map((img, idx) => {
                    const isCover = img.src === formData.coverImage;
                    return (
                      <div
                        key={img.id || idx}
                        className={`p-4 rounded-2xl bg-stone-950 border transition-all ${
                          isCover
                            ? "border-amber-400/80 shadow-lg shadow-amber-950/20 ring-1 ring-amber-400/40"
                            : "border-stone-800 hover:border-stone-700"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          {/* Columna Izquierda: Thumbnail y acciones rápidas */}
                          <div className="shrink-0 w-full sm:w-44 space-y-2">
                            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                              <img
                                src={img.src}
                                alt={img.alt || img.title || "Foto"}
                                className="w-full h-full object-cover"
                              />
                              {isCover && (
                                <span className="absolute top-2 left-2 bg-amber-400 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                                  ★ PORTADA
                                </span>
                              )}
                              <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-stone-300 text-[10px] font-mono px-1.5 py-0.5 rounded">
                                #{idx + 1}
                              </span>
                            </div>

                            {/* Acciones de la foto */}
                            <div className="flex items-center gap-1.5 justify-between">
                              {!isCover ? (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(img.src)}
                                  className="flex-1 inline-flex items-center justify-center gap-1 bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-[10px] font-bold py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
                                  title="Definir como foto de portada"
                                >
                                  <Star className="w-3 h-3" />
                                  <span>Hacer Portada</span>
                                </button>
                              ) : (
                                <span className="flex-1 text-[10px] font-mono text-amber-400 font-semibold text-center py-1.5">
                                  Foto Principal
                                </span>
                              )}

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMovePhoto(idx, -1)}
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800 text-stone-300 transition-colors cursor-pointer"
                                  title="Subir de posición"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === formData.gallery.length - 1}
                                  onClick={() => handleMovePhoto(idx, 1)}
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800 text-stone-300 transition-colors cursor-pointer"
                                  title="Bajar de posición"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteImage(idx)}
                                  className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                                  title="Eliminar foto de la galería"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Columna Derecha: Título, Categoría y Descripción del ambiente */}
                          <div className="flex-1 w-full space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                                  Título del Ambiente / Foto
                                </label>
                                <input
                                  type="text"
                                  value={img.title || ""}
                                  onChange={(e) => handleUpdatePhoto(idx, "title", e.target.value)}
                                  placeholder="Ej: Living y Comedor Principal"
                                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                                  Categoría para Filtro Web
                                </label>
                                <select
                                  value={img.category || "general"}
                                  onChange={(e) => handleUpdatePhoto(idx, "category", e.target.value)}
                                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:border-rose-500 focus:outline-none cursor-pointer"
                                >
                                  <option value="living">Living y Espacios Sociales</option>
                                  <option value="dormitorios">Dormitorios</option>
                                  <option value="cocina">Cocina & Comedor</option>
                                  <option value="baños">Baños</option>
                                  <option value="exterior">Balcón / Vistas / Exterior</option>
                                  <option value="general">General / Servicios</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1 flex items-center justify-between">
                                <span>Descripción de la Foto / Ambiente</span>
                                <span className="text-[10px] text-stone-500 font-normal">
                                  Visible en la galería y lightbox para los visitantes
                                </span>
                              </label>
                              <textarea
                                rows={2}
                                value={img.description || ""}
                                onChange={(e) => handleUpdatePhoto(idx, "description", e.target.value)}
                                placeholder="Ej: Espacio amplio y luminoso con mesa para 4 personas, Smart TV y ventanal al exterior..."
                                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:border-rose-500 focus:outline-none resize-y leading-relaxed"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            
            {/* 6. Comodidades y Equipamiento de la Unidad */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-xs font-mono tracking-wider uppercase text-amber-400 font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>6. Comodidades y Equipamiento de la Unidad</span>
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Servicios y equipamiento específicos que se exhiben en la landing pública para este departamento.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isGeneratingAmenities}
                    onClick={handleGenerateAmenitiesWithAI}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md hover:shadow-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
                    title="Generar comodidades ideales según dormitorios, baños y tipo con Gemini IA"
                  >
                    {isGeneratingAmenities ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Consultando Gemini...</span>
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
                    onClick={handleAddCustomAmenity}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Agregar</span>
                  </button>
                </div>
              </div>

              {amenitiesSuccessMessage && (
                <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{amenitiesSuccessMessage}</span>
                </div>
              )}

              {/* Botones de selección rápida (Chips) */}
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2.5">
                <span className="block text-[11px] font-mono uppercase text-stone-400 font-semibold">
                  Selección rápida (tocá para activar o desactivar):
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_PRESET_AMENITIES.map((preset, idx) => {
                    const isSelected = (formData.amenities || []).some(
                      (a) => a.name.toLowerCase() === preset.name.toLowerCase()
                    );
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleTogglePresetAmenity(preset)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-xs"
                            : "bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200"
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3 text-rose-400" /> : <Plus className="w-3 h-3 text-stone-500" />}
                        <span>{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lista editable de comodidades activas */}
              {(formData.amenities || []).length === 0 ? (
                <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center text-xs text-stone-400">
                  Esta unidad no tiene comodidades personalizadas. Utilizará las comodidades por defecto del sitio. Tocá "Sugerir con Gemini IA" o los botones rápidos para personalizarla.
                </div>
              ) : (
                <div className="space-y-3">
                  {(formData.amenities || []).map((amenity, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-stone-700 transition-all flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 flex-1 w-full">
                        {/* Categoría */}
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-mono uppercase text-stone-500 mb-0.5">Categoría</label>
                          <select
                            value={amenity.category || "Servicios Esenciales"}
                            onChange={(e) => handleUpdateAmenity(idx, "category", e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:border-rose-500 focus:outline-none cursor-pointer"
                          >
                            <option value="Servicios Esenciales">Servicios Esenciales</option>
                            <option value="Confort y Habitabilidad">Confort y Habitabilidad</option>
                            <option value="Cocina y Gastronomía">Cocina y Gastronomía</option>
                            <option value="Seguridad y Accesos">Seguridad y Accesos</option>
                            <option value="Servicios Generales">Servicios Generales</option>
                          </select>
                        </div>

                        {/* Nombre */}
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-mono uppercase text-stone-500 mb-0.5">Nombre del Servicio</label>
                          <input
                            type="text"
                            value={amenity.name || ""}
                            onChange={(e) => handleUpdateAmenity(idx, "name", e.target.value)}
                            placeholder="Ej: WiFi Fibra Óptica 300MB"
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none font-medium"
                          />
                        </div>

                        {/* Icono */}
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-mono uppercase text-stone-500 mb-0.5">Icono</label>
                          <select
                            value={amenity.icon || "CheckCircle2"}
                            onChange={(e) => handleUpdateAmenity(idx, "icon", e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2 py-1.5 text-xs text-stone-300 focus:border-rose-500 focus:outline-none cursor-pointer font-mono"
                          >
                            <option value="Wifi">Wifi</option>
                            <option value="Tv">Tv</option>
                            <option value="Wind">Aire / Wind</option>
                            <option value="Bed">Cama / Bed</option>
                            <option value="Bath">Baño / Bath</option>
                            <option value="Utensils">Cocina</option>
                            <option value="Refrigerator">Heladera</option>
                            <option value="Coffee">Cafetera</option>
                            <option value="Zap">Luz / Zap</option>
                            <option value="Droplets">Agua</option>
                            <option value="Car">Cochera</option>
                            <option value="Lock">Cerradura</option>
                            <option value="Sparkles">Limpieza</option>
                            <option value="ShieldCheck">Seguridad</option>
                            <option value="CheckCircle2">Tilde</option>
                          </select>
                        </div>

                        {/* Descripción */}
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-mono uppercase text-stone-500 mb-0.5">Detalle breve</label>
                          <input
                            type="text"
                            value={amenity.desc || ""}
                            onChange={(e) => handleUpdateAmenity(idx, "desc", e.target.value)}
                            placeholder="Ej: Alta velocidad en toda la casa"
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:border-rose-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(idx)}
                        className="shrink-0 p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer sm:self-end mb-0.5"
                        title="Eliminar comodidad"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 7. Estado de la Unidad */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-rose-600 rounded bg-stone-950 border-stone-800 focus:ring-rose-500"
                />
                <span className="text-xs font-semibold text-white">
                  Departamento Activo (visible en la web)
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 p-4 sm:p-6 border-t border-white/10 flex items-center justify-end gap-3 bg-stone-950">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="apartment-form"
            disabled={isSaving || isUploading}
            className="inline-flex items-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando cambios...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Guardar Departamento" : "Crear Departamento"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
