'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type IntroState = 'loading' | 'completing' | 'transforming' | 'done';

interface IntroContextType {
  introState: IntroState;
  setIntroState: (state: IntroState) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introState, setIntroState] = useState<IntroState>('loading');
  const isReduced = useReducedMotion();

  // Handle prefers-reduced-motion bypass
  useEffect(() => {
    if (isReduced) {
      // Direct transition to done with a minimal delay to avoid layout flashes
      const timer = setTimeout(() => {
        setIntroState('done');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isReduced]);

  // Synchronize CSS classes on document and body elements
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Clear previous intro classes
    html.classList.remove('intro-loading', 'intro-completing', 'intro-transforming', 'intro-done');
    body.classList.remove('intro-loading', 'intro-completing', 'intro-transforming', 'intro-done');
    
    // Add current class
    html.classList.add(`intro-${introState}`);
    body.classList.add(`intro-${introState}`);
    
    return () => {
      html.classList.remove(`intro-${introState}`);
      body.classList.remove(`intro-${introState}`);
    };
  }, [introState]);

  return (
    <IntroContext.Provider value={{ introState, setIntroState }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntro must be used within an IntroProvider');
  }
  return context;
}
