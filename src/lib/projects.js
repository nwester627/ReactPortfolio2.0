// Central project data model (case study view).
// Fields: id, title, tagline, description, problem, approach, outcome, technologies,
// features, challenges, githubUrl, liveUrl, status, constraints, patterns.

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
    tagline: "Desktop parts & products manager",
    description:
      "Java / JavaFX app for managing parts and products with search, persistence and simple tracking.",
    problem: "Manual spreadsheet inventory prone to mismatch and slow lookups.",
    approach:
      "Introduced thin model layer + observable lists, search normalization, and guarded CRUD dialogs.",
    outcome:
      "Faster part lookup and fewer data mismatches; simplified training for new users.",
    impact: "Decreased lookup time and onboarding friction for new users.",
    technologies: ["Java", "JavaFX", "SQL", "Scene Builder"],
    features: [
      "Parts & products CRUD",
      "Search",
      "Stock tracking",
      "Persistent storage",
      "Clean desktop UI",
    ],
    challenges:
      "Balancing UI clarity with relational data—solved by a small model layer instead of fat controllers.",
    githubUrl: "https://github.com/nwester627/schoolProject",
    liveUrl: null,
    status: "released",
    constraints: [
      "Simple training",
      "Local persistence",
      "Non-technical users",
    ],
    patterns: ["Model layer", "Observable lists", "Search normalization"],
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
    aiEnhanced: {
      enabled: true,
      tools: ["GPT-5", "Claude"],
      description:
        "Human-led build with AI as a productivity co-pilot for speed and polish.",
    },
    constraints: ["Static export", "Fast first paint", "Accessible motion"],
    patterns: [
      "Progressive enhancement",
      "Design tokens",
      "Reduced motion support",
      "Data-driven sections",
      "AI-assisted architecture",
    ],
  },
  {
    id: 5,
    title: "The Grassroots Guide (Working Title)",
    slug: "grassroots-guide",
    tagline: "Action hub for local progressive politics",
    description:
      "Action-oriented web platform to help progressives find and engage in local politics.",
    problem:
      "Finding local opportunities is hard—info lives across government sites, social groups, and scattered calendars.",
    approach:
      'Centralize location-based discovery, pair listings with "Action Kits" (key dates + links) to convert interest into action.',
    outcome:
      "Pilot for Polk County, FL; staged roadmap to statewide and national expansion.",
    impact:
      "Lowers barrier to entry and turns passive interest into concrete next steps.",
    technologies: [
      "Next.js",
      "Vercel Functions",
      "Supabase (Postgres)",
      "Leaflet.js",
      "Tailwind CSS",
    ],
    features: [
      "Location-based search",
      "Local offices to run for",
      "Protests & meetings",
      "Group connections",
      "Action Kits",
    ],
    challenges:
      "Aggregating disparate sources and normalizing geo data while keeping UX simple.",
    githubUrl: null,
    liveUrl: null,
    status: "in-progress",
    constraints: ["Serverless friendly", "Simple MVP", "Accessible maps"],
    patterns: [
      "Geocoded search",
      "Serverless API routes",
      "Progressive disclosure",
    ],
  },
];
