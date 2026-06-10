'use client';

import { useMemo } from 'react';
import { skills, skillDomains } from '@/data/skill';
import type { Skill } from '@/types';
import { cn } from '@/lib/utils';
import styles from './SkillMap.module.css';

const LOGO_MAP: Record<string, string> = {
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  pytorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  fastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  django: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  opencv: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  sqlite: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
  linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
  transformers: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
};

function renderNodeContent(skillId: string, ring: string) {
  if (skillId === 'computer-vision') {
    return (
      <g>
        <circle r="12" fill="#12141c" stroke="var(--border-default)" strokeWidth="1.2" />
        <path
          d="M-7,0 C-3.5,-4 3.5,-4 7,0 C3.5,4 -3.5,4 -7,0 Z"
          stroke="var(--accent-primary)"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="0" cy="0" r="1.5" fill="var(--accent-primary)" />
      </g>
    );
  }
  
  if (skillId === 'yolo') {
    return (
      <g>
        <circle r="12" fill="#12141c" stroke="var(--border-default)" strokeWidth="1.2" />
        <rect x="-7" y="-7" width="14" height="14" fill="none" stroke="var(--text-ghost)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <rect x="-3" y="-3" width="6" height="6" fill="rgba(0,245,160,0.15)" stroke="var(--accent-primary)" strokeWidth="0.8" />
      </g>
    );
  }

  const logoUrl = LOGO_MAP[skillId];
  const r = ring === 'core' ? 13 : ring === 'secondary' ? 11 : 9;
  
  return (
    <g>
      <circle r={r} className={styles.nodeCircleBackdrop} />
      {logoUrl && (
        <image
          href={logoUrl}
          x={-r + 2.5}
          y={-r + 2.5}
          width={(r - 2.5) * 2}
          height={(r - 2.5) * 2}
          className={styles.nodeImage}
        />
      )}
    </g>
  );
}

export interface SkillMapProps {
  hoveredSkillId: string | null;
  onHoverSkill: (id: string | null) => void;
  activeRing: string | null;
}

export function SkillMap({ hoveredSkillId, onHoverSkill, activeRing }: SkillMapProps) {
  // ── 1. Calculate circular node coordinates ─────────────────────────────────
  const nodeMap = useMemo(() => {
    // Group skills by ring so we can distribute them evenly
    const coreSkills = skills.filter((s) => s.ring === 'core');
    const secondarySkills = skills.filter((s) => s.ring === 'secondary');
    const familiaritySkills = skills.filter((s) => s.ring === 'familiarity');

    const coordinates: Record<string, { x: number; y: number; skill: Skill }> = {};

    const computeRingCoords = (ringSkills: Skill[], radius: number, angleOffsetDeg: number) => {
      const count = ringSkills.length;
      ringSkills.forEach((skill, index) => {
        const angleRad = ((index * 360) / count + angleOffsetDeg) * (Math.PI / 180);
        coordinates[skill.id] = {
          x: Math.round(radius * Math.cos(angleRad) * 100) / 100,
          y: Math.round(radius * Math.sin(angleRad) * 100) / 100,
          skill,
        };
      });
    };

    // Distribute skills along concentric rings (radii: 80, 155, 230)
    computeRingCoords(coreSkills, 80, 0);
    computeRingCoords(secondarySkills, 155, 15);
    computeRingCoords(familiaritySkills, 230, 30);

    return coordinates;
  }, []);

  // ── 2. Collect connection paths linking same-domain skills ───────────────
  const connectionPaths = useMemo(() => {
    const paths: Array<{
      id: string;
      skillId1: string;
      skillId2: string;
      d: string;
    }> = [];

    skillDomains.forEach((domain) => {
      // Collect skills inside this domain and sort them by ring hierarchy
      const skillsInDomain = domain.skillIds
        .map((id) => nodeMap[id])
        .filter(Boolean)
        .sort((a, b) => {
          const ringRank: Record<string, number> = { core: 1, secondary: 2, familiarity: 3 };
          return ringRank[a.skill.ring] - ringRank[b.skill.ring];
        });

      // Connect sequentially: core -> secondary -> familiarity
      for (let i = 0; i < skillsInDomain.length - 1; i++) {
        const nodeA = skillsInDomain[i];
        const nodeB = skillsInDomain[i + 1];

        // Draw a quadratic Bezier curve arcing slightly outward from center (0, 0)
        const mx = (nodeA.x + nodeB.x) / 2;
        const my = (nodeA.y + nodeB.y) / 2;
        // Extend control vector outwards by 15%
        const cx = mx * 1.15;
        const cy = my * 1.15;

        paths.push({
          id: `${domain.id}-${nodeA.skill.id}-${nodeB.skill.id}`,
          skillId1: nodeA.skill.id,
          skillId2: nodeB.skill.id,
          d: `M ${nodeA.x} ${nodeA.y} Q ${cx} ${cy} ${nodeB.x} ${nodeB.y}`,
        });
      }
    });

    return paths;
  }, [nodeMap]);

  // Determine text-anchor alignment based on quadrant position
  const getTextAnchor = (x: number) => {
    if (Math.abs(x) < 20) return 'middle';
    return x > 0 ? 'start' : 'end';
  };

  // Determine dx/dy label offsets based on coordinate positions
  const getLabelOffsets = (x: number, y: number) => {
    if (Math.abs(x) < 20) {
      return { dx: 0, dy: y > 0 ? 14 : -10 };
    }
    return { dx: x > 0 ? 10 : -10, dy: 4 };
  };

  // SVG dimensions: viewBox centered on (0, 0)
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg
        viewBox="-270 -270 540 540"
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* concentric circular rings */}
        <circle cx="0" cy="0" r="80" className={styles.mapRing} />
        <circle cx="0" cy="0" r="155" className={styles.mapRing} />
        <circle cx="0" cy="0" r="230" className={styles.mapRing} />

        {/* radial grid spokes */}
        <line x1="0" y1="-230" x2="0" y2="230" className={styles.spokeLine} />
        <line x1="-230" y1="0" x2="230" y2="0" className={styles.spokeLine} />

        {/* ── Ring Labels ── */}
        <text x="0" y="-86" className={styles.ringLabel}>CORE</text>
        <text x="0" y="-161" className={styles.ringLabel}>SUPPORTING</text>
        <text x="0" y="-236" className={styles.ringLabel}>FAMILIARITY</text>

        {/* ── Connection Lines ── */}
        {connectionPaths.map((path) => {
          const isHighlighted =
            hoveredSkillId === path.skillId1 ||
            hoveredSkillId === path.skillId2;
          
          return (
            <path
              key={path.id}
              d={path.d}
              className={cn(
                styles.connectionLine,
                isHighlighted && styles.connectionHighlighted
              )}
            />
          );
        })}

        {/* ── Center Core Hub ── */}
        <circle cx="0" cy="0" r="12" className={styles.centerOuter} />
        <circle cx="0" cy="0" r="5" className={styles.centerInner} />

        {/* ── Skill Nodes ── */}
        {Object.values(nodeMap).map(({ x, y, skill }) => {
          const isHovered = hoveredSkillId === skill.id;
          const isRingActive = activeRing === skill.ring;
          const isHighlighted = isHovered || isRingActive;
          
          const { dx, dy } = getLabelOffsets(x, y);
          const anchor = getTextAnchor(x);

          return (
            <g
              key={skill.id}
              transform={`translate(${x}, ${y})`}
              className={cn(
                styles.nodeGroup,
                isHighlighted && styles.nodeHighlighted,
                skill.ring === 'core' && styles.nodeCore,
                skill.ring === 'secondary' && styles.nodeSecondary,
                skill.ring === 'familiarity' && styles.nodeFamiliarity
              )}
              onMouseEnter={() => onHoverSkill(skill.id)}
              onMouseLeave={() => onHoverSkill(null)}
            >
              {/* Pulsing ring around hovered node */}
              {isHovered && (
                <circle r={skill.ring === 'core' ? 18 : skill.ring === 'secondary' ? 16 : 14} className={styles.hoverPulse} />
              )}
              
              {/* Skill content: backdrop circle + image logo */}
              {renderNodeContent(skill.id, skill.ring)}
              
              {/* Text label (reveals on hover/highlight) */}
              <text
                dx={dx}
                dy={dy}
                textAnchor={anchor}
                className={cn(
                  styles.nodeText,
                  skill.learning && styles.nodeTextLearning
                )}
              >
                {skill.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default SkillMap;
