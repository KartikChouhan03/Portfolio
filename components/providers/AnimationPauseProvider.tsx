'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Animation Pause Context
//
// Provides a site-wide "pause all animations" toggle.
// Consumers: AnimationToggle (nav), NeuralCore useFrame loops (Phase 6),
//            any CSS animation that needs programmatic control.
//
// Persists pause state to sessionStorage so it survives soft navigations
// without persisting across browser sessions (intentional — motion preference
// should be re-evaluated on each visit).
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'neural-portfolio:animations-paused';

interface AnimationPauseContextValue {
    /** True when the user has requested all animations to pause. */
    isPaused: boolean;
    /** Toggle between paused and playing. */
    toggle: () => void;
    /** Imperatively pause — used by external triggers (e.g. focus management). */
    pause: () => void;
    /** Imperatively resume — used by external triggers. */
    resume: () => void;
}

const AnimationPauseContext = createContext<AnimationPauseContextValue>({
    isPaused: false,
    toggle: () => { },
    pause: () => { },
    resume: () => { },
});

// ── Provider ──────────────────────────────────────────────────────────────────

export function AnimationPauseProvider({ children }: { children: ReactNode }) {
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // Restore from session on mount
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem(SESSION_KEY);
            if (stored === 'true') {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsPaused(true);
            }
        } catch {
            // sessionStorage not available (private browsing edge case) — ignore
        }
    }, []);

    // Persist to session on change
    useEffect(() => {
        try {
            sessionStorage.setItem(SESSION_KEY, String(isPaused));
        } catch {
            // ignore
        }
    }, [isPaused]);

    const toggle = useCallback(() => setIsPaused((prev) => !prev), []);
    const pause = useCallback(() => setIsPaused(true), []);
    const resume = useCallback(() => setIsPaused(false), []);

    return (
        <AnimationPauseContext.Provider value={{ isPaused, toggle, pause, resume }}>
            {children}
        </AnimationPauseContext.Provider>
    );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Access the animation pause state and controls.
 *
 * @example
 * const { isPaused, toggle } = useAnimationPause()
 * // In a Three.js useFrame:
 * useFrame(() => { if (isPaused) return; ... })
 */
export function useAnimationPause(): AnimationPauseContextValue {
    return useContext(AnimationPauseContext);
}