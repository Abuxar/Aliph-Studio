/**
 * Content model. Every service page, case study, sitemap entry and JSON-LD
 * block is generated from this file, so nothing drifts out of sync.
 *
 * When you move to Sanity, these types become the schema and the loaders
 * swap out — the components consuming them do not change.
 */

export type Service = {
  slug: string;
  title: string;
  /** Used in nav and cards. */
  short: string;
  /** Outcome-led H1 on the service page. */
  headline: string;
  accentWord: string;
  summary: string;
  /** The client's problem, in their words. */
  problem: string;
  deliverables: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Full-Stack Web Development",
    short: "Web platforms",
    headline: "Web platforms that hold up under real",
    accentWord: "traffic",
    summary:
      "Production web applications built on React, Node and Next.js — from marketing sites that rank to dashboards your team runs the business on.",
    problem:
      "You have a product that works in a demo and falls over in production. Or an agency built you something two years ago that nobody can safely change any more.",
    deliverables: [
      "Technical discovery and architecture plan",
      "Design system and component library you own",
      "Full-stack application — frontend, API, database, auth",
      "Automated tests and CI pipeline",
      "Performance budget enforced in CI",
      "Handover documentation and a trained team",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"],
    faqs: [
      {
        q: "Do you work with our existing codebase?",
        a: "Yes. Roughly half our work is inherited codebases. We start with a paid audit — architecture, dependency health, test coverage, performance — and give you a written plan before anyone writes code.",
      },
      {
        q: "Who owns the code?",
        a: "You do, completely, from the first commit. We work in your repository or hand over ours at close. There is no license, no lock-in and no ongoing fee to keep running what we built.",
      },
    ],
  },
  {
    slug: "mobile-apps",
    title: "Flutter App Development",
    short: "Mobile apps",
    headline: "One codebase, both stores, no",
    accentWord: "compromise",
    summary:
      "Cross-platform iOS and Android apps in Flutter — native performance and a single team, instead of two codebases drifting apart.",
    problem:
      "Native means two teams, two backlogs and features landing on Android months after iOS. You want one product, shipped once.",
    deliverables: [
      "Product definition and user flows",
      "Flutter application for iOS and Android",
      "Offline-first data layer and sync",
      "Push notifications and deep linking",
      "App Store and Play Store submission",
      "Crash reporting and release pipeline",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Node.js", "REST", "GraphQL"],
    faqs: [
      {
        q: "Why Flutter and not React Native?",
        a: "Flutter renders its own widgets rather than bridging to platform ones, so the UI is identical across devices and animation stays at 60fps on lower-end Android — which matters a great deal in this market. If you already have a React team, we will make the case for React Native instead. The right answer depends on your team, not our preference.",
      },
      {
        q: "Can it share a backend with our website?",
        a: "That is exactly what our hybrid engagement is for — one API serving both the app and the web client. See the hybrid platform service.",
      },
    ],
  },
  {
    slug: "hybrid-platforms",
    title: "Hybrid App & Web Platforms",
    short: "Hybrid platforms",
    headline: "App and web, one backend, one",
    accentWord: "truth",
    summary:
      "A single API and data model serving your Flutter app and your Next.js web client — so a change ships once and lands everywhere.",
    problem:
      "Your app and your website disagree. Different teams built them, the data models diverged, and now every feature has to be specified, built and debugged twice.",
    deliverables: [
      "Unified domain model and API contract",
      "Shared backend — auth, data, business logic, webhooks",
      "Next.js web client",
      "Flutter mobile client",
      "Shared design tokens across both clients",
      "One release process covering the whole platform",
    ],
    stack: ["Next.js", "Flutter", "Node.js", "TypeScript", "PostgreSQL", "Redis"],
    faqs: [
      {
        q: "Is this cheaper than building the two separately?",
        a: "Not at the start — the shared contract takes more design work up front. It pays back from roughly the third feature onward, and it keeps paying every time you add one. If you only ever plan to ship one client, do not do this.",
      },
    ],
  },
  {
    slug: "seo",
    title: "Search Engine Optimisation",
    short: "SEO",
    headline: "Rankings that come from engineering, not",
    accentWord: "guesswork",
    summary:
      "Technical SEO, Core Web Vitals and content strategy from a team that builds the sites — so the fixes actually get implemented.",
    problem:
      "Your last SEO agency sent monthly PDFs full of recommendations your developers never had time to action. Nothing shipped, so nothing changed.",
    deliverables: [
      "Technical audit — crawl, index coverage, Core Web Vitals",
      "Implemented fixes, not a list of suggestions",
      "Structured data and schema markup",
      "Keyword and intent map by service",
      "Content plan built around topic clusters",
      "Local SEO and Google Business Profile setup",
      "Monthly reporting against revenue, not rankings",
    ],
    stack: ["Search Console", "GA4", "Ahrefs", "Screaming Frog", "Lighthouse CI"],
    faqs: [
      {
        q: "How long before we see results?",
        a: "Technical fixes and Core Web Vitals can move within weeks. Content-driven ranking for competitive commercial terms realistically takes four to eight months. Anyone promising page one in thirty days is selling you something else.",
      },
      {
        q: "Do you do the implementation or just advise?",
        a: "We implement. That is the entire point of hiring engineers for SEO work — the recommendation and the deployment come from the same team.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Digital marketing",
    headline: "Campaigns measured in pipeline, not",
    accentWord: "impressions",
    summary:
      "Paid search, paid social and lifecycle marketing wired directly to your analytics — so you know which spend produced which customer.",
    problem:
      "You are spending on ads and cannot say which channel produced last month's customers. The dashboard shows impressions; the bank account shows something else.",
    deliverables: [
      "Channel strategy and budget allocation",
      "Google Ads and Meta campaign build",
      "Conversion tracking and server-side events",
      "Landing pages built to convert, not to look busy",
      "Email and lifecycle automation",
      "Attribution reporting tied to closed revenue",
    ],
    stack: ["Google Ads", "Meta Ads", "GA4", "GTM", "Resend", "Looker Studio"],
    faqs: [
      {
        q: "What is the minimum ad spend you work with?",
        a: "Below roughly USD 2,000 per month in media spend, the management fee eats the return. Under that we would rather set you up to run it yourself and get out of the way.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  market: string;
  year: string;
  headline: string;
  summary: string;
  services: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  /** PLACEHOLDER — swap for real client outcomes before launch. */
  placeholder?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "meraki-commerce",
    client: "Meraki",
    sector: "E-commerce",
    market: "United Kingdom",
    year: "2025",
    headline: "Rebuilt a failing storefront and tripled organic revenue",
    summary:
      "A Shopify storefront was taking 6.4 seconds to render on mobile and bleeding search visibility. We rebuilt the front end on Next.js against the existing commerce backend, then ran a six-month technical SEO programme against it.",
    services: ["Full-Stack Web Development", "Search Engine Optimisation"],
    stack: ["Next.js", "TypeScript", "Shopify Storefront API", "Vercel"],
    metrics: [
      { value: "1.1s", label: "Largest Contentful Paint" },
      { value: "+240%", label: "Organic sessions" },
      { value: "+61%", label: "Conversion rate" },
    ],
    placeholder: true,
  },
  {
    slug: "qasr-logistics",
    client: "Qasr Logistics",
    sector: "Logistics",
    market: "United Arab Emirates",
    year: "2025",
    headline: "One platform replacing an app, a portal and a spreadsheet",
    summary:
      "Drivers used an Android app, dispatchers used a web portal, and finance reconciled both by hand every Friday. We unified all three onto a single API with Flutter and Next.js clients.",
    services: ["Hybrid App & Web Platforms"],
    stack: ["Flutter", "Next.js", "Node.js", "PostgreSQL", "Redis"],
    metrics: [
      { value: "14h", label: "Weekly reconciliation removed" },
      { value: "99.95%", label: "Platform uptime" },
      { value: "4.7", label: "Play Store rating" },
    ],
    placeholder: true,
  },
  {
    slug: "northline-clinics",
    client: "Northline Clinics",
    sector: "Healthcare",
    market: "United States",
    year: "2024",
    headline: "Local search visibility across eleven clinic locations",
    summary:
      "Eleven locations competing with each other in local search results. We restructured the site into a proper location hierarchy, fixed NAP consistency across every directory, and built a review pipeline.",
    services: ["Search Engine Optimisation", "Digital Marketing"],
    stack: ["Next.js", "Sanity", "Search Console", "GA4"],
    metrics: [
      { value: "+310%", label: "Map pack impressions" },
      { value: "+128%", label: "Booking enquiries" },
      { value: "11", label: "Locations ranking locally" },
    ],
    placeholder: true,
  },
];

/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    title: "Discover",
    duration: "1–2 weeks",
    body: "We map the problem, the users and the constraints before proposing anything. You get a written technical plan and a fixed estimate. If the plan says you should not build this, we tell you.",
  },
  {
    title: "Design",
    duration: "2–4 weeks",
    body: "Interface design and a component system, built in the browser rather than handed over as flat mockups. You review real screens on a real device.",
  },
  {
    title: "Build",
    duration: "4–12 weeks",
    body: "Two-week sprints against a shared board. A deployed preview URL updates on every push, so you are never waiting for a demo to see progress.",
  },
  {
    title: "Launch",
    duration: "1 week",
    body: "Performance audit against the agreed budget, analytics and Search Console wired up, DNS cut over. We are on call through the first week in production.",
  },
  {
    title: "Scale",
    duration: "Ongoing",
    body: "Retainer or handover — your call. If you take handover, we train your team and document the system properly. We would rather you did not need us.",
  },
];

export const engagementModels = [
  {
    name: "Fixed-scope project",
    best: "A defined build with a clear finish line",
    body: "Scoped in discovery, quoted as a fixed price, delivered in milestones. Best when you know what you need and want budget certainty.",
    terms: ["Fixed price", "Milestone billing", "Defined deliverables"],
  },
  {
    name: "Monthly retainer",
    best: "Continuous product work",
    body: "A reserved share of the team every month, working a rolling backlog you prioritise. Best when the roadmap keeps moving.",
    terms: ["Monthly fee", "Rolling backlog", "30-day notice"],
  },
  {
    name: "Dedicated team",
    best: "Extending an in-house team",
    body: "Engineers embedded in your process, your stand-ups and your repository. Best when you have the management capacity and need throughput.",
    terms: ["Per-engineer rate", "Your process", "Minimum 3 months"],
  },
];

export const faqs = [
  {
    q: "Where are you based, and does that matter?",
    a: "We are in DHA Phase 3, Lahore. It matters in your favour: our working day overlaps the UAE almost entirely, the UK by four hours, and the US East Coast by two to three hours in the afternoon. Most clients get a same-day answer.",
  },
  {
    q: "Who owns the code and the intellectual property?",
    a: "You do, in full, from the first commit. Assignment is written into the contract and there are no licensing terms attached to anything we hand over.",
  },
  {
    q: "How do you handle payments from outside Pakistan?",
    a: "Bank transfer in USD, GBP, EUR or AED, or by card through Wise or Payoneer. Invoices are issued in your currency. Typical terms are 40% on start, 40% at the midpoint milestone, 20% on delivery.",
  },
  {
    q: "What happens after launch?",
    a: "Thirty days of bug fixes are included in every project at no cost. After that you can take a support retainer or take full handover — we document and train either way.",
  },
  {
    q: "How do we communicate day to day?",
    a: "A shared Slack channel, a public board, and a weekly call at a time that works in your timezone. No account manager relaying messages between you and the people doing the work.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, before discovery starts. Send yours or use ours.",
  },
];

export const testimonials = [
  {
    quote:
      "They pushed back on half of what we asked for in the first week, and they were right about most of it. The build came in on the estimate and the site is measurably faster than anything we have shipped before.",
    name: "Sarah Whitfield",
    role: "Head of Digital",
    company: "Meraki",
    placeholder: true,
  },
  {
    quote:
      "We had three systems that did not talk to each other. Aliph replaced all of it with one platform in four months, and our finance team got their Fridays back.",
    name: "Omar Al-Rashid",
    role: "Operations Director",
    company: "Qasr Logistics",
    placeholder: true,
  },
  {
    quote:
      "The difference is that they implement what they recommend. Our previous agency sent us reports. These people shipped the fixes.",
    name: "Dana Mercer",
    role: "Marketing Lead",
    company: "Northline Clinics",
    placeholder: true,
  },
];

export const techStack = [
  "Next.js", "React", "TypeScript", "Node.js", "Flutter", "Dart",
  "MongoDB", "PostgreSQL", "Redis", "Tailwind CSS", "GSAP", "Sanity",
  "Docker", "Vercel", "AWS", "Figma",
];

export const stats = [
  { value: "60+", label: "Projects delivered" },
  { value: "4", label: "Markets served" },
  { value: "94%", label: "Client retention" },
  { value: "2.1yr", label: "Average engagement" },
];
