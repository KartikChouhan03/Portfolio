'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, ExternalLink, Calendar, Milestone } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/types';
import { FocusTrap } from '@/components/ui/FocusTrap/FocusTrap';
import { Badge } from '@/components/ui/Badge/Badge';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './ProjectModal.module.css';

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

export interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const isReduced = useReducedMotion() ?? false;

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  // Handle escape key press
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const modalContent = (
    <FocusTrap active={true}>
      {/* Modal Container */}
      <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Backdrop dimmer */}
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window Wrapper (the expanding card) */}
        <motion.div
          layoutId={isReduced ? undefined : `card-${project.id}`}
          className={styles.modalWindow}
          transition={{ type: 'spring', stiffness: 150, damping: 22 }}
        >
          {/* Close button - high contrast & tab-accessible */}
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>

          <div className={styles.modalContentGrid}>
            {/* Left Zone: Visual Display */}
            <motion.div
              layoutId={isReduced ? undefined : `card-image-${project.id}`}
              className={styles.visualPane}
            >
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className={styles.thumbnail}
                  priority
                />
              ) : (
                <div className={styles.proceduralThumbnail}>
                  <div className={styles.gridOverlay} />
                  <div className={styles.glowNode} />
                </div>
              )}
            </motion.div>

            {/* Right Zone: Text & Details */}
            <div className={styles.detailsPane}>
              {/* Fade in content after expansion finishes */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: isReduced ? 0 : 0.15, duration: 0.25 }}
                className={styles.paneScrollArea}
              >
                {/* Meta details */}
                <div className={styles.metaRow}>
                  <span className={styles.categoryBadge}>{project.category}</span>
                  <div className={styles.dateInfo}>
                    <Calendar size={14} />
                    <span>{project.completedAt}</span>
                  </div>
                </div>

                {/* Title */}
                <motion.h2
                  layoutId={isReduced ? undefined : `card-title-${project.id}`}
                  id="modal-title"
                  className={styles.title}
                >
                  {project.title}
                </motion.h2>

                {/* Impact metric showcase */}
                <div className={styles.impactCard}>
                  <Milestone size={18} className={styles.impactIcon} />
                  <div>
                    <span className={styles.impactLabel}>Key Impact</span>
                    <p className={styles.impactValue}>{project.impactMetric}</p>
                  </div>
                </div>

                {/* Narrative description */}
                <div className={styles.longDesc}>
                  {project.longDescription.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Technologies used */}
                <div className={styles.techZone}>
                  <h4 className={styles.sectionHeading}>Technologies Built With</h4>
                  <div className={styles.techStack}>
                    {project.tech.map((t) => (
                      <Badge key={t} variant="accent">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Resource Links */}
                <div className={styles.linksRow}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkButton}
                    >
                      <GithubIcon size={16} />
                      <span>Explore Source Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkButtonPrimary}
                    >
                      <ExternalLink size={16} />
                      <span>Launch Live Site</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </FocusTrap>
  );

  // Render modal to the body root via portal
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}

export default ProjectModal;
