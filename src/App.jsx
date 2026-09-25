import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModernGallery from './components/ModernGallery';
import RoomExplorer from './components/RoomExplorer';
import FeaturesAndAmenities from './components/FeaturesAndAmenities';
import BookingCalculator from './components/BookingCalculator';
import LocationSection from './components/LocationSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBookingBar from './components/MobileBookingBar';

export default function App() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenGallery = () => {
    setIsLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-16 sm:pb-0">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section with Slider & Quick Stats */}
        <Hero onOpenGallery={handleOpenGallery} />

        {/* Modern Airbnb-style Image Gallery with Fullscreen Lightbox */}
        <ModernGallery
          isLightboxOpen={isLightboxOpen}
          setIsLightboxOpen={setIsLightboxOpen}
        />

        {/* Room-by-Room Walkthrough & Breakdown */}
        <RoomExplorer onSelectRoomImage={() => setIsLightboxOpen(true)} />

        {/* All Amenities and Included Services */}
        <FeaturesAndAmenities />

        {/* Stay & Price Calculator with WhatsApp Direct Booking */}
        <BookingCalculator />

        {/* Location in San Salvador de Jujuy, Maps & Nearby Attractions */}
        <LocationSection />

        {/* Guest Reviews & 4.96 Rating Breakdown */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Direct EmailJS Contact Form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements for Mobile & Desktop UX */}
      <FloatingWhatsApp />
      <MobileBookingBar />
    </div>
  );
}
