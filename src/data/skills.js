/**
 * Ashish Kumar - Skills & Technical Ecosystem Data
 * Backed by production architectures (AI Resume Interviewer, NetSentinel, FlipLearn, ESquare)
 * and MCA coursework at Chandigarh University (8.24 CGPA).
 */

export const skillsList = [
  // --- AI & Machine Learning ---
  {
    id: "rag",
    name: "RAG Architecture",
    iconKey: "rag",
    brandColor: "#a855f7",
    domain: "AI & Machine Learning",
    specialty: "Vector Context & Grounding",
    tier: "Flagship Core",
    powersProject: "AI Resume Interviewer",
    projectId: "ai-resume-interviewer",
    capabilities: ["Chunked Embeddings", "Vector Similarity", "Grounding Context"],
    productionUsage: "Engineered retrieval pipeline grounding Llama 3.1:8B with resume vector embeddings to generate role-specific interview queries with zero hallucination."
  },
  {
    id: "ollama",
    name: "Ollama (Llama 3.1:8B)",
    iconKey: "ollama",
    brandColor: "#00f2fe",
    domain: "AI & Machine Learning",
    specialty: "Private Local Inference",
    tier: "Production Shipped",
    powersProject: "AI Resume Interviewer",
    projectId: "ai-resume-interviewer",
    capabilities: ["Zero API Fees", "Private Inference", "Streamed Responses"],
    productionUsage: "Self-hosted open-weight Llama 3.1:8B locally with low latency streaming, eliminating external OpenAI API token expenditures."
  },
  {
    id: "embeddings",
    name: "Vector Search & Embeddings",
    iconKey: "embeddings",
    brandColor: "#38bdf8",
    domain: "AI & Machine Learning",
    specialty: "Dense Semantic Search",
    tier: "Core Engine",
    powersProject: "AI Resume Interviewer",
    projectId: "ai-resume-interviewer",
    capabilities: ["Cosine Distance", "Dense Vectors", "Semantic Reranking"],
    productionUsage: "Converted candidate resumes and spoken responses into mathematical vector spaces for high-precision semantic similarity matching."
  },
  {
    id: "prompt",
    name: "Prompt Engineering",
    iconKey: "prompt",
    brandColor: "#10b981",
    domain: "AI & Machine Learning",
    specialty: "Few-Shot Steering",
    tier: "Certified Coursera",
    powersProject: "AI Resume Interviewer",
    projectId: "ai-resume-interviewer",
    capabilities: ["System Personas", "Few-Shot Anchors", "Structured JSON"],
    productionUsage: "Crafted deterministic system prompts enforcing rigorous technical interviewer personas and reliable rubric-based feedback scoring."
  },

  // --- Frontend & Mobile ---
  {
    id: "react",
    name: "React.js",
    iconKey: "react",
    brandColor: "#61DAFB",
    domain: "Frontend & Mobile",
    specialty: "Reactive UI & SPAs",
    tier: "Daily Driver",
    powersProject: "AI Resume & NetSentinel",
    projectId: "ai-resume-interviewer",
    capabilities: ["Custom Hooks", "State Management", "Vite Bundler"],
    productionUsage: "Engineered real-time candidate evaluation dashboards and responsive network intrusion telemetry displays with hardware-accelerated animations."
  },
  {
    id: "flutter",
    name: "Flutter & Dart",
    iconKey: "flutter",
    brandColor: "#02569B",
    domain: "Frontend & Mobile",
    specialty: "Cross-Platform Mobile",
    tier: "Production Shipped",
    powersProject: "FlipLearn",
    projectId: "fliplearn",
    capabilities: ["Offline-First Cache", "BLoC State", "Cross-Platform"],
    productionUsage: "Architected cross-platform mobile educational app with local SQLite caching for seamless offline learning in low-bandwidth regions."
  },
  {
    id: "android",
    name: "Android Native",
    iconKey: "android",
    brandColor: "#3DDC84",
    domain: "Frontend & Mobile",
    specialty: "Java & Google Play",
    tier: "Google Play Shipped",
    powersProject: "ESquare (Trivia App)",
    projectId: "esquare",
    capabilities: ["Lifecycle Management", "Background Sync", "Google Play Release"],
    productionUsage: "Shipped live trivia game on the Google Play Store with real-time Firebase sync and rock-solid Activity lifecycle handling under Netrom Services."
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    iconKey: "javascript",
    brandColor: "#F7DF1E",
    domain: "Frontend & Mobile",
    specialty: "Modern Async Runtime",
    tier: "Daily Driver",
    powersProject: "All Web & Node Apps",
    projectId: "ai-resume-interviewer",
    capabilities: ["Async / Await", "Event Loop", "Closures & Modules"],
    productionUsage: "Daily language applied across browser client engines, Node.js API orchestrators, and custom DOM micro-interactions."
  },
  {
    id: "htmlcss",
    name: "HTML5 & Modern CSS",
    iconKey: "htmlcss",
    brandColor: "#E34F26",
    domain: "Frontend & Mobile",
    specialty: "Responsive Layouts",
    tier: "Core Mastery",
    powersProject: "Portfolio & Dashboards",
    projectId: "ai-resume-interviewer",
    capabilities: ["CSS Grid & Flexbox", "CSS Design Tokens", "Zero Layout Shift"],
    productionUsage: "Engineered high-performance design systems, theme transitions, glassmorphic blur effects, and adaptive mobile responsive layouts."
  },

  // --- Backend & Databases ---
  {
    id: "nodejs",
    name: "Node.js",
    iconKey: "nodejs",
    brandColor: "#5FA04E",
    domain: "Backend & Databases",
    specialty: "Microservices & APIs",
    tier: "Daily Driver",
    powersProject: "AI Resume Platform",
    projectId: "ai-resume-interviewer",
    capabilities: ["Asynchronous I/O", "REST Endpoint Contracts", "Microservice Proxy"],
    productionUsage: "Built authentication, resume ingestion, and session state APIs orchestrating local AI inference subprocesses."
  },
  {
    id: "express",
    name: "Express.js",
    iconKey: "express",
    brandColor: "#38bdf8",
    domain: "Backend & Databases",
    specialty: "RESTful Routing",
    tier: "Daily Driver",
    powersProject: "AI Resume Platform",
    projectId: "ai-resume-interviewer",
    capabilities: ["Custom Middleware", "JWT Auth", "Validation Pipes"],
    productionUsage: "Structured clean route handlers, security headers, and JSON schema validation for resume parsing workflows."
  },
  {
    id: "mongodb",
    name: "MongoDB",
    iconKey: "mongodb",
    brandColor: "#47A248",
    domain: "Backend & Databases",
    specialty: "NoSQL Document Store",
    tier: "Production Tested",
    powersProject: "AI Resume Platform",
    projectId: "ai-resume-interviewer",
    capabilities: ["Document Indexing", "Aggregation Pipelines", "Mongoose ORM"],
    productionUsage: "Stored multi-turn interview conversations, candidate question evaluations, and timestamped performance metrics."
  },
  {
    id: "firebase",
    name: "Firebase",
    iconKey: "firebase",
    brandColor: "#FFCA28",
    domain: "Backend & Databases",
    specialty: "Realtime DB & Auth",
    tier: "Production Shipped",
    powersProject: "ESquare & FlipLearn",
    projectId: "esquare",
    capabilities: ["Sub-second Sync", "Realtime Streams", "Offline Rules"],
    productionUsage: "Delivered live synchronized quiz questions, instant user scores, and persistent global leaderboards for thousands of active players."
  },
  {
    id: "mysql",
    name: "MySQL / Relational DBMS",
    iconKey: "mysql",
    brandColor: "#4479A1",
    domain: "Backend & Databases",
    specialty: "ACID & Relational Schemas",
    tier: "Core Foundation",
    powersProject: "Academic & Systems",
    projectId: "netsentinel",
    capabilities: ["3NF Normalization", "ACID Transactions", "Complex Joins"],
    productionUsage: "Designed normalized relational database schemas with strict foreign key constraints, indexes, and transactional guarantees."
  },

  // --- Languages & Core CS ---
  {
    id: "python",
    name: "Python",
    iconKey: "python",
    brandColor: "#3776AB",
    domain: "Languages & Core CS",
    specialty: "Systems, Sockets & AI",
    tier: "Flagship Core",
    powersProject: "NetSentinel & AI RAG",
    projectId: "netsentinel",
    capabilities: ["AF_PACKET Sockets", "Ollama API Streaming", "Packet Dissection"],
    productionUsage: "Authored high-throughput Linux network socket sniffers and asynchronous local AI retrieval and scoring engines."
  },
  {
    id: "java",
    name: "Java",
    iconKey: "java",
    brandColor: "#EA2D2E",
    domain: "Languages & Core CS",
    specialty: "HackerRank 5-Star OOP",
    tier: "Certified Mastery",
    powersProject: "ESquare Android App",
    projectId: "esquare",
    capabilities: ["OOP Design Patterns", "Android SDK", "Collections & Threads"],
    productionUsage: "Architected multithreaded native Android mobile applications with robust Activity lifecycle handling."
  },
  {
    id: "cpp",
    name: "C / C++",
    iconKey: "cpp",
    brandColor: "#00599C",
    domain: "Languages & Core CS",
    specialty: "Low-Level CS & OOP",
    tier: "Core Foundation",
    powersProject: "Academic & Systems",
    projectId: "netsentinel",
    capabilities: ["Memory Management", "Pointers & References", "Algorithmic Efficiency"],
    productionUsage: "Studied direct memory models, cache optimization, and rigorous systems-level data representations."
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    iconKey: "dsa",
    brandColor: "#10b981",
    domain: "Languages & Core CS",
    specialty: "8.24 MCA CGPA Foundation",
    tier: "Core Foundation",
    powersProject: "All Systems",
    projectId: "netsentinel",
    capabilities: ["Graph Traversal", "Dynamic Programming", "Asymptotic Optimization"],
    productionUsage: "Applied optimal data structures across memory-constrained mobile quiz caching and high-frequency network packet queues."
  },

  // --- Systems, Cloud & Tools ---
  {
    id: "linux",
    name: "Linux (Ubuntu / Kali)",
    iconKey: "linux",
    brandColor: "#FCC624",
    domain: "Systems, Cloud & Tools",
    specialty: "Bash & Systemd Services",
    tier: "Daily Driver",
    powersProject: "NetSentinel NIDS",
    projectId: "netsentinel",
    capabilities: ["Bash Scripting", "Systemd Services", "Raw Socket Privileges"],
    productionUsage: "Configured headless network monitoring daemons, compiled low-level utilities, and managed production server environments."
  },
  {
    id: "packets",
    name: "Packet Capture & Sockets",
    iconKey: "packets",
    brandColor: "#1679A7",
    domain: "Systems, Cloud & Tools",
    specialty: "Raw AF_PACKET Sniffing",
    tier: "Deep Systems",
    powersProject: "NetSentinel NIDS",
    projectId: "netsentinel",
    capabilities: ["AF_PACKET Sockets", "Protocol Headers", "Rule-Based Intrusion Alerts"],
    productionUsage: "Inspected live network traffic directly at the kernel socket boundary without relying on third-party tools like Scapy or Wireshark."
  },
  {
    id: "git",
    name: "Git & GitHub Workflows",
    iconKey: "git",
    brandColor: "#F05032",
    domain: "Systems, Cloud & Tools",
    specialty: "Version Control & Releases",
    tier: "Daily Driver",
    powersProject: "20+ Repositories",
    projectId: "ai-resume-interviewer",
    capabilities: ["Atomic Commits", "Branching Strategies", "Release Tags"],
    productionUsage: "Maintained 20+ public repositories with clean git commit trees, semantic versioning, and thorough documentation."
  },
  {
    id: "networking",
    name: "Computer Networks & Protocols",
    iconKey: "networking",
    brandColor: "#38bdf8",
    domain: "Systems, Cloud & Tools",
    specialty: "TCP/IP & WebSockets",
    tier: "Core Foundation",
    powersProject: "NetSentinel & Web APIs",
    projectId: "netsentinel",
    capabilities: ["TCP Flags & Handshakes", "HTTP/1.1 & WebSockets", "Subnet Routing"],
    productionUsage: "Implemented rule-based detection for SYN floods, port scans, and malformed UDP packets in custom NIDS software."
  }
];

export const domains = [
  "All Tech",
  "AI & Machine Learning",
  "Frontend & Mobile",
  "Backend & Databases",
  "Languages & Core CS",
  "Systems, Cloud & Tools"
];

// Highlighted marquee tools
export const marqueeStack = [
  { name: "Python", iconKey: "python", color: "#3776AB" },
  { name: "React.js", iconKey: "react", color: "#61DAFB" },
  { name: "Ollama / LLMs", iconKey: "ollama", color: "#00f2fe" },
  { name: "Flutter", iconKey: "flutter", color: "#02569B" },
  { name: "Node.js", iconKey: "nodejs", color: "#5FA04E" },
  { name: "Linux", iconKey: "linux", color: "#FCC624" },
  { name: "MongoDB", iconKey: "mongodb", color: "#47A248" },
  { name: "Android Native", iconKey: "android", color: "#3DDC84" },
  { name: "Firebase", iconKey: "firebase", color: "#FFCA28" },
  { name: "Git", iconKey: "git", color: "#F05032" },
  { name: "Java", iconKey: "java", color: "#EA2D2E" },
  { name: "RAG Pipelines", iconKey: "rag", color: "#a855f7" }
];

export const adaptabilityPrinciples = [
  {
    number: "01",
    title: "Fast Ramp-Up & Deep Dive",
    subtitle: "New Frameworks in Days",
    color: "#00f2fe",
    description: "Rather than waiting for beginner tutorials, I read official documentation, inspect GitHub source code, and stand up working proof-of-concepts within 48 to 72 hours."
  },
  {
    number: "02",
    title: "Polyglot Problem Solver",
    subtitle: "Tool Matches the Constraint",
    color: "#38bdf8",
    description: "Built across 4 completely distinct stacks in 12 months: local Python RAG + Ollama, raw Linux packet capture, cross-platform Flutter/Dart, and native Android Java."
  },
  {
    number: "03",
    title: "Workarounds that Work",
    subtitle: "Pragmatic Engineering",
    color: "#a855f7",
    description: "Faced high OpenAI API fees? Spun up local Llama 3.1:8B via Ollama. Intermittent mobile connection? Engineered local SQLite sync. Legacy Android hardware? Managed lifecycle memory states."
  },
  {
    number: "04",
    title: "First-Principles Grounding",
    subtitle: "Solid CS Fundamentals",
    color: "#10b981",
    description: "Frameworks evolve; core fundamentals endure. Backed by an 8.24 MCA CGPA, rigorous DSA problem solving, relational DBMS integrity, and Linux system-level comprehension."
  }
];
