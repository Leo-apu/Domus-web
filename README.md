# 🏡 Domus Alquileres Temporarios — San Salvador de Jujuy

> Aplicación web moderna de alquiler temporario desarrollada con **React 19**, **Vite**, **Tailwind CSS v4** y arquitectura basada en componentes. Inspirada en los estándares de UX/UI y conversión de plataformas líderes mundiales como **Airbnb**, **Vrbo** y **Booking.com**.

---

## 🌟 Principales Mejoras y Novedades Implementadas

### 1. 📸 Nueva Experiencia Visual y Galería de Fotos (Inspiración Airbnb)
- **Mosaico Destacado 5 Fotos**: Presentación en collage con foto principal de gran formato y grilla secundaria con efectos de hover y contador flotante `Ver todas las fotos (8)`.
- **Lightbox Interactivo a Pantalla Completa**: Modal con visor de alta definición, tira de miniaturas inferior, navegación por teclado (`←`, `→`, `Esc`) y descripción detallada de cada espacio.
- **Filtros por Categoría**: Pestañas para explorar por *Todas las fotos*, *Living y Comedor*, *Dormitorios*, *Baños en Suite* y *Cocina*.
- **Recorrido por Espacios ("Room Explorer")**: Desglose interactivo ambiente por ambiente con superficies en m², tipo de camas, inventario de comodidades y fotos en alta resolución.

### 2. ⚡ Calculadora de Estadía y Reserva Directa por WhatsApp
- Selector interactivo de **Fecha de Check-in**, **Fecha de Check-out** y **Cantidad de Huéspedes** (1 a 4 personas).
- Cálculo dinámico de noches totales y resumen de beneficios incluidos.
- **Botón inteligente de WhatsApp**: Genera automáticamente un mensaje pre-formateado con las fechas, noches y cantidad de huéspedes exactos, listo para enviar con un solo clic:
  > *"¡Hola Domus Alquileres! Me gustaría consultar disponibilidad para ingresar el 15/10/2026 y salir el 19/10/2026 (4 noches) para 3 personas. ¿Tienen disponibilidad y cuál sería la tarifa? ¡Muchas gracias!"*

### 3. 🚀 Optimización Extrema de Rendimiento (Web Performance)
- **Compresión WebP Inteligente**: Optimización de la imagen principal de portada (reducción de **2.6 MB** a **394 KB**, logrando un **85% de ahorro en ancho de banda** sin pérdida visible de calidad).
- **Cero jQuery**: Eliminación total de dependencias obsoletas (jQuery, WOW.js, Bootstrap 4 antiguo, Slick Slider) reemplazándolas por React puro y CSS moderno ultraligero.
- **Iconografía SVG con Lucide React**: Reemplazo de fuentes pesadas de iconos por SVGs modernos, limpios y accesibles.
- **Carga Diferida (`loading="lazy"`)**: Carga progresiva de imágenes a medida que el usuario hace scroll.

### 4. 🎯 SEO y Posicionamiento para Atraer Clientes
- **Meta Tags Completos**: Título, descripción estratégica y palabras clave enfocadas en intención de búsqueda (*"alquiler temporario jujuy"*, *"departamento jujuy centro"*, *"alquiler por dia san salvador de jujuy"*).
- **OpenGraph & Twitter Cards**: Vistas previas enriquecidas al compartir el enlace por WhatsApp, Facebook o Instagram.
- **Geolocalización Local (San Salvador de Jujuy)**: Etiquetas `geo.region`, `geo.placename` y coordenadas GPS.
- **Datos Estructurados Schema.org (JSON-LD)**: Marcado semántico de `LodgingBusiness` y `Apartment` con servicios, dirección, coordenadas y calificación para aparecer con **Rich Snippets (estrellas y precio)** en los resultados de Google.

### 5. 📱 Estándares UX/UI y Diseño Mobile-First
- **Barra de Acción Flotante en Móviles**: Barra inferior fijada en pantallas de celulares con acceso inmediato a "Cotizar" y "WhatsApp", aumentando las conversiones en dispositivos móviles.
- **Botón Flotante de WhatsApp**: Botón flotante pulsante con tooltip animado de asistencia.
- **Formulario de Contacto Funcional con EmailJS**: Integración con las credenciales de EmailJS configuradas, con estados de carga, confirmación visual y celebración con confeti.
- **Guía de Puntos de Interés y Distancias**: Tarjetas con distancias a pie hacia Plaza Belgrano, Peatonal Belgrano, Casa de Gobierno y conexión rápida hacia la Quebrada de Humahuaca (Purmamarca / Tilcara).

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/)
- **Empaquetador & Servidor**: [Vite 8](https://vite.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Email**: [@emailjs/browser](https://www.emailjs.com/)
- **Micro-interacciones**: Canvas Confetti

---

## 📁 Estructura del Proyecto

```text
alquiler-web/
├── public/
│   ├── images/              # Fotografías WebP optimizadas y logos SVG
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Menú superior sticky con glassmorphism
│   │   ├── Hero.jsx                 # Portada principal con slider dinámico
│   │   ├── ModernGallery.jsx        # Mosaico tipo Airbnb y filtros de fotos
│   │   ├── PhotoLightbox.jsx        # Visor modal a pantalla completa
│   │   ├── RoomExplorer.jsx         # Desglose interactivo por ambientes
│   │   ├── FeaturesAndAmenities.jsx # Servicios incluidos con iconos
│   │   ├── BookingCalculator.jsx    # Calculadora de estadía y WhatsApp
│   │   ├── LocationSection.jsx      # Mapa interactivo y puntos cercanos
│   │   ├── Testimonials.jsx         # Reseñas reales y desglose de puntaje
│   │   ├── FAQ.jsx                  # Acordeón de preguntas frecuentes
│   │   ├── ContactForm.jsx          # Formulario con EmailJS
│   │   ├── Footer.jsx               # Pie de página y créditos
│   │   ├── FloatingWhatsApp.jsx     # Botón pulsante flotante
│   │   └── MobileBookingBar.jsx     # Barra de conversión móvil
│   ├── data/
│   │   └── apartmentData.js         # Configuración central (datos, fotos, contacto)
│   ├── App.jsx                      # Ensamblado principal de la aplicación
│   ├── index.css                    # Directivas Tailwind v4 y animaciones
│   └── main.jsx                     # Punto de entrada de React
├── index.html                       # HTML5 semántico con SEO y Schema JSON-LD
├── vite.config.js                   # Configuración de Vite y Tailwind
└── package.json
```

---

## ⚙️ Cómo Ejecutar el Proyecto Localmente

### 1. Clonar o acceder a la carpeta:
```bash
cd alquiler-web
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
Abrí tu navegador en `http://localhost:5173/`.

### 4. Compilar para producción:
```bash
npm run build
```
Los archivos optimizados para producción se generarán en la carpeta `dist/`.

---

## ✏️ Cómo Personalizar Datos y Contenidos

Todos los textos, número de WhatsApp, fotos y servicios están centralizados en un único archivo:
👉 **[`src/data/apartmentData.js`](src/data/apartmentData.js)**

Para modificar:
- **Número de WhatsApp**: Modificá `whatsappLink` y `whatsappPhone`.
- **Precios o capacidad**: Modificá el objeto `capacity`.
- **Credenciales EmailJS**: Editá `emailJsConfig` (serviceId, templateId, publicKey).
- **Fotografías**: Agregá o reemplazá archivos en `public/images/` y actualizá el array `GALLERY_IMAGES`.

---

## 🚀 Despliegue en la Web (Hosting Gratuito)

Este proyecto está 100% listo para desplegarse en:
- **Vercel**: Importá el repositorio desde GitHub y seleccioná el preset de Vite.
- **Netlify**: Arrastrá la carpeta `dist/` generada por `npm run build` o conectá tu repo con build command `npm run build` y publish directory `dist`.
- **GitHub Pages**: Configurable mediante GitHub Actions con Vite.

---

Desarrollado con ❤️ para **Domus Alquileres Jujuy**.
