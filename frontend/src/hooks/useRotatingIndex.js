import { useEffect, useState } from 'react';

/**
 * Cycles an index from 0 to length-1 every `intervalMs` milliseconds.
 */
export function useRotatingIndex(length, intervalMs) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!length) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % length), intervalMs);
    return () => window.clearInterval(timer);
  }, [length, intervalMs]);

  return index;
}
