// ─────────────────────────────────────────────────────────────────────────────
// Skills Data
//
// RING LIMITS (from UX spec / SVG map architecture):
//   core:        4–5 skills   (inner ring, r=80)
//   secondary:   8–10 skills  (middle ring, r=150)
//   familiarity: 6–8 skills   (outer ring, r=220)
//
// Total cap: 23 skills. Beyond this the SVG map becomes unreadable.
// ─────────────────────────────────────────────────────────────────────────────

import type { Skill, SkillDomain } from '@/types';

// ── Skills ────────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // ── Core ring (4–5 skills) ─────────────────────────────────────────────────
  { id: 'python',          name: 'Python',          ring: 'core',        domain: 'ml' },
  { id: 'pytorch',         name: 'PyTorch',         ring: 'core',        domain: 'ml' },
  { id: 'nodejs',          name: 'Node.js',         ring: 'core',        domain: 'backend' },
  { id: 'computer-vision', name: 'Computer Vision', ring: 'core',        domain: 'ml' },
  { id: 'cpp',             name: 'C++',             ring: 'core',        domain: 'engineering' },

  // ── Secondary ring (8–10 skills) ───────────────────────────────────────────
  { id: 'react',           name: 'React.js',        ring: 'secondary',   domain: 'frontend' },
  { id: 'typescript',      name: 'TypeScript',      ring: 'secondary',   domain: 'frontend' },
  { id: 'fastapi',         name: 'FastAPI',         ring: 'secondary',   domain: 'backend' },
  { id: 'django',          name: 'Django',          ring: 'secondary',   domain: 'backend' },
  { id: 'mongodb',         name: 'MongoDB',         ring: 'secondary',   domain: 'backend' },
  { id: 'postgresql',      name: 'PostgreSQL',      ring: 'secondary',   domain: 'backend' },
  { id: 'scikit-learn',    name: 'Scikit-Learn',    ring: 'secondary',   domain: 'ml' },
  { id: 'opencv',          name: 'OpenCV',          ring: 'secondary',   domain: 'ml' },
  { id: 'git',             name: 'Git',             ring: 'secondary',   domain: 'devops' },

  // ── Familiarity ring (6–8 skills) ──────────────────────────────────────────
  { id: 'tailwind',        name: 'Tailwind CSS',    ring: 'familiarity', domain: 'frontend',   learning: false },
  { id: 'transformers',    name: 'Transformers',    ring: 'familiarity', domain: 'ml',         learning: true },
  { id: 'yolo',            name: 'YOLOv8',          ring: 'familiarity', domain: 'ml',         learning: true },
  { id: 'express',         name: 'Express.js',      ring: 'familiarity', domain: 'backend',    learning: false },
  { id: 'sqlite',          name: 'SQLite',          ring: 'familiarity', domain: 'backend',    learning: false },
  { id: 'linux',           name: 'Linux',           ring: 'familiarity', domain: 'devops',     learning: false },
  { id: 'figma',           name: 'Figma',           ring: 'familiarity', domain: 'frontend',   learning: false },
];

// ── Domains ───────────────────────────────────────────────────────────────────
// Order determines display order in the skill list panel.

export const skillDomains: SkillDomain[] = [
  {
    id: 'ml',
    label: 'AI & Machine Learning',
    skillIds: ['python', 'pytorch', 'computer-vision', 'scikit-learn', 'opencv', 'transformers', 'yolo'],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    skillIds: ['nodejs', 'fastapi', 'django', 'mongodb', 'postgresql', 'express', 'sqlite'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skillIds: ['react', 'typescript', 'tailwind', 'figma'],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skillIds: ['git', 'linux'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    skillIds: ['cpp'],
  },
];

// ── Derived lookups ────────────────────────────────────────────────────────────

/** Fast O(1) lookup of a skill by ID. */
export const skillById = Object.fromEntries(
  skills.map((s) => [s.id, s]),
) as Record<string, Skill>;

/** Skills grouped by ring for the SVG radial map builder. */
export const skillsByRing = {
  core: skills.filter((s) => s.ring === 'core'),
  secondary: skills.filter((s) => s.ring === 'secondary'),
  familiarity: skills.filter((s) => s.ring === 'familiarity'),
} as const;