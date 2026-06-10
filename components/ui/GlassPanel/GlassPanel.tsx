import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import styles from './GlassPanel.module.css';

export interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  tilt?: string; // Optional rotation e.g. "0.5deg"
}

export function GlassPanel({
  children,
  className,
  onClick,
  hoverable = true,
  tilt,
}: GlassPanelProps) {
  const isClickable = typeof onClick === 'function';

  // Apply tilt via CSS variable to avoid overriding transforms on hover/active states
  const inlineStyle = tilt
    ? ({ '--panel-tilt': tilt } as CSSProperties)
    : undefined;

  return (
    <div
      onClick={onClick}
      className={cn(
        styles.panel,
        hoverable && styles.hoverable,
        isClickable && styles.clickable,
        className
      )}
      style={inlineStyle}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export default GlassPanel;
