'use client';

import { useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useActiveSection
//
// Returns the `id` of the section currently occupying the middle zone of the
// viewport. Used by Navbar and MobileNav to highlight the active nav item.
//
// Detection strategy:
//   - rootMargin of -40% top/bottom creates a 20% "active zone" in the middle
//     of the viewport. A section is "active" when it intersects this zone.
//   - Uses pixel-based rootMargin (not %) so it recalculates correctly when
//     mobile browser toolbars appear/disappear (dynamic viewport height).
//   - When multiple sections intersect simultaneously (fast scroll), the
//     topmost section in DOM order wins — matches natural reading direction.
//   - requestAnimationFrame defers the initial observer setup to ensure
//     the full DOM is painted before we query section elements.
//
// Server Component sections set `data-section-id` as a static JSX attribute.
// Client Component sections call useSectionObserver() which sets it
// dynamically. Both approaches are compatible with this hook.
// ─────────────────────────────────────────────────────────────────────────────

/** The percentage of the viewport height to use as the active zone margin. */
const ACTIVE_ZONE_RATIO = 0.4;

/** Debounce delay in ms for the resize handler. */
const RESIZE_DEBOUNCE_MS = 150;

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const setupObserver = useCallback(() => {
    // Query all registered sections
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section-id]'),
    );

    if (sections.length === 0) return undefined;

    // Pixel-based margin so it's stable across viewport height changes
    const margin = Math.round(window.innerHeight * ACTIVE_ZONE_RATIO);

    // Track which section IDs are currently inside the active zone
    const intersectingIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Update the intersecting set from the changed entries
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-section-id');
          if (!id) return;

          if (entry.isIntersecting) {
            intersectingIds.add(id);
          } else {
            intersectingIds.delete(id);
          }
        });

        // Find the topmost intersecting section (in DOM order = visual order)
        // Re-query DOM order to handle any dynamic section additions
        const allSections = document.querySelectorAll<HTMLElement>(
          '[data-section-id]',
        );

        for (const section of allSections) {
          const id = section.getAttribute('data-section-id');
          if (id && intersectingIds.has(id)) {
            setActiveSection(id);
            return;
          }
        }
        // If nothing intersects (between sections during fast scroll),
        // keep the previous activeSection — avoids jarring nav flicker
      },
      {
        rootMargin: `-${margin}px 0px -${margin}px 0px`,
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return observer;
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let resizeTimer: ReturnType<typeof setTimeout>;

    // Defer setup by one frame so DOM is fully painted
    const rafId = requestAnimationFrame(() => {
      observer = setupObserver();
    });

    // Recreate observer when viewport height changes (toolbar show/hide on mobile)
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        observer?.disconnect();
        observer = setupObserver();
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      observer?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [setupObserver]);

  return activeSection;
}