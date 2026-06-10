import styles from './SkipLink.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// SkipLink
//
// An accessibility skip navigation link — the very first focusable element
// on the page. When a keyboard user presses Tab, this is the first thing
// they encounter. Activating it jumps focus to #main-content, bypassing
// the navbar (which would otherwise require 7 Tab presses to navigate through).
//
// WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks) — Level A.
//
// The element is visually hidden via CSS transform but is always in the DOM
// and always in the tab order. It becomes visible when focused.
//
// The href="#main-content" target is the <main> element in layout.tsx,
// which has tabIndex={-1} to accept programmatic focus.
// ─────────────────────────────────────────────────────────────────────────────

export function SkipLink() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
}