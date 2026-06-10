import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Providers } from '@/components/providers/Providers';
import { Navbar } from '@/components/Layout/Navbar/Navbar';
import { MobileNav } from '@/components/Layout/Navbar/MobileNav/MobileNav';
import { Footer } from '@/components/Layout/Footer/Footer';
import { SkipLink } from '@/components/ui/SkipLink/SkipLink';
import { meta } from '@/data/meta';

// ─────────────────────────────────────────────────────────────────────────────
// Fonts
//
// next/font/google injects each font as a CSS variable on <html>.
// Fallback stacks closely match the metric profile of each font to prevent
// content layout shift (CLS) if the font fails to load or is slow.
//
// Weight strategy:
//   Syne:          400-800 — used for h1/h2 at various weights
//   DM Sans:       400, 500 — body text, UI labels
//   JetBrains Mono: 400 — code snippets in Engineering Lab only
// ─────────────────────────────────────────────────────────────────────────────

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
  // Preload: true is the Next.js default for fonts used in layout
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

// JetBrains Mono is used only in the Engineering Lab section.
// display: 'swap' ensures body text is never blocked by this font loading.
// preload: false — we don't want it in the critical path.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});

// ─────────────────────────────────────────────────────────────────────────────
// Viewport
// Separate export per Next.js 16 requirements — not part of metadata object.
// ─────────────────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor: '#0a0b10',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),

  title: {
    default: `${meta.name} — ${meta.role}`,
    template: `%s | ${meta.name}`,
  },

  description: meta.tagline,

  keywords: [
    'AI Engineer',
    'ML Engineer',
    'Full Stack Developer',
    'Computer Vision',
    'Python',
    'PyTorch',
    'Portfolio',
    meta.name,
  ],

  authors: [{ name: meta.name, url: meta.siteUrl }],
  creator: meta.name,

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: meta.siteUrl,
    siteName: meta.name,
    title: `${meta.name} — ${meta.role}`,
    description: meta.tagline,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${meta.name} — ${meta.role}`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${meta.name} — ${meta.role}`,
    description: meta.tagline,
    images: [meta.ogImage],
    ...(meta.twitter ? { creator: meta.twitter } : {}),
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    // UPDATE: Add real favicon files to /public before launch
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Font CSS variables applied to html so they cascade to all descendants
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/*
          Providers establishes the client boundary.
          Everything rendered as {children} here (page.tsx → PageSections → sections)
          remains Server Components — passed through as RSC payload.
          Only Navbar, MobileNav, Footer, and SkipLink are Client Components here.
        */}
        <Providers>
          {/* Accessibility: first focusable element — skips nav to main content */}
          <SkipLink />

          {/* Sticky top navigation — visible on desktop, hidden on mobile */}
          <Navbar />

          {/*
            Main content area.
            tabIndex={-1} makes this a programmatic focus target for the SkipLink.
            id="main-content" matches the SkipLink href="#main-content".
          */}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />

          {/*
            Fixed bottom navigation — visible on mobile only (CSS-controlled).
            Rendered after Footer in DOM so it sits on top in stacking context.
          */}
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}