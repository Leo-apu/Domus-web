import { useState, useEffect } from "react";
import { Menu, X, Phone, CalendarCheck, MapPin, Sparkles } from "lucide-react";
import { APARTMENT_INFO } from "../data/apartmentData";

export default function Navbar({ onOpenBookingModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Fotos", href: "#galeria" },
    { name: "Espacios", href: "#espacios" },
    { name: "Comodidades", href: "#comodidades" },
    { name: "Ubicación", href: "#ubicacion" },
    { name: "Opiniones", href: "#opiniones" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav shadow-sm border-b border-stone-200/80 py-3"
          : "bg-stone-900/60 backdrop-blur-md border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#inicio"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Domus Alquileres Jujuy"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md shadow-rose-600/20 group-hover:scale-105 transition-transform">
              <img
                src="/images/icon.svg"
                alt="Domus Icon"
                className="w-8 h-8 object-contain filter brightness-0 invert"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="text-white font-bold text-lg font-serif"></span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif-title font-bold text-xl tracking-tight leading-none ${
                  isScrolled ? "text-stone-900" : "text-white"
                }`}
              >
                DOMUS
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
                  isScrolled ? "text-rose-600" : "text-rose-400"
                }`}
              >
                Alquileres Jujuy
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-stone-600 hover:text-rose-600 hover:bg-stone-100"
                    : "text-stone-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenBookingModal && onOpenBookingModal()}
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                isScrolled
                  ? "text-stone-700 hover:bg-stone-100"
                  : "text-stone-200 hover:bg-white/10"
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-rose-500" />
              <span>Cotizar Estadía</span>
            </button>

            <a
              href={APARTMENT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Consultar WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl focus:outline-none transition-colors ${
                isScrolled
                  ? "text-stone-800 hover:bg-stone-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-stone-200 shadow-xl px-4 pt-4 pb-6 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-700 hover:text-rose-600 hover:bg-rose-50/60 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <a
                href={APARTMENT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl shadow-sm text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Contactar por WhatsApp</span>
              </a>

              <a
                href="#calculadora"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-stone-100 text-stone-800 font-semibold py-3 px-4 rounded-xl text-sm"
              >
                <CalendarCheck className="w-4 h-4 text-rose-600" />
                <span>Calcular precio de estadía</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
