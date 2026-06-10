import { cn } from '@/lib/utils';
import styles from './NeuralCoreCSS.module.css';

export interface NeuralCoreCSSProps {
  className?: string;
}

export function NeuralCoreCSS({ className }: NeuralCoreCSSProps) {
  // Generate coordinates for 16 radiating spokes
  const spokes = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 * Math.PI) / 180;
    const x = Math.round(160 * Math.cos(angle) * 100) / 100;
    const y = Math.round(160 * Math.sin(angle) * 100) / 100;
    return { x, y };
  });

  // Orbiting dots configuration
  // Ring 1 (Radius 50, 3 dots)
  const ring1Dots = Array.from({ length: 3 }, (_, i) => {
    const angle = (i * 120 * Math.PI) / 180;
    return {
      x: Math.round(50 * Math.cos(angle) * 100) / 100,
      y: Math.round(50 * Math.sin(angle) * 100) / 100,
    };
  });

  // Ring 2 (Radius 95, 4 dots)
  const ring2Dots = Array.from({ length: 4 }, (_, i) => {
    const angle = (i * 90 * Math.PI) / 180;
    return {
      x: Math.round(95 * Math.cos(angle) * 100) / 100,
      y: Math.round(95 * Math.sin(angle) * 100) / 100,
    };
  });

  // Ring 3 (Radius 135, 5 dots)
  const ring3Dots = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 * Math.PI) / 180;
    return {
      x: Math.round(135 * Math.cos(angle) * 100) / 100,
      y: Math.round(135 * Math.sin(angle) * 100) / 100,
    };
  });

  // Outer static nodes (pulsing out of sync)
  const staticNodes = [
    { x: 0, y: -160, delay: '0s', color: 'primary' },
    { x: 138.56, y: -80, delay: '0.5s', color: 'secondary' },
    { x: 138.56, y: 80, delay: '1s', color: 'primary' },
    { x: 0, y: 160, delay: '1.5s', color: 'secondary' },
    { x: -138.56, y: 80, delay: '2s', color: 'primary' },
    { x: -138.56, y: -80, delay: '2.5s', color: 'primary' },
  ];

  return (
    <div className={cn(styles.container, className)} aria-hidden="true">
      {/* Layer 1: Radial Glow Background */}
      <div className={styles.glowBg} />

      {/* Layer 2, 3 & 4: Animated SVG Graph */}
      <svg
        viewBox="-200 -200 400 400"
        className={styles.svgCanvas}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 2: Rotating Spokes */}
        <g className={styles.spokesGroup}>
          {spokes.map((pt, i) => (
            <line
              key={`spoke-${i}`}
              x1="0"
              y1="0"
              x2={pt.x}
              y2={pt.y}
              className={styles.spokeLine}
            />
          ))}
        </g>

        {/* Layer 3: Orbiting rings (dots) */}
        <g className={styles.orbitRing1}>
          {ring1Dots.map((pt, i) => (
            <circle
              key={`r1-dot-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              className={styles.accentPrimaryDot}
            />
          ))}
        </g>
        <g className={styles.orbitRing2}>
          {ring2Dots.map((pt, i) => (
            <circle
              key={`r2-dot-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="4"
              className={styles.accentSecondaryDot}
            />
          ))}
        </g>
        <g className={styles.orbitRing3}>
          {ring3Dots.map((pt, i) => (
            <circle
              key={`r3-dot-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="3"
              className={styles.accentPrimaryDot}
            />
          ))}
        </g>

        {/* Center hub */}
        <circle cx="0" cy="0" r="10" className={styles.centerNode} />
        <circle cx="0" cy="0" r="4" className={styles.centerInner} />

        {/* Layer 4: Static outer nodes pulsing out of sync */}
        {staticNodes.map((node, i) => (
          <g key={`static-node-${i}`} transform={`translate(${node.x}, ${node.y})`}>
            <circle
              r="8"
              className={cn(
                styles.pulseRing,
                node.color === 'secondary' ? styles.pulseRingSec : styles.pulseRingPri
              )}
              style={{ animationDelay: node.delay }}
            />
            <circle
              r="4.5"
              className={node.color === 'secondary' ? styles.accentSecondaryDot : styles.accentPrimaryDot}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default NeuralCoreCSS;
