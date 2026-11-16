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

import { AuthProvider } from "./context/AuthContext";
import { subscribeToApartments, getSiteSettings } from "./services/apartmentService";

const AdminPage = lazy(() => import("./components/admin/AdminPage"));

import { useScrollReveal } from "./hooks/useScrollReveal";
import { APARTMENTS } from "./data/apartmentData";

export default function App() {
  useScrollReveal();

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

  const [apartments, setApartments] = useState(APARTMENTS);
  const [selectedApartmentId, setSelectedApartmentId] = useState(
    APARTMENTS[0]?.id || "domus-centro"
  );

  useEffect(() => {
    const unsubscribe = subscribeToApartments((list) => {
      if (list && list.length > 0) {

        const activeUnits = list.filter((a) => a.isActive !== false);
        if (activeUnits.length > 0) {
          setApartments(activeUnits);

          setSelectedApartmentId((prev) => {
            const exists = activeUnits.some((a) => a.id === prev);
            return exists ? prev : activeUnits[0].id;
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) setSiteSettings(data);
    });
  }, []);

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

  return (
    <AuthProvider>
      <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-16 sm:pb-0">

        <Navbar onOpenBookingModal={handleOpenBookingModal} />

        <main className="flex-1">

          <Hero
            apartments={apartments}
            onOpenGallery={handleOpenGallery}
            onOpenBookingModal={handleOpenBookingModal}
            selectedApartment={currentApartment}
            onSelectApartment={setSelectedApartmentId}
          />

          {apartments.length > 1 && (
            <ApartmentSelector
              apartments={apartments}
              selectedApartmentId={selectedApartmentId}
              onSelectApartment={setSelectedApartmentId}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          <ModernGallery
            isLightboxOpen={isLightboxOpen}
            setIsLightboxOpen={setIsLightboxOpen}
            apartment={currentApartment}
          />

          <RoomExplorer
            onSelectRoomImage={() => setIsLightboxOpen(true)}
            apartment={currentApartment}
          />

          <ParallaxBanner
            selectedApartment={currentApartment}
            onOpenBookingModal={handleOpenBookingModal}
          />

          <FeaturesAndAmenities selectedApartment={currentApartment} />

          <BookingCalculator
            apartments={apartments}
            onOpenBookingModal={handleOpenBookingModal}
            selectedApartment={currentApartment}
            onSelectApartment={setSelectedApartmentId}
          />

          <LocationSection
            apartments={apartments}
            selectedApartment={currentApartment}
            onSelectApartment={setSelectedApartmentId}
          />

          <ParallaxStory
            selectedApartment={currentApartment}
            onOpenBookingModal={handleOpenBookingModal}
          />

          <Testimonials />

          <FAQ />

          <ContactForm />
        </main>

        <Footer
          siteSettings={siteSettings}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          onNavigateAdmin={() => navigate("/admin")}
        />

        <FloatingWhatsApp />
        <MobileBookingBar
          onOpenBookingModal={handleOpenBookingModal}
          selectedApartment={currentApartment}
        />

        <BookingModal
          apartments={apartments}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialCheckIn={bookingData.checkIn}
          initialCheckOut={bookingData.checkOut}
          initialGuests={bookingData.guests}
          initialApartmentId={bookingData.apartmentId || selectedApartmentId}
        />

        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
