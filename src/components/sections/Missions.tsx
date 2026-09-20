"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FolderOpen, Hexagon, Rocket } from "lucide-react";
import { missions, statusTone, type Mission } from "@/data/missions";
import { ChapterHead, Reveal, Tag, Corners } from "../SectionChrome";
import { useExperience } from "../ExperienceProvider";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "major", label: "MAJOR" },
  { id: "fullstack", label: "FULL-STACK" },
  { id: "ai", label: "AI" },
  { id: "labs", label: "LABS + EARLY" },
] as const;

function matches(m: Mission, f: string) {
  switch (f) {
    case "major":
      return m.weight === "FLAGSHIP" || m.weight === "DREAM";
    case "fullstack":
      return m.category.includes("FULL-STACK");
    case "ai":
      return m.category.includes("AI") || m.tech.some((t) => t.includes("Gemini") || t.includes("AI"));
    case "labs":
      return m.weight === "LAB" || m.weight === "ARCHIVE";
    default:
      return true;
  }
}

function DiffPips({ n }: { n: number }) {
  return (
    <span className="flex gap-1" aria-label={`Difficulty ${n} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-3 ${i < n ? "bg-cy/70" : "bg-line2"}`}
        />
      ))}
    </span>
  );
}

function StatusTag({ m }: { m: Mission }) {
  const t = statusTone[m.status];
  return (
    <Tag tone={`${t.text} ${t.ring} bg-void/60`}>
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot} animate-blink`} />
      {m.status}
    </Tag>
  );
}

function MiniArch() {
  const steps = ["FARMER", "REACT", "EXPRESS API", "NODE.JS", "MONGODB", "AI PREDICTION"];
  return (
    <div className="mt-5 flex flex-wrap items-center gap-y-2 font-mono text-[10px] tracking-[0.18em]">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center">
          <span
            className={`border px-2.5 py-1.5 ${
              i === steps.length - 1
                ? "border-viol/50 bg-viol/10 text-viol"
                : i === 0
                  ? "border-mint/50 bg-mint/10 text-mint"
                  : "border-line bg-void/70 text-zinc-400"
            }`}
          >
            {s}
          </span>
          {i < steps.length - 1 && <ArrowRight className="mx-1 h-3 w-3 text-zinc-600" />}
        </span>
      ))}
    </div>
  );
}

function Card({ m, span }: { m: Mission; span: string }) {
  const { openMission, setNexusOpen } = useExperience();
  const flagship = m.weight === "FLAGSHIP";
  const dream = m.weight === "DREAM";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full flex-col border p-6 transition-colors duration-300 ${
        dream
          ? "border-viol/40 bg-gradient-to-br from-viol/[0.08] via-panel to-panel hover:border-viol/70"
          : flagship
            ? "border-line bg-panel/70 hover:border-cy/50"
            : "border-line/80 bg-panel/40 hover:border-cy/40"
      } ${span}`}
    >
      <Corners className={`opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${dream ? "[&_span]:border-viol/50" : ""}`} />
      {dream && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rotate-12 bg-viol/10 blur-2xl"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">
          MISSION {m.id} — {m.codename}
        </span>
        <StatusTag m={m} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        {dream && <Rocket className="h-6 w-6 text-viol" />}
        <h3
          className={`font-sans font-bold tracking-tight ${
            flagship || dream ? "text-3xl sm:text-4xl" : "text-xl"
          } ${dream ? "text-viol" : "text-zinc-100"}`}
        >
          {m.name}
        </h3>
      </div>

      <p className="mt-1 font-mono text-[11px] tracking-[0.22em] text-zinc-500">
        {m.category}
      </p>
      <p className={`mt-3 leading-relaxed text-zinc-400 ${flagship || dream ? "text-base" : "text-sm"}`}>
        {m.description}
      </p>

      {flagship && <MiniArch />}
      {dream && (
        <div className="mt-5 border border-viol/30 bg-void/50 p-4 font-mono text-[11px] leading-6 tracking-[0.14em]">
          <p><span className="text-zinc-600">STATUS:</span> <span className="text-viol">VISION</span></p>
          <p><span className="text-zinc-600">CURRENT PHASE:</span> <span className="text-zinc-300">ARCHITECTURE</span></p>
          <p><span className="text-zinc-600">FUTURE:</span> <span className="text-zinc-300">BUILDING THE ECOSYSTEM</span></p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {m.tech.slice(0, flagship || dream ? 8 : 4).map((t) => (
          <span
            key={t}
            className="border border-line/70 bg-void/60 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-zinc-500"
          >
            {t.toUpperCase()}
          </span>
        ))}
        {m.tech.length > (flagship || dream ? 8 : 4) && (
          <span className="px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-zinc-600">
            +{m.tech.length - (flagship || dream ? 8 : 4)}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <DiffPips n={m.difficulty} />
        <div className="flex gap-2">
          {dream && (
            <button
              onClick={() => setNexusOpen(true)}
              data-cursor="ENTER"
              className="flex items-center gap-2 border border-viol/50 bg-viol/15 px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] text-viol transition-colors hover:bg-viol/25"
            >
              <Hexagon className="h-3.5 w-3.5" /> ENTER NEXUS
            </button>
          )}
          <button
            onClick={() => openMission(m.slug)}
            data-cursor="CASE FILE"
            className={`flex items-center gap-2 border px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] transition-colors ${
              dream
                ? "border-line text-zinc-400 hover:border-viol/50 hover:text-viol"
                : "border-line text-zinc-400 hover:border-cy/50 hover:text-cy"
            }`}
          >
            <FolderOpen className="h-3.5 w-3.5" />
            {dream ? "VISION FILE" : "OPEN CASE FILE"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Missions() {
  const [filter, setFilter] = useState<string>("all");
  const list = missions.filter((m) => matches(m, filter));
  const spanFor = (m: Mission) =>
    m.weight === "FLAGSHIP"
      ? "lg:col-span-4"
      : m.weight === "DREAM"
        ? "lg:col-span-2"
        : m.weight === "STANDARD"
          ? "lg:col-span-3"
          : "lg:col-span-3";

  return (
    <section id="missions" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40">
      <div
        className="absolute left-[-15%] top-[20%] h-[50vh] w-[40vw] rounded-full bg-cydeep/10 blur-[130px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          index="CHAPTER 07"
          file="MISSION_ARCHIVE.DB"
          title="MISSIONS."
          sub="Not all missions are equal — flagships, experiments and early training exercises. Exactly how real growth looks."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`border px-3.5 py-2 font-mono text-[10px] tracking-[0.22em] transition-all ${
                  filter === f.id
                    ? "border-cy/60 bg-cy/10 text-cy"
                    : "border-line text-zinc-500 hover:border-line2 hover:text-zinc-300"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto hidden items-center font-mono text-[10px] tracking-[0.24em] text-zinc-600 md:flex">
              {list.length} RECORD{list.length === 1 ? "" : "S"} FOUND
            </span>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {list.map((m) => (
              <Card key={m.slug} m={m} span={`md:col-span-2 ${spanFor(m)}`} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center font-mono text-[11px] tracking-[0.22em] text-zinc-600">
            GITHUB + LIVE LINKS ARE ATTACHED AS MISSIONS GO PUBLIC — NO FAKE URLS IN THIS ARCHIVE.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
