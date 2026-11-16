
export const APARTMENT_INFO = {
  name: "Domus Alquileres Temporarios",
  shortName: "Domus Jujuy",
  tagline: "Tu espacio ideal en el corazón de San Salvador de Jujuy",
  rating: 4.96,
  reviewsCount: 52,
  address: "Gral. San Martín 121, San Salvador de Jujuy, Jujuy, Argentina",
  googleMapsUrl:
    "https://maps.google.com/?q=Gral.+San+Mart%C3%ADn+121,+San+Salvador+de+Jujuy",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.5950480067204!2d-65.2951006!3d-24.185930799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f5c8f6225c1%3A0xb30976bd03fea1c0!2sGral.%20San%20Mart%C3%ADn%20121%2C%20Y4600ADC%20San%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses-419!2sar!4v1712901915836!5m2!1ses-419!2sar",
  whatsappLink: "https://wa.link/49xxkp",
  whatsappPhone: "+54 9 388 635-0824",
  whatsappNumber: "543886350824",
  schedule: "Lunes a Lunes: 09:00 hs a 00:00 hs (Feriados inclusive)",
  checkIn: "14:00 hs",
  checkOut: "10:30 hs",
  emailJsConfig: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },
  googleSheetsWebhookUrl: import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "",
};

export const APARTMENTS = [
  {
    id: "domus-centro",
    name: "Domus Gorriti - 3 Ambientes",
    shortName: "Domus Gorriti",
    type: "3 Ambientes",
    badge: "Más Solicitado",
    badgeColor: "rose",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    roomsCount: 3,
    surfaceM2: 66,
    floor: "Piso 4 - Al frente con balcón",
    address: "Av. Juana Manuela Gorriti 613, San Salvador de Jujuy",
    zone: "Zona Centro - A pasos del Parque Xibi Xibi",
    googleMapsUrl: "https://maps.app.goo.gl/kv4tc7z9BxPVzzyBA",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=-24.191464,-65.297901&hl=es&z=17&output=embed",
    basePrice: 48000,
    coverImage: "/images/landing-2.webp",
    description:
      "Departamento amplio y luminoso con 2 dormitorios independientes, cada uno con su propio baño privado en suite. Ubicado sobre Av. Juana Manuela Gorriti 613, a pasos del Parque Lineal Xibi Xibi y a minutos caminando del centro histórico de Jujuy.",
    highlights: [
      "Ubicación sobre Av. Juana Manuela Gorriti 613",
      "A pasos del Parque Lineal Xibi Xibi y a minutos del centro",
      "2 Dormitorios con baño privado en suite cada uno",
      "Balcón al frente con vista abierta y luz natural",
      "Cocina completa equipada con horno, microondas y WiFi 300 Mbps",
    ],
    heroSlides: [
      {
        image: "/images/landing-2.webp",
        title: "Tu Refugio Exclusivo sobre Av. Gorriti",
        subtitle:
          "Departamento 3 ambientes a pasos del Parque Lineal Xibi Xibi y a minutos del centro. Máximo confort, privacidad y ubicación.",
        badge: "Ubicación Privilegiada",
        position: "object-[center_35%]",
      },
      {
        image: "/images/landing-3.webp",
        title: "Privacidad Total con 2 Baños en Suite",
        subtitle:
          "Cada habitación cuenta con su propio baño privado completo. La independencia ideal para familias y amigos.",
        badge: "2 Baños en Suite",
        position: "object-center",
      },
      {
        image: "/images/landing-1.webp",
        title: "Equipamiento de Categoría para 4 Huéspedes",
        subtitle:
          "Cocina integral completa, Smart TV, WiFi 300MB y balcón con vista abierta a los cerros de Jujuy.",
        badge: "Todo Equipado",
        position: "object-center",
      },
    ],
    nearbyPlaces: [
      {
        name: "Parque Lineal Xibi Xibi",
        distance: "1 cuadra (100 m)",
        time: "2 minutos a pie",
        type: "Espacio Verde & Recreativo",
        desc: "Hermoso paseo urbano con ciclovías, senderos peatonales y áreas de ejercicio junto al río.",
      },
      {
        name: "Plaza Belgrano & Catedral de Jujuy",
        distance: "6 cuadras (600 m)",
        time: "7 minutos a pie",
        type: "Centro Cívico & Cultural",
        desc: "El corazón cívico y verde de San Salvador, cruzando el puente Gorriti hacia el casco histórico.",
      },
      {
        name: "Peatonal Belgrano y Paseo Comercial",
        distance: "6 cuadras (650 m)",
        time: "7 minutos a pie",
        type: "Comercial y Gastronómico",
        desc: "Restaurantes típicos, confiterías, farmacias, bancos y peñas folclóricas.",
      },
      {
        name: "Hospital Pablo Soria y Zona de Servicios",
        distance: "2 cuadras (200 m)",
        time: "3 minutos a pie",
        type: "Salud & Transporte",
        desc: "Área con farmacias 24 hs, comercios de cercanía y paradas de transporte público hacia toda la ciudad.",
      },
      {
        name: "Acceso ágil a Ruta 9 (Hacia la Quebrada)",
        distance: "Salida directa rápida",
        time: "50 min a Purmamarca",
        type: "Turismo Quebrada",
        desc: "Salida expedita por Av. El Éxodo hacia la Ruta 9 para recorrer Purmamarca, Tilcara y Humahuaca.",
      },
    ],
    galleryImages: [
      {
        id: "c1",
        src: "/images/comedor.webp",
        alt: "Living Comedor espacioso con luz natural",
        title: "Living y Comedor Principal",
        category: "living",
        description:
          "Espacio amplio y luminoso con mesa para 4 personas, Smart TV y ventanal al exterior.",
        featured: true,
      },
      {
        id: "c2",
        src: "/images/living.webp",
        alt: "Living con sillón cómodo y Smart TV",
        title: "Área de Estar y Descanso",
        category: "living",
        description:
          "Sillón confortable, excelente iluminación cálida y vista abierta.",
        featured: true,
      },
      {
        id: "c3",
        src: "/images/cocina.webp",
        alt: "Cocina moderna totalmente equipada",
        title: "Cocina Integral Equipada",
        category: "cocina",
        description:
          "Heladera con freezer, microondas, horno a gas, pava eléctrica y vajilla completa.",
        featured: true,
      },
      {
        id: "c4",
        src: "/images/hab1.webp",
        alt: "Dormitorio Principal con sommier matrimonial",
        title: "Dormitorio Principal (Cama Matrimonial)",
        category: "dormitorios",
        description:
          "Sommier de 2 plazas, placard empotrado de gran capacidad y baño privado en suite.",
        featured: true,
      },
      {
        id: "c5",
        src: "/images/hab2.webp",
        alt: "Segundo Dormitorio con dos camas individuales",
        title: "Dormitorio Secundario (2 Camas)",
        category: "dormitorios",
        description:
          "Dos camas sommier individuales, placard, luz natural y acceso a su propio baño en suite.",
        featured: true,
      },
      {
        id: "c6",
        src: "/images/baño1.webp",
        alt: "Baño completo en suite 1",
        title: "Baño Completo 1 (En Suite)",
        category: "baños",
        description:
          "Ducha con excelente caudal y agua caliente continua las 24 horas.",
        featured: false,
      },
      {
        id: "c7",
        src: "/images/baño2.webp",
        alt: "Baño completo en suite 2",
        title: "Baño Completo 2 (En Suite)",
        category: "baños",
        description:
          "Segundo baño completo en suite para máxima privacidad e independencia de los huéspedes.",
        featured: false,
      },
      {
        id: "c8",
        src: "/images/landing-2.webp",
        alt: "Vista panorámica y entorno del departamento",
        title: "Entorno y Confort Domus",
        category: "living",
        description:
          "Ambientes cálidos pensados para descansar tras recorrer los paisajes de Jujuy.",
        featured: false,
      },
    ],
    roomsDetails: [
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
    ],
  },
  {
    id: "domus-suite",
    name: "Domus Suite - Av. Párroco Marshke",
    shortName: "Domus Suite",
    type: "Monoambiente / Estudio",
    badge: "Ideal Parejas & Trabajo",
    badgeColor: "amber",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    roomsCount: 1,
    surfaceM2: 38,
    floor: "Planta cómoda y luminosa",
    address: "Av. Párroco Marshke 516, San Salvador de Jujuy",
    zone: "Acceso Sur & Corredor Comercial",
    googleMapsUrl: "https://maps.app.goo.gl/67WnwoWn5Deo3zzv7",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.3807534431874!2d-65.2907341!3d-24.1959276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f56b9836b73%3A0xa3b2fb160c86b6b8!2sAv.%20P%C3%A1rroco%20Marshke%20516%2C%20Y4604%20San%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses-419!2sar!4v1712901915836!5m2!1ses-419!2sar",
    basePrice: 34000,
    coverImage: "/images/landing-3.webp",
    description:
      "Estudio boutique ubicado sobre Av. Párroco Marshke 516, con inmejorable conexión directa a Ruta 9, Ruta 66 y Terminal de Ómnibus. Equipado con sommier King size, espacio de trabajo con WiFi rápido, kitchenette y baño moderno.",
    highlights: [
      "Ubicación estratégica sobre Av. Párroco Marshke 516",
      "Salida directa a Ruta 9 hacia Purmamarca y Ruta 66 al Aeropuerto",
      "Sommier King Size de máxima comodidad y descanso",
      "Espacio de trabajo dedicado con escritorio y WiFi 300 Mbps",
      "Kitchenette con microondas, frigobar, pava eléctrica y cafetera",
    ],
    heroSlides: [
      {
        image: "/images/landing-3.webp",
        title: "Elegancia y Confort sobre Av. Párroco Marshke",
        subtitle:
          "Estudio ejecutivo boutique con cama King, kitchenette equipada y salida rápida a los principales atractivos de Jujuy.",
        badge: "Ubicación Estratégica",
        position: "object-center",
      },
      {
        image: "/images/hab1.webp",
        title: "Descanso Premium con Sommier King",
        subtitle:
          "Ropa blanca de hotelería, cortinas blackout y ambiente climatizado para el mejor relax.",
        badge: "Confort Máximo",
        position: "object-center",
      },
      {
        image: "/images/living.webp",
        title: "Work & Travel con WiFi Fibra Óptica",
        subtitle:
          "Espacio de escritorio pensado para nómades digitales y profesionales con conexión de alta velocidad.",
        badge: "Ideal Home Office",
        position: "object-center",
      },
    ],
    nearbyPlaces: [
      {
        name: "Conexión Directa a Ruta 9 y Ruta 66",
        distance: "Salida inmediata",
        time: "1 minuto en vehículo",
        type: "Turismo & Rutas",
        desc: "Salida ágil y sin embotellamientos hacia Purmamarca, Tilcara, Humahuaca y Aeropuerto.",
      },
      {
        name: "Terminal de Ómnibus de Jujuy",
        distance: "A pocas cuadras",
        time: "3 minutos en auto",
        type: "Transporte Interurbano",
        desc: "Conexiones terrestres hacia toda la provincia de Jujuy y el resto del país.",
      },
      {
        name: "Corredor Comercial Av. Almirante Brown",
        distance: "1 cuadra (150 m)",
        time: "2 minutos a pie",
        type: "Comercial & Servicios",
        desc: "Supermercados, farmacias, bancos, panaderías, estaciones de servicio y rotiserías.",
      },
      {
        name: "Parque Lineal Xibi Xibi",
        distance: "5 cuadras",
        time: "6 minutos a pie",
        type: "Espacio Verde & Deporte",
        desc: "Hermoso parque urbano a la vera del río con ciclovías, senderos peatonales y áreas de ejercicio.",
      },
      {
        name: "Acceso al Microcentro Histórico",
        distance: "15 cuadras",
        time: "5 minutos en auto / bus",
        type: "Centro de la Ciudad",
        desc: "Rápido acceso al casco céntrico con la comodidad de estacionamiento más accesible en la zona.",
      },
    ],
    galleryImages: [
      {
        id: "s1",
        src: "/images/landing-3.webp",
        alt: "Vista principal de la Suite Ejecutiva en Marshke",
        title: "Ambiente Principal Suite",
        category: "dormitorios",
        description:
          "Espacio integrado con sommier King Size, iluminación cálida y ventanal al exterior.",
        featured: true,
      },
      {
        id: "s2",
        src: "/images/hab1.webp",
        alt: "Cama King Size Sommier de la Suite",
        title: "Sector Dormitorio King",
        category: "dormitorios",
        description:
          "Sommier King Size de alta densidad, sábanas de algodón y respaldo tapizado.",
        featured: true,
      },
      {
        id: "s3",
        src: "/images/living.webp",
        alt: "Área de estar y escritorio de trabajo",
        title: "Zona de Estar y Escritorio",
        category: "living",
        description:
          "Escritorio de trabajo con iluminación LED, enchufes accesibles y sillón relax.",
        featured: true,
      },
      {
        id: "s4",
        src: "/images/cocina.webp",
        alt: "Kitchenette equipada de la Suite",
        title: "Kitchenette Equipada",
        category: "cocina",
        description:
          "Frigobar silencioso, microondas, pava eléctrica, cafetera y vajilla para 2 personas.",
        featured: true,
      },
      {
        id: "s5",
        src: "/images/baño2.webp",
        alt: "Baño completo de la Suite",
        title: "Baño de Diseño Moderno",
        category: "baños",
        description:
          "Sanitarios de primera línea, ducha con excelente caudal y secador de pelo.",
        featured: true,
      },
    ],
    roomsDetails: [
      {
        id: "suite-principal",
        name: "Espacio Integrado King",
        area: "24 m²",
        capacity: "2 personas",
        image: "/images/hab1.webp",
        badge: "Dormitorio King",
        features: [
          "Cama King Size (1.80m x 2.00m) de alta gama",
          'Smart TV 50" giratorio con Netflix y cable',
          "Escritorio de trabajo con silla ergonómica",
          "Cortinas blackout totales para descanso pleno",
          "Climatización frío/calor silenciosa",
        ],
      },
      {
        id: "suite-kitchenette",
        name: "Kitchenette & Desayunador",
        area: "8 m²",
        capacity: "Equipamiento para 2",
        image: "/images/cocina.webp",
        badge: "Kitchenette",
        features: [
          "Frigobar con congelador",
          "Microondas digital y cafetera",
          "Pava eléctrica y set de té/café de cortesía",
          "Vajilla y copas completas para 2 personas",
          "Barra desayunadora con banquetas",
        ],
      },
      {
        id: "suite-baño",
        name: "Baño Completo",
        area: "6 m²",
        capacity: "Privado",
        image: "/images/baño2.webp",
        badge: "Baño Privado",
        features: [
          "Ducha con mampara de vidrio templado",
          "Agua caliente continua 24 hs presurizada",
          "Set de toallones premium 500 gr",
          "Espejo iluminado y secador de cabello",
          "Amenities de bienvenida incluidos",
        ],
      },
    ],
  },
];

export const DEFAULT_APARTMENT = APARTMENTS[0];
export const GALLERY_IMAGES = DEFAULT_APARTMENT.galleryImages;
export const ROOMS_DETAILS = DEFAULT_APARTMENT.roomsDetails;
export const NEARBY_PLACES = DEFAULT_APARTMENT.nearbyPlaces;

export const AMENITIES = [
  {
    category: "Servicios Esenciales",
    items: [
      {
        name: "WiFi Alta Velocidad",
        desc: "Fibra óptica ideal para streaming y trabajo remoto",
        icon: "Wifi",
      },
      {
        name: "Luz y Gas incluidos",
        desc: "Sin costos extra ni cobros adicionales",
        icon: "Zap",
      },
      {
        name: "Agua Caliente 24/7",
        desc: "Presión constante y termotanque de alta recuperación",
        icon: "Droplets",
      },
      {
        name: "Smart TV con Streaming",
        desc: "Pantalla plana con aplicaciones y cable",
        icon: "Tv",
      },
    ],
  },
  {
    category: "Confort y Habitabilidad",
    items: [
      {
        name: "Baños Completos Privados",
        desc: "Equipados con ducha presurizada y agua caliente continua",
        icon: "Bath",
      },
      {
        name: "Ropa Blanca Premium",
        desc: "Sábanas y toallones higienizados para cada huésped",
        icon: "Sparkles",
      },
      {
        name: "Balcón al frente",
        desc: "Excelente vista de la ciudad y luz natural",
        icon: "Sun",
      },
      {
        name: "Edificio Moderno",
        desc: "Acceso seguro en excelentes ubicaciones de la ciudad",
        icon: "Building2",
      },
    ],
  },
  {
    category: "Cocina y Gastronomía",
    items: [
      {
        name: "Heladera con Freezer / Frigobar",
        desc: "Para almacenar bebidas y alimentos frescos",
        icon: "Refrigerator",
      },
      {
        name: "Microondas y Pava Eléctrica",
        desc: "Para calentar comidas y preparar infusiones",
        icon: "Coffee",
      },
      {
        name: "Cocina / Kitchenette Equipada",
        desc: "Con vajilla, cubiertos y utensilios completos",
        icon: "Utensils",
      },
      {
        name: "Vajilla Completa",
        desc: "Platos, cubiertos, vasos, tazas y copas higienizadas",
        icon: "CheckCircle2",
      },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Martín & Valeria",
    origin: "Buenos Aires",
    rating: 5,
    date: "Enero 2026",
    title: "¡Excelente departamento cerca del centro!",
    comment:
      "El departamento sobre Av. Gorriti es tal cual se ve en las fotos o incluso más amplio. Que tenga dos dormitorios con baño privado cada uno fue clave para nuestra estadía con amigos. Súper limpio, agua caliente con excelente presión y a pasos del Parque Xibi Xibi.",
    tag: "Domus Gorriti (3 Ambientes)",
  },
  {
    name: "Lucía Fernández",
    origin: "Córdoba",
    rating: 5,
    date: "Febrero 2026",
    title: "Muy cómodo para trabajar y pasear",
    comment:
      "Me alojé en la Suite de Av. Párroco Marshke. El acceso a la ruta fue ideal para salir directo a Purmamarca en auto sin lidiar con el tránsito céntrico, y el WiFi anduvo rapidísimo para mis videollamadas. Leandro súper atento. 100% recomendable.",
    tag: "Domus Suite (Marshke)",
  },
];

export const FAQS = [
  {
    q: "¿Cuántos departamentos tienen y cómo elijo el adecuado?",
    a: "Contamos con 2 excelentes opciones en San Salvador de Jujuy: Domus Gorriti (3 ambientes para hasta 4 personas sobre Av. Juana Manuela Gorriti 613, con 2 baños en suite) y Domus Suite (estudio para 2 personas sobre Av. Párroco Marshke 516 con salida directa a Ruta 9/66 y cama King). Podés alternar entre ambos en el selector de la web para ver fotos y comodidades de cada uno.",
  },
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
    a: "En la sucursal Centro hay varias playas de estacionamiento privadas cubiertas a pocos metros. En la sucursal de Av. Párroco Marshke el estacionamiento es muy cómodo y accesible en la zona.",
  },
  {
    q: "¿Los departamentos cuentan con ropa de cama y toallas?",
    a: "Sí, proveemos sábanas, frazadas/acolchados y juegos de toallas y toallones de primera calidad para la cantidad de personas reservadas en cualquiera de los dos departamentos.",
  },
  {
    q: "¿Se permiten mascotas o fumar dentro del departamento?",
    a: "Para mantener los departamentos en óptimas condiciones de higiene y para personas alérgicas, no se admiten mascotas ni está permitido fumar en los ambientes cerrados.",
  },
];
