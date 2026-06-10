import type { Variants } from 'motion/react';

// ─────────────────────────────────────────────────────────────────────────────
// Animation Variants — Single source of truth.
//
// RULE: These are the ONLY animation variant shapes used site-wide.
// No ad-hoc `initial` / `animate` / `variants` objects anywhere else
// in the codebase. If a new shape is genuinely needed, add it here.
//
// REDUCED MOTION: Always use getVariants() rather than importing variants
// directly. This ensures the reduced-motion path is never forgotten.
// ─────────────────────────────────────────────────────────────────────────────

// ── Base variants ─────────────────────────────────────────────────────────────

/**
 * Fade up from 24px below. Primary entrance animation for most content.
 * Use for: headings, paragraphs, cards, form fields.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Simple opacity fade. Use for: overlays, backgrounds, subtle reveals.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Slide in from the right side (positive X). Content comes from off-screen right.
 * Use for: right-side timeline items, alternating card reveals.
 */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Slide in from the left side (negative X). Content comes from off-screen left.
 * Use for: left-side timeline items, alternating card reveals.
 */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Scale up from 90%. Use for: project cards, modal origin, skill nodes.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

// ── Container variant ─────────────────────────────────────────────────────────

/**
 * Stagger container. Apply to the parent motion.div wrapping a list of
 * children that each use one of the variants above.
 *
 * Standard stagger: 80ms between children.
 * Capped stagger: For lists > 6 items, import staggerContainerCapped.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

/**
 * Capped stagger for larger lists (projects grid, skill chips).
 * First 4 children stagger at 50ms. All remaining children appear together
 * after 200ms. Prevents the "still loading" feeling on long lists.
 *
 * Usage note: This requires `custom` prop or manual index tracking —
 * use the staggerContainerCapped on the parent and apply transition
 * overrides on children beyond index 4.
 */
export const staggerContainerCapped: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

// ── Reduced motion variants ───────────────────────────────────────────────────

/**
 * Instant variants for prefers-reduced-motion users.
 * All animations resolve immediately with no spatial movement.
 */
const instantVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const instantContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

// ── Variant resolver ──────────────────────────────────────────────────────────

export type VariantKey =
  | 'fadeUp'
  | 'fadeIn'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'staggerContainer'
  | 'staggerContainerCapped';

const variantMap: Record<VariantKey, Variants> = {
  fadeUp,
  fadeIn,
  slideLeft,
  slideRight,
  scaleIn,
  staggerContainer,
  staggerContainerCapped,
};

/**
 * Resolves the correct variant based on the user's motion preference.
 *
 * ALWAYS use this function instead of importing variants directly.
 * This is the mechanism that makes reduced-motion compliance automatic.
 *
 * @example
 * const variants = getVariants('fadeUp', reducedMotion);
 * <motion.div variants={variants} initial="hidden" whileInView="visible" />
 */
export function getVariants(key: VariantKey, reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return key === 'staggerContainer' || key === 'staggerContainerCapped'
      ? instantContainer
      : instantVariants;
  }
  return variantMap[key];
}

/**
 * Convenience: returns whileInView props with once:true enforced.
 * once:true is MANDATORY site-wide — sections never re-animate on back-scroll.
 *
 * @example
 * <motion.div {...inViewProps} variants={variants} />
 */
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.15 },
} as const;