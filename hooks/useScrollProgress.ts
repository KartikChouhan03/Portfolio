'use client';

import { useScroll, type MotionValue } from 'motion/react';

// ─────────────────────────────────────────────────────────────────────────────
// useScrollProgress
//
// Returns a MotionValue<number> representing page scroll progress from 0 to 1.
// Built on Framer Motion's useScroll — value updates synchronously with scroll
// position without causing React re-renders.
//
// Phase 1: Used by NavProgress bar only.
// Phase 6: Used by NeuralCore hero fade-out on scroll.
// Phase 2+: Used by parallax and scroll-linked transforms in sections.
//
// Important: scrollYProgress is a MotionValue, NOT React state.
// Never pass it as a regular prop — only to `motion.*` style props or
// useTransform. This keeps scroll-driven updates off the React scheduler.
//
// Usage:
//   const { scrollYProgress } = useScrollProgress()
//   <motion.div style={{ scaleX: scrollYProgress }} />
//
// For element-scoped scroll (within a section):
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: [...] })
//   This is used directly from framer-motion in section components — not here.
// ─────────────────────────────────────────────────────────────────────────────

interface UseScrollProgressResult {
  /** Page scroll progress: 0 at top, 1 at bottom. MotionValue — no re-renders. */
  scrollYProgress: MotionValue<number>;
  /** Raw vertical scroll in pixels. MotionValue — no re-renders. */
  scrollY: MotionValue<number>;
}

export function useScrollProgress(): UseScrollProgressResult {
  const { scrollYProgress, scrollY } = useScroll();
  return { scrollYProgress, scrollY };
}