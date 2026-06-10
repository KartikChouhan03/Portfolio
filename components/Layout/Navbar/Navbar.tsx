'use client';

import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/useActiveSection';
import { navItems } from '@/data/navigation';
import { meta } from '@/data/meta';
import { NavLink } from './NavLink';
import { NavProgress } from './NavProgress';
import { AnimationToggle } from './AnimationToggle';
import styles from './Navbar.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
//
// Sticky desktop navigation bar. Hidden on mobile — MobileNav replaces it.
//
// Structure:
//   <header>                   role="banner" — ARIA landmark
//     <div.container>
//       <a.logo>               KC monogram
//       <nav>                  role="navigation" — ARIA landmark
//         <ul>
//           <NavLink> × 7      active state from useActiveSection
//       <div.navActions>
//         <AnimationToggle>    pause/resume all animations
//         <a.hireButton>       CTA — scrolls to #contact
//     <NavProgress />          2px scroll progress bar at bottom edge
//
// Active section tracking:
//   useActiveSection() queries [data-section-id] elements via
//   IntersectionObserver. Returns the id of the section in the viewport's
//   middle zone. NavLink receives this as isActive prop.
// ─────────────────────────────────────────────────────────────────────────────

export function Navbar() {
    const activeSection = useActiveSection();

    return (
        <header className={styles.header} role="banner">
            <div className={cn('container', styles.inner)}>

                {/* ── Logo ──────────────────────────────────────────────────────── */}
                <a
                    href="#hero"
                    className={styles.logo}
                    aria-label={`${meta.name} — scroll to top`}
                >
                    {meta.firstName[0]}
                    {meta.lastName[0]}
                </a>

                {/* ── Desktop nav links ─────────────────────────────────────────── */}
                <nav aria-label="Main navigation">
                    <ul className={styles.navLinks} role="list">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.id}
                                item={item}
                                isActive={activeSection === item.id}
                            />
                        ))}
                    </ul>
                </nav>

                {/* ── Actions ───────────────────────────────────────────────────── */}
                <div className={styles.navActions}>
                    <AnimationToggle />
                    <a
                        href="#contact"
                        className={styles.hireButton}
                        aria-label="Navigate to Contact section"
                    >
                        Hire Me
                    </a>
                </div>

            </div>

            {/* Scroll progress indicator — positioned at the header's bottom edge */}
            <NavProgress />
        </header>
    );
}