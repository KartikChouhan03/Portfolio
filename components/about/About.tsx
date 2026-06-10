'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Brain, Cpu, Globe } from 'lucide-react';
import { meta, aboutCards } from '@/data/meta';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { SectionWrapper } from '@/components/ui/SectionWrapper/SectionWrapper';
import { GlassPanel } from '@/components/ui/GlassPanel/GlassPanel';
import { MetricCounter } from './MetricCounter';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getVariants, inViewProps } from '@/lib/animations/variants';
import styles from './About.module.css';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion() ?? false;
  
  // Set up section observation for active navbar highlight
  useSectionObserver(sectionRef, 'about');

  // Trigger metrics count-up when the section enters the viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Stagger entry animations
  const textVariants = getVariants('fadeUp', isReduced);
  const cardContainerVariants = getVariants('staggerContainer', isReduced);
  const cardVariants = getVariants('scaleIn', isReduced);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return <Brain size={18} className={styles.cardIcon} />;
      case 'cpu':
        return <Cpu size={18} className={styles.cardIcon} />;
      case 'globe':
        return <Globe size={18} className={styles.cardIcon} />;
      default:
        return null;
    }
  };

  return (
    <SectionWrapper ref={sectionRef} id="about" className={styles.about}>
      <SectionHeading subtitle="Background & Focus" align="left">
        About Me
      </SectionHeading>

      <div className={styles.grid}>
        
        {/* Left panel: Large display statement & narrative */}
        <motion.div 
          className={styles.narrativeZone}
          variants={textVariants}
          {...inViewProps}
        >
          <h3 className={styles.statement}>{meta.statement}</h3>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.bio}>{meta.bioLong}</p>
          
          {/* Brief short bio footer card */}
          <div className={styles.summaryCard}>
            <p>{meta.bioShort}</p>
          </div>
        </motion.div>

        {/* Right panel: Diagonal glass cards and metrics */}
        <div className={styles.rightZone}>
          {/* Cards Stack with diagonal offsets */}
          <motion.div 
            className={styles.cardsStack}
            variants={cardContainerVariants}
            {...inViewProps}
          >
            {aboutCards.map((card, idx) => {
              // Alternate tilts: -0.5deg, 0.5deg, -0.5deg
              const tiltValue = idx % 2 === 0 ? '-0.5deg' : '0.5deg';
              return (
                <motion.div key={idx} variants={cardVariants}>
                  <GlassPanel 
                    tilt={tiltValue} 
                    className={styles.aboutCard}
                    hoverable={true}
                  >
                    <div className={styles.cardHeader}>
                      {getIcon(card.icon)}
                      <h4 className={styles.cardTitle}>{card.title}</h4>
                    </div>
                    <p className={styles.cardBody}>{card.body}</p>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Metrics Grid */}
          <div className={styles.metricsGrid}>
            {meta.metrics.map((metric, idx) => (
              <MetricCounter
                key={idx}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                trigger={isInView}
              />
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

export default About;
