'use client';

import { useEffect, useRef, ReactNode } from 'react';

export interface FocusTrapProps {
  children: ReactNode;
  active: boolean;
}

export function FocusTrap({ children, active }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const getFocusableElements = (): HTMLElement[] => {
      return Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      const activeEl = document.activeElement as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab (backwards focus cycling)
        if (activeEl === firstElement || !focusable.includes(activeEl)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (forwards focus cycling)
        if (activeEl === lastElement || !focusable.includes(activeEl)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Sync focus to the first focusable child immediately on mount
    const timer = setTimeout(() => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [active]);

  return <div ref={containerRef} style={{ display: 'contents' }}>{children}</div>;
}

export default FocusTrap;
