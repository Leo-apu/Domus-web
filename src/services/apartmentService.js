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
          const list = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          // Ordenamos por orden o por id
          list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          onUpdate(list);
        } else {
          // Si la base está vacía todavía, devolvemos el fallback por defecto
          onUpdate(APARTMENTS);
        }
      },
      (error) => {
        console.warn("⚠️ [Firestore fallback] Error leyendo Firestore, usando datos locales:", error.message);
        if (onError) onError(error);
        onUpdate(APARTMENTS);
      }
    );
  } catch (err) {
    console.warn("⚠️ [Firestore fallback] No se pudo inicializar listener:", err);
    onUpdate(APARTMENTS);
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
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return list;
    }
    return APARTMENTS;
  } catch (error) {
    console.warn("⚠️ Error obteniendo departamentos de Firestore, usando fallback local:", error);
    return APARTMENTS;
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

  const docRef = doc(db, APARTMENTS_COLLECTION, apartmentData.id);
  const payload = {
    ...apartmentData,
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
  return apartmentData.id;
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
        const apt = APARTMENTS[i];
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
