import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ApartmentSelector from "./components/ApartmentSelector";
import ModernGallery from "./components/ModernGallery";
import RoomExplorer from "./components/RoomExplorer";
import FeaturesAndAmenities from "./components/FeaturesAndAmenities";
import BookingCalculator from "./components/BookingCalculator";
import LocationSection from "./components/LocationSection";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MobileBookingBar from "./components/MobileBookingBar";
import BookingModal from "./components/BookingModal";
import PrivacyModal from "./components/PrivacyModal";
import ParallaxBanner from "./components/ParallaxBanner";
import ParallaxStory from "./components/ParallaxStory";
import { Loader2 } from "lucide-react";

// Módulo de Administración & Autenticación (Lazy loaded para rendimiento CWV óptimo)
import { AuthProvider } from "./context/AuthContext";
import { subscribeToApartments } from "./services/apartmentService";

const AdminPage = lazy(() => import("./components/admin/AdminPage"));

import { useScrollReveal } from "./hooks/useScrollReveal";
import { APARTMENTS } from "./data/apartmentData";

export default function App() {
  useScrollReveal();

  // 1. Enrutador ligero sin dependencias pesadas
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      setCurrentPath(path.toLowerCase());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 2. Estado reactivo de departamentos (desde Firestore con fallback a apartmentData.js)
  const [apartments, setApartments] = useState(APARTMENTS);
  const [selectedApartmentId, setSelectedApartmentId] = useState(
    APARTMENTS[0]?.id || "domus-centro"
  );

  useEffect(() => {
    const unsubscribe = subscribeToApartments((list) => {
      if (list && list.length > 0) {
        // En la web pública solo mostramos los departamentos activos
        const activeUnits = list.filter((a) => a.isActive !== false);
        if (activeUnits.length > 0) {
          setApartments(activeUnits);
          // Si el seleccionado ya no existe, seleccionamos el primero activo
          setSelectedApartmentId((prev) => {
            const exists = activeUnits.some((a) => a.id === prev);
            return exists ? prev : activeUnits[0].id;
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Modales y estados de reserva
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    apartmentId: "domus-centro",
  });

  const currentApartment =
    apartments.find((apt) => apt.id === selectedApartmentId) || apartments[0] || APARTMENTS[0];

  const handleOpenGallery = () => {
    setIsLightboxOpen(true);
  };

  const handleOpenBookingModal = (data = {}) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
      apartmentId: data.apartmentId || selectedApartmentId,
    }));
    if (data.apartmentId && data.apartmentId !== selectedApartmentId) {
      setSelectedApartmentId(data.apartmentId);
    }
    setIsBookingModalOpen(true);
  };

  // Si la ruta es /admin o hash #admin, mostramos el Panel de Administración
  const isAdminRoute =
    currentPath.startsWith("/admin") ||
    (typeof window !== "undefined" && window.location.hash === "#admin");

  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Suspense
          fallback={
            <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center space-y-4 text-white">
              <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
              <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
                Cargando panel de administración...
              </p>
            </div>
          }
        >
          <AdminPage onBackToSite={() => navigate("/")} />
        </Suspense>
      </AuthProvider>
    );
  }

  // Vista Pública de la Landing Page
  return (
    <AuthProvider>
      <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-16 sm:pb-0">
        {/* Top Fixed Header */}
        <Navbar onOpenBookingModal={handleOpenBookingModal} />

        {/* Main Page Content */}
        <main className="flex-1">
          {/* Hero Section with Slider, Quick Stats & Unit Switcher */}
          <Hero
            apartments={apartments}
            onOpenGallery={handleOpenGallery}
            onOpenBookingModal={handleOpenBookingModal}
            selectedApartment={currentApartment}
            onSelectApartment={setSelectedApartmentId}
          />

          {/* 🏢 Interactive Catalog / Selector of Apartments (Solo si hay más de 1 activa) */}
          {apartments.length > 1 && (
            <ApartmentSelector
              apartments={apartments}
              selectedApartmentId={selectedApartmentId}
              onSelectApartment={setSelectedApartmentId}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          {/* Modern Airbnb-style Image Gallery for the active apartment */}
          <ModernGallery
            isLightboxOpen={isLightboxOpen}
            setIsLightboxOpen={setIsLightboxOpen}
            apartment={currentApartment}
          />

          {/* Room-by-Room Walkthrough & Breakdown for the active apartment */}
          <RoomExplorer
            onSelectRoomImage={() => setIsLightboxOpen(true)}
            apartment={currentApartment}
          />

          {/* 🏔️ Parallax Experience Banner */}
          <ParallaxBanner
            selectedApartment={currentApartment}
            onOpenBookingModal={handleOpenBookingModal}
          />

          {/* All Amenities and Included Services with Warm Glow */}
          <FeaturesAndAmenities selectedApartment={currentApartment} />

          {/* Stay & Price Calculator with WhatsApp Direct Booking & Google Sheets Action */}
          <BookingCalculator
            apartments={apartments}
            onOpenBookingModal={handleOpenBookingModal}
            selectedApartment={currentApartment}
            onSelectApartment={setSelectedApartmentId}
          />

          {/* Location in San Salvador de Jujuy, Maps & Nearby Attractions */}
          <LocationSection
            apartments={apartments}
            selectedApartment={currentApartment}
            onSelectApartment={setSelectedApartmentId}
          />

          {/* 🌟 2nd Parallax Section: History, Quality & Animated Stats Counters */}
          <ParallaxStory
            selectedApartment={currentApartment}
            onOpenBookingModal={handleOpenBookingModal}
          />

          {/* Guest Reviews & 4.96 Rating Breakdown */}
          <Testimonials />

          {/* Frequently Asked Questions */}
          <FAQ />

          {/* Direct EmailJS Contact Form */}
          <ContactForm />
        </main>

        {/* Footer */}
        <Footer
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          onNavigateAdmin={() => navigate("/admin")}
        />

        {/* Floating Elements for Mobile & Desktop UX */}
        <FloatingWhatsApp />
        <MobileBookingBar
          onOpenBookingModal={handleOpenBookingModal}
          selectedApartment={currentApartment}
        />

        {/* Google Sheets Booking Request Modal */}
        <BookingModal
          apartments={apartments}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialCheckIn={bookingData.checkIn}
          initialCheckOut={bookingData.checkOut}
          initialGuests={bookingData.guests}
          initialApartmentId={bookingData.apartmentId || selectedApartmentId}
        />

        {/* Legal & Privacy Policy Modal (Ley 25.326) */}
        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
