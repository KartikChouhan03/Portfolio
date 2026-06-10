'use client';

import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Navbar.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isReduced = useReducedMotion() ?? false;
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.div
        key={theme}
        initial={isReduced ? { opacity: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
    </button>
  );
}
