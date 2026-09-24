import { useEffect } from 'react';

/**
 * Locks page scrolling while a modal is open.
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
