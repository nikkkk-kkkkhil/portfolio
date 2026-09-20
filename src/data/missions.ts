export type MissionStatus =
  | "ACTIVE"
  | "VISION"
  | "IN DEVELOPMENT"
  | "EXPERIMENTAL"
  | "COMPLETE"
  | "EARLY WORK";

export type MissionWeight =
  | "FLAGSHIP"
  | "DREAM"
  | "STANDARD"
  | "LAB"
  | "ARCHIVE";

export interface Mission {
  id: string;
  slug: string;
  name: string;
  codename: string;
  tagline: string;
  description: string;
  status: MissionStatus;
  weight: MissionWeight;
  category: string;
  difficulty: number; // 1–5
  tech: string[];
  features: { label: string; done: boolean }[];
  problem: string;
  solution: string;
  architecture: string[];
  process: string[];
  challenges: string[];
  lessons: string[];
  future: string[];
  note?: string;
}

export const statusTone: Record<
  MissionStatus,
  { text: string; dot: string; ring: string }
> = {
  ACTIVE: { text: "text-mint", dot: "bg-mint", ring: "border-mint/40" },
  VISION: { text: "text-viol", dot: "bg-viol", ring: "border-viol/40" },
  "IN DEVELOPMENT": {
    text: "text-amberish",
    dot: "bg-amberish",
    ring: "border-amberish/40",
  },
  EXPERIMENTAL: { text: "text-cy", dot: "bg-cy", ring: "border-cy/40" },
  COMPLETE: { text: "text-zinc-300", dot: "bg-zinc-300", ring: "border-zinc-500/40" },
  "EARLY WORK": { text: "text-zinc-400", dot: "bg-zinc-500", ring: "border-zinc-600/40" },
};

export const missions: Mission[] = [
  {
    id: "001",
    slug: "kisansetu",
    name: "KISANSETU",
    codename: "THE BRIDGE",
    tagline: "Smart procurement for the people who feed everyone else.",
    description:
      "A smart procurement platform that reduces waiting at agricultural procurement centres through digital slot booking, live queue tracking and intelligent overcrowding prediction.",
    status: "ACTIVE",
    weight: "FLAGSHIP",
    category: "FULL-STACK + AI + HACKATHON",
    difficulty: 5,
    tech: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Gemini API",
    ],
    features: [
      { label: "Farmer registration & OTP authentication", done: true },
      { label: "Farmer dashboard with booking history", done: true },
      { label: "Procurement-centre dashboard", done: true },
      { label: "Admin dashboard", done: true },
      { label: "Digital slot booking + token system", done: true },
      { label: "Live queue tracking", done: true },
      { label: "Procurement tracking & centre history", done: true },
      { label: "Notifications", done: true },
      { label: "AI overcrowding prediction (Gemini)", done: true },
      { label: "Multi-language support", done: false },
      { label: "Offline-first mobile mode", done: false },
    ],
    problem:
      "Farmers travel long distances to procurement centres and often wait entire days in unstructured queues. No visibility into crowding means wasted time, spoiled produce windows and stress — for farmers and for centre staff alike.",
    solution:
      "KisanSetu digitises the queue before it forms. Farmers register with OTP, book a slot, receive a token and track the live queue from anywhere. Centres get a dashboard to manage flow, and an AI layer analyses booking patterns to predict overcrowding before it happens — recommending slot redistribution in advance.",
    architecture: [
      "FARMER / CENTRE / ADMIN",
      "        │",
      "     REACT APP            ← Tailwind UI, role-based views",
      "        │  HTTPS / JWT",
      "     EXPRESS API          ← REST routes, auth middleware",
      "        │",
      "     NODE.JS SERVICES     ← slots, tokens, queue engine",
      "        │",
      "     MONGODB (Mongoose)   ← users, centres, slots, tokens",
      "        │",
      "     GEMINI API           ← crowding pattern analysis",
      "        ↓",
      "  PREDICTION → slot recommendations",
    ],
    process: [
      "Researched real procurement-centre workflows and queue pain points.",
      "Mapped three roles — farmer, centre, admin — and their journeys.",
      "Designed the slot + token data model in Mongoose before writing UI.",
      "Built the Express REST API with JWT + OTP authentication first.",
      "Layered the React dashboards role by role.",
      "Integrated Gemini API for crowding prediction during the hackathon sprint.",
      "Stress-tested the queue engine with simulated booking bursts.",
    ],
    challenges: [
      "Designing a token system that stays consistent under concurrent bookings.",
      "Keeping live queue state in sync between farmer and centre dashboards.",
      "Structuring prompts so Gemini returns actionable, conservative predictions.",
      "Hackathon time pressure — scoping features that could actually ship.",
    ],
    lessons: [
      "Model the domain first; the UI follows the data, not the reverse.",
      "Optimistic UI without conflict handling is a bug factory.",
      "AI features need guardrails — predictions advise, humans decide.",
      "Role-based thinking early saves weeks of refactoring later.",
    ],
    future: [
      "SMS/IVRS fallback for farmers without smartphones.",
      "Regional language packs.",
      "Route-level analytics for district administrators.",
      "Offline-first PWA mode for low-connectivity rural areas.",
    ],
  },
  {
    id: "002",
    slug: "nexus",
    name: "NEXUS",
    codename: "THE DREAM",
    tagline: "One digital world. Everything you need.",
    description:
      "The long-term vision: a single digital ecosystem uniting an AI assistant, productivity, learning, coding, projects, notes, calendar, communication, files, analytics, automation and developer tools.",
    status: "VISION",
    weight: "DREAM",
    category: "LONG-TERM PRODUCT VISION",
    difficulty: 5,
    tech: [
      "React",
      "Node.js",
      "AI Systems",
      "System Design",
      "Databases",
      "Cloud",
      "Automation",
    ],
    features: [
      { label: "Unified AI assistant across every module", done: false },
      { label: "Tasks, goals & project management", done: false },
      { label: "Learning engine & study plans", done: false },
      { label: "Developer Lab — code, database, API, terminal", done: false },
      { label: "Notes, calendar & file management", done: false },
      { label: "Personal analytics & automation", done: false },
      { label: "Architecture & module map", done: true },
      { label: "Interactive concept prototype", done: true },
    ],
    problem:
      "A developer's digital life is fragmented across dozens of disconnected tools — notes in one app, tasks in another, code somewhere else, learning scattered everywhere. Context dies between tabs.",
    solution:
      "NEXUS imagines one connected digital world where an AI layer flows across everything you do: plan the day, explain code, summarise notes, analyse projects — without ever leaving the system. It is deliberately a long-term vision: architected honestly, built module by module.",
    architecture: [
      "              ┌────────────────────┐",
      "              │     NEXUS CORE     │",
      "              │ identity · context │",
      "              └─────────┬──────────┘",
      "        ┌───────────────┼────────────────┐",
      "        │               │                │",
      "   AI ASSISTANT     PRODUCTIVITY     DEVELOPER LAB",
      "   chat · plans     tasks · goals    code · db · api",
      "        │               │                │",
      "        ├───────────────┼────────────────┤",
      "        │               │                │",
      "     LEARNING         STUDIO          ANALYTICS",
      "     paths · notes    calendar · files  habits · focus",
      "        └───────────────┴────────────────┘",
      "                        │",
      "               AUTOMATION ENGINE",
      "         (connects every module together)",
    ],
    process: [
      "Years of personal frustration with fragmented tools became the brief.",
      "Mapped every module a student-developer actually needs daily.",
      "Designed the core-context-first architecture so AI can flow between modules.",
      "Built the interactive concept prototype you can explore on this site.",
      "Documented the roadmap honestly: VISION → ARCHITECTURE → ECOSYSTEM.",
    ],
    challenges: [
      "Scope discipline — NEXUS is intentionally bigger than one person right now.",
      "Designing a module system that can grow for years without collapsing.",
      "Resisting the urge to fake completion; the vision is labelled honestly.",
    ],
    lessons: [
      "Every impossible project begins as something that doesn't exist yet.",
      "Architecture is a promise you make to your future self.",
      "A honest roadmap beats a fake launch every single time.",
    ],
    future: [
      "NEXUS v1 — tasks + notes + AI core.",
      "NEXUS AI — persistent context across modules.",
      "NEXUS Ecosystem — the full connected world.",
    ],
    note: "NEXUS is not a finished product. It is a vision under active architecture — and that honesty is the point.",
  },
  {
    id: "003",
    slug: "hospital-management",
    name: "HOSPITAL MS",
    codename: "SANITAS",
    tagline: "A management system for the places that heal.",
    description:
      "A hospital management system covering patients, doctors, appointments, records, departments, billing and an operational dashboard.",
    status: "IN DEVELOPMENT",
    weight: "STANDARD",
    category: "FULL-STACK",
    difficulty: 4,
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"],
    features: [
      { label: "Patient registration", done: true },
      { label: "Doctor management", done: true },
      { label: "Appointment scheduling", done: true },
      { label: "Patient records", done: true },
      { label: "Department management", done: false },
      { label: "Billing module", done: false },
      { label: "Operations dashboard", done: false },
    ],
    problem:
      "Clinic-style administration is a tangle of registers, phone calls and lost files. Appointments collide, records scatter, and billing becomes archaeology.",
    solution:
      "A single system where patients, doctors, schedules and records live together. Role-based dashboards keep receptionists, doctors and admins looking at the same truth.",
    architecture: [
      "RECEPTION / DOCTOR / ADMIN",
      "        │",
      "     REACT UI",
      "        │  JWT",
      "     EXPRESS API",
      "        │",
      "     MONGODB",
      "  patients · doctors · appointments · records",
    ],
    process: [
      "Modelled the patient–doctor–appointment relationships first.",
      "Built CRUD foundations, then layered scheduling logic.",
      "Added record history per patient with access rules.",
      "Currently building department + billing modules.",
    ],
    challenges: [
      "Appointment conflict detection across doctors and rooms.",
      "Designing record permissions that are strict but usable.",
    ],
    lessons: [
      "Scheduling is a data-integrity problem wearing a UI costume.",
      "Unfinished features should be labelled — honesty scales better than demos.",
    ],
    future: [
      "Billing + invoice generation.",
      "Department workload dashboard.",
      "Prescription module with print layouts.",
    ],
    note: "Unfinished modules are explicitly marked. This mission is still on the operating table.",
  },
  {
    id: "004",
    slug: "crowding-prediction",
    name: "CROWD SENSE",
    codename: "FORECASTER",
    tagline: "Teaching machines to see the crowd before it forms.",
    description:
      "An experimental AI dashboard that analyses procurement-centre signals and predicts crowding levels — born from KisanSetu's prediction layer.",
    status: "EXPERIMENTAL",
    weight: "LAB",
    category: "AI / PREDICTION",
    difficulty: 4,
    tech: ["Gemini API", "Node.js", "Express.js", "React", "MongoDB"],
    features: [
      { label: "Centre load analysis (queue %)", done: true },
      { label: "Expected load classification", done: true },
      { label: "Crowding prediction summary", done: true },
      { label: "Slot redistribution recommendation", done: true },
      { label: "Historical accuracy tracking", done: false },
      { label: "Multi-centre comparison", done: false },
    ],
    problem:
      "By the time a queue is visible, it's already too late. Centres need to know tomorrow's pressure today.",
    solution:
      "Feed booking velocity, historical patterns and time signals into an AI layer that returns a conservative crowding forecast plus a concrete recommendation — e.g. adjust slot distribution before the rush.",
    architecture: [
      "BOOKING SIGNALS (slots, time, history)",
      "        │",
      "     AGGREGATION SERVICE",
      "        │",
      "     GEMINI API (structured prompt)",
      "        │",
      "     FORECAST → load · level · advice",
      "        ↓",
      "   PREDICTION DASHBOARD",
    ],
    process: [
      "Extracted the prediction layer from KisanSetu into its own lab.",
      "Designed structured prompts that force conservative, explainable output.",
      "Built the dashboard visual language: queue %, load, recommendation.",
    ],
    challenges: [
      "AI output needed hard constraints to stay useful and cautious.",
      "Labelling uncertainty honestly — predictions advise, they never guarantee.",
    ],
    lessons: [
      "An experimental system that admits its limits is more trustworthy.",
      "Prompt design is API design.",
    ],
    future: [
      "Track predicted vs actual load to measure reliability.",
      "Weather + harvest-season signals.",
    ],
    note: "Experimental system — forecasts are advisory, never guaranteed.",
  },
  {
    id: "005",
    slug: "atm-system",
    name: "ATM SYSTEM",
    codename: "FIRST BLOOD",
    tagline: "Where the logic first held its ground.",
    description:
      "A console-based ATM simulation written in Java — PIN authentication, balance, deposits, withdrawals and a transaction menu. One of the earliest missions.",
    status: "EARLY WORK",
    weight: "ARCHIVE",
    category: "JAVA / FUNDAMENTALS",
    difficulty: 2,
    tech: ["Java", "OOP", "CLI"],
    features: [
      { label: "PIN authentication", done: true },
      { label: "Balance enquiry", done: true },
      { label: "Deposit", done: true },
      { label: "Withdrawal with validation", done: true },
      { label: "Transaction menu loop", done: true },
    ],
    problem:
      "Learn how real systems guard state — authentication first, validation everywhere, no free money for bad input.",
    solution:
      "A menu-driven program with a PIN gate, a guarded balance, and validation on every transaction path. Small scope, complete loop.",
    architecture: [
      "USER → PIN GATE",
      "        │ valid",
      "     MENU LOOP",
      "  ├─ BALANCE",
      "  ├─ DEPOSIT  → validate → update",
      "  └─ WITHDRAW → validate → update",
    ],
    process: [
      "Designed the state machine on paper first.",
      "Implemented authentication, then each transaction guard.",
      "Refactored into classes once the procedural version worked.",
    ],
    challenges: [
      "Input validation without a framework holding your hand.",
      "First encounter with 'the user can type anything' reality.",
    ],
    lessons: [
      "Never trust input. Ever.",
      "A complete small program teaches more than an abandoned big one.",
    ],
    future: ["Kept as an archive — a reminder of where the logic began."],
  },
  {
    id: "006",
    slug: "weather-dashboard",
    name: "WEATHER DASH",
    codename: "SKYWATCH",
    tagline: "First contact with a live API.",
    description:
      "A JavaScript weather dashboard — search any city for temperature, humidity, wind and forecast, rendered from a live API.",
    status: "COMPLETE",
    weight: "ARCHIVE",
    category: "JAVASCRIPT / API",
    difficulty: 2,
    tech: ["JavaScript", "REST API", "HTML", "CSS"],
    features: [
      { label: "City search", done: true },
      { label: "Current temperature & conditions", done: true },
      { label: "Humidity & wind", done: true },
      { label: "Multi-day forecast", done: true },
      { label: "Loading & error states", done: true },
    ],
    problem:
      "Learn asynchronous thinking: requests, responses, latency and failure.",
    solution:
      "A clean search → fetch → render loop with loading and error states treated as first-class UI, not afterthoughts.",
    architecture: [
      "SEARCH → fetch(API)",
      "          │",
      "     JSON → normalize",
      "          │",
      "     RENDER (temp · humidity · wind · forecast)",
    ],
    process: [
      "Built the fetch layer, then the render layer, then the states between.",
      "Spent most time on what happens when the API says no.",
    ],
    challenges: ["Race conditions when searching fast.", "Normalising inconsistent API payloads."],
    lessons: [
      "async/await is easy; async UX is the real skill.",
      "Empty, loading and error states are the product.",
    ],
    future: ["Geolocation auto-detect.", "Unit toggle (°C/°F)."],
  },
  {
    id: "007",
    slug: "task-manager",
    name: "TASKFLOW",
    codename: "DISCIPLINE",
    tagline: "The app that organises the person building apps.",
    description:
      "A task management system with create, complete, delete and filter — persisted in local storage.",
    status: "COMPLETE",
    weight: "ARCHIVE",
    category: "FRONTEND / STATE",
    difficulty: 2,
    tech: ["JavaScript", "HTML", "CSS", "LocalStorage"],
    features: [
      { label: "Create task", done: true },
      { label: "Complete / un-complete", done: true },
      { label: "Delete task", done: true },
      { label: "Filter: all · active · done", done: true },
      { label: "Local storage persistence", done: true },
    ],
    problem: "State is the heart of every app. Learn to own it without libraries.",
    solution:
      "A single source of truth in memory, mirrored to localStorage, with the UI as a pure function of state.",
    architecture: [
      "UI EVENT → update state",
      "              │",
      "        persist (localStorage)",
      "              │",
      "        re-render from state",
    ],
    process: [
      "Implemented state-first, UI-second.",
      "Added persistence, then filters as derived views.",
    ],
    challenges: ["Keeping derived filters in sync without duplication."],
    lessons: ["Derive, don't duplicate.", "localStorage is a contract, not a dump."],
    future: ["Drag-to-reorder.", "Due-date reminders."],
  },
  {
    id: "008",
    slug: "expense-tracker",
    name: "LEDGER",
    codename: "COLD CASH",
    tagline: "Every number tells on you eventually.",
    description:
      "An expense tracker with income, expenses, categories, running balance, transaction history and charts. Ships with demo data only.",
    status: "COMPLETE",
    weight: "ARCHIVE",
    category: "FRONTEND / DATA-VIZ",
    difficulty: 3,
    tech: ["JavaScript", "Chart rendering", "HTML", "CSS"],
    features: [
      { label: "Income & expense entry", done: true },
      { label: "Categories", done: true },
      { label: "Running balance", done: true },
      { label: "Transaction history", done: true },
      { label: "Category charts (demo data)", done: true },
    ],
    problem: "Turn raw transactions into something a human can actually read.",
    solution:
      "Categorised ledger with a computed balance and a chart layer that summarises where the money quietly goes.",
    architecture: [
      "ENTRY → ledger[]",
      "          ├─→ balance (computed)",
      "          ├─→ history view",
      "          └─→ category aggregation → charts",
    ],
    process: [
      "Ledger model first; balance as a computed value, never stored.",
      "Category aggregation feeds the chart layer.",
    ],
    challenges: ["NaN invasions from unchecked numeric input."],
    lessons: ["Compute don't store.", "parseFloat everything that claims to be money."],
    future: ["Budget ceilings per category.", "CSV export."],
    note: "Runs entirely on demo data.",
  },
  {
    id: "009",
    slug: "auth-system",
    name: "GATEKEEPER",
    codename: "THE DOOR",
    tagline: "Learning to guard the door before decorating the house.",
    description:
      "A backend authentication system: registration, login, JWT issuing, password hashing, protected routes and logout.",
    status: "COMPLETE",
    weight: "STANDARD",
    category: "BACKEND / SECURITY",
    difficulty: 3,
    tech: ["Node.js", "Express.js", "JWT", "bcrypt", "MongoDB"],
    features: [
      { label: "Registration with validation", done: true },
      { label: "Password hashing (bcrypt)", done: true },
      { label: "Login + JWT issuing", done: true },
      { label: "Protected route middleware", done: true },
      { label: "Logout / token invalidation strategy", done: true },
    ],
    problem:
      "Everything valuable lives behind a door. Learn to build the door properly: hash, sign, verify, expire.",
    solution:
      "A clean Express auth service — bcrypt-hashed credentials, short-lived JWTs, middleware that guards protected routes, and a logout story that isn't hand-waving.",
    architecture: [
      "REGISTER → hash(bcrypt) → store",
      "LOGIN    → compare → sign(JWT)",
      "REQUEST  → middleware verify(JWT) → route",
      "LOGOUT   → denylist / expiry",
    ],
    process: [
      "Studied hashing vs encryption before writing a line.",
      "Built the middleware as the single choke point.",
      "Attacked my own endpoints with bad tokens until they held.",
    ],
    challenges: [
      "Token expiry vs UX tension.",
      "Understanding why you never, ever store plain passwords.",
    ],
    lessons: [
      "Security is a posture, not a feature.",
      "The middleware is the bouncer — one door, checked every time.",
    ],
    future: ["Refresh-token rotation.", "Rate limiting + lockout policy."],
  },
  {
    id: "010",
    slug: "dsa-lab",
    name: "DSA LAB",
    codename: "THE GYM",
    tagline: "Where the mind does its repetitions.",
    description:
      "A growing collection of C++ data-structure and algorithm implementations — the daily training under every other mission.",
    status: "ACTIVE",
    weight: "LAB",
    category: "C++ / FUNDAMENTALS",
    difficulty: 4,
    tech: ["C++", "STL", "Algorithms"],
    features: [
      { label: "Arrays & strings", done: true },
      { label: "Searching & sorting", done: true },
      { label: "Recursion", done: true },
      { label: "Linked lists", done: true },
      { label: "Stacks & queues", done: true },
      { label: "Trees", done: false },
      { label: "Graphs & advanced topics", done: false },
    ],
    problem:
      "Frameworks change every year; fundamentals compound forever. Train the muscle that writes everything else.",
    solution:
      "A disciplined, ever-growing lab of implementations — each structure written from scratch, tested, and annotated with complexity notes.",
    architecture: [
      "DSA LAB",
      "  ├─ ARRAYS        STRINGS",
      "  ├─ SEARCHING     SORTING",
      "  ├─ RECURSION",
      "  ├─ LINKED LISTS",
      "  ├─ STACKS        QUEUES",
      "  └─ TREES (in progress)",
    ],
    process: [
      "Implement from scratch → test → annotate complexity.",
      "Revisit old solutions and refactor them cleaner.",
    ],
    challenges: [
      "Pointer discipline in linked structures.",
      "Thinking in invariants instead of examples.",
    ],
    lessons: [
      "Complexity is a budget — spend it deliberately.",
      "Recursion is just trust with extra steps.",
    ],
    future: ["Trees → graphs → DP.", "Timed problem-solving blocks."],
  },
];

export const getMission = (slug: string) =>
  missions.find((m) => m.slug === slug);
