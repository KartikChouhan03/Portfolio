import PageSections from '@/components/Layout/PageSections';

// ─────────────────────────────────────────────────────────────────────────────
// Home Page
//
// Intentionally thin — all section composition lives in PageSections.
// Keeping page.tsx minimal means the page route is easy to reason about
// and PageSections can be tested and changed independently.
//
// This is a Server Component. No 'use client' — sections that need
// client features handle their own boundary internally.
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return <PageSections />;
}