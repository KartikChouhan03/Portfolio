'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';
import { sortedJourney } from '@/data/journey';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { SectionWrapper } from '@/components/ui/SectionWrapper/SectionWrapper';
import { TimelineConnector } from './TimelineConnector';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getVariants, inViewProps } from '@/lib/animations/variants';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { cn } from '@/lib/utils';
import styles from './Journey.module.css';

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion() ?? false;
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'work' | 'education' | 'achievement'>('all');

  // Register section in the scroll observer
  useSectionObserver(sectionRef, 'journey');

  const filteredTimeline = sortedJourney.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase size={16} />;
      case 'education':
        return <GraduationCap size={16} />;
      case 'achievement':
        return <Award size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <SectionWrapper ref={sectionRef} id="journey" className={styles.journey}>
      <SectionHeading subtitle="Timeline of Experiences & Milestones" align="left">
        Career Journey
      </SectionHeading>

      {/* Timeline Filter controls */}
      <div className={styles.filterBar}>
        {(['all', 'work', 'education', 'achievement'] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={cn(
              styles.filterChip,
              activeFilter === filter && styles.filterChipActive,
            )}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Vertical Timeline container */}
      <div ref={timelineRef} className={styles.timeline}>
        {/* Sinuous connector SVG path animated via scroll */}
        <TimelineConnector containerRef={timelineRef} activeFilter={activeFilter} />

        {filteredTimeline.map((item, index) => {
          // On desktop, odd indexes are on the right, even on the left
          const isOdd = index % 2 === 0;
          
          // Animate card entrance based on layout position
          // Cards on left slide from left (slideRight variant), cards on right slide from right (slideLeft variant)
          const cardVariants = getVariants(isOdd ? 'slideLeft' : 'slideRight', isReduced);
          const metaVariants = getVariants(isOdd ? 'slideRight' : 'slideLeft', isReduced);

          return (
            <div key={item.id} className={styles.timelineItem}>
              
              {/* Left Column: Dates & Organizations */}
              <motion.div 
                className={styles.metaColumn}
                variants={metaVariants}
                {...inViewProps}
              >
                <div className={styles.dateRange}>{item.dateRange}</div>
                <div className={styles.orgName}>{item.organization}</div>
              </motion.div>

              {/* Center Column: Node Connector */}
              <div className={styles.nodeColumn}>
                <div 
                  className={cn(styles.node, styles[`node-${item.type}`])}
                  data-timeline-node="true"
                >
                  {getIcon(item.type)}
                </div>
              </div>

              {/* Right Column: Cards */}
              <motion.div 
                className={styles.cardColumn}
                variants={cardVariants}
                {...inViewProps}
              >
                <div 
                  className={styles.journeyCard}
                  tabIndex={0}
                  aria-label={`${item.role} at ${item.organization}, ${item.dateRange}`}
                >
                  <div className={styles.roleHeader}>
                    <h3 className={styles.roleTitle}>{item.role}</h3>
                    <span className={cn(styles.typeBadge, styles[`badge-${item.type}`])}>
                      {item.type}
                    </span>
                  </div>

                  <p className={styles.narrative}>{item.narrative}</p>

                  <div className={styles.tagsContainer}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tagBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Journey;
