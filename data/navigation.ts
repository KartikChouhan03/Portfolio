// ─────────────────────────────────────────────────────────────────────────────
// Navigation Items — Single source of truth.
//
// Both Navbar (desktop) and MobileNavSheet use this array.
// Changing a label or href here propagates everywhere automatically.
//
// `id` must match the `id` attribute on the corresponding section element.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  /** Section element id — used as anchor href (#id) and IntersectionObserver target */
  id: string;
  /** Display label shown in nav links and mobile sheet */
  label: string;
  /** Accessible description for screen readers */
  ariaLabel: string;
}

export const navItems: NavItem[] = [
  {
    id: 'hero',
    label: 'Home',
    ariaLabel: 'Scroll to top of page',
  },
  {
    id: 'about',
    label: 'About',
    ariaLabel: 'Navigate to About section',
  },
  {
    id: 'projects',
    label: 'Projects',
    ariaLabel: 'Navigate to Featured Projects section',
  },
  {
    id: 'lab',
    label: 'Lab',
    ariaLabel: 'Navigate to Engineering Lab section',
  },
  {
    id: 'skills',
    label: 'Skills',
    ariaLabel: 'Navigate to Skills section',
  },
  {
    id: 'journey',
    label: 'Journey',
    ariaLabel: 'Navigate to Career Journey section',
  },
  {
    id: 'contact',
    label: 'Contact',
    ariaLabel: 'Navigate to Contact section',
  },
];