// ─────────────────────────────────────────────────────────────────────────────
// Skills Data
// UPDATE: Adjust skills to match your actual expertise.
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
  { id: 'python',        name: 'Python',        ring: 'core',        domain: 'ml' },
  { id: 'pytorch',       name: 'PyTorch',       ring: 'core',        domain: 'ml' },
  { id: 'system-design', name: 'System Design', ring: 'core',        domain: 'engineering' },
  { id: 'computer-vision', name: 'Computer Vision', ring: 'core',    domain: 'ml' },
  { id: 'nodejs',        name: 'Node.js',        ring: 'core',       domain: 'backend' },

  // ── Secondary ring (8–10 skills) ───────────────────────────────────────────
  { id: 'react',         name: 'React',          ring: 'secondary',  domain: 'frontend' },
  { id: 'typescript',    name: 'TypeScript',     ring: 'secondary',  domain: 'frontend' },
  { id: 'fastapi',       name: 'FastAPI',        ring: 'secondary',  domain: 'backend' },
  { id: 'postgresql',    name: 'PostgreSQL',     ring: 'secondary',  domain: 'backend' },
  { id: 'docker',        name: 'Docker',         ring: 'secondary',  domain: 'devops' },
  { id: 'mongodb',       name: 'MongoDB',        ring: 'secondary',  domain: 'backend' },
  { id: 'mlflow',        name: 'MLflow',         ring: 'secondary',  domain: 'ml' },
  { id: 'redis',         name: 'Redis',          ring: 'secondary',  domain: 'backend' },

  // ── Familiarity ring (6–8 skills) ──────────────────────────────────────────
  { id: 'kubernetes',    name: 'Kubernetes',     ring: 'familiarity', domain: 'devops',    learning: true },
  { id: 'rust',          name: 'Rust',           ring: 'familiarity', domain: 'engineering', learning: true },
  { id: 'kafka',         name: 'Kafka',          ring: 'familiarity', domain: 'backend',   learning: false },
  { id: 'nextjs',        name: 'Next.js',        ring: 'familiarity', domain: 'frontend',  learning: false },
  { id: 'transformers',  name: 'Transformers',   ring: 'familiarity', domain: 'ml',        learning: true },
  { id: 'terraform',     name: 'Terraform',      ring: 'familiarity', domain: 'devops',    learning: true },
];

// ── Domains ───────────────────────────────────────────────────────────────────
// Order determines display order in the skill list panel.

export const skillDomains: SkillDomain[] = [
  {
    id: 'ml',
    label: 'AI & Machine Learning',
    skillIds: ['python', 'pytorch', 'computer-vision', 'mlflow', 'transformers'],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    skillIds: ['nodejs', 'fastapi', 'postgresql', 'mongodb', 'redis', 'kafka'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skillIds: ['react', 'typescript', 'nextjs'],
  },
  {
    id: 'devops',
    label: 'DevOps & Infrastructure',
    skillIds: ['docker', 'kubernetes', 'terraform'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    skillIds: ['system-design', 'rust'],
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