"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  FolderGit2,
  Lightbulb,
  ListChecks,
  Network,
  Swords,
  Telescope,
  Wrench,
  X,
} from "lucide-react";
import { statusTone, type Mission } from "@/data/missions";
import { Corners, Tag } from "../SectionChrome";

function Block({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line/70 pt-7">
      <h3 className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.32em] text-cy">
        {icon}
        {label}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function MissionModal({ mission }: { mission: Mission }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.dispatchEvent(new CustomEvent("mm:close"));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const tone = statusTone[mission.status];

  return (
    <div
      className="fixed inset-0 z-[140] overflow-y-auto bg-black/85 backdrop-blur-sm"
      onClick={() => window.dispatchEvent(new CustomEvent("mm:close"))}
      role="dialog"
      aria-modal="true"
      aria-label={`Mission ${mission.id} case file — ${mission.name}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto my-6 w-[min(72rem,calc(100%-1.5rem))] border border-line2 bg-abyss md:my-12"
      >
        <Corners />
        {/* header */}
        <div className="sticky top-0 z-20 border-b border-line bg-abyss/95 px-6 py-4 backdrop-blur md:px-10">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
              MISSION {mission.id} // CASE FILE — {mission.codename}
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("mm:close"))}
              className="border border-line p-2 text-zinc-500 transition-colors hover:border-blood/60 hover:text-blood"
              aria-label="Close case file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="px-6 py-10 md:px-10">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="font-sans text-4xl font-bold tracking-tight text-zinc-100 md:text-6xl">
              {mission.name}
            </h2>
            <Tag tone={`${tone.text} ${tone.ring} bg-void/60`}>
              <span className={`h-1.5 w-1.5 rounded-full ${tone.dot} animate-blink`} />
              {mission.status}
            </Tag>
          </div>
          <p className="mt-3 max-w-2xl text-lg italic leading-relaxed text-zinc-400">
            “{mission.tagline}”
          </p>

          {/* meta strip */}
          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-panel/70 p-4">
              <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-600">MISSION ID</p>
              <p className="mt-1 font-mono text-sm text-zinc-200">TMM-{mission.id}</p>
            </div>
            <div className="bg-panel/70 p-4">
              <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-600">DIFFICULTY</p>
              <p className="mt-1 font-mono text-sm text-zinc-200">
                {"★".repeat(mission.difficulty)}
                <span className="text-zinc-700">{"★".repeat(5 - mission.difficulty)}</span>
              </p>
            </div>
            <div className="bg-panel/70 p-4">
              <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-600">TYPE</p>
              <p className="mt-1 font-mono text-sm text-zinc-200">{mission.category}</p>
            </div>
            <div className="bg-panel/70 p-4">
              <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-600">CLASS</p>
              <p className="mt-1 font-mono text-sm text-zinc-200">{mission.weight}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-600">TECH STACK</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {mission.tech.map((t) => (
                <span
                  key={t}
                  className="border border-cy/25 bg-cy/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-cy/90"
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {mission.note && (
            <div className="mt-8 flex items-start gap-3 border border-amberish/30 bg-amberish/5 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amberish" />
              <p className="font-mono text-xs leading-6 text-zinc-400">{mission.note}</p>
            </div>
          )}

          <div className="mt-10 space-y-10">
            <Block icon={<Swords className="h-4 w-4" />} label="PROBLEM">
              <p className="max-w-3xl leading-relaxed text-zinc-300">{mission.problem}</p>
            </Block>

            <Block icon={<Lightbulb className="h-4 w-4" />} label="SOLUTION">
              <p className="max-w-3xl leading-relaxed text-zinc-300">{mission.solution}</p>
            </Block>

            <Block icon={<Network className="h-4 w-4" />} label="ARCHITECTURE">
              <pre className="ascii-box overflow-x-auto border border-line bg-black/50 p-5 text-[10px] leading-6 text-zinc-400 sm:text-xs">
                {mission.architecture.join("\n")}
              </pre>
            </Block>

            <Block icon={<ListChecks className="h-4 w-4" />} label="FEATURES">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {mission.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    {f.done ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                    ) : (
                      <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-amberish" />
                    )}
                    <span>
                      {f.label}
                      {!f.done && (
                        <span className="ml-2 font-mono text-[9px] tracking-[0.18em] text-amberish">
                          IN PROGRESS
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={<Wrench className="h-4 w-4" />} label="DEVELOPMENT PROCESS">
              <ol className="max-w-3xl space-y-2.5">
                {mission.process.map((p, i) => (
                  <li key={i} className="flex gap-4 text-sm leading-relaxed text-zinc-300">
                    <span className="font-mono text-[11px] text-cy/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </Block>

            <Block icon={<AlertTriangle className="h-4 w-4" />} label="CHALLENGES">
              <ul className="max-w-3xl space-y-2.5">
                {mission.challenges.map((c, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="text-blood">▸</span>
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={<CheckCircle2 className="h-4 w-4" />} label="LESSONS LEARNED">
              <ul className="max-w-3xl space-y-2.5">
                {mission.lessons.map((l, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="text-mint">▸</span>
                    {l}
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={<Telescope className="h-4 w-4" />} label="FUTURE IMPROVEMENTS">
              <ul className="max-w-3xl space-y-2.5">
                {mission.future.map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="text-viol">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* links */}
          <div className="mt-12 flex flex-wrap gap-3 border-t border-line/70 pt-8">
            <button
              disabled
              aria-disabled="true"
              title="Repository link will be attached when the mission goes public"
              className="flex cursor-not-allowed items-center gap-2.5 border border-line/60 px-5 py-3 font-mono text-[11px] tracking-[0.22em] text-zinc-600"
            >
              <FolderGit2 className="h-4 w-4" /> GITHUB — LINK PENDING
            </button>
            <button
              disabled
              aria-disabled="true"
              title="Live demo link will be attached when the mission is deployed"
              className="flex cursor-not-allowed items-center gap-2.5 border border-line/60 px-5 py-3 font-mono text-[11px] tracking-[0.22em] text-zinc-600"
            >
              <ExternalLink className="h-4 w-4" /> LIVE DEMO — LINK PENDING
            </button>
            <p className="w-full font-mono text-[10px] tracking-[0.2em] text-zinc-700">
              PLACEHOLDERS BY DESIGN — NO FABRICATED URLS. LINKS ATTACH WHEN REAL.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
