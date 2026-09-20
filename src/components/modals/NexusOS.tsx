"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  FolderKanban,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Power,
  Sparkles,
  StickyNote,
  TerminalSquare,
} from "lucide-react";
import { useExperience } from "../ExperienceProvider";
import { NexusMark } from "../sections/Nexus";
import { Tag } from "../SectionChrome";

type ModuleId =
  | "dash"
  | "ai"
  | "tasks"
  | "projects"
  | "learning"
  | "notes"
  | "calendar"
  | "files"
  | "analytics"
  | "devlab";

const MODULES: { id: ModuleId; label: string; icon: React.ElementType }[] = [
  { id: "dash", label: "Dashboard", icon: LayoutDashboard },
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "learning", label: "Learning", icon: GraduationCap },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "files", label: "Files", icon: FolderOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "devlab", label: "Developer Lab", icon: TerminalSquare },
];

const AI_ANSWERS: Record<string, string[]> = {
  "Plan my day": [
    "Analyzing your 07 open tasks...",
    "09:00 — Deep work: KisanSetu queue engine (90 min).",
    "11:00 — DSA block: trees, 3 problems.",
    "14:00 — Hospital MS: billing module sketch.",
    "17:00 — Review, commit, log. Mission advanced by one step.",
  ],
  "Explain this code": [
    "Paste any snippet and I will walk through it line by line —",
    "what it does, why it works, and where it will betray you at 2 AM.",
    "[SIMULATED] In the real NEXUS, this is where the AI reads your project context.",
  ],
  "Analyze my project": [
    "Scanning project structure...",
    "KISANSETU: healthy. Queue engine stable. 2 features flagged IN PROGRESS.",
    "Recommendation: write tests for the token system before adding anything new.",
  ],
  "Create a study plan": [
    "Building 4-week plan around your current level...",
    "Week 1–2: Trees + recursion drills. Week 3: System design basics.",
    "Week 4: One full-stack feature shipped end-to-end. Proof over theory.",
  ],
  "Summarize my notes": [
    "Reading 14 unsorted notes...",
    "Summary: most ideas orbit one theme — connected systems.",
    "Archived under: NEXUS/blueprints. The dream keeps leaving fingerprints.",
  ],
  "Debug my application": [
    "Loading error trace...",
    "Hypothesis: undefined property on first render — data arrives after paint.",
    "Guard the render. The bug is shy, not smart.",
  ],
};

const SNIPPETS: Record<string, { lang: string; code: string }> = {
  CODE: {
    lang: "nexus/core.ts",
    code: `export interface NexusCore {
  identity: "masked";        // permanent
  context: ModuleContext[];  // AI flows across everything
  dream: true;
}

export async function boot(core: NexusCore) {
  await core.context.sync();
  return launch(core.dream); // one world, everything you need
}`,
  },
  DATABASE: {
    lang: "nexus/schema.md",
    code: `collections:
  users     → identity, preferences, aliases
  modules   → 13 planned, status: dreaming
  tasks     → owner, goal links, momentum score
  notes     → full-text indexed, AI-summarizable
  blueprints→ the dream, versioned, eternal`,
  },
  API: {
    lang: "nexus/routes.rest",
    code: `POST   /api/ai/ask          → nexus intelligence
GET    /api/tasks/today     → today's battle plan
PATCH  /api/goals/:id       → advance the mission
GET    /api/analytics/flow  → focus telemetry
WS     /nexus/live          → everything, in real time`,
  },
  TERMINAL: {
    lang: "nexus — zsh",
    code: `$ nexus boot
▸ loading core............ OK
▸ syncing modules......... 13 found
▸ waking AI............... "good morning."
▸ face scan............... DENIED (as designed)

NEXUS ready. What are we building today?`,
  },
  DEPLOYMENT: {
    lang: "nexus/pipeline.yml",
    code: `pipeline:
  - dream        # status: eternal
  - architect    # status: current phase
  - build v1     # tasks + notes + AI core
  - ship quietly # no face, just product
  - iterate      # forever`,
  },
};

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Planned({ label }: { label: string }) {
  return (
    <div className="mb-6">
      <Tag tone="text-viol border-viol/40 bg-viol/10">{label} — MODULE PLANNED · PART OF THE VISION</Tag>
    </div>
  );
}

function Dashboard() {
  const now = useClock();
  const h = now.getHours();
  const greeting = h < 12 ? "GOOD MORNING" : h < 18 ? "GOOD AFTERNOON" : "GOOD EVENING";
  const stats = [
    { k: "07", v: "TASKS" },
    { k: "03", v: "PROJECTS" },
    { k: "02", v: "GOALS" },
    { k: "01", v: "MISSION" },
  ];
  const bars = [42, 68, 55, 80, 61, 90, 74];
  return (
    <div>
      <h2 className="font-sans text-3xl font-bold text-zinc-100 md:text-5xl">
        {greeting}, <span className="text-viol">MASKED MAN.</span>
      </h2>
      <p className="mt-2 font-mono text-xs tracking-[0.24em] text-zinc-500">
        {now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }).toUpperCase()} — SYSTEMS NOMINAL · FACE: STILL HIDDEN
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.v} className="border border-line bg-white/[0.02] p-5 transition-colors hover:border-viol/50">
            <p className="font-sans text-4xl font-bold text-viol">{s.k}</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-zinc-500">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="border border-line bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">MISSION OF THE DAY</p>
          <p className="mt-2 text-lg text-zinc-200">
            Move one project forward by <span className="text-viol">one commit</span>.
          </p>
          <p className="mt-1 font-mono text-[10px] text-zinc-600">SMALL WINS COMPOUND. — NEXUS AI</p>
        </div>
        <div className="border border-line bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">WEEKLY FOCUS (SIMULATED)</p>
          <div className="mt-4 flex h-24 items-end gap-2">
            {bars.map((b, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${b}%` }}
                transition={{ delay: 0.06 * i, duration: 0.7 }}
                className="flex-1 bg-gradient-to-t from-viol/20 to-viol/80"
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-zinc-600">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiPanel() {
  const [log, setLog] = useState<{ q: string; a: string[] }[]>([]);
  const [typing, setTyping] = useState("");
  const [busy, setBusy] = useState(false);

  const ask = (q: string) => {
    if (busy) return;
    setBusy(true);
    const answer = AI_ANSWERS[q].join("\n");
    let i = 0;
    setTyping("");
    const t = setInterval(() => {
      i += 2;
      setTyping(answer.slice(0, i));
      if (i >= answer.length) {
        clearInterval(t);
        setLog((l) => [{ q, a: AI_ANSWERS[q] }, ...l]);
        setTyping("");
        setBusy(false);
      }
    }, 14);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-3xl font-bold text-zinc-100">NEXUS AI</h2>
        <Tag tone="text-amberish border-amberish/40 bg-amberish/10">SIMULATED — CONCEPT</Tag>
      </div>
      <p className="mt-2 text-zinc-400">How can I help?</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {Object.keys(AI_ANSWERS).map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            disabled={busy}
            className="border border-line px-3.5 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-viol/50 hover:text-viol disabled:opacity-40"
          >
            &gt; {q}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {typing && (
          <pre className="whitespace-pre-wrap border border-viol/30 bg-viol/[0.06] p-4 font-mono text-xs leading-6 text-viol/90">
            {typing}
            <span className="caret" />
          </pre>
        )}
        {log.map((entry, i) => (
          <div key={i} className={i === 0 ? "" : "opacity-60"}>
            <p className="font-mono text-xs text-zinc-500">&gt; {entry.q}</p>
            <pre className="mt-1.5 whitespace-pre-wrap border border-white/10 bg-white/[0.02] p-4 font-mono text-xs leading-6 text-zinc-300">
              {entry.a.join("\n")}
            </pre>
          </div>
        ))}
        {log.length === 0 && !typing && (
          <p className="border border-dashed border-line p-6 text-center font-mono text-xs text-zinc-600">
            AI CORE: DREAMING — PICK A PROMPT TO SIMULATE A RESPONSE
          </p>
        )}
      </div>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState(
    [
      { t: "Stabilize KisanSetu token engine", done: true },
      { t: "Hospital MS — billing module sketch", done: false },
      { t: "DSA: 3 tree problems", done: false },
      { t: "Read: system design — caching", done: true },
      { t: "NEXUS blueprint: module map v3", done: false },
      { t: "Commit before midnight", done: false },
      { t: "Sleep (recurring, always failed)", done: false },
    ],
  );
  const doneCount = tasks.filter((t) => t.done).length;
  return (
    <div>
      <Planned label="TASKS" />
      <h2 className="font-sans text-3xl font-bold text-zinc-100">
        Today&apos;s battle plan <span className="font-mono text-sm text-viol">{doneCount}/07</span>
      </h2>
      <ul className="mt-6 space-y-2">
        {tasks.map((task, i) => (
          <li key={task.t}>
            <button
              onClick={() =>
                setTasks((ts) => ts.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))
              }
              className="flex w-full items-center gap-3.5 border border-line bg-white/[0.02] px-4 py-3.5 text-left transition-colors hover:border-viol/40"
            >
              <span
                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center border font-mono text-[10px] ${
                  task.done ? "border-viol bg-viol/20 text-viol" : "border-line2 text-transparent"
                }`}
                style={{ height: 18, width: 18 }}
              >
                ✓
              </span>
              <span className={task.done ? "text-zinc-600 line-through" : "text-zinc-300"}>
                {task.t}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DevLab() {
  const [tab, setTab] = useState("CODE");
  return (
    <div>
      <Planned label="DEVELOPER LAB" />
      <h2 className="font-sans text-3xl font-bold text-zinc-100">Developer Lab</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {Object.keys(SNIPPETS).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`border px-3.5 py-2 font-mono text-[10px] tracking-[0.22em] transition-colors ${
              tab === k
                ? "border-viol/60 bg-viol/15 text-viol"
                : "border-line text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-4 border border-line bg-black/60">
        <div className="border-b border-line px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
          {SNIPPETS[tab].lang}
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-zinc-300">
          {SNIPPETS[tab].code}
        </pre>
      </div>
    </div>
  );
}

function Generic({ id }: { id: ModuleId }) {
  if (id === "projects")
    return (
      <div>
        <Planned label="PROJECTS" />
        <h2 className="font-sans text-3xl font-bold text-zinc-100">Projects</h2>
        <div className="mt-6 space-y-3">
          {[
            { n: "KISANSETU", p: 78, s: "ACTIVE" },
            { n: "HOSPITAL MS", p: 40, s: "IN DEVELOPMENT" },
            { n: "NEXUS", p: 3, s: "ARCHITECTURE — VISION" },
          ].map((p) => (
            <div key={p.n} className="border border-line bg-white/[0.02] p-4">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-zinc-200">{p.n}</span>
                <span className="text-viol">{p.s}</span>
              </div>
              <div className="mt-3 h-1.5 bg-line">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.p}%` }}
                  transition={{ duration: 0.9 }}
                  className="h-full bg-gradient-to-r from-viol/40 to-viol"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (id === "learning")
    return (
      <div>
        <Planned label="LEARNING" />
        <h2 className="font-sans text-3xl font-bold text-zinc-100">Learning Engine</h2>
        <ul className="mt-6 space-y-2.5">
          {[
            { t: "DSA — Trees", s: "THIS WEEK" },
            { t: "System Design — Caching", s: "QUEUED" },
            { t: "AI — Prompt Architecture", s: "QUEUED" },
            { t: "Cloud — Deployment Patterns", s: "LOCKED · QUEST" },
          ].map((l) => (
            <li key={l.t} className="flex justify-between border border-line bg-white/[0.02] px-4 py-3.5 font-mono text-xs">
              <span className="text-zinc-300">{l.t}</span>
              <span className="text-viol/80">{l.s}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  if (id === "notes")
    return (
      <div>
        <Planned label="NOTES" />
        <h2 className="font-sans text-3xl font-bold text-zinc-100">Notes</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { t: "NEXUS blueprint v3", b: "Modules should share one context. AI is the bloodstream." },
            { t: "Queue engines", b: "Tokens must be idempotent. Farmers don't retry politely." },
            { t: "Why the mask", b: "Work first. Face never. Draft — do not delete." },
          ].map((n) => (
            <div key={n.t} className="border border-line bg-white/[0.02] p-4">
              <p className="font-mono text-xs text-viol">{n.t}</p>
              <p className="mt-2 text-xs leading-5 text-zinc-400">{n.b}</p>
            </div>
          ))}
        </div>
      </div>
    );
  if (id === "calendar")
    return (
      <div>
        <Planned label="CALENDAR" />
        <h2 className="font-sans text-3xl font-bold text-zinc-100">Calendar</h2>
        <div className="mt-6 grid grid-cols-7 gap-2 text-center font-mono text-[10px] text-zinc-500">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, i) => (
            <div key={d} className={`border border-line bg-white/[0.02] p-3 ${i === 2 ? "border-viol/50" : ""}`}>
              <p>{d}</p>
              <div className="mt-2 space-y-1.5">
                {i % 2 === 0 && <div className="mx-auto h-1 w-6 bg-viol/60" />}
                {i % 3 === 0 && <div className="mx-auto h-1 w-4 bg-cy/50" />}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] text-zinc-600">DEEP WORK · DSA · SHIP — REPEATING FOREVER</p>
      </div>
    );
  if (id === "files")
    return (
      <div>
        <Planned label="FILES" />
        <h2 className="font-sans text-3xl font-bold text-zinc-100">Files</h2>
        <pre className="ascii-box mt-6 border border-line bg-black/50 p-5 text-xs leading-7 text-zinc-400">
{`NEXUS/
├── AI/
├── Tasks/
├── Projects/
│   ├── KisanSetu/
│   └── HospitalMS/
├── Learning/
├── Notes/
├── Calendar/
├── Files/
├── Analytics/
└── Developer Lab/   ← he lives here`}
        </pre>
      </div>
    );
  return (
    <div>
      <Planned label="ANALYTICS" />
      <h2 className="font-sans text-3xl font-bold text-zinc-100">Analytics</h2>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { k: "FOCUS", v: "6.2h", d: "per day" },
          { k: "COMMITS", v: "214", d: "simulated" },
          { k: "STREAK", v: "31d", d: "and counting" },
        ].map((s) => (
          <div key={s.k} className="border border-line bg-white/[0.02] p-5">
            <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-500">{s.k}</p>
            <p className="mt-1 font-sans text-3xl font-bold text-viol">{s.v}</p>
            <p className="mt-1 font-mono text-[9px] text-zinc-600">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NexusOS() {
  const { setNexusOpen } = useExperience();
  const [mod, setMod] = useState<ModuleId>("dash");
  const now = useClock();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNexusOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setNexusOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[145] flex flex-col bg-[#07060d]"
      role="dialog"
      aria-modal="true"
      aria-label="NEXUS concept operating system"
    >
      <div className="grid-bg-far pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <NexusMark className="h-7 w-7" />
          <span className="font-mono text-xs tracking-[0.3em] text-zinc-200">NEXUS OS</span>
          <span className="hidden border border-viol/40 bg-viol/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] text-viol sm:block">
            CONCEPT BUILD 0.1 — SIMULATION
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-zinc-500 md:block">
            {now.toLocaleTimeString()}
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-zinc-400 sm:block">
            USER: MASKED MAN
          </span>
          <button
            onClick={() => setNexusOpen(false)}
            className="flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-zinc-400 transition-colors hover:border-blood/60 hover:text-blood"
            aria-label="Exit NEXUS"
          >
            <Power className="h-3.5 w-3.5" /> EXIT
          </button>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1">
        {/* sidebar */}
        <aside className="flex w-16 flex-col gap-1 overflow-y-auto border-r border-white/10 bg-black/30 p-2 md:w-56">
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMod(m.id)}
              className={`flex items-center gap-3 px-3 py-2.5 font-mono text-[11px] tracking-[0.14em] transition-colors ${
                mod === m.id
                  ? "border border-viol/50 bg-viol/15 text-viol"
                  : "border border-transparent text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
              }`}
            >
              <m.icon className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline">{m.label}</span>
            </button>
          ))}
          <div className="mt-auto hidden border border-dashed border-line p-3 font-mono text-[9px] leading-4 text-zinc-600 md:block">
            THE VISION:
            <br />
            ONE WORLD.
            <br />
            EVERYTHING
            <br />
            CONNECTED.
          </div>
        </aside>

        {/* content */}
        <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={mod}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mx-auto max-w-5xl"
            >
              {mod === "dash" && <Dashboard />}
              {mod === "ai" && <AiPanel />}
              {mod === "tasks" && <Tasks />}
              {mod === "devlab" && <DevLab />}
              {(mod === "projects" ||
                mod === "learning" ||
                mod === "notes" ||
                mod === "calendar" ||
                mod === "files" ||
                mod === "analytics") && <Generic id={mod} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* footer disclaimer */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 px-4 py-2 text-center font-mono text-[9px] tracking-[0.24em] text-zinc-600">
        NEXUS IS A LONG-TERM VISION — AN INTERACTIVE CONCEPT, NOT A FINISHED PRODUCT · ESC TO EXIT
      </div>
    </motion.div>
  );
}
