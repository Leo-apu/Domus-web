import { useState } from "react";
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
import { useScrollReveal } from "./hooks/useScrollReveal";
import { APARTMENTS } from "./data/apartmentData";

export default function App() {
  useScrollReveal();

  const [selectedApartmentId, setSelectedApartmentId] = useState("domus-centro");
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
    APARTMENTS.find((apt) => apt.id === selectedApartmentId) || APARTMENTS[0];

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

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-16 sm:pb-0">
      {/* Top Fixed Header */}
      <Navbar onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section with Slider, Quick Stats & Unit Switcher */}
        <Hero
          onOpenGallery={handleOpenGallery}
          onOpenBookingModal={handleOpenBookingModal}
          selectedApartment={currentApartment}
          onSelectApartment={setSelectedApartmentId}
        />

        {/* 🏢 Interactive Catalog / Selector of the 3 Apartments */}
        <ApartmentSelector
          selectedApartmentId={selectedApartmentId}
          onSelectApartment={setSelectedApartmentId}
          onOpenBookingModal={handleOpenBookingModal}
        />

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
          onOpenBookingModal={handleOpenBookingModal}
          selectedApartment={currentApartment}
          onSelectApartment={setSelectedApartmentId}
        />

        {/* Location in San Salvador de Jujuy, Maps & Nearby Attractions */}
        <LocationSection
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
      <Footer onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} />

      {/* Floating Elements for Mobile & Desktop UX */}
      <FloatingWhatsApp />
      <MobileBookingBar
        onOpenBookingModal={handleOpenBookingModal}
        selectedApartment={currentApartment}
      />

      {/* Google Sheets Booking Request Modal */}
      <BookingModal
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
  );
}
