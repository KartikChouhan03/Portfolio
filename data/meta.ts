// ─────────────────────────────────────────────────────────────────────────────
// Site Meta — Single source of truth for all identity strings.
// ─────────────────────────────────────────────────────────────────────────────

export const meta = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'Kartik Chouhan',
  firstName: 'Kartik',
  lastName: 'Chouhan',

  // ── Role ──────────────────────────────────────────────────────────────────
  role: 'Software Engineer | Full-Stack Developer | AI/ML & Computer Vision',

  // ── Tagline ───────────────────────────────────────────────────────────────
  tagline:
    'Building intelligent software systems that combine modern web technologies, backend engineering, machine learning, and computer vision to solve real-world problems.',

  // ── Bio variants ──────────────────────────────────────────────────────────
  bioShort:
    'Information Technology student at Manipal University Jaipur focusing on software engineering, full-stack development, AI/ML, and computer vision.',

  bioLong:
    'I am a final-year Information Technology student at Manipal University Jaipur with a strong interest in software engineering, full-stack development, artificial intelligence, and computer vision. I enjoy building end-to-end systems that combine modern web technologies, backend infrastructure, machine learning models, and real-world automation. My projects range from AI-powered review analysis and computer vision applications to full-stack platforms designed to solve practical problems. Currently, I focus on developing scalable software solutions while continuously exploring machine learning, intelligent systems, and backend architecture.',

  // ── Statement ─────────────────────────────────────────────────────────────
  statement: 'Building Intelligent Software Systems.',

  // ── Metrics ───────────────────────────────────────────────────────────────
  metrics: [
    { value: 5, suffix: '+', label: 'Major Projects' },
    { value: 400, suffix: '+', label: 'Students Impacted' },
    { value: 4, suffix: '+', label: 'Professional Certifications' },
    { value: 96.8, suffix: '%', label: 'DeceptiScan Model Accuracy' },
  ],

  // ── Contact & Social ──────────────────────────────────────────────────────
  email: 'chouhankartik3300@gmail.com',
  github: 'https://github.com/KartikChouhan03',
  linkedin: 'https://www.linkedin.com/in/kartik-chouhan-255369270/',
  twitter: null as string | null,

  // ── Location ──────────────────────────────────────────────────────────────
  location: 'Bhopal, India',

  // ── SEO ───────────────────────────────────────────────────────────────────
  siteUrl: 'https://kartikchouhan.dev', // Default placeholder domain for Kartik
  ogImage: '/og/cover.png',
} as const;

export const aboutCards = [
  {
    title: 'FOCUS',
    body: 'Full-stack development, AI/ML applications, computer vision systems, and intelligent automation.',
    icon: 'brain',
  },
  {
    title: 'APPROACH',
    body: 'Building practical software solutions by combining clean architecture, scalable backend systems, and data-driven intelligence.',
    icon: 'cpu',
  },
  {
    title: 'BEYOND CODE',
    body: 'Active technical community contributor, event organizer, and continuous learner exploring emerging technologies and real-world problem solving.',
    icon: 'globe',
  },
] as const;

// ── Type helpers ──────────────────────────────────────────────────────────────

export type Meta = typeof meta;
export type MetricItem = (typeof meta.metrics)[number];
export type AboutCardItem = (typeof aboutCards)[number];