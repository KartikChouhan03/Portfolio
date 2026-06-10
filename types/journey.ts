// ─────────────────────────────────────────────────────────────────────────────
// Journey Types
// Timeline data. Critical: narrative field is prose sentences, NOT bullet
// points. This is enforced by convention and documented here explicitly.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The type of timeline milestone.
 * - work: Employment or freelance engagement.
 * - education: Degree, bootcamp, significant course.
 * - achievement: Award, publication, open-source milestone, certification.
 */
export type JourneyType = 'work' | 'education' | 'achievement';

/**
 * A single entry on the vertical timeline in the Journey section.
 *
 * NARRATIVE REQUIREMENT (from UX spec):
 * The `narrative` field must be 2–3 complete sentences of prose. It must NOT
 * be a bullet list, a fragment, or a resume-style one-liner. The narrative
 * tells a small story about what was learned, built, or changed during this
 * period. This is what differentiates the portfolio from a LinkedIn profile.
 */
export interface JourneyItem {
  /** Unique identifier. Used as React key and potential anchor fragment. */
  id: string;

  /** Job title, degree name, or achievement name. */
  role: string;

  /** Company, university, or awarding body. */
  organization: string;

  /**
   * Human-readable date range shown in the UI.
   * Examples: "Jan 2023 – Present", "2021 – 2022", "March 2023"
   */
  dateRange: string;

  /**
   * ISO date string (YYYY-MM) for the start of this period.
   * Used for sorting items newest-first. Not displayed.
   */
  startDate: string;

  /**
   * ISO date string (YYYY-MM) for the end of this period.
   * Use 'present' for ongoing roles. Used for sorting only.
   */
  endDate: string | 'present';

  /**
   * 2–3 sentence narrative. MUST be prose. See type-level doc above.
   * Bad:  "- Built React apps\n- Worked with Node.js"
   * Good: "I joined as a generalist and left as a specialist, spending 18
   *        months deeply invested in computer vision pipelines that shipped
   *        to 50,000 daily users. The constraint of production deadlines
   *        taught me more about ML systems than any research paper."
   */
  narrative: string;

  /**
   * 2–3 key outcomes, technologies, or themes for the tag strip.
   * Kept brief — this is not a tech stack list.
   */
  tags: string[];

  /** Visual and semantic categorization. */
  type: JourneyType;
}