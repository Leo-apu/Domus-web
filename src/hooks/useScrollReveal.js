import { useEffect } from 'react';

/**
 * Hook para animaciones de entrada al hacer scroll (reemplazo moderno y liviano de WOW.js)
 * Observa todos los elementos con la clase `.reveal-init` y les agrega `.revealed` al entrar al viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Si el navegador no soporta IntersectionObserver, revelar todo de inmediato
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-init').forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal-init:not(.revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    // Observar elementos iniciales
    observeAll();

    // Pequeño timeout por si alguna imagen o fuente retrasa el layout inicial
    const timeoutId = setTimeout(observeAll, 200);

    // MutationObserver para componentes montados dinámicamente
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

