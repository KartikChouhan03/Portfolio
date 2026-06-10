'use client';

import { motion, type Variants } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getVariants } from '@/lib/animations/variants';
import Button from '@/components/ui/Button/Button';
import GlowText from '@/components/ui/GlowText/GlowText';
import styles from './Hero.module.css';

export default function HeroText() {
  const reducedMotion = useReducedMotion();
  const isReduced = reducedMotion ?? false;

  // Resolve variants based on reduced motion system preferences
  const containerVariants = getVariants('staggerContainer', isReduced);
  
  // Custom transition settings to map to spec's gentleSpring
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    }
  };

  const itemAnimationVariants = isReduced 
    ? getVariants('fadeUp', true) 
    : itemVariants;

  return (
    <motion.div
      className={styles.content}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span className={styles.greeting} variants={itemAnimationVariants}>
        NAMASTE! I&apos;M
      </motion.span>

      <motion.h1 className={styles.title} variants={itemAnimationVariants}>
        <span>KARTIK</span>
        <GlowText className={styles.outline}>CHOUHAN</GlowText>
      </motion.h1>

      <motion.p className={styles.role} variants={itemAnimationVariants}>
        Full-Stack Developer &amp; AI/ML Engineer
      </motion.p>

      <motion.p className={styles.description} variants={itemAnimationVariants}>
        Building intelligent systems with computer vision, backend engineering, and automation.
      </motion.p>

      <motion.div className={styles.actions} variants={itemAnimationVariants}>
        <Button variant="primary" href="#projects">
          View Projects
        </Button>
        <Button variant="secondary" href="/resume.pdf">
          Download CV
        </Button>
      </motion.div>
    </motion.div>
  );
}