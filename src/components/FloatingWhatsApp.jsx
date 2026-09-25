import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { APARTMENT_INFO } from '../data/apartmentData';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => {
      setVisible(true);
      setShowBubble(true);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Speech Bubble Tooltip positioned cleanly ABOVE the button, NOT overlapping the center */}
      {showBubble && (
        <div className="hidden sm:flex items-center gap-2 bg-stone-900 text-white text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-2xl border border-stone-700 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <span>👋 ¡Hola! Consultanos disponibilidad en Jujuy</span>
          <button
            onClick={() => setShowBubble(false)}
            className="text-stone-400 hover:text-white p-0.5 ml-1 transition-colors"
            aria-label="Cerrar sugerencia"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with WhatsApp SVG */}
      <a
        href={APARTMENT_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 animate-pulse-whatsapp group relative"
      >
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.184 1.564 5.941l-1.564 5.714 5.861-1.538c1.713.935 3.676 1.467 5.767 1.467 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>

        {/* Ping ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>
      </a>
    </aside>
  );
}
