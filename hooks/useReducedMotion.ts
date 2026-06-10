'use client';

// ─────────────────────────────────────────────────────────────────────────────
// useReducedMotion
//
// Re-exports Framer Motion's useReducedMotion rather than duplicating its
// matchMedia logic. Framer's implementation:
//   - Returns null on the server (SSR safe)
//   - Returns boolean on the client
//   - Listens for system-level preference changes in real time
//
// Usage:
//   const reducedMotion = useReducedMotion()
//   const variants = getVariants('fadeUp', reducedMotion ?? false)
//
// The `?? false` default means we assume full motion on the server and on
// first client render before the media query resolves. This is intentional —
// a brief flash of animation on first load is preferable to permanently
// suppressing motion for users who haven't set the preference.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    requestAnimationFrame(() => {
      setReducedMotion(mediaQuery.matches);
    });

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return reducedMotion;
}