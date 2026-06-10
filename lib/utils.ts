import { clsx, type ClassValue } from 'clsx';

// ─────────────────────────────────────────────────────────────────────────────
// Class name utility
// Merges clsx class values. Used throughout the codebase for conditional
// CSS Module class composition. Tailwind-merge is intentionally excluded —
// we use CSS Modules so merge conflicts don't arise.
// ─────────────────────────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// ─────────────────────────────────────────────────────────────────────────────
// Math utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clamps a number between min and max (inclusive).
 * Used for animation value constraints and layout calculations.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values.
 * Used in Three.js animation loops to smooth transitions.
 * @param a - Start value
 * @param b - End value
 * @param t - Interpolation factor (0–1)
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Maps a value from one range to another.
 * Used to convert scroll progress (0–1) to animation values.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

// ─────────────────────────────────────────────────────────────────────────────
// Environment utilities
// All browser-API utilities are SSR-safe — guard with typeof window check.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true if the current viewport is mobile-sized (≤ 768px).
 * SSR-safe: returns false on the server (assumes desktop for first paint).
 *
 * Prefer useMediaQuery() hook for reactive behavior inside components.
 * Use this utility for one-time checks outside of React (e.g., Three.js init).
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

/**
 * Returns an estimate of device performance tier based on hardware concurrency.
 * Used by the NeuralCore to set initial particle/geometry counts.
 *
 * SSR-safe: returns 'mid' on the server.
 *
 * - 'high':  8+ logical processors  → full quality
 * - 'mid':   4–7 logical processors → reduced quality
 * - 'low':   1–3 logical processors → minimum quality
 */
export type PerformanceTier = 'high' | 'mid' | 'low';

export function getPerformanceTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'mid';
  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores >= 8) return 'high';
  if (cores >= 4) return 'mid';
  return 'low';
}

// ─────────────────────────────────────────────────────────────────────────────
// Date utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Formats an ISO date string (YYYY-MM) into a readable display string.
 * Used in the Journey section for timeline date ranges.
 *
 * @example formatDate('2024-06') → 'Jun 2024'
 */
export function formatDate(isoDate: string): string {
  const [year, month] = isoDate.split('-');
  if (!year) return isoDate;

  if (!month) return year;

  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}