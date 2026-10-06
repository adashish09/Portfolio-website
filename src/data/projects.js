export const projectsData = [
  {
    id: 1,
    title: "AI Resume Interviewer Platform",
    timeline: "Apr 2026 – May 2026",
    category: "AI & LLM",
    headline: "Adaptive AI interview simulation grounded with RAG & local LLM inference",
    resumeFlagship: true,
    description: "An AI-powered interview platform that parses resume content and generates role-specific interview questions using an open-source Llama 3.1:8B model served locally through Ollama, grounded via a Retrieval-Augmented Generation (RAG) pipeline with embeddings and semantic search.",
    problemSolved: "Candidate interview prep tools are usually generic wrappers without real grounding in an applicant's exact resume history, leading to repetitive or unhelpful practice sessions.",
    workaroundHighlight: "Bypassed costly third-party cloud LLM APIs by architecting a local Ollama inference service running Llama 3.1:8B. Designed a custom chunking and vector embedding pipeline in Python to supply high-precision context directly to prompts.",
    architecture: "React.js frontend with streamed response rendering communicates via Node.js REST APIs for auth and session state, passing document queries to a Python RAG inference engine with vector similarity search.",
    techStack: ["React.js", "Node.js", "Python", "MongoDB", "Ollama (Llama 3.1:8B)", "RAG", "Vector Search", "Prompt Engineering"],
    bulletPoints: [
      "Built an AI-powered interview platform that parses resume content and generates role-specific interview questions using an open-source Llama 3.1:8B model served locally through Ollama, grounded via a Retrieval-Augmented Generation (RAG) pipeline with embeddings and semantic search.",
      "Developed Node.js REST APIs for authentication, resume upload/parsing, and interview-session state, integrating the React frontend with a Python-based AI inference service.",
      "Built a React.js interface supporting resume upload, streamed AI responses, and adaptive follow-up questions based on previous answers."
    ],
    features: [
      "Custom RAG pipeline for resume context retrieval",
      "Vector embeddings & semantic similarity search",
      "Local LLM inference using Ollama (Llama 3.1:8B)",
      "Dynamic follow-up questions adapted to prior responses",
      "Secure JWT authentication & interview session state management",
      "Interactive candidate response evaluation and scorecard"
    ],
    github: "https://github.com/adashish09/AI-Resume-Interviewer",
    demo: "#",
    cloneCmd: "git clone https://github.com/adashish09/AI-Resume-Interviewer.git",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000",
    featured: true
  },
  {
    id: 2,
    title: "NetSentinel – Network Intrusion Detection System",
    timeline: "Jan 2026 – Mar 2026",
    category: "Systems & Security",
    headline: "Linux-based real-time packet capture, anomaly detection & security dashboard",
    resumeFlagship: true,
    description: "A Linux-based network monitoring system using Python packet capture to inspect live traffic and identify suspicious activity through rule-based detection, complete with near real-time log analysis and a reactive React security dashboard.",
    problemSolved: "Traditional security tools are cumbersome black boxes that require complex enterprise setups rather than lightweight, transparent live inspection for developers and sysadmins.",
    workaroundHighlight: "Tackled Linux socket streaming directly using Python raw packet listeners. Implemented threshold- and pattern-based rule parsing that processes high packet volumes without memory leaks or dropped frames.",
    architecture: "Linux socket capture daemon streaming raw frames into an event-stream pipeline. Threshold detection engine scores anomalies and emits real-time security events to a React.js monitoring dashboard.",
    techStack: ["Python", "React.js", "Linux", "Packet Capture", "Anomaly Detection", "Log Analysis", "REST APIs"],
    bulletPoints: [
      "Built a Linux-based network monitoring system using Python packet capture to inspect live traffic and identify suspicious activity through rule-based detection.",
      "Implemented near real-time log and event processing with threshold- and pattern-based rules for detecting anomalous network behavior.",
      "Developed a React.js security dashboard for live traffic visualization, alert history, and threat monitoring."
    ],
    features: [
      "Live Linux socket packet capture & dissection",
      "Rule-based threshold and pattern anomaly detection",
      "Near real-time syslog & security event parsing",
      "Interactive threat telemetry & visualization dashboard",
      "Automated threat level scoring and alert notifications",
      "Audit trail export for post-incident security forensics"
    ],
    github: "https://github.com/adashish09/NetSentinel",
    demo: "#",
    cloneCmd: "git clone https://github.com/adashish09/NetSentinel.git",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000",
    featured: true
  },
  {
    id: 3,
    title: "FlipLearn – Cross-Platform Learning App",
    timeline: "Sept 2025 – Nov 2025",
    category: "Mobile Apps",
    headline: "Cross-platform Flutter education app with offline-first synchronization",
    resumeFlagship: true,
    description: "A cross-platform Flutter application with Firebase Auth and Firestore, using local caching for offline-first data sync, featuring a gamified quiz engine with dynamic content loading and per-user progress tracking.",
    problemSolved: "Students frequently face network drops during study sessions, leading to lost quiz submissions, frustrated users, and fragmented learning records.",
    workaroundHighlight: "Engineered an offline-first repository layer with local cache queuing (Hive/SQLite) that automatically detects network restoration and syncs quiz attempts bidirectionally to Firestore without race conditions.",
    architecture: "Modular Flutter architecture strictly separating UI, state management (BLoC), and repository data layers. Offline caches handle immediate UX updates while background workers sync with Cloud Firestore.",
    techStack: ["Flutter", "Dart", "Firebase Authentication", "Firestore", "Local Caching", "BLoC"],
    bulletPoints: [
      "Built a cross-platform Flutter app with Firebase Auth and Firestore, using local caching for offline-first data sync.",
      "Designed a gamified quiz engine with dynamic content loading and per-user progress tracking.",
      "Structured the app with a modular architecture separating UI, state management, and data layers."
    ],
    features: [
      "Offline-first quiz engine with local state reconciliation",
      "Bi-directional sync with Firebase Cloud Firestore",
      "Gamified reward loops with animated progress badges",
      "Dynamic topic categorization and adaptive difficulty",
      "Granular user score analytics & history breakdown",
      "Responsive UI optimized across Android and iOS devices"
    ],
    github: "https://github.com/adashish09/FlipLearn",
    demo: "#",
    cloneCmd: "git clone https://github.com/adashish09/FlipLearn.git",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    featured: true
  },
  {
    id: 4,
    title: "ESquare – Trivia Android App",
    timeline: "Jan 2024 – May 2024",
    category: "Mobile Apps",
    headline: "Native Android trivia platform with real-time quiz streaming & live leaderboards",
    resumeFlagship: true,
    description: "A production Android trivia application built using Java and Android SDK under a professional engagement with Netrom Services India Pvt. Ltd. Integrated Firebase Realtime Database for live quiz delivery, score tracking, and leaderboard updates.",
    problemSolved: "Real-time multi-user quiz games must synchronize live scores across heterogeneous Android devices without draining batteries or dropping state during configuration changes.",
    workaroundHighlight: "Mastered Android lifecycle intricacies and background services to eliminate state loss when users received phone calls or rotated screens during time-sensitive trivia rounds.",
    architecture: "Native Android MVVM architecture paired with Firebase Realtime Database event listeners. Clean lifecycle-bound ViewModels ensure smooth screen rotation handling and background recovery.",
    techStack: ["Java", "Android SDK", "Firebase Realtime Database", "XML Layouts", "Background Services"],
    bulletPoints: [
      "Built and shipped a production Android trivia app to the Google Play Store under a professional engagement with Netrom Services India Pvt. Ltd. (listing since deactivated).",
      "Integrated Firebase Realtime Database for live quiz delivery, score tracking, and leaderboard updates.",
      "Applied Android lifecycle management and background sync to maintain stability across devices."
    ],
    features: [
      "Real-time quiz delivery powered by Firebase Realtime DB",
      "Live score calculation and dynamic multi-player leaderboards",
      "Android lifecycle management with graceful background sync",
      "Custom responsive XML layouts supporting legacy to modern devices",
      "Offline question caching with seamless reconnect handling",
      "Optimized battery and memory footprint"
    ],
    github: "https://github.com/adashish09",
    demo: "#",
    cloneCmd: "git clone https://github.com/adashish09.git",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=1000",
    featured: true
  },
  {
    id: 5,
    title: "StockMate – Inventory & Business Analytics",
    timeline: "2025",
    category: "Full Stack",
    headline: "Real-time inventory management and predictive business metrics platform",
    resumeFlagship: false,
    description: "A modern web dashboard for inventory tracking, low-stock notifications, sales metric visualization, and real-time database syncing built on React.js and Firebase.",
    problemSolved: "Small businesses struggle with disjointed spreadsheets and lack automated visibility into item depletion rates and restocking cycles.",
    workaroundHighlight: "Implemented reactive Firestore snapshot listeners and automated low-stock triggers with client-side CSV data transformation.",
    architecture: "Single Page Application (SPA) in React backed by Firebase authentication and Firestore triggers for real-time ledger updates and CSV export generation.",
    techStack: ["React.js", "Firebase", "Node.js", "Chart.js", "Tailwind CSS"],
    bulletPoints: [
      "Engineered real-time inventory tracking with automated stock depletion alerts.",
      "Designed visual analytics dashboards for revenue patterns and item velocities.",
      "Integrated secure multi-role access controls and audit logging."
    ],
    features: [
      "Real-time item stock tracking and automated reorder alerts",
      "Interactive data visualizations for monthly revenue and depletion",
      "Multi-tenant access control with role-based permissions",
      "Instant search, filtering, and categorization of SKU catalogues",
      "Exportable CSV reports for accounting and inventory audits"
    ],
    github: "https://github.com/adashish09/StockMate",
    demo: "#",
    cloneCmd: "git clone https://github.com/adashish09/StockMate.git",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    featured: false
  },
  {
    id: 6,
    title: "Linux Monitoring & Telemetry Dashboard",
    timeline: "2025",
    category: "Systems & Security",
    headline: "System telemetry visualization platform for Linux server health and logs",
    resumeFlagship: false,
    description: "A centralized dashboard for monitoring server CPU, memory, active network connections, and system log anomalies with real-time graphing and alerts.",
    problemSolved: "Command-line tools like top and htop lack persistent historical graphing and unified multi-metric observation across network interfaces.",
    workaroundHighlight: "Wrote lightweight Python sampling scripts polling Linux /proc pseudo-filesystem with minimal CPU consumption.",
    architecture: "Python daemon sampling /proc and system metrics, publishing to a lightweight web socket gateway that feeds into a React charting dashboard.",
    techStack: ["Linux", "Python", "React.js", "WebSockets", "Chart.js"],
    bulletPoints: [
      "Built lightweight Linux system sampling daemon consuming < 1% CPU overhead.",
      "Streamed system telemetry via WebSockets into reactive React charting components.",
      "Parsed syslog records for anomaly flags with visual severity indicators."
    ],
    features: [
      "Real-time CPU, RAM, and disk utilization graphs",
      "Live network throughput and connection socket telemetry",
      "Log monitoring with search and severity tagging (Error, Warn, Info)",
      "Configurable threshold alert triggers and browser notifications",
      "Lightweight resource footprint on target Linux host"
    ],
    github: "https://github.com/adashish09/Linux_monitoring",
    demo: "#",
    cloneCmd: "git clone https://github.com/adashish09/Linux_monitoring.git",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    featured: false
  }
];
