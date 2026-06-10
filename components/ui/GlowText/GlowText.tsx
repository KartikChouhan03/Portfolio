import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './GlowText.module.css';

export interface GlowTextProps {
  children: ReactNode;
  className?: string;
}

export function GlowText({ children, className }: GlowTextProps) {
  return (
    <span className={cn(styles.glowText, className)}>
      {children}
    </span>
  );
}

export default GlowText;
