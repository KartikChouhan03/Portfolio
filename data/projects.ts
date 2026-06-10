import type { Project } from '@/types';

export const projects: Project[] = [
  // ── Featured project 1: DeceptiScan ────────────────────────────────────────
  {
    id: 'deceptiscan',
    title: 'DeceptiScan',
    shortDescription: 'AI-powered fake review detector and ML platform with a 96.8% fine-tuned classifier.',
    longDescription: `DeceptiScan is a real-time AI-powered browser extension and machine learning platform designed to detect fake, AI-generated, and manipulative product reviews on e-commerce websites. The platform integrates a Chrome extension frontend built with React and Plasmo with a high-performance FastAPI backend. The detection engine is powered by a fine-tuned DeBERTa-v3 sequence classification model trained on over 72,000 samples, generating credibility insights and trust scores for products dynamically. By optimizing the PyTorch inference pipeline to run in approximately 12ms per review, the platform flags suspicious feedback instantly and provides buyers with explainable AI insights.`,
    tech: ['React', 'TypeScript', 'Plasmo', 'FastAPI', 'PyTorch', 'Hugging Face', 'DeBERTa-v3', 'Python'],
    category: 'ai-ml',
    impactMetric: '96.8% Fine-Tuned Model Accuracy',
    thumbnail: null,
    githubUrl: 'https://github.com/KartikChouhan03/DeceptiScan',
    liveUrl: null,
    featured: true,
    completedAt: '2024-10-01',
  },

  // ── Featured project 2: SmartParkX ─────────────────────────────────────────
  {
    id: 'smartparkx',
    title: 'SmartParkX',
    shortDescription: 'Intelligent parking management system combining IoT sensors and computer vision.',
    longDescription: `SmartParkX is an end-to-end automated parking management system designed to track vehicle check-ins, slots, and billings in real time. The system uses ESP32 microcontrollers integrated with ultrasonic and IR sensors to monitor parking slot occupancy and push status updates to the Express server. The platform incorporates a computer vision workflow using OpenCV and Tesseract OCR to perform Automatic Number Plate Recognition (ANPR) at entry and exit gates. Slot states, check-in logs, and billing metadata are persisted on MongoDB Atlas and displayed on a sleek React administrator dashboard, optimizing lot occupancy operations without manual logs.`,
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenCV', 'Tesseract OCR', 'ESP32', 'Tailwind CSS'],
    category: 'vision',
    impactMetric: 'Real-time CV plate recognition',
    thumbnail: null,
    githubUrl: 'https://github.com/KartikChouhan03/SmartParkX',
    liveUrl: null,
    featured: true,
    completedAt: '2024-06-01',
  },

  // ── Project 3: BorrowBox ───────────────────────────────────────────────────
  {
    id: 'borrowbox',
    title: 'BorrowBox',
    shortDescription: 'Campus peer-to-peer equipment rental web platform for circular-economy sharing.',
    longDescription: `BorrowBox is a student-focused circular-economy rental web application designed to help campus students securely lend and borrow academic and personal equipment. Built with a Django and Django REST Framework backend, the application exposes endpoints for user profiles, asset listings, borrow request lifecycles, notification dispatches, and review ratings. It manages user authentication via Django's secure frameworks, institutional account validation, and asset discovery catalogs using PostgreSQL. The circular economy workflow helps reduce student expenditure on temporary items by monetizing underutilized assets.`,
    tech: ['Django', 'PostgreSQL', 'JavaScript', 'HTML5', 'CSS3', 'Django REST Framework', 'SQLite'],
    category: 'backend',
    impactMetric: 'Circular economy rental system',
    thumbnail: null,
    githubUrl: 'https://github.com/KartikChouhan03/BorrowBox',
    liveUrl: null,
    featured: false,
    completedAt: '2024-02-01',
  },

  // ── Project 4: RiskShield ──────────────────────────────────────────────────
  {
    id: 'riskshield',
    title: 'RiskShield',
    shortDescription: 'Explainable AI transaction fraud detector with SHAP-based model interpretability.',
    longDescription: `RiskShield is an intelligent financial transaction auditing and fraud detection system trained on over 284,000 credit card entries. Developed with Scikit-Learn, the model calculates probability scores for incoming transactions and sorts them into low, medium, and high risk categories. The system utilizes SHAP (SHapley Additive exPlanations) to explain feature importances, breaking down exactly which factors (e.g., amount, location, history) drove the risk score. A clean Streamlit application serves as the operator panel, presenting transaction risk distributions and explainable model insights.`,
    tech: ['Python', 'Scikit-Learn', 'SHAP', 'Streamlit', 'Pandas', 'NumPy'],
    category: 'ai-ml',
    impactMetric: 'Probability-based risk scoring',
    thumbnail: null,
    githubUrl: 'https://github.com/KartikChouhan03/RiskShield',
    liveUrl: null,
    featured: false,
    completedAt: '2023-11-01',
  },

  // ── Project 5: Foodify ──────────────────────────────────────────────────────
  {
    id: 'foodify',
    title: 'Foodify',
    shortDescription: 'Full-stack food ordering platform with Stripe/Razorpay integrations and an admin panel.',
    longDescription: `Foodify is a complete food ordering and restaurant management platform built using the MERN stack. It includes a frontend customer application for user sign-ups, menu search, cart configurations, and secure online checkouts powered by Stripe and Razorpay integrations. The backend utilizes Express and Node.js with JSON Web Tokens (JWT) for secure authentication. An interactive administration dashboard enables restaurant operators to upload food items via Multer, manage menu availability, and track delivery logs dynamically.`,
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Razorpay', 'JWT', 'Vite'],
    category: 'backend',
    impactMetric: 'Complete ordering & admin flow',
    thumbnail: null,
    githubUrl: 'https://github.com/KartikChouhan03/Foodify-food_delivery_app',
    liveUrl: null,
    featured: false,
    completedAt: '2023-08-01',
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