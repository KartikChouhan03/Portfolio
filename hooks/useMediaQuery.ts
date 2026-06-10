'use client';

import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useMediaQuery
//
// Returns true when the given CSS media query matches the current viewport.
// SSR-safe: defaults to false on the server and on first client render.
// Updates reactively when the viewport changes (resize, orientation change).
//
// Common queries are exported as constants below — prefer these over
// raw strings to keep breakpoints consistent across the codebase.
//
// Usage:
//   const isMobile = useMediaQuery(MQ.mobile)
//   const prefersReducedMotion = useMediaQuery(MQ.reducedMotion)
// ─────────────────────────────────────────────────────────────────────────────

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Guard: matchMedia unavailable in some environments (jsdom, older browsers)
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value synchronously after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use addEventListener (modern) with fallback to addListener (deprecated)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Safari < 14 fallback
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}

// ── Media query constants ──────────────────────────────────────────────────────
// Single source of truth for breakpoints used in JavaScript.
// Keep these in sync with the breakpoint values in CSS.

export const MQ = {
  /** Max-width 768px — mobile layouts, NeuralCore CSS fallback */
  mobile: '(max-width: 768px)',
  /** Max-width 1023px — tablet layouts */
  tablet: '(max-width: 1023px)',
  /** Min-width 1024px — desktop layouts */
  desktop: '(min-width: 1024px)',
  /** System reduced-motion preference */
  reducedMotion: '(prefers-reduced-motion: reduce)',
  /** Coarse pointer — touch devices (imprecise hover) */
  touch: '(pointer: coarse)',
  /** Fine pointer — mouse/trackpad (precise hover) */
  mouse: '(pointer: fine)',
} as const;