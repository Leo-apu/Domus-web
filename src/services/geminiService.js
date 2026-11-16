
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-3.5-flash-lite";

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

export async function generateAmenitiesWithGemini(name, type = "", bedrooms = 1, bathrooms = 1) {
  if (!GEMINI_API_KEY) {
    throw new Error("No se encontró la clave VITE_GEMINI_API_KEY en las variables de entorno.");
  }

  const prompt = `Actúa como diseñador de experiencias de alojamiento turístico en San Salvador de Jujuy.
Para un departamento de alquiler temporario con las siguientes características:
- Nombre: "${name || "Departamento Temporario"}"
- Tipo: "${type || "Departamento"}"
- Dormitorios: ${bedrooms}
- Baños: ${bathrooms}

Genera entre 10 y 12 comodidades y servicios clave agrupados en 3 categorías:
1. "Servicios Esenciales"
2. "Confort y Habitabilidad"
3. "Cocina y Gastronomía"

Usa únicamente los siguientes nombres de iconos disponibles:
["Wifi", "Zap", "Droplets", "Tv", "Bath", "Building2", "Sparkles", "Sun", "Refrigerator", "Coffee", "Utensils", "CheckCircle2", "ShieldCheck", "Flame", "Wind"]

Debes responder ÚNICAMENTE con un arreglo JSON válido sin texto extra, con esta estructura exacta:
[
  {
    "name": "Nombre de la comodidad (ej: WiFi Fibra Óptica 300MB)",
    "desc": "Descripción concisa de 1 oración destacando el beneficio para el huésped",
    "icon": "Uno de los iconos de la lista",
    "category": "Una de las 3 categorías exactas"
  }
]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    throw new Error(errorData.error?.message || `Error en la API de Gemini (Código ${response.status})`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini no devolvió comodidades sugeridas.");
  }

  try {
    const amenities = JSON.parse(text);
    if (!Array.isArray(amenities) || amenities.length === 0) {
      throw new Error("Formato inválido de comodidades devueltas.");
    }
    return amenities;
  } catch (err) {
    console.error("Error parseando JSON de comodidades:", text, err);
    throw new Error("No se pudo interpretar la respuesta de comodidades generada.");
  }
}

export async function generateFaqsWithGemini(apartments = []) {
  if (!GEMINI_API_KEY) {
    throw new Error("No se encontró la clave VITE_GEMINI_API_KEY en las variables de entorno.");
  }

  const deptNames = apartments.map((a) => a.name || a.shortName).filter(Boolean).join(", ");

  const prompt = `Actúa como anfitrión profesional de alojamientos temporarios en San Salvador de Jujuy (Argentina).
Para nuestro negocio de departamentos "Domus Alquileres Jujuy" con las unidades: "${deptNames || "Domus Gorriti y Domus Suite"}",
genera entre 5 y 6 preguntas frecuentes (FAQ) indispensables para los turistas y huéspedes.
Debes incluir temas clave como:
1. Horarios de check-in / check-out y flexibilidad.
2. Cómo funciona la reserva y medios de pago (seña, transferencias, Mercado Pago, efectivo).
3. Estacionamiento o cocheras en la zona.
4. Ropa blanca, toallas y equipamiento.
5. Política de mascotas o fumar.
6. Asesoramiento turístico para excursiones a la Quebrada de Humahuaca o Purmamarca.

Debes responder ÚNICAMENTE con un arreglo JSON válido sin texto extra:
[
  {
    "q": "¿Pregunta clara y directa?",
    "a": "Respuesta completa, cálida y profesional que dé tranquilidad al huésped."
  }
]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error en la API de Gemini (${response.status})`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini no devolvió preguntas sugeridas.");
  }

  try {
    const faqs = JSON.parse(text);
    if (!Array.isArray(faqs) || faqs.length === 0) {
      throw new Error("Formato inválido de FAQs devueltas.");
    }
    return faqs;
  } catch (err) {
    console.error("Error parseando FAQs:", text, err);
    throw new Error("No se pudo interpretar la respuesta de FAQs generada.");
  }
}
