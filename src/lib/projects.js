// ...existing code...

export const projectsData = [
  {
    id: 1,
    title: "Discord Bot",
    slug: "discord-bot",
    tagline: "Moderation + media + playful easter eggs",
    description:
      "Python bot handling moderation, media queue playback, announcements and a few hidden jokes.",
    problem:
      "Server needed consistent moderation & lightweight media playback without manual babysitting.",
    approach:
      "Structured commands with async tasks, queue abstraction, and modular cogs to isolate features.",
    outcome:
      "Cut manual moderation overhead; members self‑serve playback and announcements run on schedule.",
    impact: "Reduced manual moderation effort ~60% via automation.",
    technologies: ["Python", "Discord.py", "SQLite", "APIs"],
    features: [
      "Moderation tools",
      "Media queue playback",
      "Announcements",
      "Custom commands",
      "Hidden easter eggs",
    ],
    challenges:
      "Keeping audio responsive while juggling commands—fixed with async tasks and a lightweight queue.",
    githubUrl: "https://github.com/nwester627/discordBot",
    liveUrl: null,
    status: "released",
    constraints: [
      "Low latency audio",
      "Volunteer moderation time",
      "Limited hosting resources",
    ],
    patterns: [
      "Async queue",
      "Modular cogs",
      "Rate limiting",
      "Command routing",
    ],
  },
  {
    id: 2,
    title: "Inventory Tracker",
    slug: "inventory-tracker",
    tagline: "Simple JavaFX inventory (school project)",
    description:
      "A basic inventory management tool created as a school project. Features a simple JavaFX GUI and connects to a MySQL database with about 50 items. Designed for basic CRUD operations and UI practice, not for production use.",
    problem:
      "Needed a simple way to track a small set of items for a class assignment; spreadsheets were slow and error-prone.",
    approach:
      "Built a minimal JavaFX GUI with basic forms and table views, wired to a MySQL database for persistent storage (~50 items). CRUD dialogs and search were kept simple for demo purposes.",
    outcome:
      "Met assignment requirements for CRUD and persistence; provided a working demo for classmates and instructor.",
    impact:
      "Served as a learning exercise in JavaFX and SQL, not intended for real-world use.",
    technologies: ["Java", "JavaFX", "MySQL", "Scene Builder"],
    features: [
      "Add/edit/delete items",
      "Simple search",
      "Persistent storage (~50 items)",
      "Basic desktop UI",
    ],
    challenges:
      "Keeping the UI and code simple enough for a class demo while using a real database backend.",
    githubUrl: "https://github.com/nwester627/InventoryTracker",
    liveUrl: null,
    status: "released",
    constraints: ["School project", "Small dataset", "No advanced features"],
    patterns: ["Simple MVC", "Table view", "Basic CRUD"],
  },
  {
    id: 4,
    title: "Portfolio Website",
    slug: "portfolio-website",
    tagline: "This site – polished glass UI",
    description:
      "This site: Next.js + Tailwind, dark/light theme, project modals, contact form, and some glass UI polish.",
    problem:
      "Needed a truthful, performant personal showcase with strong accessibility & theme fidelity.",
    approach:
      "Data‑driven skills, progressive enhancements (loader, reduced motion), unified glass design tokens.",
    outcome: "Faster initial paint and cohesive brand feel across sections.",
    impact: "Improved first paint feel & consistent brand/storytelling.",
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    features: [
      "Responsive layout",
      "Theme toggle",
      "Project modals",
      "Contact form",
      "Subtle animations",
    ],
    challenges:
      "Avoiding theme flash and keeping contrast tight—handled with context + careful palette choices.",
    githubUrl: "https://github.com/nwester627/ReactPortfolio2.0",
    liveUrl: "https://www.nicolaswester.com",
    status: "released",
    constraints: ["Static export", "Fast first paint", "Accessible motion"],
    patterns: [
      "Progressive enhancement",
      "Design tokens",
      "Reduced motion support",
      "Data-driven sections",
    ],
  },
  {
    id: 5,
    title: "hired.io (Interview Strategist)",
    slug: "hired-io",
    tagline: "Modern platform for interview preparation and management",
    description:
      "A comprehensive tool for streamlining interview prep and management, built with a microservices architecture and a modern tech stack. Focused on modularity, scalability, and maintainability, with a phased MVP-to-1.0 roadmap and explicit exclusion of AI integration.",
    problem:
      "Interview preparation is fragmented across tools, lacks structured feedback, and is often inefficient for both candidates and mentors.",
    approach:
      "Phased development: MVP delivers user auth, scheduling, question bank, manual feedback, and analytics. 1.0 adds advanced question management, role-specific simulations, collaborative mock sessions, detailed analytics, resource library, and notifications. Microservices architecture with REST APIs, modular file structure, and modern UI/UX.",
    outcome:
      "Delivers a robust, scalable platform for interview prep, with a clear technical foundation and future extensibility. Early releases focus on core value, with a roadmap for advanced features and analytics.",
    impact:
      "Centralizes and streamlines interview prep, enables structured feedback, and supports both individual and collaborative practice.",
    technologies: [
      "React.js",
      "Node.js",
      "Python (FastAPI)",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS",
      "Tailwind CSS",
    ],
    features: [
      "User authentication & profiles",
      "Interview scheduling & tracking",
      "Question bank (basic & advanced)",
      "Manual feedback submission",
      "Dashboard & analytics",
      "Role-specific simulations",
      "Collaborative mock sessions",
      "Resource library",
      "Notification system",
    ],
    challenges:
      "Coordinating microservices, ensuring data consistency, and delivering a seamless, responsive UI/UX across devices.",
    githubUrl: "https://github.com/nwester627/Hired.io",
    liveUrl: null,
    status: "in-progress",
    constraints: [
      "Microservices architecture",
      "Phased MVP/1.0 roadmap",
      "Responsive UI/UX",
    ],
    patterns: [
      "Microservices",
      "REST APIs",
      "Modular file structure",
      "Rule-based analytics",
    ],
  },
];
