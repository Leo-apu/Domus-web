# 🏡 Domus Alquileres Temporarios — San Salvador de Jujuy

> Aplicación web moderna de alquiler temporario para múltiples departamentos desarrollada con **React 19**, **Vite**, **Tailwind CSS v4**, arquitectura basada en componentes y backend serverless con **Google Sheets + Google Apps Script**. Inspirada en los estándares de UX/UI y conversión de plataformas líderes mundiales como **Airbnb**, **Vrbo** y **Booking.com**.

🌐 **Sitio en Producción:** [https://domus-jujuy.vercel.app/](https://domus-jujuy.vercel.app/)

---

## 🌟 Principales Características y Funcionalidades

### 1. 🏢 Catálogo Multi-Departamento Dinámico (2 Unidades)
La plataforma permite gestionar y alternar de forma interactiva entre 2 propiedades independientes, adaptando fotos, comodidades, mapas, precios y reservas en tiempo real:
* **Unidad 1: Domus Gorriti (3 Ambientes · Hasta 4 huéspedes)**
  * Dirección: *Av. Juana Manuela Gorriti 613, San Salvador de Jujuy*.
  * A pasos del Parque Lineal Xibi Xibi y a minutos caminando del casco céntrico.
  * 2 dormitorios independientes con **2 baños completos en suite**, balcón al frente y cocina integral.
* **Unidad 2: Domus Suite (Estudio Boutique · Hasta 2 huéspedes)**
  * Dirección: *Av. Párroco Marshke 516, San Salvador de Jujuy*.
  * Conexión estratégica inmediata a Ruta 9 (hacia Purmamarca/Tilcara), Ruta 66 y Terminal.
  * Cama Sommier King Size, espacio de trabajo para nómades digitales, kitchenette equipada y baño moderno.

### 2. 📊 Sistema de Reservas con Google Sheets (Costo $0 / Serverless)
* **Base de datos en la nube sin costo:** Las solicitudes se registran en una hoja de cálculo privada de **Google Sheets** mediante un webhook de **Google Apps Script** (`google-apps-script/Code.gs`).
* **Verificación de disponibilidad en tiempo real:** El sistema consulta si las fechas deseadas están libres para el departamento elegido antes de confirmar.
* **Alertas por correo electrónico:** El anfitrión recibe un email inmediato con el detalle de la solicitud (huésped, fechas, departamento, noches y teléfono).
* **Modal de Reserva Inteligente (`BookingModal.jsx`):** Selector de unidad, validación de fechas, cálculo automático de noches y redirección opcional a WhatsApp.

### 3. 📸 Experiencia Visual y Galería de Fotos (Inspiración Airbnb)
* **Mosaico Bento Collage (Desktop):** Presentación editorial con foto de portada y 4 fotos secundarias con micro-animaciones en hover.
* **Lightbox Interactivo:** Modal con visor en alta definición, tira de miniaturas inferior y navegación por teclado (`←`, `→`, `Esc`).
* **Filtros por Categoría:** Filtros por *Todas las fotos*, *Living*, *Dormitorios*, *Cocina* y *Baños*.
* **Recorrido por Espacios ("Room Explorer"):** Desglose interactivo ambiente por ambiente con metros cuadrados, camas e inventario de comodidades.

### 4. ⚡ Calculadora de Estadía y Reserva Directa por WhatsApp
* Selector de **Check-in**, **Check-out** y **Huéspedes** con cálculo dinámico del total estimado.
* Botón inteligente que genera un mensaje pre-formateado listo para enviar por WhatsApp:
  > *"¡Hola Domus Alquileres! Me gustaría consultar disponibilidad en Domus Gorriti para ingresar el 15/10/2026 y salir el 19/10/2026 (4 noches) para 3 personas. ¿Tienen disponibilidad? ¡Muchas gracias!"*

### 5. 🔒 Privacidad y Cumplimiento Legal (Ley N° 25.326)
* **Modal de Políticas de Privacidad (`PrivacyModal.jsx`):** Cumplimiento con la Ley 25.326 de Protección de Datos Personales de la República Argentina.
* **Tratamiento confidencial:** Se informa con claridad que los datos se usan exclusivamente para la reserva, sin cookies invasivas ni cesión a terceros.
* **Enlace de acceso rápido:** Disponible en el pie de página ([Footer.jsx](src/components/Footer.jsx)) y avisos de seguridad en los formularios.

### 6. 🎯 SEO y Posicionamiento para Motores de Búsqueda
* **Meta Tags y OpenGraph:** Vistas previas enriquecidas al compartir en WhatsApp, Facebook y Twitter.
* **Geolocalización Local:** Coordenadas GPS y tags geográficos para San Salvador de Jujuy.
* **Archivos de Indexación:** `public/robots.txt` y `public/sitemap.xml` para Google Search Console.
* **Schema.org (JSON-LD):** Marcado semántico de `LodgingBusiness` para resultados enriquecidos con estrellas y precios en Google.

---

## 🛠️ Stack Tecnológico

| Tecnología | Rol |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Framework frontend basado en componentes |
| **[Vite 8](https://vite.dev/)** | Bundler y servidor de desarrollo ultrarrápido |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Framework de estilos con diseño responsive |
| **[Lucide React](https://lucide.dev/)** | Iconografía SVG moderna y accesible |
| **[Google Apps Script](https://developers.google.com/apps-script)** | Endpoint serverless para Google Sheets |
| **[EmailJS](https://www.emailjs.com/)** | Envío de correos desde el formulario de contacto |
| **Canvas Confetti** | Micro-interacciones visuales de confirmación |

---

## 📁 Estructura del Proyecto

```text
alquiler-web/
├── public/
│   ├── images/                      # Fotografías WebP optimizadas y logos
│   ├── favicon.svg                  # Favicon SVG
│   ├── robots.txt                   # Directivas para rastreadores de búsqueda
│   └── sitemap.xml                  # Mapa del sitio para Google Search Console
├── google-apps-script/
│   └── Code.gs                      # Script backend para Google Sheets y alertas
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Menú superior sticky con glassmorphism
│   │   ├── Hero.jsx                 # Portada principal con selector de unidad
│   │   ├── ApartmentSelector.jsx    # Catálogo interactivo de los 2 departamentos
│   │   ├── ModernGallery.jsx        # Mosaico tipo Airbnb y filtros de fotos
│   │   ├── PhotoLightbox.jsx        # Visor modal de fotos a pantalla completa
│   │   ├── RoomExplorer.jsx         # Desglose interactivo por ambientes
│   │   ├── ParallaxBanner.jsx       # Banner dinámico según departamento activo
│   │   ├── FeaturesAndAmenities.jsx # Servicios incluidos y métricas dinámicas
│   │   ├── BookingCalculator.jsx    # Calculadora de estadía y WhatsApp
│   │   ├── LocationSection.jsx      # Mapa y puntos turísticos de cada unidad
│   │   ├── ParallaxStory.jsx        # Historia, compromiso y métricas exclusivas
│   │   ├── Testimonials.jsx         # Reseñas reales y desglose de puntaje
│   │   ├── FAQ.jsx                  # Preguntas frecuentes
│   │   ├── ContactForm.jsx          # Formulario con EmailJS
│   │   ├── Footer.jsx               # Pie de página y enlace a privacidad
│   │   ├── PrivacyModal.jsx         # Modal legal y términos (Ley 25.326)
│   │   ├── BookingModal.jsx         # Modal de reserva conectado a Google Sheets
│   │   ├── FloatingWhatsApp.jsx     # Botón flotante de WhatsApp
│   │   └── MobileBookingBar.jsx     # Barra de conversión inferior para móviles
│   ├── data/
│   │   └── apartmentData.js         # Catálogo centralizado (fotos, precios, mapa)
│   ├── services/
│   │   └── bookingService.js        # Comunicación con Google Apps Script
│   ├── hooks/
│   │   └── useScrollReveal.js       # Animaciones de scroll reveal suaves
│   ├── App.jsx                      # Estado global y ensamblado de componentes
│   ├── index.css                    # Directivas de diseño, paleta y tipografías
│   └── main.jsx                     # Punto de entrada de React
├── index.html                       # HTML semántico con SEO y Schema JSON-LD
├── vite.config.js                   # Configuración de Vite y plugins
└── package.json
```

---

## ⚙️ Cómo Ejecutar el Proyecto Localmente

### 1. Clonar o acceder al proyecto:
```bash
cd Alquiler-web
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz (puedes tomar de base `.env.example`):
```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

### 4. Iniciar servidor de desarrollo:
```bash
npm run dev
```
Abrí tu navegador en `http://localhost:5173/`.

### 5. Compilar para producción:
```bash
cmd /c npm run build   # En Windows PowerShell o CMD
npm run build          # En Linux / macOS
```
Los archivos optimizados se generarán en la carpeta `dist/`.

---

## ✏️ Personalización del Catálogo

Todos los departamentos, tarifas, comodidades, coordenadas geográficas y enlaces se administran desde un único archivo:
👉 **[`src/data/apartmentData.js`](src/data/apartmentData.js)**

Para modificar o agregar:
* **Departamentos:** Editar el array `APARTMENTS` (fotos, títulos, capacidad, baños, coordenadas GPS).
* **WhatsApp:** Modificar `APARTMENT_INFO.whatsappLink` y `whatsappPhone`.
* **Horarios:** Ajustar `checkIn`, `checkOut` y `schedule`.

---

## 🚀 Despliegue en Producción

El sitio está actualmente desplegado en **Vercel**:
* **URL:** `https://domus-jujuy.vercel.app/`
* **Configuración:** Vite + React (Zero Config en Vercel).
* **Variables en Vercel:** Las variables del `.env` se cargan en la pestaña *Settings > Environment Variables* del panel de Vercel.

---

Desarrollado con ❤️ para **Domus Alquileres Temporarios — Jujuy, Argentina**.
