'use client';

import { type ReactNode } from 'react';
import { AnimationPauseProvider } from './AnimationPauseProvider';
import { SmoothScrollProvider } from './SmoothScrollProvider';

// ─────────────────────────────────────────────────────────────────────────────
// Providers — Root client boundary.
//
// This is the single import in app/layout.tsx that establishes the client
// component tree. All providers are composed here in explicit dependency order:
//
//   AnimationPauseProvider  (outermost — no dependencies)
//   └── SmoothScrollProvider  (may read AnimationPause in Phase 6)
//       └── children  (Navbar, sections, Footer — all read from both)
//
// Adding a new provider: import it here and wrap it in the correct position.
// Nothing else in the codebase needs to change.
// ─────────────────────────────────────────────────────────────────────────────

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AnimationPauseProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </AnimationPauseProvider>
  );
}