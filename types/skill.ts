// ─────────────────────────────────────────────────────────────────────────────
// Skill Types
// Three-ring radial architecture: core → secondary → familiarity
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Radial ring position in the SVG skill map.
 * - core: Primary identity skills. 4–5 max. Center ring.
 * - secondary: Supporting skills. 8–10 max. Middle ring.
 * - familiarity: In-progress or breadth skills. 6–8 max. Outer ring.
 */
export type SkillRing = 'core' | 'secondary' | 'familiarity';

/**
 * Individual skill node. Maps to both a chip in the domain list
 * and a node in the SVG radial map.
 */
export interface Skill {
  /** Unique identifier. Used to sync hover state between list and SVG. */
  id: string;

  /** Display label shown on the chip and SVG node. */
  name: string;

  /** Which concentric ring this skill belongs to. */
  ring: SkillRing;

  /** Domain ID — links this skill to a SkillDomain group. */
  domain: string;

  /**
   * If true, renders with a dashed border and "(learning)" label.
   * Reserved for outer ring skills only by convention.
   */
  learning?: boolean;
}

/**
 * Domain grouping shown in the right-side list of the Skills section.
 * Each domain maps to a vertical group with a label and skill chips.
 */
export interface SkillDomain {
  /** Unique identifier. Matches Skill.domain values. */
  id: string;

  /** Display label shown above the chip group. Uppercase in UI. */
  label: string;

  /**
   * Ordered list of skill IDs belonging to this domain.
   * IDs must correspond to skills in the skills array.
   */
  skillIds: string[];
}