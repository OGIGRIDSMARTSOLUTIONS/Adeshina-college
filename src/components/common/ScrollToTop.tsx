import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
          return true;
        }
        return false;
      };

      if (scrollToHash()) return;

      // Target may mount a tick later (accordion / route content).
      const t = window.setTimeout(() => {
        if (!scrollToHash()) {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 50);
      return () => window.clearTimeout(t);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
