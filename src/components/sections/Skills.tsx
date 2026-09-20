"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, FolderGit2 } from "lucide-react";
import { skillCategories, type Skill } from "@/data/skills";
import { missions } from "@/data/missions";
import { ChapterHead, Reveal, Tag } from "../SectionChrome";
import { useExperience } from "../ExperienceProvider";

export default function Skills() {
  const { openMission } = useExperience();
  const [cat, setCat] = useState(skillCategories[0].id);
  const [selected, setSelected] = useState<Skill | null>(null);
  const active = skillCategories.find((c) => c.id === cat)!;

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40">
      <div
        className="absolute right-[-10%] top-[-10%] h-[40vh] w-[40vw] rounded-full bg-cydeep/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          id="skills-head"
          index="CHAPTER 05"
          file="LOADOUT.DAT"
          title="THE SKILL ECOSYSTEM."
          sub="Hover a node to inspect it. Click to trace the missions where it was deployed."
        />

        {/* category tabs */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCat(c.id);
                  setSelected(null);
                }}
                className={`border px-4 py-2.5 font-mono text-[11px] tracking-[0.24em] transition-all ${
                  cat === c.id
                    ? "border-cy/60 bg-cy/10 text-cy"
                    : "border-line text-zinc-500 hover:border-line2 hover:text-zinc-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="mb-6 font-mono text-xs tracking-[0.2em] text-zinc-600">
              // {active.tagline}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.skills.map((s, i) => (
                <div key={s.name} className="group relative">
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={() => setSelected(selected?.name === s.name ? null : s)}
                    className={`w-full border p-4 text-left transition-all duration-300 ${
                      selected?.name === s.name
                        ? "border-cy/60 bg-cy/10"
                        : "border-line bg-panel/50 hover:border-cy/35 hover:bg-panel"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-sans text-lg font-bold ${
                          selected?.name === s.name ? "text-cy" : "text-zinc-200"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
                        {String(s.missions.length).padStart(2, "0")} MISSION
                        {s.missions.length > 1 ? "S" : ""}
                      </span>
                    </div>
                    <div className="mt-2 h-px w-full bg-line group-hover:bg-cy/25" />
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">
                      {s.blurb}
                    </p>
                  </motion.button>

                  {/* hover intel tooltip — desktop */}
                  <div
                    className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-64 -translate-x-1/2 border border-cy/30 bg-void/95 p-3 opacity-0 shadow-[0_8px_40px_-10px_rgba(103,232,249,0.3)] backdrop-blur transition-opacity duration-200 group-hover:opacity-100 lg:block"
                    aria-hidden
                  >
                    <p className="font-mono text-[10px] tracking-[0.24em] text-cy">
                      INTEL // {s.name.toUpperCase()}
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-zinc-400">{s.blurb}</p>
                    <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-zinc-600">
                      CLICK TO TRACE DEPLOYMENTS ▸
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* deployment trace */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-8 border border-cy/30 bg-panel/70 p-6">
                <div className="flex items-center gap-3">
                  <Crosshair className="h-4 w-4 text-cy" />
                  <p className="font-mono text-xs tracking-[0.26em] text-cy">
                    DEPLOYMENT TRACE — {selected.name.toUpperCase()}
                  </p>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                  {selected.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {selected.missions.map((id) => {
                    const m = missions.find((mm) => mm.id === id);
                    if (!m) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => openMission(m.slug)}
                        className="group/btn flex items-center gap-2 border border-line bg-void/60 px-3.5 py-2 font-mono text-[11px] tracking-[0.18em] text-zinc-400 transition-all hover:border-cy/50 hover:text-cy"
                        data-cursor="OPEN FILE"
                      >
                        <FolderGit2 className="h-3.5 w-3.5" />
                        MISSION {m.id} · {m.name}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
                  TAP A MISSION TO OPEN ITS CASE FILE
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
