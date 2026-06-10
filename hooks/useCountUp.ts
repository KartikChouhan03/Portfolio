'use client';

import { useEffect, useState } from 'react';

// Easing function for smooth slowing down at the end (cubic ease-out)
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export function useCountUp(
  end: number,
  duration = 1800,
  trigger = false
): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!trigger) {
      // Schedule setState asynchronously to avoid synchronous cascading renders warning
      const raf = requestAnimationFrame(() => {
        setCount(0);
      });
      return () => cancelAnimationFrame(raf);
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, trigger]);

  return count;
}

export default useCountUp;
