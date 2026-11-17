# 🏡 Domus Alquileres Temporarios — San Salvador de Jujuy

> Aplicación web moderna de alquiler temporario multi-departamento desarrollada con **React 19**, **Vite**, **Tailwind CSS v4**, panel de control **CMS con Firebase & Cloudinary**, integración serverless con **Google Sheets + Google Apps Script** y asistencia de contenido con **Google Gemini IA**. Diseñada con arquitectura modular basada en principios **SOLID** y siguiendo los estándares de conversión y UX/UI de plataformas líderes mundiales (**Airbnb**, **Vrbo** y **Booking.com**).

🌐 **Sitio en Producción:** [https://domus-jujuy.vercel.app/](https://domus-jujuy.vercel.app/)

---

## 🌟 Principales Características y Funcionalidades

### 1. 🏢 Catálogo Multi-Departamento Reactivo
La plataforma gestiona múltiples unidades en tiempo real, adaptando fotografías, comodidades, mapas, precios y cotizador según la selección del visitante:
* **Unidad 1: Domus Gorriti (3 Ambientes · Hasta 4 huéspedes)**
  * Dirección: *Av. Juana Manuela Gorriti 613, San Salvador de Jujuy*.
  * A pasos del Parque Lineal Xibi Xibi y a minutos del casco histórico.
  * 2 dormitorios independientes con **2 baños completos en suite**, balcón al frente y cocina integral.
* **Unidad 2: Domus Suite (Estudio Boutique · Hasta 2 huéspedes)**
  * Dirección: *Av. Párroco Marshke 516, San Salvador de Jujuy*.
  * Acceso estratégico inmediato a Ruta 9 (hacia Quebrada de Humahuaca), Ruta 66 y Terminal.
  * Sommier King Size, espacio de trabajo para nómades digitales, kitchenette equipada y baño moderno.

---

### 2. ⚡ Cotizador en Vivo y Reserva Directa por WhatsApp
* **Cálculo de tarifas por noche en tiempo real:** Selector reactivo de Check-in, Check-out y cantidad de huéspedes.
* **Verificación de disponibilidad con Google Sheets:** Consulta instantánea vía webhook de Google Apps Script para comprobar bloqueos de fechas antes de iniciar la solicitud.
* **Mensaje inteligente pre-formateado para WhatsApp:** Genera el texto con el cálculo exacto de la seña y fechas para concretar la reserva con un solo clic.

---

### 3. 🛡️ Panel de Administración CMS (`/admin`)
Panel de gestión integral para el anfitrión con inicio de sesión seguro (**Firebase Auth**):
* **Catálogo de Alojamientos:** Alta, edición, pausa temporal y eliminación de departamentos con persistencia en **Cloud Firestore**.
* **Gestor de Galería & Cloudinary CDN:** Carga de fotos de alta resolución con compresión automática y selección visual de imagen de portada.
* **Asistente Google Gemini IA:** Generación automatizada de descripciones persuasivas para cada ambiente y sugerencias de comodidades con un clic.
* **Editor de Reseñas & Huéspedes:** Carga y moderación de testimonios con estrellas, fechas y detalles de estadía.
* **Editor de Preguntas Frecuentes (FAQs):** Modificación en vivo de dudas habituales sobre check-in, cocheras y mascotas.
* **Monitor de Salud de Google Sheets:** Indicador en tiempo real con medidor de latencia (ms), estado online/offline y enlace directo a la planilla de reservas.
* **Ajustes de Contacto:** Modificación centralizada del número receptor de WhatsApp, horarios de atención, dirección física y enlaces a redes sociales (Instagram, Facebook, TikTok).

---

### 4. 📸 Experiencia Visual tipo Airbnb
* **Mosaico Bento Collage:** Galería editorial con foto de portada y 4 tomas secundarias con micro-animaciones fluidas.
* **Lightbox Interactivo:** Visor modal en alta definición con tira de miniaturas, soporte táctil y navegación por teclado (`←`, `→`, `Esc`).
* **Room Explorer:** Desglose ambiente por ambiente con metros cuadrados, camas e inventario de comodidades.

---

### 5. 🔒 Privacidad y Cumplimiento Legal (Ley N° 25.326)
* **Modal de Políticas de Privacidad (`PrivacyModal.jsx`):** Cumplimiento formal con la Ley 25.326 de Protección de Datos Personales de la República Argentina.
* Tratamiento confidencial de información sin cookies invasivas ni transferencia a terceros.

---

### 6. 🎯 SEO y Performance Web
* **Metadatos OpenGraph:** Vistas previas enriquecidas al compartir en WhatsApp, Facebook y X.
* **Geolocalización Local:** Coordenadas GPS y tags geográficos para San Salvador de Jujuy.
* **Schema.org (JSON-LD):** Marcado estructurado de `LodgingBusiness` para resultados destacados con estrellas y precios en Google.
* **Indexación:** Archivos `public/robots.txt` y `public/sitemap.xml` optimizados para Google Search Console.

---

## 🛠️ Stack Tecnológico

| Tecnología | Rol |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Framework frontend basado en componentes reactivos |
| **[Vite 8](https://vite.dev/)** | Servidor de desarrollo y bundler de producción ultrarrápido |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Sistema de diseño utility-first moderno y mobile-first |
| **[Firebase (Auth & Firestore)](https://firebase.google.com/)** | Base de datos NoSQL en la nube y autenticación de administradores |
| **[Cloudinary](https://cloudinary.com/)** | CDN y almacenamiento optimizado de fotografías del catálogo |
| **[Google Gemini API](https://ai.google.dev/)** | Inteligencia artificial para redacción de descripciones y comodidades |
| **[Google Apps Script](https://developers.google.com/apps-script)** | Endpoint serverless vinculado a Google Sheets para reservas |
| **[Lucide React](https://lucide.dev/)** | Set de iconografía SVG accesible y estilizado |
| **[EmailJS](https://www.emailjs.com/)** | Servicio de mensajería para el formulario de contacto |

---

## 📁 Arquitectura del Proyecto (SOLID / SRP)

```text
Alquiler-web/
├── public/
│   ├── images/                      # Fotografías WebP y logos optimizados
│   ├── favicon.svg                  # Icono vectorial de la web
│   ├── robots.txt                   # Directivas para rastreadores de motores de búsqueda
│   └── sitemap.xml                  # Mapa del sitio para Google Search Console
├── google-apps-script/
│   └── Code.gs                      # Script backend para Google Sheets y alertas por email
├── firestore.rules                  # Reglas de seguridad declarativas para Cloud Firestore
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Menú superior sticky con efecto glassmorphism
│   │   ├── Hero.jsx                 # Portada principal con selector de unidad activa
│   │   ├── ApartmentSelector.jsx    # Catálogo visual de las propiedades
│   │   ├── ModernGallery.jsx        # Mosaico Bento Collage con filtros por categoría
│   │   ├── PhotoLightbox.jsx        # Visor modal de fotos a pantalla completa
│   │   ├── RoomExplorer.jsx         # Desglose interactivo por ambientes
│   │   ├── ParallaxBanner.jsx       # Banner dinámico contextual
│   │   ├── FeaturesAndAmenities.jsx # Comodidades, servicios y especificaciones
│   │   ├── BookingCalculator.jsx    # Cotizador de estadía y derivador a WhatsApp
│   │   ├── LocationSection.jsx      # Mapa interactivo y puntos turísticos de la zona
│   │   ├── ParallaxStory.jsx        # Propuesta de valor, compromiso y métricas
│   │   ├── Testimonials.jsx         # Reseñas reales de huéspedes con desglose de puntaje
│   │   ├── FAQ.jsx                  # Preguntas frecuentes
│   │   ├── ContactForm.jsx          # Formulario con integración a EmailJS
│   │   ├── Footer.jsx               # Pie de página y canales de contacto
│   │   ├── PrivacyModal.jsx         # Modal legal y términos (Ley 25.326)
│   │   ├── FloatingWhatsApp.jsx     # Botón flotante de WhatsApp
│   │   ├── MobileBookingBar.jsx     # Barra de conversión inferior para móviles
│   │   └── admin/                   # Módulos del Panel CMS (Single Responsibility)
│   │       ├── AdminPage.jsx        # Rutas y validación de estado de autenticación
│   │       ├── AdminLogin.jsx       # Formulario de inicio de sesión seguro
│   │       ├── AdminDashboard.jsx   # Shell orquestador y barra de navegación de tabs
│   │       ├── ApartmentsAdmin.jsx  # Gestión del catálogo de alojamientos
│   │       ├── ApartmentCard.jsx    # Tarjeta de unidad con controles de edición
│   │       ├── ApartmentEditModal.jsx # Modal completo de edición, Cloudinary y Gemini IA
│   │       ├── TestimonialsAdmin.jsx # Moderación y edición de reseñas
│   │       ├── FaqsAdmin.jsx        # Editor de preguntas frecuentes
│   │       ├── SettingsAdmin.jsx    # Configuración de contacto, WhatsApp y redes
│   │       └── GoogleSheetsAdmin.jsx # Monitoreo de webhook y enlace a Google Sheets
│   ├── context/
│   │   └── AuthContext.jsx          # Proveedor global de sesión con Firebase Auth
│   ├── lib/
│   │   ├── firebase.js              # Inicialización de Firebase App, Auth y Firestore
│   │   └── cloudinary.js            # Subida directa de imágenes por API sin servidor
│   ├── services/
│   │   ├── apartmentService.js      # Operaciones CRUD sobre Cloud Firestore
│   │   ├── bookingService.js        # Comunicación con Google Apps Script
│   │   └── geminiService.js         # Inferencia con Google Gemini Flash API
│   ├── utils/
│   │   ├── formatters.js            # Formateadores de moneda, fechas y URLs de WhatsApp
│   │   └── pricing.js               # Cálculo de noches y tarifas de estadía
│   ├── data/
│   │   └── apartmentData.js         # Datos semilla y valores por defecto del catálogo
│   ├── hooks/
│   │   └── useScrollReveal.js       # Animaciones de scroll reveal suaves
│   ├── App.jsx                      # Ensamblado principal de la aplicación
│   ├── index.css                    # Directivas de diseño, animaciones y tipografías
│   └── main.jsx                     # Punto de entrada de React
├── .env.example                     # Plantilla oficial de variables de entorno
├── vercel.json                      # Reglas de enrutamiento SPA para Vercel
├── vite.config.js                   # Configuración de Vite y plugins
└── package.json
```

---

## ⚙️ Cómo Ejecutar el Proyecto Localmente

### 1. Clonar el repositorio y acceder a la carpeta:
```bash
git clone https://github.com/Leo-apu/Domus-web.git
cd Domus-web
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Configurar variables de entorno:
Crear un archivo `.env.local` en la raíz tomando como base `.env.example`:
```bash
cp .env.example .env.local
```
Completar las credenciales correspondientes a Firebase, Google Sheets, Cloudinary y Gemini.

### 4. Iniciar servidor de desarrollo local:
```bash
npm run dev
```
Abrir en el navegador: `http://localhost:5173/` (o el puerto asignado por Vite). Para acceder al panel de administración, ingresar a `http://localhost:5173/admin`.

### 5. Compilación para producción:
```bash
npm run build
```
Los archivos optimizados y minificados se generarán en la carpeta `dist/`.

### 6. Auditoría de código:
```bash
npm run lint
```
Ejecuta **Oxlint** garantizando cero advertencias y cero errores en todo el proyecto.

---

## 🚀 Despliegue en Producción (Vercel)

El proyecto está configurado para despliegue continuo en **Vercel**:
* **URL:** [https://domus-jujuy.vercel.app/](https://domus-jujuy.vercel.app/)
* **Framework Preset:** Vite
* **Enrutamiento SPA:** Manejado por [`vercel.json`](vercel.json) para soportar navegación directa a `/admin` sin errores 404.
* **Variables de Entorno en Vercel:** Cargar todas las variables listadas en `.env.example` en **Project Settings $\rightarrow$ Environment Variables** (tipo *Config*) y ejecutar un **Redeploy**.

---

Desarrollado para **Domus Alquileres Temporarios — San Salvador de Jujuy, Argentina**.
