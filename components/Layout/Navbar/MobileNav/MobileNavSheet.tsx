'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';
import styles from './MobileNav.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// MobileNavSheet
//
// The slide-up bottom sheet revealed when the mobile menu button is tapped.
//
// Structure:
//   backdrop — semi-transparent overlay, click to close
//   sheet    — panel that slides up from the bottom edge
//     drag handle indicator (visual only)
//     header: "Navigation" label + close button
//     nav grid: 3-column × 3-row grid of section buttons
//
// Animation: CSS transform translateY — no Framer Motion in Phase 1.
//   Phase 2 will add Framer Motion drag-to-dismiss behaviour.
//
// Scroll lock: uses Lenis .stop()/.start() rather than overflow:hidden
//   on body/html, which conflicts with Lenis's own scroll management.
//
// Accessibility:
//   - role="dialog" aria-modal="true" on sheet
//   - Focus moves to close button on open
//   - Escape key closes sheet
//   - aria-hidden="true" on backdrop (presentational)
//   - aria-current="page" on active nav button
//
// Props received from MobileNav (parent):
//   isOpen        — controls visibility
//   onClose       — called to close the sheet
//   activeSection — from parent's useActiveSection() call (avoids duplicate observer)
// ─────────────────────────────────────────────────────────────────────────────

interface MobileNavSheetProps {
    isOpen: boolean;
    onClose: () => void;
    activeSection: string;
}

export function MobileNavSheet({
    isOpen,
    onClose,
    activeSection,
}: MobileNavSheetProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const lenis = useLenis();

    // ── Scroll lock ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
        // Always restore scroll on unmount
        return () => {
            lenis?.start();
        };
    }, [isOpen, lenis]);

    // ── Focus management ────────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen) {
            // Small delay to allow CSS transition to begin before focusing
            const timer = setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // ── Keyboard handling ───────────────────────────────────────────────────
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // ── Nav link handler ────────────────────────────────────────────────────
    const handleNavClick = useCallback(
        (id: string) => {
            // Close sheet first
            onClose();

            // After sheet begins closing, scroll to target via Lenis
            setTimeout(() => {
                const target = document.getElementById(id);
                if (!target) return;

                if (lenis) {
                    lenis.scrollTo(target, { duration: 1.2 });
                } else {
                    // Fallback: native scroll if Lenis is unavailable
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 120); // Delay allows CSS transition to start before scroll fires
        },
        [onClose, lenis],
    );

    return (
        <>
            {/* ── Backdrop ──────────────────────────────────────────────────── */}
            <div
                className={cn(styles.backdrop, isOpen && styles.backdropVisible)}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* ── Sheet ─────────────────────────────────────────────────────── */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                aria-hidden={!isOpen}
                className={cn(styles.sheet, isOpen && styles.sheetVisible)}
            >
                {/* Visual drag handle — decorative only in Phase 1 */}
                <div className={styles.dragHandle} aria-hidden="true" />

                {/* Header */}
                <div className={styles.sheetHeader}>
                    <span className={styles.sheetTitle} id="mobile-nav-title">
                        Navigation
                    </span>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close navigation menu"
                        className={styles.closeButton}
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

                {/* Nav links — 3-column grid */}
                <nav aria-label="Mobile navigation" aria-labelledby="mobile-nav-title">
                    <ul className={styles.sheetNav} role="list">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    aria-label={item.ariaLabel}
                                    aria-current={activeSection === item.id ? 'page' : undefined}
                                    className={cn(
                                        styles.sheetNavLink,
                                        activeSection === item.id && styles.sheetNavLinkActive,
                                    )}
                                    onClick={() => handleNavClick(item.id)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}