import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { APARTMENTS, APARTMENT_INFO } from "../data/apartmentData";

const APARTMENTS_COLLECTION = "apartments";
const SETTINGS_COLLECTION = "settings";
const GENERAL_SETTINGS_DOC = "general";

/**
 * Normaliza los datos de un departamento asegurando que fotos, portadas,
 * descripciones y listas estén 100% consistentes tanto para la web como para el Admin CMS.
 */
export function normalizeApartment(apt) {
  if (!apt) return null;

  // Unificamos la galería garantizando que existan tanto 'gallery' como 'galleryImages'
  const rawList = Array.isArray(apt.gallery) && apt.gallery.length > 0
    ? apt.gallery
    : Array.isArray(apt.galleryImages) && apt.galleryImages.length > 0
    ? apt.galleryImages
    : [];

  const normalizedGallery = rawList.map((img, idx) => ({
    id: img.id || `img-${Date.now().toString().slice(-4)}-${idx}`,
    src: img.src || "",
    alt: img.alt || img.title || `${apt.shortName || "Departamento"} - Foto`,
    title: img.title || `Ambiente ${idx + 1}`,
    category: img.category || "general",
    description: img.description || "",
    featured: Boolean(img.featured),
  }));

  const coverImage =
    apt.coverImage ||
    normalizedGallery.find((img) => img.featured)?.src ||
    normalizedGallery[0]?.src ||
    "/images/landing-2.webp";

  return {
    ...apt,
    coverImage,
    description: apt.description || "",
    gallery: normalizedGallery,
    galleryImages: normalizedGallery,
    nearbyPlaces: Array.isArray(apt.nearbyPlaces) ? apt.nearbyPlaces : [],
  };
}

/**
 * Escucha cambios en tiempo real en la colección de departamentos.
 * Si Firestore está vacío, usa el catálogo por defecto de apartmentData.js.
 */
export function subscribeToApartments(onUpdate, onError) {
  try {
    const colRef = collection(db, APARTMENTS_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map((d) =>
            normalizeApartment({
              id: d.id,
              ...d.data(),
            })
          );
          // Ordenamos por orden o por id
          list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          onUpdate(list);
        } else {
          // Si la base está vacía todavía, devolvemos el fallback por defecto normalizado
          onUpdate(APARTMENTS.map(normalizeApartment));
        }
      },
      (error) => {
        console.warn("⚠️ [Firestore fallback] Error leyendo Firestore, usando datos locales:", error.message);
        if (onError) onError(error);
        onUpdate(APARTMENTS.map(normalizeApartment));
      }
    );
  } catch (err) {
    console.warn("⚠️ [Firestore fallback] No se pudo inicializar listener:", err);
    onUpdate(APARTMENTS.map(normalizeApartment));
    return () => {};
  }
}

/**
 * Obtiene todos los departamentos una sola vez
 */
export async function getApartments() {
  try {
    const colRef = collection(db, APARTMENTS_COLLECTION);
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const list = snapshot.docs.map((d) =>
        normalizeApartment({ id: d.id, ...d.data() })
      );
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return list;
    }
    return APARTMENTS.map(normalizeApartment);
  } catch (error) {
    console.warn("⚠️ Error obteniendo departamentos de Firestore, usando fallback local:", error);
    return APARTMENTS.map(normalizeApartment);
  }
}

/**
 * Guarda o actualiza un departamento en Firestore
 */
export async function saveApartment(apartmentData) {
  if (!apartmentData.id) {
    // Generar un ID limpio basado en el nombre si es nuevo
    const cleanId = (apartmentData.shortName || apartmentData.name || "depto")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    apartmentData.id = `domus-${cleanId}-${Date.now().toString().slice(-4)}`;
  }

  const normalized = normalizeApartment(apartmentData);
  const docRef = doc(db, APARTMENTS_COLLECTION, normalized.id);
  const payload = {
    ...normalized,
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
  return normalized.id;
}

/**
 * Elimina un departamento de Firestore
 */
export async function deleteApartment(id) {
  if (!id) throw new Error("ID de departamento no especificado.");
  const docRef = doc(db, APARTMENTS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Si Firestore está vacío, carga los 2 departamentos iniciales existentes
 * para que el administrador los vea y pueda editarlos inmediatamente.
 */
export async function seedInitialApartmentsIfEmpty() {
  try {
    const colRef = collection(db, APARTMENTS_COLLECTION);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log("🌱 [Firestore Seed] Inicializando departamentos base en Firestore...");
      for (let i = 0; i < APARTMENTS.length; i++) {
        const apt = normalizeApartment(APARTMENTS[i]);
        const docRef = doc(db, APARTMENTS_COLLECTION, apt.id);
        await setDoc(docRef, {
          ...apt,
          order: i,
          isActive: true,
          createdAt: serverTimestamp(),
        });
      }
      console.log("✅ [Firestore Seed] Departamentos iniciales cargados con éxito.");
    }
  } catch (err) {
    console.warn("No se pudo sembrar la base de datos (posible falta de permisos de escritura anónima):", err);
  }
}

/**
 * Obtiene la configuración general del sitio (WhatsApp, redes, textos clave)
 */
export async function getSiteSettings() {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_SETTINGS_DOC);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return {
      whatsappNumber: APARTMENT_INFO.whatsappNumber,
      whatsappPhone: APARTMENT_INFO.whatsappPhone,
      whatsappLink: APARTMENT_INFO.whatsappLink,
      address: APARTMENT_INFO.address,
      schedule: APARTMENT_INFO.schedule,
      googleSheetsWebhookUrl: APARTMENT_INFO.googleSheetsWebhookUrl,
    };
  } catch (err) {
    console.warn("Error leyendo settings:", err);
    return null;
  }
}

/**
 * Guarda la configuración general del sitio
 */
export async function saveSiteSettings(settings) {
  const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_SETTINGS_DOC);
  await setDoc(
    docRef,
    {
      ...settings,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
