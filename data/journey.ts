// ─────────────────────────────────────────────────────────────────────────────
// Journey Data — Career timeline entries.
//
// CRITICAL: Each `narrative` field MUST be 2–3 complete prose sentences.
// Do NOT write bullet points. Do NOT write resume fragments.
// See types/journey.ts for the full requirement rationale.
// ─────────────────────────────────────────────────────────────────────────────

import type { JourneyItem } from '@/types';

export const journey: JourneyItem[] = [
  // ── Most recent first ─────────────────────────────────────────────────────

  {
    id: 'learnit-coordinator',
    role: 'Senior Coordinator',
    organization: 'LearnIT Technical Club',
    dateRange: 'Sep 2023 – May 2025',
    startDate: '2023-09-01',
    endDate: '2025-05-01',
    narrative:
      'As Senior Coordinator of the LearnIT club, I organized various technical workshops, coding competitions, and hackathons. Coordinating volunteer committees and event logistics allowed me to impact over 400 students while fostering a culture of collaborative peer-to-peer technical learning.',
    tags: ['Leadership', 'Community Building', 'Hackathons'],
    type: 'work',
  },

  {
    id: 'certifications',
    role: 'Professional Certifications',
    organization: 'Meta, IBM & Oracle',
    dateRange: '2024 – 2025',
    startDate: '2024-03-01',
    endDate: '2025-02-01',
    narrative:
      'Acquired foundational industry certifications including the Meta Backend Developer Professional Certificate, Meta JavaScript Certificate, IBM Data Analysis with Python, and Oracle Database Programming with SQL to strengthen my programming and data infrastructure skills.',
    tags: ['Meta Backend', 'Data Analysis', 'SQL'],
    type: 'achievement',
  },

  {
    id: 'manipal-education',
    role: 'B.Tech — Information Technology',
    organization: 'Manipal University Jaipur',
    dateRange: 'Aug 2023 – May 2027',
    startDate: '2023-08-01',
    endDate: 'present',
    narrative:
      'Pursuing my Bachelor of Technology degree with an 8.62 CGPA. Core coursework covers data structures, algorithms, databases, operating systems, and computer networks, complemented by elective focus in machine learning and computer vision architectures.',
    tags: ['Manipal Jaipur', 'Information Technology', 'Computer Science'],
    type: 'education',
  },

  {
    id: 'high-school-xii',
    role: 'CBSE Class XII',
    organization: 'Bal Bhawan School, Bhopal',
    dateRange: '2023',
    startDate: '2022-04-01',
    endDate: '2023-05-01',
    narrative:
      'Completed senior high school education under the CBSE board. Rigorous training in physics, chemistry, and mathematics established the strong logical thinking and problem-solving framework required for my engineering degree.',
    tags: ['Science & Maths', 'High School'],
    type: 'education',
  },

  {
    id: 'high-school-x',
    role: 'CBSE Class X',
    organization: 'Bal Bhawan School, Bhopal',
    dateRange: '2021',
    startDate: '2020-04-01',
    endDate: '2021-05-01',
    narrative:
      'Completed secondary high school under the CBSE board, scoring highly across science and computing classes. This period sparked my early curiosity about computer science, software logic, and automated systems.',
    tags: ['CBSE Board', 'Foundational Science'],
    type: 'education',
  },
];

/** Journey items confirmed sorted newest-first. */
export const sortedJourney = [...journey].sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
);