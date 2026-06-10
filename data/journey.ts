// ─────────────────────────────────────────────────────────────────────────────
// Journey Data — Career timeline entries.
//
// CRITICAL: Each `narrative` field MUST be 2–3 complete prose sentences.
// Do NOT write bullet points. Do NOT write resume fragments.
// See types/journey.ts for the full requirement rationale.
//
// UPDATE: Replace all placeholder entries with real timeline items.
// Sort newest-first — the UI renders in array order.
// ─────────────────────────────────────────────────────────────────────────────

import type { JourneyItem } from '@/types';

export const journey: JourneyItem[] = [
  // ── Most recent first ─────────────────────────────────────────────────────

  {
    id: 'current-role',
    role: 'Full-Stack Developer & AI/ML Engineer', // UPDATE
    organization: 'Independent / Freelance', // UPDATE
    dateRange: '2024 – Present',
    startDate: '2024-01',
    endDate: 'present',
    // UPDATE: Replace with your real narrative. 2–3 sentences of prose.
    narrative:
      'Working independently on production AI systems, I have been able to pursue the intersection of computer vision and robust backend engineering without the constraints of a single technology stack. Each project has reinforced my belief that the hardest part of ML engineering is not the model — it is the infrastructure that keeps it running at 3am on a Monday.',
    tags: ['Computer Vision', 'System Design', 'ML Ops'],
    type: 'work',
  },

  {
    id: 'education-degree',
    role: 'Bachelor of Engineering — Computer Science', // UPDATE
    organization: 'Your University', // UPDATE
    dateRange: '2020 – 2024', // UPDATE
    startDate: '2020-07',
    endDate: '2024-05',
    // UPDATE: Replace with your real narrative.
    narrative:
      'Four years that moved from theoretical foundations to production systems, anchored by a final-year project that became SmartParkX. The computer vision coursework gave me the vocabulary; the side projects gave me the intuition that no classroom could.',
    tags: ['Computer Science', 'Machine Learning', 'Algorithms'],
    type: 'education',
  },

  {
    id: 'internship-1',
    role: 'Computer Vision Intern',
    organization: 'PixelCraft Technologies',
    dateRange: 'May 2023 – Aug 2023',
    startDate: '2023-05',
    endDate: '2023-08',
    narrative:
      'Designed and integrated a real-time object tracking module into an industrial quality monitoring system. Optimized OpenCV routines and deployed lightweight YOLO inference models to identify manufacturing defects on moving conveyor belts under a strict 20ms latency budget.',
    tags: ['OpenCV', 'YOLOv5', 'Python'],
    type: 'work',
  },

  {
    id: 'achievement-1',
    role: 'First Place Winner — ML Hackathon',
    organization: 'Nexus AI Hackathon',
    dateRange: 'November 2023',
    startDate: '2023-11',
    endDate: '2023-11',
    narrative:
      'Co-developed a dynamic hazard detection algorithm for cyclist cameras in 36 hours. Managed real-time frame serialization and streaming pipelines to ensure critical alerts reached users with sub-15ms processing latency, winning top honors among 50 competing teams.',
    tags: ['PyTorch', 'FastAPI', 'WebSockets'],
    type: 'achievement',
  },
];

// ── Derived exports ────────────────────────────────────────────────────────────

/** Journey items confirmed sorted newest-first. */
export const sortedJourney = [...journey].sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
);