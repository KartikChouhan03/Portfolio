import { cn } from '@/lib/utils';
import styles from './SectionHeading.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeading
//
// The consistent heading pattern used at the top of every section:
//   <h2> or <h3>
//   2px accent line (40px wide, --accent-primary color)
//   Optional subtitle paragraph
//
// The accent line uses transform-origin: 0 50% (left edge) so Phase 2 can
// animate it from scaleX(0) → scaleX(1) with a single CSS transition change.
// No component edits will be needed — just add the animation variant.
//
// Usage:
//   <SectionHeading>About</SectionHeading>
//   <SectionHeading subtitle="Background & focus" align="center">Skills</SectionHeading>
//   <SectionHeading as="h3">Sub-section</SectionHeading>
// ─────────────────────────────────────────────────────────────────────────────

interface SectionHeadingProps {
  /** The heading text content */
  children: React.ReactNode;
  /** Optional supporting text rendered below the accent line */
  subtitle?: string;
  /** Horizontal alignment of the heading block. Default: 'left' */
  align?: 'left' | 'center';
  /** HTML heading level. Default: 'h2' */
  as?: 'h2' | 'h3';
  /** Additional class names for the wrapper div */
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  align = 'left',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        styles.wrapper,
        align === 'center' && styles.center,
        className,
      )}
    >
      <Tag className={styles.heading}>{children}</Tag>

      {/*
        Accent line — 40px wide, 2px tall, accent-primary color.
        transform-origin set for future Phase 2 scaleX animation.
        aria-hidden: purely decorative.
      */}
      <div className={styles.accentLine} aria-hidden="true" />

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}