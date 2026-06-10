'use client';

import { useEffect, type RefObject } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useSectionObserver
//
// Called inside a Client Component section to register it with the
// active-section detection system.
//
// Mechanism: sets `data-section-id` on the element ref. The useActiveSection
// hook queries all [data-section-id] elements via IntersectionObserver —
// no prop drilling or Context needed.
//
// Phase 1: Server Component section placeholders set `data-section-id`
// statically as a JSX attribute — this hook is NOT called in placeholders.
//
// Phase 2+: When sections become Client Components with real content, they
// call this hook to register dynamically. The static attribute approach
// used in Server Components remains valid and coexists with this hook.
//
// Usage:
//   const ref = useRef<HTMLElement>(null)
//   useSectionObserver(ref, 'about')
//   return <section ref={ref} id="about" ...>
// ─────────────────────────────────────────────────────────────────────────────

export function useSectionObserver(
  ref: RefObject<HTMLElement | null>,
  id: string,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.setAttribute('data-section-id', id);

    // Clean up on unmount so stale observers don't target removed elements
    return () => {
      el.removeAttribute('data-section-id');
    };
  }, [ref, id]);
}