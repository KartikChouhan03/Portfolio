'use client';

import { cn } from '@/lib/utils';
import { meta } from '@/data/meta';
import { NavProgress } from './NavProgress';
import { AnimationToggle } from './AnimationToggle';
import { ThemeToggle } from './ThemeToggle';
import styles from './Navbar.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
//
// Minimal sticky header — logo left, animation toggle + Theme toggle + Hire Me right.
// Navigation links have moved to the floating Dock component.
//
// Kept intentionally lightweight so it doesn't compete with the Hero section.
// The progress bar at the bottom edge gives subtle scroll feedback.
// ─────────────────────────────────────────────────────────────────────────────

export function Navbar() {
  return (
    <header className={styles.header} role="banner">
      <div className={cn('container', styles.inner)}>

        {/* Logo */}
        <a
          href="#hero"
          className={styles.logo}
          aria-label={`${meta.name} — scroll to top`}
        >
          {meta.firstName[0]}
          {meta.lastName[0]}
        </a>

        {/* Right actions */}
        <div className={styles.navActions}>
          <AnimationToggle />
          <ThemeToggle />
          <a
            href="#contact"
            className={styles.hireButton}
            aria-label="Navigate to Contact section"
          >
            Hire Me
          </a>
        </div>

      </div>

      <NavProgress />
    </header>
  );
}