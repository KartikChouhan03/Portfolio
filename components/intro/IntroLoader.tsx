'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useIntro } from '@/components/providers/IntroProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './IntroLoader.module.css';

const GREETINGS = [
  'Namaste',
  'Hello',
  'Bonjour',
  'Hola',
  'Ciao',
  "Kon'nichiwa",
  'Guten Tag',
  'Olá'
];

export function IntroLoader() {
  const { introState, setIntroState } = useIntro();
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    // Timeline steps:
    // 0ms -> 1800ms: Cycle greetings and progress fill
    // 1800ms -> 2000ms: Progress complete, border glow, final greeting holds
    // 2000ms -> 2400ms: Morph capsule to bottom dock
    // 2400ms+: Done
    const timerCompleting = setTimeout(() => {
      setIntroState('completing');
    }, 1800);

    const timerTransforming = setTimeout(() => {
      setIntroState('transforming');
    }, 2000);

    const timerDone = setTimeout(() => {
      setIntroState('done');
    }, 2400);

    return () => {
      clearTimeout(timerCompleting);
      clearTimeout(timerTransforming);
      clearTimeout(timerDone);
    };
  }, [isReduced, setIntroState]);

  if (isReduced) return null;

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle ambient radial glow behind capsule */}
      <div className={styles.ambientGlow} />

      {/* Capsule - acts as loader and morphs to bottom dock */}
      <motion.div
        layoutId="capsule-dock"
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 20,
          mass: 1.0
        }}
        className={styles.capsule}
      >
        {/* Emerald progress fill travelling through the capsule */}
        <div className={styles.progressFill} />

        {/* Greetings list cycling via CSS animation delays */}
        <div className={styles.greetingsWrapper}>
          {GREETINGS.map((greeting, index) => (
            <span
              key={greeting}
              className={`${styles.greeting} ${styles[`greeting-${index}`]}`}
            >
              {greeting}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default IntroLoader;
