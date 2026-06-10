'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { skillDomains, skillById } from '@/data/skill';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { SectionWrapper } from '@/components/ui/SectionWrapper/SectionWrapper';
import { SkillMap } from './SkillMap';
import { useMediaQuery, MQ } from '@/hooks/useMediaQuery';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getVariants, inViewProps } from '@/lib/animations/variants';
import { cn } from '@/lib/utils';
import styles from './Skills.module.css';

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery(MQ.mobile);
  const isReduced = useReducedMotion() ?? false;

  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [activeRing, setActiveRing] = useState<string | null>(null);
  const [expandedDomain, setExpandedDomain] = useState<string | null>('ml'); // Default first open on mobile

  // Observer registration for sticky navbar
  useSectionObserver(sectionRef, 'skills');

  // Entrance animations
  const contentVariants = getVariants('fadeUp', isReduced);
  const staggerVariants = getVariants('staggerContainer', isReduced);
  const chipVariants = getVariants('scaleIn', isReduced);

  const handleDomainToggle = (domainId: string) => {
    setExpandedDomain(expandedDomain === domainId ? null : domainId);
  };

  return (
    <SectionWrapper ref={sectionRef} id="skills" className={styles.skills}>
      <SectionHeading subtitle="Expertise Depth & Domain Map" align="left">
        Skills & Technologies
      </SectionHeading>

      <div className={styles.grid}>
        {/* Left column: SVG SkillMap (desktop only) */}
        {!isMobile && (
          <motion.div 
            className={styles.mapPane}
            variants={contentVariants}
            {...inViewProps}
          >
            <SkillMap
              hoveredSkillId={hoveredSkillId}
              onHoverSkill={setHoveredSkillId}
              activeRing={activeRing}
            />

            {/* Proficiency level legend below the map */}
            <div className={styles.legend}>
              <button 
                type="button" 
                className={cn(styles.legendItem, activeRing === 'core' && styles.legendItemActive)}
                onMouseEnter={() => setActiveRing('core')}
                onMouseLeave={() => setActiveRing(null)}
              >
                <span className={cn(styles.legendDot, styles.dotCore)} />
                <span>Core Stack</span>
              </button>
              <button 
                type="button" 
                className={cn(styles.legendItem, activeRing === 'secondary' && styles.legendItemActive)}
                onMouseEnter={() => setActiveRing('secondary')}
                onMouseLeave={() => setActiveRing(null)}
              >
                <span className={cn(styles.legendDot, styles.dotSecondary)} />
                <span>Supporting Tech</span>
              </button>
              <button 
                type="button" 
                className={cn(styles.legendItem, activeRing === 'familiarity' && styles.legendItemActive)}
                onMouseEnter={() => setActiveRing('familiarity')}
                onMouseLeave={() => setActiveRing(null)}
              >
                <span className={cn(styles.legendDot, styles.dotFamiliarity)} />
                <span>Familiarity</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Right column: Domains list (desktop) or accordion (mobile) */}
        <motion.div 
          className={styles.domainsPane}
          variants={contentVariants}
          {...inViewProps}
        >
          {isMobile ? (
            /* Mobile View: Expandable Accordion list */
            <div className={styles.accordionContainer}>
              {skillDomains.map((domain) => {
                const isOpen = expandedDomain === domain.id;
                return (
                  <div key={domain.id} className={styles.accordionCard}>
                    <button
                      type="button"
                      onClick={() => handleDomainToggle(domain.id)}
                      className={cn(styles.accordionHeader, isOpen && styles.headerOpen)}
                      aria-expanded={isOpen}
                    >
                      <span>{domain.label}</span>
                      <ChevronDown
                        size={16}
                        className={cn(styles.accordionArrow, isOpen && styles.arrowRotated)}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className={styles.accordionContent}
                        >
                          <div className={styles.chipGrid}>
                            {domain.skillIds.map((skillId) => {
                              const skill = skillById[skillId];
                              if (!skill) return null;

                              return (
                                <div
                                  key={skillId}
                                  className={cn(
                                    styles.skillChip,
                                    skill.ring === 'core' && styles.chipCore,
                                    skill.ring === 'secondary' && styles.chipSecondary,
                                    skill.ring === 'familiarity' && styles.chipFamiliarity,
                                    skill.learning && styles.chipLearning
                                  )}
                                >
                                  <span>{skill.name}</span>
                                  {skill.learning && (
                                    <span className={styles.learningTag}>learning</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Desktop View: Static grouped lists with hover-syncing */
            <div className={styles.domainsContainer}>
              {skillDomains.map((domain) => (
                <div key={domain.id} className={styles.domainCard}>
                  <h4 className={styles.domainLabel}>{domain.label}</h4>
                  <motion.div 
                    className={styles.chipGrid}
                    variants={staggerVariants}
                  >
                    {domain.skillIds.map((skillId) => {
                      const skill = skillById[skillId];
                      if (!skill) return null;

                      const isHovered = hoveredSkillId === skillId;
                      const isRingActive = activeRing === skill.ring;
                      const isActive = isHovered || isRingActive;

                      return (
                        <motion.div
                          key={skillId}
                          variants={chipVariants}
                          className={cn(
                            styles.skillChip,
                            skill.ring === 'core' && styles.chipCore,
                            skill.ring === 'secondary' && styles.chipSecondary,
                            skill.ring === 'familiarity' && styles.chipFamiliarity,
                            skill.learning && styles.chipLearning,
                            isActive && styles.chipActive
                          )}
                          onMouseEnter={() => setHoveredSkillId(skillId)}
                          onMouseLeave={() => setHoveredSkillId(null)}
                        >
                          <span>{skill.name}</span>
                          {skill.learning && (
                            <span className={styles.learningTag}>learning</span>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default Skills;
