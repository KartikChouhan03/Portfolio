'use client';

import { Pause, Play } from 'lucide-react';
import { useAnimationPause } from '@/components/providers/AnimationPauseProvider';
import { cn } from '@/lib/utils';
import styles from './Navbar.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// AnimationToggle
//
// A small icon button in the navbar that pauses/resumes all site animations.
// Satisfies WCAG 2.1 SC 2.2.2 (Pause, Stop, Hide) for auto-playing content.
//
// In Phase 1 this controls the sessionStorage-persisted pause state.
// In Phase 6 it will additionally pause the NeuralCore useFrame loop.
//
// Accessibility:
//   - aria-pressed reflects the current toggle state (button is a toggle)
//   - aria-label changes with state so screen reader announces the action
//   - Visual icon changes so sighted users also get clear state feedback
// ─────────────────────────────────────────────────────────────────────────────

export function AnimationToggle() {
    const { isPaused, toggle } = useAnimationPause();

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isPaused}
            aria-label={isPaused ? 'Resume animations' : 'Pause animations'}
            onClick={toggle}
            className={cn(
                styles.iconButton,
                isPaused && styles.iconButtonActive,
            )}
        >
            {isPaused ? (
                <Play size={15} aria-hidden="true" />
            ) : (
                <Pause size={15} aria-hidden="true" />
            )}
        </button>
    );
}