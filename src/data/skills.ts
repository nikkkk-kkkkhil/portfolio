export interface Skill {
  name: string;
  blurb: string;
  missions: string[]; // mission ids
}

export interface SkillCategory {
  id: string;
  label: string;
  tagline: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "LANGUAGES",
    tagline: "The alphabets he thinks in.",
    skills: [
      {
        name: "C",
        blurb: "Where memory stopped being an abstraction. Pointers, segmentation faults, respect.",
        missions: ["010"],
      },
      {
        name: "C++",
        blurb: "The dojo language — DSA lab runs on it. RAII, STL, complexity budgets.",
        missions: ["010"],
      },
      {
        name: "Java",
        blurb: "First taste of strict structure and OOP discipline — the ATM system was born here.",
        missions: ["005"],
      },
      {
        name: "Python",
        blurb: "The sketching pencil — quick scripts, experiments, and AI prototyping.",
        missions: ["004"],
      },
      {
        name: "JavaScript",
        blurb: "The mother tongue. Frontend, backend, and everything in between.",
        missions: ["001", "003", "006", "007", "008", "009"],
      },
    ],
  },
  {
    id: "frontend",
    label: "FRONTEND",
    tagline: "Where systems learn to look back at you.",
    skills: [
      { name: "HTML", blurb: "Semantic structure — the skeleton no one sees but everyone stands on.", missions: ["006", "007", "008", "001"] },
      { name: "CSS", blurb: "The long war with centering, eventually won. Layouts, motion, restraint.", missions: ["006", "007", "008"] },
      { name: "JavaScript", blurb: "State, events, async — the language of interaction.", missions: ["006", "007", "008", "001", "003"] },
      { name: "React", blurb: "Component thinking, hooks, and UI as a function of state. The main weapon.", missions: ["001", "003", "004"] },
      { name: "Tailwind CSS", blurb: "Design at the speed of thought — utility-first styling for every dashboard.", missions: ["001"] },
    ],
  },
  {
    id: "backend",
    label: "BACKEND",
    tagline: "The machinery behind the curtain.",
    skills: [
      { name: "Node.js", blurb: "JavaScript unchained from the browser — the runtime under every API.", missions: ["001", "003", "004", "009"] },
      { name: "Express.js", blurb: "Minimal, sharp, honest. Routers, middleware, and the art of the clean endpoint.", missions: ["001", "003", "009"] },
      { name: "REST APIs", blurb: "Contracts between worlds. Resources, verbs, status codes that mean things.", missions: ["001", "003", "006", "009"] },
      { name: "Authentication", blurb: "Guarded doors: OTP flows, sessions, middleware bouncers.", missions: ["001", "009"] },
      { name: "JWT", blurb: "Signed, expiring, stateless proof — learned by building Gatekeeper.", missions: ["001", "009"] },
    ],
  },
  {
    id: "database",
    label: "DATABASE",
    tagline: "Where the truth is kept.",
    skills: [
      { name: "MongoDB", blurb: "Documents that map to the domain — users, slots, tokens, records.", missions: ["001", "003", "009"] },
      { name: "Mongoose", blurb: "Schemas as contracts. Validation before the data even arrives.", missions: ["001", "003"] },
    ],
  },
  {
    id: "development",
    label: "DEVELOPMENT",
    tagline: "The workshop instruments.",
    skills: [
      { name: "Git", blurb: "Time travel with conflict resolution. The commit log is a diary.", missions: ["001", "003", "010"] },
      { name: "GitHub", blurb: "Where the work lives in public — repos, branches, pull requests.", missions: ["001", "003", "010"] },
      { name: "VS Code", blurb: "The cockpit. Shortcuts learned so the hands never leave the keyboard.", missions: ["001", "005", "010"] },
      { name: "Postman", blurb: "The API interrogation room — every endpoint questioned before it ships.", missions: ["001", "003", "009"] },
    ],
  },
  {
    id: "ai",
    label: "AI",
    tagline: "The newest frontier of the lab.",
    skills: [
      { name: "Gemini API", blurb: "Structured prompts in, conservative predictions out — the brain of Crowd Sense.", missions: ["001", "004"] },
      { name: "AI Integration", blurb: "Wiring intelligence into real products with guardrails and honesty.", missions: ["001", "004", "002"] },
      { name: "Prediction Systems", blurb: "Signals in, probabilities out — always labelled as advisory, never certain.", missions: ["004", "002"] },
    ],
  },
];
