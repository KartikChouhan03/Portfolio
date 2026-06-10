# Portfolio — Kartik Chouhan

A highly interactive developer portfolio built with **Next.js 16 (App Router, Turbopack, React 19)**, custom glassmorphic CSS, and fluid **Framer Motion** animations. 

Designed with a cybernetic, dark-mode terminal aesthetic tailored for an **AI, Machine Learning, and Full-Stack Software Engineer**.

---

## 🚀 Key Features & Interactive Experiences

### 1. Boot-up Intro Sequence & Morphing Dock
* **multilingual greeting capsule:** Elegant capsule-shaped center loader cycling through greeting states (`Namaste`, `Hello`, `Bonjour`, `Hola`, `Ciao`, `Kon'nichiwa`, `Guten Tag`, `Olá`) with a glowing emerald progress fill.
* **Layout Morph:** Once loaded, the greetings capsule seamlessly morphs (using layout projection `layoutId`) into the bottom macOS-inspired floating navigation dock.
* **No FOUC (Flash of Unstyled Content):** Hardcoded initial HTML CSS loading flags keep page content hidden until the loader finishes. Includes a `<noscript>` stylesheet fallback to keep the site readable if JS is disabled.

### 2. concentric Radial SVG Skill Map
* **Concentric rings:** Visually groups expertise into **Core Stack** ($r=80$), **Supporting Tech** ($r=155$), and **Familiarity** ($r=230$).
* **Tech Logo Nodes:** Circular node backdrops rendering official tech logos (loaded via CDN with custom inline SVG fallbacks for Computer Vision and YOLOv8 models).
* **Hover Highlights:** Hovering a logo node displays its text name dynamically (sliding up and fading in next to the icon) while highlighting the corresponding category chip on the right.

### 3. Animated Procedural Project grid
* ** سنابي (Snappy) Category Filtering:** Supports instant category-filtering of projects with smooth grid layout reflows (`layout="position"`).
* **Micro-Simulated SVG Thumbnails:** Projects without static thumbnails render active CSS-animated vector dashboards:
  * **DeceptiScan:** Green scanner sweeps with live DeBERTa-v3 inference metrics.
  * **SmartParkX:** Camera viewfinder target frames with a red laser scanner and slot occupancy boxes.
  * **BorrowBox:** P2P circular pool lines with floating nodes and transaction logs.
  * **RiskShield:** Concentric orange shield ripple rings with SHAP tree audit text.
  * **Foodify:** Node dispatch maps with location pins and animated route lines.
* **Shared Element Modal:** Clicking a card opens a modal overlay where the card's thumbnail, title, and structure expand smoothly into the detailed view.

### 4. Interactive Engineering Lab
* A digital terminal shell showcasing Kartik's actual technical scripts (PyTorch model loading, OpenCV filtering, SHAP explanations).
* Interactive tab selectors display codeblocks formatted in `JetBrains Mono` and render benchmark indicators.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 16.2.6 (App Router, React 19)
* **Compiler:** Turbopack (fast, local incremental compilation)
* **Animations:** `motion/react` (Framer Motion v12), Lenis Smooth Scroll
* **Styling:** PostCSS, Tailwind CSS v4, CSS Custom Variables
* **Icons:** Lucide React, jsdelivr Devicon CDN
* **Type-Safety:** TypeScript 5

---

## 📂 Repository Structure

```bash
neural-portfolio/
├── app/                      # Next.js pages & layouts
│   ├── globals.css           # Global custom typography, tokens, and loader classes
│   ├── layout.tsx            # Main HTML layout wrapper & noscript fallback
│   └── page.tsx              # Minimal home entry point
├── components/               # UI components
│   ├── about/                # Biography and metrics card
│   ├── contact/              # Call to action & links
│   ├── hero/                 # Typography overlay & WebGL visual core
│   ├── intro/                # Boot sequence loader
│   ├── journey/              # Career timeline cards
│   ├── lab/                  # Terminal code runner
│   ├── Layout/               # Navbar, footer, and navigation dock
│   ├── projects/             # Projects grid, category chips, and detail modals
│   ├── providers/            # Intro state, Lenis smooth scroll, and animation pause wrappers
│   ├── skills/               # SVG concentric radar map and domain list
│   └── ui/                   # Reusable components (Badge, Button, FocusTrap, SkipLink)
├── data/                     # Single source of truth data files
│   ├── journey.ts            # Career records
│   ├── meta.ts               # Name, contact info, bio, and metrics
│   ├── projects.ts           # Project titles, tech stacks, and metrics
│   └── skill.ts              # Skill rings and domain clusters
├── hooks/                    # Custom React hooks (scroll active, media matching, modals)
├── lib/                      # Helper scripts & variant configurations
└── types/                    # Strict TypeScript interface declarations
```

---

## 💻 Local Setup & Development

### 1. Installation
Clone the repository and install the project dependencies:
```bash
npm install
```

### 2. Start Development Server
Start the Next.js local development server with Turbopack enabled:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build
Compile and package the application for production deployment:
```bash
npm run build
```

### 4. TypeScript Checks
Run TypeScript compiler checks to ensure type safety:
```bash
npm run type-check
```

---

## ♿ Accessibility & Performance

* **Keyboard Trap:** Custom `FocusTrap` ensures accessibility inside the project modal overlay.
* **Skip Link:** A high-contrast keyboard skip link (`#main-content`) is available for screen-reader users.
* **Reduced Motion:** Full integration with the browser's `prefers-reduced-motion: reduce` preference (bypasses the intro sequence instantly and disables all layout scale animations).
* **Standardized Dates:** Unified date structures (`YYYY-MM-DD`) across data layers prevent layout sorting mismatches in Safari and mobile browser parsing engines.
