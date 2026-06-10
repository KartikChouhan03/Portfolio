'use client';

import { Mail, ArrowUp } from 'lucide-react';
import { meta } from '@/data/meta';
import { useLenis } from 'lenis/react';
import styles from './Footer.module.css';

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
//
// Responsive site footer containing copyright details, direct contact,
// external social links, and a back-to-top button.
// ─────────────────────────────────────────────────────────────────────────────

export function Footer() {
  const lenis = useLenis();

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.wrapper}>
          
          {/* Logo / branding */}
          <div className={styles.brand}>
            <span className={styles.monogram}>
              {meta.firstName[0]}
              {meta.lastName[0]}
            </span>
            <p className={styles.tagline}>{meta.role}</p>
          </div>

          {/* Social links */}
          <div className={styles.socials} aria-label="Social media links">
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${meta.email}`}
              className={styles.socialLink}
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Copyright & Meta */}
          <div className={styles.meta}>
            <p className={styles.copyright}>
              © {currentYear} {meta.name}. All rights reserved.
            </p>
            <p className={styles.location}>Architected in {meta.location}</p>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={handleScrollToTop}
            className={styles.scrollTopButton}
            aria-label="Scroll back to top of page"
          >
            <ArrowUp size={16} />
          </button>
          
        </div>
      </div>
    </footer>
  );
}
