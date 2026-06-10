'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, Variants } from 'motion/react';
import { useLenis } from 'lenis/react';
import { navItems } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useIntro } from '@/components/providers/IntroProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import styles from './Dock.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// Dock
//
// macOS-inspired floating bottom dock navigation.
// Replaces both the desktop navbar links and the MobileNav on all viewports.
//
// Behaviour:
//   - Fixed bottom-center of viewport
//   - Glassmorphism pill container
//   - Hover: individual item scales up (CSS transform only, no JS)
//   - Active: emerald accent on icon character + label
//   - Click: Lenis smooth scroll to target section
//   - Auto-hides after 4s of no mouse movement (desktop), always visible (mobile)
//   - Reappears instantly on mouse move or touch
// ─────────────────────────────────────────────────────────────────────────────

// Single-character glyphs for each nav item — minimal, legible, not icons
const GLYPHS: Record<string, string> = {
    hero: '⌂',
    about: '◉',
    projects: '◈',
    lab: '⬡',
    skills: '◎',
    journey: '◷',
    contact: '✉',
};

export function Dock() {
    const activeSection = useActiveSection();
    const lenis = useLenis();
    const { introState } = useIntro();
    const isReduced = useReducedMotion();
    const [visible, setVisible] = useState(true);
    const [hovered, setHovered] = useState<string | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isMobile = useRef(false);

    const isInteractive = introState === 'done';
    const isVisibleState = introState === 'transforming' || introState === 'done';

    // Detect mobile once on mount
    useEffect(() => {
        isMobile.current = window.matchMedia('(pointer: coarse)').matches;
    }, []);

    const resetHideTimer = useCallback(() => {
        if (isMobile.current || !isInteractive) return;
        setVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setVisible(false), 4000);
    }, [isInteractive]);

    useEffect(() => {
        if (!isInteractive) return;

        // Start the initial hide timer on desktop
        resetHideTimer();

        const onMove = () => resetHideTimer();
        const onTouch = () => setVisible(true);

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('touchstart', onTouch, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchstart', onTouch);
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, [resetHideTimer, isInteractive]);

    const handleNavClick = useCallback(
        (id: string) => {
            if (!isInteractive) return;
            const target = document.getElementById(id);
            if (!target) return;
            if (lenis) {
                lenis.scrollTo(target, { duration: 1.2 });
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        },
        [lenis, isInteractive],
    );

    if (!isVisibleState) return null;

    // Item animations config - skip if reduced motion is enabled
    const itemVariants: Variants = isReduced ? {} : {
        hidden: { opacity: 0, y: 8 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 + i * 0.04,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <nav
            className={cn(
                styles.dock, 
                !visible && styles.dockHidden,
                !isInteractive && styles.dockNotInteractive
            )}
            style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
            aria-label="Main navigation dock"
            onMouseEnter={() => {
                if (!isInteractive) return;
                if (hideTimer.current) clearTimeout(hideTimer.current);
                setVisible(true);
            }}
            onMouseLeave={resetHideTimer}
        >
            <motion.div 
                layoutId="capsule-dock"
                transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                    mass: 1.0
                }}
                className={styles.pill}
            >
                {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const isHovered = hovered === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            type="button"
                            custom={index}
                            initial={isReduced ? "visible" : "hidden"}
                            animate="visible"
                            variants={itemVariants}
                            aria-label={item.ariaLabel}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                styles.item,
                                isActive && styles.itemActive,
                                isHovered && styles.itemHovered,
                            )}
                            onClick={() => handleNavClick(item.id)}
                            onMouseEnter={() => isInteractive && setHovered(item.id)}
                            onMouseLeave={() => isInteractive && setHovered(null)}
                        >
                            <span className={styles.glyph} aria-hidden="true">
                                {GLYPHS[item.id] ?? '·'}
                            </span>
                            <span className={styles.label}>{item.label}</span>
                            {isActive && (
                                <span className={styles.activeDot} aria-hidden="true" />
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>
        </nav>
    );
}

export default Dock;