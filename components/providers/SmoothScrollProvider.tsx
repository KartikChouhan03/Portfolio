'use client';

import { type ReactNode } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Smooth Scroll Provider
//
// Wraps the entire page with Lenis smooth scroll via ReactLenis root.
// The `root` prop attaches Lenis to document.documentElement, which is
// the correct target for whole-page smooth scroll in Next.js App Router.
//
// Phase 1: Basic smooth scroll — Lenis handles its own RAF loop (autoRaf: true).
// Phase 2: Will add useLenis() + Framer Motion scroll sync for useScroll hooks.
//
// Lenis `prevent` option ensures interactive elements with their own scroll
// contexts (textareas, modals with .no-lenis class) use native browser scroll.
// ─────────────────────────────────────────────────────────────────────────────

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        // How much the animation "catches up" per frame (0 = no smoothing, 1 = instant).
        // 0.1 gives a comfortable 100ms trailing feel.
        lerp: 0.1,

        // Fallback duration when lerp is not used (touch devices).
        duration: 1.2,

        // Smooth mouse wheel scrolling (the primary feature on desktop).
        smoothWheel: true,

        // Lenis manages its own requestAnimationFrame loop.
        // Set to false in Phase 2 to integrate with Framer Motion's RAF.
        autoRaf: true,

        // Prevent Lenis from intercepting scroll on specific elements.
        // Elements with .no-lenis class use native browser scroll.
        // Inputs and textareas always use native scroll.
        prevent: (node: HTMLElement) => {
          return (
            node.tagName === 'TEXTAREA' ||
            node.tagName === 'INPUT' ||
            node.getAttribute('data-no-lenis') === 'true' ||
            node.classList.contains('no-lenis')
          );
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}