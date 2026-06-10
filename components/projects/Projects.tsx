'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Milestone } from 'lucide-react';
import Image from 'next/image';
import { sortedProjects, projectCategories } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { SectionWrapper } from '@/components/ui/SectionWrapper/SectionWrapper';
import { Badge } from '@/components/ui/Badge/Badge';
import { ProjectModal } from './ProjectModal';
import { useProjectModal } from '@/hooks/useProjectModal';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getVariants, inViewProps } from '@/lib/animations/variants';
import { cn } from '@/lib/utils';
import styles from './Projects.module.css';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Projects',
  'ai-ml': 'AI & ML',
  backend: 'Backend',
  vision: 'Computer Vision',
  automation: 'Automation',
};

function renderProceduralThumbnail(projectId: string, styles: any) {
  switch (projectId) {
    case 'deceptiscan':
      return (
        <div className={styles.proceduralThumbnail} data-project="deceptiscan">
          <div className={styles.gridOverlay} />
          <div className={styles.scannerLine} />
          <div className={styles.systemTerminal}>
            <span className={styles.terminalText}>[DEBERTA-V3] INFERENCE_RUNNER</span>
            <span className={styles.terminalText}>ACCURACY: 96.8%</span>
            <span className={styles.terminalText}>STATUS: REALTIME_AUDIT</span>
          </div>
          <div className={styles.glowNode} style={{ top: '40%', left: '50%' }} />
        </div>
      );
    case 'smartparkx':
      return (
        <div className={styles.proceduralThumbnail} data-project="smartparkx">
          <div className={styles.gridOverlay} />
          <div className={styles.cameraCrosshairs} />
          <div className={styles.scanningLaser} />
          <div className={styles.cvBoundingBox} style={{ top: '25%', left: '20%', width: '110px', height: '35px' }}>
            <span className={styles.boxLabel}>ANPR_PLATE: KA-03-9988</span>
          </div>
          <div className={styles.cvBoundingBox} style={{ top: '50%', left: '55%', width: '90px', height: '50px' }}>
            <span className={styles.boxLabel}>SLOT_22: OCCUPIED</span>
          </div>
        </div>
      );
    case 'borrowbox':
      return (
        <div className={styles.proceduralThumbnail} data-project="borrowbox">
          <div className={styles.gridOverlay} />
          <svg className={styles.flowSvg} viewBox="0 0 300 200" width="100%" height="100%">
            <path d="M 50 100 Q 150 40 250 100" fill="none" stroke="rgba(0, 245, 160, 0.15)" strokeWidth="2" strokeDasharray="5 5" />
            <path d="M 50 100 Q 150 160 250 100" fill="none" stroke="rgba(96, 165, 250, 0.15)" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="50" cy="100" r="8" fill="#0c101a" stroke="var(--accent-secondary)" strokeWidth="2" />
            <circle cx="250" cy="100" r="8" fill="#0c101a" stroke="var(--accent-primary)" strokeWidth="2" />
          </svg>
          <div className={styles.systemTerminal}>
            <span className={styles.terminalText}>P2P_CIRCULAR_POOL: ACTIVE</span>
            <span className={styles.terminalText}>LENDING_RELAY: ONLINE</span>
          </div>
        </div>
      );
    case 'riskshield':
      return (
        <div className={styles.proceduralThumbnail} data-project="riskshield">
          <div className={styles.gridOverlay} />
          <div className={styles.shieldWrapper}>
            <div className={styles.shieldIcon} />
            <div className={styles.shieldPulse} />
          </div>
          <div className={styles.systemTerminal}>
            <span className={styles.terminalText}>SHAP_TREE_EXPLAINER</span>
            <span className={styles.terminalText}>RISK_LEVEL: 2.14% [LOW]</span>
          </div>
        </div>
      );
    case 'foodify':
      return (
        <div className={styles.proceduralThumbnail} data-project="foodify">
          <div className={styles.gridOverlay} />
          <svg className={styles.flowSvg} viewBox="0 0 300 200" width="100%" height="100%">
            <circle cx="70" cy="50" r="4" fill="var(--text-ghost)" />
            <circle cx="220" cy="140" r="4" fill="var(--text-ghost)" />
            <circle cx="150" cy="100" r="6" fill="var(--accent-primary)" className={styles.pulsingPin} />
            <path d="M 70 50 L 150 100 L 220 140" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />
            <line x1="70" y1="50" x2="150" y2="100" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="4 4" className={styles.routeActive} />
          </svg>
          <div className={styles.systemTerminal}>
            <span className={styles.terminalText}>MERN_DISPATCH: ACTIVE</span>
            <span className={styles.terminalText}>PAYMENT: STRIPE_OK</span>
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.proceduralThumbnail}>
          <div className={styles.gridOverlay} />
          <div className={styles.glowNode} />
        </div>
      );
  }
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion() ?? false;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Modal deep link state & controller
  const { selectedProject, openProject, closeProject } = useProjectModal();

  // Sticky header Intersection Observer registration
  useSectionObserver(sectionRef, 'projects');

  // Filter projects inside a useMemo
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return sortedProjects;
    return sortedProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  // Framer Motion Entrance animations
  const staggerVariants = getVariants('staggerContainerCapped', isReduced);
  const cardVariants = getVariants('scaleIn', isReduced);

  return (
    <SectionWrapper ref={sectionRef} id="projects" className={styles.projects}>
      <SectionHeading subtitle="Selected Creations & Systems" align="left">
        Featured Projects
      </SectionHeading>

      {/* Filter Chips */}
      <div className={styles.filterBar} role="tablist" aria-label="Filter projects by category">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          className={cn(styles.filterChip, activeCategory === 'all' && styles.filterChipActive)}
        >
          {CATEGORY_LABELS.all}
        </button>
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              styles.filterChip,
              activeCategory === category && styles.filterChipActive
            )}
          >
            {CATEGORY_LABELS[category] || category}
          </button>
        ))}
      </div>

      {/* Projects Grid with Framer Motion layout reflow */}
      <motion.div 
        layout="position"
        variants={staggerVariants}
        {...inViewProps}
        className={styles.grid}
      >
        {isMounted && filteredProjects.map((project) => {
          // Apply large-card spanning only in the "All" tab for featured cards
          const isLarge = project.featured && activeCategory === 'all';
          
          return (
            <motion.article
              layoutId={isReduced || selectedProject?.id !== project.id ? undefined : `card-${project.id}`}
              key={project.id}
              onClick={() => openProject(project)}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={cn(
                styles.projectCard,
                isLarge && styles.featuredCard,
                isReduced && styles.instantCard
              )}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProject(project);
                }
              }}
              role="button"
              aria-label={`View details for ${project.title}`}
            >
              {/* Visual zone (card top) */}
              <motion.div 
                layoutId={isReduced || selectedProject?.id !== project.id ? undefined : `card-image-${project.id}`}
                className={styles.thumbnailWrapper}
              >
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className={styles.thumbnail}
                  />
                ) : (
                  renderProceduralThumbnail(project.id, styles)
                )}
                <span className={styles.categoryBadge}>
                  {CATEGORY_LABELS[project.category] || project.category}
                </span>
              </motion.div>

              {/* Content zone (card bottom) */}
              <div className={styles.cardContent}>
                
                {/* Impact Metric tag */}
                <div className={styles.impactBadge}>
                  <Milestone size={13} className={styles.impactIcon} />
                  <span>{project.impactMetric}</span>
                </div>

                <motion.h3 
                  layoutId={isReduced || selectedProject?.id !== project.id ? undefined : `card-title-${project.id}`}
                  className={styles.cardTitle}
                >
                  {project.title}
                </motion.h3>
                
                <p className={styles.shortDescription}>{project.shortDescription}</p>

                <div className={styles.techStack}>
                  {project.tech.map((t) => (
                    <Badge key={t}>
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Links Row - Stop propagation so clicks do not open the modal */}
                <div className={styles.cardLinks} onClick={(e) => e.stopPropagation()}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                      aria-label={`View source code for ${project.title}`}
                    >
                      <GithubIcon size={14} />
                      <span>Source</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                      aria-label={`Visit live site for ${project.title}`}
                    >
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </a>
                  )}
                </div>

              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Portal details view */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

export default Projects;
