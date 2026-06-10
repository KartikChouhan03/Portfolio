'use client';

import { useCountUp } from '@/hooks/useCountUp';
import styles from './About.module.css';

export interface MetricCounterProps {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}

export function MetricCounter({
  value,
  suffix,
  label,
  trigger,
}: MetricCounterProps) {
  const animatedValue = useCountUp(value, 1800, trigger);

  return (
    <div className={styles.metricCard}>
      <div className={styles.metricValue}>
        {animatedValue}
        <span className={styles.metricSuffix}>{suffix}</span>
      </div>
      <div className={styles.metricLabel}>{label}</div>
    </div>
  );
}

export default MetricCounter;
