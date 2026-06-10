// ─────────────────────────────────────────────────────────────────────────────
// Site Meta — Single source of truth for all identity strings.
// UPDATE: Replace all placeholder values with real information before launch.
// ─────────────────────────────────────────────────────────────────────────────

export const meta = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'Kartik Chouhan',
  firstName: 'Kartik',
  lastName: 'Chouhan',

  // ── Role ──────────────────────────────────────────────────────────────────
  // Shown in navbar logotype and document title.
  role: 'Full-Stack Developer & AI/ML Engineer',

  // ── Tagline ───────────────────────────────────────────────────────────────
  // Used in hero description paragraph and meta description.
  tagline:
    'Building intelligent systems with computer vision, backend engineering, and automation.',

  // ── Bio variants ──────────────────────────────────────────────────────────
  // bioShort: Used in About section card and OG description. 1–2 sentences.
  bioShort:
    'AI/ML engineer building production systems that bridge computer vision, backend infrastructure, and intelligent automation.',

  // bioLong: Used in About section main text. 4–5 sentences of genuine voice.
  // UPDATE: Write this in your own voice. Avoid resume-speak.
  bioLong:
    'I build systems that think. With a focus on computer vision and backend engineering, I architect ML pipelines that go from research to production — not just models that work in notebooks, but systems that work at scale. I care about the intersection of rigorous software engineering and intelligent systems design. When I am not shipping features, I am tinkering with the underlying mechanics: training loops, inference optimization, and the unglamorous work of making ML reliable.',

  // ── Statement ─────────────────────────────────────────────────────────────
  // Large display text in About section left zone. One powerful sentence.
  // UPDATE: Make this your own. It should sound like you, not a job posting.
  statement: 'I build systems that think.',

  // ── Metrics ───────────────────────────────────────────────────────────────
  // Shown as animated counters in the About section.
  // UPDATE: Replace with real, verifiable numbers.
  metrics: [
    { value: 3, suffix: '+', label: 'Years ML experience' },
    { value: 12, suffix: '+', label: 'Production systems' },
    { value: 8, suffix: '+', label: 'Open source contributions' },
    { value: 95, suffix: '%', label: 'Model accuracy (SmartParkX)' },
  ],

  // ── Contact & Social ──────────────────────────────────────────────────────
  // UPDATE: Replace all with real URLs and email.
  email: 'kartik@example.com', // UPDATE
  github: 'https://github.com/kartik-chouhan', // UPDATE
  linkedin: 'https://linkedin.com/in/kartik-chouhan', // UPDATE
  twitter: null as string | null, // UPDATE or keep null

  // ── Location ──────────────────────────────────────────────────────────────
  location: 'India',

  // ── SEO ───────────────────────────────────────────────────────────────────
  siteUrl: 'https://kartik.dev', // UPDATE with real domain
  ogImage: '/og/cover.png', // CREATE this image before launch
} as const;

export const aboutCards = [
  {
    title: 'FOCUS',
    body: 'AI/ML engineering, computer vision pipelines, and optimizing neural inference for production environments.',
    icon: 'brain',
  },
  {
    title: 'APPROACH',
    body: 'Architecting robust backend pipelines and modular systems that bridge hardware constraints and high scalability.',
    icon: 'cpu',
  },
  {
    title: 'BEYOND CODE',
    body: 'Committed to open source collaboration, technical storytelling, and exploring the ethical dimensions of intelligence.',
    icon: 'globe',
  },
] as const;

// ── Type helpers ──────────────────────────────────────────────────────────────

export type Meta = typeof meta;
export type MetricItem = (typeof meta.metrics)[number];
export type AboutCardItem = (typeof aboutCards)[number];