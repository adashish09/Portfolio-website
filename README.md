# Ashish Kumar — Developer Portfolio & Digital Engineering Workspace

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-Visit%20Website-00f2fe?style=for-the-badge)](https://ashish-portfolio-dev.netlify.app/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%203D-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00f2fe.svg?style=for-the-badge)](LICENSE)

A state-of-the-art, interactive digital engineering showcase and developer workspace built with **React 19**, **Three.js**, **Vite 8**, **Material UI 9**, and **Framer Motion**.

🌐 **Live Deployment:** [ashish-portfolio-dev.netlify.app](https://ashish-portfolio-dev.netlify.app/)

The platform fuses a high-performance portfolio interface with an interactive in-browser developer terminal, spotlight command palette, multi-universe 3D WebGL background engine, interactive 3D holographic architecture core, deep project breakdowns, and an embedded resume viewer.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [1. Multi-Dimensional 3D WebGL Background Engine](#1-multi-dimensional-3d-webgl-background-engine)
  - [2. Cinematic Theme Warp Transitions](#2-cinematic-theme-warp-transitions)
  - [3. Interactive In-Browser Developer Console](#3-interactive-in-browser-developer-console)
  - [4. Interactive 3D Holographic Architecture Core](#4-interactive-3d-holographic-architecture-core)
  - [5. Spotlight Command Palette (`⌘K` / `Ctrl+K`)](#5-spotlight-command-palette-k--ctrlk)
  - [6. Dynamic Tech Arsenal & Architecture Inspector](#6-dynamic-tech-arsenal--architecture-inspector)
  - [7. Project Architecture Showcases & Deep Dives](#7-project-architecture-showcases--deep-dives)
  - [8. GitHub Engineering Activity & Telemetry](#8-github-engineering-activity--telemetry)
  - [9. Responsive Mobile HUD Experience](#9-responsive-mobile-hud-experience)
- [Technology Stack](#technology-stack)
- [Featured Projects](#featured-projects)
- [Developer Console Commands](#developer-console-commands)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Education and Certifications](#education-and-certifications)
- [Contact](#contact)
- [License](#license)

---

## Overview

Designed as an interactive developer workspace rather than a conventional static CV, this portfolio reflects modern software engineering standards:

- **AI & Document Intelligence Systems:** Local LLMs, RAG vector pipelines, and contextual inference.
- **Systems & Network Engineering:** Linux daemons, packet capture engines, and intrusion detection.
- **Cross-Platform & Native Mobile Applications:** Android and Flutter apps engineered with offline-first synchronization.
- **Full-Stack Architecture:** Reactive frontends, REST APIs, WebSockets, and real-time telemetry streaming.
- **3D Graphics & Creative Web Engineering:** Three.js shaders, orbital satellite simulations, and responsive WebGL rendering at 60/120 FPS.

---

## Key Features

### 1. Multi-Dimensional 3D WebGL Background Engine

The background is driven by a custom Three.js engine (`ParticleBackground.jsx`) that dynamically switches visuals based on the active universe:

| Universe Preset | Visual World & Mechanics |
| --- | --- |
| **🌌 Cosmic Cyber** | Deep-space starfield with mouse gravitational vortex, cursor constellation tethering, and traveling photon pulses. |
| **🌆 Neon Synthwave** | 3D cyber warp tunnel featuring glowing octagonal gates, infinite horizon grid, and luminous laser rails. |
| **💻 Matrix Terminal** | 3D encrypted digital code rain columns, falling binary glyph streamers, and cursor wake repulsion. |
| **❄️ Nordic Frost** | Minimalist glacier light theme with floating crystalline spheres, ambient frost particles, and icy specular highlights. |

All scenes feature smooth pointer interpolation, spring easing, and delta-time clamping to maintain silky-smooth 60/120 FPS performance across all devices.

### 2. Cinematic Theme Warp Transitions

Switching themes triggers the `ThemeWarpTransition` component:
- The outgoing universe fades away under an ethereal frosted blur veil.
- The new universe sweeps in behind an energetic neon laser aurora beam.
- A floating holographic HUD badge confirms the newly initialized universe and tagline.

### 3. Interactive In-Browser Developer Console

The embedded `DeveloperConsole` (`#console`) offers a authentic Unix-like terminal environment with:
- **Interactive Shell Tab (`terminal.sh`):** Real-time command evaluation, persistent scroll buffer, command history, and instant chip shortcuts.
- **Live IST Time Telemetry:** Real-time Indian Standard Time clock ticker in the terminal status bar.
- **System Telemetry Tab (`telemetry.json`):** Formatted inspection of runtime vitals, memory overhead, core technologies, and active services.
- **Command Guide Tab (`guide.sh`):** Quick manual and one-click execution triggers for all terminal routines.
- **Direct Terminal Return:** Quick "← Back to Terminal" controls across all supplementary tabs.

### 4. Interactive 3D Holographic Architecture Core

Integrated directly into the console as the `hologram.3d` tab:
- **Three.js WebGL Scene:** A pulsating wireframe icosahedron surrounded by rotating holographic rings and orbital satellite spheres.
- **Interactive Pillar Inspection:** Clickable satellites and HUD selector pills for inspecting core engineering specializations:
  1. *Local AI / RAG Engine* (`Ollama`, `Llama 3.1:8B`, `ChromaDB`)
  2. *Systems & NetSentinel* (`Linux C/Daemons`, `Raw Packet Sockets`)
  3. *Mobile Architecture* (`Flutter`, `Dart`, `Offline Cloud Sync`)
  4. *Full-Stack Web SPAs* (`React 19`, `Node.js`, `REST APIs`)
- **Interactive Controls:** Orbit controls (click & drag rotation, auto-spin toggle, manual camera reset) and direct "← Back to Terminal" navigation.

### 5. Spotlight Command Palette (`⌘K` / `Ctrl+K`)

A global spotlight overlay (`CommandPalette.jsx`) that enables fast, keyboard-first navigation:
- Real-time fuzzy query filtering across all sections, projects, and skills.
- Direct theme universe switching (`Switch to Neon Synthwave`, `Switch to Cosmic Cyber`, etc.).
- Direct actions: View Architecture, Download Resume, Send Email, and GitHub Repository navigation.
- Accessible via the top navbar button or `Ctrl+K` / `Cmd+K`.

### 6. Dynamic Tech Arsenal & Architecture Inspector

The `Skills` section combines multiple interactive layers:
- **Infinite Marquee Rail:** Continuous sliding carousel of high-contrast brand icons.
- **Categorized Filtration:** Quick filtering across *All*, *Systems & Languages*, *Web Architecture*, *Intelligence & ML*, and *Data & Cloud Engine*.
- **Live Search Filtering:** Real-time search query matching across all skill names and tags.
- **Synchronized Architecture Inspector Card:** Selecting any skill displays an in-depth breakdown of proficiency, practical use-cases, and production stack alignment with automatic smooth scrolling.

### 7. Project Architecture Showcases & Deep Dives

Each featured project features:
- Interactive architecture diagrams and system component maps.
- Real-world engineering challenges overcome (concurrency, offline sync, memory footprint).
- Production benchmarks and impact metrics.
- Modal deep-dive dialog (`ProjectModal.jsx`) with live demo and source code links.

### 8. GitHub Engineering Activity & Telemetry

The `GithubStats` section presents a live telemetry dashboard reflecting:
- Total repositories, contributions, and active languages.
- Interactive commit timeline and weekly velocity charts.
- Direct links to open-source repositories and development milestones.

### 9. Responsive Mobile HUD Experience

The interface is engineered from the ground up for touchscreens and mobile displays:
- **Mobile Navigation Drawer:** Slide-out drawer with quick-navigation buttons and integrated universe switcher cards.
- **Auto-Contained Typography:** Safe-area padding and monospace formatting that prevents horizontal overflow.
- **Floating Controls:** A single persistent `ScrollToTop` floating button with elevation awareness.

---

## Technology Stack

### Core Framework & Runtime

| Technology | Version | Purpose |
| --- | --- | --- |
| [React](https://react.dev/) | `^19.2.6` | Modern UI development with concurrent features |
| [Vite](https://vitejs.dev/) | `^8.0.12` | Next-generation frontend build tooling & HMR |
| [Material UI](https://mui.com/) | `^9.0.1` | Modern theme design system and layout primitives |
| [Emotion](https://emotion.sh/) | `^11.14` | CSS-in-JS styling engine |

### 3D Graphics & Animation

| Technology | Version | Purpose |
| --- | --- | --- |
| [Three.js](https://threejs.org/) | `^0.184.0` | WebGL 3D rendering engine |
| [@react-three/fiber](https://r3f.docs.pmnd.rs/) | `^9.6.1` | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | `^10.7.7` | Three.js helpers and camera abstractions |
| [Framer Motion](https://motion.dev/) | `^12.38.0` | Production-ready motion and gesture physics |
| [Maath](https://github.com/pmndrs/maath) | `^0.10.8` | Math helpers and spring interpolation |

### Services & Utilities

| Technology | Version | Purpose |
| --- | --- | --- |
| [@emailjs/browser](https://www.emailjs.com/) | `^4.4.1` | Client-side contact message delivery |
| [React Icons](https://react-icons.github.io/react-icons/) | `^5.6.0` | Comprehensive developer iconography |
| [React Router DOM](https://reactrouter.com/) | `^7.15.1` | Declarative client-side routing |

---

## Featured Projects

### 1. RAG-Grounded Local Assistant Engine
- **Stack:** Python, LangChain, Ollama, Llama 3.1:8B, ChromaDB, FastAPI
- **Architecture:** Offline-first document intelligence pipeline leveraging local vector embeddings and semantic search to deliver zero-leakage, context-aware answers from private document sets.
- **Highlights:** Chunk-level similarity indexing, vector cosine retrieval, dynamic prompt synthesis, and sub-200ms local inference response times.

### 2. NetSentinel — Network Intrusion Detection Suite
- **Stack:** Python, Scapy, Raw Sockets, Rules Engine, Linux
- **Architecture:** Daemonized network traffic analyzer operating directly on promiscuous raw socket interfaces to detect anomalous traffic patterns and security threats in real-time.
- **Highlights:** Deep transport-layer packet inspection, stateful SYN flood tracking, port-scan heuristics, and automated JSON security alert logging.

### 3. ESquare Mobile Educational Application
- **Stack:** Native Android, Java, SQLite, Background Services, Material 3
- **Architecture:** Offline-first Android platform built for reliable courseware delivery, featuring deterministic local caching and background synchronization.
- **Highlights:** SQLite persistence layer, resilient background job scheduling, modular Clean Architecture, and offline content synchronization.

### 4. FlipLearn Cross-Platform Interactive App
- **Stack:** Flutter, Dart, Hive, Firebase
- **Architecture:** Cross-platform interactive study system delivering fluid spaced-repetition cards, local persistence, and cloud synchronization.
- **Highlights:** Hive NoSQL local storage, reactive Firebase Cloud Firestore sync, 60fps card flip animations, and multi-platform compilation.

---

## Developer Console Commands

Type these commands directly into the terminal or click their corresponding chips:

| Command | Action |
| --- | --- |
| `help` | Lists all available console commands and routines |
| `hologram` / `3d` / `core` | Opens the 3D Holographic Architecture Core inspector |
| `theme` | Displays active theme metadata and list of all 4 universes |
| `theme cosmic` / `dark` | Warps universe to **Cosmic Cyber** (Deep space obsidian & cyan) |
| `theme synthwave` | Warps universe to **Neon Synthwave** (Outrun magenta & laser rails) |
| `theme matrix` | Warps universe to **Matrix Terminal** (Encrypted emerald & digital rain) |
| `theme frost` / `light` | Warps universe to **Nordic Frost** (Glacier pearl & cobalt blue) |
| `about` | Prints Ashish Kumar's engineering bio and technical ethos |
| `projects` | Lists featured projects with summaries and repository links |
| `skills` | Displays core technical competencies by category |
| `stack` | Outputs polyglot stack breakdown and architectural domains |
| `timeline` | Displays academic credentials and experience timeline |
| `contact` | Prints direct email address and verified professional links |
| `resume` | Initiates instant download of the verified PDF resume |
| `clear` | Clears the terminal output buffer |

---

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `Cmd + K` | Toggle the spotlight Command Palette |
| `Esc` | Close any active modal, viewer, or command palette |
| `↑` / `↓` | Navigate command palette results |
| `Enter` | Execute selected palette item or trigger action |

---

## Project Structure

```text
Ashish's Portfolio/
├── public/
│   ├── assets/
│   │   ├── certificates/             # Credential documents and badges
│   │   ├── projects/                 # Architecture diagrams and previews
│   │   └── resume/                   # Ashish_Kumar_Resume.pdf
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── HolographicCore.jsx   # Interactive Three.js satellite core
│   │   │   └── ParticleBackground.jsx # 4-universe WebGL background engine
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # Dynamic HUD navbar & mobile drawer
│   │   │   └── Footer.jsx            # Engineering footer & system status
│   │   │
│   │   └── ui/
│   │       ├── CertificateViewer.jsx # Modal document viewer
│   │       ├── CommandPalette.jsx    # Spotlight search overlay (⌘K)
│   │       ├── DeveloperConsole.jsx  # In-browser terminal & telemetry HUD
│   │       ├── ProjectModal.jsx      # Architectural deep-dive dialog
│   │       ├── ScrollToTop.jsx       # Floating scroll-to-top trigger
│   │       ├── SectionHeader.jsx     # Cyberpunk section typography
│   │       ├── TechIcon.jsx          # High-contrast technology icon mapper
│   │       ├── ThemeSelector.jsx     # Universe switcher dropdown
│   │       ├── ThemeWarpTransition.jsx # Cinematic roll-in transition curtain
│   │       └── TiltCard.jsx          # 3D perspective mouse-tilt container
│   │
│   ├── context/
│   │   └── ThemeContext.jsx          # Multi-universe state & warp controller
│   │
│   ├── data/
│   │   ├── certificates.js           # Verification metadata & cert records
│   │   ├── experience.js             # Career and education chronology
│   │   ├── projects.js               # Project architecture, metrics & links
│   │   ├── skills.js                 # Technical competencies & proficiencies
│   │   └── socialLinks.js            # Contact channels & profile metadata
│   │
│   ├── sections/
│   │   ├── Hero.jsx                  # Holographic intro & quick stats
│   │   ├── About.jsx                 # Engineering philosophy & core metrics
│   │   ├── Skills.jsx                # Marquee, category filter & inspector
│   │   ├── Projects.jsx              # Project cards & architecture modals
│   │   ├── Experience.jsx            # Chronological experience tree
│   │   ├── Certifications.jsx        # Professional certifications grid
│   │   ├── GithubStats.jsx           # Live GitHub activity & commit metrics
│   │   ├── Resume.jsx                # Embedded viewer & PDF download CTA
│   │   └── Contact.jsx               # Direct channels & message form
│   │
│   ├── theme/
│   │   └── theme.js                  # Material UI dynamic palette builder
│   │
│   ├── App.jsx                       # Root application orchestration
│   ├── index.css                     # Global design tokens & CSS utilities
│   └── main.jsx                      # Entrypoint mounting React root
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure the following tools are installed on your machine:

- [Node.js](https://nodejs.org/) (version 18.0.0 or later recommended)
- npm (bundled with Node.js)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adashish09/Portfolio-website.git
   ```

2. **Navigate to the project root:**
   ```bash
   cd Portfolio-website
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Open [http://localhost:5173](http://localhost:5173) in your modern WebGL-capable browser.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Boots the Vite development server with hot module replacement (HMR) |
| `npm run build` | Compiles an optimized production bundle with tree-shaking |
| `npm run preview` | Spins up a local static server to preview the production build |
| `npm run lint` | Runs ESLint across all source files |

---

## Education and Certifications

### Education

- **Master of Computer Applications (MCA)** — Chandigarh University  
  *2024 – 2026* | CGPA: **8.24 / 10**
- **Bachelor of Computer Applications (BCA)** — Indira Gandhi National Open University  
  *2020 – 2023* | Percentage: **70.11%**

### Professional Certifications

- **AWS Academy Graduate** — Generative AI Foundations
- **DeepLearning.AI / Coursera** — Prompt Engineering with Large Language Models
- **Meta** — Android Mobile Application Development Professional Certificate
- **Meta** — Front-End Developer with React Professional Certificate

---

## Contact

**Ashish Kumar**  
*Software Engineer — Full-Stack, AI Systems, and Mobile Architecture*

- 📍 **Location:** Bengaluru, India
- 📧 **Email:** [ashishkumar.dev16@gmail.com](mailto:ashishkumar.dev16@gmail.com)
- 🐙 **GitHub:** [@adashish09](https://github.com/adashish09)
- 💼 **LinkedIn:** [Ashish Kumar](https://linkedin.com/in/ashish-kumar-ad0016)

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to adapt, modify, and build upon this project with proper attribution.

