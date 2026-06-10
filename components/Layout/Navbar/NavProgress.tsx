'use client';

import { motion, useScroll } from 'motion/react';
import styles from './Navbar.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// NavProgress
//
// A 2px horizontal bar at the bottom of the navbar that fills left-to-right
// as the user scrolls down the page. Provides subtle scroll position feedback.
//
// Implementation:
//   - useScroll() returns scrollYProgress as a MotionValue<number> (0 → 1)
//   - motion.div style={{ scaleX }} transforms the bar width via CSS transform
//   - transform-origin: 0 50% anchors the scale to the left edge
//   - NO React state involved — scroll updates bypass the React scheduler
//     entirely, so this never causes re-renders.
//
// This is NOT a "reveal animation" (excluded from Phase 1 constraints).
// It is a functional UI element that requires live scroll tracking.
// ─────────────────────────────────────────────────────────────────────────────

export function NavProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className={styles.progressBar}
            style={{ scaleX: scrollYProgress }}
            aria-hidden="true"
        />
    );
}