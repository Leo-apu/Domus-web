// Configuración centralizada de Domus Alquileres
// San Salvador de Jujuy, Argentina

export const APARTMENT_INFO = {
  name: "Domus Alquileres Temporarios",
  shortName: "Domus Jujuy",
  tagline: "Tu espacio ideal en el corazón de San Salvador de Jujuy",
  rating: 4.96,
  reviewsCount: 52,
  address: "Gral. San Martín 121, San Salvador de Jujuy, Jujuy, Argentina",
  googleMapsUrl: "https://maps.google.com/?q=Gral.+San+Mart%C3%ADn+121,+San+Salvador+de+Jujuy",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.5950480067204!2d-65.2951006!3d-24.185930799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f5c8f6225c1%3A0xb30976bd03fea1c0!2sGral.%20San%20Mart%C3%ADn%20121%2C%20Y4600ADC%20San%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses-419!2sar!4v1712901915836!5m2!1ses-419!2sar",
  whatsappLink: "https://wa.link/49xxkp",
  whatsappPhone: "+54 9 388 000-0000",
  schedule: "Lunes a Lunes: 09:00 hs a 00:00 hs (Feriados inclusive)",
  checkIn: "14:00 hs",
  checkOut: "10:30 hs",
  capacity: {
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rooms: 3,
    surfaceM2: 66,
  },
  unitType: "Departamento Privado",
  operationType: "Alquiler temporario / por día",
  building: {
    floors: 10,
    unitsPerFloor: 2,
    elevator: true,
    stairs: true,
  },
  emailJsConfig: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "default_service",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_s13u0hv",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "wBE_TFcOxUUeWO_NG",
  },
};

// Galería fotográfica completa del departamento
export const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/images/comedor.webp",
    alt: "Living Comedor espacioso con luz natural",
    title: "Living y Comedor Principal",
    category: "living",
    description: "Espacio amplio y luminoso con mesa para 4 personas, Smart TV y ventanal al exterior.",
    featured: true,
  },
  {
    id: 2,
    src: "/images/living.webp",
    alt: "Living con sillón cómodo y Smart TV",
    title: "Área de Estar y Descanso",
    category: "living",
    description: "Sillón confortable, excelente iluminación cálida y vista abierta.",
    featured: true,
  },
  {
    id: 3,
    src: "/images/cocina.webp",
    alt: "Cocina moderna totalmente equipada",
    title: "Cocina Integral Equipada",
    category: "cocina",
    description: "Heladera con freezer, microondas, horno a gas, pava eléctrica y vajilla completa.",
    featured: true,
  },
  {
    id: 4,
    src: "/images/hab1.webp",
    alt: "Dormitorio Principal con sommier matrimonial",
    title: "Dormitorio Principal (Cama Matrimonial)",
    category: "dormitorios",
    description: "Sommier de 2 plazas, placard empotrado de gran capacidad y baño privado en suite.",
    featured: true,
  },
  {
    id: 5,
    src: "/images/hab2.webp",
    alt: "Segundo Dormitorio con dos camas individuales",
    title: "Dormitorio Secundario (2 Camas)",
    category: "dormitorios",
    description: "Dos camas sommier individuales, placard, luz natural y acceso a su propio baño en suite.",
    featured: true,
  },
  {
    id: 6,
    src: "/images/baño1.webp",
    alt: "Baño completo en suite 1",
    title: "Baño Completo 1 (En Suite)",
    category: "baños",
    description: "Ducha con excelente caudal y agua caliente continua las 24 horas.",
    featured: false,
  },
  {
    id: 7,
    src: "/images/baño2.webp",
    alt: "Baño completo en suite 2",
    title: "Baño Completo 2 (En Suite)",
    category: "baños",
    description: "Segundo baño completo en suite para máxima privacidad e independencia de los huéspedes.",
    featured: false,
  },
  {
    id: 8,
    src: "/images/landing-2.webp",
    alt: "Vista panorámica y entorno del departamento",
    title: "Entorno y Confort Domus",
    category: "living",
    description: "Ambientes cálidos pensados para descansar tras recorrer los paisajes de Jujuy.",
    featured: false,
  },
];

// Espacios detallados para el explorador
export const ROOMS_DETAILS = [
  {
    id: "living-comedor",
    name: "Living - Comedor",
    area: "26 m²",
    capacity: "4 personas",
    image: "/images/comedor.webp",
    badge: "Espacio Social",
    features: [
      "Mesa de comedor para 4 comensales",
      "Smart TV con conexión a plataformas y cable",
      "Sillón confortable de diseño moderno",
      "Salida a balcón con vistas al centro y montañas",
      "Ambiente climatizado e iluminado",
    ],
  },
  {
    id: "cocina",
    name: "Cocina Equipada",
    area: "12 m²",
    capacity: "Totalmente funcional",
    image: "/images/cocina.webp",
    badge: "Cocina Completa",
    features: [
      "Heladera con freezer de alta capacidad",
      "Horno y anafe a gas",
      "Microondas y pava eléctrica",
      "Vajilla, vasos, copas y cubiertos completos",
      "Utensilios de cocina, ollas y sartenes",
    ],
  },
  {
    id: "dormitorio-1",
    name: "Dormitorio Principal",
    area: "15 m²",
    capacity: "2 personas (Matrimonial)",
    image: "/images/hab1.webp",
    badge: "Baño en Suite",
    features: [
      "Cama matrimonial con sommier de alta densidad",
      "Baño privado en suite completo",
      "Placard empotrado de piso a techo",
      "Ropa blanca de primera calidad incluida",
      "Cortinas blackout para óptimo descanso",
    ],
  },
  {
    id: "dormitorio-2",
    name: "Dormitorio Secundario",
    area: "13 m²",
    capacity: "2 personas (Individuales)",
    image: "/images/hab2.webp",
    badge: "Baño en Suite",
    features: [
      "2 Camas sommier individuales de 1 plaza y media",
      "Segundo baño privado completo en suite",
      "Placard con perchas y estantes",
      "Luz y ventilación natural directa",
      "Juego de toallas y sábanas para cada huésped",
    ],
  },
  {
    id: "baños",
    name: "2 Baños Completos",
    area: "En suite en cada habitación",
    capacity: "Privacidad total",
    image: "/images/baño1.webp",
    badge: "2 Baños Privados",
    features: [
      "Cada dormitorio cuenta con su propio baño privado",
      "Agua caliente continua y presurizada las 24 hs",
      "Ducha amplia y sanitarios modernos",
      "Toallones y toallas de mano incluidos",
      "Artículos de higiene y secador de pelo disponibles",
    ],
  },
];

// Servicios incluidos destacados
export const AMENITIES = [
  {
    category: "Servicios Esenciales",
    items: [
      { name: "WiFi Alta Velocidad", desc: "Fibra óptica ideal para streaming y trabajo remoto", icon: "Wifi" },
      { name: "Luz y Gas incluidos", desc: "Sin costos extra ni cobros adicionales", icon: "Zap" },
      { name: "Agua Caliente 24/7", desc: "Presión constante y termotanque de alta recuperación", icon: "Droplets" },
      { name: "Smart TV con Streaming", desc: "Pantalla plana con aplicaciones y cable", icon: "Tv" },
    ],
  },
  {
    category: "Confort y Habitabilidad",
    items: [
      { name: "2 Baños en Suite", desc: "Un baño privado dentro de cada dormitorio", icon: "Bath" },
      { name: "Ropa Blanca Premium", desc: "Sábanas y toallones higienizados para cada huésped", icon: "Sparkles" },
      { name: "Balcón al frente", desc: "Excelente vista de la ciudad y luz natural", icon: "Sun" },
      { name: "Edificio con Ascensor", desc: "Acceso rápido y cómodo en edificio moderno de 10 pisos", icon: "Building2" },
    ],
  },
  {
    category: "Cocina y Gastronomía",
    items: [
      { name: "Heladera con Freezer", desc: "Espaciosa para almacenar bebidas y alimentos", icon: "Refrigerator" },
      { name: "Microondas y Pava Eléctrica", desc: "Para calentar comidas y preparar infusiones", icon: "Coffee" },
      { name: "Cocina con Horno", desc: "Cocina completa con vajilla y utensilios", icon: "Utensils" },
      { name: "Vajilla Completa para 4", desc: "Platos, cubiertos, vasos, tazas y copas", icon: "CheckCircle2" },
    ],
  },
];

// Puntos de interés cercanos en San Salvador de Jujuy
export const NEARBY_PLACES = [
  {
    name: "Plaza Belgrano & Catedral de Jujuy",
    distance: "2 cuadras (200 m)",
    time: "2 minutos a pie",
    type: "Histórico y Cultural",
    desc: "El corazón cívico y verde de San Salvador, rodeado de cafés y ferias.",
  },
  {
    name: "Peatonal Belgrano y Paseo de Compras",
    distance: "2 cuadras (250 m)",
    time: "3 minutos a pie",
    type: "Comercial y Gastronómico",
    desc: "Comercios, farmacias, bancos, restaurantes típicos y peñas folclóricas.",
  },
  {
    name: "Casa de Gobierno y Salón de la Bandera",
    distance: "3 cuadras (300 m)",
    time: "4 minutos a pie",
    type: "Monumento Histórico",
    desc: "Custodia de la bandera donada por el Gral. Manuel Belgrano en 1813.",
  },
  {
    name: "Centro Cultural Héctor Tizón",
    distance: "6 cuadras (600 m)",
    time: "7 minutos a pie",
    type: "Cultura y Eventos",
    desc: "Exposiciones artísticas, teatro, música en vivo y recitales acústicos.",
  },
  {
    name: "Acceso a Ruta 9 (Hacia Purmamarca y Tilcara)",
    distance: "Salida directa rápida",
    time: "50 min a Purmamarca",
    type: "Turismo Quebrada",
    desc: "Ubicación ideal para salir temprano hacia el Cerro de los Siete Colores y Humahuaca.",
  },
];

// Opiniones de huéspedes verificados
export const TESTIMONIALS = [
  {
    name: "Martín & Valeria",
    origin: "Buenos Aires",
    rating: 5,
    date: "Enero 2026",
    title: "¡Excelente departamento en pleno centro!",
    comment: "El departamento es tal cual se ve en las fotos o incluso más amplio. Que tenga dos dormitorios con baño privado cada uno fue clave para nuestra estadía con amigos. Súper limpio, agua caliente con excelente presión y a 2 pasos de la plaza.",
    tag: "Estadía Vacacional",
  },
  {
    name: "Lucía Fernández",
    origin: "Córdoba",
    rating: 5,
    date: "Febrero 2026",
    title: "Muy cómodo para trabajar y pasear",
    comment: "Viajé por trabajo y turismo. El WiFi anduvo rapidísimo para mis videollamadas y por la tarde salía caminando a cenar por el centro. Leandro siempre atento a cualquier consulta. 100% recomendable.",
    tag: "Viaje de Trabajo / Turismo",
  },
  {
    name: "Familia Gómez",
    origin: "Santa Fe",
    rating: 5,
    date: "Marzo 2026",
    title: "Ideal para ir con niños",
    comment: "Todo impecable. La cocina está muy bien equipada con microondas y heladera grande. El edificio tiene ascensor lo cual facilitó subir con cochecito y valijas. Volveremos seguro en nuestras próximas vacaciones a Jujuy.",
    tag: "Familia con niños",
  },
];

// Preguntas Frecuentes
export const FAQS = [
  {
    q: "¿Cuáles son los horarios de Check-in y Check-out?",
    a: "El horario habitual de Check-in es a partir de las 14:00 hs y el Check-out hasta las 10:30 hs. Si necesitás horarios especiales por el arribo de tu vuelo o bus, consultanos previamente para coordinar la disponibilidad.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos transferencias bancarias, Mercado Pago y efectivo en pesos argentinos o dólares al momento del ingreso.",
  },
  {
    q: "¿Tiene estacionamiento o cochera?",
    a: "En la misma cuadra y sobre calles aledañas hay varias cocheras y playas de estacionamiento privadas cubiertas con tarifa diaria o por estadía.",
  },
  {
    q: "¿El departamento cuenta con ropa de cama y toallas?",
    a: "Sí, proveemos sábanas, frazadas/acolchados y juegos de toallas y toallones de primera calidad para la cantidad de personas reservadas.",
  },
  {
    q: "¿Qué capacidad máxima de personas tiene?",
    a: "La capacidad máxima es de hasta 4 personas distribuidas cómodamente entre el dormitorio matrimonial (cama de 2 plazas) y el segundo dormitorio (dos camas individuales).",
  },
  {
    q: "¿Se permiten mascotas o fumar dentro del departamento?",
    a: "Para mantener el departamento en óptimas condiciones de higiene y para personas alérgicas, no se admiten mascotas ni está permitido fumar en los ambientes cerrados (únicamente en el balcón).",
  },
];
