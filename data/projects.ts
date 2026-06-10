import type { Project } from '@/types';

export const projects: Project[] = [
  // ── Featured project ──────────────────────────────────────────────────────
  {
    id: 'smartparkx',
    title: 'SmartParkX',
    shortDescription: 'AI-powered parking system reducing urban congestion.',
    longDescription: `SmartParkX is a real-time intelligent parking management platform built to reduce urban traffic congestion through predictive slot allocation. The system processes live CCTV feeds using a custom-trained YOLOv8 model to detect occupied and vacant slots with 95% accuracy across variable lighting conditions.

The backend is a Node.js microservices architecture with MongoDB for slot state persistence and Redis for sub-100ms cache lookups. A React dashboard gives operators real-time occupancy maps and historical analytics. The ML inference pipeline runs on-device at parking facilities using ONNX Runtime, removing the latency and cost of cloud inference for time-critical detections.

The system reduced average vehicle search time by 40% in the pilot deployment and demonstrated a 28% reduction in emissions from circling traffic in the monitored zone.`,
    tech: ['Python', 'YOLOv8', 'Node.js', 'React', 'MongoDB', 'Redis', 'ONNX'],
    category: 'vision',
    impactMetric: 'Reduced vehicle search time by 40%',
    thumbnail: null,
    githubUrl: 'https://github.com/kartik-chouhan/smartparkx',
    liveUrl: null,
    featured: true,
    completedAt: '2024-06',
  },

  // ── Project 2 ──────────────────────────────────────────────────────────────
  {
    id: 'neural-pipe',
    title: 'NeuralPipe: ML Training Pipeline',
    shortDescription: 'Distributed training pipeline reducing training lifecycle times by 35%.',
    longDescription: `NeuralPipe is a distributed ML Ops training and orchestration pipeline built for automated model evaluation, checkpoint tracking, and model registry uploads. The system monitors raw data directories, triggers preprocessing workers to clean and slice datasets, and launches parallel PyTorch training runs across multi-GPU setups.

Using MLflow, the pipeline tracks training loss curves, evaluation accuracy, and model artifacts in real time. Model training weights are dynamically quantized to int8 format using TensorRT before registration, ensuring immediate deployment readiness. FastAPI endpoints expose model health states, batch sizes, and dataset version hashes to developers.

The project successfully automated the manual model iteration process, reducing human setup error rate to 0% and improving training cycle speeds by 35% across four internal vision and text classification projects.`,
    tech: ['Python', 'PyTorch', 'MLflow', 'TensorRT', 'FastAPI', 'Docker'],
    category: 'ai-ml',
    impactMetric: 'Accelerated training cycles by 35%',
    thumbnail: null,
    githubUrl: 'https://github.com/kartik-chouhan/neural-pipe',
    liveUrl: null,
    featured: false,
    completedAt: '2024-03',
  },

  // ── Project 3 ──────────────────────────────────────────────────────────────
  {
    id: 'distributa',
    title: 'Distributa: Task Queue',
    shortDescription: 'Fault-tolerant worker queue processing 10k messages per second under 15ms.',
    longDescription: `Distributa is a highly concurrent, distributed task queue designed for heavy asynchronous background workloads. It manages job serialization, retry backoffs, and execution state reporting across dynamic worker sets. Built with Node.js and TypeScript, the system leverages Redis stream datatypes to achieve high throughput and persistent log preservation.

To maintain system stability during network partitions, Distributa implements a custom lock mechanism using Redlock, preventing duplicate worker execution. A React dashboard provides operations teams with live throughput metrics, queue depths, worker statuses, and dead-letter queue investigation portals.

The system consistently sustains a throughput of 10,000 requests per second with message processing latency under 15ms, resolving bottleneck issues for real-time notification dispatches.`,
    tech: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL', 'Docker', 'React'],
    category: 'backend',
    impactMetric: 'Processes 10k messages/sec under 15ms',
    thumbnail: null,
    githubUrl: 'https://github.com/kartik-chouhan/distributa',
    liveUrl: null,
    featured: false,
    completedAt: '2023-11',
  },

  // ── Project 4 ──────────────────────────────────────────────────────────────
  {
    id: 'scrape-hub',
    title: 'ScrapeHub: Scraper Pipeline',
    shortDescription: 'Parallel web extraction cluster parsing 50k records daily with dynamic proxying.',
    longDescription: `ScrapeHub is a highly parallelized data collection and parsing cluster built to aggregate unstructured web data for market intelligence models. The system routes network traffic dynamically through rotating proxies to bypass rate limits and employs Playwright to load dynamic javascript-rendered page contents.

FastAPI endpoints schedule extraction tasks, which are distributed across Celery workers running on lightweight Docker containers. Extracted data runs through automated schemas to sanitize character inputs and validate types before writing to PostgreSQL, with invalid formats piped into a manual review queue.

The pipeline processes over 50,000 target records daily, maintaining a success rate of 99.4% while reducing manual scraping workloads by approximately 80 hours per week.`,
    tech: ['Python', 'Playwright', 'FastAPI', 'Celery', 'PostgreSQL', 'Docker'],
    category: 'automation',
    impactMetric: 'Parses 50k records daily with 99.4% success',
    thumbnail: null,
    githubUrl: 'https://github.com/kartik-chouhan/scrape-hub',
    liveUrl: null,
    featured: false,
    completedAt: '2023-08',
  },
];

/** Projects sorted newest-first by completedAt date. */
export const sortedProjects = [...projects].sort(
  (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
);

/** Only projects marked as featured. Used for hero-adjacent showcases. */
export const featuredProjects = projects.filter((p) => p.featured);

/** All unique categories present in the project list (for filter chip generation). */
export const projectCategories = Array.from(
  new Set(projects.map((p) => p.category))
);