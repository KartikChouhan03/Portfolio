'use client';

import { type ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import { AnimationPauseProvider } from './AnimationPauseProvider';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { IntroProvider, useIntro } from './IntroProvider';
import { IntroLoader } from '@/components/intro/IntroLoader';

// ─────────────────────────────────────────────────────────────────────────────
// Providers — Root client boundary.
//
// This is the single import in app/layout.tsx that establishes the client
// component tree. All providers are composed here in explicit dependency order:
//
//   IntroProvider           (outermost — governs intro loading flow)
//   └── AnimationPauseProvider
//       └── SmoothScrollProvider  (may read AnimationPause in Phase 6)
//           └── children  (Navbar, sections, Footer — all read from both)
//
// Adding a new provider: import it here and wrap it in the correct position.
// Nothing else in the codebase needs to change.
// ─────────────────────────────────────────────────────────────────────────────

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <IntroProvider>
      <ProvidersInner>{children}</ProvidersInner>
    </IntroProvider>
  );
}

function ProvidersInner({ children }: { children: ReactNode }) {
  const { introState } = useIntro();

  return (
    <AnimationPauseProvider>
      <SmoothScrollProvider>
        <AnimatePresence mode="popLayout">
          {(introState === 'loading' || introState === 'completing') && (
            <IntroLoader key="intro-loader" />
          )}
        </AnimatePresence>
        {children}
      </SmoothScrollProvider>
    </AnimationPauseProvider>
  );
}
