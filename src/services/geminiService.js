/**
 * Servicio de Inteligencia Artificial con Google Gemini API
 * Modelo: gemini-3.5-flash-lite (Rápido, preciso y gratuito en Google AI Studio)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-3.5-flash-lite";

/**
 * Genera puntos de interés estratégicos y reales cercanos a una dirección en Jujuy
 * @param {string} address - Dirección del departamento (ej: "Av. Juana Manuela Gorriti 613")
 * @param {string} zone - Zona o barrio opcional (ej: "Centro")
 * @returns {Promise<Array<{name: string, distance: string, time: string, type: string, desc: string}>>}
 */
export async function generateNearbyPlacesWithGemini(address, zone = "") {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "No se encontró la clave VITE_GEMINI_API_KEY en las variables de entorno."
    );
  }

  const locationContext = [address, zone, "San Salvador de Jujuy, Jujuy, Argentina"]
    .filter(Boolean)
    .join(", ");

  const prompt = `Actúa como anfitrión experto y guía turístico de San Salvador de Jujuy, Argentina.
Para un departamento de alquiler temporario ubicado en: "${locationContext}", identifica entre 4 y 5 puntos de interés cercanos REALES, convenientes y estratégicos para los turistas o viajeros de trabajo (por ejemplo: parques lineales, plazas principales, peatonales comerciales, centros de salud, gastronomía o salidas a Ruta 9 hacia la Quebrada).

Debes responder ÚNICAMENTE con un arreglo JSON válido, sin formato markdown extra, siguiendo exactamente esta estructura:
[
  {
    "name": "Nombre conciso del lugar (ej: Parque Lineal Xibi Xibi)",
    "distance": "Distancia estimada (ej: 2 cuadras / 200 m o 15 cuadras)",
    "time": "Tiempo estimado (ej: 3 minutos a pie o 5 min en vehículo)",
    "type": "Categoría (ej: Espacio Verde & Recreativo, Centro Cívico & Cultural, Comercial & Gastronómico, Salud & Transporte, Turismo Quebrada)",
    "desc": "Descripción atractiva de 1 o 2 oraciones explicando por qué le conviene este punto al huésped."
  }
]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Error en la API de Gemini (Código ${response.status})`
    );
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini no devolvió ninguna respuesta para esta ubicación.");
  }

  try {
    const places = JSON.parse(text);
    if (!Array.isArray(places) || places.length === 0) {
      throw new Error("El formato devuelto no es una lista válida de lugares.");
    }
    return places;
  } catch (err) {
    console.error("Error parseando respuesta JSON de Gemini:", text, err);
    throw new Error("No se pudo interpretar la respuesta de lugares generada.");
  }
}
