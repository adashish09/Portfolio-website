# Ashish Kumar — Developer Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-Visit%20Website-00f2fe?style=for-the-badge)](https://ashish-portfolio-dev.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00f2fe.svg?style=for-the-badge)](LICENSE)

A modern, interactive developer portfolio and digital engineering showcase built with React, Vite, and Material UI.

🌐 **Live Website:** [ashish-portfolio-dev.netlify.app](https://ashish-portfolio-dev.netlify.app/) The platform combines a responsive portfolio experience with an interactive developer terminal, command palette, animated neural-circuit background, project architecture showcases, and an embedded resume viewer.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Featured Projects](#featured-projects)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Customization](#customization)
- [Education and Certifications](#education-and-certifications)
- [Contact](#contact)
- [License](#license)

## Overview

This portfolio is designed as an interactive developer workspace rather than a traditional static resume website.

It showcases:

- Software engineering experience and technical skills
- AI and machine-learning projects
- Mobile and cross-platform applications
- Linux and network-engineering projects
- Education and professional certifications
- GitHub activity and featured repositories
- Resume and contact information

The interface follows a cybernetic visual style with glassmorphism, neon accents, responsive layouts, and interactive UI elements.

## Features

### Interactive Developer Terminal

The embedded `DeveloperConsole` provides an in-browser terminal experience with command execution, command history, and isolated scrolling.

Supported commands include:

```text
help
projects
skills
contact
clear
sudo
system
```

### Command Palette

Open the spotlight-style command palette using `Ctrl + K` on Windows/Linux or `Cmd + K` on macOS.

The command palette supports:

- Real-time search
- Category filters
- Keyboard navigation
- Project discovery
- Navigation actions
- Contact actions
- Quick command execution

### Animated Neural Canvas

The portfolio includes a lightweight HTML5 Canvas background featuring:

- Animated neural-network nodes
- Connections between nodes
- Traveling photon data packets
- Cursor-based magnetic interaction
- A perspective cyber horizon

### Responsive Design

The interface uses responsive layouts and consistent card geometry across mobile, tablet, and desktop breakpoints.

### Project Architecture Showcase

Featured projects include interactive architecture views that present:

- Project descriptions
- Technology stacks
- Engineering challenges
- System diagrams
- Production metrics and implementation details

### Resume Viewer

The resume section provides an embedded PDF viewer and support for downloading the resume.

### GitHub Integration

The portfolio includes a GitHub statistics section for showcasing repositories, contribution activity, and developer progress.

## Technology Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| [React](https://react.dev/) 18.3.1 | UI development |
| [Vite](https://vitejs.dev/) 6.0 | Development server and build tooling |
| [Material UI](https://mui.com/) 5.16 | Component system |
| [Framer Motion](https://motion.dev/) | UI animations and transitions |
| React Icons | Iconography |
| Material Icons | Interface icons |
| Simple Icons | Technology and brand icons |

### Graphics and Styling

- HTML5 Canvas 2D rendering
- CSS responsive grids
- Glassmorphism-inspired surfaces
- `Space Grotesk` for headings
- `Plus Jakarta Sans` for body text
- `JetBrains Mono` for code and terminal content
- Google Fonts CDN

## Featured Projects

### 1. RAG-Grounded Local Assistant Engine

**Technology:** Python, LangChain, Ollama, Llama 3.1:8B, ChromaDB, FastAPI

An offline-first document intelligence system that uses local language models and vector search to provide private, context-aware answers from user-provided documents.

**Highlights:**

- Local document processing
- Chunk-level similarity indexing
- Vector-based retrieval
- Contextual prompt synthesis
- Privacy-focused, offline-first execution

### 2. NetSentinel — Network Intrusion Detection Suite

**Technology:** Python, Scapy, Raw Sockets, Rules Engine

A Linux-based network monitoring and intrusion detection project that captures and analyzes packets to identify suspicious network activity.

**Highlights:**

- Ethernet frame capture
- Transport-layer header inspection
- SYN flood detection
- Port-scan anomaly detection
- Real-time security alerts

### 3. ESquare Mobile Educational Application

**Technology:** Native Android, Java, SQLite, Background Services, Material 3

An offline-first Android educational application designed to support course access, local caching, and background synchronization.

**Highlights:**

- Local course caching
- Background synchronization
- Persistent state management
- Offline-first functionality
- Native Android implementation

### 4. FlipLearn Cross-Platform Interactive App

**Technology:** Flutter, Dart, Hive, Firebase

A cross-platform educational application featuring interactive learning cards, offline persistence, and real-time synchronization.

**Highlights:**

- Cross-platform application development
- Hive-based local storage
- Firebase integration
- Offline persistence
- Fluid card transitions

### 5. NetFlow Linux System and Traffic Monitor

**Technology:** Node.js, Express, WebSockets, Chart.js, Linux Procfs

A live system telemetry application that streams Linux resource and network metrics to an interactive monitoring interface.

**Highlights:**

- CPU and memory monitoring
- Socket connection tracking
- Network interface metrics
- WebSocket-based streaming
- Sub-second telemetry updates

## Project Structure

```text
Ashish's Portfolio/
├── public/
│   └── assets/
│       ├── certificates/          # Credential PDFs and badges
│       ├── projects/              # Architecture diagrams and previews
│       └── resume/                # Ashish_Kumar_Resume.pdf
│
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── ParticleBackground.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/
│   │       ├── CommandPalette.jsx
│   │       ├── DeveloperConsole.jsx
│   │       ├── SectionHeader.jsx
│   │       └── ScrollToTop.jsx
│   │
│   ├── data/
│   │   ├── certificates.js
│   │   ├── experience.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── socialLinks.js
│   │
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Certifications.jsx
│   │   ├── GithubStats.jsx
│   │   ├── Resume.jsx
│   │   └── Contact.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/) 18.0.0 or later
- npm, included with Node.js
- Git

You may also use pnpm or Yarn if preferred.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adashish09/Portfolio-website.git
   ```

2. Move into the project directory:

   ```bash
   cd Portfolio-website
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local development URL shown in your terminal. With the default Vite configuration, this is usually:

   ```text
   http://localhost:5173
   ```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs the project linter |

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `Cmd + K` | Open the command palette |
| `Esc` | Close a modal or the command palette |
| `↑` / `↓` | Navigate command palette results |
| `Enter` | Execute the selected command or open a project |

## Customization

Portfolio content is organized into reusable data files and React sections.

To update the portfolio, edit the relevant files:

| File | Purpose |
| --- | --- |
| `src/data/projects.js` | Project information, architecture, metrics, and repository links |
| `src/data/skills.js` | Skills and technical competencies |
| `src/data/experience.js` | Education and experience timeline |
| `src/data/certificates.js` | Certification details and verification information |
| `src/data/socialLinks.js` | Social profiles and contact metadata |
| `public/assets/resume/` | Resume PDF |
| `public/assets/projects/` | Project diagrams and previews |
| `public/assets/certificates/` | Certificate documents and badges |

## Education and Certifications

### Education

- **Master of Computer Applications (MCA)** — Chandigarh University  
  2024–2026 | CGPA: 8.24 / 10

- **Bachelor of Computer Applications (BCA)** — Indira Gandhi National Open University  
  2020–2023 | 70.11%

### Certifications

- AWS Academy Graduate — Generative AI Foundations
- DeepLearning.AI / Coursera — Prompt Engineering with LLMs
- Meta — Android Mobile Application Development Professional Certificate
- Meta — Front-End Developer with React Professional Certificate

## Contact

**Ashish Kumar**  
Software Engineer — Full-Stack, AI Systems, and Mobile

- **Location:** Bengaluru, India
- **Email:** [ashishkumar.dev16@gmail.com](mailto:ashishkumar.dev16@gmail.com)
- **GitHub:** [@adashish09](https://github.com/adashish09)
- **LinkedIn:** [Ashish Kumar](https://linkedin.com/in/ashish-kumar-ad0016)

## License

This project is licensed under the MIT License.

You are free to use, modify, and adapt the codebase in accordance with the license terms.