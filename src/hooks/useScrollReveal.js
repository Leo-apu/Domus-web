import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {

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

    observeAll();

    const timeoutId = setTimeout(observeAll, 200);

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
