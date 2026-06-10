'use client';

import { cn } from '@/lib/utils';
import type { NavItem } from '@/data/navigation';
import styles from './Navbar.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// NavLink
//
// A single desktop navigation anchor. Renders an <a> element pointing to
// the section's anchor ID (#about, #projects etc).
//
// Active state is driven by the parent Navbar's useActiveSection() call —
// this component is purely presentational. It receives isActive as a prop
// and applies the active CSS class accordingly.
//
// aria-current="page" is used (not "true") because we're treating sections
// as pseudo-pages in a single-page application — this is the semantically
// correct value for in-page navigation landmarks.
// ─────────────────────────────────────────────────────────────────────────────

interface NavLinkProps {
    item: NavItem;
    isActive: boolean;
    /** Optional click handler — used by MobileNav to close the sheet */
    onClick?: () => void;
}

export function NavLink({ item, isActive, onClick }: NavLinkProps) {
    return (
        <li>
            <a
                href={`#${item.id}`}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                className={cn(styles.navLink, isActive && styles.navLinkActive)}
                onClick={onClick}
            >
                {item.label}
            </a>
        </li>
    );
}