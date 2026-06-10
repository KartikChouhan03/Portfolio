'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { AnimationToggle } from '../AnimationToggle';
import { MobileNavSheet } from './MobileNavSheet';
import styles from './MobileNav.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// MobileNav
//
// Fixed bottom navigation bar visible only on mobile viewports (<768px).
// It houses the menu trigger button and quick actions, while delegating the
// overlay panel representation to MobileNavSheet.
// ─────────────────────────────────────────────────────────────────────────────

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <div className={styles.mobileNav}>
      {/* Menu Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={styles.trigger}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu size={16} aria-hidden="true" />
        <span>Menu</span>
      </button>

      {/* Right Quick Actions */}
      <div className={styles.rightActions}>
        <AnimationToggle />
        <a
          href="#contact"
          className={styles.hireButtonMobile}
          aria-label="Navigate to Contact section"
        >
          Hire Me
        </a>
      </div>

      {/* Slide-up sheet overlay */}
      <MobileNavSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeSection={activeSection}
      />
    </div>
  );
}
