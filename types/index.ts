// ─────────────────────────────────────────────────────────────────────────────
// Types barrel export
// Import all types from '@/types' — never import from individual type files.
// This keeps refactoring isolated to this file.
// ─────────────────────────────────────────────────────────────────────────────

export type {
  Project,
  FeaturedProject,
  ProjectCategory,
} from './project';

export type {
  Skill,
  SkillDomain,
  SkillRing,
} from './skill';

export type {
  JourneyItem,
  JourneyType,
} from './journey';