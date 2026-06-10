import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Providers } from '@/components/providers/Providers';
import { Navbar } from '@/components/Layout/Navbar/Navbar';
import { Dock } from '@/components/Layout/Dock/Dock';
import { Footer } from '@/components/Layout/Footer/Footer';
import { SkipLink } from '@/components/ui/SkipLink/SkipLink';
import { meta } from '@/data/meta';

// ─────────────────────────────────────────────────────────────────────────────
// Fonts
// ─────────────────────────────────────────────────────────────────────────────

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});

// ─────────────────────────────────────────────────────────────────────────────
// Viewport
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
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} intro-loading`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var savedTheme = localStorage.getItem('theme');
              var theme = savedTheme || 'dark';
              document.documentElement.setAttribute('data-theme', theme);
              if (theme === 'light') {
                document.documentElement.classList.add('light-mode');
              }
            } catch (e) {}
          })();
        ` }} />
        <noscript>
          <style>{`
            html.intro-loading,
            body.intro-loading {
              overflow: auto !important;
              height: auto !important;
              pointer-events: auto !important;
            }
            body.intro-loading header,
            body.intro-loading main,
            body.intro-loading footer {
              opacity: 1 !important;
              transform: none !important;
              pointer-events: auto !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="intro-loading" suppressHydrationWarning>
        <Providers>
          <SkipLink />

          {/* Minimal sticky header — logo + Hire Me only */}
          <Navbar />

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />

          {/*
            Floating bottom dock — handles all section navigation
            on both desktop and mobile. Replaces the old MobileNav.
          */}
          <Dock />
        </Providers>
      </body>
    </html>
  );
}