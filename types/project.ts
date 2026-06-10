// ─────────────────────────────────────────────────────────────────────────────
// Project Types
// Matches the filter categories defined in the UX spec and ProjectCard anatomy.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Filter category values used in the Projects section filter chips.
 * 'all' is a UI-only value — never stored on a Project object.
 */
export type ProjectCategory =
  | 'ai-ml'
  | 'backend'
  | 'vision'
  | 'automation'
  | 'fullstack';

/**
 * Full project data shape. All fields required unless explicitly optional.
 * shortDescription must be ≤ 12 words — enforced by convention, not runtime.
 */
export interface Project {
  /** Unique slug — used as layoutId key and URL hash fragment. */
  id: string;

  /** Display title shown on card and modal. */
  title: string;

  /**
   * One-line card description. Hard limit: 12 words.
   * Used on the ProjectCard beneath the title.
   */
  shortDescription: string;

  /**
   * Full markdown-compatible description for the modal.
   * 3–5 paragraphs covering: problem, approach, technical decisions, outcome.
   */
  longDescription: string;

  /** Ordered technology/tool list. First 2–3 shown as badges on card. */
  tech: string[];

  /** Used by the filter system. */
  category: ProjectCategory;

  /**
   * Single bold outcome metric shown in accent color on the card.
   * Examples: "Reduced processing time by 40%", "3,000+ daily active users"
   */
  impactMetric: string;

  /**
   * Path to thumbnail image relative to /public.
   * If null, the card renders a procedural abstract placeholder.
   */
  thumbnail: string | null;

  /** GitHub repository URL. Null if private/proprietary. */
  githubUrl: string | null;

  /** Live deployment URL. Null if not deployed. */
  liveUrl: string | null;

  /**
   * If true, this project is eligible for the "Featured" layout
   * (the asymmetric first-card treatment in the Projects grid).
   * Only the first featured project in the array receives the large-card layout.
   */
  featured: boolean;

  /**
   * ISO date string (YYYY-MM) for sorting. Not displayed directly.
   * Used to determine default sort order.
   */
  completedAt: string;
}

/** Narrowed type for projects confirmed as featured. */
export type FeaturedProject = Project & { featured: true };