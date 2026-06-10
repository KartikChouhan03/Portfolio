'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import styles from './Journey.module.css';

interface TimelineConnectorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeFilter: string;
}

export function TimelineConnector({ containerRef, activeFilter }: TimelineConnectorProps) {
  const [pathD, setPathD] = useState('');
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  // Track page scroll relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Calculate path drawing offset
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Select all visible node elements
      const nodes = container.querySelectorAll('[data-timeline-node="true"]');
      
      if (nodes.length === 0) {
        setPathD('');
        return;
      }

      const points = Array.from(nodes).map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

      // Sort points by Y-coordinate
      points.sort((a, b) => a.y - b.y);

      let d = `M ${points[0].x} ${points[0].y}`;

      if (points.length === 1) {
        d += ` L ${points[0].x} ${points[0].y + 50}`;
      } else {
        const isMobile = window.innerWidth < 768;
        
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const cy1 = p1.y + (p2.y - p1.y) * 0.25;
          const cy2 = p1.y + (p2.y - p1.y) * 0.75;
          
          if (isMobile) {
            d += ` L ${p2.x} ${p2.y}`;
          } else {
            const direction = i % 2 === 0 ? 1 : -1;
            const gapY = p2.y - p1.y;
            const bend = Math.min(Math.max(gapY * 0.18, 25), 75) * direction;
            
            const cx1 = p1.x + bend;
            const cx2 = p2.x - bend;
            
            d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
          }
        }
      }
      
      setPathD(d);
    };

    // Run measurement after rendering completes
    const timer = setTimeout(updatePath, 100);

    // Set up ResizeObserver to handle layout shifts/resizes
    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [containerRef, activeFilter]);

  // Update path length for dash array/offset when path changes
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  if (!pathD) return null;

  return (
    <svg
      className={styles.connectorSvg}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="timeline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="timeline-bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--border)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--border)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--border)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Background guide line */}
      <path
        d={pathD}
        stroke="url(#timeline-bg-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated drawing line on top */}
      <motion.path
        ref={pathRef}
        d={pathD}
        stroke="url(#timeline-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        style={{ strokeDashoffset }}
      />
    </svg>
  );
}
