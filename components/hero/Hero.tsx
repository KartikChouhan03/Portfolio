'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useMediaQuery, MQ } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import HeroText from './HeroText';
import NeuralCore from './NeuralCore';
import NeuralCoreCSS from './NeuralCoreCSS/NeuralCoreCSS';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(MQ.mobile);
  const reducedMotion = useReducedMotion();
  const isReduced = reducedMotion ?? false;

  // Track scroll position of the Hero section relative to the top of the viewport
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Check if we should disable motion-linked animations
  const disableScrollTransforms = isMobile || isReduced;

  // Transform outputs
  // Text translates up on scroll
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  
  // Neural core scales down and fades out
  const coreScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Styles applied dynamically
  const textStyle = disableScrollTransforms ? {} : { y: textY };
  const coreStyle = disableScrollTransforms ? {} : { scale: coreScale, opacity: coreOpacity };

  return (
    <section ref={heroRef} id="hero" data-section-id="hero" className={styles.hero}>
      <div className="container">
        <div className={styles.wrapper}>
          {isMobile ? (
            <>
              {/* Mobile View: Stacked layout with fallback CSS core on top */}
              <div className={styles.coreWrapper}>
                <NeuralCoreCSS />
              </div>
              <HeroText />
            </>
          ) : (
            <>
              {/* Desktop View: Two columns with scroll-driven transforms */}
              <motion.div style={textStyle} className={styles.content}>
                <HeroText />
              </motion.div>
              
              <motion.div style={coreStyle} className={styles.coreContainer}>
                <NeuralCore />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}